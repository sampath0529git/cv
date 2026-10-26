'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TemplateDefinition, A4_WIDTH_PX, A4_HEIGHT_PX, CV } from '@/types/cv';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import {
  X,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
  ShieldCheck,
  Camera,
  FileText,
  Sparkles,
} from 'lucide-react';

interface TemplatePreviewModalProps {
  template: TemplateDefinition | null;
  onClose: () => void;
  onUseTemplate: (templateId: string) => void;
  customCv?: CV;
  accentColor?: string;
}

export default function TemplatePreviewModal({
  template,
  onClose,
  onUseTemplate,
  customCv,
  accentColor,
}: TemplatePreviewModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [manualScale, setManualScale] = useState<number | null>(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (!template) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [template]);

  // Measure container width for responsive auto-fit
  const updateContainerWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (!template) return;
    updateContainerWidth();

    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      updateContainerWidth();
    });
    observer.observe(el);

    window.addEventListener('resize', updateContainerWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, [template, updateContainerWidth]);

  // Close on Escape
  useEffect(() => {
    if (!template) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [template, onClose]);

  if (!template) return null;

  // Calculate crisp auto-fit scale based on measured container dimensions
  const isMobile = containerWidth < 640;
  // Container horizontal padding: 16px on mobile, 32px on desktop
  const padding = isMobile ? 16 : 36;
  const availableWidth = Math.max(220, (containerWidth || (typeof window !== 'undefined' ? window.innerWidth - 32 : 360)) - padding);
  const autoFitScale = Math.min(1.0, Math.max(0.25, availableWidth / A4_WIDTH_PX));

  const effectiveScale = manualScale !== null ? manualScale : autoFitScale;
  const displayedZoomPercent = Math.round(effectiveScale * 100);

  const scaledWidth = Math.round(A4_WIDTH_PX * effectiveScale);
  const scaledHeight = Math.round(A4_HEIGHT_PX * effectiveScale);

  const Component = template.component;
  const resolvedAccent = accentColor || SAMPLE_UK_CV.settings.accentColor;

  const cvData: CV = {
    ...(customCv || SAMPLE_UK_CV),
    settings: {
      ...(customCv?.settings || SAMPLE_UK_CV.settings),
      templateId: template.id,
      accentColor: resolvedAccent,
      showPhoto: template.supportsPhoto,
    },
  };

  const handleZoomIn = () => {
    setManualScale((curr) => {
      const base = curr ?? autoFitScale;
      return Math.min(1.3, Number((base + 0.1).toFixed(2)));
    });
  };

  const handleZoomOut = () => {
    setManualScale((curr) => {
      const base = curr ?? autoFitScale;
      return Math.max(0.3, Number((base - 0.1).toFixed(2)));
    });
  };

  const handleResetFit = () => {
    setManualScale(null);
  };

  const handleSetActualSize = () => {
    setManualScale(1.0);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${template.name} CV Template Preview`}
      className="fixed inset-0 z-50 bg-[#070D1F]/80 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <header
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-[#0F1B4D] border-b border-white/10 text-white px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0 shadow-lg z-20"
      >
        {/* Template Information */}
        <div className="flex items-center justify-between sm:justify-start gap-2.5 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 whitespace-nowrap">
                {template.category}
              </span>
              {template.supportsPhoto ? (
                <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
                  <Camera className="w-2.5 h-2.5" /> Photo
                </span>
              ) : (
                <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-500/20 text-slate-300 border border-slate-400/20">
                  <FileText className="w-2.5 h-2.5" /> Text-Focused
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-xl font-bold tracking-tight text-white truncate mt-0.5">
              {template.name}
            </h2>
          </div>

          {/* Mobile Direct Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="sm:hidden min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
            aria-label="Close template preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center / Action Toolbar: Zoom Controls & CTA */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          {/* Zoom Cluster */}
          <div className="flex items-center bg-white/10 rounded-xl border border-white/10 p-0.5">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={effectiveScale <= 0.3}
              className="min-h-[30px] min-w-[30px] flex items-center justify-center rounded-lg text-slate-200 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] font-mono font-semibold text-slate-200 min-w-[38px] text-center tabular-nums">
              {displayedZoomPercent}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={effectiveScale >= 1.3}
              className="min-h-[30px] min-w-[30px] flex items-center justify-center rounded-lg text-slate-200 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={manualScale === null ? handleSetActualSize : handleResetFit}
              className={`min-h-[30px] px-2 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                manualScale === null
                  ? 'bg-[#4B4DED] text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/15'
              }`}
              title={manualScale === null ? 'View 100% actual size' : 'Fit to screen'}
            >
              {manualScale === null ? 'Fit' : '100%'}
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onUseTemplate(template.id)}
              className="min-h-[36px] sm:min-h-[38px] px-4 sm:px-5 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs sm:text-sm font-semibold shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Use Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="hidden sm:flex min-h-[38px] min-w-[38px] items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Viewport Stage */}
      <main
        ref={containerRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="flex-1 overflow-x-auto overflow-y-auto p-3 sm:p-6 flex justify-center items-start min-h-0 relative select-none"
      >
        {/* Scaled A4 Document Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
          }}
          className="relative bg-white shadow-2xl rounded-lg overflow-hidden border border-slate-300/80 transition-[width,height] duration-150 shrink-0 select-text"
        >
          {/* Printable A4 Container: 794px × 1123px */}
          <div
            style={{
              width: `${A4_WIDTH_PX}px`,
              height: `${A4_HEIGHT_PX}px`,
              transform: `scale(${effectiveScale})`,
              transformOrigin: 'top left',
            }}
            className="absolute top-0 left-0 bg-white"
          >
            <Component cv={cvData} />
          </div>
        </div>
      </main>

      {/* Footer Info Strip */}
      <footer
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0A1230] border-t border-white/10 text-slate-300 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shrink-0 z-20"
      >
        <div className="flex items-center gap-2 text-[11px] sm:text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-medium text-white">UK ATS Calibrated</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">ISO A4 (210 × 297 mm)</span>
          {template.bestFor && (
            <>
              <span className="hidden md:inline text-slate-500">·</span>
              <span className="hidden md:inline text-slate-400">
                <span className="font-semibold text-slate-300">Best for:</span> {template.bestFor}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400 ml-auto">
          <span className="hidden sm:inline">Pinch or use zoom controls to inspect typography</span>
          <button
            type="button"
            onClick={() => onUseTemplate(template.id)}
            className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer underline underline-offset-2"
          >
            Start with {template.name} &rarr;
          </button>
        </div>
      </footer>
    </div>
  );
}
