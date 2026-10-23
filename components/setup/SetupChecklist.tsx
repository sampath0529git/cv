'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
}

const ITEMS: ChecklistItem[] = [
  { id: '1', label: 'Applying Template' },
  { id: '2', label: 'Setting up the CV Builder' },
  { id: '3', label: 'Launch AI assistant' },
];

export default function SetupChecklist() {
  const router = useRouter();
  // Completed step indexes: e.g. [0] means step 0 is done, step 1 is active, etc.
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    // Step 1 finishes after 1.2s
    const t1 = setTimeout(() => {
      setCompletedSteps([0]);
      setActiveStep(1);
    }, 1200);

    // Step 2 finishes after 2.4s
    const t2 = setTimeout(() => {
      setCompletedSteps([0, 1]);
      setActiveStep(2);
    }, 2400);

    // Step 3 finishes after 3.6s
    const t3 = setTimeout(() => {
      setCompletedSteps([0, 1, 2]);
      setActiveStep(3);
    }, 3600);

    // Redirect to /builder at 4.2s
    const t4 = setTimeout(() => {
      router.push('/builder');
    }, 4300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [router]);

  return (
    <div className="w-full">
      {/* 1. Navy Rounded Illustration Box matching Screenshot 2 */}
      <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-[#0F1B4D] overflow-hidden mb-8 flex items-center justify-center shadow-inner">
        {/* Soft diagonal highlight curve */}
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -left-16 w-64 h-64 bg-slate-100/10 rounded-full blur-xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-36 h-36 bg-[#E8EBFF]/15 rounded-tr-[80px] pointer-events-none"
        />

        {/* Outer Dashed Orbit Ring */}
        <div className="relative flex items-center justify-center">
          <svg
            className="w-44 h-44 sm:w-48 sm:h-48 animate-[spin_18s_linear_infinite] text-white/30"
            viewBox="0 0 160 160"
            fill="none"
          >
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="8 8"
            />
          </svg>

          {/* Center Rotating Indigo Gear */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-24 h-24 sm:w-28 sm:h-28 text-[#4B4DED] animate-[spin_10s_linear_infinite]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M50 35C41.7 35 35 41.7 35 50C35 58.3 41.7 65 50 65C58.3 65 65 58.3 65 50C65 41.7 58.3 35 50 35ZM50 58C45.6 58 42 54.4 42 50C42 45.6 45.6 42 50 42C54.4 42 58 45.6 58 50C58 54.4 54.4 58 50 58Z" />
              <path d="M90 45.5H82.2C81.6 42.1 80.4 38.9 78.7 36L84.2 30.5C85.2 29.5 85.2 27.9 84.2 26.9L73.1 15.8C72.1 14.8 70.5 14.8 69.5 15.8L64 21.3C61.1 19.6 57.9 18.4 54.5 17.8V10C54.5 8.6 53.4 7.5 52 7.5H38C36.6 7.5 35.5 8.6 35.5 10V17.8C32.1 18.4 28.9 19.6 26 21.3L20.5 15.8C19.5 14.8 17.9 14.8 16.9 15.8L5.8 26.9C4.8 27.9 4.8 29.5 5.8 30.5L11.3 36C9.6 38.9 8.4 42.1 7.8 45.5H0C-1.4 45.5 -2.5 46.6 -2.5 48V62C-2.5 63.4 -1.4 64.5 0 64.5H7.8C8.4 67.9 9.6 71.1 11.3 74L5.8 79.5C4.8 80.5 4.8 82.1 5.8 83.1L16.9 94.2C17.9 95.2 19.5 95.2 20.5 94.2L26 88.7C28.9 90.4 32.1 91.6 35.5 92.2V100C35.5 101.4 36.6 102.5 38 102.5H52C53.4 102.5 54.5 101.4 54.5 100V92.2C57.9 91.6 61.1 90.4 64 88.7L69.5 94.2C70.5 95.2 72.1 95.2 73.1 94.2L84.2 83.1C85.2 82.1 85.2 80.5 84.2 79.5L78.7 74C80.4 71.1 81.6 67.9 82.2 64.5H90C91.4 64.5 92.5 63.4 92.5 62V48C92.5 46.6 91.4 45.5 90 45.5Z" />
            </svg>

            {/* Inner Ring */}
            <div className="absolute w-8 h-8 rounded-full border-2 border-white/40" />
          </div>
        </div>
      </div>

      {/* 2. Checklist Items */}
      <div className="space-y-4 px-2">
        {ITEMS.map((item, index) => {
          const isDone = completedSteps.includes(index);
          const isActive = activeStep === index;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-1 transition-all duration-200"
            >
              <span
                className={`text-sm sm:text-base font-medium transition-colors ${
                  isDone || isActive ? 'text-[#0F1B4D]' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>

              <div className="flex items-center justify-center w-6 h-6 shrink-0">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-[#4B4DED] text-white flex items-center justify-center animate-[scaleIn_0.2s_ease-out]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-[#4B4DED] animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
