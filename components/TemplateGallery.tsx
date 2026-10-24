'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CV } from '@/types/cv';
import { CV_TEMPLATES, TEMPLATE_CATEGORIES } from '@/templates/registry';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { Check, Camera, ShieldCheck } from 'lucide-react';

interface TemplateGalleryProps {
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  accentColor?: string;
  customCv?: CV;
  className?: string;
}

function ScaledTemplateThumbnail({
  Component,
  cv,
}: {
  Component: React.ComponentType<{ cv: CV }>;
  cv: CV;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.22);

  useEffect(() => {
    const updateScale = () => {
      if (!boxRef.current) return;
      const w = boxRef.current.clientWidth;
      if (w > 0) {
        setScale(Number((w / 794).toFixed(4)));
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (boxRef.current) {
      observer.observe(boxRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className="relative w-full aspect-[210/297] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-2xs"
    >
      <div
        style={{
          width: '794px',
          height: '1123px',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        className="absolute left-0 top-0 bg-white"
      >
        <Component cv={cv} />
      </div>
    </div>
  );
}

export default function TemplateGallery({
  selectedTemplateId,
  onSelectTemplate,
  accentColor = '#4B4DED',
  customCv,
  className = '',
}: TemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredTemplates = CV_TEMPLATES.filter((t) => {
    if (activeCategory === 'All') return true;
    return t.category === activeCategory;
  });

  const previewCv: CV = React.useMemo(() => {
    const base = customCv || SAMPLE_UK_CV;
    return {
      ...base,
      settings: {
        ...base.settings,
        accentColor,
      },
    };
  }, [customCv, accentColor]);

  return (
    <div className={`space-y-4 sm:space-y-5 ${className}`}>
      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none -mx-1 px-1">
        <button
          type="button"
          onClick={() => setActiveCategory('All')}
          className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            activeCategory === 'All'
              ? 'bg-[#4B4DED] text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All ({CV_TEMPLATES.length})
        </button>

        {TEMPLATE_CATEGORIES.map((cat) => {
          const count = CV_TEMPLATES.filter((t) => t.category === cat).length;
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#4B4DED] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] tabular-nums opacity-80 ${
                  isSelected ? 'text-white' : 'text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Responsive Templates Grid (2 cols on mobile, 3 on tablet/desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pb-4">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          const TemplateComponent = template.component;

          const thumbnailCv: CV = {
            ...previewCv,
            settings: {
              ...previewCv.settings,
              templateId: template.id,
              showPhoto: template.supportsPhoto && previewCv.settings.showPhoto,
            },
          };

          return (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`group flex flex-col rounded-2xl p-2 sm:p-3 bg-white transition-all duration-150 cursor-pointer border ${
                isSelected
                  ? 'border-[#4B4DED] ring-2 ring-[#4B4DED]/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs active:scale-[0.99]'
              }`}
            >
              {/* Auto-Scaled Live A4 Preview Thumbnail */}
              <div className="relative">
                <ScaledTemplateThumbnail Component={TemplateComponent} cv={thumbnailCv} />

                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-[#4B4DED] text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10 gap-1">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs truncate">
                    {template.category}
                  </span>

                  {template.supportsPhoto && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-white/95 text-slate-800 shadow-2xs flex items-center gap-0.5 shrink-0">
                      <Camera className="w-2.5 h-2.5" />
                      <span>Photo</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Template Details & Action */}
              <div className="mt-2.5 flex flex-col justify-between flex-1 space-y-2">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-xs sm:text-sm text-[#0F1B4D] truncate">
                      {template.name}
                    </h3>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      <span className="hidden xs:inline sm:inline">ATS</span>
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-2 leading-snug mt-0.5">
                    {template.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTemplate(template.id);
                  }}
                  className={`w-full min-h-[38px] sm:min-h-[36px] py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#4B4DED] text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-[#4B4DED] hover:text-white text-slate-700'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                      <span>Selected</span>
                    </>
                  ) : (
                    <span>Use Template</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
