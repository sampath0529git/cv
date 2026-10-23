'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function TemplatesSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < 1 ? prev + 1 : 0));
  };

  return (
    <section id="templates-section" className="py-20 md:py-28 bg-[#090d1f] text-white relative overflow-hidden">
      {/* Subtle curved background overlay */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-[#0d122e]/60 rounded-t-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title and Arrows */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Choose your professional CV template
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            All our CV templates are approved by recruiters.
          </p>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors border border-slate-700"
              aria-label="Previous template"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors border border-slate-700"
              aria-label="Next template"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 CV Templates Row matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Template 1: Classic Two-Column */}
          <div className="group rounded-xl bg-white shadow-xl overflow-hidden aspect-[1/1.42] flex flex-col text-slate-900 text-left select-none relative hover:ring-2 hover:ring-[#3b5bfd] transition-all">
            <div className="flex flex-1">
              {/* Left Column (Light Grey) */}
              <div className="w-[38%] bg-[#f4f5f8] p-3 text-[7.5px] space-y-3 border-r border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="text-[7px] text-slate-500 mb-1 leading-tight">
                    <div>07700 900077</div>
                    <div>elsa.monet@example.co.uk</div>
                    <div>London, UK</div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="font-bold uppercase tracking-wider text-slate-700 text-[8px]">
                      Skills
                    </div>
                    <div className="text-slate-600 space-y-0.5">
                      <div>&bull; Client Styling</div>
                      <div>&bull; POS Management</div>
                      <div>&bull; Visual Merchandising</div>
                      <div>&bull; Luxury Customer Care</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="font-bold uppercase tracking-wider text-slate-700 text-[8px]">
                      Languages
                    </div>
                    <div className="text-slate-600 space-y-0.5">
                      <div>English (Native)</div>
                      <div>French (Fluent)</div>
                      <div>Spanish (Basic)</div>
                    </div>
                  </div>
                </div>

                <div className="text-[6.5px] text-slate-400">
                  Referees available on request
                </div>
              </div>

              {/* Right Column (White) */}
              <div className="w-[62%] p-3.5 space-y-2.5">
                {/* Header */}
                <div className="border-b border-slate-200 pb-2">
                  <div className="font-extrabold text-[12px] text-slate-900 tracking-tight">
                    Elsa Monet
                  </div>
                  <div className="text-[8px] font-semibold text-slate-600">
                    Women&apos;s Ready-to-Wear Sales Advisor
                  </div>
                </div>

                {/* Work Experience */}
                <div className="space-y-1.5">
                  <div className="font-bold uppercase text-[8px] text-slate-800">
                    Work experience
                  </div>
                  <div className="space-y-1 text-[7.5px]">
                    <div>
                      <div className="font-semibold text-slate-800">Sales advisor &bull; Harrods</div>
                      <div className="text-slate-400 text-[6.5px]">2021 &ndash; Present | London</div>
                      <p className="text-slate-600 text-[7px] leading-tight mt-0.5">
                        Delivered high-touch client service; exceeded seasonal sales quotas by 22%.
                      </p>
                    </div>

                    <div className="pt-1">
                      <div className="font-semibold text-slate-800">Boutique Associate &bull; Selfridges</div>
                      <div className="text-slate-400 text-[6.5px]">2018 &ndash; 2021 | London</div>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-1 pt-1">
                  <div className="font-bold uppercase text-[8px] text-slate-800">
                    Education
                  </div>
                  <div className="text-[7.5px]">
                    <div className="font-semibold text-slate-800">BA Fashion Marketing</div>
                    <div className="text-slate-500 text-[6.5px]">University of the Arts London</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#0c112b]/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-4">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-400" /> Classic Elegance
              </span>
              <Link
                href="/start"
                className="px-4 py-2 rounded-lg bg-[#3b5bfd] hover:bg-blue-600 text-white text-xs font-semibold shadow-md"
              >
                Use this template
              </Link>
            </div>
          </div>

          {/* Template 2: Blue Timeline Layout */}
          <div className="group rounded-xl bg-white shadow-xl overflow-hidden aspect-[1/1.42] flex flex-col text-slate-900 text-left select-none relative hover:ring-2 hover:ring-[#3b5bfd] transition-all">
            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="border-b-2 border-blue-600 pb-2 flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-[12px] text-slate-900 tracking-tight">
                      Elsa Monet
                    </div>
                    <div className="text-[8px] font-bold text-blue-600">
                      Women&apos;s Ready-to-Wear Sales Advisor
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-[8px] font-bold text-blue-700">
                    EM
                  </div>
                </div>

                {/* Timeline Body */}
                <div className="pt-2 space-y-2 text-[7.5px]">
                  <div className="font-bold uppercase text-[8px] text-blue-700">
                    Work experience
                  </div>

                  {/* Connected Blue Timeline */}
                  <div className="border-l-2 border-blue-500 pl-2 space-y-2 relative">
                    <div className="relative">
                      <div className="absolute -left-[11px] top-1 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                      <div className="font-bold text-slate-900">Senior Sales Advisor</div>
                      <div className="text-blue-600 text-[6.5px]">Harrods, London &bull; 2021 &ndash; Present</div>
                      <p className="text-slate-600 text-[7px] mt-0.5">
                        Directed VIP client private viewings; established recurrent booking schedule.
                      </p>
                    </div>

                    <div className="relative pt-1">
                      <div className="absolute -left-[11px] top-1 w-2 h-2 rounded-full bg-blue-400 ring-2 ring-white" />
                      <div className="font-bold text-slate-800">Sales Associate</div>
                      <div className="text-slate-500 text-[6.5px]">MatchesFashion &bull; 2018 &ndash; 2021</div>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="pt-2">
                    <div className="font-bold uppercase text-[8px] text-blue-700 mb-1">
                      Core competencies
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['Luxury Styling', 'Clienteling', 'Merchandising', 'Stock Audit'].map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 text-[7px] font-medium border border-blue-100">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[6.5px] text-slate-400 border-t border-slate-100 pt-1">
                UK Standard Format &bull; 100% ATS Compliant
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#0c112b]/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-4">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-400" /> Modern Timeline
              </span>
              <Link
                href="/start"
                className="px-4 py-2 rounded-lg bg-[#3b5bfd] hover:bg-blue-600 text-white text-xs font-semibold shadow-md"
              >
                Use this template
              </Link>
            </div>
          </div>

          {/* Template 3: Dark Charcoal Left Sidebar */}
          <div className="group rounded-xl bg-white shadow-xl overflow-hidden aspect-[1/1.42] flex flex-col text-slate-900 text-left select-none relative hover:ring-2 hover:ring-[#3b5bfd] transition-all">
            <div className="flex flex-1">
              {/* Left Column (Black/Dark Slate) */}
              <div className="w-[36%] bg-[#0e1320] text-white p-3 text-[7.5px] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 mb-2 flex items-center justify-center text-[9px] font-bold">
                    EM
                  </div>
                  <div className="text-[6.5px] text-slate-300 space-y-0.5">
                    <div>London, UK</div>
                    <div>07700 900077</div>
                    <div className="truncate">elsa.monet@uk.co</div>
                  </div>

                  <div className="pt-2 space-y-1">
                    <div className="font-bold uppercase text-[7.5px] text-slate-200">
                      Skills
                    </div>
                    <div className="text-slate-400 text-[7px] space-y-0.5">
                      <div>&bull; Clienteling</div>
                      <div>&bull; POS Software</div>
                      <div>&bull; Luxury Retail</div>
                      <div>&bull; Team Lead</div>
                    </div>
                  </div>
                </div>

                <div className="text-[6px] text-slate-500">
                  Executive ATS Layout
                </div>
              </div>

              {/* Right Column (White) */}
              <div className="w-[64%] p-3 space-y-2">
                <div className="border-b border-slate-200 pb-1.5">
                  <div className="font-extrabold text-[12px] text-slate-900 tracking-tight">
                    Elsa Monet
                  </div>
                  <div className="text-[8px] font-bold text-slate-700">
                    Women&apos;s Ready-to-Wear Sales Advisor
                  </div>
                </div>

                <div className="space-y-1 text-[7.5px]">
                  <div className="font-bold uppercase text-[8px] text-slate-800">
                    Experience
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Lead Sales Advisor &bull; Harrods</div>
                    <div className="text-slate-400 text-[6.5px]">2021 &ndash; Present</div>
                    <p className="text-slate-600 text-[7px] mt-0.5 leading-tight">
                      Curated bespoke seasonal wardrobe edits generating £450k in private appointments.
                    </p>
                  </div>
                  <div className="pt-1">
                    <div className="font-bold text-slate-800">Department Associate &bull; Harvey Nichols</div>
                    <div className="text-slate-400 text-[6.5px]">2019 &ndash; 2021</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#0c112b]/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-4">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-400" /> Executive Obsidian
              </span>
              <Link
                href="/start"
                className="px-4 py-2 rounded-lg bg-[#3b5bfd] hover:bg-blue-600 text-white text-xs font-semibold shadow-md"
              >
                Use this template
              </Link>
            </div>
          </div>

          {/* Template 4: Dark Teal/Forest Green Sidebar */}
          <div className="group rounded-xl bg-white shadow-xl overflow-hidden aspect-[1/1.42] flex flex-col text-slate-900 text-left select-none relative hover:ring-2 hover:ring-[#3b5bfd] transition-all">
            <div className="flex flex-1">
              {/* Left Column (Dark Forest Teal) */}
              <div className="w-[36%] bg-[#0f2e2b] text-white p-3 text-[7.5px] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="font-extrabold text-[10px] text-emerald-300">EM</div>
                  <div className="text-[6.5px] text-emerald-100/80 mt-1 space-y-0.5">
                    <div>London</div>
                    <div>07700 900077</div>
                  </div>

                  <div className="pt-2 space-y-1">
                    <div className="font-bold uppercase text-[7.5px] text-emerald-200">
                      Expertise
                    </div>
                    <div className="text-emerald-100/70 text-[7px] space-y-0.5">
                      <div>&bull; Client Styling</div>
                      <div>&bull; CRM Database</div>
                      <div>&bull; Luxury Brands</div>
                    </div>
                  </div>
                </div>

                <div className="text-[6px] text-emerald-400/60">
                  British Design CV
                </div>
              </div>

              {/* Right Column (White) */}
              <div className="w-[64%] p-3 space-y-2">
                <div className="border-b border-slate-200 pb-1.5">
                  <div className="font-extrabold text-[12px] text-slate-900 tracking-tight">
                    Elsa Monet
                  </div>
                  <div className="text-[8px] font-bold text-[#0f2e2b]">
                    Sales Advisor &bull; Ready-to-Wear
                  </div>
                </div>

                <div className="space-y-1 text-[7.5px]">
                  <div className="font-bold uppercase text-[8px] text-slate-800">
                    Employment
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Sales Consultant &bull; Harrods</div>
                    <div className="text-slate-400 text-[6.5px]">2021 &ndash; Present</div>
                    <p className="text-slate-600 text-[7px] mt-0.5 leading-tight">
                      Recognised as top-performing advisor across department for 4 consecutive quarters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#0c112b]/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-4">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-400" /> Emerald Luxe
              </span>
              <Link
                href="/start"
                className="px-4 py-2 rounded-lg bg-[#3b5bfd] hover:bg-blue-600 text-white text-xs font-semibold shadow-md"
              >
                Use this template
              </Link>
            </div>
          </div>
        </div>

        {/* Central CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/start"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#3b5bfd] hover:bg-[#2f4ee8] text-white font-semibold text-sm shadow-md transition-all active:scale-95"
          >
            Create my CV
          </Link>
        </div>
      </div>
    </section>
  );
}
