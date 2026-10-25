'use client';

import React from 'react';
import { Plus, Sparkles, Check, Link as LinkIcon, FileText, CheckCircle2, Globe, Download } from 'lucide-react';

export default function ReasonsSection() {
  return (
    <section
      aria-label="6 Reasons to create your CV with ukcvmaker"
      className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-950 tracking-tight leading-[1.15] [text-wrap:balance]">
            6 Reasons to Create Your CV with ukcvmaker
          </h2>
        </div>

        {/* 6 Grid Cards with Equal Heights and Consistent Framing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {/* Card 1: CV Creator */}
          <div className="h-full rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-200 ease-out p-6 sm:p-7 flex flex-col justify-between group">
            {/* Micro-Mockup Canvas */}
            <div className="h-52 sm:h-56 rounded-xl bg-gradient-to-b from-[#F1F4FD] to-[#E8EEFB] border border-[#E2E8F5] p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative select-none">
              <div className="w-full max-w-[270px] bg-white rounded-xl border border-slate-200/90 shadow-[0_4px_16px_rgba(15,27,77,0.08)] overflow-hidden">
                {/* Browser/Editor Window Header */}
                <div className="bg-slate-50 px-3 py-2 border-b border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-medium truncate">
                    Oliver_CV_A4.pdf
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </span>
                </div>

                {/* Document Body Snippet */}
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">Oliver Harrington</h4>
                      <p className="text-[10px] text-[#4A4DF2] font-semibold">Lead Financial Analyst · London</p>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-[#4A4DF2]/10 text-[#4A4DF2] font-bold text-xs flex items-center justify-center">
                      OH
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] text-slate-500">
                      <span className="font-semibold text-slate-700">Senior Analyst · Barclays UK</span>
                      <span className="font-mono text-[8.5px]">2022 – Present</span>
                    </div>
                    <p className="text-[9px] text-slate-600 leading-snug line-clamp-1">
                      • Directed £8.4M commercial portfolio forecasting with 99.2% variance accuracy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Real-time Badge */}
              <div className="absolute bottom-2.5 right-3 bg-slate-900 text-white text-[10px] font-medium px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1.5 border border-slate-700">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                <span>300 DPI A4 Canvas</span>
              </div>
            </div>

            <div className="pt-5 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                CV Creator
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-[1.65]">
                Build your CV online in a clean, distraction-free mobile and desktop studio with automatic ISO A4 pagination.
              </p>
            </div>
          </div>

          {/* Card 2: Pre-written content */}
          <div className="h-full rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-200 ease-out p-6 sm:p-7 flex flex-col justify-between group">
            {/* Micro-Mockup Canvas */}
            <div className="h-52 sm:h-56 rounded-xl bg-gradient-to-b from-[#F1F4FD] to-[#E8EEFB] border border-[#E2E8F5] p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative select-none">
              <div className="w-full max-w-[270px] space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#4A4DF2]" />
                    Recruiter-Tested Bullets
                  </span>
                  <span className="text-[9px] font-semibold text-[#4A4DF2] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    1-Tap Insert
                  </span>
                </div>

                {/* Pre-written Item 1 */}
                <div className="bg-white rounded-xl p-2.5 border border-blue-200/80 shadow-xs flex items-start gap-2 hover:border-[#4A4DF2] transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-slate-800 font-semibold leading-tight">
                      Spearheaded £3.2M strategic transformation
                    </p>
                    <p className="text-[9px] text-slate-500 mt-0.5">
                      Increased regional branch delivery efficiency by 26%.
                    </p>
                  </div>
                </div>

                {/* Pre-written Item 2 */}
                <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-slate-800 font-semibold leading-tight">
                      Led cross-functional agile squads of 14
                    </p>
                    <p className="text-[9px] text-slate-500 mt-0.5">
                      Delivered high-impact stakeholder outcomes on schedule.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Micro Action Bar */}
              <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 text-[9px] text-slate-600">
                <span>1,200+ industry-specific starters</span>
                <span className="font-semibold text-[#4A4DF2] flex items-center gap-0.5">
                  <Plus className="w-2.5 h-2.5" /> Insert
                </span>
              </div>
            </div>

            <div className="pt-5 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                Pre-written content
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-[1.65]">
                Not sure what to write? Choose from hundreds of recruiter-validated work achievements and tailor with one click.
              </p>
            </div>
          </div>

          {/* Card 3: Guided Phrasing */}
          <div className="h-full rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-200 ease-out p-6 sm:p-7 flex flex-col justify-between group">
            {/* Micro-Mockup Canvas */}
            <div className="h-52 sm:h-56 rounded-xl bg-gradient-to-b from-[#F1F4FD] to-[#E8EEFB] border border-[#E2E8F5] p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative select-none">
              <div className="w-full max-w-[270px] bg-white rounded-xl border border-indigo-100 shadow-[0_4px_16px_rgba(15,27,77,0.08)] p-3 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <span className="text-[11px] font-bold text-slate-900">ATS Compliance</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    98% Match
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] text-slate-600 font-medium">
                    <span>Keyword Density (UK Finance)</span>
                    <span className="font-semibold text-slate-900">Optimal</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[94%] h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="text-[8.5px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200">
                    Stakeholder Mgmt
                  </span>
                  <span className="text-[8.5px] font-medium bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md border border-purple-200">
                    P&amp;L Analysis
                  </span>
                  <span className="text-[8.5px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                    Agile Delivery
                  </span>
                </div>
              </div>

              {/* Verified Seal */}
              <div className="absolute bottom-2.5 right-3 bg-[#4A4DF2] text-white text-[9.5px] font-semibold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <span>Refine Phrasing</span>
                <span>&rarr;</span>
              </div>
            </div>

            <div className="pt-5 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                Guided Phrasing
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-[1.65]">
                Structure crisp executive summaries and measurable bullet points formatted specifically for British recruitment filters.
              </p>
            </div>
          </div>

          {/* Card 4: Multilingual Support */}
          <div className="h-full rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-200 ease-out p-6 sm:p-7 flex flex-col justify-between group">
            {/* Micro-Mockup Canvas */}
            <div className="h-52 sm:h-56 rounded-xl bg-gradient-to-b from-[#F1F4FD] to-[#E8EEFB] border border-[#E2E8F5] p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative select-none">
              <div className="w-full max-w-[270px] space-y-2">
                {/* Active UK Language Pill */}
                <div className="bg-white rounded-xl p-2.5 border-2 border-[#4A4DF2] shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">🇬🇧</span>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">English (UK)</p>
                      <p className="text-[9px] text-slate-500">Native / Full Working Proficiency</p>
                    </div>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-[#4A4DF2] text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                </div>

                {/* Second Language Card */}
                <div className="bg-white/95 rounded-xl p-2.5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">🇫🇷</span>
                    <div>
                      <p className="text-[10.5px] font-semibold text-slate-800 leading-tight">Français (FR)</p>
                      <p className="text-[8.5px] text-slate-400">Professional Working (C1)</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                    C1
                  </span>
                </div>

                {/* Third Language Card */}
                <div className="bg-white/95 rounded-xl p-2 border border-slate-200/90 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">🇩🇪</span>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-800 leading-tight">Deutsch (DE)</p>
                      <p className="text-[8px] text-slate-400">Conversational Proficiency</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                    B2
                  </span>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="absolute bottom-2.5 left-3.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-200 text-[9px] font-medium text-slate-600 flex items-center gap-1">
                <Globe className="w-2.5 h-2.5 text-[#4A4DF2]" />
                <span>1-Click CV Localisation</span>
              </div>
            </div>

            <div className="pt-5 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                Multilingual Support
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-[1.65]">
                Showcase certified language proficiencies with official CEFR standards (Native, C1, B2) for UK and multinational employers.
              </p>
            </div>
          </div>

          {/* Card 5: PDF & Public Share Links */}
          <div className="h-full rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-200 ease-out p-6 sm:p-7 flex flex-col justify-between group">
            {/* Micro-Mockup Canvas */}
            <div className="h-52 sm:h-56 rounded-xl bg-gradient-to-b from-[#F1F4FD] to-[#E8EEFB] border border-[#E2E8F5] p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative select-none">
              <div className="w-full max-w-[270px] space-y-2.5">
                {/* 1. PDF Download Card */}
                <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-9 rounded-lg bg-red-500 text-white flex flex-col items-center justify-center font-bold text-[9px] shadow-xs shrink-0">
                      <span>PDF</span>
                      <span className="text-[7px] font-mono opacity-80">A4</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10.5px] font-bold text-slate-900 truncate">Oliver_CV.pdf</p>
                      <p className="text-[8.5px] text-slate-500">300 DPI · Crisp Vector Layout</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[9.5px] font-semibold flex items-center gap-1 shadow-xs shrink-0">
                    <Download className="w-3 h-3 text-cyan-300" />
                    <span>Save</span>
                  </div>
                </div>

                {/* 2. Public Live Share Link Card */}
                <div className="bg-white rounded-xl p-2.5 border border-indigo-100 shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <LinkIcon className="w-3 h-3 text-[#4A4DF2]" />
                      Public Preview Link
                    </span>
                    <span className="text-[8.5px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Active
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 flex items-center justify-between">
                    <span className="font-mono text-[8.5px] text-slate-500 truncate">
                      ukcvmaker.com/share/oliver-h...
                    </span>
                    <span className="text-[9px] font-bold text-[#4A4DF2] ml-1 shrink-0">
                      Copy
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                PDF &amp; Public Share Links
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-[1.65]">
                Download high-resolution, print-ready A4 PDFs or generate a private preview link to share directly with recruiters.
              </p>
            </div>
          </div>

          {/* Card 6: Approved templates */}
          <div className="h-full rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-200 ease-out p-6 sm:p-7 flex flex-col justify-between group">
            {/* Micro-Mockup Canvas */}
            <div className="h-52 sm:h-56 rounded-xl bg-gradient-to-b from-[#F1F4FD] to-[#E8EEFB] border border-[#E2E8F5] p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative select-none">
              {/* Overlapping Sleek Modern Template Mockups */}
              <div className="relative flex items-center justify-center w-full max-w-[270px]">
                {/* Background Card 1: Minimal Clean */}
                <div className="w-24 sm:w-26 h-36 bg-slate-50 border border-slate-200/90 rounded-xl shadow-sm p-2 transform -rotate-10 -mr-6 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="h-2 w-12 bg-slate-800 rounded-sm" />
                    <div className="h-1 w-full bg-slate-300 rounded" />
                    <div className="h-1 w-4/5 bg-slate-200 rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-3/4 bg-slate-200 rounded" />
                  </div>
                  <span className="text-[7px] font-bold text-slate-500 uppercase">Minimal</span>
                </div>

                {/* Foreground Hero Card: Modern Executive */}
                <div className="w-28 sm:w-30 h-40 bg-white border-2 border-[#4A4DF2] rounded-xl shadow-xl p-2.5 z-10 flex flex-col justify-between transform transition-transform group-hover:scale-105 duration-200">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="h-2.5 w-14 bg-[#4A4DF2] rounded-sm" />
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-100 border border-blue-400" />
                    </div>
                    <div className="h-1 w-full bg-slate-300 rounded" />
                    <div className="h-1 w-5/6 bg-slate-200 rounded" />
                    <div className="h-1 w-4/6 bg-slate-200 rounded" />
                  </div>

                  <div className="p-1 rounded bg-blue-50/70 border border-blue-100 space-y-0.5">
                    <div className="h-1 w-12 bg-blue-600 rounded" />
                    <div className="h-0.5 w-full bg-blue-200 rounded" />
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="text-[7.5px] font-bold text-slate-900">Hopkins</span>
                    <span className="text-[7px] font-bold text-[#4A4DF2]">ATS 99%</span>
                  </div>
                </div>

                {/* Background Card 3: Classic Corporate */}
                <div className="w-24 sm:w-26 h-36 bg-slate-50 border border-slate-200/90 rounded-xl shadow-sm p-2 transform rotate-10 -ml-6 flex flex-col justify-between">
                  <div className="space-y-1 text-right">
                    <div className="h-2 w-12 bg-emerald-700 rounded-sm ml-auto" />
                    <div className="h-1 w-full bg-slate-300 rounded" />
                    <div className="h-1 w-3/4 bg-slate-200 rounded ml-auto" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-4/5 bg-slate-200 rounded" />
                  </div>
                  <span className="text-[7px] font-bold text-slate-500 uppercase text-right">Classic</span>
                </div>
              </div>

              {/* Floating Template Count Chip */}
              <div className="absolute bottom-2.5 right-3 bg-slate-900/90 backdrop-blur-xs text-white text-[9.5px] font-medium px-2 py-0.5 rounded-md shadow-xs">
                <span>7 Recruiter Formats</span>
              </div>
            </div>

            <div className="pt-5 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                Approved templates
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-[1.65]">
                Switch seamlessly between executive, classic, minimal, and academic UK layouts with guaranteed zero text truncation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
