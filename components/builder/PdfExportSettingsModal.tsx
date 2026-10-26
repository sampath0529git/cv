'use client';

import React, { useEffect, useMemo } from 'react';
import { useCvStore } from '@/store/useCvStore';
import {
  DEFAULT_PDF_EXPORT_SETTINGS,
  normalizePdfExportSettings,
} from '@/types/cv';
import PdfDownloadButton from '@/components/builder/PdfDownloadButton';
import {
  X,
  Sliders,
  Link2,
  Minimize2,
  RotateCcw,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export interface PdfExportSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName?: string | (() => string);
  onBeforeDownload?: () => void;
  totalPages?: number;
  lastExportedBytes?: number | null;
}

function formatByteSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function PdfExportSettingsModal({
  isOpen,
  onClose,
  fileName,
  onBeforeDownload,
  totalPages = 1,
  lastExportedBytes = null,
}: PdfExportSettingsModalProps) {
  const store = useCvStore();
  const settings = normalizePdfExportSettings(store.pdfExportSettings);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const detectedLinksCount = useMemo(() => {
    let count = 0;
    if (store.contact?.email?.trim()) count += 1;
    if (store.contact?.linkedin?.trim()) count += 1;
    if (store.contact?.website?.trim()) count += 1;
    for (const proj of store.projectsList || []) {
      if (proj.link?.trim()) count += 1;
    }
    return count;
  }, [
    store.contact?.email,
    store.contact?.linkedin,
    store.contact?.website,
    store.projectsList,
  ]);

  const hasActivePhoto = Boolean(store.showPhoto && store.contact?.photoUrl?.trim());
  const pageCount = Math.max(1, totalPages);

  const estimatedSizeLabel = useMemo(() => {
    const perPageKb = settings.compressImages ? 165 : 410;
    const photoKb = hasActivePhoto ? (settings.compressImages ? 28 : 95) : 0;
    const linksKb = settings.includeHyperlinks ? Math.max(2, detectedLinksCount * 2) : 0;
    const lowKb = Math.round((perPageKb * pageCount + photoKb + linksKb) * 0.85);
    const highKb = Math.round((perPageKb * pageCount + photoKb + linksKb) * 1.15);
    return `~${lowKb} KB – ${highKb} KB`;
  }, [settings.compressImages, settings.includeHyperlinks, hasActivePhoto, pageCount, detectedLinksCount]);

  if (!isOpen) return null;

  const isDefault =
    settings.includeHyperlinks === DEFAULT_PDF_EXPORT_SETTINGS.includeHyperlinks &&
    settings.compressImages === DEFAULT_PDF_EXPORT_SETTINGS.compressImages;

  const resolvedDefaultName = () => {
    if (typeof fileName === 'function') return fileName();
    if (fileName) return fileName;
    const custom = store.customPdfFileName?.trim();
    if (custom) {
      return `${custom.replace(/\.(pdf|docx)$/i, '')}.pdf`;
    }
    const base = [store.contact?.firstName, store.contact?.lastName]
      .filter(Boolean)
      .join('_')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '');
    return `${base || 'my'}_cv.pdf`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F1B4D]/45 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-export-settings-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[520px] bg-white rounded-t-3xl sm:rounded-3xl border border-[#E8EAF5] shadow-[0_20px_60px_rgba(15,27,77,0.18)] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#EEF1FF] text-[#4B4DED] flex items-center justify-center shrink-0">
                <Sliders className="w-4 h-4" />
              </div>
              <h2
                id="pdf-export-settings-title"
                className="text-base sm:text-lg font-bold text-[#0F1B4D] tracking-tight"
              >
                PDF Export Settings
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Manage interactive links and image compression to control final PDF file size.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close PDF Export Settings"
            className="min-h-[36px] min-w-[36px] rounded-xl text-slate-400 hover:text-[#0F1B4D] hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Estimated PDF File Size Summary Strip */}
          <div className="p-3.5 rounded-2xl bg-[#F8F9FE] border border-[#E4E9FA] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText className="w-4 h-4 text-[#4B4DED] shrink-0" />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#0F1B4D]">
                  Estimated PDF File Size
                </div>
                <div className="text-[11px] text-slate-500 tabular-nums">
                  {pageCount} {pageCount === 1 ? 'A4 page' : 'A4 pages'}
                  {hasActivePhoto ? ' · Profile photo included' : ' · Text & layout only'}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs sm:text-sm font-mono font-bold text-[#0F1B4D] tabular-nums">
                {estimatedSizeLabel}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium flex items-center justify-end gap-1 tabular-nums">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>
                  {lastExportedBytes
                    ? `Last saved: ${formatByteSize(lastExportedBytes)}`
                    : settings.compressImages
                    ? 'Compressed (~55% smaller)'
                    : 'Portal-ready (< 2 MB)'}
                </span>
              </div>
            </div>
          </div>

          {/* Toggle 1: Include Hyperlinks */}
          <div
            onClick={() =>
              store.setPdfExportSettings({
                includeHyperlinks: !settings.includeHyperlinks,
              })
            }
            className={`p-4 rounded-2xl border transition-colors duration-150 cursor-pointer flex items-start justify-between gap-4 ${
              settings.includeHyperlinks
                ? 'border-[#4B4DED]/40 bg-[#FAFBFD]'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  settings.includeHyperlinks
                    ? 'bg-[#EEF1FF] text-[#4B4DED]'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Link2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-[#0F1B4D]">
                  Include Hyperlinks
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Embed clickable email, LinkedIn, portfolio, and project links in the exported PDF. Turn off for a flattened document without link annotations.
                </p>
                <p className="text-[11px] text-slate-400 mt-1.5 tabular-nums">
                  {detectedLinksCount > 0
                    ? `${detectedLinksCount} ${
                        detectedLinksCount === 1 ? 'link' : 'links'
                      } detected in your CV`
                    : 'Applies to email, LinkedIn, website & project URLs'}
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={settings.includeHyperlinks}
              aria-label="Include Hyperlinks"
              onClick={(e) => {
                e.stopPropagation();
                store.setPdfExportSettings({
                  includeHyperlinks: !settings.includeHyperlinks,
                });
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DED]/40 cursor-pointer mt-0.5 ${
                settings.includeHyperlinks ? 'bg-[#4B4DED]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform duration-150 ${
                  settings.includeHyperlinks ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Compress Images */}
          <div
            onClick={() =>
              store.setPdfExportSettings({
                compressImages: !settings.compressImages,
              })
            }
            className={`p-4 rounded-2xl border transition-colors duration-150 cursor-pointer flex items-start justify-between gap-4 ${
              settings.compressImages
                ? 'border-[#4B4DED]/40 bg-[#FAFBFD]'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  settings.compressImages
                    ? 'bg-[#EEF1FF] text-[#4B4DED]'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Minimize2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-[#0F1B4D]">
                  Compress Images
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Downsample profile photos and optimise page encoding to cut PDF file size by ~55% for strict ATS upload limits (1 MB – 2 MB).
                </p>
                <p className="text-[11px] text-slate-400 mt-1.5 tabular-nums">
                  {settings.compressImages
                    ? 'Active: Optimised JPEG encoding (smaller file)'
                    : 'Off: Maximum 300 DPI studio print resolution'}
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={settings.compressImages}
              aria-label="Compress Images"
              onClick={(e) => {
                e.stopPropagation();
                store.setPdfExportSettings({
                  compressImages: !settings.compressImages,
                });
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DED]/40 cursor-pointer mt-0.5 ${
                settings.compressImages ? 'bg-[#4B4DED]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform duration-150 ${
                  settings.compressImages ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#F8F9FE] border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            disabled={isDefault}
            onClick={() => store.resetPdfExportSettings()}
            className="min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0F1B4D] hover:bg-white border border-transparent hover:border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#4B4DED]" />
            <span>Reset defaults</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[38px] px-4 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0F1B4D] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Done
            </button>
            <PdfDownloadButton
              fileName={resolvedDefaultName}
              onBeforeDownload={onBeforeDownload}
              variant="compact"
              label="Download PDF"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
