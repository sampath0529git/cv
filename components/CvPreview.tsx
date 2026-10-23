'use client';

import React, { useRef, useState, useEffect } from 'react';
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
import { Download, RefreshCw, ZoomIn, ZoomOut, Maximize2, Printer, Loader2 } from 'lucide-react';
import CvSkeleton from '@/components/CvSkeleton';
import { downloadCvPdf } from '@/lib/pdfGenerator';

export { A4_WIDTH_PX, A4_HEIGHT_PX, A4_WIDTH_MM, A4_HEIGHT_MM, A4_ASPECT_RATIO };

export const FONT_MAP: Record<string, { label: string; cssFont: string; category: string }> = {
  inter: { label: 'Inter', cssFont: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif', category: 'Modern Sans' },
  merriweather: { label: 'Merriweather', cssFont: 'var(--font-merriweather), Georgia, serif', category: 'Classic Serif' },
  roboto: { label: 'Roboto', cssFont: 'var(--font-roboto), ui-sans-serif, system-ui, sans-serif', category: 'Clean Sans' },
  lora: { label: 'Lora', cssFont: 'var(--font-lora), Georgia, serif', category: 'Editorial Serif' },
  jakarta: { label: 'Plus Jakarta', cssFont: 'var(--font-jakarta), ui-sans-serif, system-ui, sans-serif', category: 'Geometric Sans' },
  mono: { label: 'JetBrains Mono', cssFont: 'var(--font-mono), monospace', category: 'Technical' },
};

export const FONT_SCALE_STYLES: Record<FontScale, { baseSize: string; lineHeight: string }> = {
  sm: { baseSize: '9px', lineHeight: '1.4' },
  md: { baseSize: '10px', lineHeight: '1.5' },
  lg: { baseSize: '11px', lineHeight: '1.55' },
};

interface CvPreviewProps {
  cv?: CV;
  className?: string;
  showControlsBar?: boolean;
  onResetToSample?: () => void;
  scale?: number;
  isLoading?: boolean;
}

export default function CvPreview({
  cv: customCv,
  className = '',
  showControlsBar = true,
  onResetToSample,
  scale: customScale,
  isLoading = false,
}: CvPreviewProps) {
  const store = useCvStore();
  const printRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [autoScale, setAutoScale] = useState<number>(0.65);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [exportProgressText, setExportProgressText] = useState<string>('');
  const isFirstRender = useRef(true);
  const [storedSettings, setStoredSettings] = useState<Partial<CV['settings']> | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('uk_cv_settings_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Compute resolved CV object
  const activeCv: CV = React.useMemo(() => {
    if (customCv) return customCv;
    const fromStore = cvStoreToCv(store, storedSettings || undefined);
    return fromStore;
  }, [customCv, store, storedSettings]);

  // Save settings when changed
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('uk_cv_settings_v1', JSON.stringify(activeCv.settings));
    } catch {
      // Ignore localStorage errors
    }
  }, [activeCv.settings]);

  // Trigger subtle skeleton/shimmer update feedback when activeCv changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsUpdating(true);
    const timer = setTimeout(() => {
      setIsUpdating(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [activeCv]);

  // Listen for external applet-cv-updating events
  useEffect(() => {
    const handleUpdateEvent = (e: any) => {
      setIsUpdating(Boolean(e.detail?.isUpdating ?? true));
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
        // Enforce strict A4 proportion: scale to fit available container width
        const padding = containerWidth < 480 ? 16 : 24;
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
    activeCv.settings.templateId === 'manchester' ||
    activeCv.settings.templateId === 'glasgow' ||
    activeCv.settings.templateId === 'shoreditch' ||
    activeCv.settings.templateId === 'leeds' ||
    activeCv.settings.templateId === 'birmingham';

  // Compute paginated pages
  const pages = React.useMemo(() => {
    return paginateCv(activeCv, isTwoColumn);
  }, [activeCv, isTwoColumn]);

  // Format document title for PDF download
  const defaultSanitized = (activeCv.personal.fullName || 'Curriculum_Vitae').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  const customName = store.customPdfFileName?.trim();
  const baseTitle = customName
    ? customName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9_\-\s]/g, '_').trim()
    : `${defaultSanitized}-CV`;
  const pdfFileName = `${baseTitle}.pdf`;

  // react-to-print hook with strict A4 dimensions
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: baseTitle,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 0;
      }
      @media print {
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          width: 210mm !important;
          height: auto !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .cv-page-wrapper {
          position: static !important;
          width: 210mm !important;
          height: auto !important;
          min-width: 210mm !important;
          min-height: 297mm !important;
          max-width: 210mm !important;
          max-height: none !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
          page-break-after: always !important;
          break-after: page !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        .cv-page {
          position: static !important;
          width: 210mm !important;
          height: auto !important;
          min-width: 210mm !important;
          min-height: 297mm !important;
          max-width: 210mm !important;
          max-height: none !important;
          transform: none !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
          border: none !important;
          page-break-after: always !important;
          break-after: page !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          overflow: visible !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .cv-page:last-child,
        .cv-page-wrapper:last-child {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        .page-badge-indicator,
        .no-print {
          display: none !important;
        }
        .cv-page section,
        .cv-page header,
        .cv-section,
        .cv-item,
        .cv-page .grid,
        .cv-page li,
        .cv-page p,
        .break-inside-avoid {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        .cv-page h1,
        .cv-page h2,
        .cv-page h3,
        .break-after-avoid {
          break-after: avoid !important;
          page-break-after: avoid !important;
        }
      }
    `,
  });

  const handleDirectDownloadPdf = React.useCallback(async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    setExportProgressText('Preparing PDF...');
    try {
      await downloadCvPdf({
        fileName: pdfFileName,
        onProgress: (msg) => setExportProgressText(msg),
      });
    } catch (err) {
      console.error('Failed to download PDF:', err);
    } finally {
      setIsExportingPdf(false);
      setExportProgressText('');
    }
  }, [isExportingPdf, pdfFileName]);

  // Listen for global custom print/download events from buttons across the app
  useEffect(() => {
    const handleGlobalPrint = (e: any) => {
      if (e?.detail?.mode === 'print') {
        handlePrint();
      } else {
        handleDirectDownloadPdf();
      }
    };
    window.addEventListener('applet-print-cv', handleGlobalPrint);
    return () => window.removeEventListener('applet-print-cv', handleGlobalPrint);
  }, [handlePrint, handleDirectDownloadPdf]);

  const handleResetToSample = () => {
    if (onResetToSample) {
      onResetToSample();
    } else {
      const storeUpdates = cvToCvStore(SAMPLE_UK_CV);
      store.loadParsedCvData(storeUpdates as any);
      setStoredSettings(SAMPLE_UK_CV.settings);
      try {
        localStorage.setItem('uk_cv_settings_v1', JSON.stringify(SAMPLE_UK_CV.settings));
      } catch {
        // Ignore
      }
    }
  };

  const fontConfig = FONT_MAP[activeCv.settings.fontFamily] || FONT_MAP.inter;
  const scaleConfig = FONT_SCALE_STYLES[activeCv.settings.fontScale] || FONT_SCALE_STYLES.md;
  const effectiveScale = customScale || autoScale * zoomLevel;

  return (
    <div ref={containerRef} className={`w-full flex flex-col items-center select-text ${className}`}>
      {/* Top Action / Zoom Bar (if enabled) */}
      {showControlsBar && (
        <div className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-slate-100/80 rounded-xl mb-3 text-xs text-slate-700 border border-slate-200/80 backdrop-blur-xs">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-semibold text-slate-900 hidden sm:inline">
              {templateDef.name}
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            {isUpdating || isLoading ? (
              <span className="text-[11px] text-[#4B4DED] font-semibold flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B4DED] animate-ping" />
                Updating document...
              </span>
            ) : (
              <span className="text-[11px] text-slate-600 truncate max-w-[140px] sm:max-w-none">
                A4 (210 × 297 mm) • {pages.length} {pages.length === 1 ? 'Page' : 'Pages'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200 px-1.5 py-1">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.1))}
                aria-label="Zoom out"
                className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-700 min-w-[36px] text-center">
                {Math.round(effectiveScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                aria-label="Zoom in"
                className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                aria-label="Reset zoom"
                className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                title="Fit to screen"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>

            {/* Reset to sample data */}
            <button
              type="button"
              onClick={handleResetToSample}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset with UK sample marketing CV"
            >
              <RefreshCw className="w-3 h-3 text-slate-500" />
              <span className="hidden sm:inline">Reset Sample</span>
            </button>

            {/* Download PDF button (Direct High-Resolution Download) */}
            <button
              type="button"
              onClick={handleDirectDownloadPdf}
              disabled={isExportingPdf}
              className="px-3 py-1 bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
              title={`Download ${pdfFileName} (300 DPI High-Quality)`}
            >
              {isExportingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="max-w-[120px] truncate">{exportProgressText || 'Downloading...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Browser Print / Vector Print Button */}
            <button
              type="button"
              onClick={() => handlePrint()}
              className="p-1 hover:bg-slate-200/70 rounded-lg text-slate-600 transition-colors cursor-pointer hidden sm:flex items-center"
              title="Print via Browser (Ctrl+P)"
              aria-label="Browser Print"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* A4 Multi-Page Viewport */}
      <div className="w-full flex justify-center overflow-x-auto py-2">
        <div
          id="cv-print-area"
          ref={printRef}
          className="flex flex-col items-center gap-6"
        >
          {(isLoading && pages.length === 0 ? [{}] : pages).map((pageData, pageIdx) => (
            <React.Fragment key={pageIdx}>
              {/* Screen Page Badge Indicator (Hidden in Print) */}
              {!isLoading && pages.length > 1 && (
                <div
                  style={{ width: `${Math.round(A4_WIDTH_PX * effectiveScale)}px` }}
                  className="page-badge-indicator flex items-center justify-between px-1 text-[11px] font-semibold text-slate-500 select-none -mb-3"
                >
                  <span className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4B4DED]" />
                    Page {pageIdx + 1} of {pages.length}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">
                    {A4_WIDTH_MM} × {A4_HEIGHT_MM} mm
                  </span>
                </div>
              )}

              {/* Scaled Wrapper for exact responsive sizing strictly matching A4 proportions */}
              <div
                className="cv-page-wrapper relative shrink-0"
                style={{
                  width: `${Math.round(A4_WIDTH_PX * effectiveScale)}px`,
                  height: `${Math.round(A4_HEIGHT_PX * effectiveScale)}px`,
                  aspectRatio: `${A4_WIDTH_MM} / ${A4_HEIGHT_MM}`,
                  transition: 'width 0.15s ease-out, height 0.15s ease-out',
                }}
              >
                {/* Printable A4 Container: exactly 210mm × 297mm (794px × 1123px at 96 DPI) */}
                <div
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
                    ['--accent' as any]: activeCv.settings.accentColor || '#1e3a8a',
                  }}
                  className="cv-page bg-white text-slate-900 shadow-xl border border-slate-200/90 rounded-sm flex flex-col overflow-hidden transition-colors duration-150 select-text box-border relative"
                >
                  {isLoading ? (
                    <CvSkeleton />
                  ) : (
                    <>
                      <TemplateComponent
                        cv={activeCv}
                        pageData={pageData}
                        pageIndex={pageIdx}
                        totalPages={pages.length}
                      />
                      {/* Subtle non-print update indicator */}
                      {isUpdating && (
                        <div
                          aria-hidden="true"
                          className="no-print absolute inset-0 pointer-events-none z-30 bg-white/45 backdrop-blur-[0.5px] transition-opacity duration-200 flex items-start justify-end p-4"
                        >
                          <div className="bg-[#0e123a]/90 text-white text-[10px] font-sans font-medium px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-white/10 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                            <span>Updating...</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
