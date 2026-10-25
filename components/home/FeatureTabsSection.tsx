'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Check,
  Download,
  ShieldCheck,
  Sliders,
  Layers,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';

const HIGHLIGHTS = [
  'Modern, ATS-friendly templates',
  'Easy drag & drop customization',
  'Multiple export formats (PDF, DOCX)',
  'Cloud storage & access anywhere',
];

const SWATCHES = [
  '#2563EB',
  '#00B67A',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#0F172A',
];

export default function FeatureTabsSection() {
  const [selectedColor, setSelectedColor] = useState<string>('#2563EB');

  return (
    <section
      id="features"
      aria-label="Everything you need to land interviews"
      className="py-16 sm:py-24 bg-white border-b border-slate-100 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading, Subheading, Bullet Points */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="tracking-wide uppercase text-[11px]">POWERFUL &amp; EASY TO USE</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B112C] tracking-tight leading-[1.12] [text-wrap:balance]">
              Everything you need to land interviews{' '}
              <span className="text-[#2563EB]">in one place</span>
            </h2>

            {/* Subheading */}
            <p className="text-base text-slate-600 leading-[1.65]">
              Create, customize, and download your professional CV with our all-in-one builder. No design skills needed.
            </p>

            {/* Checklist */}
            <ul className="space-y-3.5 pt-2">
              {HIGHLIGHTS.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-800 font-medium text-sm sm:text-[15px]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/start"
                className="min-h-[48px] inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-sm hover:shadow transition-all whitespace-nowrap"
              >
                Start building for free
              </Link>
            </div>
          </div>

          {/* Right Column: App Window Mockup */}
          <div className="lg:col-span-7 relative">
            {/* Decorative background shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-sky-50 to-indigo-100/50 rounded-3xl transform -rotate-1 scale-102 filter blur-xs -z-10" />

            {/* Floating Pill 1: Beautiful Templates */}
            <div className="absolute -top-4 left-6 sm:left-10 z-20 px-3.5 py-1.5 rounded-full bg-white shadow-md border border-slate-100 text-xs font-bold text-slate-800 flex items-center gap-1.5 animate-bounce-subtle">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Beautiful Templates</span>
            </div>

            {/* Floating Pill 2: ATS Optimized */}
            <div className="absolute -bottom-3 right-6 sm:right-10 z-20 px-3.5 py-1.5 rounded-full bg-white shadow-md border border-slate-100 text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ATS Optimized</span>
            </div>

            {/* Main App Window Frame */}
            <div className="rounded-2xl bg-white shadow-[0_15px_40px_rgba(15,23,42,0.12)] border border-slate-200/90 overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="ml-2 text-xs font-semibold text-slate-700">
                    Emma Wilson - CV
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/builder"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-semibold transition-colors shadow-2xs"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </Link>
                </div>
              </div>

              {/* Window Body: Tool Sidebar + Live CV */}
              <div className="p-3 sm:p-5 bg-slate-100/60 flex gap-3 sm:gap-4">
                {/* Left Mini Sidebar with Palette & Icons */}
                <div className="w-14 sm:w-16 bg-white rounded-xl border border-slate-200 p-2 sm:p-2.5 flex flex-col items-center gap-3 shrink-0 shadow-2xs">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Colors</span>
                  <div className="flex flex-col gap-2">
                    {SWATCHES.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color }}
                        aria-label={`Select accent color ${color}`}
                        className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                          selectedColor === color ? 'ring-2 ring-slate-400 scale-125' : 'hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="w-full border-t border-slate-100 my-1" />
                  <div className="space-y-2 text-slate-500">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                      <Sliders className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Center CV Preview Sheet: Emma Wilson */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm text-left space-y-3.5 min-w-0">
                  {/* CV Header */}
                  <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0 relative border border-slate-200">
                      <Image
                        src="https://picsum.photos/seed/emma_wilson/120/120"
                        alt="Emma Wilson"
                        fill
                        sizes="48px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        Emma Wilson
                      </h3>
                      <p
                        className="text-xs font-semibold transition-colors mt-0.5"
                        style={{ color: selectedColor }}
                      >
                        Senior Product Designer
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5 text-slate-400" />
                          emma.wilson@example.com
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-slate-400" />
                          London, United Kingdom
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div>
                    <h4
                      className="text-[11px] font-bold uppercase tracking-wider mb-1"
                      style={{ color: selectedColor }}
                    >
                      Professional Summary
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-600 leading-relaxed">
                      Passionate and user-focused Product Designer with 6+ years of experience leading UI/UX initiatives for fintech and SaaS platforms. Proven track record of boosting conversion and retention through iterative user research and design systems.
                    </p>
                  </div>

                  {/* Work Experience */}
                  <div className="space-y-2">
                    <h4
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: selectedColor }}
                    >
                      Work Experience
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-900">
                        <span>Lead UX Designer · FinTech Global</span>
                        <span className="text-[10px] font-normal text-slate-400">2022 – Present</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-snug">
                        • Redesigned onboarding flow resulting in a 34% increase in completed user activations.
                      </p>
                      <p className="text-[10px] text-slate-600 leading-snug">
                        • Built scalable multi-brand design system deployed across web and mobile teams.
                      </p>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h4
                      className="text-[11px] font-bold uppercase tracking-wider mb-1"
                      style={{ color: selectedColor }}
                    >
                      Education
                    </h4>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-900">
                      <span>BSc (Hons) Human-Computer Interaction</span>
                      <span className="text-[10px] font-normal text-slate-400">2016 – 2020</span>
                    </div>
                    <p className="text-[10px] text-slate-500">University College London (First Class Honours)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
