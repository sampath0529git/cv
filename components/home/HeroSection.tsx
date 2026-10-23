'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import HeroVisual from './HeroVisual';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#eef2ff] pt-10 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative top background ribbons matching reference */}
      <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none opacity-60">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Avatars, Headings, CTAs, Trustpilot */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6 lg:space-y-7 lg:pr-2 z-10">
            {/* +1 million satisfied users badge with authentic avatar strip */}
            <div className="inline-flex items-center gap-3">
              <Image
                src="/assets/hero-avatars-clean.png"
                alt="Satisfied users"
                width={88}
                height={28}
                className="h-7 w-auto object-contain"
                priority
              />
              <div className="text-[15px] font-normal text-slate-800 tracking-tight">
                <span className="text-[#4a4df2] font-semibold">+1 million</span> satisfied users
              </div>
            </div>

            {/* Main Headline - exact 3-line format */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-bold text-slate-950 tracking-tight leading-[1.08]">
              Create a perfect<br />
              CV in minutes with<br />
              AI
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-[18px] text-slate-600 font-normal leading-relaxed max-w-lg">
              Create a CV in just a few minutes with our recruiter approved templates and our AI assistant.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <Link
                href="#cv-builder-section"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#4a4df2] hover:bg-[#3d40e0] text-white font-semibold text-[17px] transition-all shadow-xs hover:shadow-md active:scale-[0.99]"
              >
                Create my CV
              </Link>

              <Link
                href="#cv-builder-section"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-[17px] border border-slate-200 transition-colors shadow-2xs hover:shadow-xs"
              >
                {/* Tray Download/Import Icon */}
                <svg
                  className="w-5 h-5 text-slate-900"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Import my CV</span>
              </Link>
            </div>

            {/* Trustpilot Strip */}
            <div className="pt-2 flex items-center">
              <Image
                src="/assets/hero-trustpilot.png"
                alt="EXCELLENT 4.5 out of 5 on Trustpilot"
                width={440}
                height={45}
                className="h-7 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Column: Hero Visual with Animated CV Templates and Transparent Candidate */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end w-full">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

