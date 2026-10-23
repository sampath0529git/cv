'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CV, FontScale } from '@/types/cv';
import { getTemplateById } from '@/templates/registry';
import { useCvStore } from '@/store/useCvStore';
import { cvStoreToCv, cvToCvStore } from '@/lib/cvAdapter';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { Download, RefreshCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

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
}

export default function CvPreview({
  cv: customCv,
  className = '',
  showControlsBar = true,
  onResetToSample,
  scale: customScale,
}: CvPreviewProps) {
  const store = useCvStore();
  const printRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [autoScale, setAutoScale] = useState<number>(0.65);
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

  // Responsive scaling to fit viewport container
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      if (containerWidth > 0) {
        // A4 pixel width at standard 96 DPI is 794px
        const padding = 32;
        const targetWidth = 794;
        const calculated = Math.min(1.05, Math.max(0.35, (containerWidth - padding) / targetWidth));
        setAutoScale(calculated);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format document title for PDF download
  const sanitizedName = (activeCv.personal.fullName || 'Curriculum_Vitae').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  const pdfFileName = `${sanitizedName}-CV.pdf`;

  // react-to-print hook
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: pdfFileName.replace('.pdf', ''),
  });

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

  const templateDef = getTemplateById(activeCv.settings.templateId);
  const TemplateComponent = templateDef.component;

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
            <span className="text-[11px] text-slate-600 truncate max-w-[140px] sm:max-w-none">
              A4 (210 × 297 mm)
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200 px-1.5 py-1">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
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

            {/* Download PDF button */}
            <button
              type="button"
              onClick={() => handlePrint()}
              className="px-3 py-1 bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
              title={`Download ${pdfFileName}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* A4 Document Viewport */}
      <div className="w-full flex justify-center overflow-x-auto py-2">
        <div
          style={{
            width: `${794 * effectiveScale}px`,
            minHeight: `${1123 * effectiveScale}px`,
            transition: 'width 0.15s ease-out, min-height 0.15s ease-out',
          }}
          className="relative flex justify-center origin-top"
        >
          {/* Printable A4 Container (794px x 1123px at 96 DPI ≈ 210mm x 297mm) */}
          <div
            id="cv-print-area"
            ref={printRef}
            style={{
              width: '794px',
              minHeight: '1123px',
              transform: `scale(${effectiveScale})`,
              transformOrigin: 'top left',
              fontFamily: fontConfig.cssFont,
              fontSize: scaleConfig.baseSize,
              lineHeight: scaleConfig.lineHeight,
              ['--accent' as any]: activeCv.settings.accentColor || '#1e3a8a',
            }}
            className="cv-sheet bg-white text-slate-900 shadow-xl border border-slate-200/90 rounded-sm relative flex flex-col transition-colors duration-150"
          >
            {/* The selected template pure component */}
            <TemplateComponent cv={activeCv} />
          </div>
        </div>
      </div>
    </div>
  );
}
