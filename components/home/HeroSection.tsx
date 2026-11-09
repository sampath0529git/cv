'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Upload, Check, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      aria-label="freecvmakeruk.co.uk Hero"
      className="relative overflow-hidden w-full bg-gradient-to-b from-blue-100/35 via-white/25 to-white/10 pt-4 sm:pt-10 lg:pt-14 pb-8 sm:pb-16 lg:pb-20 border-b border-white/75"
    >
      {/* Multi-layered soft ambient glass glows */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[640px] h-[640px] bg-gradient-to-br from-blue-400/30 via-indigo-300/25 to-purple-300/20 rounded-full blur-3xl pointer-events-none -translate-y-1/4 translate-x-1/5"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-sky-300/30 to-emerald-200/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/4"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Value Prop, Headline, Subtitle, CTAs, Social Proof */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Frosted Glass Badge: CV CREATOR FREE · UK CV MAKER */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.02, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 text-[#2563EB] text-[10.5px] sm:text-xs font-semibold shadow-[0_4px_16px_rgba(37,99,235,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)]"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2563EB]" />
              <span className="tracking-wide uppercase text-[10px] sm:text-[11px]">
                CV CREATOR FREE · #1 FREE CV CREATOR ONLINE &amp; CV MAKER UK
              </span>
            </motion.div>

            {/* Main Headline (Audited Technical SEO H1 with Seed Keywords) */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[30px] xs:text-[34px] sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold text-[#0B112C] tracking-tight leading-[1.12] sm:leading-[1.08] [text-wrap:balance]"
            >
              CV Creator Free:{' '}
              <span className="text-[#0EA5E9] bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#00B67A] bg-clip-text text-transparent">
                Build a Standout UK Curriculum Vitae Online
              </span>
            </motion.h1>

            {/* Subheading: Keyword optimized with all target keywords */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-[14px] sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed sm:leading-[1.65] max-w-[540px]"
            >
              Welcome to <strong className="font-semibold text-slate-800">freecvmakeruk.co.uk</strong> — the trusted <strong className="font-semibold text-slate-800">curriculum vitae maker free</strong> of hidden paywalls. As the leading <strong className="font-semibold text-slate-800">free cv creator online</strong> and <strong className="font-semibold text-slate-800">cv maker uk</strong> platform, our <strong className="font-semibold text-slate-800">free online resume builder</strong> helps you craft an ATS-compliant British A4 CV or convert an international <strong className="font-semibold text-slate-800">europass cv</strong> or <strong className="font-semibold text-slate-800">vita cv</strong> in minutes with instant PDF and Word export.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto pt-0.5 sm:pt-2"
            >
              <Link
                href="/start"
                className="min-h-[46px] sm:min-h-[52px] inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-[15px] sm:text-base shadow-[0_8px_24px_rgba(37,99,235,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>Create My Free CV</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/import"
                className="min-h-[44px] sm:min-h-[52px] inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-3.5 rounded-full bg-white/62 hover:bg-white/88 backdrop-blur-2xl backdrop-saturate-150 text-slate-800 font-semibold text-[14px] sm:text-base border border-white/85 ring-1 ring-slate-900/[0.04] shadow-[0_8px_28px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.12)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/12 border border-blue-400/25 text-[#2563EB] flex items-center justify-center">
                  <Upload className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
                </div>
                <span>Import Existing CV</span>
              </Link>
            </motion.div>

            {/* Keyword Quick Intent Strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 pt-1"
            >
              <span className="font-semibold text-slate-700">Quick Tools:</span>
              <Link href="/cv-templates/ats-friendly" className="hover:text-[#2563EB] underline decoration-slate-300 underline-offset-2">
                Resume Builder Resume
              </Link>
              <span className="text-slate-300">·</span>
              <Link href="/import" className="hover:text-[#2563EB] underline decoration-slate-300 underline-offset-2">
                Europass CV Converter
              </Link>
              <span className="text-slate-300">·</span>
              <Link href="/cv-templates" className="hover:text-[#2563EB] underline decoration-slate-300 underline-offset-2">
                Vita CV &amp; Curriculum Vitae C Guide
              </Link>
            </motion.div>

              {/* Social Proof: Frosted Glass Capsule */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="pt-1 sm:pt-3"
              >
                <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 ring-1 ring-slate-900/[0.04] rounded-2xl px-3.5 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]">
                  <div className="flex items-center -space-x-2 shrink-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative shadow-xs">
                      <Image
                        src="https://picsum.photos/seed/user1/100/100"
                        alt="UK jobseeker hired using freecvmakeruk.co.uk"
                        fill
                        sizes="32px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative shadow-xs">
                      <Image
                        src="https://picsum.photos/seed/user2/100/100"
                        alt="British graduate candidate on freecvmakeruk.co.uk"
                        fill
                        sizes="32px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative shadow-xs">
                      <Image
                        src="https://picsum.photos/seed/user3/100/100"
                        alt="UK professional CV builder user"
                        fill
                        sizes="32px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="text-[11.5px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                      Join 1M+ happy users
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500">
                        4.8/5 average rating
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Visual with Candidate & Layered CV Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 xl:col-span-6 relative flex justify-center items-center w-full mt-2 lg:mt-0"
            >
              <div className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-[16/11] sm:aspect-[1.15/1] flex items-center justify-center rounded-3xl bg-white/44 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 ring-1 ring-slate-900/[0.04] p-2.5 sm:p-4 shadow-[0_20px_54px_rgba(37,99,235,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)]">
                {/* Background Soft Pastel Halo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/35 via-sky-300/30 to-indigo-300/35 rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

                {/* Candidate Composition Artwork */}
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                  <Image
                    src="/assets/hero-backdrop-clean.png"
                    alt="Free CV maker UK - Professional candidate with recruiter-approved UK CV templates"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-contain object-center drop-shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Floating Badge: Frosted Smoked Glass Aesthetic */}
                <div className="absolute top-3 sm:top-6 right-2.5 sm:right-5 z-20 px-3 sm:px-4 py-1.5 rounded-full bg-[#080E24]/80 backdrop-blur-2xl backdrop-saturate-150 text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 shadow-[0_10px_32px_rgba(8,14,36,0.35),inset_0_1px_1px_rgba(255,255,255,0.28)] border border-white/20">
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 stroke-[3]" />
                  <span>Professional &amp; Modern</span>
                </div>

                {/* Hand-drawn style note with playful curved arrow */}
                <div className="absolute bottom-1 sm:bottom-4 right-0 sm:right-2 z-20 flex flex-col items-end text-right select-none pointer-events-none">
                  <span className="text-[11px] sm:text-sm font-medium text-slate-600 italic tracking-tight font-sans">
                    Your dream job<br />
                    is closer than you think
                  </span>
                  <svg
                    className="w-9 h-5 sm:w-12 sm:h-6 text-slate-400 mr-1 sm:mr-2 mt-0.5"
                    viewBox="0 0 50 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 20C18 24 35 18 42 6M42 6L37 7M42 6L40 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  );
}
