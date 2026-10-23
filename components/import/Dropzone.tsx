'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle } from 'lucide-react';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClearFile: () => void;
}

export default function Dropzone({ onFileSelect, selectedFile, onClearFile }: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    setError(null);
    const validExtensions = ['.pdf', '.docx', '.doc'];
    const hasValidExt = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setError('Please upload a valid PDF or DOCX file.');
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc"
        className="hidden"
        onChange={handleInputChange}
      />

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center ${
            isDragOver
              ? 'border-[#4B4DED] bg-[#E8EBFF]'
              : 'border-[#7E80F5] bg-[#F0F0FC] hover:bg-[#EBEEFC]'
          }`}
        >
          {/* Document Upload Icon Illustration */}
          <div className="relative mb-5 flex items-center justify-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-b from-[#CBE8FE] to-[#B6D8F8] flex items-center justify-center shadow-xs border border-blue-200">
              <FileText className="w-8 h-8 text-[#1E293B]" strokeWidth={2} />
            </div>
            {/* Arrow badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#4B4DED] text-white flex items-center justify-center shadow-sm">
              <UploadCloud className="w-3.5 h-3.5" />
            </div>
          </div>

          <p className="text-base sm:text-lg font-bold text-[#0F1B4D] mb-1">
            Drag and drop a file here
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 font-normal">
            Accepted format: PDF, DOCX
          </p>

          <button
            type="button"
            onClick={handleBrowseClick}
            className="px-8 py-2.5 sm:py-3 bg-[#4B4DED] hover:bg-[#3D3FC9] active:scale-98 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(75,77,237,0.25)] transition-all cursor-pointer text-sm sm:text-base"
          >
            Browse
          </button>
        </div>
      ) : (
        <div className="w-full rounded-2xl border border-indigo-200 bg-[#F0F0FC] p-6 sm:p-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#4B4DED] text-white flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-base font-semibold text-[#0F1B4D] truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Ready for AI parsing
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClearFile}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            title="Remove file"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-rose-600 bg-rose-50 px-3.5 py-2 rounded-lg border border-rose-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
