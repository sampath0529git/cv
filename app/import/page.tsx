'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SimpleHeader from '@/components/layout/SimpleHeader';
import Dropzone from '@/components/import/Dropzone';
import LinkedInImportModal from '@/components/builder/LinkedInImportModal';
import { useCvStore } from '@/store/useCvStore';
import {
  LinkedInImportPayload,
  mapLinkedInPayloadToCvStore,
} from '@/lib/linkedinImport';
import { ChevronLeft, Linkedin, Loader2, AlertCircle } from 'lucide-react';

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

export default function ImportPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState<boolean>(false);

  const language = useCvStore((state) => state.language);

  const handleImport = async () => {
    if (!file || isParsing) return;
    setParseError(null);
    setIsParsing(true);

    try {
      const snapshot = useCvStore.getState();

      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        const pdfBase64 = await readFileAsDataUrl(file);
        const res = await fetch('/api/linkedin/parse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pdfBase64,
            fileName: file.name,
            language,
          }),
        });
        const data = (await res.json()) as {
          payload?: LinkedInImportPayload;
          error?: string;
        };
        if (!res.ok || !data.payload) {
          throw new Error(data.error || 'Could not parse uploaded PDF.');
        }

        const updates = mapLinkedInPayloadToCvStore(data.payload, snapshot, 'replace');
        snapshot.loadParsedCvData({
          ...updates,
          importedFileName: file.name,
        });
        router.push('/builder');
        return;
      }

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
      const data = (await res.json()) as {
        payload?: LinkedInImportPayload;
        error?: string;
      };
      if (!res.ok || !data.payload) {
        throw new Error(data.error || 'Could not parse uploaded CV file.');
      }

      const updates = mapLinkedInPayloadToCvStore(data.payload, snapshot, 'replace');
      snapshot.loadParsedCvData({
        ...updates,
        importedFileName: file.name,
      });
      router.push('/builder');
    } catch (err: unknown) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : 'Unable to parse file. Try uploading a PDF or importing via LinkedIn.';
      setParseError(msg);
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#EEF1FF] via-[#F8F9FE] to-white text-slate-900">
      <SimpleHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-[620px] bg-white rounded-3xl border border-[#E8EAF5] shadow-[0_4px_30px_rgba(15,27,77,0.06)] p-6 sm:p-11">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F1B4D] tracking-tight leading-tight">
              Import your existing CV
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
              Connect your LinkedIn profile or upload an existing CV document.
            </p>
          </div>

          {/* LinkedIn OAuth Quick Connect */}
          <div className="mb-6 p-4 rounded-2xl border border-[#DCE3F7] bg-[#FAFBFD] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#0F1B4D]">Import from LinkedIn</p>
                <p className="text-xs text-slate-500">
                  Authenticate with LinkedIn OAuth or parse your LinkedIn PDF
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsLinkedInModalOpen(true)}
              className="min-h-[42px] px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Linkedin className="w-4 h-4 shrink-0" />
              <span>Connect LinkedIn</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-slate-200/80" />
            <span className="bg-white px-3 text-xs font-medium text-slate-400 whitespace-nowrap">
              or upload a file
            </span>
            <div className="w-full border-t border-slate-200/80" />
          </div>

          {parseError && (
            <div className="mb-5 p-3.5 rounded-xl border border-red-200 bg-red-50/70 flex items-start gap-2.5 text-xs sm:text-sm text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Drag & Drop Zone */}
          <div className="mb-7">
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

          {/* Action Footer: Back & Import */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 pt-1">
            <Link
              href="/start"
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#4B4DED] hover:text-[#3D3FC9] transition-colors"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back</span>
            </Link>

            <button
              type="button"
              onClick={() => void handleImport()}
              disabled={!file || isParsing}
              className={`min-h-[44px] px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap ${
                file && !isParsing
                  ? 'bg-[#4B4DED] hover:bg-[#3D3FC9] text-white cursor-pointer shadow-[0_4px_14px_rgba(75,77,237,0.25)]'
                  : 'bg-[#A5A7F5] text-white cursor-not-allowed opacity-90'
              }`}
            >
              {isParsing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Parsing CV...</span>
                </>
              ) : (
                <span>Import</span>
              )}
            </button>
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
