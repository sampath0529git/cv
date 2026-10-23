'use client';

import React, { useState, useEffect } from 'react';
import { WorkExperience } from '@/store/useCvStore';
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

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expData: Omit<WorkExperience, 'id'>, existingId?: string) => void;
  initialExperience?: WorkExperience | null;
}

// Tailored suggestions based on keywords
function getRoleSuggestions(jobTitle: string): string[] {
  const title = jobTitle.toLowerCase();

  if (title.includes('sale') || title.includes('saller') || title.includes('retail') || title.includes('account')) {
    return [
      'Drove a 15 percent revenue growth by securing key national client deals.',
      'Cultivated strong relationships with retail partners to boost net sales.',
      'Exceeded monthly sales targets by managing complex client negotiations now.',
      'Optimized sales pipeline processes to improve lead conversion rates today.',
      'Conducted persuasive product demonstrations for high-value prospective buyers.',
      'Maintained a 95% client satisfaction rating through responsive customer service.',
    ];
  }

  if (title.includes('dev') || title.includes('software') || title.includes('engineer') || title.includes('frontend') || title.includes('backend') || title.includes('tech')) {
    return [
      'Architected and deployed high-performance web applications using modern JavaScript frameworks.',
      'Reduced initial page load latency by 40% through asset caching and code splitting.',
      'Designed and integrated scalable RESTful and GraphQL API microservices.',
      'Collaborated closely with product designers to implement pixel-perfect user interfaces.',
      'Authored automated test suites maintaining over 85% unit test coverage.',
      'Streamlined CI/CD deployment pipelines, cutting release cycle times by half.',
    ];
  }

  if (title.includes('manage') || title.includes('lead') || title.includes('director') || title.includes('head')) {
    return [
      'Led cross-functional team of 10+ professionals to deliver high-priority roadmaps.',
      'Streamlined operational workflows, reducing overall turnaround time by 25%.',
      'Managed annual departmental budget allocations ensuring zero cost overruns.',
      'Mentored and coached junior associates to accelerate professional career growth.',
      'Introduced agile scrum ceremonies improving project sprint delivery velocity.',
    ];
  }

  if (title.includes('market') || title.includes('seo') || title.includes('growth') || title.includes('content')) {
    return [
      'Spearheaded organic growth initiatives increasing qualified website traffic by 65%.',
      'Designed multi-channel paid acquisition campaigns delivering 3.8x ROAS.',
      'Produced engaging email marketing sequences resulting in 38% average open rates.',
      'Conducted A/B test experiments on landing pages to maximize conversion rates.',
    ];
  }

  return [
    'Drove measurable improvements in team efficiency by implementing standard workflows.',
    'Collaborated with cross-departmental partners to deliver critical milestones on schedule.',
    'Resolved complex client inquiries while maintaining superior customer satisfaction ratings.',
    'Standardized internal documentation and onboarding guides for incoming team members.',
    'Monitored key performance metrics and prepared quarterly progress summaries for leadership.',
  ];
}

