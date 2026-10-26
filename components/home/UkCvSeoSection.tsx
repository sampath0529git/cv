'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Award,
  Globe2,
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const UK_FAQS: FaqItem[] = [
  {
    question: 'Is freecvmakeruk.co.uk really a free CV maker in the UK?',
    answer:
      'Yes, 100%. freecvmakeruk.co.uk is a completely free CV maker UK jobseekers can use to build, format, and download job-winning CVs. There are no hidden paywalls, credit card demands, or surprise fees when downloading your finished PDF or Word document.',
  },
  {
    question: 'Does this free CV maker support standard UK CV formats?',
    answer:
      'Every template is crafted to meet British employment standards. This includes the standard 2-page reverse-chronological layout, structured personal statements, UK date conventions, and bias-free structures aligned with the UK Equality Act 2010 (no photo, marital status, or date of birth required).',
  },
  {
    question: 'Will my UK CV pass ATS scanners used by British recruiters?',
    answer:
      'Yes. Our templates are engineered to pass through Applicant Tracking Systems (ATS) used by major UK recruiters and job boards such as Reed.co.uk, Indeed UK, Totaljobs, CV-Library, and LinkedIn UK.',
  },
  {
    question: 'What is the main difference between a UK CV and a US Resume?',
    answer:
      'In the UK, "CV" is the standard term (short for Curriculum Vitae), typically 2 pages long, featuring a punchy Personal Profile / Summary at the top, chronological employment history with measurable achievements, and key skills. Unlike European or international CVs, photos and personal demographics should be omitted for UK job applications.',
  },
  {
    question: 'Can I download my finished UK CV as a PDF for free?',
    answer:
      'Yes. You can instantly export your completed CV in high-resolution, ATS-compliant A4 PDF format suitable for direct emailing to UK hiring managers or uploading to British job portals.',
  },
];

const UK_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'UK Equality Act Compliant',
    desc: 'Templates follow British hiring laws—no photos, date of birth, or gender required, protecting you against unconscious bias.',
  },
  {
    icon: FileCheck,
    title: 'A4 & ATS-Optimized Layouts',
    desc: 'Standard UK A4 page dimensions with machine-readable headings calibrated for British ATS systems.',
  },
  {
    icon: Award,
    title: 'British English Phrasing',
    desc: 'Built-in UK English spelling and grammar checks (e.g., organised, specialised) with recruiter-approved action verbs.',
  },
  {
    icon: Globe2,
    title: 'Tested on Leading UK Job Boards',
    desc: 'Formatted specifically for flawless uploads to Reed.co.uk, CV-Library, Totaljobs, and Indeed UK.',
  },
];

export default function UkCvSeoSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      aria-label="Free CV Maker UK Guide & FAQ"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white border-b border-slate-200/80 overflow-hidden"
    >
      {/* Soft ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-[#2563EB] text-xs font-semibold mb-3 shadow-[0_4px_16px_rgba(37,99,235,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)]">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="tracking-wide uppercase text-[11px]">UK JOB MARKET STANDARD</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B112C] tracking-tight leading-tight [text-wrap:balance]">
            The #1 Free CV Maker UK for Jobseekers
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Crafting a job-winning CV in the UK requires specific formatting, concise personal statements, and full ATS compatibility. freecvmakeruk.co.uk provides the premier free CV maker UK professionals trust to secure interviews.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16">
          {UK_FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/75 hover:bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_36px_rgba(37,99,235,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50/90 text-[#2563EB] flex items-center justify-center mb-4 shrink-0 shadow-2xs">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* FAQ Section with Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B112C]">
              Free CV Maker UK: Everything You Need to Know
            </h3>
          </div>

          <div className="space-y-3.5">
            {UK_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/75 hover:bg-white/90 backdrop-blur-xl rounded-2xl border border-white/80 overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-[#2563EB] transition-colors cursor-pointer"
                  >
                    <span className="text-[15px] sm:text-base leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#2563EB]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100/80">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick CTA Prompt */}
          <div className="mt-10 p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_8px_30px_rgba(37,99,235,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] text-center sm:text-left">
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Ready to land your dream UK role?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Build your ATS-friendly UK CV today in under 5 minutes with our free CV builder.
              </p>
            </div>
            <Link
              href="/start"
              className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold inline-flex items-center gap-2 shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all whitespace-nowrap"
            >
              <span>Build Free UK CV</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
