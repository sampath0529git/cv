'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Logo from '@/components/brand/Logo';

interface SimpleHeaderProps {
  rightElement?: React.ReactNode;
}

export default function SimpleHeader({ rightElement }: SimpleHeaderProps) {
  return (
    <header className="w-full bg-white/58 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/80 shadow-[0_8px_28px_rgba(15,23,42,0.05),inset_0_-1px_0_rgba(255,255,255,0.7)] sticky top-0 z-40">
      <div className="max-w-[1240px] mx-auto px-3.5 sm:px-6 lg:px-8 h-[56px] sm:h-[64px] flex items-center justify-between gap-3">
        <Logo variant="dark" href="/" />
        {rightElement ? (
          <div className="shrink-0">{rightElement}</div>
        ) : (
          <Link
            href="/start"
            className="min-h-[40px] px-3 sm:px-4 rounded-xl border border-white/85 bg-white/65 hover:bg-white/90 backdrop-blur-md ring-1 ring-slate-900/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] text-slate-700 hover:text-slate-950 text-xs sm:text-[13px] font-semibold inline-flex items-center gap-1.5 transition-all duration-150 whitespace-nowrap shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
            <span>Start Options</span>
          </Link>
        )}
      </div>
    </header>
  );
}
