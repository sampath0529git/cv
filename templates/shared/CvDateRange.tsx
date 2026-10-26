import React from 'react';

interface CvDateRangeProps {
  startDate?: string;
  endDate?: string;
  current?: boolean;
  className?: string;
  accentColor?: string;
}

export default function CvDateRange({
  startDate,
  endDate,
  current = false,
  className = '',
  accentColor,
}: CvDateRangeProps) {
  if (!startDate && !endDate) return null;

  const displayEnd = current ? 'Present' : endDate || 'Present';
  const text = startDate && displayEnd ? `${startDate} – ${displayEnd}` : startDate || displayEnd;

  return (
    <span
      className={`text-[9.5px] font-medium text-slate-500 whitespace-nowrap tabular-nums ${className}`}
      style={accentColor ? { color: accentColor } : undefined}
    >
      {text}
    </span>
  );
}
