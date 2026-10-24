'use client';

import React, { useState } from 'react';
import { useCvStore } from '@/store/useCvStore';
import { cvStoreToCv } from '@/lib/cvAdapter';
import { CvSettings } from '@/types/cv';
import TemplateGallery from '@/components/TemplateGallery';
import TemplateControls from '@/components/TemplateControls';
import CvPreview from '@/components/CvPreview';
import { CV_TEMPLATES } from '@/templates/registry';
import { X, Sliders, LayoutGrid } from 'lucide-react';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateModal({ isOpen, onClose }: TemplateModalProps) {
  const store = useCvStore();
  const [activeTab, setActiveTab] = useState<'gallery' | 'customize'>('gallery');

  if (!isOpen) return null;

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
    if (updated.fontFamily) {
      store.setFontFamily(updated.fontFamily as any);
    }
    if (updated.fontScale) {
      store.setFontScale(updated.fontScale);
    }
    if (updated.showPhoto !== undefined) {
      store.setShowPhoto(updated.showPhoto);
    }
    if (updated.sectionOrder) {
      store.setSectionOrder(updated.sectionOrder);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-[#0F1B4D]/65 backdrop-blur-xs">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Modal / Mobile Bottom-Sheet Container */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-[1280px] border-t sm:border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[94vh] z-10">
        {/* Mobile Drag Handle Affordance */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1.5 rounded-full bg-slate-200" />
        </div>

        {/* Top Header */}
        <header className="px-4 sm:px-8 pt-2 sm:pt-5 pb-3.5 sm:pb-4 border-b border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#0F1B4D] truncate">
              Templates &amp; Design
            </h2>

            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[40px] px-4 py-1.5 bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                Done
              </button>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Sub-Tabs: Gallery vs Customize */}
            <div className="grid grid-cols-2 sm:flex items-center w-full sm:w-auto bg-[#F4F7FE] p-1 rounded-xl border border-slate-200/70">
              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'gallery'
                    ? 'bg-[#4B4DED] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-[#0F1B4D]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                <span>Templates ({CV_TEMPLATES.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('customize')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'customize'
                    ? 'bg-[#4B4DED] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-[#0F1B4D]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 shrink-0" />
                <span>Customise</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[40px] px-5 py-2 bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs whitespace-nowrap"
              >
                Done
              </button>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Modal Body */}
        <div className="flex-1 px-4 sm:px-8 py-4 sm:py-5 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden min-h-0">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col min-h-0 overflow-y-auto pr-0.5 sm:pr-2 custom-scrollbar">
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

          {/* Right Column: Live A4 Preview on Desktop */}
          <div className="hidden lg:flex lg:col-span-5 flex-col min-h-0 bg-[#EEF2FA] rounded-2xl p-4 border border-slate-200/80 overflow-hidden">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 mb-3 shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F1B4D]">
                Live A4 Preview
              </span>
              <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                {activeCv.settings.accentColor}
              </span>
            </div>

            <div className="flex-1 min-h-0 flex items-start justify-center overflow-y-auto py-1">
              <CvPreview showControlsBar={false} scale={0.46} isPrimary={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
