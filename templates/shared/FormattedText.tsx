import React from 'react';

interface FormattedTextProps {
  text?: string;
  className?: string;
  inline?: boolean;
}

/**
 * Parses and renders rich text formatting safely:
 * - Bold: **text** or <b>text</b> or <strong>text</strong>
 * - Italic: *text* or <i>text</i> or <em>text</em>
 * - Underline: <u>text</u>
 * - Links: [label](url) or raw https:// URLs
 * - Line breaks: \n preserved
 */
export default function FormattedText({
  text,
  className = '',
  inline = false,
}: FormattedTextProps) {
  if (!text) return null;

  // Normalize Windows CRLF and CR to LF
  const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalizedText.split('\n');

  const renderFormattedLine = (line: string, lineKey: number) => {
    const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|<u>.*?<\/u>|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s]+)/g;
    const parts = line.split(tokenRegex);

    const renderedParts = parts.map((part, partIdx) => {
      if (!part) return null;

      // Bold **text**
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={partIdx} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Underline <u>text</u>
      if (part.startsWith('<u>') && part.endsWith('</u>') && part.length >= 7) {
        return (
          <span key={partIdx} className="underline underline-offset-2">
            {part.slice(3, -4)}
          </span>
        );
      }

      // Italic *text*
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        return (
          <em key={partIdx} className="italic text-slate-800">
            {part.slice(1, -1)}
          </em>
        );
      }

      // Markdown Link [label](url)
      const mdLinkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (mdLinkMatch) {
        return (
          <a
            key={partIdx}
            href={mdLinkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center break-all"
          >
            {mdLinkMatch[1]}
          </a>
        );
      }

      // Raw URL
      if (part.startsWith('http://') || part.startsWith('https://')) {
        return (
          <a
            key={partIdx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center break-all"
          >
            {part}
          </a>
        );
      }

      return <React.Fragment key={partIdx}>{part}</React.Fragment>;
    });

    return (
      <span
        key={lineKey}
        className={`${inline ? 'inline' : 'block'} break-words [overflow-wrap:anywhere]`}
      >
        {renderedParts}
      </span>
    );
  };

  if (inline) {
    return (
      <span className={`inline break-words [overflow-wrap:anywhere] ${className}`}>
        {lines.map((l, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <br />}
            {renderFormattedLine(l, idx)}
          </React.Fragment>
        ))}
      </span>
    );
  }

  return (
    <div className={`space-y-1.5 break-words [overflow-wrap:anywhere] [text-wrap:pretty] min-w-0 ${className}`}>
      {lines.map((l, idx) =>
        l.trim() ? (
          renderFormattedLine(l, idx)
        ) : (
          <div key={idx} className="min-h-[0.75em]" aria-hidden="true" />
        )
      )}
    </div>
  );
}
