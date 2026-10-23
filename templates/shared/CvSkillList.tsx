import React from 'react';
import { SkillGroup } from '@/types/cv';

interface CvSkillListProps {
  skills: SkillGroup[];
  layout?: 'tags' | 'inline' | 'bullet' | 'grid';
  accentColor?: string;
  className?: string;
}

export default function CvSkillList({
  skills,
  layout = 'tags',
  accentColor,
  className = '',
}: CvSkillListProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {skills.map((group, gIdx) => {
        if (!group.items || group.items.length === 0) return null;

        return (
          <div key={gIdx} className="space-y-1">
            {group.group && (
              <p
                className="text-[9.5px] font-bold text-slate-800 tracking-wide"
                style={accentColor ? { color: accentColor } : undefined}
              >
                {group.group}
              </p>
            )}

            {layout === 'tags' && (
              <div className="flex flex-wrap gap-1">
                {group.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-100 text-slate-800 border border-slate-200/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {layout === 'inline' && (
              <p className="text-[9.5px] text-slate-700 leading-relaxed">
                {group.items.join(' • ')}
              </p>
            )}

            {layout === 'bullet' && (
              <ul className="space-y-0.5 text-[9.5px] text-slate-700">
                {group.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: accentColor || '#64748b' }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {layout === 'grid' && (
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9.5px] text-slate-700">
                {group.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1 truncate">
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: accentColor || '#64748b' }}
                    />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
