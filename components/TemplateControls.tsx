'use client';

import React, { useRef } from 'react';
import { CvSettings, FontScale } from '@/types/cv';
import { getTemplateById } from '@/templates/registry';
import { Check, ChevronUp, ChevronDown, Camera, Type, Palette, ArrowUpDown } from 'lucide-react';
import { FONT_MAP } from './CvPreview';

export const PRESET_ACCENT_COLORS = [
  { hex: '#4B4DED', name: 'Royal Blue', description: 'Signature Brand Blue' },
  { hex: '#1E3A8A', name: 'Navy', description: 'Classic British Navy' },
  { hex: '#0F766E', name: 'Teal', description: 'Heritage Teal' },
  { hex: '#15803D', name: 'Green', description: 'Oxford Green' },
  { hex: '#B45309', name: 'Amber', description: 'Warm Amber' },
  { hex: '#B91C1C', name: 'Crimson', description: 'Royal Crimson' },
  { hex: '#334155', name: 'Slate', description: 'Executive Slate' },
  { hex: '#111827', name: 'Charcoal', description: 'Classic Monochrome' },
];

export const SECTION_NAMES: Record<string, string> = {
  statement: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education & Qualifications',
  skills: 'Key Skills & Competencies',
  certifications: 'Certifications & Licences',
  projects: 'Key Projects',
  languages: 'Languages',
  awards: 'Honours & Awards',
  volunteering: 'Volunteering',
  interests: 'Interests & Activities',
  custom: 'Custom Sections',
  references: 'References',
};

interface TemplateControlsProps {
  settings: CvSettings;
  onChange: (updated: Partial<CvSettings>) => void;
  className?: string;
}

export default function TemplateControls({
  settings,
  onChange,
  className = '',
}: TemplateControlsProps) {
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const currentTemplate = getTemplateById(settings.templateId);

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= settings.sectionOrder.length) return;

    const newOrder = [...settings.sectionOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);
    onChange({ sectionOrder: newOrder });
  };

  return (
    <div className={`space-y-6 text-slate-800 pb-4 ${className}`}>
      {/* 1. Accent Colour Picker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[#4B4DED]" />
            <span>Accent Colour</span>
          </label>
          <span className="text-[11px] font-mono font-medium text-slate-500 uppercase tabular-nums">
            {settings.accentColor}
          </span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {PRESET_ACCENT_COLORS.map((color) => {
            const isSelected = settings.accentColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => onChange({ accentColor: color.hex })}
                title={`${color.name} (${color.description})`}
                style={{ backgroundColor: color.hex }}
                className={`w-11 h-11 sm:w-9 sm:h-9 rounded-xl transition-transform duration-150 hover:scale-105 active:scale-95 shadow-2xs flex items-center justify-center cursor-pointer relative ${
                  isSelected ? 'ring-2 ring-offset-2 ring-[#4B4DED]' : ''
                }`}
              >
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}

          {/* Custom Hex Picker Button */}
          <div className="relative">
            <input
              ref={colorPickerRef}
              type="color"
              value={settings.accentColor}
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              aria-label="Pick custom colour"
            />
            <button
              type="button"
              onClick={() => colorPickerRef.current?.click()}
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#4B4DED] bg-white flex items-center justify-center text-slate-600 hover:text-[#4B4DED] transition-colors cursor-pointer"
              title="Custom Hex Colour"
            >
              <span className="text-sm font-bold">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Typography & Font Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-[#4B4DED]" />
            <span>Font Family</span>
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) => onChange({ fontFamily: e.target.value })}
            className="w-full min-h-[44px] px-3.5 py-2.5 text-base sm:text-xs font-medium bg-white border border-slate-200 rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#4B4DED]/20 focus:border-[#4B4DED] cursor-pointer"
          >
            {Object.entries(FONT_MAP).map(([key, f]) => (
              <option key={key} value={key}>
                {f.label} ({f.category})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Font Scale
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl min-h-[44px]">
            {(['sm', 'md', 'lg'] as FontScale[]).map((scale) => {
              const isSelected = settings.fontScale === scale;
              const labels: Record<FontScale, string> = {
                sm: 'Small',
                md: 'Medium',
                lg: 'Large',
              };
              return (
                <button
                  key={scale}
                  type="button"
                  onClick={() => onChange({ fontScale: scale })}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'bg-white text-[#4B4DED] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {labels[scale]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Photo Toggle */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Camera className="w-4 h-4 text-[#4B4DED]" />
            <span className="text-xs sm:text-sm font-bold text-[#0F1B4D]">
              Include Profile Photo
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer min-h-[32px]">
            <input
              type="checkbox"
              checked={settings.showPhoto}
              onChange={(e) => onChange({ showPhoto: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4B4DED]" />
          </label>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed">
          {currentTemplate.supportsPhoto ? (
            <span>
              Supported by <strong className="text-slate-700">{currentTemplate.name}</strong>. Off by default per standard UK recruitment practices.
            </span>
          ) : (
            <span className="text-amber-700">
              Note: <strong className="font-semibold">{currentTemplate.name}</strong> uses a photo-free layout (photos are supported on Hopkins, Toronto &amp; London).
            </span>
          )}
        </p>
      </div>

      {/* 4. Section Reordering */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#4B4DED]" />
            <span>Section Order</span>
          </label>
          <span className="text-[11px] text-slate-400">Tap arrows to reorder</span>
        </div>

        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          {settings.sectionOrder.map((sectionKey, index) => {
            const isFirst = index === 0;
            const isLast = index === settings.sectionOrder.length - 1;
            const label = SECTION_NAMES[sectionKey] || sectionKey;

            return (
              <div
                key={sectionKey}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 text-center font-mono text-[11px] font-bold text-[#4B4DED] tabular-nums shrink-0">
                    {index + 1}
                  </span>
                  <span className="truncate">{label}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => handleMoveSection(index, 'up')}
                    className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-colors ${
                      isFirst
                        ? 'text-slate-200 cursor-not-allowed'
                        : 'text-slate-500 hover:text-[#4B4DED] hover:bg-[#EEF1FF] cursor-pointer'
                    }`}
                    title="Move section up"
                    aria-label={`Move ${label} up`}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => handleMoveSection(index, 'down')}
                    className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-colors ${
                      isLast
                        ? 'text-slate-200 cursor-not-allowed'
                        : 'text-slate-500 hover:text-[#4B4DED] hover:bg-[#EEF1FF] cursor-pointer'
                    }`}
                    title="Move section down"
                    aria-label={`Move ${label} down`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
