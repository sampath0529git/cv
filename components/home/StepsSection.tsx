'use client';

import React from 'react';
import Link from 'next/link';
import { Upload, Edit3, Sparkles, FileText, MousePointer, Mail, Printer } from 'lucide-react';

export default function StepsSection() {
  return (
    <section id="steps-section" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Create your CV in 4 steps
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1: Start your way */}
          <div className="flex flex-col text-center">
            {/* Visual Box with exact dark navy background #0a0f29 */}
            <div className="h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-md">
              <div className="w-full max-w-[210px] bg-white rounded-lg p-3 text-slate-900 space-y-2 shadow-sm text-left">
                <div className="flex items-center gap-2 p-1.5 rounded-md border border-slate-200 bg-slate-50/70 hover:bg-slate-100 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-semibold text-slate-800">Import my CV</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-md border border-slate-200 bg-slate-50/70 hover:bg-slate-100 cursor-pointer">
                  <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-800">From scratch</span>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <h3 className="font-bold text-slate-900 text-base">Start your way</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Import an existing CV or start from scratch.
              </p>
            </div>
          </div>

          {/* Step 2: Write it with AI */}
          <div className="flex flex-col text-center">
            <div className="h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-md">
              <div className="w-full max-w-[210px] bg-white rounded-lg p-3 text-slate-900 space-y-2 shadow-sm text-left">
                <div className="text-[11px] font-bold text-slate-800">Work experience</div>
                <div className="px-2 py-1.5 rounded border border-slate-200 text-[10px] text-slate-400">
                  Job description...
                </div>
                <div className="pt-1">
                  <div className="w-full py-1.5 px-2 bg-[#3b5bfd] text-white rounded text-[10px] font-semibold flex items-center justify-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>Use smart AI assistant</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <h3 className="font-bold text-slate-900 text-base">Write it with AI</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Get tailored phrasing for each section as you type.
              </p>
            </div>
          </div>

          {/* Step 3: Make it yours */}
          <div className="flex flex-col text-center">
            <div className="h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-md">
              <div className="w-full max-w-[210px] bg-white rounded-lg p-3 text-slate-900 shadow-sm text-left relative overflow-hidden">
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
                    <div className="text-[8px] text-slate-400">Colors</div>
                    <div className="h-1.5 w-full bg-slate-200 rounded" />
                    <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-100 p-1.5 rounded">
                    <div className="h-1.5 w-10 bg-slate-400 rounded mb-1" />
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-4/5 bg-slate-200 rounded mt-0.5" />
                  </div>
                </div>
                {/* Pointer Cursor */}
                <div className="absolute bottom-2 right-4 text-slate-900">
                  <MousePointer className="w-3.5 h-3.5 fill-slate-900 text-white" />
                </div>
              </div>
            </div>

            <div className="pt-5">
              <h3 className="font-bold text-slate-900 text-base">Make it yours</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Adjust colors, fonts, and spacing in one click.
              </p>
            </div>
          </div>

          {/* Step 4: Download and apply */}
          <div className="flex flex-col text-center">
            <div className="h-48 rounded-xl bg-[#0a0f29] p-4 flex flex-col justify-center items-center shadow-md">
              <div className="w-full max-w-[210px] bg-white rounded-lg p-2.5 text-slate-900 shadow-sm text-left space-y-1.5 relative">
                <div className="flex items-center gap-2 p-1 rounded hover:bg-slate-50 text-[11px] text-slate-700">
                  <span className="w-3.5 h-3.5 bg-blue-600 text-white font-bold rounded-[2px] flex items-center justify-center text-[7px]">W</span>
                  <span>Word (.docx)</span>
                </div>
                <div className="flex items-center justify-between p-1 rounded bg-slate-100 text-[11px] font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-rose-500" />
                    <span>PDF (.pdf)</span>
                  </div>
                  {/* Cursor Arrow */}
                  <MousePointer className="w-3.5 h-3.5 fill-slate-900 text-white" />
                </div>
                <div className="flex items-center gap-2 p-1 rounded hover:bg-slate-50 text-[11px] text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email</span>
                </div>
                <div className="flex items-center gap-2 p-1 rounded hover:bg-slate-50 text-[11px] text-slate-700">
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>Print</span>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <h3 className="font-bold text-slate-900 text-base">Download and apply</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Export to PDF or Word and start applying.
              </p>
            </div>
          </div>
        </div>

        {/* Central CTA */}
        <div className="mt-12 text-center">
          <Link
            href="#templates-section"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#3b5bfd] hover:bg-[#2f4ee8] text-white font-semibold text-sm shadow-md transition-all active:scale-95"
          >
            Create my CV
          </Link>
        </div>
      </div>
    </section>
  );
}
