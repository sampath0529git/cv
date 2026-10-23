'use client';

import React from 'react';
import { useCvStore } from '@/store/useCvStore';
import { Download, Edit3, CheckCircle2, Sparkles, FileText, Printer } from 'lucide-react';

export default function FinalizeStep() {
  const { contact, experiences, educations, skills, setStep } = useCvStore();

  const handleDownloadPdf = () => {
    // Triggers standard browser print dialog styled for A4 page
    window.print();
  };

  const sections = [
    { id: 1, title: 'Personal Details', detail: `${contact.firstName || 'Not added'} ${contact.lastName || ''}` },
    { id: 2, title: 'Work Experience', detail: `${experiences.length} positions added` },
    { id: 3, title: 'Education', detail: `${educations.length} qualifications added` },
    { id: 4, title: 'Key Skills', detail: `${skills.length} skills listed` },
    { id: 5, title: 'Professional Summary', detail: 'Completed' },
  ];

  return (
    <div className="space-y-7">
      {/* Heading */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Ready for Applications</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F1B4D] tracking-tight leading-tight">
          Your CV is ready to download!
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
          Review your sections, make any final adjustments, and export as a recruiter-approved A4 PDF.
        </p>
      </div>

      {/* Main Download Action Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F1B4D] to-[#1E2563] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-xl font-bold flex items-center justify-center sm:justify-start gap-2">
            <span>Download High-Resolution PDF</span>
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            Crisp ATS-friendly vector PDF formatted to international A4 dimensions with recruiter-approved layout.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadPdf}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#4B4DED] hover:bg-[#3D3FC9] active:scale-98 text-white font-bold rounded-2xl shadow-[0_6px_20px_rgba(75,77,237,0.4)] flex items-center justify-center gap-2.5 transition-all cursor-pointer shrink-0 text-base"
        >
          <Printer className="w-5 h-5" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Section Review & Edit Shortcuts */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Section Checklist & Quick Edit
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sections.map((sec) => (
            <div
              key={sec.id}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#4B4DED] transition-all flex items-center justify-between shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EEF0FF] text-[#4B4DED] flex items-center justify-center font-bold text-xs">
                  {sec.id}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F1B4D]">{sec.title}</h4>
                  <p className="text-xs text-slate-400">{sec.detail}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(sec.id)}
                className="p-2 text-slate-400 group-hover:text-[#4B4DED] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                title={`Edit ${sec.title}`}
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
