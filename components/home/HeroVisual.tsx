'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, Briefcase, GraduationCap, Phone, Mail, MapPin } from 'lucide-react';

export default function HeroVisual() {
  const cardShellClass =
    'w-[195px] sm:w-[275px] h-[272px] sm:h-[385px] bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden shrink-0 flex flex-col text-slate-800 select-none transition-transform duration-300 sm:hover:scale-[1.02]';

  // Template 1: Lime Accent
  const renderTemplateLime = (key: string) => (
    <div key={key} className={cardShellClass}>
      <div className="bg-[#f0fad4] px-3 sm:px-4 pt-2.5 sm:pt-3 pb-2 sm:pb-2.5 border-b border-[#e1f0b4]">
        <h3 className="font-serif text-[14px] sm:text-[18px] font-bold text-slate-900 leading-tight tracking-tight">
          Elsa Manet
        </h3>
        <p className="text-[6.5px] sm:text-[8px] font-semibold text-slate-700 tracking-wider uppercase mt-0.5 truncate">
          Women&apos;s Ready-to-Wear Advisor
        </p>
      </div>

      <div className="flex-1 grid grid-cols-12 p-2.5 sm:p-3.5 gap-2 text-[7px] sm:text-[8px] leading-tight">
        <div className="col-span-4 border-r border-slate-100 pr-1.5 sm:pr-2 space-y-2">
          <div>
            <p className="font-bold text-[7.5px] sm:text-[8.5px] text-slate-900 uppercase tracking-wider mb-1">
              Skills
            </p>
            <div className="space-y-1">
              <div>
                <p className="text-[6.5px] sm:text-[7px] text-slate-600 truncate">Client Relations</p>
                <div className="w-full h-1 bg-slate-100 rounded-full mt-0.5">
                  <div className="w-[85%] h-full bg-[#84cc16] rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[6.5px] sm:text-[7px] text-slate-600 truncate">Merchandising</p>
                <div className="w-full h-1 bg-slate-100 rounded-full mt-0.5">
                  <div className="w-[90%] h-full bg-[#84cc16] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold text-[7.5px] sm:text-[8.5px] text-slate-900 uppercase tracking-wider mb-0.5">
              Languages
            </p>
            <p className="text-[6.5px] sm:text-[7.5px] text-slate-600">English (Fluent)</p>
            <p className="text-[6.5px] sm:text-[7.5px] text-slate-600">French (Native)</p>
          </div>
        </div>

        <div className="col-span-8 space-y-2 pl-1">
          <div>
            <p className="font-bold text-[7.5px] sm:text-[9px] text-slate-900 uppercase tracking-wider mb-0.5">
              Work experience
            </p>
            <div className="space-y-0.5">
              <p className="text-[6.5px] text-lime-800 font-semibold">Jan 2018 – Present</p>
              <p className="font-bold text-[7.5px] sm:text-[8.5px] text-slate-900">
                Sales advisor for ready-to-wear
              </p>
              <p className="text-[6.5px] sm:text-[7px] text-slate-500">Bond Street Boutique · London</p>
              <ul className="list-disc list-inside text-[6.5px] sm:text-[7px] text-slate-600 space-y-0.5 pt-0.5">
                <li>Welcomed and advised clients</li>
                <li>Exceeded sales targets by 24%</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-1.5">
            <p className="font-bold text-[7.5px] sm:text-[9px] text-slate-900 uppercase tracking-wider mb-0.5">
              Education
            </p>
            <p className="font-bold text-[7px] sm:text-[8px] text-slate-900">HND in Business &amp; Retail</p>
            <p className="text-[6.5px] sm:text-[7px] text-slate-500">London College of Fashion</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Template 2: Sky Blue Header
  const renderTemplateSkyBlue = (key: string) => (
    <div key={key} className={cardShellClass}>
      <div className="bg-[#7dd3fc] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
        <div>
          <h3 className="text-[14px] sm:text-[18px] font-bold text-slate-900 leading-tight">
            Elsa Manet
          </h3>
          <p className="text-[7px] sm:text-[8px] font-medium text-slate-800">
            Senior Retail Consultant
          </p>
        </div>
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/40 flex items-center justify-center text-slate-900 text-[9px] sm:text-[10px] font-bold">
          EM
        </div>
      </div>

      <div className="flex-1 p-2.5 sm:p-3.5 space-y-2 text-[7px] sm:text-[8px] leading-tight">
        <div>
          <p className="font-bold text-[7.5px] sm:text-[8.5px] text-sky-800 uppercase tracking-wider mb-0.5">
            Profile
          </p>
          <p className="text-[6.5px] sm:text-[7.5px] text-slate-600 line-clamp-2">
            Over five years of experience in high-end retail with proven track record in client relations.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-1.5 space-y-1">
          <p className="font-bold text-[7.5px] sm:text-[8.5px] text-sky-800 uppercase tracking-wider">
            Work experience
          </p>
          <div>
            <p className="font-bold text-[7.5px] sm:text-[8.5px] text-slate-900">Senior Fashion Consultant</p>
            <p className="text-[6.5px] sm:text-[7px] text-slate-500">Mayfair Luxury · 2020 – Present</p>
          </div>
          <div>
            <p className="font-bold text-[7px] sm:text-[8px] text-slate-900">Junior Sales Advisor</p>
            <p className="text-[6.5px] sm:text-[7px] text-slate-500">Harrods · 2018 – 2020</p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-1.5">
          <p className="font-bold text-[7.5px] sm:text-[8.5px] text-sky-800 uppercase tracking-wider mb-0.5">
            Education
          </p>
          <p className="font-bold text-[7px] sm:text-[8px] text-slate-900">B.A. International Business</p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-500">King&apos;s College London · 2018</p>
        </div>
      </div>
    </div>
  );

  // Template 3: Right Sidebar Layout
  const renderTemplateRightSidebar = (key: string) => (
    <div
      key={key}
      className="w-[195px] sm:w-[275px] h-[272px] sm:h-[385px] bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden shrink-0 flex text-slate-800 select-none transition-transform duration-300 sm:hover:scale-[1.02]"
    >
      <div className="w-[65%] p-2.5 sm:p-3.5 flex flex-col justify-between text-[7px] sm:text-[8px] leading-tight space-y-1.5 border-r border-slate-100">
        <div>
          <h3 className="text-[14px] sm:text-[18px] font-bold text-slate-900 leading-tight">
            Elsa Manet
          </h3>
          <p className="text-[7px] sm:text-[8px] text-slate-500 font-medium">Ready-to-Wear Specialist</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[7.5px] sm:text-[8.5px] font-bold text-slate-900 uppercase tracking-wider">
            <Briefcase className="w-2.5 h-2.5 text-[#4a4df2]" />
            <span>Experience</span>
          </div>
          <p className="font-bold text-[7px] sm:text-[8px] text-slate-800">Department Supervisor</p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-400">London Boutique · 2021 – 2024</p>
        </div>

        <div className="space-y-1 border-t border-slate-100 pt-1.5">
          <div className="flex items-center gap-1 text-[7.5px] sm:text-[8.5px] font-bold text-slate-900 uppercase tracking-wider">
            <GraduationCap className="w-2.5 h-2.5 text-[#4a4df2]" />
            <span>Education</span>
          </div>
          <p className="font-bold text-[7px] sm:text-[8px] text-slate-800">Diploma Fashion Mgmt</p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-400">Regent University · 2019</p>
        </div>
      </div>

      <div className="w-[35%] bg-slate-50 p-2 sm:p-2.5 flex flex-col space-y-2 text-[6.5px] sm:text-[7.5px] leading-tight">
        <div>
          <p className="font-bold text-[7px] sm:text-[8px] text-slate-900 uppercase tracking-wider mb-1">
            Details
          </p>
          <div className="space-y-1 text-slate-600 text-[6px] sm:text-[7px]">
            <div className="flex items-center gap-1 truncate">
              <Phone className="w-2 h-2 text-slate-400 shrink-0" />
              <span className="truncate">020 1234</span>
            </div>
            <div className="flex items-center gap-1 truncate">
              <Mail className="w-2 h-2 text-slate-400 shrink-0" />
              <span className="truncate">elsa@cv.uk</span>
            </div>
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-2 h-2 text-slate-400 shrink-0" />
              <span className="truncate">London</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200/80 pt-1.5">
          <p className="font-bold text-[7px] sm:text-[8px] text-slate-900 uppercase tracking-wider mb-1">
            Skills
          </p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-600">• Styling</p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-600">• VIP Sales</p>
        </div>
      </div>
    </div>
  );

  // Template 4: Dark Emerald Accent
  const renderTemplateEmerald = (key: string) => (
    <div key={key} className={cardShellClass}>
      <div className="bg-[#17382f] px-3 sm:px-4 py-2.5 sm:py-3 text-white">
        <h3 className="text-[14px] sm:text-[18px] font-bold tracking-tight">Elena Rostova</h3>
        <p className="text-[7px] sm:text-[8px] text-emerald-300 font-medium">Head of Creative Design</p>
      </div>

      <div className="flex-1 p-2.5 sm:p-3.5 space-y-2 text-[7px] sm:text-[8px] leading-tight">
        <div>
          <p className="font-bold text-[7.5px] sm:text-[8.5px] text-emerald-800 uppercase tracking-wider mb-0.5">
            Achievements
          </p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-600">• Redesigned 12 flagship products</p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-600">• Best Mobile UI 2024</p>
        </div>
        <div className="border-t border-slate-100 pt-1.5">
          <p className="font-bold text-[7.5px] sm:text-[8.5px] text-emerald-800 uppercase tracking-wider mb-0.5">
            Experience
          </p>
          <p className="font-bold text-[7.5px] sm:text-[8.5px] text-slate-900">Lead Design Consultant</p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-500">Design Works London · 2021 – 2024</p>
        </div>
        <div className="border-t border-slate-100 pt-1.5">
          <p className="font-bold text-[7.5px] sm:text-[8.5px] text-emerald-800 uppercase tracking-wider mb-0.5">
            Education
          </p>
          <p className="font-bold text-[7px] sm:text-[8px] text-slate-900">M.A. Interaction Design</p>
        </div>
      </div>
    </div>
  );

  // Template 5: Coral Minimalist
  const renderTemplateCoral = (key: string) => (
    <div key={key} className={cardShellClass}>
      <div className="p-3 sm:p-4 border-b border-rose-100">
        <h3 className="text-[14px] sm:text-[18px] font-bold text-slate-900">Sarah Jenkins</h3>
        <p className="text-[7px] sm:text-[8px] text-rose-600 font-bold uppercase tracking-wider">
          Operations &amp; Strategy
        </p>
      </div>

      <div className="flex-1 p-2.5 sm:p-3.5 space-y-2 text-[7px] sm:text-[8px] leading-tight">
        <div>
          <p className="font-bold text-[7.5px] sm:text-[8.5px] text-slate-900 uppercase tracking-wider mb-0.5">
            Work experience
          </p>
          <p className="font-bold text-[7.5px] sm:text-[8.5px] text-slate-900">Operations Director</p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-500">Logistics Corp · 2020 – 2024</p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-600 mt-0.5 line-clamp-2">
            Directed supply chain operations across 14 European centres.
          </p>
        </div>
        <div className="border-t border-slate-100 pt-1.5">
          <p className="font-bold text-[7.5px] sm:text-[8.5px] text-slate-900 uppercase tracking-wider mb-0.5">
            Certifications
          </p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-700 font-medium">✓ PMP® Certified</p>
          <p className="text-[6.5px] sm:text-[7px] text-slate-700 font-medium">✓ Agile Practitioner</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[350px] sm:h-[520px] lg:h-[620px] flex items-end justify-center select-none overflow-hidden rounded-2xl sm:rounded-none">
      {/* Subtle Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[550px] h-[340px] sm:h-[550px] bg-gradient-to-tr from-indigo-200/40 via-blue-100/30 to-purple-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Soft Edge Fades for the horizontal marquee */}
      <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#eef2ff] via-[#eef2ff]/80 to-transparent z-15 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#eef2ff] via-[#eef2ff]/80 to-transparent z-15 pointer-events-none" />

      {/* Horizontal Animated CV Templates */}
      <div className="absolute top-4 sm:top-12 inset-x-0 z-10 flex items-center overflow-hidden pointer-events-auto">
        <div className="animate-cv-marquee flex items-center gap-3.5 sm:gap-6">
          {renderTemplateLime('lime-1')}
          {renderTemplateSkyBlue('sky-1')}
          {renderTemplateRightSidebar('sidebar-1')}
          {renderTemplateEmerald('emerald-1')}
          {renderTemplateCoral('coral-1')}

          {renderTemplateLime('lime-2')}
          {renderTemplateSkyBlue('sky-2')}
          {renderTemplateRightSidebar('sidebar-2')}
          {renderTemplateEmerald('emerald-2')}
          {renderTemplateCoral('coral-2')}
        </div>
      </div>

      {/* Candidate Portrait */}
      <div className="relative z-20 w-auto h-[92%] sm:h-[95%] lg:h-[98%] max-h-[600px] flex items-end justify-center pointer-events-none">
        <Image
          src="/assets/hero-new-candidate.png"
          alt="MakeMyCV candidate portrait"
          width={759}
          height={1268}
          referrerPolicy="no-referrer"
          priority
          className="h-full w-auto max-h-[330px] sm:max-h-[540px] lg:max-h-[600px] object-contain drop-shadow-2xl select-none"
        />
      </div>

      {/* Floating CTA Badge — Anchored cleanly at bottom-right on mobile so it never overlaps candidate's face */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-4, 4, -4] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-3 right-3 sm:bottom-auto sm:right-8 lg:right-12 sm:top-[36%] z-30 pointer-events-auto"
      >
        <Link
          href="/builder"
          className="min-h-[42px] sm:min-h-[46px] inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#131a47] text-white shadow-2xl shadow-indigo-950/40 hover:bg-[#1a235c] transition-all border border-indigo-400/25 active:scale-95 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 shrink-0" />
          <span className="text-xs sm:text-[15px] font-semibold tracking-wide whitespace-nowrap">
            Open Live Builder
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
