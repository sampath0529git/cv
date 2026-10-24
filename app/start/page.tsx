'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Paintbrush } from 'lucide-react';
import Logo from '@/components/brand/Logo';

export default function StartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fe] text-slate-900">
      {/* 1. Header with Makemycv Logo on left matching screenshot */}
      <header className="w-full bg-white border-b border-slate-200/80 px-6 sm:px-12 lg:px-16 py-4 flex items-center justify-between sticky top-0 z-30">
        <Logo variant="dark" href="/" />
      </header>

      {/* 2. Main Centered Onboarding Selection */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="w-full max-w-[590px] mx-auto text-center">
          {/* Centered Heading: How do you want (navy) to start your CV? (blue) */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0a1130] tracking-tight leading-tight mb-8 sm:mb-11">
            How do you want <span className="text-[#4a4df2]">to start your CV?</span>
          </h1>

          {/* Two Stacked Option Cards */}
          <div className="space-y-6 text-left">
            {/* Card 1: Import my CV */}
            <Link
              href="/import"
              className="group relative block w-full bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#4a4df2] transition-all duration-200 p-6 sm:p-7 overflow-hidden cursor-pointer"
            >
              {/* Recommended Pill Badge */}
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#0a1130] text-white text-[11.5px] font-semibold px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-20 border border-indigo-400/20">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Recommended</span>
              </div>

              {/* Decorative Royal Blue Bottom-Left Shape */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-28 h-28 bg-[#4a4df2] rounded-tr-[52px] pointer-events-none z-0 transition-transform duration-300 group-hover:scale-105"
              />

              <div className="relative z-10 flex items-center gap-5 sm:gap-6">
                {/* Icon Tile */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#eff3fd] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                  <svg
                    className="w-10 h-10 text-[#4a4df2]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v3" />
                    <path d="M4 17v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M2 13h9" />
                    <polyline points="8 10 11 13 8 16" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#4a4df2] transition-colors leading-tight">
                    Import my CV
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-[15px] font-normal leading-relaxed mt-1">
                    We&apos;ll improve the layout and optimize the content.
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 2: From scratch */}
            <Link
              href="/builder"
              className="group relative block w-full bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#4a4df2] transition-all duration-200 p-6 sm:p-7 overflow-hidden cursor-pointer"
            >
              <div className="flex items-center gap-5 sm:gap-6">
                {/* Icon Tile */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#eff3fd] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                  <Paintbrush className="w-10 h-10 text-[#4a4df2]" strokeWidth={2.2} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#4a4df2] transition-colors leading-tight">
                    From scratch
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-[15px] font-normal leading-relaxed mt-1">
                    We&apos;ll guide you section by section.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
