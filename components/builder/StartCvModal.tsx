'use client';

import React, { useState } from 'react';
import { Sparkles, Paintbrush, X, UploadCloud, CheckCircle2, ArrowLeft, ArrowRight, FileText } from 'lucide-react';

interface StartCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'default' | 'import' | 'scratch';
}

export default function StartCvModal({ isOpen, onClose, initialMode = 'default' }: StartCvModalProps) {
  const [currentStep, setCurrentStep] = useState<'choice' | 'import-upload' | 'import-processing' | 'scratch-template'>('choice');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleStartImport = () => {
    setCurrentStep('import-upload');
  };

  const handleStartScratch = () => {
    setCurrentStep('scratch-template');
  };

  const handleSimulateUpload = (fileName: string = 'My_Existing_CV.pdf') => {
    setCurrentStep('import-processing');
    setUploadProgress(15);
    setTimeout(() => setUploadProgress(45), 400);
    setTimeout(() => setUploadProgress(80), 800);
    setTimeout(() => {
      setUploadProgress(100);
      setTimeout(() => {
        // Scroll to editor and close modal
        onClose();
        const editorEl = document.getElementById('features-section') || document.getElementById('cv-builder-section');
        if (editorEl) {
          editorEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#f4f7fe] rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden text-slate-900 transition-all">
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 border border-slate-200/80 flex items-center justify-center transition-colors shadow-2xs z-30 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* =========================================================================
            STEP 1: HOW DO YOU WANT TO START YOUR CV? (Matching image_aba47d72.png)
            ========================================================================= */}
        {currentStep === 'choice' && (
          <div className="p-6 sm:p-10 pt-10 sm:pt-14 text-center">
            {/* Main Heading matching reference screenshot */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-950 tracking-tight leading-tight mb-8 sm:mb-12">
              How do you want <span className="text-[#4a4df2]">to start your CV?</span>
            </h2>

            {/* Two Main Cards Container */}
            <div className="space-y-6 sm:space-y-7 text-left max-w-xl mx-auto">
              {/* Card 1: Import my CV */}
              <div
                onClick={handleStartImport}
                className="group relative bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#4a4df2] transition-all duration-200 p-6 sm:p-7 flex items-center gap-5 sm:gap-6 cursor-pointer overflow-hidden"
              >
                {/* Left Icon Box */}
                <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#eff3fd] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  {/* Document with Arrow Import SVG */}
                  <svg
                    className="w-9 h-9 sm:w-10 sm:h-10 text-[#4a4df2]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v3" />
                    <path d="M4 17v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M2 13h9" />
                    <polyline points="8 10 11 13 8 16" />
                  </svg>
                </div>

                {/* Right Content */}
                <div className="relative z-10 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#4a4df2] transition-colors leading-tight">
                    Import my CV
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-[15px] font-normal leading-relaxed mt-1">
                    We&apos;ll improve the layout and optimize the content.
                  </p>
                </div>
              </div>

              {/* Card 2: From scratch (Recommended) */}
              <div
                onClick={handleStartScratch}
                className="group relative bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#4a4df2] transition-all duration-200 p-6 sm:p-7 flex items-center gap-5 sm:gap-6 cursor-pointer overflow-hidden"
              >
                {/* 1. Recommended Pill Badge (Top Right) */}
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#131a47] text-white text-[11.5px] font-semibold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 z-20 border border-indigo-400/20">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Recommended</span>
                </div>

                {/* 2. Royal Blue Curved Accent Shape (Bottom Left Corner) */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#4a4df2] rounded-tr-[48px] pointer-events-none z-0 transition-transform group-hover:scale-105" />

                {/* 3. Left Icon Box */}
                <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#eff3fd] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Paintbrush className="w-9 h-9 sm:w-10 sm:h-10 text-[#4a4df2]" strokeWidth={2.2} />
                </div>

                {/* 4. Right Content */}
                <div className="relative z-10 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#4a4df2] transition-colors leading-tight">
                    From scratch
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-[15px] font-normal leading-relaxed mt-1">
                    We&apos;ll guide you section by section.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SUB-STEP A: IMPORT EXISTING CV UPLOAD
            ========================================================================= */}
        {currentStep === 'import-upload' && (
          <div className="p-6 sm:p-10 text-left">
            <button
              type="button"
              onClick={() => setCurrentStep('choice')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to options</span>
            </button>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-2">
              Upload your current CV
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Our AI will analyze your work experience, skills, and structure, and format it into a recruiter-approved UK template.
            </p>

            {/* Drag & Drop Area */}
            <div
              onClick={() => handleSimulateUpload('My_Resume.pdf')}
              className="border-2 border-dashed border-indigo-200 hover:border-[#4a4df2] bg-white rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-blue-50/30 group"
            >
              <div className="w-14 h-14 rounded-full bg-indigo-50 text-[#4a4df2] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <p className="text-base font-bold text-slate-900 mb-1">
                Drop your CV here or <span className="text-[#4a4df2] underline">browse</span>
              </p>
              <p className="text-xs text-slate-400">
                Supports PDF, DOC, DOCX up to 10MB
              </p>
            </div>

            {/* Quick Sample CV Test Button */}
            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">Don&apos;t have a file ready?</span>
              <button
                type="button"
                onClick={() => handleSimulateUpload('Sample_Elsa_Manet_CV.pdf')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold shadow-2xs hover:border-[#4a4df2] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4a4df2]" />
                <span>Test with Sample CV (Elsa Manet)</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            SUB-STEP B: IMPORT PROCESSING ANIMATION
            ========================================================================= */}
        {currentStep === 'import-processing' && (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#4a4df2] flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">
                Analyzing your CV with AI...
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Extracting career history, optimizing UK grammar, and mapping skills for ATS compliance.
              </p>
            </div>

            {/* Progress bar */}
            <div className="max-w-md mx-auto space-y-2">
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-[#4a4df2] rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>{uploadProgress < 100 ? 'Parsing sections...' : 'Complete!'}</span>
                <span>{uploadProgress}%</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Secure &amp; GDPR Compliant</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            SUB-STEP C: FROM SCRATCH - TEMPLATE PICKER
            ========================================================================= */}
        {currentStep === 'scratch-template' && (
          <div className="p-6 sm:p-10 text-left">
            <button
              type="button"
              onClick={() => setCurrentStep('choice')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to options</span>
            </button>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-2">
              Select your initial template
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Choose a design to start with. You can switch templates or customize colors anytime in the editor.
            </p>

            <div className="grid grid-cols-3 gap-3.5 mb-6">
              {[
                { id: 'modern', name: 'Modern Elegant', color: '#4a4df2' },
                { id: 'emerald', name: 'Executive Green', color: '#10b981' },
                { id: 'classic', name: 'British Classic', color: '#f59e0b' },
              ].map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`rounded-2xl border-2 p-3 text-center cursor-pointer transition-all ${
                    selectedTemplate === tmpl.id
                      ? 'border-[#4a4df2] bg-blue-50/50 shadow-md ring-2 ring-[#4a4df2]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="w-full h-24 bg-slate-100 rounded-lg mb-2 flex flex-col p-2 space-y-1">
                    <div className="h-1.5 w-full rounded" style={{ backgroundColor: tmpl.color }} />
                    <div className="h-1 w-3/4 bg-slate-300 rounded" />
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-5/6 bg-slate-200 rounded" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{tmpl.name}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  const editorEl = document.getElementById('features-section') || document.getElementById('cv-builder-section');
                  if (editorEl) {
                    editorEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4a4df2] hover:bg-[#3d40e0] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Continue to Editor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
