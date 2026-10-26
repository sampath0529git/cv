'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TopNav from '@/components/navigation/TopNav';
import Footer from '@/components/layout/Footer';
import { CV_TEMPLATES, TEMPLATE_CATEGORIES } from '@/templates/registry';
import { useCvStore } from '@/store/useCvStore';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { A4_WIDTH_PX, A4_HEIGHT_PX, TemplateDefinition, TemplateCategory } from '@/types/cv';
import { Check, Eye, ShieldCheck, Sparkles, ArrowRight, X, FileText, CheckCircle2 } from 'lucide-react';
import TemplatePreviewModal from '@/components/common/TemplatePreviewModal';

function TemplateCard({
  template,
  onSelect,
  onPreview,
}: {
  template: TemplateDefinition;
  onSelect: (id: string) => void;
  onPreview: (template: TemplateDefinition) => void;
}) {
  const Component = template.component;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.35);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width || el.clientWidth;
      if (w > 0) {
        setScale(Number((w / A4_WIDTH_PX).toFixed(4)));
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="group rounded-3xl bg-white border border-[#E8EAF5] shadow-xs hover:shadow-xl hover:border-[#4B4DED]/40 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Visual Preview Container */}
      <div
        ref={containerRef}
        onClick={() => onPreview(template)}
        className="relative w-full aspect-[210/297] bg-slate-50 overflow-hidden cursor-pointer select-none border-b border-[#E8EAF5]"
      >
        <div
          style={{
            width: `${A4_WIDTH_PX}px`,
            height: `${A4_HEIGHT_PX}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          className="absolute top-0 left-0 pointer-events-none bg-white"
        >
          <Component
            cv={{
              ...SAMPLE_UK_CV,
              settings: { ...SAMPLE_UK_CV.settings, templateId: template.id },
            }}
          />
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#0F1B4D]/85 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/10">
          {template.category}
        </div>

        {/* Photo support indicator */}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-medium shadow-xs">
          {template.supportsPhoto ? 'Photo Supported' : 'Text Only'}
        </div>

        {/* Hover Quick Preview Action */}
        <div className="absolute inset-0 bg-[#0F1B4D]/60 backdrop-blur-xs flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(template);
            }}
            className="px-4 py-2.5 rounded-xl bg-white text-[#0F1B4D] text-xs font-semibold shadow-lg hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#4B4DED]" />
            <span>Full Preview</span>
          </button>
        </div>
      </div>

      {/* Details & Actions */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0F1B4D] tracking-tight">{template.name}</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3 h-3" /> ATS Ready
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
            {template.description}
          </p>
          {template.bestFor && (
            <p className="text-[11px] text-slate-400 italic">
              <span className="font-semibold text-slate-600 not-italic">Ideal for:</span> {template.bestFor}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="text-xs font-semibold text-slate-600 hover:text-[#4B4DED] transition-colors cursor-pointer"
          >
            Preview layout
          </button>
          <button
            type="button"
            onClick={() => onSelect(template.id)}
            className="px-4 py-2.5 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <span>Use Template</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const router = useRouter();
  const setStoreTemplate = useCvStore((state) => state.setTemplate);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);

  const filteredTemplates = activeCategory === 'All'
    ? CV_TEMPLATES
    : CV_TEMPLATES.filter((t) => t.category === activeCategory);

  const handleUseTemplate = (templateId: string) => {
    setStoreTemplate(templateId as any);
    router.push('/start');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <TopNav />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-[#090d1f] via-[#0F1B4D] to-[#1E2563] text-white py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4B4DED_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>ISO A4 &bull; British &amp; Global Recruitment Formats</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
              Free CV Templates – Recruiter-Approved UK Formats
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Explore recruiter-approved free CV templates designed to pass automated ATS parsers, impress British employers, and deliver crystal-clear 300 DPI A4 PDF exports.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === 'All'
                    ? 'bg-[#4B4DED] text-white shadow-lg shadow-[#4B4DED]/30'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
                }`}
              >
                All Templates ({CV_TEMPLATES.length})
              </button>
              {TEMPLATE_CATEGORIES.map((cat) => {
                const count = CV_TEMPLATES.filter((t) => t.category === cat).length;
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#4B4DED] text-white shadow-lg shadow-[#4B4DED]/30'
                        : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Templates Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleUseTemplate}
                onPreview={(tmpl) => setPreviewTemplate(tmpl)}
              />
            ))}
          </div>
        </section>

        {/* Why Choose Our Templates */}
        <section className="bg-white border-y border-slate-200/80 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B4D] tracking-tight">
                Designed for Hiring Success
              </h2>
              <p className="text-sm sm:text-base text-slate-500">
                We combine rigorous ATS compatibility with elegant typography to ensure your CV stands out for the right reasons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4B4DED] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F1B4D]">100% ATS Optimized</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Clean structural hierarchy, standard headings, and machine-readable text blocks guarantee your CV parses accurately through Workday, Greenhouse, and Taleo.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F1B4D]">ISO A4 Print Precision</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Calibrated to standard UK and European A4 dimensions (210 &times; 297 mm) with exact margin padding so your PDF prints cleanly without awkward page breaks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F1B4D]">Recruiter Approved</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Reviewed by veteran London recruiters and hiring managers in finance, law, engineering, and technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F1B4D] to-[#1E2563] text-white shadow-xl space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to create your professional CV?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Pick any template and build your tailored, ATS-ready CV in minutes with AI-powered summaries and bullet points.
            </p>
            <div className="pt-2">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#4B4DED]/40 transition-all active:scale-95"
              >
                <span>Build CV Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Full Responsive Preview Modal with Auto-Fit & Mobile Calibration */}
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onUseTemplate={handleUseTemplate}
      />

      <Footer />
    </div>
  );
}
