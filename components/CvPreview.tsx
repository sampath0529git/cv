'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  CV,
  FontScale,
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
  A4_WIDTH_MM,
  A4_HEIGHT_MM,
  A4_ASPECT_RATIO,
} from '@/types/cv';
import { getTemplateById } from '@/templates/registry';
import { useCvStore } from '@/store/useCvStore';
import { cvStoreToCv, cvToCvStore } from '@/lib/cvAdapter';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { paginateCv } from '@/lib/cvPagination';
import {
  Download,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer,
  Loader2,
  Check,
  LayoutGrid,
} from 'lucide-react';
import CvSkeleton from '@/components/CvSkeleton';
import { downloadCvPdf, collectDocumentCssText } from '@/lib/pdfGenerator';
import TemplateModal from '@/components/builder/TemplateModal';

export { A4_WIDTH_PX, A4_HEIGHT_PX, A4_WIDTH_MM, A4_HEIGHT_MM, A4_ASPECT_RATIO };

export const FONT_MAP: Record<string, { label: string; cssFont: string; category: string }> = {
  jakarta: {
    label: 'Plus Jakarta Sans',
    cssFont: '"Plus Jakarta Sans", var(--font-jakarta), ui-sans-serif, system-ui, sans-serif',
    category: 'Geometric Sans',
  },
  inter: {
    label: 'Inter',
    cssFont: '"Inter", var(--font-inter), ui-sans-serif, system-ui, sans-serif',
    category: 'Modern Sans',
  },
  merriweather: {
    label: 'Merriweather',
    cssFont: '"Merriweather", var(--font-merriweather), Georgia, serif',
    category: 'Classic Serif',
  },
  lora: {
    label: 'Lora',
    cssFont: '"Lora", var(--font-lora), Georgia, serif',
    category: 'Editorial Serif',
  },
  roboto: {
    label: 'Roboto',
    cssFont: '"Roboto", var(--font-roboto), ui-sans-serif, system-ui, sans-serif',
    category: 'Clean Sans',
  },
  mono: {
    label: 'JetBrains Mono',
    cssFont: '"JetBrains Mono", var(--font-mono), monospace',
    category: 'Technical',
  },
};

export const FONT_SCALE_STYLES: Record<FontScale, { baseSize: string; lineHeight: string }> = {
  sm: { baseSize: '9.5px', lineHeight: '1.42' },
  md: { baseSize: '10.5px', lineHeight: '1.5' },
  lg: { baseSize: '11.5px', lineHeight: '1.55' },
};

interface CvPreviewProps {
  cv?: CV;
  className?: string;
  showControlsBar?: boolean;
  onResetToSample?: () => void;
  scale?: number;
  isLoading?: boolean;
  isPrimary?: boolean;
  onPagesChange?: (totalPages: number) => void;
}

