'use client';

import React from 'react';
import { Plus, Sparkles, Check, Link as LinkIcon, FileText, CheckCircle2 } from 'lucide-react';

export default function ReasonsSection() {
  return (
    <section className="py-10 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-950 tracking-tight leading-tight [text-wrap:balance]">
            6 Reasons to Create Your CV with ukcvmaker
          </h2>
        </div>

        {/* 6 Grid Cards with soft ice-blue background `#eef3fd` */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">
          {/* Card 1: CV Creator */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#eef3fd] p-5 sm:p-7 flex flex-col justify-between hover:bg-[#e7eefb] transition-colors duration-200 group">
            <div className="h-44 sm:h-52 rounded-2xl bg-white shadow-xs p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative">
              <div className="relative w-full max-w-[220px] bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-sm">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[8px] font-semibold text-blue-600">Distraction-free</span>
                </div>

                <div className="bg-white rounded-lg p-2.5 border border-slate-200/80 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-[8px] text-white font-bold shrink-0">
                      EM
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="h-1.5 w-16 bg-slate-800 rounded-full" />
                      <div className="h-1 w-24 bg-blue-600 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-1 pt-1">
                    <div className="h-1 w-full bg-slate-200 rounded-full" />
                    <div className="h-1 w-5/6 bg-slate-200 rounded-full" />
                    <div className="h-1 w-4/6 bg-slate-200 rounded-full" />
                  </div>
                </div>

                <div className="absolute -bottom-2 right-2 bg-slate-900 text-white rounded-lg px-2 py-1 shadow-md flex items-center gap-1.5 text-[8.5px]">
                  <FileText className="w-3 h-3 text-cyan-400" />
                  <span className="font-medium">Live Editor</span>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                CV Creator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
                Build your CV online in a clean, distraction-free mobile and desktop studio.
              </p>
            </div>
          </div>

          {/* Card 2: Pre-written content */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#eef3fd] p-5 sm:p-7 flex flex-col justify-between hover:bg-[#e7eefb] transition-colors duration-200 group">
            <div className="h-44 sm:h-52 rounded-2xl bg-white shadow-xs p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative">
              <div className="w-full max-w-[230px] space-y-2">
                <div className="flex items-center justify-between text-[9px]">
                  <span className="font-bold text-slate-800">Pre-written phrases</span>
                  <span className="font-semibold text-[#4a4df2] inline-flex items-center gap-0.5">
                    <Plus className="w-2.5 h-2.5" /> 1-Tap Insert
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5 text-left">
                  <div className="flex items-start gap-1.5 bg-white p-1.5 rounded border border-blue-100 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-[8.5px] text-slate-700 font-medium leading-tight">
                      Led development of retail merchandise strategy...
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5 bg-white p-1.5 rounded border border-slate-100">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-[8.5px] text-slate-600 leading-tight">
                      Exceeded quarterly revenue targets by 24%...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                Pre-written content
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
                Not sure what to write? Start from recruiter-validated starters and customise freely.
              </p>
            </div>
          </div>

          {/* Card 3: Smart Suggestions */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#eef3fd] p-5 sm:p-7 flex flex-col justify-between hover:bg-[#e7eefb] transition-colors duration-200 group">
            <div className="h-44 sm:h-52 rounded-2xl bg-white shadow-xs p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative">
              <div className="w-full max-w-[230px] space-y-2">
                <div className="flex items-center justify-between text-[9px]">
                  <span className="font-semibold text-slate-500">Smart suggestion</span>
                  <span className="font-semibold text-indigo-950 inline-flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#4a4df2]" />
                    <span>Tailored Phrasing</span>
                  </span>
                </div>

                <div className="bg-gradient-to-br from-indigo-50/80 via-blue-50/60 to-purple-50/80 border border-indigo-200/80 rounded-xl p-2.5 text-left space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[8.5px] tabular-nums">
                    <span className="font-bold text-indigo-950">ATS Alignment</span>
                    <span className="font-semibold text-emerald-700">Verified UK Format</span>
                  </div>
                  <p className="text-[8px] text-slate-600 leading-snug">
                    Highlighting &ldquo;Stakeholder Management&rdquo; aligns with senior commercial hiring criteria.
                  </p>
                  <div className="pt-1 flex justify-end">
                    <span className="text-[8.5px] font-bold text-[#4a4df2]">
                      Apply phrasing &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                Guided Phrasing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
                Structure crisp executive summaries and measurable bullet points approved by UK recruiters.
              </p>
            </div>
          </div>

          {/* Card 4: Multilingual Templates */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#eef3fd] p-5 sm:p-7 flex flex-col justify-between hover:bg-[#e7eefb] transition-colors duration-200 group">
            <div className="h-44 sm:h-52 rounded-2xl bg-white shadow-xs p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative">
              <div className="relative flex items-center justify-center">
                <div className="w-18 sm:w-20 h-26 sm:h-28 bg-slate-50 border border-slate-200 rounded-lg shadow-xs p-2 transform -rotate-8 -mr-4 flex flex-col justify-between">
                  <span className="text-[8px] font-bold text-slate-700">FR</span>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-blue-300 rounded" />
                    <div className="h-1 w-4/5 bg-slate-200 rounded" />
                  </div>
                </div>

                <div className="w-22 sm:w-24 h-30 sm:h-32 bg-white border-2 border-[#4a4df2] rounded-xl shadow-lg p-2.5 z-10 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-900">English (UK)</span>
                    <Check className="w-3 h-3 text-[#4a4df2]" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-[#4a4df2] rounded" />
                    <div className="h-1 w-5/6 bg-slate-200 rounded" />
                    <div className="h-1 w-4/6 bg-slate-200 rounded" />
                  </div>
                  <span className="text-[7.5px] font-semibold text-center text-[#4a4df2]">
                    1-Click Format
                  </span>
                </div>

                <div className="w-18 sm:w-20 h-26 sm:h-28 bg-slate-50 border border-slate-200 rounded-lg shadow-xs p-2 transform rotate-8 -ml-4 flex flex-col justify-between">
                  <span className="text-[8px] font-bold text-slate-700 text-right">DE</span>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-rose-300 rounded" />
                    <div className="h-1 w-4/5 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                Multilingual Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
                Showcase language proficiencies clearly for UK and European employers.
              </p>
            </div>
          </div>

          {/* Card 5: Instant Public Sharing & Export */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#eef3fd] p-5 sm:p-7 flex flex-col justify-between hover:bg-[#e7eefb] transition-colors duration-200 group">
            <div className="h-44 sm:h-52 rounded-2xl bg-white shadow-xs p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative">
              <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                <div className="w-22 sm:w-24 h-28 sm:h-32 bg-white border border-slate-200 rounded-lg shadow-sm p-2 flex flex-col justify-between text-left">
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-[#2563eb] rounded-full" />
                    <div className="flex items-center gap-1 pt-0.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
                      <div className="h-1 w-10 bg-slate-400 rounded" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-5/6 bg-slate-200 rounded" />
                    <div className="h-1 w-4/6 bg-slate-200 rounded" />
                  </div>
                  <span className="text-[7px] font-semibold text-slate-400 text-center">
                    A4 PDF
                  </span>
                </div>

                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[#4a4df2] z-10 shadow-2xs shrink-0">
                  <LinkIcon className="w-3 h-3" />
                </div>

                <div className="w-22 sm:w-24 h-28 sm:h-32 bg-white border border-slate-200 rounded-lg shadow-sm p-2 flex flex-col justify-between text-left">
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-[#2563eb] rounded-full" />
                    <div className="h-1 w-12 bg-slate-400 rounded pt-0.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-5/6 bg-slate-200 rounded" />
                  </div>
                  <span className="text-[7px] font-semibold text-emerald-600 text-center">
                    Share Link
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                PDF &amp; Public Share Links
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
                Download high-resolution A4 PDFs or share a temporary read-only preview link in one click.
              </p>
            </div>
          </div>

          {/* Card 6: Approved templates */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#eef3fd] p-5 sm:p-7 flex flex-col justify-between hover:bg-[#e7eefb] transition-colors duration-200 group">
            <div className="h-44 sm:h-52 rounded-2xl bg-white shadow-xs p-3.5 sm:p-4 flex items-center justify-center overflow-hidden relative">
              <div className="flex items-center -space-x-3 sm:-space-x-4">
                <div className="w-18 sm:w-22 h-26 sm:h-32 bg-[#fefce8] border border-amber-200/90 rounded-lg shadow-xs p-2 transform -rotate-6 transition-transform group-hover:-rotate-8">
                  <div className="h-1.5 w-full bg-[#f59e0b] rounded-full mb-1.5" />
                  <div className="space-y-1">
                    <div className="h-1 w-3/4 bg-slate-300 rounded" />
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-4/5 bg-slate-200 rounded" />
                  </div>
                </div>

                <div className="w-22 sm:w-26 h-32 sm:h-38 bg-white border border-slate-200 rounded-lg shadow-lg p-2.5 z-10 transition-transform group-hover:scale-105">
                  <div className="h-2 w-full bg-[#2563eb] rounded-full mb-2" />
                  <div className="space-y-1.5">
                    <div className="h-1 w-3/4 bg-slate-400 rounded mb-1" />
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-5/6 bg-slate-200 rounded" />
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-3/4 bg-slate-200 rounded" />
                  </div>
                </div>

                <div className="w-18 sm:w-22 h-26 sm:h-32 bg-[#f0fdf4] border border-emerald-200/90 rounded-lg shadow-xs p-2 transform rotate-6 transition-transform group-hover:rotate-8">
                  <div className="h-1.5 w-full bg-[#10b981] rounded-full mb-1.5" />
                  <div className="space-y-1">
                    <div className="h-1 w-3/4 bg-slate-300 rounded" />
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-4/5 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 text-left">
              <h3 className="font-bold text-slate-950 text-lg sm:text-xl tracking-tight">
                Approved templates
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
                Switch seamlessly between executive, classic, minimal, and two-column UK layouts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
