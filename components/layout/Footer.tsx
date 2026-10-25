'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PersonStanding, X } from 'lucide-react';
import Logo from '@/components/brand/Logo';

export default function Footer() {
  const [accessibilityModalOpen, setAccessibilityModalOpen] = useState(false);

  return (
    <>
      <footer
        aria-label="MakeMyCV Global Footer"
        className="bg-white border-t border-slate-100 text-slate-600 text-xs sm:text-sm pt-14 pb-20 sm:py-16"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 text-left">
            {/* Column 1: Brand Wordmark & Disclaimer (Full width on mobile, 5 cols on md+) */}
            <div className="col-span-2 md:col-span-5 space-y-4">
              <Logo variant="dark" href="/" />

              <p className="text-[11.5px] text-slate-500 leading-relaxed max-w-sm">
                *The names and logos of the companies mentioned above are registered trademarks belonging to their respective owners. Unless otherwise noted, these references do not imply affiliation with MakeMyCV.
              </p>
            </div>

            {/* Column 2: Tools & Builder */}
            <div className="col-span-1 md:col-span-4 space-y-3">
              <div className="font-bold text-slate-900 text-xs tracking-wider uppercase">
                Tools &amp; Builder
              </div>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>
                  <Link
                    href="/builder"
                    className="inline-block py-1 hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] rounded"
                  >
                    CV builder studio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/start"
                    className="inline-block py-1 hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] rounded"
                  >
                    Start from template
                  </Link>
                </li>
                <li>
                  <Link
                    href="/import"
                    className="inline-block py-1 hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] rounded"
                  >
                    Import existing CV
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features-section"
                    className="inline-block py-1 hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] rounded"
                  >
                    Cover letter builder
                  </Link>
                </li>
                <li>
                  <Link
                    href="#templates-section"
                    className="inline-block py-1 hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] rounded"
                  >
                    ATS CV templates
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="col-span-1 md:col-span-3 space-y-3">
              <div className="font-bold text-slate-900 text-xs tracking-wider uppercase">
                Resources
              </div>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>
                  <Link
                    href="#seo-guide"
                    className="inline-block py-1 hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] rounded"
                  >
                    UK CV Guide 2026
                  </Link>
                </li>
                <li>
                  <Link
                    href="#steps-section"
                    className="inline-block py-1 hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] rounded"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#templates-section"
                    className="inline-block py-1 hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] rounded"
                  >
                    Template gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="#seo-guide"
                    className="inline-block py-1 hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] rounded"
                  >
                    FAQ &amp; formatting
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Accessibility Trigger at Bottom Left */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40">
        <button
          type="button"
          onClick={() => setAccessibilityModalOpen(!accessibilityModalOpen)}
          className="w-11 h-11 rounded-full bg-[#0c112b] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Accessibility options"
        >
          <PersonStanding className="w-5 h-5" />
        </button>

        {accessibilityModalOpen && (
          <div className="absolute bottom-13 left-0 w-68 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 text-slate-800 text-xs space-y-2">
            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex justify-between items-center">
              <span>Accessibility Assistance</span>
              <button
                type="button"
                onClick={() => setAccessibilityModalOpen(false)}
                aria-label="Close accessibility info"
                className="min-h-[28px] min-w-[28px] flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11.5px] text-slate-500 leading-relaxed">
              MakeMyCV supports keyboard navigation, high-contrast legibility, and 44px+ mobile touch controls across all steps.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
