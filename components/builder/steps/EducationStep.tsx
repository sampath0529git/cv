'use client';

import React, { useState } from 'react';
import { useCvStore, Education } from '@/store/useCvStore';
import { Plus, Trash2, Check, Sparkles, Pencil, Move } from 'lucide-react';
import EducationModal from '@/components/builder/EducationModal';

interface EducationStepProps {
  mode?: 'intro' | 'form';
}

export default function EducationStep({ mode = 'form' }: EducationStepProps) {
  const educations = useCvStore((state) => state.educations);
  const addEducation = useCvStore((state) => state.addEducation);
  const updateEducation = useCvStore((state) => state.updateEducation);
  const removeEducation = useCvStore((state) => state.removeEducation);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);

  const handleOpenAddModal = () => {
    setEditingEducation(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (edu: Education) => {
    setEditingEducation(edu);
    setIsModalOpen(true);
  };

  const handleSaveModalEducation = (eduData: Omit<Education, 'id'>, existingId?: string) => {
    if (existingId) {
      updateEducation(existingId, eduData);
    } else {
      addEducation();
      const latest = useCvStore.getState().educations;
      const newest = latest[latest.length - 1];
      if (newest) {
        updateEducation(newest.id, eduData);
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
            Great job with your work experience!
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F1B4D] tracking-tight leading-[1.15]">
          Now, let&apos;s add your educational background
        </h1>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#EEF3FF] border border-[#E0E7FF] flex items-center gap-3.5 shadow-2xs">
          <Sparkles className="w-5 h-5 text-[#4B4DED] shrink-0" />
          <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
            Our AI assistant will help you structure your academic credentials.
          </p>
        </div>
      </div>
    );
  }

  // 2. Education Form Screen
  return (
    <div className="space-y-7 animate-[fadeIn_0.2s_ease-out]">
      {/* Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F1B4D] tracking-tight leading-tight">
          Add your educational background
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
          We recommend adding your education, even if you&apos;re still studying or didn&apos;t graduate.
        </p>
      </div>

      {/* Education entries list */}
      <div className="space-y-5">
        {educations.map((edu, index) => {
          const titleSchool = [edu.degree, edu.school].filter(Boolean).join(' - ') || `Education #${index + 1}`;
          const dateLocation = [
            [edu.startDate, edu.endDate].filter(Boolean).join(' - '),
            edu.city,
          ]
            .filter(Boolean)
            .join(', ');

          return (
            <div
              key={edu.id}
              className="p-5 sm:p-6 rounded-2xl border border-[#E3E6F0] bg-white shadow-2xs space-y-3 hover:border-[#4B4DED]/60 transition-all group relative"
            >
              {/* Top row: Title and Action Icons matching image_a4bc9ee0.png */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-[#0F1B4D] text-base sm:text-lg tracking-tight">
                    {titleSchool}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    {dateLocation || 'Date, City'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(edu)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-slate-500 hover:text-[#4B4DED]"
                    title="Edit education"
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
                  {educations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="p-2 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-rose-600"
                      title="Remove education"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Description or Add Description Button */}
              <div className="pt-1">
                {edu.description ? (
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-700 font-normal whitespace-pre-line leading-relaxed text-xs sm:text-sm border border-slate-100">
                    {edu.description}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(edu)}
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

      {/* Add education button with dashed lines */}
      <div className="flex items-center gap-4 py-2">
        <div className="flex-1 border-t border-dashed border-slate-300" />
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-dashed border-[#4B4DED]/60 bg-[#EEF0FF]/40 hover:bg-[#EEF0FF] text-[#4B4DED] font-semibold text-sm transition-all cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add education</span>
        </button>
        <div className="flex-1 border-t border-dashed border-slate-300" />
      </div>

      {/* Education Modal */}
      <EducationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModalEducation}
        initialEducation={editingEducation}
      />
    </div>
  );
}
