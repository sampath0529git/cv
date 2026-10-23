'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Plus, Sparkles, Check } from 'lucide-react';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import UkTraditionalTemplate from '@/templates/UkTraditionalTemplate';

export default function TemplatesSection() {
  return (
    <section id="templates-section" className="py-20 md:py-28 bg-[#090d1f] text-white relative overflow-hidden">
      {/* Subtle curved background overlay */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-[#0d122e]/60 rounded-t-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title and Description */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UK Standard Format</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Professional UK Academic & Corporate CV Template
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            100% compliant with standard UK ATS scanners and top-tier investment banking, consulting, and university guidelines.
          </p>
        </div>

        {/* Featured Template & Extensible Upcoming Slots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Active Featured UK Traditional Template Preview */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="group relative rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-700/60 transition-all hover:ring-4 hover:ring-[#4B4DED]/40 w-[360px] sm:w-[400px] aspect-[1/1.414]">
              {/* Scaled Preview of the Template */}
              <div className="origin-top-left scale-[0.45] sm:scale-[0.50] pointer-events-none w-[794px] h-[1123px]">
                <UkTraditionalTemplate cv={SAMPLE_UK_CV} />
              </div>

              {/* Hover overlay with action */}
              <div className="absolute inset-0 bg-[#090d1f]/75 backdrop-blur-xs flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity p-6 text-center">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" /> UK Traditional Academic & Corporate
                </span>
                <p className="text-xs text-slate-300">
                  Education first, left date gutters, and structured Additional Information.
                </p>
                <Link
                  href="/start"
                  className="px-6 py-2.5 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs font-semibold shadow-lg transition-all"
                >
                  Use this template
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Template Highlights & Modular Architecture info */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Official British Recruitment Standard
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Featuring the classic centered header, crisp dividing rules, date gutter alignment, and dedicated sections for Education, Work Experience, Interests, Achievements, Nationality, and Languages.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs text-slate-200">
                  <strong className="text-white">ATS-Scannable:</strong> Clean single-column typography without nested table boxes.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs text-slate-200">
                  <strong className="text-white">Education-First Layout:</strong> Tailored for UK graduates, academics, and corporate professionals.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs text-slate-200">
                  <strong className="text-white">Modular Architecture:</strong> Ready to seamlessly add more uploaded templates.
                </div>
              </div>
            </div>

            {/* Extensible Coming Soon Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 shrink-0">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">More templates can be uploaded</h4>
                <p className="text-[11px] text-slate-400">
                  Upload more templates anytime; the system automatically adapts to your custom formats.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/start"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm shadow-md transition-all active:scale-95"
              >
                Create my CV with this template
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
