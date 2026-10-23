'use client';

import React, { useState } from 'react';
import { useCvStore, WorkExperience } from '@/store/useCvStore';
import { Plus, Trash2, Check, Sparkles, Pencil, ArrowUp, ArrowDown, Briefcase } from 'lucide-react';
import ExperienceModal from '@/components/builder/ExperienceModal';

interface ExperienceStepProps {
  mode?: 'intro' | 'form';
}

export default function ExperienceStep({ mode = 'form' }: ExperienceStepProps) {
  const experiences = useCvStore((state) => state.experiences);
  const addExperience = useCvStore((state) => state.addExperience);
  const updateExperience = useCvStore((state) => state.updateExperience);
  const removeExperience = useCvStore((state) => state.removeExperience);
  const moveExperience = useCvStore((state) => state.moveExperience);

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
      addExperience(expData);
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

      {/* Experience list entries or Clean Empty State */}
      {experiences.length === 0 ? (
        <div className="p-8 sm:p-12 rounded-2xl border-2 border-dashed border-[#E3E6F0] bg-[#FAFBFD] text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#EEF2FF] text-[#4B4DED] flex items-center justify-center shadow-xs">
            <Briefcase className="w-8 h-8 stroke-[1.75]" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F1B4D]">
              No work experience added yet
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Add your current or previous positions, internships, or freelance work. Or continue to the next step if you do not have work experience yet.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm transition-all cursor-pointer shadow-[0_4px_14px_rgba(75,77,237,0.25)] hover:shadow-[0_6px_20px_rgba(75,77,237,0.35)] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add New</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {experiences.map((exp, index) => {
            const titleCompany =
              [exp.jobTitle, exp.employer].filter(Boolean).join(' - ') ||
              `Position #${index + 1}`;
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
                {/* Top row: Title and Action Icons */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-[#0F1B4D] text-base sm:text-lg tracking-tight">
                      {titleCompany}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                      {dateLocation || 'Date, City'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-slate-400">
                    {/* Move Up */}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveExperience(exp.id, 'up')}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-700"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                    )}
                    {/* Move Down */}
                    {index < experiences.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveExperience(exp.id, 'down')}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-700"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    )}
                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(exp)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-slate-500 hover:text-[#4B4DED]"
                      title="Edit experience"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {/* Delete button (Always available) */}
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="p-2 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-rose-600"
                      title="Delete experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
      )}

      {/* Add experience button with dashed lines (when items exist) */}
      {experiences.length > 0 && (
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 border-t border-dashed border-slate-300" />
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-dashed border-[#4B4DED]/60 bg-[#EEF0FF]/40 hover:bg-[#EEF0FF] text-[#4B4DED] font-semibold text-sm transition-all cursor-pointer shadow-2xs hover:border-[#4B4DED]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New</span>
          </button>
          <div className="flex-1 border-t border-dashed border-slate-300" />
        </div>
      )}

      {/* Experience Multi-Step Modal */}
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModalExperience}
        onDelete={removeExperience}
        initialExperience={editingExperience}
      />
    </div>
  );
}
