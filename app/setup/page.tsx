'use client';

import React from 'react';
import SimpleHeader from '@/components/layout/SimpleHeader';
import SetupChecklist from '@/components/setup/SetupChecklist';

export default function SetupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#EEF1FF] via-[#F8F9FE] to-white text-slate-900">
      {/* 1. Top Header with Logo */}
      <SimpleHeader />

      {/* 2. Main Loading Card */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="w-full max-w-[500px] bg-white rounded-3xl border border-[#E8EAF5] shadow-[0_4px_30px_rgba(15,27,77,0.06)] p-7 sm:p-10">
          {/* Headline matching screenshot */}
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0F1B4D] text-center tracking-tight leading-tight mb-7">
            Settings things up for you...
          </h1>

          {/* Animated Illustration & Checklist */}
          <SetupChecklist />
        </div>
      </main>
    </div>
  );
}
