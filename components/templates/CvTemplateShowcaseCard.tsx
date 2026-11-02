'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { A4_WIDTH_PX, A4_HEIGHT_PX, CV, TemplateDefinition } from '@/types/cv';

interface CvTemplateShowcaseCardProps {
  template: TemplateDefinition;
  sampleCv: CV;
  accentColor?: string;
  onPreview: (template: TemplateDefinition) => void;
  onUseTemplate: (templateId: string) => void;
}

export default function CvTemplateShowcaseCard({
  template,
  sampleCv,
  accentColor,
  onPreview,
  onUseTemplate,
}: CvTemplateShowcaseCardProps) {
  const Component = template.component;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.22);

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

  const resolvedAccent = accentColor || sampleCv.settings.accentColor;

  const renderedCv: CV = {
    ...sampleCv,
    settings: {
      ...sampleCv.settings,
      templateId: template.id,
      accentColor: resolvedAccent,
      showPhoto: Boolean(
        template.supportsPhoto && sampleCv.settings.showPhoto && sampleCv.personal.photoUrl
      ),
    },
  };

  return (
    <article className="group bg-white/64 hover:bg-white/86 backdrop-blur-2xl backdrop-saturate-150 rounded-xl sm:rounded-2xl border border-white/85 hover:border-blue-400/70 ring-1 ring-slate-900/[0.04] shadow-[0_12px_34px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_18px_44px_rgba(37,99,235,0.13)] transition-all duration-200 flex flex-col justify-between overflow-hidden min-w-0">
      {/* Live Scaled ISO A4 Preview Stage */}
      <div className="p-2 sm:p-4 lg:p-5 bg-slate-900/[0.03] border-b border-white/75 relative">
        <div
          ref={containerRef}
          onClick={() => onPreview(template)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPreview(template);
            }
          }}
          aria-label={`Preview ${template.name} UK CV template`}
          className="relative w-full aspect-[210/297] bg-white rounded-md sm:rounded-lg shadow-[0_4px_14px_rgba(15,23,42,0.07)] sm:shadow-[0_6px_24px_rgba(15,23,42,0.08)] overflow-hidden ring-1 ring-slate-900/5 cursor-pointer group-hover:shadow-[0_12px_32px_rgba(15,23,42,0.14)] transition-shadow"
        >
          <div
            style={{
              width: `${A4_WIDTH_PX}px`,
              height: `${A4_HEIGHT_PX}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            className="absolute top-0 left-0 pointer-events-none select-none bg-white text-left"
          >
            <Component cv={renderedCv} />
          </div>

          {/* Desktop Hover Inspection Overlay */}
          <div className="hidden sm:flex absolute inset-0 bg-[#0B112C]/35 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center justify-center p-4">
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/88 backdrop-blur-xl border border-white/90 text-slate-900 font-semibold text-xs shadow-lg">
              <Eye className="w-4 h-4 text-[#2563EB]" />
              <span>Inspect Full A4 Layout</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Body — Compact 2-up Mobile Anatomy + Full Desktop Detail */}
      <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between gap-2.5 sm:gap-4 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-medium text-slate-500 min-w-0 truncate">
            <span className="font-semibold text-[#2563EB] shrink-0">{template.category}</span>
            <span className="text-slate-300 shrink-0" aria-hidden="true">
              ·
            </span>
            <span className="hidden sm:inline shrink-0">ISO A4</span>
            <span className="hidden sm:inline text-slate-300 shrink-0" aria-hidden="true">
              ·
            </span>
            <span className="truncate">
              {template.supportsPhoto ? 'Photo Optional' : 'Text-Only A4'}
            </span>
          </div>

          <h3 className="text-[14px] sm:text-lg font-bold text-slate-900 tracking-tight mt-0.5 sm:mt-1 leading-snug truncate group-hover:text-[#2563EB] transition-colors">
            {template.name}
          </h3>

          <p className="text-[11.5px] sm:text-[13px] text-slate-600 mt-1 sm:mt-1.5 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-3">
            {template.description}
          </p>
        </div>

        <div className="space-y-2.5 sm:space-y-3 pt-2.5 sm:pt-3 border-t border-white/75">
          <p className="hidden sm:block text-[11.5px] text-slate-500 leading-snug">
            <strong className="font-semibold text-slate-700">Best for:</strong> {template.bestFor}
          </p>

          <div className="flex sm:grid sm:grid-cols-2 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onPreview(template)}
              aria-label={`Preview ${template.name} template`}
              title={`Preview ${template.name}`}
              className="min-h-[40px] w-[40px] sm:w-auto px-0 sm:px-3 py-2 rounded-lg sm:rounded-xl border border-white/90 hover:border-slate-300 bg-white/70 hover:bg-white/95 backdrop-blur-md ring-1 ring-slate-900/[0.05] active:scale-[0.97] text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Eye className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-slate-600 sm:text-slate-500 shrink-0" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              type="button"
              onClick={() => onUseTemplate(template.id)}
              className="flex-1 min-h-[40px] px-2.5 sm:px-3 py-2 rounded-lg sm:rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap min-w-0"
            >
              <span className="sm:hidden">Use</span>
              <span className="hidden sm:inline">Use Template</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
