'use client';

import React, { useState } from 'react';
import { CV, TemplateCategory, TemplateDefinition } from '@/types/cv';
import { CV_TEMPLATES, TEMPLATE_CATEGORIES } from '@/templates/registry';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { Check, Sparkles, Camera, ShieldCheck } from 'lucide-react';

interface TemplateGalleryProps {
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  accentColor?: string;
  customCv?: CV;
  className?: string;
}

export default function TemplateGallery({
  selectedTemplateId,
  onSelectTemplate,
  accentColor = '#1E3A8A',
  customCv,
  className = '',
}: TemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Filter templates based on selected category chip
  const filteredTemplates = CV_TEMPLATES.filter((t) => {
    if (activeCategory === 'All') return true;
    return t.category === activeCategory;
  });

  // Base CV data used to render live micro-thumbnails (using sample CV to ensure high visual quality)
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
    <div className={`space-y-5 ${className}`}>
      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveCategory('All')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeCategory === 'All'
              ? 'bg-[#4B4DED] text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#4B4DED] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Templates Grid (2 cols on mobile, 3 on tablet, 3-4 on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          const TemplateComponent = template.component;

          // Scaled down sample cv for thumbnail
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
              className={`group flex flex-col rounded-2xl p-2.5 sm:p-3 bg-white transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'border-[#4B4DED] ring-2 ring-[#4B4DED]/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Scaled Live Preview Thumbnail Container */}
              <div className="relative w-full aspect-[210/297] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-2xs flex items-center justify-center">
                {/* Scaled Live Canvas */}
                <div
                  style={{
                    width: '794px',
                    height: '1123px',
                    transform: 'scale(0.24)',
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                  className="absolute left-0 top-0 bg-white"
                >
                  <TemplateComponent cv={thumbnailCv} />
                </div>

                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-[#4B4DED] text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Category & Photo Badges */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs">
                    {template.category}
                  </span>

                  {template.supportsPhoto && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-white/90 text-slate-800 shadow-2xs backdrop-blur-xs flex items-center gap-1">
                      <Camera className="w-2.5 h-2.5" />
                      <span>Photo</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Template Details & Action */}
              <div className="mt-2.5 flex flex-col justify-between flex-1 space-y-1.5">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {template.name}
                    </h3>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      <span>ATS</span>
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* "Use template" button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTemplate(template.id);
                  }}
                  className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#4B4DED] text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-[#4B4DED] hover:text-white text-slate-700'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Active Template</span>
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
