'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileEdit,
  FileUp,
  Linkedin,
  ArrowRight,
  Check,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';
import TopNav from '@/components/navigation/TopNav';
import Footer from '@/components/layout/Footer';
import LinkedInImportModal from '@/components/builder/LinkedInImportModal';
import { useCvStore } from '@/store/useCvStore';
import { CV_TEMPLATES } from '@/templates/registry';

interface QuickTemplatePreset {
  id: string;
  title: string;
  subtitle: string;
}

const QUICK_UK_LAYOUTS: QuickTemplatePreset[] = [
  {
    id: 'classic-corporate',
    title: 'Classic Corporate',
    subtitle: 'London · City & Office',
  },
  {
    id: 'minimal-clean',
    title: 'ATS-Friendly',
    subtitle: 'Oxford · Strict Portals',
  },
  {
    id: 'graduate-starter',
    title: 'Graduate CV',
    subtitle: 'Cambridge · Uni & Schemes',
  },
  {
    id: 'york',
    title: '16-Year-Old CV',
    subtitle: 'York · GCSE & First Job',
  },
  {
    id: 'durham',
    title: 'School Leaver',
    subtitle: 'Durham · Apprenticeships',
  },
  {
    id: 'leeds',
    title: 'NHS & Nursing',
    subtitle: 'Leeds · Clinical & Trac',
  },
  {
    id: 'glasgow',
    title: 'Finance & City',
    subtitle: 'Glasgow · Banking & Audit',
  },
  {
    id: 'west-end',
    title: 'Acting & Stage',
    subtitle: 'West End · Spotlight UK',
  },
];

