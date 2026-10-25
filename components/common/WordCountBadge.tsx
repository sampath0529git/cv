'use client';

import React from 'react';

export function countWords(text?: string | null): number {
  if (!text) return 0;
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export interface WordCountBadgeProps {
  /** Precomputed count or raw text */
  count?: number;
  text?: string | null;
  /** Suggested minimum word count (optional) */
  min?: number;
  /** Suggested maximum word count for optimal recruitment conciseness */
  max?: number;
  /** Custom recommendation label or auto-computed from min/max */
  recommendationLabel?: string;
  className?: string;
}

export default function WordCountBadge({
  count: countProp,
  text,
  min,
  max,
  recommendationLabel,
  className = '',
}: WordCountBadgeProps) {
  const count = typeof countProp === 'number' ? countProp : countWords(text);

  let status: 'empty' | 'low' | 'ideal' | 'exceeded' = 'empty';
  if (count === 0) {
    status = 'empty';
  } else if (max && count > max) {
    status = 'exceeded';
  } else if (min && count < min) {
    status = 'low';
  } else if (min || max) {
    status = 'ideal';
  }

  const recText =
    recommendationLabel ??
    (min && max
      ? `rec: ${min}–${max}`
      : max
      ? `rec: ≤${max}`
      : min
      ? `rec: ≥${min}`
      : '');

  let statusStyles = 'bg-slate-100 text-slate-500 border-slate-200/90';
  if (status === 'ideal') {
    statusStyles = 'bg-emerald-50 text-emerald-700 border-emerald-200/90';
  } else if (status === 'exceeded') {
    statusStyles = 'bg-amber-50 text-amber-800 border-amber-200';
  } else if (status === 'low') {
    statusStyles = 'bg-slate-100/90 text-slate-600 border-slate-200/90';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border tabular-nums transition-colors shrink-0 ${statusStyles} ${className}`}
      title={
        status === 'exceeded'
          ? `Currently ${count} words. Recruiters typically prefer under ${max} words for this section.`
          : status === 'ideal'
          ? `Optimal length: ${count} words (within recommended recruitment limits).`
          : recText
          ? `Current word count: ${count}. Recommended: ${recText}`
          : `Current word count: ${count}`
      }
    >
      <span>
        {count} {count === 1 ? 'word' : 'words'}
      </span>
      {recText && (
        <>
          <span className="opacity-40" aria-hidden="true">
            ·
          </span>
          <span className="opacity-80 font-normal">{recText}</span>
        </>
      )}
    </span>
  );
}
