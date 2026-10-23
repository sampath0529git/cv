'use client';

import React, { useState } from 'react';
import { useCvStore } from '@/store/useCvStore';
import { cvStoreToCv } from '@/lib/cvAdapter';
import { CV, CvSettings } from '@/types/cv';
import TemplateGallery from '@/components/TemplateGallery';
import TemplateControls from '@/components/TemplateControls';
import CvPreview from '@/components/CvPreview';
import { X, Sliders, LayoutGrid, Check } from 'lucide-react';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateModal({ isOpen, onClose }: TemplateModalProps) {
  const store = useCvStore();
  const [activeTab, setActiveTab] = useState<'gallery' | 'customize'>('gallery');

  if (!isOpen) return null;

  // Convert current store into unified CV model
  const activeCv = cvStoreToCv(store);
  const currentTemplateId = activeCv.settings.templateId;

  const handleSelectTemplate = (templateId: string) => {
    store.setTemplate(templateId as any);
  };

  const handleSettingsChange = (updated: Partial<CvSettings>) => {
    if (updated.templateId) {
      store.setTemplate(updated.templateId as any);
    }
    if (updated.accentColor) {
      store.setThemeColor(updated.accentColor);
    }
    // Persist full settings object in localStorage
    try {
      const merged = { ...activeCv.settings, ...updated };
      localStorage.setItem('uk_cv_settings_v1', JSON.stringify(merged));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Modal Container */}
      <div className="relative bg-white rounded-3xl w-full max-w-[1280px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] z-10">
        {/* Top Header */}
        <header className="px-6 sm:px-8 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F1B4D]">
              Choose CV Template & Style
            </h2>

            {/* Sub-Tabs: Gallery vs Customize */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-white text-[#4B4DED] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Templates (20)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('customize')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'customize'
                    ? 'bg-white text-[#4B4DED] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Customise Design</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Done
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Modal Body: Left Section (Gallery / Controls) + Right Section (Live Preview) */}
        <div className="flex-1 px-6 sm:px-8 py-5 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden min-h-0">
          {/* Left Column (~55%) */}
          <div className="lg:col-span-7 flex flex-col min-h-0 overflow-y-auto pr-2 custom-scrollbar">
            {activeTab === 'gallery' ? (
              <TemplateGallery
                selectedTemplateId={currentTemplateId}
                onSelectTemplate={handleSelectTemplate}
                accentColor={activeCv.settings.accentColor}
              />
            ) : (
              <TemplateControls
                settings={activeCv.settings}
                onChange={handleSettingsChange}
              />
            )}
          </div>

          {/* Right Column: Live A4 Preview (~45%) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col min-h-0 bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80 overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Live Preview
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {activeCv.settings.accentColor}
              </span>
            </div>

            <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
              <CvPreview showControlsBar={false} scale={0.48} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
