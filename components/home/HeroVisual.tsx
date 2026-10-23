'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, Briefcase, GraduationCap, Phone, Mail, MapPin } from 'lucide-react';

export default function HeroVisual() {
  // Template 1: Lime Accent (matching Elsa Manet from reference screenshot)
  const renderTemplateLime = (key: string) => (
    <div
      key={key}
      className="w-[260px] sm:w-[285px] h-[360px] sm:h-[390px] bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden shrink-0 flex flex-col text-slate-800 select-none transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Lime Header Banner */}
      <div className="bg-[#f0fad4] px-4 pt-3 pb-2.5 border-b border-[#e1f0b4]">
        <h3 className="font-serif text-[17px] sm:text-[19px] font-bold text-slate-900 leading-tight tracking-tight">
          Elsa Manet
        </h3>
        <p className="text-[7.5px] sm:text-[8px] font-semibold text-slate-700 tracking-wider uppercase mt-0.5">
          Women&apos;s Ready-to-Wear Advisor
        </p>
      </div>

      {/* Two-column Body */}
      <div className="flex-1 grid grid-cols-12 p-3 sm:p-3.5 gap-2.5 text-[8px] leading-tight">
        {/* Left Column (Skills, Languages, Interests) */}
        <div className="col-span-4 border-r border-slate-100 pr-2 space-y-2.5">
          <div>
            <p className="font-bold text-[8.5px] text-slate-900 uppercase tracking-wider mb-1">Skills</p>
            <div className="space-y-1">
              <div>
                <p className="text-[7px] text-slate-600">Client Relations</p>
                <div className="w-full h-1 bg-slate-100 rounded-full mt-0.5">
                  <div className="w-[85%] h-full bg-[#84cc16] rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[7px] text-slate-600">Merchandising</p>
                <div className="w-full h-1 bg-slate-100 rounded-full mt-0.5">
                  <div className="w-[90%] h-full bg-[#84cc16] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold text-[8.5px] text-slate-900 uppercase tracking-wider mb-0.5">Languages</p>
            <p className="text-[7.5px] text-slate-600">English (Fluent)</p>
            <p className="text-[7.5px] text-slate-600">French (Native)</p>
          </div>

          <div>
            <p className="font-bold text-[8.5px] text-slate-900 uppercase tracking-wider mb-0.5">Interests</p>
            <p className="text-[7px] text-slate-500">Haute Couture • Art</p>
          </div>
        </div>

        {/* Right Column (Experience & Education) */}
        <div className="col-span-8 space-y-2.5 pl-1">
          <div>
            <p className="font-bold text-[9px] text-slate-900 uppercase tracking-wider mb-1">
              Work experience
            </p>
            <div className="space-y-1">
              <span className="inline-block bg-[#eefad1] text-lime-900 font-semibold text-[7px] px-1.5 py-0.5 rounded">
                january 2018 — current
              </span>
              <p className="font-bold text-[8.5px] text-slate-900">
                Sales advisor for ready-to-wear
              </p>
              <p className="text-[7px] text-slate-500">Bond Street Boutique • London</p>
              <ul className="list-disc list-inside text-[7px] text-slate-600 space-y-0.5 pt-0.5">
                <li>Welcomed and advised clients</li>
                <li>Exceeded sales targets by 24%</li>
                <li>Managed premium store displays</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-1.5">
            <p className="font-bold text-[9px] text-slate-900 uppercase tracking-wider mb-0.5">
              Education
            </p>
            <span className="inline-block bg-[#eefad1] text-lime-900 font-semibold text-[7px] px-1.5 py-0.5 rounded mb-0.5">
              september 2015 — may 2017
            </span>
            <p className="font-bold text-[8px] text-slate-900">HND in Business & Retail</p>
            <p className="text-[7px] text-slate-500">London College of Fashion</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Template 2: Sky Blue Header (matching reference screenshot)
  const renderTemplateSkyBlue = (key: string) => (
    <div
      key={key}
      className="w-[260px] sm:w-[285px] h-[360px] sm:h-[390px] bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden shrink-0 flex flex-col text-slate-800 select-none transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Sky Blue Header */}
      <div className="bg-[#7dd3fc] px-4 py-3 flex items-center justify-between">
        <div>
          <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 leading-tight">
            Elsa Manet
          </h3>
          <p className="text-[8px] font-medium text-slate-800">
            Senior Retail Consultant
          </p>
        </div>
        <div className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center text-slate-900 text-[10px] font-bold">
          EM
        </div>
      </div>

      {/* Body with Profile, Experience, Education */}
      <div className="flex-1 p-3 sm:p-3.5 space-y-2.5 text-[8px] leading-tight">
        <div>
          <p className="font-bold text-[8.5px] text-sky-800 uppercase tracking-wider mb-0.5">
            Profile
          </p>
          <p className="text-[7.5px] text-slate-600 line-clamp-2">
            Over five years of experience in high-end retail with proven track record in client relations and team leadership.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-1.5 space-y-1.5">
          <p className="font-bold text-[8.5px] text-sky-800 uppercase tracking-wider">
            Work experience
          </p>
          <div>
            <p className="font-bold text-[8.5px] text-slate-900">Senior Fashion Consultant</p>
            <p className="text-[7px] text-slate-500">Mayfair Luxury • 2020 — Present</p>
            <p className="text-[7px] text-slate-600 mt-0.5">
              • Managed VIP portfolio of 80+ clients<br />
              • Organised seasonal runway previews
            </p>
          </div>
          <div>
            <p className="font-bold text-[8px] text-slate-900">Junior Sales Advisor</p>
            <p className="text-[7px] text-slate-500">Harrods • 2018 — 2020</p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-1.5">
          <p className="font-bold text-[8.5px] text-sky-800 uppercase tracking-wider mb-0.5">
            Education
          </p>
          <p className="font-bold text-[8px] text-slate-900">B.A. in International Business</p>
          <p className="text-[7px] text-slate-500">King&apos;s College London • 2018</p>
        </div>
      </div>
    </div>
  );

  // Template 3: Right Sidebar Layout (matching reference screenshot)
  const renderTemplateRightSidebar = (key: string) => (
    <div
      key={key}
      className="w-[260px] sm:w-[285px] h-[360px] sm:h-[390px] bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden shrink-0 flex text-slate-800 select-none transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Main Left Content */}
      <div className="w-[65%] p-3 sm:p-3.5 flex flex-col justify-between text-[8px] leading-tight space-y-2 border-r border-slate-100">
        <div>
          <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 leading-tight">
            Elsa Manet
          </h3>
          <p className="text-[8px] text-slate-500 font-medium">Ready-to-Wear Specialist</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[8.5px] font-bold text-slate-900 uppercase tracking-wider">
            <Briefcase className="w-2.5 h-2.5 text-[#4a4df2]" />
            <span>Work experience</span>
          </div>
          <p className="font-bold text-[8px] text-slate-800">Department Supervisor</p>
          <p className="text-[7px] text-slate-400">London Boutique • 2021 — 2024</p>
          <p className="text-[7px] text-slate-600">
            Coordinated inventory, styled seasonal collections, and led customer service initiatives.
          </p>
        </div>

        <div className="space-y-1 border-t border-slate-100 pt-1.5">
          <div className="flex items-center gap-1 text-[8.5px] font-bold text-slate-900 uppercase tracking-wider">
            <GraduationCap className="w-2.5 h-2.5 text-[#4a4df2]" />
            <span>Education</span>
          </div>
          <p className="font-bold text-[8px] text-slate-800">Diploma in Fashion Management</p>
          <p className="text-[7px] text-slate-400">Regent University • 2019</p>
        </div>
      </div>

      {/* Right Details Sidebar */}
      <div className="w-[35%] bg-slate-50 p-2.5 flex flex-col space-y-2 text-[7.5px] leading-tight">
        <div>
          <p className="font-bold text-[8px] text-slate-900 uppercase tracking-wider mb-1">Details</p>
          <div className="space-y-1 text-slate-600 text-[7px]">
            <div className="flex items-center gap-1">
              <Phone className="w-2 h-2 text-slate-400" />
              <span>020 1234 5678</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-2 h-2 text-slate-400" />
              <span className="truncate">elsa@cv.com</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-2 h-2 text-slate-400" />
              <span>London, UK</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200/80 pt-1.5">
          <p className="font-bold text-[8px] text-slate-900 uppercase tracking-wider mb-1">Skills</p>
          <p className="text-[7px] text-slate-600">• Styling</p>
          <p className="text-[7px] text-slate-600">• VIP Relations</p>
          <p className="text-[7px] text-slate-600">• Visual Display</p>
        </div>

        <div className="border-t border-slate-200/80 pt-1.5">
          <p className="font-bold text-[8px] text-slate-900 uppercase tracking-wider mb-0.5">Languages</p>
          <p className="text-[7px] text-slate-600">English, French</p>
        </div>
      </div>
    </div>
  );

  // Template 4: Dark Emerald Accent
  const renderTemplateEmerald = (key: string) => (
    <div
      key={key}
      className="w-[260px] sm:w-[285px] h-[360px] sm:h-[390px] bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden shrink-0 flex flex-col text-slate-800 select-none transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="bg-[#17382f] px-4 py-3 text-white flex justify-between items-center">
        <div>
          <h3 className="text-[17px] sm:text-[18px] font-bold tracking-tight">Elena Rostova</h3>
          <p className="text-[8px] text-emerald-300 font-medium">Head of Creative Design</p>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-[8px] font-semibold">
          Pro
        </span>
      </div>

      <div className="flex-1 p-3.5 space-y-2.5 text-[8px] leading-tight">
        <div>
          <p className="font-bold text-[8.5px] text-emerald-800 uppercase tracking-wider mb-0.5">
            Key Achievements
          </p>
          <p className="text-[7px] text-slate-600">• Redesigned 12 flagship consumer products</p>
          <p className="text-[7px] text-slate-600">• Awarded Best Mobile UI 2023</p>
        </div>
        <div className="border-t border-slate-100 pt-1.5">
          <p className="font-bold text-[8.5px] text-emerald-800 uppercase tracking-wider mb-1">
            Experience
          </p>
          <p className="font-bold text-[8.5px] text-slate-900">Lead Design Consultant</p>
          <p className="text-[7px] text-slate-500">Design Works London • 2021 — 2024</p>
        </div>
        <div className="border-t border-slate-100 pt-1.5">
          <p className="font-bold text-[8.5px] text-emerald-800 uppercase tracking-wider mb-0.5">
            Education
          </p>
          <p className="font-bold text-[8px] text-slate-900">M.A. Interaction Design</p>
        </div>
      </div>
    </div>
  );

  // Template 5: Crimson / Coral Minimalist
  const renderTemplateCoral = (key: string) => (
    <div
      key={key}
      className="w-[260px] sm:w-[285px] h-[360px] sm:h-[390px] bg-white rounded-xl shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden shrink-0 flex flex-col text-slate-800 select-none transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="p-4 border-b border-rose-100 flex items-center justify-between">
        <div>
          <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900">Sarah Jenkins</h3>
          <p className="text-[8px] text-rose-600 font-bold uppercase tracking-wider">
            Operations & Strategy
          </p>
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
      </div>

      <div className="flex-1 p-3.5 space-y-2.5 text-[8px] leading-tight">
        <div>
          <p className="font-bold text-[8.5px] text-slate-900 uppercase tracking-wider mb-1">
            Work experience
          </p>
          <p className="font-bold text-[8.5px] text-slate-900">Operations Director</p>
          <p className="text-[7px] text-slate-500">Logistics Corp • 2020 — 2024</p>
          <p className="text-[7px] text-slate-600 mt-0.5">
            Directed global supply chain operations across 14 European centers.
          </p>
        </div>
        <div className="border-t border-slate-100 pt-1.5">
          <p className="font-bold text-[8.5px] text-slate-900 uppercase tracking-wider mb-0.5">
            Certifications
          </p>
          <p className="text-[7px] text-slate-700 font-medium">✓ PMP® Certified Master</p>
          <p className="text-[7px] text-slate-700 font-medium">✓ Agile Certified Practitioner</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[640px] flex items-end justify-center select-none overflow-hidden">
      {/* 1. Subtle Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-200/40 via-blue-100/30 to-purple-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 2. Soft Edge Fades for the horizontal marquee */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#eef2ff] via-[#eef2ff]/80 to-transparent z-15 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#eef2ff] via-[#eef2ff]/80 to-transparent z-15 pointer-events-none" />

      {/* =========================================================================
          HORIZONTAL ANIMATED CV TEMPLATES (HARAHATA ANIMATION)
          Sliding continuously across the horizontal track behind the candidate
          ========================================================================= */}
      <div className="absolute top-8 sm:top-14 inset-x-0 z-10 flex items-center overflow-hidden pointer-events-auto">
        <div className="animate-cv-marquee flex items-center gap-5 sm:gap-6">
          {/* Set 1 */}
          {renderTemplateLime('lime-1')}
          {renderTemplateSkyBlue('sky-1')}
          {renderTemplateRightSidebar('sidebar-1')}
          {renderTemplateEmerald('emerald-1')}
          {renderTemplateCoral('coral-1')}

          {/* Set 2 (Seamless loop duplication) */}
          {renderTemplateLime('lime-2')}
          {renderTemplateSkyBlue('sky-2')}
          {renderTemplateRightSidebar('sidebar-2')}
          {renderTemplateEmerald('emerald-2')}
          {renderTemplateCoral('coral-2')}
        </div>
      </div>

      {/* =========================================================================
          CANDIDATE IMAGE: Freely placed on the hero section without any box/frame
          Positioned directly in front of the sliding CV templates (z-20)
          ========================================================================= */}
      <div className="relative z-20 w-auto h-[90%] sm:h-[95%] lg:h-[98%] max-h-[620px] flex items-end justify-center pointer-events-none">
        <Image
          src="/assets/hero-new-candidate.png"
          alt="MakeMyCV candidate portrait"
          width={759}
          height={1268}
          priority
          className="h-full w-auto max-h-[510px] sm:max-h-[570px] lg:max-h-[620px] object-contain drop-shadow-2xl select-none"
        />
      </div>

      {/* =========================================================================
          FLOATING '✨ Generate with AI' BADGE
          Overlaying the templates on the right side of the candidate (z-30)
          ========================================================================= */}
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: [-5, 5, -5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-4 sm:right-10 lg:right-12 top-[34%] sm:top-[36%] z-30 pointer-events-auto"
      >
        <Link
          href="#cv-builder-section"
          className="group inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#131a47] text-white shadow-2xl shadow-indigo-950/40 hover:bg-[#1a235c] transition-all border border-indigo-400/25 active:scale-95"
          title="Generate with AI"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
          </motion.div>
          <span className="text-[14px] sm:text-[15px] font-semibold tracking-wide whitespace-nowrap">
            Generate with AI
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
