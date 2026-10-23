'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCvStore } from '@/store/useCvStore';
import Stepper from '@/components/builder/Stepper';
import LanguageSelect from '@/components/builder/LanguageSelect';
import CvPreview from '@/components/builder/CvPreview';
import TemplateModal from '@/components/builder/TemplateModal';
import ContactStep from '@/components/builder/steps/ContactStep';
import ExperienceStep from '@/components/builder/steps/ExperienceStep';
import EducationStep from '@/components/builder/steps/EducationStep';
import SkillsStep from '@/components/builder/steps/SkillsStep';
import SummaryStep from '@/components/builder/steps/SummaryStep';
import FinalizeStep from '@/components/builder/steps/FinalizeStep';
import { LayoutGrid, X, ArrowLeft, Printer, Download, Eye, ChevronDown, Check } from 'lucide-react';
import { downloadCvPdf } from '@/lib/pdfGenerator';

const STEPS = [
  { id: 1, label: 'Contact' },
  { id: 2, label: 'Education' },
  { id: 3, label: 'Work experience' },
  { id: 4, label: 'Additional info' },
  { id: 5, label: 'Summary' },
  { id: 6, label: 'Finalize' },
];

export default function BuilderPage() {
  const router = useRouter();
  const currentStep = useCvStore((state) => state.currentStep);
  const setStep = useCvStore((state) => state.setStep);
  const nextStep = useCvStore((state) => state.nextStep);
  const prevStep = useCvStore((state) => state.prevStep);

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [isMobileStepsDropdownOpen, setIsMobileStepsDropdownOpen] = useState(false);
  const [educationSubStep, setEducationSubStep] = useState<'intro' | 'form'>('intro');
  const [experienceSubStep, setExperienceSubStep] = useState<'intro' | 'form'>('intro');
  const [skillsSubStep, setSkillsSubStep] = useState<'intro' | 'form'>('intro');
  const [summarySubStep, setSummarySubStep] = useState<'intro' | 'form'>('intro');

  // Render the active form step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ContactStep />;
      case 2:
        return <EducationStep mode={educationSubStep} />;
      case 3:
        return <ExperienceStep mode={experienceSubStep} />;
      case 4:
        return <SkillsStep mode={skillsSubStep} />;
      case 5:
        return <SummaryStep mode={summarySubStep} />;
      case 6:
        return <FinalizeStep />;
      default:
        return <ContactStep />;
    }
  };

  const handleNextClick = () => {
    if (currentStep === 1) {
      setStep(2);
      setEducationSubStep('intro');
    } else if (currentStep === 2 && educationSubStep === 'intro') {
      setEducationSubStep('form');
    } else if (currentStep === 2 && educationSubStep === 'form') {
      setStep(3);
      setExperienceSubStep('intro');
    } else if (currentStep === 3 && experienceSubStep === 'intro') {
      setExperienceSubStep('form');
    } else if (currentStep === 3 && experienceSubStep === 'form') {
      setStep(4);
      setSkillsSubStep('intro');
    } else if (currentStep === 4 && skillsSubStep === 'intro') {
      setSkillsSubStep('form');
    } else if (currentStep === 4 && skillsSubStep === 'form') {
      setStep(5);
      setSummarySubStep('intro');
    } else if (currentStep === 5 && summarySubStep === 'intro') {
      setSummarySubStep('form');
    } else if (currentStep === 5 && summarySubStep === 'form') {
      setStep(6);
    } else if (currentStep === 6) {
      const storeState = useCvStore.getState();
      const defaultName = `${([storeState.contact.firstName, storeState.contact.lastName].filter(Boolean).join('_') || 'Curriculum_Vitae')}-CV.pdf`;
      const fileName = storeState.customPdfFileName?.trim() ? `${storeState.customPdfFileName.trim().replace(/\.pdf$/i, '')}.pdf` : defaultName;
      downloadCvPdf({ fileName });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('applet-print-cv', { detail: { mode: 'download' } }));
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    if (currentStep === 2 && educationSubStep === 'form') {
      setEducationSubStep('intro');
    } else if (currentStep === 2 && educationSubStep === 'intro') {
      setStep(1);
    } else if (currentStep === 3 && experienceSubStep === 'form') {
      setExperienceSubStep('intro');
    } else if (currentStep === 3 && experienceSubStep === 'intro') {
      setStep(2);
      setEducationSubStep('form');
    } else if (currentStep === 4 && skillsSubStep === 'form') {
      setSkillsSubStep('intro');
    } else if (currentStep === 4 && skillsSubStep === 'intro') {
      setStep(3);
      setExperienceSubStep('form');
    } else if (currentStep === 5 && summarySubStep === 'form') {
      setSummarySubStep('intro');
    } else if (currentStep === 5 && summarySubStep === 'intro') {
      setStep(4);
      setSkillsSubStep('form');
    } else if (currentStep === 6) {
      setStep(5);
      setSummarySubStep('form');
    } else if (currentStep === 1) {
      router.push('/start');
    } else {
      prevStep();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeStepObj = STEPS.find((s) => s.id === currentStep) || STEPS[0];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-slate-900 font-sans">
      {/* 1. Desktop Sidebar Stepper */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen overflow-y-auto">
        <Stepper
          onStepClick={(id) => {
            if (id === 2) setEducationSubStep('form');
            if (id === 3) setExperienceSubStep('form');
            if (id === 4) setSkillsSubStep('form');
            if (id === 5) setSummarySubStep('form');
          }}
        />
      </div>

      {/* 2. Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar: Language Dropdown + Desktop Template Shortcut */}
        <header className="w-full bg-white border-b border-[#E8EAF5] px-4 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between sticky top-0 z-20">
          <div className="w-28 hidden sm:block" />
          <div className="flex justify-center flex-1 sm:flex-initial">
            <LanguageSelect />
          </div>
          <div className="w-28 hidden sm:block" />
        </header>

        {/* Mobile Dark Navy Navigation Capsule (Exact match for image_13b97d3f.png) */}
        <div className="lg:hidden px-4 pt-3.5 pb-2 relative z-10">
          <div className="bg-[#0e123a] text-white rounded-xl h-[52px] px-4 flex items-center justify-between shadow-sm">
            {/* Left: Back button */}
            <button
              type="button"
              onClick={handleBackClick}
              className="p-1.5 -ml-1.5 text-white/90 hover:text-white transition-transform active:scale-90 cursor-pointer"
              aria-label="Previous step"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Center: Current step dropdown button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMobileStepsDropdownOpen(!isMobileStepsDropdownOpen)}
                className="flex items-center gap-1.5 font-bold text-[15px] text-white hover:text-white/90 transition-colors cursor-pointer py-1"
                aria-expanded={isMobileStepsDropdownOpen}
              >
                <span>{activeStepObj.label}</span>
                <ChevronDown
                  className={`w-4 h-4 text-white/80 transition-transform duration-200 ${
                    isMobileStepsDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Mobile Steps Dropdown Selector */}
              {isMobileStepsDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-slate-950/20"
                    onClick={() => setIsMobileStepsDropdownOpen(false)}
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 top-11 mt-1 w-60 rounded-xl bg-white text-slate-800 shadow-2xl border border-slate-200 py-1.5 z-50 animate-[fadeIn_0.15s_ease-out]">
                    <div className="px-3.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Steps
                    </div>
                    {STEPS.map((step) => {
                      const isActive = currentStep === step.id;
                      const isCompleted = currentStep > step.id;
                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => {
                            setStep(step.id);
                            if (step.id === 2) setExperienceSubStep('form');
                            if (step.id === 3) setEducationSubStep('form');
                            if (step.id === 4) setSkillsSubStep('form');
                            if (step.id === 5) setSummarySubStep('form');
                            setIsMobileStepsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-sm flex items-center justify-between transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#EEF1FF] text-[#4B4DED] font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                isActive
                                  ? 'bg-[#4B4DED] text-white'
                                  : isCompleted
                                  ? 'bg-[#4B4DED]/20 text-[#4B4DED]'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {step.id}
                            </span>
                            {step.label}
                          </span>
                          {isActive && <Check className="w-4 h-4 text-[#4B4DED]" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Right: Eye icon for mobile CV preview */}
            <button
              type="button"
              onClick={() => setIsMobilePreviewOpen(true)}
              className="p-1.5 -mr-1.5 text-white/90 hover:text-white transition-transform active:scale-90 cursor-pointer"
              aria-label="Preview CV"
              title="Preview CV"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form and Live Preview Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-10 lg:py-5 pb-28 lg:pb-28 max-w-[1560px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
            {/* Form Step (Scrollable independently) */}
            <div className="lg:col-span-7 w-full max-w-2xl mx-auto lg:max-w-none flex-1 lg:h-[calc(100vh-170px)] lg:overflow-y-auto pr-1 sm:pr-3">
              {renderCurrentStep()}
            </div>

            {/* Desktop / Laptop Live A4 CV Preview (Side-by-side in EVERY section) */}
            <div className="hidden lg:flex lg:col-span-5 w-full flex-col items-center lg:sticky lg:top-[68px] lg:h-[calc(100vh-175px)] justify-between pb-1">
              {/* Preview Viewport - Scrollable multi-page A4 preview */}
              <div className="w-full flex-1 min-h-0 flex justify-center overflow-y-auto px-1 py-1">
                <CvPreview className="w-full" />
              </div>

              {/* Change Template Button below Preview (Matching image_28c4ca3f.png) */}
              <div className="mt-3 flex justify-center shrink-0 z-10">
                <button
                  type="button"
                  onClick={() => setIsTemplateModalOpen(true)}
                  className="inline-flex items-center gap-3 px-6 py-2.5 rounded-xl border border-slate-300/90 bg-white hover:border-[#4547E6] hover:bg-slate-50 text-slate-900 font-semibold text-[15px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all cursor-pointer group active:scale-98"
                >
                  <div className="grid grid-cols-2 gap-[2.5px] w-4 h-4 shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-[6.5px] h-[6.5px] rounded-[2px] bg-[#8B8DF9]" />
                    <div className="w-[6.5px] h-[6.5px] rounded-[2px] bg-[#4547E6]" />
                    <div className="w-[6.5px] h-[6.5px] rounded-[2px] bg-[#4547E6]" />
                    <div className="w-[6.5px] h-[6.5px] rounded-[2px] bg-[#C4C7FC]" />
                  </div>
                  <span>Change template</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Dedicated persistent export container so cv-print-area is always measurable on mobile viewports */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '794px',
            height: '1123px',
            zIndex: -9998,
            overflow: 'hidden',
            pointerEvents: 'none',
            opacity: 0,
          }}
          className="lg:hidden"
        >
          <CvPreview className="w-[794px]" />
        </div>

        {/* Mobile Fixed Bottom Navigation Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E8EAF5] px-4 py-3 z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
          {currentStep === 6 && (
            <div className="text-[11px] text-slate-500 text-center mb-1.5 font-medium flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>ATS-friendly PDF &bull; 100% parser safe</span>
            </div>
          )}
          <button
            type="button"
            onClick={handleNextClick}
            className="w-full py-3.5 bg-[#4B4DED] hover:bg-[#3D3FC9] active:scale-98 text-white font-semibold text-base rounded-xl shadow-[0_4px_14px_rgba(75,77,237,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{currentStep === 6 ? 'Download PDF' : 'Next'}</span>
            {currentStep === 6 && <Download className="w-4 h-4" />}
          </button>
        </div>

        {/* Desktop Fixed Bottom Navigation Bar */}
        <footer className="hidden lg:flex fixed bottom-0 right-0 left-[270px] xl:left-[280px] bg-white border-t border-[#E8EAF5] px-6 sm:px-10 py-3.5 items-center justify-between z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <button
            type="button"
            onClick={handleBackClick}
            className="px-7 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-sm hover:bg-slate-50 hover:border-slate-400 shadow-2xs transition-all cursor-pointer active:scale-98"
          >
            Back
          </button>

          <div className="flex items-center gap-4">
            {currentStep === 6 && (
              <span className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>ATS-friendly PDF &bull; A4 formatted</span>
              </span>
            )}
            <button
              type="button"
              onClick={handleNextClick}
              className="px-9 py-2.5 bg-[#4B4DED] hover:bg-[#3D3FC9] active:scale-98 text-white font-semibold text-sm rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>{currentStep === 6 ? 'Download PDF' : 'Next'}</span>
              {currentStep === 6 && <Download className="w-4 h-4" />}
            </button>
          </div>
        </footer>
      </div>

      {/* Mobile Live CV Preview Sheet / Modal (Opened via Eye Icon) */}
      {isMobilePreviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex flex-col justify-end lg:hidden">
          <div
            className="fixed inset-0"
            onClick={() => setIsMobilePreviewOpen(false)}
          />
          <div className="relative bg-white w-full h-[92vh] rounded-t-3xl flex flex-col overflow-hidden shadow-2xl z-10 animate-[slideUp_0.2s_ease-out]">
            {/* Top Close Button */}
            <div className="flex justify-end px-4 pt-3 pb-1 bg-white">
              <button
                type="button"
                onClick={() => setIsMobilePreviewOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-full bg-slate-100 cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Sheet Viewport - Scrollable multi-page preview and Change template button */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center bg-white">
              <div className="w-full max-w-[440px] mx-auto flex flex-col items-center">
                <CvPreview className="w-full" />
              </div>

              {/* Change Template Button below Preview in Mobile Sheet */}
              <div className="mt-4 mb-4 flex justify-center shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobilePreviewOpen(false);
                    setIsTemplateModalOpen(true);
                  }}
                  className="inline-flex items-center gap-3 px-6 py-2.5 rounded-xl border border-slate-300/90 bg-white hover:border-[#4547E6] hover:bg-slate-50 text-slate-900 font-semibold text-[15px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all cursor-pointer group active:scale-98"
                >
                  <div className="grid grid-cols-2 gap-[2.5px] w-4 h-4 shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-[6.5px] h-[6.5px] rounded-[2px] bg-[#8B8DF9]" />
                    <div className="w-[6.5px] h-[6.5px] rounded-[2px] bg-[#4547E6]" />
                    <div className="w-[6.5px] h-[6.5px] rounded-[2px] bg-[#4547E6]" />
                    <div className="w-[6.5px] h-[6.5px] rounded-[2px] bg-[#C4C7FC]" />
                  </div>
                  <span>Change template</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Selector Modal */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />
    </div>
  );
}