export default function ExperienceModal({
  isOpen,
  onClose,
  onSave,
  initialExperience,
}: ExperienceModalProps) {
  const [modalStep, setModalStep] = useState<1 | 2>(1);

  // Form Fields initialized directly from initialExperience
  const [jobTitle, setJobTitle] = useState(initialExperience?.jobTitle || '');
  const [companyName, setCompanyName] = useState(initialExperience?.employer || '');
  const [city, setCity] = useState(initialExperience?.city || '');
  const [startDate, setStartDate] = useState(initialExperience?.startDate || '');
  const [endDate, setEndDate] = useState(initialExperience?.endDate || '');
  const [description, setDescription] = useState(initialExperience?.description || '');

  // Validation
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  if (!isOpen) return null;

  const isTitleMissing = !jobTitle.trim();
  const showTitleError = hasAttemptedNext && isTitleMissing;

  const handleNextFromStep1 = () => {
    setHasAttemptedNext(true);
    if (!jobTitle.trim()) {
      return;
    }
    setModalStep(2);
  };

  const handleSave = () => {
    onSave(
      {
        jobTitle: jobTitle.trim(),
        employer: companyName.trim(),
        city: city.trim(),
        startDate: startDate.trim(),
        endDate: endDate.trim(),
        isCurrent: endDate.trim().toLowerCase() === 'current' || endDate.trim().toLowerCase() === 'present',
        description: description.trim(),
      },
      initialExperience?.id
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

  const suggestions = getRoleSuggestions(jobTitle);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0c1033]/70 backdrop-blur-[2px] transition-opacity animate-[fadeIn_0.15s_ease-out]"
        onClick={onClose}
      />

      {/* Modal Dialog (Exact Match for image reference screenshots) */}
      <div className="relative bg-white w-full max-w-[620px] rounded-2xl shadow-2xl z-10 flex flex-col max-h-[92vh] overflow-hidden animate-[scaleUp_0.15s_ease-out]">
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-2 flex items-center justify-between">
          <h2 className="text-2xl sm:text-[26px] font-bold text-[#0F172A] tracking-tight">
            {initialExperience ? 'Edit experience' : 'Add experience'}
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

        {/* Stepper Tabs: 1 Job overview > 2 Job description */}
        <div className="px-6 sm:px-8 pb-4 flex items-center gap-2">
          {/* Step 1 badge */}
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
            <span>Job overview</span>
          </button>

          <span className="text-slate-300 font-bold">&gt;</span>

          {/* Step 2 badge */}
          <button
            type="button"
            onClick={() => {
              if (jobTitle.trim()) setModalStep(2);
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
            <span>Job description</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-2">
          {modalStep === 1 ? (
            /* STEP 1: Job Overview */
            <div className="space-y-4 pb-4">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                  Job title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                    if (e.target.value.trim()) setHasAttemptedNext(false);
                  }}
                  placeholder="e.g. Experienced sales advisor"
                  className={`w-full h-[50px] px-4 rounded-xl border text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all text-sm sm:text-base ${
                    showTitleError
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20'
                      : 'border-slate-300 focus:border-[#4348F2] focus:ring-1 focus:ring-[#4348F2]'
                  }`}
                />
                {showTitleError && (
                  <p className="text-red-500 text-sm font-medium mt-1.5">
                    Title is required
                  </p>
                )}
              </div>

              {/* Company name & City (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                    Company name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder=""
                    className="w-full h-[50px] px-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4348F2] focus:ring-1 focus:ring-[#4348F2] transition-all text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                    City
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

              {/* Start Date & End Date (2 Columns) */}
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
            /* STEP 2: Job Description & AI Suggestions */
            <div className="space-y-4 pb-2">
              {/* Job summary card preview */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white">
                <h3 className="font-bold text-[#0F172A] text-base leading-snug">
                  {jobTitle || 'Role'} {companyName ? `- ${companyName}` : ''}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  {startDate && endDate ? `${startDate} - ${endDate}` : startDate || endDate || 'Date'}
                  {city ? `, ${city}` : ''}
                </p>
              </div>

              {/* Subtitle */}
              <p className="text-sm font-medium text-slate-800">
                Add 3–5 bullet points about your role and achievements:
              </p>

              {/* Rich formatting toolbar + Textarea */}
              <div className="rounded-xl border border-slate-300 overflow-hidden bg-white shadow-2xs focus-within:border-[#4348F2] focus-within:ring-1 focus-within:ring-[#4348F2] transition-all">
                {/* Formatting Toolbar */}
                <div className="px-3 py-2 border-b border-slate-200 flex items-center gap-1 text-slate-700 bg-slate-50/60 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      if (!description) return;
                      setDescription((prev) => `**${prev}**`);
                    }}
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center font-bold font-serif text-sm text-slate-800 cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!description) return;
                      setDescription((prev) => `*${prev}*`);
                    }}
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center italic font-serif text-sm text-slate-800 cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!description) return;
                      setDescription((prev) => `<u>${prev}</u>`);
                    }}
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center underline font-serif text-sm text-slate-800 cursor-pointer"
                    title="Underline"
                  >
                    <Underline className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <div className="w-[1px] h-4 bg-slate-200 mx-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setDescription((prev) => `${prev ? prev + '\n' : ''}• `);
                    }}
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer"
                    title="Bullet list"
                  >
                    <List className="w-4 h-4 stroke-[2]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDescription((prev) => `${prev ? prev + '\n' : ''}1. `);
                    }}
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer"
                    title="Numbered list"
                  >
                    <ListOrdered className="w-4 h-4 stroke-[2]" />
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer"
                    title="Link"
                  >
                    <Link2 className="w-4 h-4 stroke-[2]" />
                  </button>

                  <div className="w-[1px] h-4 bg-slate-200 mx-1" />

                  <button
                    type="button"
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer"
                    title="Undo"
                  >
                    <Undo2 className="w-4 h-4 stroke-[2]" />
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 rounded hover:bg-slate-200/70 flex items-center justify-center text-slate-700 cursor-pointer"
                    title="Redo"
                  >
                    <Redo2 className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`e.g.\n- Customer Advice: Improved customer satisfaction by 20% through personalized advice.`}
                  className="w-full p-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none min-h-[110px] resize-y leading-relaxed font-sans"
                />
              </div>

              {/* AI suggestions container */}
              <div className="rounded-xl border border-[#DCE4FD] overflow-hidden bg-[#F8FAFF]">
                {/* Header banner */}
                <div className="bg-[#EEF2FF] px-4 py-2.5 flex items-center gap-2 border-b border-[#E0E7FF]">
                  <Sparkles className="w-4 h-4 text-[#4348F2] shrink-0" />
                  <span className="font-semibold text-sm text-[#0F172A]">
                    AI suggestions for your {jobTitle || 'selected'} role
                  </span>
                </div>

                {/* Suggestions List */}
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
                  !jobTitle.trim()
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
