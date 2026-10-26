import React from 'react';

interface CvSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  variant?: 'underline' | 'bar' | 'minimal' | 'boxed' | 'caps';
  accentColor?: string;
}

export default function CvSection({
  title,
  children,
  className = '',
  titleClassName = '',
  variant = 'underline',
  accentColor,
}: CvSectionProps) {
  return (
    <section className={`mb-3.5 break-inside-avoid min-w-0 ${className}`}>
      {/* Semantic H2 heading for ATS compliance */}
      <div className="mb-2">
        {variant === 'underline' && (
          <div className="border-b pb-1" style={{ borderColor: accentColor ? `${accentColor}33` : '#e2e8f0' }}>
            <h2
              className={`text-xs font-bold uppercase tracking-wider text-slate-900 ${titleClassName}`}
              style={accentColor ? { color: accentColor } : undefined}
            >
              {title}
            </h2>
          </div>
        )}

        {variant === 'bar' && (
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-1.5 h-3.5 rounded-xs shrink-0"
              style={{ backgroundColor: accentColor || 'var(--accent, #1e3a8a)' }}
            />
            <h2
              className={`text-xs font-bold uppercase tracking-wider text-slate-900 ${titleClassName}`}
              style={accentColor ? { color: accentColor } : undefined}
            >
              {title}
            </h2>
          </div>
        )}

        {variant === 'minimal' && (
          <h2
            className={`text-xs font-bold uppercase tracking-widest text-slate-900 pb-0.5 ${titleClassName}`}
            style={accentColor ? { color: accentColor } : undefined}
          >
            {title}
          </h2>
        )}

        {variant === 'caps' && (
          <h2
            className={`text-[11px] font-semibold tracking-wider text-slate-800 uppercase border-b border-slate-200 pb-0.5 ${titleClassName}`}
            style={accentColor ? { color: accentColor } : undefined}
          >
            {title}
          </h2>
        )}

        {variant === 'boxed' && (
          <div
            className="px-2 py-1 rounded mb-1.5 font-bold text-xs uppercase tracking-wider"
            style={{
              backgroundColor: accentColor ? `${accentColor}18` : '#f1f5f9',
              color: accentColor || '#1e3a8a',
            }}
          >
            <h2>{title}</h2>
          </div>
        )}
      </div>

      <div className="space-y-2 min-w-0">{children}</div>
    </section>
  );
}
