'use client';

import React, { useRef } from 'react';
import { CvSettings, FontScale } from '@/types/cv';
import { getTemplateById } from '@/templates/registry';
import { Check, ChevronUp, ChevronDown, Camera, Type, Palette, ArrowUpDown } from 'lucide-react';
import { FONT_MAP } from './CvPreview';

export const PRESET_ACCENT_COLORS = [
  { hex: '#1E3A8A', name: 'Navy', description: 'Classic British Navy' },
  { hex: '#0F766E', name: 'Teal', description: 'Heritage Teal' },
  { hex: '#15803D', name: 'Green', description: 'Oxford Green' },
  { hex: '#B45309', name: 'Amber', description: 'Warm Amber' },
  { hex: '#B91C1C', name: 'Crimson', description: 'Royal Crimson' },
  { hex: '#4338CA', name: 'Indigo', description: 'Modern Indigo' },
  { hex: '#334155', name: 'Slate', description: 'Executive Slate' },
  { hex: '#831843', name: 'Plum', description: 'Deep Berry' },
];

export const SECTION_NAMES: Record<string, string> = {
  statement: 'Personal Statement',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills & Competencies',
  certifications: 'Certifications',
  projects: 'Key Projects',
  languages: 'Languages',
  volunteering: 'Volunteering',
  interests: 'Interests',
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

  // Section reorder handlers
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= settings.sectionOrder.length) return;

    const newOrder = [...settings.sectionOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);
    onChange({ sectionOrder: newOrder });
  };

  return (
    <div className={`space-y-6 text-slate-800 ${className}`}>
      {/* 1. Accent Colour Picker */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[#4B4DED]" />
            <span>Accent Colour</span>
          </label>
          <span className="text-[11px] font-mono font-medium text-slate-500 uppercase">
            {settings.accentColor}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_ACCENT_COLORS.map((color) => {
            const isSelected = settings.accentColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => onChange({ accentColor: color.hex })}
                title={`${color.name} (${color.description})`}
                style={{ backgroundColor: color.hex }}
                className="w-8 h-8 rounded-xl transition-all duration-150 hover:scale-105 active:scale-95 shadow-2xs flex items-center justify-center cursor-pointer relative"
              >
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-white">
                    <Check className="w-3 h-3 stroke-[3]" />
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
              className="w-8 h-8 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#4B4DED] bg-white flex items-center justify-center text-slate-600 hover:text-[#4B4DED] transition-colors cursor-pointer"
              title="Custom Hex Colour"
            >
              <span className="text-xs font-bold">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Typography & Font Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Font Family Selector (6 Fonts) */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-[#4B4DED]" />
            <span>Font Family</span>
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) => onChange({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#4B4DED]/20 focus:border-[#4B4DED] cursor-pointer"
          >
            {Object.entries(FONT_MAP).map(([key, f]) => (
              <option key={key} value={key}>
                {f.label} ({f.category})
              </option>
            ))}
          </select>
        </div>

        {/* Font Size Scale */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Font Scale
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['sm', 'md', 'lg'] as FontScale[]).map((scale) => {
              const isSelected = settings.fontScale === scale;
              const labels: Record<FontScale, string> = { sm: 'Compact', md: 'Standard', lg: 'Large' };
              return (
                <button
                  key={scale}
                  type="button"
                  onClick={() => onChange({ fontScale: scale })}
                  className={`py-1.5 text-[11px] font-semibold rounded-lg transition-all cursor-pointer text-center ${
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

      {/* 3. Photo Toggle (UK Convention Notice) */}
      <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-bold text-slate-900">Include Profile Photo</span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showPhoto}
              onChange={(e) => onChange({ showPhoto: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4B4DED]" />
          </label>
        </div>

        <p className="text-[11px] text-slate-500 leading-normal">
          {currentTemplate.supportsPhoto ? (
            <span>
              Supported by <strong className="text-slate-700">{currentTemplate.name}</strong>. Off by default per standard UK recruitment practices.
            </span>
          ) : (
            <span className="text-amber-700">
              Note: <strong className="font-semibold">{currentTemplate.name}</strong> adheres to standard UK blind-recruitment without photos (supported on Manchester, Leeds, Glasgow & Shoreditch).
            </span>
          )}
        </p>
      </div>

      {/* 4. Section Reordering */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#4B4DED]" />
            <span>Section Order</span>
          </label>
          <span className="text-[11px] text-slate-400">Reorder with arrows</span>
        </div>

        <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
          {settings.sectionOrder.map((sectionKey, index) => {
            const isFirst = index === 0;
            const isLast = index === settings.sectionOrder.length - 1;
            const label = SECTION_NAMES[sectionKey] || sectionKey;

            return (
              <div
                key={sectionKey}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 text-center font-mono text-[10px] text-slate-400">
                    {index + 1}
                  </span>
                  <span>{label}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => handleMoveSection(index, 'up')}
                    className={`p-1 rounded transition-colors ${
                      isFirst
                        ? 'text-slate-200 cursor-not-allowed'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer'
                    }`}
                    title="Move section up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => handleMoveSection(index, 'down')}
                    className={`p-1 rounded transition-colors ${
                      isLast
                        ? 'text-slate-200 cursor-not-allowed'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer'
                    }`}
                    title="Move section down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
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
