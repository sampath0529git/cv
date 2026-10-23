'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface StartOptionCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  recommended?: boolean;
  accentCorner?: boolean;
}

export default function StartOptionCard({
  href,
  title,
  description,
  icon,
  recommended = false,
  accentCorner = false,
}: StartOptionCardProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full bg-white rounded-3xl border border-[#E8EAF5] shadow-[0_4px_24px_rgba(15,27,77,0.04)] hover:shadow-[0_12px_32px_rgba(75,77,237,0.12)] hover:border-[#4B4DED] transition-all duration-200 p-6 sm:p-7 overflow-hidden cursor-pointer"
    >
      {/* Recommended Pill Badge */}
      {recommended && (
        <div className="absolute top-0 right-7 -translate-y-1/2 bg-[#0F1B4D] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 z-20 border border-indigo-400/20">
          <Sparkles className="w-3.5 h-3.5 text-[#67E8F9]" />
          <span>Recommended</span>
        </div>
      )}

      {/* Decorative Royal Blue Bottom-Left Shape */}
      {accentCorner && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-28 h-28 bg-[#4B4DED] rounded-tr-[52px] pointer-events-none z-0 transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <div className="relative z-10 flex items-center gap-5 sm:gap-6">
        {/* Icon Tile */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#EEF1FF] flex items-center justify-center shrink-0 text-[#4B4DED] shadow-[0_2px_8px_rgba(75,77,237,0.06)] group-hover:scale-105 transition-transform duration-200">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B4D] group-hover:text-[#4B4DED] transition-colors duration-150 leading-tight">
            {title}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed mt-1.5">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
