'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, FileText } from 'lucide-react';

export interface ParsingProgressProps {
  fileName?: string;
  onComplete?: () => void;
  // If controlled externally
  currentStepIndex?: number;
}

const STAGES = [
  {
    title: 'Analyzing document structure',
    description: 'Detecting contact details, career headers, and typography',
  },
  {
    title: 'Extracting professional history',
    description: 'Structuring roles, employers, dates, and bullet achievements',
  },
  {
    title: 'Cataloging education & credentials',
    description: 'Parsing degrees, universities, certifications, and languages',
  },
  {
    title: 'Refining skills & ATS summary',
    description: 'Polishing phrasing and aligning with industry standards',
  },
];

export default function ParsingProgress({
  fileName = 'CV Document',
  onComplete,
}: ParsingProgressProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(15);

  useEffect(() => {
    // Stage 1
    const t1 = setTimeout(() => {
      setActiveStep(1);
      setProgressPercent(45);
    }, 700);

    // Stage 2
    const t2 = setTimeout(() => {
      setActiveStep(2);
      setProgressPercent(75);
    }, 1500);

    // Stage 3
    const t3 = setTimeout(() => {
      setActiveStep(3);
      setProgressPercent(95);
    }, 2200);

    // Stage 4 / Complete
    const t4 = setTimeout(() => {
      setProgressPercent(100);
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E8EAF5] shadow-[0_8px_30px_rgba(15,27,77,0.06)] p-6 sm:p-10">
      {/* Header with animated beacon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 mb-3">
          <Sparkles className="w-4 h-4 text-[#4B4DED] animate-spin" />
          <span className="text-xs font-semibold text-[#4B4DED]">
            AI CV Parser Active
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B4D] tracking-tight">
          Transforming your CV
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2 text-xs sm:text-sm text-slate-500">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate max-w-[280px] font-medium text-slate-700">
            {fileName}
          </span>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
          <span>Parsing progress</span>
          <span className="text-[#4B4DED] font-mono tabular-nums">
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-[#4B4DED] to-[#7B7DF6] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 4-Step Visual Milestones */}
      <div className="space-y-4">
        {STAGES.map((stage, idx) => {
          const isDone = activeStep > idx;
          const isCurrent = activeStep === idx;
          const isUpcoming = activeStep < idx;

          return (
            <div
              key={stage.title}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                isCurrent
                  ? 'border-[#4B4DED] bg-indigo-50/50 shadow-xs'
                  : isDone
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-100 bg-slate-50/50 opacity-60'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-[#4B4DED] animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400 font-mono">
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-sm font-bold tracking-tight truncate ${
                      isCurrent
                        ? 'text-[#0F1B4D]'
                        : isDone
                        ? 'text-emerald-950'
                        : 'text-slate-600'
                    }`}
                  >
                    {stage.title}
                  </p>
                  {isCurrent && (
                    <span className="text-[11px] font-semibold text-[#4B4DED] animate-pulse">
                      In progress...
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[11px] font-semibold text-emerald-600">
                      Completed
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500">
          Your data is processed securely with encrypted transmission. No files are shared publicly.
        </p>
      </div>
    </div>
  );
}
