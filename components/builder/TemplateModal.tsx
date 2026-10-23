'use client';

import React, { useRef } from 'react';
import { useCvStore, TemplateId } from '@/store/useCvStore';
import { X, Check } from 'lucide-react';
import CvPreview from './CvPreview';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TemplateOption {
  id: TemplateId;
  name: string;
}

const TEMPLATE_LIST: TemplateOption[] = [
  { id: 'castor', name: 'Castor' },
  { id: 'capella', name: 'Capella' },
  { id: 'pollux', name: 'Pollux' },
  { id: 'regulus', name: 'Regulus' },
];

const COLOR_SWATCHES = [
  { id: 'beige', hex: '#C4A482', label: 'Beige' },
  { id: 'green', hex: '#4EBA88', label: 'Green' },
  { id: 'purple', hex: '#9896F5', label: 'Purple' },
  { id: 'red', hex: '#BA4D4D', label: 'Red' },
  { id: 'pink', hex: '#F472B6', label: 'Pink' },
  { id: 'coral', hex: '#F87171', label: 'Coral' },
  { id: 'blue', hex: '#4A9FF5', label: 'Blue' },
  { id: 'orange', hex: '#F97316', label: 'Orange' },
];

export default function TemplateModal({ isOpen, onClose }: TemplateModalProps) {
  const activeTemplate = useCvStore((state) => state.activeTemplate);
  const setTemplate = useCvStore((state) => state.setTemplate);
  const themeColor = useCvStore((state) => state.themeColor) || '#C4A482';
  const setThemeColor = useCvStore((state) => state.setThemeColor);

  const colorInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Normalized active template id (supporting aliases)
  const currentTmpl =
    activeTemplate === 'modern-beige'
      ? 'castor'
      : activeTemplate === 'minimal-clean'
      ? 'capella'
      : activeTemplate || 'castor';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Modal Card matching image_3e730f4b.png */}
      <div className="relative bg-white rounded-3xl w-full max-w-[1140px] border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10">
        {/* Top Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 flex items-center justify-between shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1B4D]">
            Change template
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>

        {/* Content Body: Left Column (Templates Grid) + Right Column (Live Preview + Color Bar) */}
        <div className="flex-1 px-6 sm:px-8 pb-6 sm:pb-8 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 overflow-hidden min-h-0">
          {/* Left Column: Template Selection Grid (~42%) */}
          <div className="lg:col-span-5 flex flex-col min-h-0">
            <div className="relative flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4 pb-2">
                {TEMPLATE_LIST.map((tmpl) => {
                  const isSelected = currentTmpl === tmpl.id;

                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setTemplate(tmpl.id)}
                      className="cursor-pointer group flex flex-col items-center"
                    >
                      {/* Thumbnail Container */}
                      <div
                        className={`w-full aspect-[210/297] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 transition-all duration-200 flex flex-col bg-white overflow-hidden shadow-2xs ${
                          isSelected
                            ? 'border-[2.5px] border-[#4B4DED] ring-2 ring-[#4B4DED]/15 shadow-md'
                            : 'border border-slate-200 hover:border-slate-300 hover:shadow-xs'
                        }`}
                      >
                        {/* Miniature layout visualization */}
                        {tmpl.id === 'castor' && (
                          <div className="w-full h-full flex flex-row rounded-lg overflow-hidden border border-slate-100 text-[5px] leading-tight select-none pointer-events-none">
                            {/* Left beige bar */}
                            <div className="w-[34%] bg-[#F4EFE6] p-1.5 flex flex-col justify-between border-r border-[#E8E2D7]">
                              <div className="space-y-1">
                                <div className="space-y-0.5 text-[4.5px] text-slate-500">
                                  <div className="h-1 w-6 bg-slate-300 rounded-xs" />
                                  <div className="h-0.5 w-8 bg-slate-200 rounded-xs" />
                                  <div className="h-0.5 w-7 bg-slate-200 rounded-xs" />
                                </div>
                                <div className="pt-1">
                                  <div className="h-1 w-4 bg-slate-300 rounded-xs mb-0.5" />
                                  <div className="h-0.5 w-7 bg-slate-200 rounded-xs mb-0.5" />
                                  <div className="h-0.5 w-6 bg-slate-200 rounded-xs" />
                                </div>
                              </div>
                            </div>
                            {/* Right content */}
                            <div className="w-[66%] p-1.5 flex flex-col space-y-1 bg-white">
                              <div>
                                <p className="font-bold text-[6.5px] text-slate-900 leading-none">Elsa Manet</p>
                                <p className="text-[4.5px] text-amber-700 leading-none mt-0.5">Women&apos;s Ready-to-Wear</p>
                              </div>
                              <div className="space-y-1 pt-0.5">
                                <div className="flex items-center gap-0.5">
                                  <div className="w-1 h-1 rounded-full bg-amber-700" />
                                  <div className="h-1 w-10 bg-slate-700 rounded-xs" />
                                </div>
                                <div className="pl-1.5 border-l border-amber-700/30 space-y-0.5">
                                  <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                                  <div className="h-0.5 w-3/4 bg-slate-200 rounded-xs" />
                                </div>
                              </div>
                              <div className="space-y-1 pt-0.5">
                                <div className="flex items-center gap-0.5">
                                  <div className="w-1 h-1 rounded-full bg-amber-700" />
                                  <div className="h-1 w-8 bg-slate-700 rounded-xs" />
                                </div>
                                <div className="pl-1.5 border-l border-amber-700/30 space-y-0.5">
                                  <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {tmpl.id === 'capella' && (
                          <div className="w-full h-full flex flex-col rounded-lg overflow-hidden border border-slate-100 p-1.5 bg-white text-[5px] select-none pointer-events-none space-y-1">
                            <div className="border-b border-slate-200 pb-1">
                              <p className="font-bold text-[6.5px] text-slate-900 leading-none">Elsa Manet</p>
                              <p className="text-[4.5px] text-[#4B4DED] leading-none mt-0.5">Sales Advisor</p>
                            </div>
                            <div className="grid grid-cols-2 gap-1 flex-1">
                              <div className="space-y-1">
                                <div className="h-1 w-6 bg-slate-300 rounded-xs" />
                                <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                                <div className="h-0.5 w-3/4 bg-slate-200 rounded-xs" />
                              </div>
                              <div className="space-y-1 pl-1 border-l border-slate-100">
                                <div className="h-1 w-8 bg-slate-300 rounded-xs" />
                                <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                                <div className="h-0.5 w-4/5 bg-slate-200 rounded-xs" />
                              </div>
                            </div>
                          </div>
                        )}

                        {tmpl.id === 'pollux' && (
                          <div className="w-full h-full flex flex-row rounded-lg overflow-hidden border border-slate-100 text-[5px] select-none pointer-events-none">
                            <div className="w-[66%] p-1.5 bg-white space-y-1">
                              <p className="font-bold text-[6.5px] text-slate-900 leading-none">Elsa Manet</p>
                              <p className="text-[4.5px] text-emerald-700 leading-none mt-0.5">Advisor</p>
                              <div className="space-y-0.5 pt-1">
                                <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                                <div className="h-0.5 w-4/5 bg-slate-200 rounded-xs" />
                                <div className="h-0.5 w-3/4 bg-slate-200 rounded-xs" />
                              </div>
                            </div>
                            <div className="w-[34%] bg-[#1E3A34] p-1.5 text-emerald-100 space-y-1">
                              <div className="h-0.5 w-6 bg-emerald-400 rounded-xs" />
                              <div className="h-0.5 w-4 bg-emerald-300/40 rounded-xs" />
                              <div className="h-0.5 w-5 bg-emerald-300/40 rounded-xs" />
                            </div>
                          </div>
                        )}

                        {tmpl.id === 'regulus' && (
                          <div className="w-full h-full flex flex-col rounded-lg overflow-hidden border border-slate-100 p-1.5 bg-white text-[5px] select-none pointer-events-none space-y-1">
                            <div className="rounded-md bg-rose-50 p-1 border border-rose-100">
                              <p className="font-bold text-[6.5px] text-slate-900 leading-none">Elsa Manet</p>
                              <p className="text-[4.5px] text-rose-600 leading-none mt-0.5">Advisor</p>
                            </div>
                            <div className="space-y-1 pt-0.5">
                              <div className="flex items-center gap-0.5">
                                <div className="w-1 h-1 rounded-full bg-rose-500" />
                                <div className="h-1 w-8 bg-slate-600 rounded-xs" />
                              </div>
                              <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                              <div className="h-0.5 w-3/4 bg-slate-200 rounded-xs" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Template Name Below */}
                      <span className="mt-2.5 text-sm sm:text-base font-bold text-slate-800 tracking-tight text-center">
                        {tmpl.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Soft Container Preview + Color Bar (~58%) */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-0 space-y-4">
            {/* Soft Light-Blue Container for Preview Card */}
            <div className="flex-1 bg-[#EEF2FF] rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex items-center justify-center overflow-hidden min-h-[360px]">
              <div className="w-full max-w-[460px] max-h-full overflow-hidden flex justify-center">
                <div className="w-full origin-top shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden bg-white">
                  <CvPreview className="max-h-[460px] overflow-y-auto" />
                </div>
              </div>
            </div>

            {/* Bottom Color Palette Bar matching image_3e730f4b.png */}
            <div className="flex items-center justify-center sm:justify-between gap-2 sm:gap-2.5 pt-1 px-1 flex-wrap">
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center">
                {COLOR_SWATCHES.map((swatch) => {
                  const isColorActive =
                    themeColor.toLowerCase() === swatch.hex.toLowerCase();

                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setThemeColor(swatch.hex)}
                      aria-label={`Select ${swatch.label} theme`}
                      style={{ backgroundColor: swatch.hex }}
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl transition-all duration-150 hover:scale-105 active:scale-95 shadow-2xs flex items-center justify-center cursor-pointer relative"
                    >
                      {isColorActive && (
                        <div className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center text-white shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Custom Color Dropper / Paint Beaker Button */}
                <div className="relative">
                  <input
                    type="color"
                    ref={colorInputRef}
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer pointer-events-auto"
                    aria-label="Pick custom color"
                  />
                  <button
                    type="button"
                    onClick={() => colorInputRef.current?.click()}
                    aria-label="Choose custom theme color"
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border-2 border-[#4B4DED] bg-white hover:bg-indigo-50/40 text-[#4B4DED] flex items-center justify-center shadow-2xs cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    {/* Beaker with dripping drop icon matching reference */}
                    <svg
                      className="w-5 h-5 text-[#4B4DED]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
                      <path d="m5 2 5 5" />
                      <path d="M2 13h15" />
                      <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.6 2-3 .3.4 2 1.4 2 3Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
