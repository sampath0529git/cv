'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface StartOptionCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  indexLabel?: string;
  timeEstimate?: string;
  recommended?: boolean;
}

export default function StartOptionCard({
  href,
  title,
  description,
  icon,
  indexLabel = '01',
  timeEstimate,
  recommended = false,
}: StartOptionCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between w-full rounded-2xl sm:rounded-3xl bg-white border transition-colors duration-150 p-5 sm:p-7 cursor-pointer ${
        recommended
          ? 'border-[#2563EB]/45 shadow-[0_8px_28px_rgba(37,99,235,0.08)] hover:border-[#2563EB]'
          : 'border-slate-200/90 shadow-[0_2px_16px_rgba(15,23,42,0.03)] hover:border-slate-300'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 tabular-nums mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-[#2563EB]">{indexLabel}</span>
            {recommended && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#0B112C]">Most popular</span>
              </>
            )}
          </div>
          {timeEstimate && <span>{timeEstimate}</span>}
        </div>

        <div className="flex items-start gap-4 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-[#0B112C] group-hover:text-[#2563EB] transition-colors duration-150 leading-snug">
              {title}
            </h2>
          </div>
        </div>

        <p className="text-[14px] text-slate-600 leading-relaxed mb-5">{description}</p>
      </div>

      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] whitespace-nowrap">
        <span>Continue</span>
        <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
