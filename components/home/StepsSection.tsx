'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  LayoutTemplate,
  FileEdit,
  SlidersHorizontal,
  DownloadCloud,
  ArrowRight,
  ChevronRight,
  Rocket,
  ShieldCheck,
  Smartphone,
  Heart,
} from 'lucide-react';

const STEPS = [
  {
    step: 1,
    title: '1. Choose a Template',
    description: 'Pick from our collection of modern and professional templates.',
    icon: LayoutTemplate,
    color: '#00B67A',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconColor: 'text-emerald-600',
  },
  {
    step: 2,
    title: '2. Add Your Information',
    description: 'Fill in your details, experience, skills and more.',
    icon: FileEdit,
    color: '#2563EB',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    step: 3,
    title: '3. Customize & Preview',
    description: 'Make it your own with easy customization options.',
    icon: SlidersHorizontal,
    color: '#8B5CF6',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
  },
  {
    step: 4,
    title: '4. Download & Apply',
    description: 'Get your CV in PDF or DOCX and start applying!',
    icon: DownloadCloud,
    color: '#F59E0B',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-600',
  },
];

const TRUST_METRICS = [
  {
    icon: Rocket,
    title: 'Save Time',
    desc: 'Create your CV in minutes, no design skills needed.',
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
  },
  {
    icon: ShieldCheck,
    title: 'ATS Ready',
    desc: 'Designed to pass ATS scanners guaranteed.',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
  {
    icon: Smartphone,
    title: 'Access Anywhere',
    desc: 'Edit on any device, browser or phone.',
    iconColor: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-100',
  },
  {
    icon: Heart,
    title: 'Loved by Millions',
    desc: 'Loved by millions of job seekers worldwide.',
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
];

export default function StepsSection() {
  return (
    <section
      id="how-it-works"
      aria-label="Create your CV in 4 steps"
      className="relative py-16 sm:py-24 bg-white/15 border-b border-white/70 overflow-hidden"
    >
      {/* Ambient background glows for glass refraction */}
      <div
        aria-hidden="true"
        className="absolute top-1/5 right-0 w-[440px] h-[440px] bg-blue-300/30 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/5 left-0 w-[440px] h-[440px] bg-indigo-300/25 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold tracking-wider uppercase text-[#2563EB] mb-2.5">
            Fast British CV Workflow
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B112C] tracking-tight leading-tight [text-wrap:balance]">
            Create your CV in 4 steps
          </h2>
        </div>

        {/* 4 Steps Grid with Connectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative flex flex-col">
                <div className="h-full bg-white/60 hover:bg-white/84 backdrop-blur-2xl backdrop-saturate-150 rounded-3xl p-6 sm:p-7 border border-white/85 ring-1 ring-slate-900/[0.04] shadow-[0_12px_36px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_18px_44px_rgba(37,99,235,0.13)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start text-left">
                  {/* Icon Box */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${s.bgColor} ${s.iconColor} border ${s.borderColor} backdrop-blur-md flex items-center justify-center mb-5 shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]`}
                  >
                    <Icon className="w-7 h-7 stroke-[2.2]" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0B112C] mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Connector Arrow (Desktop Only between cards) */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/[0.05] text-slate-500 items-center justify-center shadow-xs">
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Center CTA Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/start"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all duration-200"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trust Metrics Section: "Why 1+ million users trust freecvmakeruk.co.uk" */}
        <div className="mt-20 sm:mt-24 pt-16 border-t border-white/70">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B112C] tracking-tight [text-wrap:balance]">
              Why 1+ million users trust freecvmakeruk.co.uk
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
              Simple. Fast. Professional. Here&apos;s what our users love about us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {TRUST_METRICS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/60 hover:bg-white/84 backdrop-blur-2xl backdrop-saturate-150 rounded-3xl p-6 sm:p-7 border border-white/85 ring-1 ring-slate-900/[0.04] shadow-[0_12px_36px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.11)] hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-start"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.bgColor} ${item.iconColor} border ${item.borderColor} flex items-center justify-center mb-4 shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]`}
                  >
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h4 className="text-base font-bold text-[#0B112C] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
