'use client';

import React, { useState } from 'react';
import { Education } from '@/store/useCvStore';
import {
  X,
  Sparkles,
  PlusCircle,
  ChevronLeft,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Undo2,
  Redo2,
} from 'lucide-react';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eduData: Omit<Education, 'id'>, existingId?: string) => void;
  initialEducation?: Education | null;
}

function getEducationSuggestions(degree: string): string[] {
  return [
    'Graduated with First Class Honours / Distinction.',
    'Completed capstone project focused on advanced research and modelling.',
    'Awarded academic merit scholarship for top cohort performance.',
    'Served as President of the Student Society / Department Representative.',
    'Completed rigorous coursework and practical laboratory sessions.',
  ];
}

export default function EducationModal({
  isOpen,
  onClose,
  onSave,
  initialEducation,
}: EducationModalProps) {
  const [modalStep, setModalStep] = useState<1 | 2>(1);

  const [degree, setDegree] = useState(initialEducation?.degree || '');
  const [school, setSchool] = useState(initialEducation?.school || '');
  const [city, setCity] = useState(initialEducation?.city || '');
  const [startDate, setStartDate] = useState(initialEducation?.startDate || '');
  const [endDate, setEndDate] = useState(initialEducation?.endDate || '');
  const [description, setDescription] = useState(initialEducation?.description || '');

  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  if (!isOpen) return null;

  const isDegreeMissing = !degree.trim();
  const showDegreeError = hasAttemptedNext && isDegreeMissing;

  const handleNextFromStep1 = () => {
    setHasAttemptedNext(true);
    if (!degree.trim()) {
      return;
    }
    setModalStep(2);
  };

  const handleSave = () => {
    onSave(
      {
        degree: degree.trim(),
        school: school.trim(),
        city: city.trim(),
        startDate: startDate.trim(),
        endDate: endDate.trim(),
        description: description.trim(),
      },
      initialEducation?.id
    );
    onClose();
  };

  const handleAddSuggestion = (suggestion: string) => {
    const bullet = `- ${suggestion}`;
    if (!description.trim()) {
      setDescription(bullet);
    } else {
      setDescription((prev) => `${prev.trim()}\n${bullet}`);
    }
  };

  const suggestions = getEducationSuggestions(degree);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0c1033]/70 backdrop-blur-[2px] transition-opacity animate-[fadeIn_0.15s_ease-out]"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-[620px] rounded-2xl shadow-2xl z-10 flex flex-col max-h-[92vh] overflow-hidden animate-[scaleUp_0.15s_ease-out]">
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-2 flex items-center justify-between">
          <h2 className="text-2xl sm:text-[26px] font-bold text-[#0F172A] tracking-tight">
            {initialEducation ? 'Edit education' : 'Add new education'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Stepper Tabs */}
        <div className="px-6 sm:px-8 pb-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModalStep(1)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              modalStep === 1
                ? 'bg-[#EEF2FF] text-[#4348F2]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold bg-[#E0E7FF] text-[#4348F2]">
              1
            </span>
            <span>Education overview</span>
          </button>

          <span className="text-slate-300 font-bold">&gt;</span>

          <button
            type="button"
            onClick={() => {
              if (degree.trim()) setModalStep(2);
              else setHasAttemptedNext(true);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              modalStep === 2
                ? 'bg-[#EEF2FF] text-[#4348F2]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                modalStep === 2
                  ? 'bg-[#E0E7FF] text-[#4348F2]'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              2
            </span>
            <span>Description & details</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-2">
          {modalStep === 1 ? (
            /* STEP 1: Overview */
            <div className="space-y-4 pb-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                  Name of the diploma / study area
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => {
                    setDegree(e.target.value);
                    if (e.target.value.trim()) setHasAttemptedNext(false);
                  }}
                  placeholder="e.g. BSc Computer Science"
                  className={`w-full h-[50px] px-4 rounded-xl border text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base ${
                    showDegreeError
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20'
                      : 'border-slate-300 focus:border-[#4348F2] focus:ring-1 focus:ring-[#4348F2]'
                  }`}
                />
                {showDegreeError && (
                  <p className="text-red-500 text-sm font-medium mt-1.5">
                    Title is required
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                    School name
                  </label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="e.g. University of Manchester"
                    className="w-full h-[50px] px-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4348F2] focus:ring-1 focus:ring-[#4348F2] transition-all text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                    School location
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Paris"
                    className="w-full h-[50px] px-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4348F2] focus:ring-1 focus:ring-[#4348F2] transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                    Start date
                  </label>
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="MM/YYYY"
                    className="w-full h-[50px] px-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4348F2] focus:ring-1 focus:ring-[#4348F2] transition-all text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                    End date
                  </label>
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="MM/YYYY"
                    className="w-full h-[50px] px-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4348F2] focus:ring-1 focus:ring-[#4348F2] transition-all text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: Description & AI Suggestions */
            <div className="space-y-4 pb-2">
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white">
                <h3 className="font-bold text-[#0F172A] text-base leading-snug">
                  {degree || 'Degree'} {school ? `- ${school}` : ''}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  {startDate && endDate ? `${startDate} - ${endDate}` : startDate || endDate || 'Date'}
                  {city ? `, ${city}` : ''}
                </p>
              </div>

              <p className="text-sm font-medium text-slate-800">
                Description (optional):
              </p>

              <div className="rounded-xl border border-slate-300 overflow-hidden bg-white shadow-2xs focus-within:border-[#4348F2] focus-within:ring-1 focus-within:ring-[#4348F2] transition-all">
                <div className="px-3 py-2 border-b border-slate-200 flex items-center gap-1 text-slate-700 bg-slate-50/60 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setDescription((prev) => `**${prev}**`)}
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center font-bold font-serif text-sm text-slate-800 cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDescription((prev) => `*${prev}*`)}
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center italic font-serif text-sm text-slate-800 cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDescription((prev) => `<u>${prev}</u>`)}
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center underline font-serif text-sm text-slate-800 cursor-pointer"
                    title="Underline"
                  >
                    <Underline className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                  <button
                    type="button"
                    onClick={() => setDescription((prev) => `${prev ? prev + '\n' : ''}• `)}
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer"
                    title="Bullet list"
                  >
                    <List className="w-4 h-4 stroke-[2]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDescription((prev) => `${prev ? prev + '\n' : ''}1. `)}
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer"
                    title="Numbered list"
                  >
                    <ListOrdered className="w-4 h-4 stroke-[2]" />
                  </button>
                  <button type="button" className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer" title="Link">
                    <Link2 className="w-4 h-4 stroke-[2]" />
                  </button>
                  <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                  <button type="button" className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer" title="Undo">
                    <Undo2 className="w-4 h-4 stroke-[2]" />
                  </button>
                  <button type="button" className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer" title="Redo">
                    <Redo2 className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`e.g.\n- Projects completed related to the position sought\n- Grades, honors`}
                  className="w-full p-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none min-h-[110px] resize-y leading-relaxed font-sans"
                />
              </div>

              {/* AI suggestions */}
              <div className="rounded-xl border border-[#DCE4FD] overflow-hidden bg-[#F8FAFF]">
                <div className="bg-[#EEF2FF] px-4 py-2.5 flex items-center gap-2 border-b border-[#E0E7FF]">
                  <Sparkles className="w-4 h-4 text-[#4348F2] shrink-0" />
                  <span className="font-semibold text-sm text-[#0F172A]">
                    AI suggestions for your education
                  </span>
                </div>
                <div className="max-h-[170px] overflow-y-auto p-1 divide-y divide-slate-100">
                  {suggestions.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 hover:bg-white rounded-lg transition-colors group cursor-pointer"
                      onClick={() => handleAddSuggestion(item)}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddSuggestion(item);
                        }}
                        className="text-slate-500 group-hover:text-[#4348F2] transition-colors mt-0.5 shrink-0 cursor-pointer"
                        title="Add bullet point"
                      >
                        <PlusCircle className="w-5 h-5 stroke-[1.8]" />
                      </button>
                      <span className="text-sm text-slate-700 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 sm:px-8 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
          {modalStep === 1 ? (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={handleNextFromStep1}
                className={`px-8 py-2.5 rounded-xl font-semibold text-sm text-white transition-all cursor-pointer shadow-xs ${
                  !degree.trim()
                    ? 'bg-[#8F94F8] hover:bg-[#7D83F7]'
                    : 'bg-[#4348F2] hover:bg-[#3439DE]'
                }`}
              >
                Next
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setModalStep(1)}
                className="flex items-center gap-1 text-[#4348F2] hover:text-[#3237D4] font-semibold text-sm cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="px-8 py-2.5 bg-[#4348F2] hover:bg-[#3439DE] text-white font-semibold text-sm rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
