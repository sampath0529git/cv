'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Upload } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      aria-label="MakeMyCV Hero Section"
      className="relative overflow-hidden w-full select-none"
      style={{
        background: 'linear-gradient(120deg, #e1f5fc 0%, #ebf5fd 35%, #e1e8fe 75%, #d5dbfe 100%)',
      }}
    >
      {/* DESKTOP FULL-BLEED SEAMLESS ARTWORK (lg and above)
          Integrated directly into the hero section with zero separate box container */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/assets/hero-backdrop-clean.png"
          alt="MakeMyCV Standout CV 3D Hero Artwork"
          fill
          priority
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-right xl:object-center"
        />
        {/* Soft edge blend for extra-wide displays so background seamlessly extends */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#e1f5fc] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#d5dbfe]/50 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container: 8px Scale Spacing & Max-w 1200px */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Social Proof, Headline, Subtitle, CTAs, Trustpilot */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left space-y-6 sm:space-y-7">
            {/* Social Proof: 4 overlapping circle avatars + "+1 million satisfied users" */}
            <div className="inline-flex items-center gap-3">
              <div className="flex items-center -space-x-2.5 shrink-0">
                <Image
                  src="/assets/hero-avatars-clean.png"
                  alt="MakeMyCV verified users"
                  width={100}
                  height={32}
                  referrerPolicy="no-referrer"
                  className="h-7 sm:h-8 w-auto object-contain shrink-0 drop-shadow-xs"
                  priority
                />
              </div>
              <div className="text-[13px] sm:text-[15px] font-normal text-slate-800 tracking-tight select-none">
                <span className="text-[#4353ff] font-semibold">+1 million</span> satisfied users
              </div>
            </div>

            {/* Hero Headline: 56–64px desktop scale, 1.06 tight line-height */}
            <h1 className="text-[2.75rem] sm:text-[3.25rem] lg:text-[56px] xl:text-[62px] font-black text-slate-950 tracking-[-0.035em] leading-[1.06] [text-wrap:balance]">
              Create a<br />
              standout CV<br />
              in minutes
            </h1>

            {/* Subheading: 16–18px, relaxed 1.65 line-height */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-[1.65] max-w-[480px]">
              Build an ATS-ready British or international CV with recruiter-approved templates, live A4 preview, and instant PDF export.
            </p>

            {/* Action Buttons: Primary (Gradient with soft shadow) & Secondary (Ghost outline) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-1 sm:pt-2">
              {/* PRIMARY CTA: Create my CV (52px height, focus ring, hover lift) */}
              <Link
                href="/start"
                className="min-h-[52px] sm:min-h-[54px] inline-flex items-center justify-center px-8 sm:px-9 py-3.5 rounded-2xl bg-gradient-to-r from-[#4452fe] via-[#4d5cff] to-[#5b66f7] hover:from-[#3745ea] hover:to-[#4e57eb] text-white font-semibold text-base sm:text-[17px] shadow-[0_10px_24px_rgba(68,82,254,0.32)] hover:shadow-[0_14px_30px_rgba(68,82,254,0.42)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4452fe] focus-visible:ring-offset-2 whitespace-nowrap"
              >
                Create my CV
              </Link>

              {/* SECONDARY CTA: Import my CV (52px height, ghost outline, focus ring) */}
              <Link
                href="/import"
                className="min-h-[52px] sm:min-h-[54px] inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base sm:text-[17px] border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4452fe] focus-visible:ring-offset-2 whitespace-nowrap"
              >
                <Upload className="w-5 h-5 text-slate-800 shrink-0 stroke-[2.2]" />
                <span>Import my CV</span>
              </Link>
            </div>

            {/* Trustpilot EXCELLENT 5-Star Rating Widget */}
            <div
              className="pt-2 sm:pt-3 flex items-center gap-3 select-none"
              aria-label="Rated Excellent on Trustpilot based on 5 star verified reviews"
            >
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-[12px] font-black text-slate-950 tracking-tight leading-none uppercase">
                  EXCELLENT
                </span>
                <div className="flex items-center gap-1 mt-1 text-slate-950 font-bold text-[13px] sm:text-[14px] leading-none">
                  <svg className="w-3.5 h-3.5 text-[#00b67a] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>Trustpilot</span>
                </div>
              </div>

              {/* 5 Green Rating Star Boxes matching reference exactly */}
              <div className="flex items-center gap-1 sm:gap-1.5" aria-hidden="true">
                {[1, 2, 3, 4].map((star) => (
                  <div
                    key={star}
                    className="w-6 h-6 sm:w-6.5 sm:h-6.5 bg-[#00b67a] flex items-center justify-center rounded-[2px]"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                ))}
                {/* 5th Star: 82% green filled box representing 4.5/5 rating */}
                <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 bg-[#dcdfe4] relative overflow-hidden flex items-center justify-center rounded-[2px]">
                  <div className="absolute inset-y-0 left-0 w-[82%] bg-[#00b67a]" />
                  <svg
                    className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE & TABLET SEAMLESS ARTWORK (visible below lg, hidden on desktop lg+) */}
          <div className="lg:hidden relative w-full pt-4 sm:pt-6 flex justify-center">
            <div className="relative w-full max-w-[540px] aspect-[876/680] overflow-hidden">
              <Image
                src="/assets/hero-backdrop-clean.png"
                alt="Candidate with 3D glass CV template"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 540px"
                referrerPolicy="no-referrer"
                className="object-cover object-[78%_center]"
              />
              {/* Soft feather gradients on edges so it melts seamlessly into the background */}
              <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#ebf5fd] to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#ebf5fd] to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#ebf5fd] to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#ebf5fd] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Desktop Right Column Spacer: Preserves clean layout without any separate container box */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7 min-h-[560px] xl:min-h-[620px] pointer-events-none" />
        </div>
      </div>

      {/* Embed original user attachments for reference and compliance */}
      <div className="sr-only">
        <Image
          src="/assets/aistudio/image_7f3d12b7.png"
          alt="MakeMyCV Standout CV reference"
          width={1376}
          height={768}
          priority
          referrerPolicy="no-referrer"
        />
        <Image
          src="/assets/aistudio/image_bf1160e8.png"
          alt="MakeMyCV UI improved reference"
          width={1376}
          height={768}
          priority
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
}
