'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SimpleHeader from '@/components/layout/SimpleHeader';
import Dropzone from '@/components/import/Dropzone';
import SampleCvPresets, { SamplePresetItem } from '@/components/import/SampleCvPresets';
import ParsingProgress from '@/components/import/ParsingProgress';
import ImportPreviewCard from '@/components/import/ImportPreviewCard';
import LinkedInImportModal from '@/components/builder/LinkedInImportModal';
import { useCvStore } from '@/store/useCvStore';
import {
  LinkedInImportPayload,
  mapLinkedInPayloadToCvStore,
} from '@/lib/linkedinImport';
import {
  ChevronLeft,
  Linkedin,
  AlertCircle,
  ShieldCheck,
  CheckCircle,
  FileCheck2,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

function sanitizeClientErrorMessage(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed) as {
        error?: { message?: string } | string;
        message?: string;
      };
      if (typeof parsed.error === 'string' && parsed.error.trim()) {
        return parsed.error.trim();
      }
      if (
        parsed.error &&
        typeof parsed.error === 'object' &&
        typeof parsed.error.message === 'string'
      ) {
        return parsed.error.message.trim();
      }
      if (typeof parsed.message === 'string' && parsed.message.trim()) {
        return parsed.message.trim();
      }
    } catch {
      return 'The AI parser is temporarily busy. Please click Try Again in a moment.';
    }
  }
  return trimmed;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Could not read file.'));
      }
    };
    reader.onerror = () => reject(new Error('Could not read file.'));
    reader.readAsDataURL(file);
  });
}

type ImportStep = 'select' | 'parsing' | 'preview';

