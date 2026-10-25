'use client';

import React from 'react';
import { useCvStore } from '@/store/useCvStore';
import {
  Sparkles,
  Check,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Undo2,
  Redo2,
  Lightbulb,
  Loader2,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { useSummaryRewrite } from '@/hooks/useSummaryRewrite';
import WordCountBadge from '@/components/common/WordCountBadge';

interface SummaryStepProps {
  mode?: 'intro' | 'form';
}

export default function SummaryStep({ mode = 'form' }: SummaryStepProps) {
  const summary = useCvStore((state) => state.summary);
  const setSummary = useCvStore((state) => state.setSummary);
  const {
    isRewriting,
    rewriteError,
    rewriteSuccess,
    canUndo,
    rewriteSummary,
    undoRewrite,
    clearError,
  } = useSummaryRewrite();

  if (mode === 'intro') {
    return (
      <div className="space-y-6 sm:space-y-8 animate-[fadeIn_0.2s_ease-out]">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-[#00d084] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-bold text-[#0F1B4D] text-base sm:text-lg tracking-tight">
            Great job with your skills!
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F1B4D] tracking-tight leading-[1.15]">
          Add your professional summary
        </h1>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#EEF3FF] border border-[#E0E7FF] flex items-center gap-3.5 shadow-2xs">
          <Sparkles className="w-5 h-5 text-[#4B4DED] shrink-0" />
          <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
            Our AI assistant will craft and polish a compelling summary for your CV.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F1B4D] tracking-tight leading-tight">
          Add your professional summary
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
          Show how your background matches the job you want.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-300 bg-white shadow-2xs overflow-hidden focus-within:border-[#4348F2] focus-within:ring-1 focus-within:ring-[#4348F2] transition-all">
        {/* Formatting Toolbar + AI Rewrite */}
        <div className="px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between gap-2 text-slate-700 bg-slate-50/60 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setSummary(summary ? `**${summary}**` : '**')}
              className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center font-bold font-serif text-sm text-slate-800 cursor-pointer"
              title="Bold"
            >
              <Bold className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() => setSummary(summary ? `*${summary}*` : '*')}
              className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center italic font-serif text-sm text-slate-800 cursor-pointer"
              title="Italic"
            >
              <Italic className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() => setSummary(summary ? `<u>${summary}</u>` : '<u></u>')}
              className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center underline font-serif text-sm text-slate-800 cursor-pointer"
              title="Underline"
            >
              <Underline className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="w-[1px] h-4 bg-slate-200 mx-1" />

            <button
              type="button"
              onClick={() => setSummary(summary ? `${summary}\n• ` : '• ')}
              className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer"
              title="Bullet list"
            >
              <List className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              type="button"
              onClick={() => setSummary(summary ? `${summary}\n1. ` : '1. ')}
              className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer"
              title="Numbered list"
            >
              <ListOrdered className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer"
              title="Link"
            >
              <Link2 className="w-4 h-4 stroke-[2]" />
            </button>

            <div className="w-[1px] h-4 bg-slate-200 mx-1" />

            <button
              type="button"
              onClick={undoRewrite}
              disabled={!canUndo}
              className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 disabled:opacity-35 cursor-pointer"
              title="Undo AI Rewrite"
            >
              <Undo2 className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 opacity-35 cursor-default"
              title="Redo"
            >
              <Redo2 className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
          <WordCountBadge text={summary} min={40} max={80} />
        </div>

        {/* Textarea */}
        <div className="p-4 sm:p-5 relative pb-16">
          <textarea
            rows={5}
            value={summary ?? ''}
            onChange={(e) => {
              if (rewriteError) clearError();
              setSummary(e.target.value);
            }}
            placeholder="e.g. After more than 5 years of experience in sales in the luxury and ready-to-wear sector..."
            className="w-full text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-y leading-relaxed font-sans bg-transparent"
          />

          {/* Word count & AI Rewrite action inside textarea footer */}
          <div className="absolute left-4 bottom-4 flex items-center sm:hidden">
            <WordCountBadge text={summary} min={40} max={80} />
          </div>
          <div className="absolute right-4 bottom-4 flex items-center gap-2">
            {canUndo && !isRewriting && (
              <button
                type="button"
                onClick={undoRewrite}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 font-semibold text-xs border border-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                title="Restore previous summary draft"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Undo</span>
              </button>
            )}
            <button
              type="button"
              onClick={rewriteSummary}
              disabled={isRewriting}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer border whitespace-nowrap disabled:opacity-70 disabled:cursor-wait ${
                rewriteSuccess
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-[#E8EEFF] hover:bg-[#4348F2] text-[#4348F2] hover:text-white border-[#C5D3FF]'
              }`}
            >
              {isRewriting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Rewriting...</span>
                </>
              ) : rewriteSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5] shrink-0" />
                  <span>Polished</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>AI Rewrite</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {rewriteError && (
        <div
          role="alert"
          className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
          <span>{rewriteError}</span>
        </div>
      )}

      {/* Recruiter tip footer */}
      <div className="flex items-center gap-2.5 text-slate-600 text-xs sm:text-sm pl-1">
        <div className="w-6 h-6 rounded-full bg-[#EEF2FF] text-[#4348F2] flex items-center justify-center shrink-0">
          <Lightbulb className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
        <span>
          <strong className="text-slate-900 font-semibold">Recruiter tip:</strong> Write between 2-4 sentences maximum.
        </span>
      </div>
    </div>
  );
}
