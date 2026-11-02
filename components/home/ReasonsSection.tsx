'use client';

import React from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Star,
  FileDown,
  Cloud,
  Users,
} from 'lucide-react';

const REASONS = [
  {
    icon: Zap,
    title: 'Easy to Use',
    desc: 'No design skills needed. Create your CV in minutes.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/12 border-purple-400/25',
  },
  {
    icon: ShieldCheck,
    title: 'ATS Friendly',
    desc: 'Get past ATS and increase your chances.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/12 border-emerald-400/25',
  },
  {
    icon: Star,
    title: 'Professional Templates',
    desc: 'Modern, clean and industry specific templates.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/12 border-blue-400/25',
  },
  {
    icon: FileDown,
    title: 'Multiple Formats',
    desc: 'Download in PDF or DOCX.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-500/12 border-indigo-400/25',
  },
  {
    icon: Cloud,
    title: 'Cloud Access',
    desc: 'Edit and access your CV anywhere, anytime.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/12 border-amber-400/25',
  },
  {
    icon: Users,
    title: 'Trusted by Millions',
    desc: '1+ million users and counting.',
    color: 'text-sky-600',
    bgColor: 'bg-sky-500/12 border-sky-400/25',
  },
];

export default function ReasonsSection() {
  return (
    <section
      aria-label="6 Reasons to Create Your CV with freecvmakeruk.co.uk"
      className="relative py-16 sm:py-24 bg-white/18 border-b border-white/70 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-0 w-96 h-96 bg-blue-300/25 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-300/25 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold tracking-wider uppercase text-[#2563EB] mb-2.5">
            Why UK Candidates Choose Us
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B112C] tracking-tight leading-tight [text-wrap:balance]">
            6 Reasons to Create Your CV with freecvmakeruk.co.uk
          </h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/60 hover:bg-white/84 backdrop-blur-2xl backdrop-saturate-150 rounded-3xl p-6 border border-white/85 ring-1 ring-slate-900/[0.04] shadow-[0_12px_36px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_18px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 text-left"
              >
                <div
                  className={`w-12 h-12 rounded-2xl border ${item.bgColor} ${item.color} backdrop-blur-md flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-[#0B112C] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
