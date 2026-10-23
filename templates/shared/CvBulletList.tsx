import React from 'react';

interface CvBulletListProps {
  bullets: string[];
  className?: string;
  bulletColor?: string;
}

export default function CvBulletList({
  bullets,
  className = '',
  bulletColor,
}: CvBulletListProps) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <ul className={`space-y-1 text-slate-700 leading-relaxed ${className}`}>
      {bullets.map((bullet, idx) => {
        if (!bullet || !bullet.trim()) return null;
        return (
          <li key={idx} className="relative pl-3 text-[10px] break-inside-avoid">
            <span
              className="absolute left-0 top-[6px] w-1 h-1 rounded-full shrink-0"
              style={{
                backgroundColor: bulletColor || 'var(--accent, #64748b)',
              }}
              aria-hidden="true"
            />
            <span>{bullet.trim()}</span>
          </li>
        );
      })}
    </ul>
  );
}
