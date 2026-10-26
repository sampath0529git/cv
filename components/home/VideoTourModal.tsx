'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  FileText,
  Sliders,
  Download,
  Upload,
} from 'lucide-react';

interface VideoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOUR_STEPS = [
  {
    step: 1,
    title: 'Choose a Template',
    desc: 'Select from 20+ ATS-optimised formats designed for UK & global recruiters.',
    icon: FileText,
    badge: 'Step 1 of 4',
  },
  {
    step: 2,
    title: 'Import or Enter Details',
    desc: 'Import your existing CV, sync LinkedIn, or use guided starter prompts.',
    icon: Upload,
    badge: 'Step 2 of 4',
  },
  {
    step: 3,
    title: 'AI Polish & Customize',
    desc: 'Rewrite bullet points, adjust typography, and tailor skills with one click.',
    icon: Sparkles,
    badge: 'Step 3 of 4',
  },
  {
    step: 4,
    title: 'Download & Apply',
    desc: 'Instantly export crisp 300 DPI A4 PDFs or DOCX files ready for applications.',
    icon: Download,
    badge: 'Step 4 of 4',
  },
];

export default function VideoTourModal({ isOpen, onClose }: VideoTourModalProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 id="tour-title" className="text-base sm:text-lg font-bold text-slate-900">
              How freecvmakeruk.co.uk Works in 3 Minutes
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
            aria-label="Close tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Tour Visual Area */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Simulated App Screen Walkthrough */}
          <div className="relative aspect-[16/9] w-full rounded-2xl bg-gradient-to-tr from-[#0b112c] via-[#101844] to-[#1a2356] border border-slate-800 p-4 sm:p-6 overflow-hidden flex flex-col justify-between text-white shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Interactive Walkthrough</span>
              </span>
              <span className="font-mono text-slate-400">Step {activeTab + 1} / 4</span>
            </div>

            {/* Center Dynamic Preview */}
            <div className="my-auto py-4 text-center max-w-lg mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-500/40 text-blue-300 mx-auto flex items-center justify-center shadow-lg">
                {React.createElement(TOUR_STEPS[activeTab].icon, {
                  className: 'w-7 h-7 stroke-[2.2]',
                })}
              </div>
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {TOUR_STEPS[activeTab].title}
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {TOUR_STEPS[activeTab].desc}
              </p>
            </div>

            {/* Bottom Controls inside player */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center gap-1.5">
                {TOUR_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeTab === idx ? 'w-8 bg-[#2563EB]' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab((prev) => (prev > 0 ? prev - 1 : 3))}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab((prev) => (prev < 3 ? prev + 1 : 0))}
                  className="px-3 py-1 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold cursor-pointer"
                >
                  Next step
                </button>
              </div>
            </div>
          </div>

          {/* 4 Step Clickable Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {TOUR_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#2563EB] bg-blue-50/70 shadow-xs ring-2 ring-[#2563EB]/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Icon
                      className={`w-4 h-4 ${isActive ? 'text-[#2563EB]' : 'text-slate-500'}`}
                    />
                    <span
                      className={`text-[10px] font-bold ${
                        isActive ? 'text-[#2563EB]' : 'text-slate-400'
                      }`}
                    >
                      0{step.step}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                    {step.title}
                  </h5>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No credit card required · Free instant preview</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white cursor-pointer"
            >
              Close
            </button>
            <Link
              href="/start"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
            >
              <span>Build My CV Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