export default function StartPage() {
  const router = useRouter();
  const store = useCvStore();
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [confirmingReset, setConfirmingReset] = useState<boolean>(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const hasSavedDraft =
    isHydrated &&
    (store.experiences.length > 0 ||
      store.educations.length > 0 ||
      store.skills.length > 0 ||
      Boolean(store.summary?.trim()) ||
      Boolean(store.contact?.jobTitle?.trim()) ||
      Boolean(store.importedFileName));

  const activeTemplateName =
    CV_TEMPLATES.find((t) => t.id === store.activeTemplate)?.name || 'London';

  const draftTitle = (() => {
    const fullName = `${store.contact?.firstName || ''} ${store.contact?.lastName || ''}`.trim();
    const role = store.contact?.jobTitle?.trim();
    if (fullName && role) return `${fullName} · ${role}`;
    if (role) return role;
    if (fullName) return `${fullName}'s CV`;
    return 'Saved UK CV Draft';
  })();

  const handleStartFromScratch = () => {
    store.setStep(1);
    router.push('/builder');
  };

  const handleConfirmBlankReset = () => {
    store.resetCv();
    store.setStep(1);
    setConfirmingReset(false);
    router.push('/builder');
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 selection:bg-[#2563EB] selection:text-white">
      {/* Unified Mobile & Desktop Navigation Header */}
      <TopNav />

      {/* Main Onboarding Workspace */}
      <main className="flex-1 w-full max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-14 pb-12 sm:pb-20">
        {/* Smart Saved Draft Resume Banner (Client-hydrated from Zustand store) */}
        {hasSavedDraft && (
          <section
            aria-label="Resume saved CV draft"
            className="mb-6 sm:mb-8 rounded-2xl bg-white/66 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 ring-1 ring-slate-900/[0.04] shadow-[0_12px_36px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium text-slate-500 tabular-nums">
                <span className="font-semibold text-[#059669]">Saved in browser</span>
                <span aria-hidden="true">·</span>
                <span>{activeTemplateName} A4 layout</span>
                <span aria-hidden="true">·</span>
                <span>
                  {store.experiences.length}{' '}
                  {store.experiences.length === 1 ? 'role' : 'roles'}, {store.educations.length}{' '}
                  {store.educations.length === 1 ? 'qualification' : 'qualifications'}
                </span>
              </div>
              <p className="text-[15px] sm:text-base font-bold text-[#0B112C] truncate mt-1">
                {draftTitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {confirmingReset ? (
                <>
                  <button
                    type="button"
                    onClick={handleConfirmBlankReset}
                    className="min-h-[44px] px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-[13px] font-semibold inline-flex items-center justify-center transition-colors duration-150 cursor-pointer whitespace-nowrap"
                  >
                    Confirm Clear &amp; Start Blank
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingReset(false)}
                    className="min-h-[44px] px-3.5 rounded-xl border border-white/85 bg-white/70 hover:bg-white/95 backdrop-blur-md text-slate-700 text-xs sm:text-[13px] font-semibold inline-flex items-center justify-center transition-colors duration-150 cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => router.push('/builder')}
                    className="flex-1 sm:flex-initial min-h-[44px] px-5 rounded-xl bg-[#0B112C] hover:bg-slate-800 text-white text-[13.5px] font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-colors duration-150 cursor-pointer whitespace-nowrap"
                  >
                    <span>Continue Editing</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingReset(true)}
                    className="min-h-[44px] px-3.5 rounded-xl border border-white/85 bg-white/70 hover:bg-white/95 backdrop-blur-md ring-1 ring-slate-900/[0.04] text-slate-600 hover:text-slate-900 text-[13px] font-medium inline-flex items-center justify-center gap-1.5 transition-colors duration-150 cursor-pointer whitespace-nowrap"
                    title="Clear saved draft and begin with an empty CV"
                  >
                    <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                    <span>Start Fresh</span>
                  </button>
                </>
              )}
            </div>
          </section>
        )}

        {/* Editorial Onboarding Header */}
        <div className="max-w-2xl mb-7 sm:mb-10">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-[13px] font-medium text-slate-500 tabular-nums mb-2.5">
            <span className="font-semibold text-[#2563EB]">Step 1 of 3</span>
            <span aria-hidden="true">·</span>
            <span>Choose how to begin</span>
            <span aria-hidden="true">·</span>
            <span>Free ISO A4 PDF &amp; Word export</span>
          </div>

          <h1 className="text-[28px] sm:text-4xl lg:text-[42px] font-extrabold text-[#0B112C] tracking-tight leading-[1.15] [text-wrap:balance]">
            How would you like to build your UK CV?
          </h1>

          <p className="mt-2.5 sm:mt-3 text-[14.5px] sm:text-base text-slate-600 leading-relaxed max-w-[60ch]">
            Select the fastest starting point for your experience. Every pathway opens our live A4
            studio where you can switch templates, refine British wording, and download instantly.
          </p>
        </div>

        {/* 3 Primary Onboarding Pathways (Thumb-ergonomic stack on mobile, 3-col grid on desktop) */}
        <section
          aria-label="CV creation methods"
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch"
        >
          {/* Pathway 01: Build from scratch (Primary / Most Popular) */}
          <div className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/66 hover:bg-white/86 backdrop-blur-2xl backdrop-saturate-150 border border-blue-400/60 hover:border-[#2563EB] ring-1 ring-blue-500/10 shadow-[0_14px_40px_rgba(37,99,235,0.10),inset_0_1px_2px_rgba(255,255,255,0.95)] transition-all duration-200 p-5 sm:p-7">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 tabular-nums mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-[#2563EB]">01</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#0B112C]">Most popular</span>
                </div>
                <span>~3 mins</span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/12 border border-blue-400/25 text-[#2563EB] flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]">
                  <FileEdit className="w-6 h-6 stroke-[2.1]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0B112C] leading-snug">
                    Build from scratch
                  </h2>
                  <p className="text-xs sm:text-[13.5px] text-slate-500 mt-0.5">
                    Guided step-by-step British CV builder
                  </p>
                </div>
              </div>

              <p className="text-[14px] text-slate-600 leading-relaxed mb-5">
                Follow clear prompts for your personal statement, work history, qualifications, and
                skills with a real-time A4 preview beside you.
              </p>

              <ul className="space-y-2 text-[13px] text-slate-600 mb-6 pt-4 border-t border-white/75">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#059669] shrink-0 stroke-[2.4]" />
                  <span>Recruiter-approved UK section order</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#059669] shrink-0 stroke-[2.4]" />
                  <span>Built-in summary &amp; achievement phrasing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#059669] shrink-0 stroke-[2.4]" />
                  <span>Ideal for first CVs or career changes</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleStartFromScratch}
              className="w-full min-h-[48px] px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(37,99,235,0.28)] transition-all duration-150 cursor-pointer whitespace-nowrap"
            >
              <span>Start Blank CV</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Pathway 02: Upload existing CV */}
          <div className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/62 hover:bg-white/86 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 hover:border-blue-300/70 ring-1 ring-slate-900/[0.04] shadow-[0_12px_36px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] transition-all duration-200 p-5 sm:p-7">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 tabular-nums mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-slate-700">02</span>
                  <span aria-hidden="true">·</span>
                  <span>Fastest update</span>
                </div>
                <span>~1 min</span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/[0.06] border border-white/80 text-[#0B112C] flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]">
                  <FileUp className="w-6 h-6 stroke-[2.1]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0B112C] leading-snug">
                    Upload existing CV
                  </h2>
                  <p className="text-xs sm:text-[13.5px] text-slate-500 mt-0.5">
                    PDF, Word (.docx) or plain text file
                  </p>
                </div>
              </div>

              <p className="text-[14px] text-slate-600 leading-relaxed mb-5">
                Already have an older CV? Upload your document and we will extract your roles,
                dates, and qualifications into a modern A4 layout.
              </p>

              <ul className="space-y-2 text-[13px] text-slate-600 mb-6 pt-4 border-t border-white/75">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#059669] shrink-0 stroke-[2.4]" />
                  <span>Supports PDF, DOCX &amp; TXT documents</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#059669] shrink-0 stroke-[2.4]" />
                  <span>Upgrades outdated formatting for ATS</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#059669] shrink-0 stroke-[2.4]" />
                  <span>Review &amp; edit extracted details first</span>
                </li>
              </ul>
            </div>

            <Link
              href="/import"
              className="w-full min-h-[48px] px-5 rounded-xl border border-white/90 hover:border-slate-300 bg-white/72 hover:bg-white/95 backdrop-blur-md ring-1 ring-slate-900/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] active:scale-[0.98] text-[#0B112C] text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer whitespace-nowrap"
            >
              <span>Upload CV File</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Pathway 03: Import from LinkedIn */}
          <div className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/62 hover:bg-white/86 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 hover:border-[#0A66C2]/55 ring-1 ring-slate-900/[0.04] shadow-[0_12px_36px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] transition-all duration-200 p-5 sm:p-7">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 tabular-nums mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-[#0A66C2]">03</span>
                  <span aria-hidden="true">·</span>
                  <span>Profile sync</span>
                </div>
                <span>~1 min</span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0A66C2]/12 border border-[#0A66C2]/20 text-[#0A66C2] flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]">
                  <Linkedin className="w-6 h-6 stroke-[2.1]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0B112C] leading-snug">
                    Import from LinkedIn
                  </h2>
                  <p className="text-xs sm:text-[13.5px] text-slate-500 mt-0.5">
                    OAuth sign-in or LinkedIn profile PDF
                  </p>
                </div>
              </div>

              <p className="text-[14px] text-slate-600 leading-relaxed mb-5">
                Connect your LinkedIn account or paste your profile export to turn your online work
                history into a structured two-page British CV.
              </p>

              <ul className="space-y-2 text-[13px] text-slate-600 mb-6 pt-4 border-t border-white/75">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#059669] shrink-0 stroke-[2.4]" />
                  <span>Direct OAuth sync or PDF profile upload</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#059669] shrink-0 stroke-[2.4]" />
                  <span>Maps roles, education &amp; core skills</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#059669] shrink-0 stroke-[2.4]" />
                  <span>Converts dates to British CV format</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setIsLinkedInModalOpen(true)}
              className="w-full min-h-[48px] px-5 rounded-xl border border-[#0A66C2]/30 bg-[#0A66C2]/10 hover:bg-[#0A66C2] backdrop-blur-md text-[#0A66C2] hover:text-white active:scale-[0.98] text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer whitespace-nowrap"
            >
              <Linkedin className="w-4 h-4 shrink-0" />
              <span>Connect LinkedIn</span>
            </button>
          </div>
        </section>

        {/* Quick-Start UK Career Stage Template Selector */}
        <section
          aria-label="Start directly with a specialist UK template"
          className="mt-8 sm:mt-12 pt-8 sm:pt-10 border-t border-white/75"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 sm:mb-5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0B112C]">
                Prefer to choose a specialist UK layout first?
              </h2>
              <p className="text-xs sm:text-[13.5px] text-slate-500 mt-0.5">
                Jump straight into the builder with a template pre-configured for your sector or
                career stage.
              </p>
            </div>
            <Link
              href="/cv-templates"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
            >
              <span>Browse all 20+ templates</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {QUICK_UK_LAYOUTS.map((preset) => (
              <Link
                key={preset.id}
                href={`/builder?template=${preset.id}`}
                className="group min-h-[60px] p-3.5 sm:p-4 rounded-2xl bg-white/60 hover:bg-white/88 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 hover:border-[#2563EB]/70 ring-1 ring-slate-900/[0.04] shadow-[0_6px_22px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-150 flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="text-[13.5px] sm:text-sm font-bold text-[#0B112C] group-hover:text-[#2563EB] transition-colors truncate">
                    {preset.title}
                  </div>
                  <div className="text-[11.5px] text-slate-500 truncate mt-0.5">
                    {preset.subtitle}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all duration-150 shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Quiet UK Privacy & Standards Assurance Strip */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-white/75 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center text-xs text-slate-600">
          <span>No account required to start</span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span>Auto-saved privately in your browser</span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span>UK Equality Act &amp; ATS compliant A4 output</span>
        </div>
      </main>

      {/* Global Site Footer */}
      <Footer />

      {isLinkedInModalOpen && (
        <LinkedInImportModal
          isOpen={isLinkedInModalOpen}
          onClose={() => setIsLinkedInModalOpen(false)}
          onImportSuccess={() => router.push('/builder')}
        />
      )}
    </div>
  );
}
