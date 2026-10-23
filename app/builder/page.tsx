'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Paintbrush, ArrowLeft } from 'lucide-react';
import TopNav from '@/components/navigation/TopNav';
import Footer from '@/components/layout/Footer';

export default function BuilderStartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fe] text-slate-900">
      <TopNav />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="w-full max-w-2xl text-center">
          {/* Back link */}
          <div className="flex justify-start mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </Link>
          </div>

          {/* Heading matching screenshot */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-950 tracking-tight leading-tight mb-8 sm:mb-12">
            How do you want <span className="text-[#4a4df2]">to start your CV?</span>
          </h1>

          {/* Two Main Cards Container */}
          <div className="space-y-6 sm:space-y-7 text-left max-w-xl mx-auto">
            {/* Card 1: Import my CV */}
            <Link
              href="/#cv-builder-section"
              className="group relative bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#4a4df2] transition-all duration-200 p-6 sm:p-7 flex items-center gap-5 sm:gap-6 cursor-pointer overflow-hidden block"
            >
              {/* 1. Recommended Pill Badge (Top Right) */}
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#131a47] text-white text-[11.5px] font-semibold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 z-20 border border-indigo-400/20">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Recommended</span>
              </div>

              {/* 2. Royal Blue Curved Accent Shape (Bottom Left Corner) */}
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#4a4df2] rounded-tr-[48px] pointer-events-none z-0 transition-transform group-hover:scale-105" />

              {/* 3. Left Icon Box */}
              <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#eff3fd] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <svg
                  className="w-9 h-9 sm:w-10 sm:h-10 text-[#4a4df2]"
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

              {/* 4. Right Content */}
              <div className="relative z-10 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#4a4df2] transition-colors leading-tight">
                  Import my CV
                </h2>
                <p className="text-slate-500 text-sm sm:text-[15px] font-normal leading-relaxed mt-1">
                  We&apos;ll improve the layout and optimize the content.
                </p>
              </div>
            </Link>

            {/* Card 2: From scratch */}
            <Link
              href="/#cv-builder-section"
              className="group relative bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#4a4df2] transition-all duration-200 p-6 sm:p-7 flex items-center gap-5 sm:gap-6 cursor-pointer overflow-hidden block"
            >
              {/* 1. Left Icon Box */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#eff3fd] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Paintbrush className="w-9 h-9 sm:w-10 sm:h-10 text-[#4a4df2]" strokeWidth={2.2} />
              </div>

              {/* 2. Right Content */}
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#4a4df2] transition-colors leading-tight">
                  From scratch
                </h2>
                <p className="text-slate-500 text-sm sm:text-[15px] font-normal leading-relaxed mt-1">
                  We&apos;ll guide you section by section.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
