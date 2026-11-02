'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle, FileCheck2 } from 'lucide-react';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClearFile: () => void;
  disabled?: boolean;
}

export default function Dropzone({
  onFileSelect,
  selectedFile,
  onClearFile,
  disabled = false,
}: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    setError(null);
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const hasValidExt = validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!hasValidExt) {
      setError('Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    // 8MB limit
    if (file.size > 8 * 1024 * 1024) {
      setError('File size exceeds the 8MB limit.');
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt"
        className="hidden"
        disabled={disabled}
        onChange={handleInputChange}
      />

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`relative w-full rounded-2xl border-2 border-dashed backdrop-blur-xl transition-all duration-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center cursor-pointer group ${
            isDragOver
              ? 'border-[#4B4DED] bg-indigo-50/75 scale-[1.01] shadow-[0_12px_32px_rgba(75,77,237,0.12)]'
              : 'border-indigo-300/75 bg-white/52 hover:bg-white/78 hover:border-[#4B4DED] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]'
          } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
        >
          {/* Document Upload Icon Illustration */}
          <div className="relative mb-4 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/12 border border-indigo-400/25 backdrop-blur-md flex items-center justify-center text-[#4B4DED] group-hover:scale-105 group-hover:bg-indigo-500/18 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]">
              <UploadCloud className="w-8 h-8" strokeWidth={1.8} />
            </div>
          </div>

          <p className="text-base sm:text-lg font-bold text-[#0F1B4D] mb-1">
            Drop your CV here, or{' '}
            <span className="text-[#4B4DED] underline decoration-[#4B4DED]/40 underline-offset-4 group-hover:decoration-[#4B4DED]">
              browse
            </span>
          </p>

          <p className="text-xs sm:text-sm text-slate-600 mb-5 font-normal">
            Supported formats: PDF, DOCX, TXT (up to 8MB)
          </p>

          {/* Formats metadata */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>PDF</span>
            <span aria-hidden="true">·</span>
            <span>DOCX</span>
            <span aria-hidden="true">·</span>
            <span>TXT</span>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-2xl border border-white/90 ring-1 ring-indigo-500/15 bg-white/68 backdrop-blur-2xl backdrop-saturate-150 p-5 sm:p-6 flex items-center justify-between gap-4 shadow-[0_10px_28px_rgba(15,27,77,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#4B4DED] text-white flex items-center justify-center shrink-0 shadow-xs">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-bold text-[#0F1B4D] truncate">
                {selectedFile.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                <span className="font-mono tabular-nums">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </span>
                <span>·</span>
                <span className="text-emerald-700 font-semibold">Ready to parse</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClearFile();
            }}
            disabled={disabled}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-white/85 rounded-xl border border-transparent hover:border-white/90 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            title="Remove file"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-rose-600 bg-rose-50 px-3.5 py-2.5 rounded-xl border border-rose-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
