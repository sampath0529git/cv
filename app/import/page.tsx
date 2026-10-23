'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SimpleHeader from '@/components/layout/SimpleHeader';
import Dropzone from '@/components/import/Dropzone';
import { useCvStore } from '@/store/useCvStore';
import { ChevronLeft } from 'lucide-react';

export default function ImportPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const setImportedFile = useCvStore((state) => state.setImportedFile);
  const updateContact = useCvStore((state) => state.updateContact);

  const handleImport = () => {
    if (!file) return;

    // Save filename to store
    setImportedFile(file.name);

    // If file looks like a sample or name, seed sample data for realistic experience
    updateContact({
      firstName: 'Elsa',
      lastName: 'Manet',
      jobTitle: 'Experienced Sales Advisor',
      email: 'elsa.manet@gmail.com',
      phone: '(020) 1234 5678',
      postalCode: 'SW1A 1AA',
      city: 'London',
    });

    router.push('/setup?mode=import');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#EEF1FF] via-[#F8F9FE] to-white text-slate-900">
      {/* 1. Top Header with Logo */}
      <SimpleHeader />

      {/* 2. Main Card Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="w-full max-w-[620px] bg-white rounded-3xl border border-[#E8EAF5] shadow-[0_4px_30px_rgba(15,27,77,0.06)] p-7 sm:p-12">
          {/* Header Title & Subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F1B4D] tracking-tight leading-tight">
              Import your existing CV
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
              Leverage expert advice to improve your CV.
            </p>
          </div>

          {/* Drag & Drop Zone */}
          <div className="mb-8">
            <Dropzone
              selectedFile={file}
              onFileSelect={(f) => setFile(f)}
              onClearFile={() => setFile(null)}
            />
          </div>

          {/* Action Footer: Back & Import */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 pt-2">
            <Link
              href="/start"
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#4B4DED] hover:text-[#3D3FC9] transition-colors"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back</span>
            </Link>

            <button
              type="button"
              onClick={handleImport}
              disabled={!file}
              className={`px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-sm ${
                file
                  ? 'bg-[#4B4DED] hover:bg-[#3D3FC9] text-white cursor-pointer shadow-[0_4px_14px_rgba(75,77,237,0.25)]'
                  : 'bg-[#A5A7F5] text-white cursor-not-allowed opacity-90'
              }`}
            >
              Import
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
