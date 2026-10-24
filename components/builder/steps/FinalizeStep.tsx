'use client';

import React, { useState } from 'react';
import { useCvStore } from '@/store/useCvStore';
import {
  Download,
  Edit3,
  CheckCircle2,
  Sparkles,
  FileText,
  Printer,
  ShieldCheck,
  RotateCcw,
  Loader2,
  Check,
  Info,
  AlertCircle,
} from 'lucide-react';
import { downloadCvPdf, triggerBrowserPrint } from '@/lib/pdfGenerator';
import { downloadCvDocx } from '@/lib/docxGenerator';
import { useSummaryRewrite } from '@/hooks/useSummaryRewrite';

export default function FinalizeStep() {
  const {
    contact,
    experiences,
    educations,
    skills,
    summary,
    setSummary,
    interestsList,
    setStep,
    customPdfFileName,
    setCustomPdfFileName,
  } = useCvStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPrintTip, setShowPrintTip] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgressText, setDownloadProgressText] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false);
  const [docxProgressText, setDocxProgressText] = useState('');
  const [docxSuccess, setDocxSuccess] = useState(false);

  const {
    isRewriting,
    rewriteError,
    rewriteSuccess,
    canUndo,
    rewriteSummary,
    undoRewrite,
    clearError,
  } = useSummaryRewrite();

  const summaryText = summary ?? '';
  const summaryWordCount = summaryText.trim() ? summaryText.trim().split(/\s+/).length : 0;

  const defaultBaseName = `${([contact.firstName, contact.lastName].filter(Boolean).join('_') || 'Curriculum_Vitae')}-CV`;
  const cleanCustom = (customPdfFileName ?? '').trim().replace(/\.(pdf|docx)$/i, '');
  const displayBaseName = cleanCustom || defaultBaseName;
  const resolvedFileName = `${displayBaseName}.pdf`;
  const resolvedDocxFileName = `${displayBaseName}.docx`;

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadSuccess(false);
    setDownloadProgressText('Generating A4 PDF...');
    try {
      const ok = await downloadCvPdf({
        fileName: resolvedFileName,
        onProgress: (status) => setDownloadProgressText(status),
      });
      if (ok) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 5000);
      }
    } catch (err) {
      console.error('FinalizeStep PDF export error:', err);
    } finally {
      setIsDownloading(false);
      setDownloadProgressText('');
    }
  };

  const handleDownloadDocx = async () => {
    if (isDownloadingDocx) return;
    setIsDownloadingDocx(true);
    setDocxSuccess(false);
    setDocxProgressText('Building .docx...');
    try {
      const ok = await downloadCvDocx({
        fileName: resolvedDocxFileName,
        onProgress: (status) => setDocxProgressText(status),
      });
      if (ok) {
        setDocxSuccess(true);
        setTimeout(() => setDocxSuccess(false), 5000);
      }
    } catch (err) {
      console.error('FinalizeStep DOCX export error:', err);
    } finally {
      setIsDownloadingDocx(false);
      setDocxProgressText('');
    }
  };

  const handleBrowserPrint = () => {
    triggerBrowserPrint(resolvedFileName);
  };

  const sections = [
    { id: 1, title: 'Personal Details', detail: [contact.firstName, contact.lastName].filter(Boolean).join(' ') || 'Not added' },
    { id: 2, title: 'Education', detail: `${educations.length} qualifications added` },
    { id: 3, title: 'Work Experience', detail: `${experiences.length} positions added` },
    { id: 4, title: 'Additional Info & Skills', detail: `${skills.length} skills • ${interestsList?.length || 0} interests` },
    { id: 5, title: 'Professional Summary', detail: summary?.trim() ? 'Completed' : 'Optional' },
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
          Polish your professional summary, customize the download filename, and export as a recruiter-approved A4 PDF.
        </p>
      </div>

      {/* Professional Summary with AI Rewrite */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <label
              htmlFor="finalize-summary-textarea"
              className="text-sm font-bold text-[#0F1B4D] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#4B4DED]" />
              <span>Professional Summary</span>
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Review or automatically polish your summary for stronger recruiter impact and clarity.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {canUndo && !isRewriting && (
              <button
                type="button"
                onClick={undoRewrite}
                className="min-h-[38px] px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#0F1B4D] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
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
              className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap disabled:opacity-70 disabled:cursor-wait ${
                rewriteSuccess
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-[#EEF1FF] hover:bg-[#4B4DED] text-[#4B4DED] hover:text-white border border-[#4B4DED]/25 shadow-2xs'
              }`}
            >
              {isRewriting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                  <span>Rewriting...</span>
                </>
              ) : rewriteSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
                  <span>Polished</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>AI Rewrite</span>
                </>
              )}
            </button>
          </div>
        </div>

        <textarea
          id="finalize-summary-textarea"
          rows={4}
          value={summaryText}
          onChange={(e) => {
            if (rewriteError) clearError();
            setSummary(e.target.value);
          }}
          placeholder="Write a 3–4 sentence overview of your experience, core specialisms, and achievements, then click AI Rewrite to polish..."
          className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B4DED]/20 focus:border-[#4B4DED] transition-all resize-y leading-relaxed"
        />

        <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 tabular-nums">
          <span>Aim for 3–4 concise, high-impact sentences</span>
          <span>
            {summaryWordCount} words · {summaryText.length} chars
          </span>
        </div>

        {rewriteError && (
          <div
            role="alert"
            className="px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
            <span>{rewriteError}</span>
          </div>
        )}
      </div>

      {/* Filename Customization Field */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label htmlFor="cv-filename-input" className="text-sm font-bold text-[#0F1B4D] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#4B4DED]" />
              <span>PDF Filename</span>
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize the name of your exported PDF document before saving.
            </p>
          </div>
          {customPdfFileName && (
            <button
              type="button"
              onClick={() => setCustomPdfFileName('')}
              className="text-xs text-slate-500 hover:text-[#4B4DED] flex items-center gap-1 font-medium transition-colors cursor-pointer self-start sm:self-auto"
              title="Reset to default filename"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to default</span>
            </button>
          )}
        </div>

        <div className="relative flex items-center">
          <input
            id="cv-filename-input"
            type="text"
            value={customPdfFileName ?? ''}
            onChange={(e) => setCustomPdfFileName(e.target.value)}
            placeholder={defaultBaseName}
            className="w-full pl-3.5 pr-16 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B4DED]/20 focus:border-[#4B4DED] transition-all"
          />
          <div className="absolute right-3 px-2 py-1 bg-slate-200/70 text-slate-600 rounded-md text-xs font-mono font-medium pointer-events-none select-none">
            .pdf
          </div>
        </div>
        <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5">
          <span>Will download as:</span>
          <span className="font-mono text-[#0F1B4D] font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
            {resolvedFileName}
          </span>
          <span>or</span>
          <span className="font-mono text-[#0F1B4D] font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
            {resolvedDocxFileName}
          </span>
        </div>
      </div>

      {/* Download Success Feedback Banner */}
      {(downloadSuccess || docxSuccess) && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Check className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-emerald-900">Your high-quality CV is downloaded!</h4>
            <p className="text-xs text-emerald-700 mt-0.5">
              Saved as{' '}
              <span className="font-mono font-semibold">
                {docxSuccess && !downloadSuccess ? resolvedDocxFileName : resolvedFileName}
              </span>
              . Check your downloads folder or browser tray.
            </p>
          </div>
        </div>
      )}

      {/* Main Download Action Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F1B4D] to-[#1E2563] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 text-[11px] font-semibold border border-cyan-400/30">
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>300 DPI Ultra Sharp Output</span>
          </div>
          <h3 className="text-xl font-bold flex items-center justify-center sm:justify-start gap-2">
            <span>Download High-Resolution PDF</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            Directly exports a crystal-clear vector A4 PDF formatted to standard international dimensions (210 × 297 mm).
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-slate-300">
            <span className="bg-white/10 px-2 py-0.5 rounded">A4 Dimensions</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">ATS-Friendly</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">Print & Digital Ready</span>
          </div>
        </div>

        {/* Download Buttons and Actions */}
        <div className="flex flex-col items-center sm:items-end gap-2.5 w-full sm:w-auto shrink-0">
          <div className="relative group w-full sm:w-auto flex flex-col items-center sm:items-end">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#4B4DED] hover:bg-[#3D3FC9] active:scale-98 text-white font-bold rounded-2xl shadow-[0_6px_20px_rgba(75,77,237,0.4)] flex items-center justify-center gap-2.5 transition-all cursor-pointer text-base disabled:opacity-75 disabled:cursor-wait"
              aria-label={`Download ${resolvedFileName}`}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="max-w-[190px] truncate">{downloadProgressText || 'Generating PDF...'}</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-5 h-5 text-emerald-300" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Subtle ATS-Friendly PDF Hover Tooltip */}
            <div
              role="tooltip"
              className={`absolute bottom-full mb-2.5 px-3 py-1.5 bg-[#090d1f] text-white text-[11px] font-medium rounded-xl shadow-2xl border border-slate-700/80 pointer-events-none z-30 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>ATS-friendly PDF &bull; Direct high-resolution download</span>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#090d1f]" />
            </div>
          </div>

          {/* Secondary Word (.docx) + Vector Print Actions */}
          <div className="flex flex-col items-center sm:items-end gap-1.5 w-full sm:w-auto">
            <div className="flex flex-wrap items-center justify-center sm:justify-end w-full sm:w-auto gap-2 text-xs">
              <button
                type="button"
                onClick={handleDownloadDocx}
                disabled={isDownloadingDocx}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-70 whitespace-nowrap"
                aria-label={`Download ${resolvedDocxFileName}`}
              >
                {isDownloadingDocx ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-300" />
                    <span>{docxProgressText || 'Building .docx...'}</span>
                  </>
                ) : docxSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>DOCX Saved!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Word (.docx)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBrowserPrint}
                onMouseEnter={() => setShowPrintTip(true)}
                onMouseLeave={() => setShowPrintTip(false)}
                onFocus={() => setShowPrintTip(true)}
                onBlur={() => setShowPrintTip(false)}
                aria-describedby="finalize-vector-print-hint"
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-300" />
                <span>Vector Print</span>
              </button>

              <div className="flex items-center gap-1 text-[11px] text-cyan-200/95 font-medium select-none">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ATS-friendly</span>
              </div>
            </div>

            <div className="relative flex items-center justify-center sm:justify-end w-full sm:w-auto">
              <button
                type="button"
                id="finalize-vector-print-hint"
                onClick={() => setShowPrintTip((prev) => !prev)}
                onMouseEnter={() => setShowPrintTip(true)}
                onMouseLeave={() => setShowPrintTip(false)}
                onFocus={() => setShowPrintTip(true)}
                onBlur={() => setShowPrintTip(false)}
                aria-expanded={showPrintTip}
                className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer leading-tight py-0.5"
              >
                <Info className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                <span>
                  Set <strong className="font-semibold text-white">Margins: None</strong> &amp;{' '}
                  <strong className="font-semibold text-white">Scale: 100%</strong>
                </span>
              </button>

              {showPrintTip && (
                <div
                  role="tooltip"
                  className="absolute top-full right-0 mt-1.5 w-[260px] max-w-[calc(100vw-2.5rem)] p-3 rounded-xl bg-[#090d1f] text-white text-[11px] leading-relaxed shadow-2xl border border-slate-700/80 z-30 text-left"
                >
                  <div className="font-bold text-white mb-1.5 flex items-center justify-between gap-2">
                    <span>Recommended Print Settings</span>
                    <span className="text-[10px] font-mono text-cyan-300">A4 PDF</span>
                  </div>
                  <ul className="space-y-1 text-slate-200">
                    <li className="flex items-center justify-between gap-2">
                      <span className="text-slate-400">Margins:</span>
                      <span className="font-semibold text-white">None</span>
                    </li>
                    <li className="flex items-center justify-between gap-2">
                      <span className="text-slate-400">Scale:</span>
                      <span className="font-semibold text-white">100%</span>
                    </li>
                    <li className="flex items-center justify-between gap-2">
                      <span className="text-slate-400">Paper size:</span>
                      <span className="font-semibold text-white">A4 (210 × 297 mm)</span>
                    </li>
                    <li className="flex items-center justify-between gap-2">
                      <span className="text-slate-400">Background graphics:</span>
                      <span className="font-semibold text-emerald-400">Enabled</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
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
