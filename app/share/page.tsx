'use client';

import React, { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Logo from '@/components/brand/Logo';
import UnifiedCvPreview from '@/components/CvPreview';
import { decodeCvShareToken, DecodedShareResult } from '@/lib/shareCodec';
import { downloadCvPdf, triggerBrowserPrint } from '@/lib/pdfGenerator';
import { downloadCvDocx } from '@/lib/docxGenerator';
import { A4_WIDTH_PX } from '@/types/cv';
import { CV_TEMPLATES } from '@/templates/registry';
import PdfDownloadButton from '@/components/builder/PdfDownloadButton';
import {
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Clock,
  AlertCircle,
  ArrowLeft,
  Check,
  Loader2,
  FileText,
} from 'lucide-react';

function formatRemainingDuration(expiresAtMs: number): string {
  const diffMs = Math.max(0, expiresAtMs - Date.now());
  const totalMinutes = Math.floor(diffMs / 60000);
  if (totalMinutes < 60) {
    return `${Math.max(1, totalMinutes)}m remaining`;
  }
  const totalHours = Math.floor(totalMinutes / 60);
  if (totalHours < 48) {
    const mins = totalMinutes % 60;
    return mins > 0 ? `${totalHours}h ${mins}m remaining` : `${totalHours}h remaining`;
  }
  const days = Math.floor(totalHours / 24);
  const remHours = totalHours % 24;
  return remHours > 0 ? `${days}d ${remHours}h remaining` : `${days}d remaining`;
}

function formatDateLabel(ms: number): string {
  try {
    return new Date(ms).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function SharedCvWorkspace() {
  const searchParams = useSearchParams();
  const queryData = searchParams.get('d');
  const queryShareId = searchParams.get('s');

  const [decoded, setDecoded] = useState<DecodedShareResult | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadDone, setDownloadDone] = useState<boolean>(false);
  const [isDownloadingDocx, setIsDownloadingDocx] = useState<boolean>(false);
  const [docxDone, setDocxDone] = useState<boolean>(false);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState<number>(0.78);
  const [manualZoom, setManualZoom] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [activePreviewPage, setActivePreviewPage] = useState<number>(1);

  const effectiveScale = manualZoom !== null ? manualZoom / 100 : fitScale;
  const displayedZoomPercent = Math.round(effectiveScale * 100);

  // Decode CV snapshot from either ?d= query param or #d= hash fragment
  useEffect(() => {
    let cancelled = false;

    const runDecode = async () => {
      let rawToken = queryData;
      if (!rawToken && typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash.replace(/^#/, '');
        const hashParams = new URLSearchParams(hash);
        rawToken = hashParams.get('d');
      }

      const result = await decodeCvShareToken(rawToken);
      if (!cancelled) {
        setDecoded(result);
      }
    };

    void runDecode();
    const onHashChange = () => {
      void runDecode();
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      cancelled = true;
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [queryData, queryShareId]);

  const recalculateFitScale = useCallback(() => {
    if (!previewContainerRef.current) return;
    const width = previewContainerRef.current.clientWidth;
    if (width > 0) {
      const horizontalPadding = width < 640 ? 16 : 48;
      const available = Math.max(240, width - horizontalPadding);
      const computed = Math.min(0.95, Math.max(0.3, available / A4_WIDTH_PX));
      setFitScale(Number(computed.toFixed(3)));
    }
  }, []);

  useEffect(() => {
    recalculateFitScale();
    const observer = new ResizeObserver(recalculateFitScale);
    if (previewContainerRef.current) {
      observer.observe(previewContainerRef.current);
    }
    window.addEventListener('resize', recalculateFitScale);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', recalculateFitScale);
    };
  }, [recalculateFitScale, decoded?.status]);

  useEffect(() => {
    const handlePrintComplete = (e: any) => {
      setIsDownloading(false);
      if (e?.detail?.ok !== false) {
        setDownloadDone(true);
        setTimeout(() => setDownloadDone(false), 3500);
      }
    };
    window.addEventListener('applet-print-cv-complete', handlePrintComplete);
    return () => window.removeEventListener('applet-print-cv-complete', handlePrintComplete);
  }, []);

  const handlePagesChange = useCallback((pagesCount: number) => {
    setTotalPages(pagesCount);
    setActivePreviewPage((prev) => Math.min(prev, Math.max(1, pagesCount)));
  }, []);

  const handleScrollToPreviewPage = (pageNum: number) => {
    const clamped = Math.max(1, Math.min(totalPages, pageNum));
    setActivePreviewPage(clamped);
    const el = document.getElementById(`cv-preview-page-${clamped}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  if (!decoded) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F4F7FE] text-slate-900 font-sans">
        <header className="w-full bg-white/95 border-b border-[#E8EAF5] h-14 sm:h-16 flex items-center px-4 sm:px-8">
          <Logo variant="dark" href="/" />
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-[640px] h-[720px] bg-white rounded-2xl border border-[#E8EAF5] shadow-xs p-8 flex flex-col gap-4 animate-pulse">
            <div className="h-6 w-48 bg-slate-200 rounded-md" />
            <div className="h-4 w-32 bg-slate-100 rounded-md" />
            <div className="h-px w-full bg-slate-100 my-2" />
            <div className="h-4 w-full bg-slate-100 rounded-md" />
            <div className="h-4 w-5/6 bg-slate-100 rounded-md" />
            <div className="h-4 w-4/6 bg-slate-100 rounded-md" />
          </div>
        </main>
      </div>
    );
  }

  if (decoded.status === 'expired' || decoded.status === 'invalid') {
    const isExpired = decoded.status === 'expired';
    return (
      <div className="min-h-screen flex flex-col bg-[#F4F7FE] text-slate-900 font-sans">
        <header className="w-full bg-white/95 border-b border-[#E8EAF5]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
            <Logo variant="dark" href="/" />
            <Link
              href="/builder"
              className="min-h-[40px] px-4 py-2 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Open CV Builder</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8EAF5] p-6 sm:p-8 text-center shadow-[0_8px_30px_rgba(15,27,77,0.05)]">
            <div
              className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                isExpired
                  ? 'bg-amber-50 text-[#D97706]'
                  : 'bg-red-50 text-[#DC2626]'
              }`}
            >
              {isExpired ? <Clock className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>

            <h1 className="text-xl font-bold text-[#0F1B4D] tracking-tight">
              {isExpired ? 'Temporary Link Expired' : 'Unable to Load Shared CV'}
            </h1>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed tabular-nums">
              {isExpired
                ? `This public CV preview link (${decoded.shareId}) expired on ${formatDateLabel(
                    decoded.expiresAt
                  )}. Ask the sender to generate a fresh link from their builder.`
                : decoded.message}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Link
                href="/builder"
                className="w-full sm:w-auto min-h-[42px] px-5 py-2.5 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Go to CV Builder</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto min-h-[42px] px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#0F1B4D] text-sm font-semibold inline-flex items-center justify-center transition-colors whitespace-nowrap"
              >
                Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const { cv, shareId, expiresAt } = decoded;
  const candidateName = cv.personal.fullName || 'Curriculum Vitae';
  const sanitizedBaseName =
    candidateName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '_') || 'shared';
  const sanitizedFileName = `${sanitizedBaseName}_cv.pdf`;
  const sanitizedDocxFileName = `${sanitizedBaseName}_cv.docx`;

  const templateMeta =
    CV_TEMPLATES.find((t) => t.id === cv.settings.templateId) || CV_TEMPLATES[0];

  const handleDownloadSharedPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadDone(false);
    try {
      const ok = await downloadCvPdf({ fileName: sanitizedFileName, cv });
      if (ok) {
        setDownloadDone(true);
        setTimeout(() => setDownloadDone(false), 4000);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSharedDocx = async () => {
    if (isDownloadingDocx) return;
    setIsDownloadingDocx(true);
    setDocxDone(false);
    try {
      const ok = await downloadCvDocx({ fileName: sanitizedDocxFileName, cv });
      if (ok) {
        setDocxDone(true);
        setTimeout(() => setDocxDone(false), 4000);
      }
    } finally {
      setIsDownloadingDocx(false);
    }
  };

  const handlePrintSharedCv = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    triggerBrowserPrint(sanitizedFileName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FE] text-slate-900 font-sans">
      {/* Sticky Public Preview Header */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-[#E8EAF5] sticky top-0 z-40">
        <div className="max-w-[1360px] mx-auto px-3.5 sm:px-6 lg:px-10 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Left: Brand + Candidate Context */}
          <div className="flex items-center gap-3 min-w-0">
            <Logo variant="dark" href="/" />
            <span className="hidden md:inline text-slate-300">/</span>
            <div className="hidden md:flex items-center gap-2 min-w-0 text-xs text-slate-500 tabular-nums">
              <span className="font-semibold text-[#0F1B4D] truncate max-w-[200px]">
                {candidateName}
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-[#4B4DED]" />
                {formatRemainingDuration(expiresAt)}
              </span>
            </div>
          </div>

          {/* Right: Builder Link + Print + Download PDF */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Link
              href="/builder"
              className="min-h-[40px] px-3 sm:px-3.5 py-2 rounded-xl border border-[#DCE3F7] bg-white hover:bg-[#EEF1FF]/60 text-[#0F1B4D] text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
              <span className="hidden sm:inline">CV Builder</span>
              <span className="sm:hidden">Builder</span>
            </Link>

            <button
              type="button"
              onClick={handleDownloadSharedDocx}
              disabled={isDownloadingDocx}
              title="Download editable Microsoft Word (.docx)"
              className={`min-h-[40px] px-2.5 sm:px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0 ${
                docxDone
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-[#0F1B4D]'
              }`}
            >
              {isDownloadingDocx ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#4B4DED] shrink-0" />
                  <span>DOCX...</span>
                </>
              ) : docxDone ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>DOCX</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-[#4B4DED] shrink-0" />
                  <span className="sm:hidden">DOCX</span>
                  <span className="hidden sm:inline">Word (.docx)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrintSharedCv}
              disabled={isDownloading}
              title="Vector Print (Recommended: Margins None, Scale 100%)"
              className="hidden sm:inline-flex min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#0F1B4D] text-xs sm:text-sm font-semibold items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0"
            >
              <Printer className="w-4 h-4 text-[#4B4DED] shrink-0" />
              <span>Print</span>
            </button>

            <PdfDownloadButton
              fileName={sanitizedFileName}
              cv={cv}
              variant="header"
              label="Download PDF"
            />
          </div>
        </div>
      </header>

      {/* Main Centered Read-Only A4 Preview Stage */}
      <main className="flex-1 max-w-[1060px] w-full mx-auto px-3 sm:px-6 py-4 sm:py-7 flex flex-col items-center">
        {/* Clean Typographic Metadata Bar */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-3.5 px-1 text-xs text-slate-500 tabular-nums">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
            <span className="font-bold text-[#0F1B4D] truncate">{candidateName}</span>
            {cv.personal.jobTitle && (
              <>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="text-slate-600 truncate">{cv.personal.jobTitle}</span>
              </>
            )}
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span>
              {templateMeta.name} · A4 · {totalPages} {totalPages === 1 ? 'Page' : 'Pages'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="font-mono">#{shareId}</span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span>Expires {formatDateLabel(expiresAt)}</span>
          </div>
        </div>

        {/* Crisp A4 Document Stage */}
        <div
          ref={previewContainerRef}
          className="w-full bg-[#E9EEFB]/70 rounded-2xl sm:rounded-3xl border border-[#DCE3F7] overflow-x-auto overflow-y-auto flex justify-center items-start p-2.5 sm:p-6"
        >
          <UnifiedCvPreview
            cv={cv}
            showControlsBar={false}
            scale={effectiveScale}
            onPagesChange={handlePagesChange}
            isPrimary={true}
          />
        </div>

        {/* Floating Navy Zoom & Page Controls Dock */}
        <div className="mt-4 bg-[#0F1B4D] text-white rounded-2xl px-3 sm:px-5 py-1.5 sm:py-2 flex items-center justify-center gap-1.5 sm:gap-3 shadow-[0_8px_24px_rgba(15,27,77,0.22)] max-w-full">
          <button
            type="button"
            disabled={activePreviewPage <= 1}
            onClick={() => handleScrollToPreviewPage(activePreviewPage - 1)}
            className="min-h-[38px] min-w-[34px] flex items-center justify-center text-white/75 hover:text-white disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
            title="Previous Page"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-semibold tabular-nums whitespace-nowrap px-0.5">
            {activePreviewPage}/{totalPages}
          </span>
          <button
            type="button"
            disabled={activePreviewPage >= totalPages}
            onClick={() => handleScrollToPreviewPage(activePreviewPage + 1)}
            className="min-h-[38px] min-w-[34px] flex items-center justify-center text-white/75 hover:text-white disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
            title="Next Page"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-white/15" />

          <button
            type="button"
            onClick={() =>
              setManualZoom((z) => Math.max(30, (z ?? displayedZoomPercent) - 10))
            }
            disabled={displayedZoomPercent <= 30}
            className="min-h-[38px] min-w-[34px] flex items-center justify-center text-white/75 hover:text-white disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold min-w-[40px] text-center tabular-nums">
            {displayedZoomPercent}%
          </span>
          <button
            type="button"
            onClick={() =>
              setManualZoom((z) => Math.min(120, (z ?? displayedZoomPercent) + 10))
            }
            disabled={displayedZoomPercent >= 120}
            className="min-h-[38px] min-w-[34px] flex items-center justify-center text-white/75 hover:text-white disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-white/15" />

          <button
            type="button"
            onClick={() => setManualZoom((z) => (z === null ? 100 : null))}
            className={`min-h-[34px] text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
              manualZoom === null
                ? 'bg-[#4B4DED] text-white'
                : 'text-white/80 hover:text-white'
            }`}
            title={manualZoom === null ? 'Switch to 100% Zoom' : 'Auto-fit to width'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fit</span>
          </button>

          <div className="w-px h-4 bg-white/15" />

          <button
            type="button"
            onClick={handlePrintSharedCv}
            className="min-h-[38px] min-w-[34px] flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
            title="Print / Save Vector PDF"
            aria-label="Print CV"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default function SharedCvPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE] text-slate-500 text-sm">
          Loading shared CV preview...
        </div>
      }
    >
      <SharedCvWorkspace />
    </Suspense>
  );
}
