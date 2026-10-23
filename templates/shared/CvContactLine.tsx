import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { PersonalDetails } from '@/types/cv';

interface CvContactLineProps {
  personal: PersonalDetails;
  layout?: 'inline' | 'stacked' | 'grid';
  showIcons?: boolean;
  className?: string;
  accentColor?: string;
}

export default function CvContactLine({
  personal,
  layout = 'inline',
  showIcons = false,
  className = '',
  accentColor,
}: CvContactLineProps) {
  const items = [
    personal.email ? { key: 'email', label: personal.email, icon: Mail } : null,
    personal.phone ? { key: 'phone', label: personal.phone, icon: Phone } : null,
    personal.location ? { key: 'location', label: personal.location, icon: MapPin } : null,
    personal.linkedin ? { key: 'linkedin', label: personal.linkedin, icon: Linkedin } : null,
    personal.website ? { key: 'website', label: personal.website, icon: Globe } : null,
  ].filter(Boolean) as {
    key: string;
    label: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  }[];

  if (items.length === 0) return null;

  if (layout === 'inline') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[9.5px] text-slate-600 ${className}`}>
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <React.Fragment key={item.key}>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                {showIcons && (
                  <Icon
                    className="w-3 h-3 shrink-0"
                    style={accentColor ? { color: accentColor } : undefined}
                  />
                )}
                <span>{item.label}</span>
              </span>
              {idx < items.length - 1 && (
                <span className="text-slate-300 font-bold select-none" aria-hidden="true">
                  •
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  if (layout === 'stacked') {
    return (
      <div className={`space-y-1.5 text-[9px] text-slate-600 ${className}`}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.key} className="flex items-center gap-2 truncate">
              {showIcons && (
                <Icon
                  className="w-3 h-3 shrink-0"
                  style={accentColor ? { color: accentColor } : undefined}
                />
              )}
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-2 text-[9.5px] text-slate-600 ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.key} className="flex items-center gap-1.5 truncate">
            {showIcons && (
              <Icon
                className="w-3 h-3 shrink-0"
                style={accentColor ? { color: accentColor } : undefined}
              />
            )}
            <span className="truncate">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
