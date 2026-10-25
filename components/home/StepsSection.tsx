'use client';

import React from 'react';
import Link from 'next/link';
import { Upload, Edit3, Sparkles, FileText, MousePointer, Mail, Printer } from 'lucide-react';

export default function StepsSection() {
  return (
    <section
      id="steps-section"
      aria-label="Create your CV in 4 steps"
      className="py-16 sm:py-20 lg:py-24 bg-[#f8faff] sm:bg-white border-t border-slate-100"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Create your CV in 4 steps
          </h2>
        </div>

        {/* Horizontal Process Stepper Track (Desktop & Tablet) */}
        <div className="hidden sm:block max-w-3xl mx-auto mb-10 lg:mb-12">
          <div className="relative flex items-center justify-between">
            {/* Connecting Track Line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#4a4df2]/30 via-[#6366f1]/40 to-[#4a4df2]/30 rounded-full z-0" />

            {[
              { num: '01', title: 'Choose format' },
              { num: '02', title: 'Guided content' },
              { num: '03', title: 'Make it yours' },
              { num: '04', title: 'Download & share' },
            ].map((step) => (
              <div key={step.num} className="relative z-10 flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#4a4df2] text-[#4a4df2] font-bold text-xs sm:text-sm flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#4a4df2] group-hover:text-white transition-all duration-200">
                  {step.num}
                </div>
                <span className="text-xs font-semibold text-slate-700 mt-2.5 whitespace-nowrap">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid with Equal Heights and Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1: Start your way */}
          <div className="h-full bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col text-left justify-between group">
            <div className="h-44 sm:h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-inner relative overflow-hidden">
              <div className="w-full max-w-[215px] bg-white rounded-xl p-3 text-slate-900 space-y-2 shadow-sm text-left">
                <Link
                  href="/import"
                  className="min-h-[40px] flex items-center gap-2.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                    Import my CV
                  </span>
                </Link>
                <Link
                  href="/start"
                  className="min-h-[40px] flex items-center gap-2.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                    From scratch
                  </span>
                </Link>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#4a4df2] to-[#6366f1] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-base">Start your way</h3>
              </div>
              <p className="text-sm text-slate-500 leading-[1.6] pl-8.5">
                Import an existing CV or start cleanly from scratch.
              </p>
            </div>
          </div>

          {/* Step 2: Guided content */}
          <div className="h-full bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col text-left justify-between group">
            <div className="h-44 sm:h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-inner relative overflow-hidden">
              <div className="w-full max-w-[215px] bg-white rounded-xl p-3 text-slate-900 space-y-2 shadow-sm text-left">
                <div className="text-[11px] font-bold text-slate-800">Work experience</div>
                <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[10px] text-slate-400">
                  Delivered 24% revenue growth...
                </div>
                <div className="pt-0.5">
                  <div className="w-full py-1.5 px-2 bg-[#4a4df2] text-white rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 shadow-xs whitespace-nowrap">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span>Insert starter summary</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#4a4df2] to-[#6366f1] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-base">Guided content</h3>
              </div>
              <p className="text-sm text-slate-500 leading-[1.6] pl-8.5">
                Add recruiter-tested summaries, skills, and achievements as you type.
              </p>
            </div>
          </div>

          {/* Step 3: Make it yours */}
          <div className="h-full bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col text-left justify-between group">
            <div className="h-44 sm:h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-inner relative overflow-hidden">
              <div className="w-full max-w-[215px] bg-white rounded-xl p-3 text-slate-900 shadow-sm text-left relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 pb-1.5 border-b border-slate-100">
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
                  <div className="flex-1 bg-slate-50 border border-slate-100 p-1.5 rounded-lg">
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

            <div className="pt-5">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#4a4df2] to-[#6366f1] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-base">Make it yours</h3>
              </div>
              <p className="text-sm text-slate-500 leading-[1.6] pl-8.5">
                Adjust colours, fonts, and section order in one tap.
              </p>
            </div>
          </div>

          {/* Step 4: Download & share */}
          <div className="h-full bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col text-left justify-between group">
            <div className="h-44 sm:h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-inner relative overflow-hidden">
              <div className="w-full max-w-[215px] bg-white rounded-xl p-2.5 text-slate-900 shadow-sm text-left space-y-1.5 relative">
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-900">
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

            <div className="pt-5">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#4a4df2] to-[#6366f1] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <h3 className="font-bold text-slate-900 text-base">Download &amp; share</h3>
              </div>
              <p className="text-sm text-slate-500 leading-[1.6] pl-8.5">
                Export crisp A4 PDFs or share a temporary public preview link.
              </p>
            </div>
          </div>
        </div>

        {/* Central CTA: 52px height, hover lift, focus ring */}
        <div className="mt-12 text-center">
          <Link
            href="/start"
            className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center px-9 py-3.5 rounded-xl bg-gradient-to-r from-[#4a4df2] to-[#6366f1] hover:from-[#3d40e0] hover:to-[#4f46e5] text-white font-bold text-base shadow-[0_8px_25px_rgba(74,77,242,0.32)] hover:shadow-[0_12px_28px_rgba(74,77,242,0.42)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] whitespace-nowrap"
          >
            Create my CV
          </Link>
        </div>
      </div>
    </section>
  );
}
