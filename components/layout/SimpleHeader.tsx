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
    <header className="w-full bg-white/92 backdrop-blur-xl border-b border-slate-200/85 sticky top-0 z-40">
      <div className="max-w-[1240px] mx-auto px-3.5 sm:px-6 lg:px-8 h-[56px] sm:h-[64px] flex items-center justify-between gap-3">
        <Logo variant="dark" href="/" />
        {rightElement ? (
          <div className="shrink-0">{rightElement}</div>
        ) : (
          <Link
            href="/start"
            className="min-h-[40px] px-3 sm:px-4 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100 text-slate-700 hover:text-slate-950 text-xs sm:text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
            <span>Start Options</span>
          </Link>
        )}
      </div>
    </header>
  );
}
