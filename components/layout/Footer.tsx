'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';

export default function Footer() {
  const [accessibilityModalOpen, setAccessibilityModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-white border-t border-slate-100 text-slate-600 text-xs sm:text-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 text-left">
            {/* Left: Brand Logo & Disclaimer */}
            <div className="md:col-span-5 space-y-4">
              <Logo variant="dark" href="/" />

              <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
                *The names and logos of the companies mentioned above are registered trademarks belonging to their respective owners. Unless otherwise noted, these references in no way aim to suggest an affiliation or association with MakeMyCV.
              </p>
            </div>

            {/* Column 2: All Features */}
            <div className="md:col-span-4 space-y-3">
              <div className="font-bold text-slate-900 text-xs tracking-wider uppercase">
                All features
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li>
                  <Link href="#cv-builder-section" className="hover:text-slate-900 transition-colors">
                    CV builder
                  </Link>
                </li>
                <li>
                  <Link href="#features-section" className="hover:text-slate-900 transition-colors">
                    Cover letter builder
                  </Link>
                </li>
                <li>
                  <Link href="#features-section" className="hover:text-slate-900 transition-colors">
                    Resume checker
                  </Link>
                </li>
                <li>
                  <Link href="#features-section" className="hover:text-slate-900 transition-colors">
                    Resignation letter builder
                  </Link>
                </li>
                <li>
                  <Link href="#features-section" className="hover:text-slate-900 transition-colors">
                    Headshot pro
                  </Link>
                </li>
                <li>
                  <Link href="#features-section" className="hover:text-slate-900 transition-colors">
                    Career test
                  </Link>
                </li>
                <li>
                  <Link href="#features-section" className="hover:text-slate-900 transition-colors">
                    Remote job
                  </Link>
                </li>
                <li>
                  <Link href="#features-section" className="hover:text-slate-900 transition-colors">
                    CV skills generator
                  </Link>
                </li>
                <li>
                  <Link href="#features-section" className="hover:text-slate-900 transition-colors">
                    CV summary generator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: About */}
            <div className="md:col-span-3 space-y-3">
              <div className="font-bold text-slate-900 text-xs tracking-wider uppercase">
                About
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li>
                  <Link href="#seo-guide" className="hover:text-slate-900 transition-colors">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="#seo-guide" className="hover:text-slate-900 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#account" className="hover:text-slate-900 transition-colors">
                    Unsubscribe
                  </Link>
                </li>
                <li>
                  <Link href="#templates-section" className="hover:text-slate-900 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#terms" className="hover:text-slate-900 transition-colors">
                    General terms and conditions of sale
                  </Link>
                </li>
                <li>
                  <Link href="#privacy" className="hover:text-slate-900 transition-colors">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="#notice" className="hover:text-slate-900 transition-colors">
                    Notice
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Accessibility Trigger at Bottom Left (matching circular icon in screenshot) */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          type="button"
          onClick={() => setAccessibilityModalOpen(!accessibilityModalOpen)}
          className="w-10 h-10 rounded-full bg-[#0c112b] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
          aria-label="Accessibility options"
        >
          {/* Wheelchair / Accessibility Symbol */}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-1 6v6h2v-6h-2zm-3.5 1.5l1.42 1.42L10.34 9.5 9 8.08 7.5 9.5zM16.5 9.5l1.42-1.42L16.5 6.66 15.08 8.08l1.42 1.42zM12 15a4 4 0 1 0 4 4h-2a2 2 0 1 1-2-2v-2z" />
          </svg>
        </button>

        {accessibilityModalOpen && (
          <div className="absolute bottom-12 left-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 text-slate-800 text-xs space-y-2 animate-in fade-in slide-in-from-bottom-2">
            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex justify-between items-center">
              <span>Accessibility Assistance</span>
              <button
                type="button"
                onClick={() => setAccessibilityModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                &times;
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              ukcvmaker is optimized for screen readers and high contrast. Press Tab to navigate.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
