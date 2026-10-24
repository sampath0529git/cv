'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Upload, ArrowRight } from 'lucide-react';
import HeroVisual from './HeroVisual';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#eef2ff] pt-7 pb-10 sm:pt-11 sm:pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle decorative background lines */}
      <div className="hidden sm:block absolute top-0 right-0 w-[55%] h-full pointer-events-none opacity-60">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full object-cover stroke-[#cbd5e1] fill-none"
          strokeWidth="1.5"
        >
          <path d="M400,20 C500,80 620,10 680,120 C740,230 650,300 700,420" />
          <path d="M480,-20 C560,110 520,240 640,320 C760,400 750,550 780,620" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-8 items-center">
          {/* Left Column: Social Proof, Headline, Subheading, Primary & Secondary CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-4 sm:space-y-6 lg:space-y-7 lg:pr-2 z-10">
            {/* +1 million satisfied users with avatar strip */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3">
              <Image
                src="/assets/hero-avatars-clean.png"
                alt="Satisfied users"
                width={88}
                height={28}
                referrerPolicy="no-referrer"
                className="h-6 sm:h-7 w-auto object-contain shrink-0"
                priority
              />
              <div className="text-xs sm:text-[15px] font-normal text-slate-800 tracking-tight tabular-nums">
                <span className="text-[#4a4df2] font-semibold">+1 million</span> satisfied users
              </div>
            </div>

            {/* Responsive Balanced Headline */}
            <h1 className="text-[2.15rem] sm:text-5xl lg:text-[4rem] font-bold text-slate-950 tracking-tight leading-[1.08] [text-wrap:balance] max-w-xl">
              Create a standout CV in minutes
            </h1>

            {/* Subhead */}
            <p className="text-[15px] sm:text-[18px] text-slate-600 font-normal leading-relaxed max-w-lg">
              Build an ATS-ready British or international CV with recruiter-approved templates, live A4 preview, and instant PDF export.
            </p>

            {/* Primary & Secondary Action Buttons — Full-Width Ergonomic Hitboxes on Mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto pt-1 sm:pt-2">
              <Link
                href="/start"
                className="min-h-[50px] sm:min-h-[54px] inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-xl bg-[#4a4df2] hover:bg-[#3d40e0] text-white font-semibold text-base sm:text-[17px] transition-all shadow-[0_6px_18px_rgba(74,77,242,0.24)] hover:shadow-md active:scale-[0.99] whitespace-nowrap"
              >
                <span>Create my CV</span>
                <ArrowRight className="w-4 h-4 sm:hidden shrink-0" />
              </Link>

              <Link
                href="/import"
                className="min-h-[50px] sm:min-h-[54px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base sm:text-[17px] border border-slate-200/95 transition-colors shadow-2xs hover:shadow-xs active:scale-[0.99] whitespace-nowrap"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800 shrink-0" />
                <span>Import my CV</span>
              </Link>
            </div>

            {/* Trustpilot Strip — Responsive width so narrow phones never overflow */}
            <div className="pt-1 sm:pt-2 flex items-center w-full">
              <Image
                src="/assets/hero-trustpilot.png"
                alt="EXCELLENT 4.5 out of 5 on Trustpilot"
                width={440}
                height={45}
                referrerPolicy="no-referrer"
                className="h-auto max-h-6 sm:max-h-7 w-auto max-w-[265px] sm:max-w-[360px] object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Column: Hero Visual with Animated CV Templates and Candidate */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end w-full">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