export default function CvPreview({
  cv: customCv,
  className = '',
  showControlsBar = true,
  onResetToSample,
  scale: customScale,
  isLoading = false,
  isPrimary = true,
  onPagesChange,
}: CvPreviewProps) {
  // Explicit Zustand slice subscriptions guarantee immediate re-render on every field or array update
  const contact = useCvStore((s) => s.contact);
  const summary = useCvStore((s) => s.summary);
  const experiences = useCvStore((s) => s.experiences);
  const educations = useCvStore((s) => s.educations);
  const skills = useCvStore((s) => s.skills);
  const languagesList = useCvStore((s) => s.languagesList);
  const interestsList = useCvStore((s) => s.interestsList);
  const certificationsList = useCvStore((s) => s.certificationsList);
  const projectsList = useCvStore((s) => s.projectsList);
  const awardsList = useCvStore((s) => s.awardsList);
  const referencesText = useCvStore((s) => s.referencesText);
  const includeReferences = useCvStore((s) => s.includeReferences);
  const customSections = useCvStore((s) => s.customSections);
  const activeTemplate = useCvStore((s) => s.activeTemplate);
  const themeColor = useCvStore((s) => s.themeColor);
  const fontFamily = useCvStore((s) => s.fontFamily);
  const fontScale = useCvStore((s) => s.fontScale);
  const showPhoto = useCvStore((s) => s.showPhoto);
  const sectionOrder = useCvStore((s) => s.sectionOrder);
  const customPdfFileName = useCvStore((s) => s.customPdfFileName);
  const loadParsedCvData = useCvStore((s) => s.loadParsedCvData);

  const nativePrintRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onPagesChangeRef = useRef(onPagesChange);

  useEffect(() => {
    onPagesChangeRef.current = onPagesChange;
  }, [onPagesChange]);

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [autoScale, setAutoScale] = useState<number>(0.68);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [exportProgressText, setExportProgressText] = useState<string>('');
  const [isDownloadSuccess, setIsDownloadSuccess] = useState<boolean>(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);

  // Compute resolved CV object directly from reactive store slices
  const activeCv: CV = React.useMemo(() => {
    if (customCv) return customCv;
    return cvStoreToCv({
      contact,
      summary,
      experiences,
      educations,
      skills,
      languagesList,
      interestsList,
      certificationsList,
      projectsList,
      awardsList,
      referencesText,
      includeReferences,
      customSections,
      activeTemplate,
      themeColor,
      fontFamily,
      fontScale,
      showPhoto,
      sectionOrder,
    });
  }, [
    customCv,
    contact,
    summary,
    experiences,
    educations,
    skills,
    languagesList,
    interestsList,
    certificationsList,
    projectsList,
    awardsList,
    referencesText,
    includeReferences,
    customSections,
    activeTemplate,
    themeColor,
    fontFamily,
    fontScale,
    showPhoto,
    sectionOrder,
  ]);

  // Listen for external applet-cv-updating events
  useEffect(() => {
    const handleUpdateEvent = (e: any) => {
      setIsUpdating(Boolean(e.detail?.isUpdating ?? false));
    };
    window.addEventListener('applet-cv-updating', handleUpdateEvent);
    return () => window.removeEventListener('applet-cv-updating', handleUpdateEvent);
  }, []);

  // Responsive scaling to fit viewport container while strictly maintaining A4 proportions (210mm × 297mm)
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      if (containerWidth > 0) {
        const padding = containerWidth < 480 ? 12 : 20;
        const available = Math.max(200, containerWidth - padding);
        const calculated = Math.min(1.0, Math.max(0.28, available / A4_WIDTH_PX));
        setAutoScale(calculated);
      }
    };

    handleResize();
    const observer = new ResizeObserver(() => {
      handleResize();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const templateDef = getTemplateById(activeCv.settings.templateId);
  const TemplateComponent = templateDef.component;
  const isTwoColumn =
    activeCv.settings.templateId === 'toronto' ||
    activeCv.settings.templateId === 'manchester' ||
    activeCv.settings.templateId === 'glasgow' ||
    activeCv.settings.templateId === 'shoreditch' ||
    activeCv.settings.templateId === 'leeds' ||
    activeCv.settings.templateId === 'birmingham';

  // Compute paginated A4 pages reactively whenever activeCv changes
  const pages = React.useMemo(() => {
    return paginateCv(activeCv, isTwoColumn);
  }, [activeCv, isTwoColumn]);

  const totalPagesCount = pages.length;
  useEffect(() => {
    onPagesChangeRef.current?.(totalPagesCount);
  }, [totalPagesCount]);

  // Format document title for PDF export
  const defaultSanitized = (activeCv.personal.fullName || 'Curriculum_Vitae')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  const customName = customPdfFileName?.trim();
  const baseTitle = customName
    ? customName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9_\-\s]/g, '_').trim()
    : `${defaultSanitized}-CV`;
  const pdfFileName = `${baseTitle}.pdf`;

  const notifyExportComplete = useCallback((ok: boolean) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('applet-print-cv-complete', { detail: { ok } }));
    }
  }, []);

  const runCanvasFallbackPdf = useCallback(async () => {
    setExportProgressText('Generating PDF...');
    try {
      const ok = await downloadCvPdf({
        fileName: pdfFileName,
        onProgress: (msg) => setExportProgressText(msg),
      });
      if (ok) {
        setIsDownloadSuccess(true);
        setTimeout(() => setIsDownloadSuccess(false), 4000);
      }
      notifyExportComplete(ok);
    } catch (err) {
      console.error('Fallback PDF export error:', err);
      notifyExportComplete(false);
    } finally {
      setIsExportingPdf(false);
      setExportProgressText('');
    }
  }, [pdfFileName, notifyExportComplete]);

  // react-to-print hook targeting dedicated 1:1 unscaled A4 sheets via Browser Native Print / PDF engine
  const handlePrint = useReactToPrint({
    contentRef: nativePrintRef,
    documentTitle: baseTitle,
    onBeforePrint: async () => {
      setIsExportingPdf(true);
      setIsDownloadSuccess(false);
      setExportProgressText('Preparing A4 PDF...');

      // Ensure Google Fonts and images are completely loaded before cloning into print iframe
      if (typeof document !== 'undefined' && document.fonts?.ready) {
        await Promise.race([
          document.fonts.ready.catch(() => {}),
          new Promise<void>((r) => setTimeout(r, 500)),
        ]);
      }

      if (nativePrintRef.current) {
        // Inject active Tailwind v4 CSS rules synchronously inside the print root so about:blank print iframe never misses styles
        try {
          const compiledCss = await collectDocumentCssText(true);
          if (compiledCss.length > 0) {
            let inlineStyle = nativePrintRef.current.querySelector<HTMLStyleElement>(
              'style[data-cv-native-print-css="true"]'
            );
            if (!inlineStyle) {
              inlineStyle = document.createElement('style');
              inlineStyle.setAttribute('data-cv-native-print-css', 'true');
              nativePrintRef.current.insertBefore(inlineStyle, nativePrintRef.current.firstChild);
            }
            inlineStyle.textContent = compiledCss;
          }
        } catch {
          // Ignore stylesheet serialization warnings
        }

        const imgs = Array.from(nativePrintRef.current.querySelectorAll('img'));
        await Promise.all(
          imgs.map(async (img) => {
            if (!img.complete) {
              await new Promise<void>((resolve) => {
                const timeout = setTimeout(resolve, 1500);
                img.onload = () => {
                  clearTimeout(timeout);
                  resolve();
                };
                img.onerror = () => {
                  clearTimeout(timeout);
                  resolve();
                };
              });
            }
            if (typeof img.decode === 'function') {
              await Promise.race([
                img.decode().catch(() => {}),
                new Promise<void>((r) => setTimeout(r, 300)),
              ]);
            }
          })
        );
      }
    },
    onAfterPrint: () => {
      if (nativePrintRef.current) {
        nativePrintRef.current
          .querySelectorAll('style[data-cv-native-print-css="true"]')
          .forEach((el) => el.remove());
      }
      setIsExportingPdf(false);
      setExportProgressText('');
      setIsDownloadSuccess(true);
      setTimeout(() => setIsDownloadSuccess(false), 3500);
      notifyExportComplete(true);
    },
    onPrintError: (_errorLocation, error) => {
      if (nativePrintRef.current) {
        nativePrintRef.current
          .querySelectorAll('style[data-cv-native-print-css="true"]')
          .forEach((el) => el.remove());
      }
      console.warn('Native browser print unavailable, falling back to direct A4 PDF export:', error);
      void runCanvasFallbackPdf();
    },
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 0mm;
      }
      @media print {
        *, *::before, *::after {
          box-sizing: border-box !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          width: 210mm !important;
          height: auto !important;
          visibility: visible !important;
        }
        body * {
          visibility: visible !important;
        }
        #cv-print-area,
        .cv-native-print-root {
          position: relative !important;
          display: block !important;
          gap: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 210mm !important;
          transform: none !important;
          background: #ffffff !important;
        }
        .cv-print-sheet {
          position: relative !important;
          display: flex !important;
          flex-direction: column !important;
          width: 210mm !important;
          height: 296.8mm !important;
          min-width: 210mm !important;
          max-width: 210mm !important;
          min-height: 296.8mm !important;
          max-height: 296.8mm !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          transform: none !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
          background-color: #ffffff !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          page-break-after: always !important;
          break-after: page !important;
        }
        .cv-print-sheet:last-child {
          page-break-after: auto !important;
          break-after: auto !important;
        }
        .cv-print-sheet > div {
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
          height: 100% !important;
          min-height: 100% !important;
          max-height: 100% !important;
        }
        .cv-print-sheet section,
        .cv-print-sheet article,
        .cv-print-sheet header,
        .cv-print-sheet footer,
        .cv-print-sheet li,
        .cv-print-sheet p,
        .cv-section,
        .cv-item,
        .cv-entry,
        .break-inside-avoid,
        [data-section] {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        .cv-print-sheet h1,
        .cv-print-sheet h2,
        .cv-print-sheet h3,
        .cv-print-sheet h4,
        .cv-section-title,
        .break-after-avoid {
          break-after: avoid !important;
          page-break-after: avoid !important;
        }
        .page-badge-indicator,
        .no-print,
        button,
        nav,
        input,
        textarea,
        select,
        aside.builder-ui,
        [role="tooltip"] {
          display: none !important;
        }
      }
    `,
  });

  const handleDirectDownloadPdf = useCallback(
    async (overrideFileName?: string) => {
      if (isExportingPdf) return;
      setIsExportingPdf(true);
      setIsDownloadSuccess(false);
      setExportProgressText('Preparing A4 PDF...');
      try {
        const targetName =
          typeof overrideFileName === 'string' && overrideFileName.trim()
            ? overrideFileName.trim()
            : pdfFileName;
        const ok = await downloadCvPdf({
          fileName: targetName,
          onProgress: (msg) => setExportProgressText(msg),
        });
        if (ok) {
          setIsDownloadSuccess(true);
          setTimeout(() => setIsDownloadSuccess(false), 4000);
        }
        notifyExportComplete(ok);
      } catch (err) {
        console.error('Direct PDF export error:', err);
        notifyExportComplete(false);
      } finally {
        setIsExportingPdf(false);
        setExportProgressText('');
      }
    },
    [isExportingPdf, pdfFileName, notifyExportComplete]
  );

  const handleTriggerNativePrint = useCallback(() => {
    if (isExportingPdf) return;
    let isEmbeddedIframe = false;
    try {
      isEmbeddedIframe = window.self !== window.top;
    } catch {
      isEmbeddedIframe = true;
    }
    if (isEmbeddedIframe || !nativePrintRef.current) {
      void handleDirectDownloadPdf();
    } else {
      handlePrint();
    }
  }, [isExportingPdf, handlePrint, handleDirectDownloadPdf]);

  // Listen for global custom print/download events on primary preview instance only
  useEffect(() => {
    if (!isPrimary) return;
    const handleGlobalPrint = (e: any) => {
      const requestedFile = typeof e?.detail?.fileName === 'string' ? e.detail.fileName : undefined;
      if (e?.detail?.mode === 'print') {
        handleTriggerNativePrint();
      } else {
        void handleDirectDownloadPdf(requestedFile);
      }
    };
    window.addEventListener('applet-print-cv', handleGlobalPrint);
    return () => window.removeEventListener('applet-print-cv', handleGlobalPrint);
  }, [isPrimary, handleTriggerNativePrint, handleDirectDownloadPdf]);

  const handleResetToSample = () => {
    if (onResetToSample) {
      onResetToSample();
    } else {
      const storeUpdates = cvToCvStore(SAMPLE_UK_CV);
      loadParsedCvData(storeUpdates as any);
    }
  };

  const fontConfig = FONT_MAP[activeCv.settings.fontFamily] || FONT_MAP.jakarta;
  const scaleConfig = FONT_SCALE_STYLES[activeCv.settings.fontScale] || FONT_SCALE_STYLES.md;
  const effectiveScale = customScale ?? autoScale * zoomLevel;

  return (
    <div ref={containerRef} className={`w-full flex flex-col items-center select-text ${className}`}>
      {/* Top Action / Zoom Bar (if enabled) */}
      {showControlsBar && (
        <div className="w-full flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-white rounded-xl mb-3 text-xs text-slate-700 border border-[#E8EAF5] shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setIsTemplateModalOpen(true)}
              className="min-h-[38px] px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-[#EEF1FF]/50 text-[#0F1B4D] font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer hover:border-[#4B4DED]"
              title="Change template & design options"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
              <span className="truncate max-w-[115px] sm:max-w-[170px] whitespace-nowrap">
                {templateDef.name}
              </span>
            </button>
            <span className="text-slate-300 hidden md:inline">·</span>
            <span className="text-[11px] text-slate-500 hidden md:inline tabular-nums whitespace-nowrap">
              A4 · {pages.length} {pages.length === 1 ? 'Page' : 'Pages'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            <div className="hidden xs:flex sm:flex items-center gap-0.5 bg-slate-50 rounded-lg border border-slate-200 px-1 py-0.5">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.1))}
                aria-label="Zoom out"
                className="min-h-[32px] min-w-[30px] flex items-center justify-center hover:bg-white rounded text-slate-600 transition-colors cursor-pointer"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-700 min-w-[38px] text-center tabular-nums">
                {Math.round(effectiveScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                aria-label="Zoom in"
                className="min-h-[32px] min-w-[30px] flex items-center justify-center hover:bg-white rounded text-slate-600 transition-colors cursor-pointer"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                aria-label="Reset zoom"
                className="min-h-[32px] min-w-[30px] flex items-center justify-center hover:bg-white rounded text-slate-600 transition-colors cursor-pointer"
                title="Fit to width"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetToSample}
              className="min-h-[38px] px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              title="Load sample UK CV"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Sample CV</span>
            </button>

            <button
              type="button"
              onClick={() => void handleDirectDownloadPdf()}
              disabled={isExportingPdf}
              className={`min-h-[38px] px-3 py-1.5 text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-60 whitespace-nowrap ${
                isDownloadSuccess
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-[#4B4DED] hover:bg-[#3D3FC9]'
              }`}
              title={`Download ${pdfFileName}`}
            >
              {isExportingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="max-w-[100px] truncate">
                    {exportProgressText || 'Exporting...'}
                  </span>
                </>
              ) : isDownloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                  <span className="hidden sm:inline">Download</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleTriggerNativePrint}
              className="min-h-[38px] min-w-[38px] hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
              title="Print / Save Vector A4 PDF"
              aria-label="Browser Print"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* A4 Multi-Page On-Screen Viewport (Exact Visual Design Preserved) */}
      <div className="w-full flex justify-center">
        <div
          data-cv-preview-primary={isPrimary ? 'true' : undefined}
          className="flex flex-col items-center gap-6"
        >
          {(isLoading && pages.length === 0 ? [{}] : pages).map((pageData, pageIdx) => (
            <React.Fragment key={pageIdx}>
              {/* Clean Typographic Multi-Page Label (Hidden in Print) */}
              {!isLoading && pages.length > 1 && (
                <div
                  style={{ width: `${Math.round(A4_WIDTH_PX * effectiveScale)}px` }}
                  className="page-badge-indicator flex items-center justify-between px-0.5 text-[11px] font-medium text-slate-500 select-none -mb-3.5 tabular-nums"
                >
                  <span>
                    Page {pageIdx + 1} of {pages.length}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">
                    {A4_WIDTH_MM} × {A4_HEIGHT_MM} mm
                  </span>
                </div>
              )}

              {/* Scaled Wrapper strictly matching A4 proportions without outer overflow */}
              <div
                id={isPrimary ? `cv-preview-page-${pageIdx + 1}` : undefined}
                className="cv-page-wrapper relative shrink-0"
                style={{
                  width: `${Math.round(A4_WIDTH_PX * effectiveScale)}px`,
                  height: `${Math.round(A4_HEIGHT_PX * effectiveScale)}px`,
                  aspectRatio: `${A4_WIDTH_MM} / ${A4_HEIGHT_MM}`,
                }}
              >
                {/* Printable A4 Container: 210mm × 297mm (794px × 1123px at 96 DPI) */}
                <div
                  data-font-scale={activeCv.settings.fontScale || 'md'}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${A4_WIDTH_PX}px`,
                    height: `${A4_HEIGHT_PX}px`,
                    minWidth: `${A4_WIDTH_PX}px`,
                    maxWidth: `${A4_WIDTH_PX}px`,
                    minHeight: `${A4_HEIGHT_PX}px`,
                    maxHeight: `${A4_HEIGHT_PX}px`,
                    aspectRatio: `${A4_WIDTH_MM} / ${A4_HEIGHT_MM}`,
                    transform: `scale(${effectiveScale})`,
                    transformOrigin: 'top left',
                    fontFamily: fontConfig.cssFont,
                    fontSize: scaleConfig.baseSize,
                    lineHeight: scaleConfig.lineHeight,
                    ['--accent' as any]: activeCv.settings.accentColor || '#4B4DED',
                  }}
                  className="cv-page bg-white text-slate-900 shadow-[0_14px_38px_rgba(15,27,77,0.10)] border border-slate-200/90 rounded-[3px] flex flex-col overflow-hidden select-text box-border relative"
                >
                  {isLoading || isUpdating ? (
                    <CvSkeleton />
                  ) : (
                    <TemplateComponent
                      cv={activeCv}
                      pageData={pageData}
                      pageIndex={pageIdx}
                      totalPages={pages.length}
                    />
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Dedicated 1:1 Unscaled A4 Print Target for react-to-print & Browser Native Print Engine */}
      {isPrimary && !isLoading && (
        <div
          id="cv-native-print-host"
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: '-10000px',
            top: 0,
            width: '210mm',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        >
          <div
            id="cv-print-area"
            data-cv-print-root="true"
            ref={nativePrintRef}
            className="cv-native-print-root bg-white"
            style={{
              width: '210mm',
              margin: 0,
              padding: 0,
            }}
          >
            {pages.map((pageData, pageIdx) => (
              <div
                key={`native-print-page-${pageIdx}`}
                data-font-scale={activeCv.settings.fontScale || 'md'}
                className="cv-print-sheet bg-white text-slate-900 flex flex-col overflow-hidden box-border relative"
                style={{
                  width: '210mm',
                  height: '296.8mm',
                  minWidth: '210mm',
                  maxWidth: '210mm',
                  minHeight: '296.8mm',
                  maxHeight: '296.8mm',
                  margin: 0,
                  padding: 0,
                  boxSizing: 'border-box',
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid',
                  pageBreakAfter: pageIdx < pages.length - 1 ? 'always' : 'auto',
                  breakAfter: pageIdx < pages.length - 1 ? 'page' : 'auto',
                  fontFamily: fontConfig.cssFont,
                  fontSize: scaleConfig.baseSize,
                  lineHeight: scaleConfig.lineHeight,
                  ['--accent' as any]: activeCv.settings.accentColor || '#4B4DED',
                }}
              >
                <TemplateComponent
                  cv={activeCv}
                  pageData={pageData}
                  pageIndex={pageIdx}
                  totalPages={pages.length}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visual Template Modal */}
      {isTemplateModalOpen && (
        <TemplateModal
          isOpen={isTemplateModalOpen}
          onClose={() => setIsTemplateModalOpen(false)}
        />
      )}
    </div>
  );
}
