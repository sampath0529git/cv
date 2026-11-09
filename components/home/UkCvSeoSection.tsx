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
import { BLOG_POSTS } from '@/data/blogPosts';
import { HOMEPAGE_UK_FAQS } from '@/data/homepageFaqs';

const UK_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'UK Equality Act Compliant',
    desc: 'Templates follow British hiring laws—no photos, date of birth, or marital status, safeguarding you against recruitment bias.',
  },
  {
    icon: FileCheck,
    title: 'A4 & ATS-Optimized Layouts',
    desc: 'Standard UK A4 page dimensions (210 × 297 mm) with machine-readable headings calibrated for British ATS systems.',
  },
  {
    icon: Award,
    title: 'British English Phrasing',
    desc: 'Built-in UK English spelling and grammar checks (e.g., organised, specialised) with recruiter-approved action verbs.',
  },
  {
    icon: Globe2,
    title: 'Europass CV & Vita CV Converter',
    desc: 'Quickly convert international Europass CV or vita CV profiles into high-scoring British corporate CV layouts.',
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
      className="relative py-16 sm:py-24 bg-white/18 border-b border-white/75 overflow-hidden"
    >
      {/* Soft ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-96 h-96 bg-blue-300/25 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-sky-300/22 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold tracking-wider uppercase text-[#2563EB] mb-2.5">
            British Employment Standards · CV Creator Free
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B112C] tracking-tight leading-tight [text-wrap:balance]">
            The #1 Free CV Creator Online &amp; CV Maker UK
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Crafting a job-winning curriculum vitae in the UK requires specific formatting, concise personal statements, and full ATS compatibility. freecvmakeruk.co.uk provides the premier <strong className="font-semibold text-slate-800">curriculum vitae maker free</strong> tool that UK professionals, graduates, and school leavers trust to secure interviews.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16">
          {UK_FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/60 hover:bg-white/84 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl p-6 border border-white/85 ring-1 ring-slate-900/[0.04] shadow-[0_12px_36px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/12 border border-blue-400/25 text-[#2563EB] flex items-center justify-center mb-4 shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]">
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

        {/* Comparison & Guide Card: UK CV vs Europass CV, Vita CV & US Resume */}
        <div className="mb-16 bg-white/64 backdrop-blur-2xl backdrop-saturate-150 rounded-3xl border border-white/85 ring-1 ring-slate-900/[0.04] p-6 sm:p-10 shadow-[0_16px_44px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]">
          <div className="max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B112C] tracking-tight">
              Why British Recruiters Prefer Our Free Online Resume Builder Over Generic Formats
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              When applying for jobs across London, Manchester, Birmingham, Edinburgh, and Leeds, using an international <strong className="font-semibold text-slate-800">europass cv</strong> or unformatted <strong className="font-semibold text-slate-800">vita cv</strong> can lead to immediate screening rejection. British recruitment teams expect:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-8">
            <div className="p-5 rounded-2xl bg-white/60 border border-white/80 ring-1 ring-slate-900/[0.03]">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Format Standard</span>
              <h4 className="text-base font-bold text-slate-900 mt-1 mb-2">UK CV Format vs Europass CV</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Europass formats often feature rigid European layouts and demographic data. Our <strong className="font-semibold text-slate-700">cv creator free</strong> tool adapts your history to the 2-page reverse-chronological standard expected by British employers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/60 border border-white/80 ring-1 ring-slate-900/[0.03]">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">ATS Optimization</span>
              <h4 className="text-base font-bold text-slate-900 mt-1 mb-2">Resume Builder Resume Precision</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our <strong className="font-semibold text-slate-700">free online resume builder</strong> structures headings, date ranges, and bullet points specifically to score maximum compatibility in Workday, Taleo, Greenhouse, and Reed ATS scanners.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/60 border border-white/80 ring-1 ring-slate-900/[0.03]">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Application Success</span>
              <h4 className="text-base font-bold text-slate-900 mt-1 mb-2">Curriculum Vitae C Strategy</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Searching for <strong className="font-semibold text-slate-700">curriculum vitae c</strong> guidance? Pair your ATS-friendly CV with tailored personal statement phrasing and bullet points that demonstrate measurable commercial value.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section with Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B112C]">
              Free CV Creator Online: Everything You Need to Know
            </h3>
          </div>

          <div className="space-y-3.5">
            {HOMEPAGE_UK_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/62 hover:bg-white/84 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl border border-white/85 ring-1 ring-slate-900/[0.04] overflow-hidden shadow-[0_8px_28px_rgba(15,23,42,0.05),inset_0_1px_2px_rgba(255,255,255,0.95)] transition-all duration-200"
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
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-white/75">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Featured UK CV Writing Guides Internal Link Strip */}
          {BLOG_POSTS.length > 0 && (
            <div className="mt-12 pt-10 border-t border-white/75">
              <div className="flex items-center justify-between gap-4 mb-5">
                <h4 className="text-lg sm:text-xl font-extrabold text-[#0B112C]">
                  Essential UK CV Writing Guides
                </h4>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm font-semibold text-[#2563EB] hover:underline whitespace-nowrap"
                >
                  View all guides &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {BLOG_POSTS.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group p-4 sm:p-5 rounded-2xl bg-white/62 hover:bg-white/88 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 hover:border-blue-400/70 ring-1 ring-slate-900/[0.04] shadow-[0_8px_28px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:shadow-[0_14px_34px_rgba(37,99,235,0.12)] transition-all flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                        <span className="font-semibold text-[#2563EB]">{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h5 className="text-sm font-bold text-[#0B112C] group-hover:text-[#2563EB] transition-colors mt-1 leading-snug line-clamp-2">
                        {post.seoTitle}
                      </h5>
                    </div>
                    <span className="text-xs font-semibold text-[#2563EB] inline-flex items-center gap-1">
                      <span>Read article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick CTA Prompt */}
          <div className="mt-10 p-6 rounded-2xl bg-white/68 backdrop-blur-2xl backdrop-saturate-150 border border-white/90 ring-1 ring-slate-900/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_12px_36px_rgba(37,99,235,0.09),inset_0_1px_2px_rgba(255,255,255,0.95)] text-center sm:text-left">
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
