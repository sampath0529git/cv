'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { useCvStore } from '@/store/useCvStore';

interface TemplateCardData {
  id: string;
  name: string;
  category: string;
  tag: string;
  image: string;
  accent: string;
}

const TEMPLATE_CATEGORIES = [
  'All Templates',
  'Academic',
  'Corporate',
  'Creative',
  'Tech',
  'Medical',
];

const DISPLAY_TEMPLATES: TemplateCardData[] = [
  {
    id: 'toronto',
    name: 'Modern Blue',
    category: 'Corporate',
    tag: 'Corporate',
    image: 'https://picsum.photos/seed/cv_modern_blue/400/560',
    accent: '#2563EB',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Corporate',
    tag: 'Professional',
    image: 'https://picsum.photos/seed/cv_minimal/400/560',
    accent: '#0F172A',
  },
  {
    id: 'tech',
    name: 'Creative',
    category: 'Creative',
    tag: 'Creative',
    image: 'https://picsum.photos/seed/cv_creative/400/560',
    accent: '#7C3AED',
  },
  {
    id: 'classic',
    name: 'Classic',
    category: 'Academic',
    tag: 'Academic',
    image: 'https://picsum.photos/seed/cv_classic/400/560',
    accent: '#0284C7',
  },
  {
    id: 'executive',
    name: 'Tech Executive',
    category: 'Tech',
    tag: 'Tech',
    image: 'https://picsum.photos/seed/cv_tech/400/560',
    accent: '#059669',
  },
  {
    id: 'graduate',
    name: 'Medical Specialist',
    category: 'Medical',
    tag: 'Medical',
    image: 'https://picsum.photos/seed/cv_medical/400/560',
    accent: '#DC2626',
  },
];

const TEMPLATE_PERKS = [
  'ATS-friendly design',
  'Fully customizable',
  'Professional & modern layouts',
  'Multiple color options',
];

export default function TemplatesSection() {
  const router = useRouter();
  const setStoreTemplate = useCvStore((state) => state.setTemplate);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Templates');

  const filteredTemplates =
    selectedCategory === 'All Templates'
      ? DISPLAY_TEMPLATES.slice(0, 4)
      : DISPLAY_TEMPLATES.filter(
          (t) => t.category.toLowerCase() === selectedCategory.toLowerCase()
        ).length > 0
      ? DISPLAY_TEMPLATES.filter(
          (t) => t.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      : DISPLAY_TEMPLATES.slice(0, 4);

  const handleSelectTemplate = (templateId: string) => {
    setStoreTemplate(templateId as any);
    router.push('/start');
  };

  return (
    <section
      id="templates"
      aria-label="Professional Academic & Corporate CV Templates"
      className="py-16 sm:py-24 bg-[#080E24] text-white relative overflow-hidden"
    >
      {/* Background subtle radial gradient */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-left mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="tracking-wide uppercase text-[11px]">PROFESSIONAL TEMPLATES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Professional Academic &amp; Corporate CV Templates
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl font-normal leading-relaxed">
            Choose from a wide range of modern and professional templates for every industry and career stage.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-8">
          {TEMPLATE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400'
                    : 'bg-white/10 hover:bg-white/15 text-slate-300 border border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Main Grid: 4 Template Cards + Right Side "Why Choose" Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 4 Cards: Spans 9 or 8 cols on desktop */}
          <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className="group relative rounded-2xl bg-[#0D1533] border border-white/10 hover:border-blue-400/50 p-2.5 transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-lg"
              >
                {/* CV Visual Thumbnail with CSS document preview fallback */}
                <div className="relative w-full aspect-[210/297] rounded-xl overflow-hidden bg-white shadow-inner mb-3">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 220px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top document styling overlay for realistic CV look */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-950/70 backdrop-blur-2xs flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-center">
                    <Eye className="w-5 h-5 text-blue-300" />
                    <span className="text-[11px] font-bold text-white bg-[#2563EB] px-3 py-1 rounded-full shadow-xs">
                      Use Template
                    </span>
                  </div>
                </div>

                {/* Card Title & Category Tag */}
                <div className="px-1 pb-1 text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                    {template.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 capitalize">
                    {template.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side "Why choose our templates?" card */}
          <div className="lg:col-span-4 xl:col-span-3 rounded-2xl bg-[#0D1533]/80 border border-white/10 p-6 flex flex-col justify-between text-left">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                Why choose our templates?
              </h3>

              <ul className="space-y-3 mb-6">
                {TEMPLATE_PERKS.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/templates"
              className="w-full min-h-[44px] px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#00B67A] hover:opacity-95 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] whitespace-nowrap"
            >
              <span>Browse All Templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
