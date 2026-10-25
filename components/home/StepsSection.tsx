'use client';

import React from 'react';
import Link from 'next/link';
import { Upload, Edit3, Sparkles, FileText, MousePointer, Mail, Printer } from 'lucide-react';

export default function StepsSection() {
  return (
    <section id="steps-section" className="py-10 sm:py-16 md:py-20 bg-[#f8faff] sm:bg-white border-t border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Create your CV in 4 steps
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {/* Step 1: Start your way */}
          <div className="bg-white sm:bg-transparent rounded-2xl p-4 sm:p-0 border border-slate-200/70 sm:border-none flex flex-col text-left sm:text-center shadow-2xs sm:shadow-none">
            <div className="h-44 sm:h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-md">
              <div className="w-full max-w-[215px] bg-white rounded-lg p-3 text-slate-900 space-y-2 shadow-sm text-left">
                <Link
                  href="/import"
                  className="min-h-[38px] flex items-center gap-2.5 px-2.5 py-2 rounded-md border border-slate-200 bg-slate-50/80 hover:bg-slate-100 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                    Import my CV
                  </span>
                </Link>
                <Link
                  href="/start"
                  className="min-h-[38px] flex items-center gap-2.5 px-2.5 py-2 rounded-md border border-slate-200 bg-slate-50/80 hover:bg-slate-100 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                    From scratch
                  </span>
                </Link>
              </div>
            </div>

            <div className="pt-4 sm:pt-5">
              <h3 className="font-bold text-slate-900 text-base">01. Start your way</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:max-w-xs sm:mx-auto leading-relaxed">
                Import an existing CV or start cleanly from scratch.
              </p>
            </div>
          </div>

          {/* Step 2: Guided phrasing */}
          <div className="bg-white sm:bg-transparent rounded-2xl p-4 sm:p-0 border border-slate-200/70 sm:border-none flex flex-col text-left sm:text-center shadow-2xs sm:shadow-none">
            <div className="h-44 sm:h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-md">
              <div className="w-full max-w-[215px] bg-white rounded-lg p-3 text-slate-900 space-y-2 shadow-sm text-left">
                <div className="text-[11px] font-bold text-slate-800">Work experience</div>
                <div className="px-2 py-1.5 rounded border border-slate-200 text-[10px] text-slate-400">
                  Delivered 24% revenue growth...
                </div>
                <div className="pt-1">
                  <div className="w-full py-1.5 px-2 bg-[#3b5bfd] text-white rounded text-[10px] font-semibold flex items-center justify-center gap-1 shadow-xs whitespace-nowrap">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span>Insert starter summary</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-5">
              <h3 className="font-bold text-slate-900 text-base">02. Guided content</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:max-w-xs sm:mx-auto leading-relaxed">
                Add recruiter-tested summaries, skills, and achievements as you type.
              </p>
            </div>
          </div>

          {/* Step 3: Make it yours */}
          <div className="bg-white sm:bg-transparent rounded-2xl p-4 sm:p-0 border border-slate-200/70 sm:border-none flex flex-col text-left sm:text-center shadow-2xs sm:shadow-none">
            <div className="h-44 sm:h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-md">
              <div className="w-full max-w-[215px] bg-white rounded-lg p-3 text-slate-900 shadow-sm text-left relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 pb-1 border-b border-slate-100">
                  <span>Typography</span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span className="w-2 h-2 rounded-full bg-slate-800" />
                  </div>
                </div>
                <div className="pt-2 flex gap-2">
                  <div className="w-12 space-y-1">
                    <div className="text-[8px] text-slate-400">Colours</div>
                    <div className="h-1.5 w-full bg-slate-200 rounded" />
                    <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-100 p-1.5 rounded">
                    <div className="h-1.5 w-10 bg-slate-400 rounded mb-1" />
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-4/5 bg-slate-200 rounded mt-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-4 text-slate-900">
                  <MousePointer className="w-3.5 h-3.5 fill-slate-900 text-white" />
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-5">
              <h3 className="font-bold text-slate-900 text-base">03. Make it yours</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:max-w-xs sm:mx-auto leading-relaxed">
                Adjust colours, fonts, and section order in one tap.
              </p>
            </div>
          </div>

          {/* Step 4: Download and apply */}
          <div className="bg-white sm:bg-transparent rounded-2xl p-4 sm:p-0 border border-slate-200/70 sm:border-none flex flex-col text-left sm:text-center shadow-2xs sm:shadow-none">
            <div className="h-44 sm:h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-md">
              <div className="w-full max-w-[215px] bg-white rounded-lg p-2.5 text-slate-900 shadow-sm text-left space-y-1.5 relative">
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>A4 PDF (.pdf)</span>
                  </div>
                  <MousePointer className="w-3.5 h-3.5 fill-slate-900 text-white shrink-0" />
                </div>
                <div className="flex items-center gap-2 p-1 rounded text-[11px] text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Public Share Link</span>
                </div>
                <div className="flex items-center gap-2 p-1 rounded text-[11px] text-slate-700">
                  <Printer className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Vector Print</span>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-5">
              <h3 className="font-bold text-slate-900 text-base">04. Download &amp; share</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:max-w-xs sm:mx-auto leading-relaxed">
                Export crisp A4 PDFs or share a temporary public preview link.
              </p>
            </div>
          </div>
        </div>

        {/* Central CTA — Full width on mobile */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/start"
            className="w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#3b5bfd] hover:bg-[#2f4ee8] text-white font-semibold text-base sm:text-sm shadow-md transition-all active:scale-98 whitespace-nowrap"
          >
            Create my CV
          </Link>
        </div>
      </div>
    </section>
  );
}
