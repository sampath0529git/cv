'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useCvStore } from '@/store/useCvStore';
import {
  generateCvShareLink,
  GeneratedShareLink,
  SHARE_EXPIRY_OPTIONS,
  ShareExpiryPreset,
} from '@/lib/shareCodec';
import {
  X,
  Copy,
  Check,
  RefreshCw,
  Clock,
  Link2,
  Eye,
  Loader2,
  ShieldCheck,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatExpiryTimestamp(ms: number): string {
  try {
    return new Date(ms).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [preset, setPreset] = useState<ShareExpiryPreset>('7d');
  const [shareData, setShareData] = useState<GeneratedShareLink | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const regenerateLink = useCallback(async (selectedPreset: ShareExpiryPreset) => {
    setIsGenerating(true);
    setCopied(false);
    try {
      const stateSnapshot = useCvStore.getState();
      const generated = await generateCvShareLink(stateSnapshot, selectedPreset);
      setShareData(generated);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    const stateSnapshot = useCvStore.getState();
    void generateCvShareLink(stateSnapshot, '7d')
      .then((generated) => {
        if (!cancelled) {
          setShareData(generated);
          setIsGenerating(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsGenerating(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

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

  if (!isOpen) return null;

  const handleSelectPreset = (nextPreset: ShareExpiryPreset) => {
    setPreset(nextPreset);
    void regenerateLink(nextPreset);
  };

  const handleCopyLink = async () => {
    if (!shareData?.url) return;

    let didCopy = false;
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        didCopy = true;
      } catch {
        didCopy = false;
      }
    }

    if (!didCopy && urlInputRef.current) {
      try {
        urlInputRef.current.focus();
        urlInputRef.current.select();
        urlInputRef.current.setSelectionRange(0, shareData.url.length);
        didCopy = document.execCommand('copy');
      } catch {
        didCopy = false;
      }
    }

    if (didCopy) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } else if (urlInputRef.current) {
      urlInputRef.current.focus();
      urlInputRef.current.select();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F1B4D]/45 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-cv-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[520px] bg-white rounded-t-3xl sm:rounded-3xl border border-[#E8EAF5] shadow-[0_20px_60px_rgba(15,27,77,0.18)] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#EEF1FF] text-[#4B4DED] flex items-center justify-center shrink-0">
                <Link2 className="w-4 h-4" />
              </div>
              <h2
                id="share-cv-modal-title"
                className="text-base sm:text-lg font-bold text-[#0F1B4D] tracking-tight"
              >
                Share CV Preview
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Generate a unique, temporary read-only link encoding a snapshot of your current CV.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close share dialog"
            className="min-h-[36px] min-w-[36px] rounded-xl text-slate-400 hover:text-[#0F1B4D] hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Expiration Duration Selector */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="text-xs font-semibold text-[#0F1B4D] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#4B4DED]" />
                <span>Temporary link expiration</span>
              </label>
              {shareData && !isGenerating && (
                <span className="text-[11px] text-slate-500 tabular-nums">
                  Expires {formatExpiryTimestamp(shareData.expiresAt)}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-1.5 bg-[#F4F7FE] p-1 rounded-xl border border-[#E4E9FA]">
              {SHARE_EXPIRY_OPTIONS.map((opt) => {
                const active = preset === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectPreset(opt.id)}
                    className={`min-h-[36px] px-2 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap tabular-nums ${
                      active
                        ? 'bg-white text-[#4B4DED] shadow-xs border border-[#DCE3F7]'
                        : 'text-slate-600 hover:text-[#0F1B4D]'
                    }`}
                  >
                    <span className="sm:hidden">{opt.shortLabel}</span>
                    <span className="hidden sm:inline">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generated Public Preview URL + Copy Action */}
          <div>
            <label
              htmlFor="cv-share-url-input"
              className="block text-xs font-semibold text-[#0F1B4D] mb-1.5"
            >
              Public preview link
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1 min-w-0">
                <input
                  ref={urlInputRef}
                  id="cv-share-url-input"
                  type="text"
                  readOnly
                  value={isGenerating ? 'Encoding CV snapshot...' : shareData?.url || ''}
                  onFocus={(e) => e.currentTarget.select()}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-xl border border-slate-200 bg-[#FAFBFD] text-xs font-mono text-slate-700 focus:outline-hidden focus:border-[#4B4DED] truncate"
                />
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                disabled={isGenerating || !shareData?.url}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-60 whitespace-nowrap shrink-0 ${
                  copied
                    ? 'bg-[#16A34A] hover:bg-[#15803D]'
                    : 'bg-[#4B4DED] hover:bg-[#3D3FC9] shadow-[0_4px_12px_rgba(75,77,237,0.22)]'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    <span>Encoding...</span>
                  </>
                ) : copied ? (
                  <>
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Copied Link</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 shrink-0" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Unboxed Metadata Line (Zero-Pill Typography) */}
            {shareData && !isGenerating && (
              <p className="mt-2.5 text-[11px] text-slate-500 flex flex-wrap items-center gap-x-1.5 gap-y-1 tabular-nums">
                <span className="inline-flex items-center gap-1 text-[#0F1B4D] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  Read-only A4 preview
                </span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="font-mono text-slate-600">ID {shareData.shareId}</span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span>Self-contained URL snapshot</span>
              </p>
            )}

            {shareData?.photoStatus === 'compressed' && (
              <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">
                Profile photo was automatically optimised for compact URL sharing.
              </p>
            )}
            {shareData?.photoStatus === 'omitted' && (
              <p className="mt-1.5 text-[11px] text-amber-700 leading-relaxed">
                Your high-resolution photo exceeded URL size limits and was omitted from the link.
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#F8F9FE] border-t border-slate-100 flex items-center justify-between gap-3 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => void regenerateLink(preset)}
            disabled={isGenerating}
            className="min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0F1B4D] hover:bg-white border border-transparent hover:border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#4B4DED] ${isGenerating ? 'animate-spin' : ''}`} />
            <span>New unique link</span>
          </button>

          {shareData && !isGenerating && (
            <Link
              href={shareData.relativePath}
              onClick={onClose}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#EEF1FF]/70 border border-[#DCE3F7] text-[#0F1B4D] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Eye className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
              <span>Open shared preview</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
