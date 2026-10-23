'use client';

import React, { useState } from 'react';
import { useCvStore, WorkExperience } from '@/store/useCvStore';
import { Plus, Trash2, Check, Sparkles, Pencil, Move } from 'lucide-react';
import CvPreview from '@/components/builder/CvPreview';
import ExperienceModal from '@/components/builder/ExperienceModal';

interface ExperienceStepProps {
  mode?: 'intro' | 'form';
}

export default function ExperienceStep({ mode = 'form' }: ExperienceStepProps) {
  const experiences = useCvStore((state) => state.experiences);
  const addExperience = useCvStore((state) => state.addExperience);
  const updateExperience = useCvStore((state) => state.updateExperience);
  const removeExperience = useCvStore((state) => state.removeExperience);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null);

  const handleOpenAddModal = () => {
    setEditingExperience(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (exp: WorkExperience) => {
    setEditingExperience(exp);
    setIsModalOpen(true);
  };

  const handleSaveModalExperience = (expData: Omit<WorkExperience, 'id'>, existingId?: string) => {
    if (existingId) {
      updateExperience(existingId, expData);
    } else {
      addExperience();
      const latest = useCvStore.getState().experiences;
      const newest = latest[latest.length - 1];
      if (newest) {
        updateExperience(newest.id, expData);
      }
    }
  };

  // 1. Intro Transition Screen
  if (mode === 'intro') {
    return (
      <div className="space-y-6 sm:space-y-8 animate-[fadeIn_0.2s_ease-out]">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-[#00d084] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-bold text-[#0F1B4D] text-base sm:text-lg tracking-tight">
            Great job with your personal information!
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F1B4D] tracking-tight leading-[1.15]">
          Now, let&apos;s add your work experience
        </h1>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#EEF3FF] border border-[#E0E7FF] flex items-center gap-3.5 shadow-2xs">
          <Sparkles className="w-5 h-5 text-[#4B4DED] shrink-0" />
          <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
            Our AI assistant will help you perfect the work experience section of your CV.
          </p>
        </div>
      </div>
    );
  }

  // 2. Work Experience Form Screen
  return (
    <div className="space-y-7 animate-[fadeIn_0.2s_ease-out]">
      {/* Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F1B4D] tracking-tight leading-tight">
          Tell us about your work experience
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
          Start with your most recent role. Include relevant achievements and quantified results.
        </p>
      </div>

      {/* Experience list entries */}
      <div className="space-y-5">
        {experiences.map((exp, index) => {
          const titleCompany = [exp.jobTitle, exp.employer].filter(Boolean).join(' - ') || `Position #${index + 1}`;
          const dateLocation = [
            [exp.startDate, exp.isCurrent ? 'Present' : exp.endDate].filter(Boolean).join(' - '),
            exp.city,
          ]
            .filter(Boolean)
            .join(', ');

          return (
            <div
              key={exp.id}
              className="p-5 sm:p-6 rounded-2xl border border-[#E3E6F0] bg-white shadow-2xs space-y-3 hover:border-[#4B4DED]/60 transition-all group relative"
            >
              {/* Top row: Title and Action Icons matching image_a4bc9ee0.png */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-[#0F1B4D] text-base sm:text-lg tracking-tight">
                    {titleCompany}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    {dateLocation || 'Date, City'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(exp)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-slate-500 hover:text-[#4B4DED]"
                    title="Edit experience"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-700"
                    title="Reorder"
                  >
                    <Move className="w-4 h-4" />
                  </button>
                  {experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="p-2 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-rose-600"
                      title="Remove experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Description or Add Description Button */}
              <div className="pt-1">
                {exp.description ? (
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-700 font-normal whitespace-pre-line leading-relaxed text-xs sm:text-sm border border-slate-100">
                    {exp.description}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(exp)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EEF0FF] hover:bg-[#E2E5FD] text-[#4B4DED] text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add description</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add experience button with dashed lines */}
      <div className="flex items-center gap-4 py-2">
        <div className="flex-1 border-t border-dashed border-slate-300" />
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-dashed border-[#4B4DED]/60 bg-[#EEF0FF]/40 hover:bg-[#EEF0FF] text-[#4B4DED] font-semibold text-sm transition-all cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add experience</span>
        </button>
        <div className="flex-1 border-t border-dashed border-slate-300" />
      </div>

      {/* Experience Multi-Step Modal */}
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModalExperience}
        initialExperience={editingExperience}
      />
    </div>
  );
}
