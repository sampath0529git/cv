'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Paintbrush, Linkedin, FileUp } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import LinkedInImportModal from '@/components/builder/LinkedInImportModal';

export default function StartPage() {
  const router = useRouter();
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fe] text-slate-900">
      {/* 1. Header with Makemycv Logo */}
      <header className="w-full bg-white border-b border-slate-200/80 px-6 sm:px-12 lg:px-16 py-4 flex items-center justify-between sticky top-0 z-30">
        <Logo variant="dark" href="/" />
      </header>

      {/* 2. Main Centered Onboarding Selection */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-[600px] mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0a1130] tracking-tight leading-tight mb-8 sm:mb-11">
            How do you want <span className="text-[#4a4df2]">to start your CV?</span>
          </h1>

          {/* Stacked Option Cards */}
          <div className="space-y-5 text-left">
            {/* Card 1: Import from LinkedIn */}
            <button
              type="button"
              onClick={() => setIsLinkedInModalOpen(true)}
              className="group relative block w-full text-left bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0A66C2] transition-all duration-200 p-6 sm:p-7 cursor-pointer"
            >
              <div className="flex items-center gap-5 sm:gap-6">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-[#0A66C2]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Linkedin className="w-9 h-9 text-[#0A66C2]" strokeWidth={2.1} />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#0A66C2] transition-colors leading-tight">
                    Import from LinkedIn
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-[15px] font-normal leading-relaxed mt-1">
                    Connect with LinkedIn OAuth or parse your profile directly into the builder.
                  </p>
                </div>
              </div>
            </button>

            {/* Card 2: Import my CV */}
            <Link
              href="/import"
              className="group relative block w-full bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#2563EB] transition-all duration-200 p-6 sm:p-7 cursor-pointer"
            >
              <div className="flex items-center gap-5 sm:gap-6">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-[#eff3fd] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                  <FileUp className="w-9 h-9 text-[#2563EB]" strokeWidth={2.2} />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors leading-tight">
                    Import my CV
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-[15px] font-normal leading-relaxed mt-1">
                    We&apos;ll improve the layout and optimize the content.
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 3: From scratch (Recommended) */}
            <Link
              href="/builder"
              className="group relative block w-full bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#2563EB] transition-all duration-200 p-6 sm:p-7 cursor-pointer"
            >
              <div className="absolute top-0 right-4 sm:right-5 -translate-y-1/2 bg-[#081448] text-white text-[13px] sm:text-[14px] font-semibold leading-none px-4 py-2 rounded-full shadow-sm flex items-center gap-2 z-20">
                <Sparkles className="w-4 h-4 text-[#6370ff] shrink-0" strokeWidth={2} />
                <span>Recommended</span>
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[23px] overflow-hidden pointer-events-none z-0"
              >
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#2563EB] rounded-tr-[48px] transition-transform duration-300 group-hover:scale-105" />
              </div>

              <div className="relative z-10 flex items-center gap-5 sm:gap-6">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-[#eff3fd] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                  <Paintbrush className="w-9 h-9 text-[#2563EB]" strokeWidth={2.2} />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors leading-tight">
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

      {isLinkedInModalOpen && (
        <LinkedInImportModal
          isOpen={isLinkedInModalOpen}
          onClose={() => setIsLinkedInModalOpen(false)}
          onImportSuccess={() => router.push('/builder')}
        />
      )}
    </div>
  );
}
