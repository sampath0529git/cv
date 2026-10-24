/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCvStore } from '@/store/useCvStore';
import {
  LinkedInImportPayload,
  mapLinkedInPayloadToCvStore,
} from '@/lib/linkedinImport';
import {
  X,
  Linkedin,
  Check,
  Loader2,
  Upload,
  FileText,
  AlertCircle,
  Copy,
  RefreshCw,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface LinkedInImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: () => void;
}

type EnrichMode = 'pdf' | 'text';

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

export default function LinkedInImportModal({
  isOpen,
  onClose,
  onImportSuccess,
}: LinkedInImportModalProps) {
  const language = useCvStore((s) => s.language);

  const [isLoadingConfig, setIsLoadingConfig] = useState<boolean>(true);
  const [oauthConfigured, setOauthConfigured] = useState<boolean>(false);
  const [prefetchedAuthUrl, setPrefetchedAuthUrl] = useState<string>('');
  const [redirectUri, setRedirectUri] = useState<string>('');
  const [copiedRedirect, setCopiedRedirect] = useState<boolean>(false);

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isParsingProfile, setIsParsingProfile] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [importedPayload, setImportedPayload] =
    useState<LinkedInImportPayload | null>(null);
  const [applyMode, setApplyMode] = useState<'replace' | 'merge'>('replace');

  const [enrichMode, setEnrichMode] = useState<EnrichMode>('pdf');
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState<string>('');
  const [isDraggingPdf, setIsDraggingPdf] = useState<boolean>(false);

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<Window | null>(null);
  const popupWatchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearPopupWatcher = useCallback(() => {
    if (popupWatchTimerRef.current) {
      clearInterval(popupWatchTimerRef.current);
      popupWatchTimerRef.current = null;
    }
  }, []);

  const refreshOAuthSetup = useCallback(async () => {
    if (typeof window === 'undefined') return;
    try {
      const origin = window.location.origin;
      const res = await fetch(
        `/api/auth/linkedin/url?origin=${encodeURIComponent(origin)}`,
        { cache: 'no-store' }
      );
      const data = (await res.json()) as {
        configured?: boolean;
        url?: string;
        redirectUri?: string;
      };
      setOauthConfigured(Boolean(data.configured));
      setPrefetchedAuthUrl(data.url || '');
      setRedirectUri(
        data.redirectUri || `${origin.replace(/\/+$/, '')}/api/auth/linkedin/callback`
      );
    } catch {
      const origin = window.location.origin.replace(/\/+$/, '');
      setOauthConfigured(false);
      setRedirectUri(`${origin}/api/auth/linkedin/callback`);
    } finally {
      setIsLoadingConfig(false);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    clearPopupWatcher();
    setIsAuthenticating(false);
    onClose();
  }, [clearPopupWatcher, onClose]);

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') {
      clearPopupWatcher();
      return;
    }
    let cancelled = false;
    const origin = window.location.origin;
    void fetch(`/api/auth/linkedin/url?origin=${encodeURIComponent(origin)}`, {
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then(
        (data: { configured?: boolean; url?: string; redirectUri?: string }) => {
          if (cancelled) return;
          setOauthConfigured(Boolean(data.configured));
          setPrefetchedAuthUrl(data.url || '');
          setRedirectUri(
            data.redirectUri ||
              `${origin.replace(/\/+$/, '')}/api/auth/linkedin/callback`
          );
          setIsLoadingConfig(false);
        }
      )
      .catch(() => {
        if (cancelled) return;
        setOauthConfigured(false);
        setRedirectUri(`${origin.replace(/\/+$/, '')}/api/auth/linkedin/callback`);
        setIsLoadingConfig(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, clearPopupWatcher]);

  useEffect(() => {
    if (!isOpen) return;

    const handleWindowMessage = (event: MessageEvent) => {
      const msg = event.data;
      if (!msg || typeof msg !== 'object' || msg.type !== 'LINKEDIN_OAUTH_RESULT') {
        return;
      }

      clearPopupWatcher();
      setIsAuthenticating(false);

      if (msg.ok && msg.payload) {
        setErrorMessage(null);
        setImportedPayload(msg.payload as LinkedInImportPayload);
      } else if (!msg.cancelled) {
        setErrorMessage(
          typeof msg.error === 'string' && msg.error
            ? msg.error
            : 'LinkedIn authentication could not be completed.'
        );
      }

      // Refresh signed state URL in case the user authenticates again
      void refreshOAuthSetup();
    };

    window.addEventListener('message', handleWindowMessage);
    return () => {
      window.removeEventListener('message', handleWindowMessage);
    };
  }, [isOpen, clearPopupWatcher, refreshOAuthSetup]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleCloseModal]);

  useEffect(() => {
    return () => {
      clearPopupWatcher();
    };
  }, [clearPopupWatcher]);

  if (!isOpen) return null;

  const handleConnectLinkedIn = async () => {
    setErrorMessage(null);

    let targetUrl = prefetchedAuthUrl;
    if (!targetUrl) {
      try {
        const origin = window.location.origin;
        const res = await fetch(
          `/api/auth/linkedin/url?origin=${encodeURIComponent(origin)}`,
          { cache: 'no-store' }
        );
        const data = (await res.json()) as {
          configured?: boolean;
          url?: string;
        };
        if (!data.configured || !data.url) {
          setOauthConfigured(false);
          return;
        }
        targetUrl = data.url;
      } catch {
        setErrorMessage('Could not reach LinkedIn authentication endpoint.');
        return;
      }
    }

    const width = 560;
    const height = 700;
    const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
    const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2));

    const popup = window.open(
      targetUrl,
      'linkedin_oauth_popup',
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=yes,status=no,resizable=yes,scrollbars=yes`
    );

    if (!popup) {
      setErrorMessage(
        'Popup window was blocked by your browser. Please allow popups for this site and try again.'
      );
      return;
    }

    popupRef.current = popup;
    setIsAuthenticating(true);
    clearPopupWatcher();

    popupWatchTimerRef.current = setInterval(() => {
      if (!popupRef.current || popupRef.current.closed) {
        clearPopupWatcher();
        setIsAuthenticating(false);
        void refreshOAuthSetup();
      }
    }, 650);
  };

  const handleCopyRedirectUri = async () => {
    if (!redirectUri) return;
    try {
      await navigator.clipboard.writeText(redirectUri);
      setCopiedRedirect(true);
      setTimeout(() => setCopiedRedirect(false), 2500);
    } catch {
      setCopiedRedirect(false);
    }
  };

  const handleSelectPdfFile = (file?: File | null) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please select a PDF file (e.g., LinkedIn "Save to PDF" export).');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('PDF file must be under 8MB.');
      return;
    }
    setErrorMessage(null);
    setSelectedPdfFile(file);
  };

  const handleParseProfileData = async () => {
    if (isParsingProfile) return;
    if (enrichMode === 'pdf' && !selectedPdfFile) {
      setErrorMessage('Select your exported LinkedIn PDF file first.');
      return;
    }
    if (enrichMode === 'text' && !pastedText.trim()) {
      setErrorMessage('Paste your LinkedIn profile summary, experience, or education text first.');
      return;
    }

    setErrorMessage(null);
    setIsParsingProfile(true);

    try {
      let pdfBase64: string | undefined;
      if (enrichMode === 'pdf' && selectedPdfFile) {
        pdfBase64 = await readFileAsDataUrl(selectedPdfFile);
      }

      const res = await fetch('/api/linkedin/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64,
          fileName: selectedPdfFile?.name,
          profileText: enrichMode === 'text' ? pastedText.trim() : undefined,
          oauthProfile: importedPayload || undefined,
          language,
        }),
      });

      const data = (await res.json()) as {
        payload?: LinkedInImportPayload;
        error?: string;
      };

      if (!res.ok || !data.payload) {
        throw new Error(data.error || 'Could not parse LinkedIn profile.');
      }

      setImportedPayload(data.payload);
    } catch (err: unknown) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : 'Failed to parse LinkedIn profile data.';
      setErrorMessage(msg);
    } finally {
      setIsParsingProfile(false);
    }
  };

  const handleApplyToBuilder = () => {
    if (!importedPayload) return;
    const currentSnapshot = useCvStore.getState();
    const storeUpdates = mapLinkedInPayloadToCvStore(
      importedPayload,
      currentSnapshot,
      applyMode
    );
    currentSnapshot.loadParsedCvData(storeUpdates);
    onImportSuccess?.();
    handleCloseModal();
  };

  const fullNamePreview = [importedPayload?.firstName, importedPayload?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();

  const expCount = importedPayload?.experiences?.length || 0;
  const eduCount = importedPayload?.educations?.length || 0;
  const skillCount = importedPayload?.skills?.length || 0;
  const certCount = importedPayload?.certifications?.length || 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F1B4D]/45 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={handleCloseModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="linkedin-import-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[580px] max-h-[92vh] flex flex-col bg-white rounded-t-3xl sm:rounded-3xl border border-[#E8EAF5] shadow-[0_20px_60px_rgba(15,27,77,0.18)] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <h2
                id="linkedin-import-modal-title"
                className="text-base sm:text-lg font-bold text-[#0F1B4D] tracking-tight"
              >
                Import from LinkedIn
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Authenticate with LinkedIn to import your verified identity and photo, or parse your full career history into the CV Builder.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCloseModal}
            aria-label="Close LinkedIn import dialog"
            className="min-h-[36px] min-w-[36px] rounded-xl text-slate-400 hover:text-[#0F1B4D] hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {errorMessage && (
            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/70 flex items-start gap-2.5 text-xs sm:text-sm text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Section 1: LinkedIn OAuth 2.0 Connection */}
          <div className="rounded-2xl border border-[#E8EAF5] bg-[#FAFBFD] p-4 sm:p-5 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#0F1B4D]">
                  1. LinkedIn Account Authentication
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  OAuth 2.0 · OpenID Connect · Imports verified name, email &amp; profile photo
                </p>
              </div>

              {isLoadingConfig ? (
                <div className="min-h-[42px] px-4 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-500 inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0A66C2]" />
                  <span>Checking OAuth...</span>
                </div>
              ) : oauthConfigured ? (
                <button
                  type="button"
                  onClick={() => void handleConnectLinkedIn()}
                  disabled={isAuthenticating}
                  className={`min-h-[42px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-70 whitespace-nowrap shrink-0 ${
                    importedPayload?.oauthConnected
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100/70'
                      : 'bg-[#0A66C2] hover:bg-[#004182] text-white shadow-[0_4px_12px_rgba(10,102,194,0.22)]'
                  }`}
                >
                  {isAuthenticating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      <span>Waiting for LinkedIn...</span>
                    </>
                  ) : importedPayload?.oauthConnected ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>LinkedIn Connected</span>
                    </>
                  ) : (
                    <>
                      <Linkedin className="w-4 h-4 shrink-0" />
                      <span>Continue with LinkedIn</span>
                    </>
                  )}
                </button>
              ) : null}
            </div>

            {/* Unconfigured Server OAuth Notice (Never prompts for secrets in UI) */}
            {!isLoadingConfig && !oauthConfigured && (
              <div className="pt-2 border-t border-slate-200/80 space-y-2.5">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct LinkedIn OAuth sign-in becomes active once{' '}
                  <code className="font-mono text-[11px] text-[#0F1B4D]">
                    LINKEDIN_CLIENT_ID
                  </code>{' '}
                  and{' '}
                  <code className="font-mono text-[11px] text-[#0F1B4D]">
                    LINKEDIN_CLIENT_SECRET
                  </code>{' '}
                  are configured in server environment variables, with this Redirect URL registered in your LinkedIn Developer App:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={redirectUri}
                    onFocus={(e) => e.currentTarget.select()}
                    aria-label="LinkedIn OAuth Redirect URI"
                    className="flex-1 min-w-0 min-h-[38px] px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-[11px] font-mono text-slate-700 truncate focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => void handleCopyRedirectUri()}
                    className="min-h-[38px] px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-[#0F1B4D] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedRedirect ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#4B4DED]" />
                        <span>Copy URI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Authenticated / Parsed Preview Summary */}
          {importedPayload && (
            <div className="rounded-2xl border border-[#DCE3F7] bg-white p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {importedPayload.photoUrl ? (
                    <img
                      src={importedPayload.photoUrl}
                      alt={fullNamePreview || 'LinkedIn profile'}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#EEF1FF] text-[#4B4DED] font-bold text-sm flex items-center justify-center shrink-0">
                      {(importedPayload.firstName?.[0] || 'L').toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0F1B4D] truncate">
                      {fullNamePreview || 'LinkedIn Profile Ready'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {[importedPayload.jobTitle, importedPayload.email, importedPayload.city]
                        .filter(Boolean)
                        .join(' · ') || 'Contact details extracted'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setImportedPayload(null)}
                  title="Clear extracted preview"
                  className="min-h-[34px] px-2.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 inline-flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Unboxed Tabular Stats Line (Zero-Pill Rule) */}
              <p className="text-xs text-slate-600 tabular-nums pt-2 border-t border-slate-100">
                <span className="font-semibold text-[#0F1B4D]">{expCount}</span>{' '}
                {expCount === 1 ? 'role' : 'roles'}
                <span aria-hidden="true" className="mx-1.5 text-slate-300">
                  ·
                </span>
                <span className="font-semibold text-[#0F1B4D]">{eduCount}</span>{' '}
                {eduCount === 1 ? 'qualification' : 'qualifications'}
                <span aria-hidden="true" className="mx-1.5 text-slate-300">
                  ·
                </span>
                <span className="font-semibold text-[#0F1B4D]">{skillCount}</span>{' '}
                {skillCount === 1 ? 'skill' : 'skills'}
                {certCount > 0 && (
                  <>
                    <span aria-hidden="true" className="mx-1.5 text-slate-300">
                      ·
                    </span>
                    <span className="font-semibold text-[#0F1B4D]">{certCount}</span>{' '}
                    {certCount === 1 ? 'certification' : 'certifications'}
                  </>
                )}
              </p>

              {importedPayload.limitedScopeNotice && (
                <p className="text-xs text-slate-500 leading-relaxed">
                  LinkedIn standard OpenID permissions shared your verified name, email, and photo. To also populate your full work history, education, and skills, upload your LinkedIn &ldquo;Save to PDF&rdquo; export below before applying.
                </p>
              )}
            </div>
          )}

          {/* Section 2: Full Career History Parser (LinkedIn Save-to-PDF or Profile Text) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#0F1B4D]">
                  2. Parse Full Work History, Education &amp; Skills
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  On LinkedIn, open your profile → <span className="font-medium text-slate-700">More</span> → <span className="font-medium text-slate-700">Save to PDF</span>, or paste your sections
                </p>
              </div>

              <div className="inline-flex bg-[#F4F7FE] p-1 rounded-xl border border-[#E4E9FA] self-start shrink-0">
                <button
                  type="button"
                  onClick={() => setEnrichMode('pdf')}
                  className={`min-h-[32px] px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    enrichMode === 'pdf'
                      ? 'bg-white text-[#4B4DED] shadow-2xs border border-[#DCE3F7]'
                      : 'text-slate-600 hover:text-[#0F1B4D]'
                  }`}
                >
                  LinkedIn PDF
                </button>
                <button
                  type="button"
                  onClick={() => setEnrichMode('text')}
                  className={`min-h-[32px] px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    enrichMode === 'text'
                      ? 'bg-white text-[#4B4DED] shadow-2xs border border-[#DCE3F7]'
                      : 'text-slate-600 hover:text-[#0F1B4D]'
                  }`}
                >
                  Paste Profile Text
                </button>
              </div>
            </div>

            {enrichMode === 'pdf' ? (
              <div>
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    handleSelectPdfFile(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />
                <div
                  onClick={() => pdfInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingPdf(true);
                  }}
                  onDragLeave={() => setIsDraggingPdf(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingPdf(false);
                    handleSelectPdfFile(e.dataTransfer.files?.[0]);
                  }}
                  className={`p-5 rounded-2xl border-2 border-dashed transition-colors text-center cursor-pointer ${
                    isDraggingPdf
                      ? 'border-[#4B4DED] bg-[#EEF1FF]/50'
                      : selectedPdfFile
                      ? 'border-[#4B4DED]/60 bg-[#FAFBFD]'
                      : 'border-slate-200 hover:border-[#4B4DED] bg-[#FAFBFD]'
                  }`}
                >
                  {selectedPdfFile ? (
                    <div className="flex items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#EEF1FF] text-[#4B4DED] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#0F1B4D] truncate">
                            {selectedPdfFile.name}
                          </p>
                          <p className="text-xs text-slate-500 tabular-nums">
                            {(selectedPdfFile.size / 1024).toFixed(0)} KB · Ready to parse
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPdfFile(null);
                        }}
                        className="min-h-[36px] px-3 rounded-lg text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-[#EEF1FF] text-[#4B4DED] flex items-center justify-center mb-2">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-[#0F1B4D]">
                        Drop your LinkedIn <span className="text-[#4B4DED]">Profile.pdf</span> here or browse
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        PDF up to 8MB · Extracts experience, education, skills &amp; summary
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <textarea
                  rows={5}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste your LinkedIn headline, About summary, Experience roles, Education, and Skills here..."
                  className="w-full p-3.5 rounded-2xl border border-slate-200 bg-[#FAFBFD] focus:bg-white text-base sm:text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#4B4DED] focus:ring-3 focus:ring-[#4B4DED]/12 leading-relaxed"
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => void handleParseProfileData()}
                disabled={
                  isParsingProfile ||
                  (enrichMode === 'pdf' ? !selectedPdfFile : !pastedText.trim())
                }
                className="min-h-[40px] px-4 py-2 rounded-xl border border-[#DCE3F7] bg-white hover:bg-[#EEF1FF]/70 hover:border-[#4B4DED]/60 text-[#0F1B4D] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
              >
                {isParsingProfile ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#4B4DED] shrink-0" />
                    <span>Parsing LinkedIn Profile...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#4B4DED] shrink-0" />
                    <span>
                      {importedPayload?.oauthConnected
                        ? 'Enrich Connected Profile'
                        : 'Parse LinkedIn Data'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Import Strategy Selector when payload is ready */}
          {importedPayload && (
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span className="text-xs font-semibold text-[#0F1B4D]">
                How should this populate your CV?
              </span>
              <div className="inline-flex bg-[#F4F7FE] p-1 rounded-xl border border-[#E4E9FA] self-start shrink-0">
                <button
                  type="button"
                  onClick={() => setApplyMode('replace')}
                  className={`min-h-[32px] px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    applyMode === 'replace'
                      ? 'bg-white text-[#4B4DED] shadow-2xs border border-[#DCE3F7]'
                      : 'text-slate-600 hover:text-[#0F1B4D]'
                  }`}
                >
                  Replace CV fields
                </button>
                <button
                  type="button"
                  onClick={() => setApplyMode('merge')}
                  className={`min-h-[32px] px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    applyMode === 'merge'
                      ? 'bg-white text-[#4B4DED] shadow-2xs border border-[#DCE3F7]'
                      : 'text-slate-600 hover:text-[#0F1B4D]'
                  }`}
                >
                  Merge with current
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#F8F9FE] border-t border-slate-100 flex items-center justify-between gap-3 shrink-0 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={handleCloseModal}
            className="min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0F1B4D] hover:bg-white border border-transparent hover:border-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApplyToBuilder}
            disabled={!importedPayload || isParsingProfile || isAuthenticating}
            className="min-h-[42px] px-5 py-2 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-xs sm:text-sm font-semibold shadow-[0_4px_14px_rgba(75,77,237,0.22)] inline-flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
          >
            <span>Apply to CV Builder</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
