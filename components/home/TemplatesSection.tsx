'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Check, ChevronRight, ShieldCheck } from 'lucide-react';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { CV_TEMPLATES } from '@/templates/registry';
import { useCvStore } from '@/store/useCvStore';
import { A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';

export default function TemplatesSection() {
  const router = useRouter();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('hopkins');
  const setStoreTemplate = useCvStore((state) => state.setTemplate);

  const previewFrameRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState<number>(0.44);
  const tabButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeTemplate =
    CV_TEMPLATES.find((t) => t.id === selectedTemplateId) || CV_TEMPLATES[0];
  const ActiveComponent = activeTemplate.component;

  // Dynamically measure container width so the 794px A4 sheet scales crisply with zero overflow on phones
  useEffect(() => {
    const el = previewFrameRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width || el.clientWidth;
      if (width > 0) {
        setPreviewScale(Number((width / A4_WIDTH_PX).toFixed(4)));
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const btn = tabButtonRefs.current[selectedTemplateId];
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedTemplateId]);

  const handleUseTemplate = (templateId: string) => {
    setStoreTemplate(templateId as any);
    router.push('/start');
  };

  return (
    <section
      id="templates-section"
      aria-label="Professional Academic & Corporate CV Templates"
      className="py-16 sm:py-20 lg:py-28 bg-[#090d1f] text-white relative overflow-hidden"
    >
      {/* Subtle curved background overlay */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-[#0d122e]/60 rounded-t-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title and Description */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2.5">
            ATS-Compliant British &amp; Global Layouts · ISO A4
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight [text-wrap:balance]">
            Professional Academic &amp; Corporate CV Templates
          </h2>
          <p className="mt-3 text-base text-slate-300 max-w-xl mx-auto leading-[1.65]">
            Engineered for standard UK ATS scanners and investment banking, consulting, tech, and graduate applications.
          </p>

          {/* Template Selector Tabs — Smooth Horizontal Swipe on Mobile, Centered Wrap on sm+ */}
          <div
            role="tablist"
            aria-label="Choose a CV template"
            className="flex sm:flex-wrap items-center sm:justify-center gap-2 mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none snap-x pb-1"
          >
            {CV_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedTemplateId;
              return (
                <button
                  key={tmpl.id}
                  ref={(el) => {
                    tabButtonRefs.current[tmpl.id] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`min-h-[44px] snap-start px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] ${
                    isSelected
                      ? 'bg-[#4a4df2] text-white shadow-lg shadow-[#4a4df2]/30 ring-1 ring-indigo-300'
                      : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                  }`}
                >
                  <span>{tmpl.name}</span>
                  <span className={isSelected ? 'text-indigo-100 text-xs font-normal' : 'text-slate-400 text-xs font-normal'}>
                    · {tmpl.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Template & Details Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Active Featured Template Preview with Elevated Shadow */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div
              ref={previewFrameRef}
              onClick={() => handleUseTemplate(activeTemplate.id)}
              className="group relative rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden border border-slate-700/60 transition-all duration-200 sm:hover:ring-4 sm:hover:ring-[#4a4df2]/50 w-full max-w-[340px] sm:max-w-[400px] aspect-[210/297] cursor-pointer"
            >
              <div
                style={{
                  width: `${A4_WIDTH_PX}px`,
                  height: `${A4_HEIGHT_PX}px`,
                  transform: `scale(${previewScale})`,
                  transformOrigin: 'top left',
                }}
                className="absolute top-0 left-0 pointer-events-none bg-white select-none"
              >
                <ActiveComponent
                  cv={{
                    ...SAMPLE_UK_CV,
                    settings: { ...SAMPLE_UK_CV.settings, templateId: activeTemplate.id },
                  }}
                />
              </div>

              {/* Desktop Hover Overlay */}
              <div className="hidden sm:flex absolute inset-0 bg-[#090d1f]/80 backdrop-blur-xs flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-6 text-center">
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-400" /> {activeTemplate.name}
                </span>
                <p className="text-xs text-slate-300 max-w-xs leading-relaxed">{activeTemplate.description}</p>
                <span className="px-6 py-2.5 rounded-xl bg-[#4a4df2] text-white text-xs font-semibold shadow-lg">
                  Use this template
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Template Highlights & Primary CTA */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Verified ATS Compatible · {activeTemplate.category}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">{activeTemplate.name}</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-[1.65]">{activeTemplate.description}</p>
              {activeTemplate.bestFor && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
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
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <strong className="text-white">Precision A4 Standard:</strong> Exact 210mm &times; 297mm dimensions calibrated for print and digital.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <strong className="text-white">Dual-Mode Export:</strong> Instant 1-click PDF download, vector print, and temporary share links.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <strong className="text-white">Live Mobile &amp; Desktop Sync:</strong> Edit comfortably on any smartphone or desktop screen.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleUseTemplate(activeTemplate.id)}
                className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#4a4df2] hover:bg-[#3d40e0] text-white font-semibold text-base sm:text-[15px] shadow-lg shadow-[#4a4df2]/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
              >
                <span>Use {activeTemplate.name} template</span>
                <ChevronRight className="w-4 h-4 ml-1.5 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
