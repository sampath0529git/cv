import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Car, Flag, Calendar } from 'lucide-react';
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
    personal.email
      ? {
          key: 'email',
          label: personal.email,
          icon: Mail,
          href: `mailto:${personal.email}`,
        }
      : null,
    personal.phone
      ? {
          key: 'phone',
          label: personal.phone,
          icon: Phone,
          href: `tel:${personal.phone.replace(/\s+/g, '')}`,
        }
      : null,
    personal.location
      ? {
          key: 'location',
          label: personal.location,
          icon: MapPin,
        }
      : null,
    personal.linkedin
      ? {
          key: 'linkedin',
          label: personal.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
          icon: Linkedin,
          href: personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`,
        }
      : null,
    personal.website
      ? {
          key: 'website',
          label: personal.website.replace(/^https?:\/\/(www\.)?/, ''),
          icon: Globe,
          href: personal.website.startsWith('http') ? personal.website : `https://${personal.website}`,
        }
      : null,
    personal.drivingLicence
      ? {
          key: 'drivingLicence',
          label: personal.drivingLicence,
          icon: Car,
        }
      : null,
    personal.nationality
      ? {
          key: 'nationality',
          label: `Nationality: ${personal.nationality}`,
          icon: Flag,
        }
      : null,
    personal.dateOfBirth
      ? {
          key: 'dob',
          label: `DOB: ${personal.dateOfBirth}`,
          icon: Calendar,
        }
      : null,
  ].filter(Boolean) as {
    key: string;
    label: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    href?: string;
  }[];

  if (items.length === 0) return null;

  if (layout === 'inline') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[9.5px] text-slate-600 ${className}`}>
        {items.map((item, idx) => {
          const Icon = item.icon;
          const content = (
            <span className="inline-flex items-center gap-1.5 break-words">
              {showIcons && (
                <Icon
                  className="w-3 h-3 shrink-0"
                  style={accentColor ? { color: accentColor } : undefined}
                />
              )}
              <span>{item.label}</span>
            </span>
          );

          return (
            <React.Fragment key={item.key}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 hover:underline transition-colors"
                >
                  {content}
                </a>
              ) : (
                content
              )}
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
          const content = (
            <div className="flex items-start gap-1.5 min-w-0">
              {showIcons && (
                <Icon
                  className="w-3 h-3 shrink-0 mt-0.5"
                  style={accentColor ? { color: accentColor } : undefined}
                />
              )}
              <span className="break-all leading-tight text-slate-700">{item.label}</span>
            </div>
          );

          return item.href ? (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-slate-900 transition-colors"
            >
              {content}
            </a>
          ) : (
            <div key={item.key}>{content}</div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-2 text-[9.5px] text-slate-600 ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <div className="flex items-start gap-1.5 min-w-0">
            {showIcons && (
              <Icon
                className="w-3 h-3 shrink-0 mt-0.5"
                style={accentColor ? { color: accentColor } : undefined}
              />
            )}
            <span className="break-all leading-tight">{item.label}</span>
          </div>
        );

        return item.href ? (
          <a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            {content}
          </a>
        ) : (
          <div key={item.key}>{content}</div>
        );
      })}
    </div>
  );
}
