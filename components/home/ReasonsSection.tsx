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
    bgColor: 'bg-purple-100/70',
  },
  {
    icon: ShieldCheck,
    title: 'ATS Friendly',
    desc: 'Get past ATS and increase your chances.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100/70',
  },
  {
    icon: Star,
    title: 'Professional Templates',
    desc: 'Modern, clean and industry specific templates.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100/70',
  },
  {
    icon: FileDown,
    title: 'Multiple Formats',
    desc: 'Download in PDF or DOCX.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100/70',
  },
  {
    icon: Cloud,
    title: 'Cloud Access',
    desc: 'Edit and access your CV anywhere, anytime.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100/70',
  },
  {
    icon: Users,
    title: 'Trusted by Millions',
    desc: '1+ million users and counting.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100/70',
  },
];

export default function ReasonsSection() {
  return (
    <section
      aria-label="6 Reasons to Create Your CV with Makemeyour"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-[#F6F9FF] to-white border-b border-slate-100 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/3 right-0 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-[#2563EB] text-xs font-semibold mb-3 shadow-[0_4px_16px_rgba(37,99,235,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)]">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="tracking-wide uppercase text-[11px]">WHY CHOOSE US</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B112C] tracking-tight leading-tight [text-wrap:balance]">
            6 Reasons to Create Your CV with Makemeyour
          </h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/75 hover:bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_36px_rgba(37,99,235,0.1)] hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 text-left"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-[#0B112C] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
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
