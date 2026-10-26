'use client';

import React, { useState } from 'react';
import { Download, Check, Loader2 } from 'lucide-react';
import { downloadCvPdf, PdfProgressInfo } from '@/lib/pdfGenerator';
import { CV } from '@/types/cv';

export interface PdfDownloadButtonProps {
  fileName?: string | (() => string);
  cv?: CV;
  className?: string;
  variant?: 'header' | 'hero' | 'mobile' | 'compact';
  label?: string;
  showIcon?: boolean;
  id?: string;
  title?: string;
  onBeforeDownload?: () => void;
  onSuccess?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function PdfDownloadButton({
  fileName = 'Curriculum_Vitae.pdf',
  cv,
  className = '',
  variant = 'header',
  label = 'Download PDF',
  showIcon = true,
  id,
  title,
  onBeforeDownload,
  onSuccess,
  onMouseEnter,
  onMouseLeave,
}: PdfDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadDone, setDownloadDone] = useState<boolean>(false);
  const [progressStage, setProgressStage] = useState<string>('Rendering layout');
  const [progressPercent, setProgressPercent] = useState<number>(15);

  const handleDownload = async () => {
    if (isDownloading) return;
    onBeforeDownload?.();
    setIsDownloading(true);
    setDownloadDone(false);
    setProgressStage('Rendering layout');
    setProgressPercent(15);

    const resolvedName = typeof fileName === 'function' ? fileName() : fileName;

    try {
      const ok = await downloadCvPdf({
        fileName: resolvedName,
        cv,
        onProgress: (status: PdfProgressInfo | string, percent?: number) => {
          if (typeof status === 'string') {
            // Clean up stage name from message if needed
            const cleaned = status.replace(/\.\.\.$/, '');
            setProgressStage(cleaned);
            if (typeof percent === 'number') setProgressPercent(percent);
          } else if (status && typeof status === 'object') {
            setProgressStage(status.stage);
            setProgressPercent(status.percent);
          }
        },
      });

      if (ok) {
        setDownloadDone(true);
        onSuccess?.();
        setTimeout(() => setDownloadDone(false), 4500);
      }
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsDownloading(false);
      setProgressPercent(0);
    }
  };

  const variantStyles = {
    header:
      'min-h-[40px] sm:min-h-[42px] px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-[0_4px_14px_rgba(75,77,237,0.22)]',
    hero:
      'w-full sm:w-auto px-8 py-3.5 rounded-2xl text-base font-bold shadow-[0_6px_20px_rgba(75,77,237,0.4)]',
    mobile:
      'flex-1 min-h-[46px] px-4 py-2.5 rounded-xl text-sm font-semibold',
    compact:
      'min-h-[38px] px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xs',
  }[variant];

  const defaultTitle = isDownloading
    ? `${progressStage} (${progressPercent}%)`
    : downloadDone
    ? 'Downloaded'
    : label;

  return (
    <button
      id={id}
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden text-white transition-all cursor-pointer select-none active:scale-[0.98] disabled:cursor-wait whitespace-nowrap shrink-0 flex items-center justify-center gap-2 ${
        downloadDone
          ? 'bg-emerald-600 hover:bg-emerald-700'
          : 'bg-[#4B4DED] hover:bg-[#3D3FC9]'
      } ${variantStyles} ${className}`}
      title={title || defaultTitle}
      aria-label={label}
    >
      {/* Visual Progress Bar (Fill) */}
      {isDownloading && (
        <>
          <div
            className="absolute inset-0 bg-[#3537CB] transition-all duration-300 ease-out origin-left pointer-events-none"
            style={{ width: `${progressPercent}%` }}
          />
          {/* Bottom Accent Track */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/25 overflow-hidden pointer-events-none">
            <div
              className="h-full bg-white transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,255,255,0.85)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </>
      )}

      {/* Button Content */}
      <div className="relative z-10 flex items-center justify-center gap-2 max-w-full">
        {isDownloading ? (
          <>
            <Loader2
              className={`${
                variant === 'hero' ? 'w-5 h-5' : 'w-4 h-4'
              } animate-spin text-white shrink-0`}
            />
            <span className="truncate max-w-[140px] sm:max-w-[200px]">
              {progressStage}...
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-bold tabular-nums opacity-95 shrink-0 bg-white/20 px-1.5 py-0.5 rounded">
              {progressPercent}%
            </span>
          </>
        ) : downloadDone ? (
          <>
            <Check
              className={`${
                variant === 'hero' ? 'w-5 h-5' : 'w-4 h-4'
              } stroke-[2.5] text-white shrink-0`}
            />
            <span>Downloaded</span>
          </>
        ) : (
          <>
            {showIcon && (
              <Download
                className={`${
                  variant === 'hero' ? 'w-5 h-5' : 'w-4 h-4'
                } shrink-0`}
              />
            )}
            {variant === 'header' ? (
              <>
                <span className="sm:hidden">PDF</span>
                <span className="hidden sm:inline">{label}</span>
              </>
            ) : (
              <span>{label}</span>
            )}
          </>
        )}
      </div>
    </button>
  );
}
