'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Check,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { useCvStore } from '@/store/useCvStore';
import { CV_TEMPLATES, TEMPLATE_CATEGORIES } from '@/templates/registry';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { A4_WIDTH_PX, A4_HEIGHT_PX, TemplateDefinition } from '@/types/cv';
import TemplatePreviewModal from '@/components/common/TemplatePreviewModal';

const TEMPLATE_ACCENTS: Record<string, string> = {
  hopkins: '#2563EB',
  toronto: '#1E3A8A',
  'classic-corporate': '#0F172A',
  'minimal-clean': '#334155',
  yale: '#0284C7',
  'graduate-starter': '#4B4DED',
  'uk-traditional': '#1E293B',
};

const TEMPLATE_PERKS = [
  'ATS-friendly design',
  'Fully customizable',
  'Professional & modern layouts',
  'Multiple color options',
];

function HomeTemplateThumb({
  template,
  onPreview,
}: {
  template: TemplateDefinition;
  onPreview?: () => void;
}) {
  const Component = template.component;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.24);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = (width: number) => {
      if (width > 0) {
        setScale(Number((width / A4_WIDTH_PX).toFixed(4)));
      }
    };

    updateScale(el.clientWidth);

    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width || el.clientWidth;
      updateScale(w);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const accentColor = TEMPLATE_ACCENTS[template.id] || SAMPLE_UK_CV.settings.accentColor;

  return (
    <div
      ref={containerRef}
      onClick={onPreview}
      className="relative w-full aspect-[210/297] rounded-xl overflow-hidden bg-white shadow-inner mb-3 select-none cursor-pointer group-hover:shadow-md transition-shadow"
    >
      <div
        style={{
          width: `${A4_WIDTH_PX}px`,
          height: `${A4_HEIGHT_PX}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        className="absolute top-0 left-0 pointer-events-none bg-white text-slate-900 text-left"
      >
        <Component
          cv={{
            ...SAMPLE_UK_CV,
            settings: {
              ...SAMPLE_UK_CV.settings,
              templateId: template.id,
              accentColor,
            },
          }}
        />
      </div>

      {/* Subtle border ring */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5 pointer-events-none" />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-blue-950/65 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-center">
        <Eye className="w-5 h-5 text-blue-300" />
        <span className="text-[11px] font-bold text-white bg-[#2563EB] px-3 py-1 rounded-full shadow-xs">
          Preview Layout
        </span>
      </div>
    </div>
  );
}

export default function TemplatesSection() {
  const router = useRouter();
  const setStoreTemplate = useCvStore((state) => state.setTemplate);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Templates');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);

  const filterCategories = ['All Templates', ...TEMPLATE_CATEGORIES];

  const filteredTemplates =
    selectedCategory === 'All Templates'
      ? CV_TEMPLATES.slice(0, 4)
      : CV_TEMPLATES.filter(
          (t) => t.category.toLowerCase() === selectedCategory.toLowerCase()
        ).slice(0, 4);

  const handleSelectTemplate = (templateId: string) => {
    setStoreTemplate(templateId as any);
    router.push(`/builder?template=${encodeURIComponent(templateId)}`);
  };

  return (
    <section
      id="templates"
      aria-label="Professional Academic & Corporate CV Templates"
      className="py-16 sm:py-24 bg-[#080E24]/88 backdrop-blur-2xl backdrop-saturate-150 border-y border-white/15 text-white relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"
    >
      {/* Background smoked-glass sapphire & sky light pools */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[420px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/6 w-[520px] h-[380px] bg-sky-400/14 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-left mb-8 sm:mb-10">
          <p className="text-xs font-bold tracking-wider uppercase text-blue-300 mb-2">
            Recruiter-Approved A4 Layouts
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Professional Academic &amp; Corporate CV Templates
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl font-normal leading-relaxed">
            Choose from a wide range of modern and professional templates for every industry and career stage.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-8">
          {filterCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#2563EB] text-white shadow-[0_6px_18px_rgba(37,99,235,0.4)] ring-1 ring-blue-300/60'
                    : 'bg-white/10 hover:bg-white/18 backdrop-blur-md text-slate-200 border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Template Cards + Right Side "Why Choose" Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Cards: 2 per row on mobile, 4 on desktop */}
          <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative rounded-xl sm:rounded-2xl bg-white/[0.08] hover:bg-white/[0.13] backdrop-blur-2xl backdrop-saturate-150 border border-white/18 hover:border-blue-400/55 p-2.5 sm:p-3 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between shadow-[0_14px_38px_rgba(0,0,0,0.28),inset_0_1px_1px_rgba(255,255,255,0.18)] min-w-0"
              >
                {/* Live Scaled A4 CV Template Preview */}
                <HomeTemplateThumb
                  template={template}
                  onPreview={() => setPreviewTemplate(template)}
                />

                {/* Card Title & Category Tag */}
                <div className="px-0.5 sm:px-1 pb-2 text-left min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-[13px] sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                      {template.name}
                    </h4>
                    <span className="text-[10px] text-blue-300/80 font-mono shrink-0">
                      A4
                    </span>
                  </div>
                  <p className="text-[10.5px] sm:text-[11px] text-slate-300/80 capitalize mt-0.5 truncate">
                    {template.category}
                  </p>
                </div>

                {/* Action Buttons: Preview & Use */}
                <div className="flex sm:grid sm:grid-cols-2 items-center gap-1.5 pt-1.5 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(template)}
                    aria-label={`Preview ${template.name} template`}
                    title={`Preview ${template.name}`}
                    className="min-h-[36px] w-[36px] sm:w-auto px-0 sm:px-2 py-1.5 rounded-lg sm:rounded-xl bg-white/12 hover:bg-white/22 backdrop-blur-md border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectTemplate(template.id)}
                    className="flex-1 min-h-[36px] px-2 py-1.5 rounded-lg sm:rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <span>Use</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side "Why choose our templates?" card */}
          <div className="lg:col-span-4 xl:col-span-3 rounded-2xl bg-white/[0.08] backdrop-blur-2xl backdrop-saturate-150 border border-white/18 p-6 flex flex-col justify-between text-left shadow-[0_14px_38px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                Why choose our templates?
              </h3>
              <ul className="space-y-3 mb-6">
                {TEMPLATE_PERKS.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-100 font-medium">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/cv-templates"
              className="w-full min-h-[44px] px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#00B67A] hover:opacity-95 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] whitespace-nowrap"
            >
              <span>Browse All Templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Full Responsive Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onUseTemplate={handleSelectTemplate}
      />
    </section>
  );
}
