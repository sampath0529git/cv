'use client';

import React from 'react';
import Logo from '@/components/brand/Logo';
import { useCvStore } from '@/store/useCvStore';
import { Check } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Contact' },
  { id: 2, label: 'Education' },
  { id: 3, label: 'Work experience' },
  { id: 4, label: 'Additional info' },
  { id: 5, label: 'Summary' },
  { id: 6, label: 'Finalize' },
];

interface StepperProps {
  onStepClick?: (step: number) => void;
}

export default function Stepper({ onStepClick }: StepperProps) {
  const currentStep = useCvStore((state) => state.currentStep);
  const setStep = useCvStore((state) => state.setStep);

  const handleStepClick = (stepId: number) => {
    setStep(stepId);
    onStepClick?.(stepId);
  };

  return (
    <aside className="w-full lg:w-[270px] xl:w-[280px] bg-[#0e123a] text-white flex flex-col shrink-0 min-h-screen p-6 sm:p-7">
      {/* 1. Brand Logo at Top */}
      <div className="mb-10 sm:mb-12 pt-1 pl-1">
        <Logo variant="light" href="/" />
      </div>

      {/* 2. Vertical Stepper Navigation */}
      <nav className="flex-1 flex flex-col justify-start">
        <div className="relative space-y-6 sm:space-y-7 pl-1">
          {STEPS.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isLast = index === STEPS.length - 1;

            return (
              <div key={step.id} className="relative flex items-center gap-3.5 group">
                {/* Connecting Dotted Line */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[17px] top-[34px] w-0 h-7 sm:h-8 border-l-2 border-dotted border-white/20 pointer-events-none"
                  />
                )}

                {/* Step Circle Indicator */}
                <button
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  className="relative z-10 flex items-center justify-center cursor-pointer transition-transform duration-150 active:scale-95 focus:outline-none"
                  title={`Go to step ${step.id}: ${step.label}`}
                >
                  {isActive ? (
                    <div className="w-9 h-9 rounded-full bg-[#4B4DED] text-white flex items-center justify-center shadow-[0_0_14px_rgba(75,77,237,0.45)]">
                      {/* Stylized circular arc matching reference screenshot */}
                      <svg
                        className="w-4 h-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" strokeDasharray="36" strokeDashoffset="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </div>
                  ) : isCompleted ? (
                    <div className="w-9 h-9 rounded-full bg-[#00d084] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white/10 text-white/50 group-hover:bg-[#4B4DED] group-hover:text-white transition-all flex items-center justify-center font-semibold text-xs">
                      {step.id}
                    </div>
                  )}
                </button>

                {/* Step Label */}
                <button
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  className={`text-left text-sm sm:text-[15px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : isCompleted
                      ? 'text-[#00d084] hover:text-[#00d084]/80 font-medium'
                      : 'text-white/40 group-hover:text-white'
                  }`}
                >
                  {step.label}
                </button>
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
