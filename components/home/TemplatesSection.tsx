'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Plus, Sparkles, Check, ChevronRight, ShieldCheck, Star } from 'lucide-react';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { CV_TEMPLATES } from '@/templates/registry';
import { useCvStore } from '@/store/useCvStore';

export default function TemplatesSection() {
  const router = useRouter();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('uk-traditional');
  const setStoreTemplate = useCvStore((state) => state.setTemplate);

  const activeTemplate = CV_TEMPLATES.find((t) => t.id === selectedTemplateId) || CV_TEMPLATES[0];
  const ActiveComponent = activeTemplate.component;

  const handleUseTemplate = (templateId: string) => {
    setStoreTemplate(templateId as any);
    router.push('/start');
  };

  return (
    <section id="templates-section" className="py-20 md:py-28 bg-[#090d1f] text-white relative overflow-hidden">
      {/* Subtle curved background overlay */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-[#0d122e]/60 rounded-t-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title and Description */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>6 ATS-Compliant British & Global Templates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Professional UK Academic & Corporate CV Templates
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            100% compliant with standard UK ATS scanners and top-tier investment banking, consulting, tech, and graduate guidelines.
          </p>

          {/* Template Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CV_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedTemplateId;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#4B4DED] text-white shadow-lg shadow-[#4B4DED]/30 scale-102 ring-2 ring-blue-400/40'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  <span>{tmpl.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'}`}>
                    {tmpl.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Template & Details Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Active Featured Template Preview */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="group relative rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-700/60 transition-all hover:ring-4 hover:ring-[#4B4DED]/40 w-[360px] sm:w-[400px] aspect-[1/1.414]">
              {/* Scaled Preview of the Template */}
              <div className="origin-top-left scale-[0.45] sm:scale-[0.50] pointer-events-none w-[794px] h-[1123px] bg-white">
                <ActiveComponent cv={{ ...SAMPLE_UK_CV, settings: { ...SAMPLE_UK_CV.settings, templateId: activeTemplate.id } }} />
              </div>

              {/* Hover overlay with action */}
              <div className="absolute inset-0 bg-[#090d1f]/75 backdrop-blur-xs flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity p-6 text-center">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" /> {activeTemplate.name}
                </span>
                <p className="text-xs text-slate-300 max-w-xs">
                  {activeTemplate.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleUseTemplate(activeTemplate.id)}
                  className="px-6 py-2.5 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs font-semibold shadow-lg transition-all cursor-pointer"
                >
                  Use this template
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Template Highlights & Modular Architecture info */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified ATS Compatible</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {activeTemplate.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeTemplate.description}
              </p>
              {activeTemplate.bestFor && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Best suited for:</strong>
                  <span>{activeTemplate.bestFor}</span>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs text-slate-200">
                  <strong className="text-white">Precision A4 Standard:</strong> Exact 210mm &times; 297mm dimensions at 300 DPI high resolution.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs text-slate-200">
                  <strong className="text-white">Dual-Mode Export:</strong> Instant 1-click PDF download plus clean browser vector print.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs text-slate-200">
                  <strong className="text-white">Live Real-Time Sync:</strong> Every keystroke immediately reflected in the preview without lag.
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => handleUseTemplate(activeTemplate.id)}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Use this template</span>
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
