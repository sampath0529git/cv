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
      className={`group flex flex-col justify-between w-full rounded-2xl sm:rounded-3xl bg-white/64 hover:bg-white/86 backdrop-blur-2xl backdrop-saturate-150 border transition-all duration-200 p-5 sm:p-7 cursor-pointer ${
        recommended
          ? 'border-blue-400/60 shadow-[0_14px_40px_rgba(37,99,235,0.10),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:border-[#2563EB]'
          : 'border-white/85 ring-1 ring-slate-900/[0.04] shadow-[0_12px_36px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:border-blue-300/70'
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
          <div className="w-12 h-12 rounded-2xl bg-blue-500/12 border border-blue-400/25 text-[#2563EB] flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]">
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
