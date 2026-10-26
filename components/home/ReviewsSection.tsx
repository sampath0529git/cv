'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  company?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Assistant',
    company: 'Fintech London',
    image: 'https://picsum.photos/seed/sarah_johnson/120/120',
    quote:
      'freecvmakeruk.co.uk made my CV look so professional! I got 3 interview calls within a week. Highly recommended!',
  },
  {
    id: 2,
    name: 'David Thorne',
    role: 'Full Stack Engineer',
    company: 'CloudTech Solutions',
    image: 'https://picsum.photos/seed/david_thorne/120/120',
    quote:
      'The ATS compliance scoring and clean formatting saved me hours of stress. Landed an offer 2 weeks later!',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Financial Analyst',
    company: 'Investment Partners',
    image: 'https://picsum.photos/seed/elena_rostova/120/120',
    quote:
      'The modern corporate template was exactly what banking recruiters wanted. Exporting to 300 DPI PDF was seamless.',
  },
];

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section
      aria-label="Real Stories and Reviews"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-[#FAFBFD] via-[#F4F7FE] to-white border-b border-slate-100 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-amber-100/35 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subhead, CTA */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-[#2563EB] text-xs font-semibold shadow-[0_4px_16px_rgba(37,99,235,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)]">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="tracking-wide uppercase text-[11px]">REAL STORIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B112C] tracking-tight leading-tight [text-wrap:balance]">
              Join thousands who landed their dream jobs
            </h2>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-md">
              See what UK jobseekers have to say about their experience with freecvmakeruk.co.uk.
            </p>

            <div className="pt-2">
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm sm:text-base shadow-[0_6px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_26px_rgba(37,99,235,0.4)] transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Create Your CV</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Testimonial Card with Navigation */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 hover:bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-9 border border-white/90 shadow-[0_8px_32px_rgba(15,27,77,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] relative flex flex-col sm:flex-row items-center sm:items-start gap-6 text-left transition-all duration-300">
              {/* User Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative shadow-xs">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1 min-w-0 space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed italic">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {current.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {current.role}
                  </p>
                </div>
              </div>

              {/* Prev / Next Chevrons on Right Side */}
              <div className="flex sm:flex-col items-center gap-2 shrink-0 pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === i ? 'w-6 bg-[#2563EB]' : 'w-2 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