export default function ImportPage() {
  const router = useRouter();
  const [step, setStep] = useState<ImportStep>('select');
  const [file, setFile] = useState<File | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>('My CV.pdf');
  const [parseError, setParseError] = useState<string | null>(null);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState<boolean>(false);
  const [parsedPayload, setParsedPayload] = useState<LinkedInImportPayload | null>(null);

  const language = useCvStore((state) => state.language);

  // Handle Preset selection
  const handleSelectPreset = (preset: SamplePresetItem) => {
    setParseError(null);
    setCurrentFileName(`${preset.name} - Sample CV.pdf`);
    setStep('parsing');

    // Simulate animated extraction for preset
    setTimeout(() => {
      setParsedPayload(preset.payload);
      setStep('preview');
    }, 2400);
  };

  // Handle Real File Upload Import
  const handleStartFileImport = async () => {
    if (!file) return;
    setParseError(null);
    setCurrentFileName(file.name);
    setStep('parsing');

    try {
      let data: { payload?: LinkedInImportPayload; error?: string };

      const lowerName = file.name.toLowerCase();
      const isPdf = file.type === 'application/pdf' || lowerName.endsWith('.pdf');
      const isDocx =
        lowerName.endsWith('.docx') ||
        lowerName.endsWith('.doc') ||
        file.type.includes('word');

      if (isPdf || isDocx) {
        const fileBase64 = await readFileAsDataUrl(file);
        const res = await fetch('/api/linkedin/parse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileBase64,
            fileName: file.name,
            fileType: isDocx ? 'docx' : 'pdf',
            language,
          }),
        });
        data = (await res.json()) as { payload?: LinkedInImportPayload; error?: string };
        if (!res.ok || !data.payload) {
          throw new Error(data.error || 'Could not parse uploaded CV document.');
        }
      } else {
        // Plain text / text fallback
        const rawText = await file.text();
        const res = await fetch('/api/linkedin/parse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profileText: rawText.slice(0, 30000),
            fileName: file.name,
            language,
          }),
        });
        data = (await res.json()) as { payload?: LinkedInImportPayload; error?: string };
        if (!res.ok || !data.payload) {
          throw new Error(data.error || 'Could not parse uploaded CV file.');
        }
      }

      setParsedPayload(data.payload);
      setStep('preview');
    } catch (err: unknown) {
      const rawMsg =
        err instanceof Error && err.message
          ? err.message
          : 'Unable to parse file. Try uploading a PDF or test with a sample preset.';
      setParseError(sanitizeClientErrorMessage(rawMsg));
      setStep('select');
    }
  };

  // Confirm and load into builder store
  const handleConfirmImport = (mode: 'replace' | 'merge', targetTemplate?: string) => {
    if (!parsedPayload) return;
    const snapshot = useCvStore.getState();
    const updates = mapLinkedInPayloadToCvStore(parsedPayload, snapshot, mode);
    const chosenTemplate =
      targetTemplate || parsedPayload.suggestedTemplate || snapshot.activeTemplate;
    snapshot.loadParsedCvData({
      ...updates,
      activeTemplate: chosenTemplate as any,
      importedFileName: currentFileName,
    });
    router.push('/builder');
  };

  const handleCancelPreview = () => {
    setParsedPayload(null);
    setFile(null);
    setStep('select');
    setParseError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900">
      <SimpleHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-14">
        <div className="w-full max-w-[680px]">
          {/* STEP 1: Select File or Preset */}
          {step === 'select' && (
            <div className="bg-white/64 backdrop-blur-2xl backdrop-saturate-150 rounded-3xl border border-white/85 ring-1 ring-slate-900/[0.04] shadow-[0_20px_54px_rgba(15,27,77,0.09),inset_0_1px_2px_rgba(255,255,255,0.95)] p-6 sm:p-10">
              <div className="text-center mb-6">
                <p className="text-xs font-bold tracking-wider uppercase text-[#4B4DED] mb-2">
                  Smart UK CV Parser
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0F1B4D] tracking-tight leading-tight">
                  Import your existing CV
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm mt-1.5 font-normal max-w-md mx-auto">
                  Upload an existing CV, connect your LinkedIn profile, or test instantly with a sample preset.
                </p>
              </div>

              {/* LinkedIn Quick Connect Banner */}
              <div className="mb-6 p-4 rounded-2xl border border-white/85 bg-white/62 backdrop-blur-xl ring-1 ring-slate-900/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/12 border border-[#0A66C2]/20 text-[#0A66C2] flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0F1B4D]">Import from LinkedIn</p>
                    <p className="text-xs text-slate-600">
                      Sign in with LinkedIn or upload your profile PDF
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLinkedInModalOpen(true)}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                >
                  <Linkedin className="w-4 h-4 shrink-0" />
                  <span>Connect LinkedIn</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center gap-3 mb-6">
                <div className="flex-1 border-t border-slate-300/60" />
                <span className="px-2 text-xs font-medium text-slate-500 whitespace-nowrap">
                  or upload document
                </span>
                <div className="flex-1 border-t border-slate-300/60" />
              </div>

              {parseError && (
                <div className="mb-5 p-3.5 sm:p-4 rounded-xl border border-red-200/90 bg-red-50/75 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-red-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75)]">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{parseError}</span>
                  </div>
                  {file && (
                    <button
                      type="button"
                      onClick={() => void handleStartFileImport()}
                      className="min-h-[36px] px-3.5 py-1.5 rounded-lg bg-white/80 hover:bg-white border border-red-200 text-red-700 font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 self-end sm:self-center"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Try Again</span>
                    </button>
                  )}
                </div>
              )}

              {/* Drag & Drop Zone */}
              <div className="mb-6">
                <Dropzone
                  selectedFile={file}
                  onFileSelect={(f) => {
                    setParseError(null);
                    setFile(f);
                  }}
                  onClearFile={() => {
                    setParseError(null);
                    setFile(null);
                  }}
                />
              </div>

              {/* Action Buttons for Upload */}
              {file && (
                <div className="mb-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => void handleStartFileImport()}
                    className="w-full sm:w-auto min-h-[44px] px-8 py-2.5 sm:py-3 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm sm:text-base shadow-[0_4px_14px_rgba(75,77,237,0.25)] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>Parse & Review CV</span>
                  </button>
                </div>
              )}

              {/* 1-Click Sample CV Presets */}
              <div className="pt-2 border-t border-white/75">
                <SampleCvPresets onSelectPreset={handleSelectPreset} />
              </div>

              {/* Back links */}
              <div className="flex items-center justify-center gap-4 pt-6 mt-6 border-t border-white/75">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#4B4DED] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  <span>Back to Home</span>
                </Link>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <Link
                  href="/start"
                  className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#4B4DED] transition-colors"
                >
                  <span>All start options</span>
                </Link>
              </div>
            </div>
          )}

          {/* STEP 2: Multi-step Animated Parsing Progress */}
          {step === 'parsing' && (
            <ParsingProgress fileName={currentFileName} />
          )}

          {/* STEP 3: Verification & Data Preview */}
          {step === 'preview' && parsedPayload && (
            <ImportPreviewCard
              payload={parsedPayload}
              fileName={currentFileName}
              onConfirm={handleConfirmImport}
              onCancel={handleCancelPreview}
            />
          )}

          {/* Trust Guarantees Footer Strip */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Private & Encrypted</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>ATS-Formatted Sections</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Fully Editable in Builder</span>
            </div>
          </div>
        </div>
      </main>

      {isLinkedInModalOpen && (
        <LinkedInImportModal
          isOpen={isLinkedInModalOpen}
          onClose={() => setIsLinkedInModalOpen(false)}
          onImportSuccess={() => router.push('/builder')}
        />
      )}
    </div>
  );
}
