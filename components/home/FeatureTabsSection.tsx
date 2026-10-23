'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FilePenLine,
  FileText,
  ScanText,
  FileSpreadsheet,
  SquareUserRound,
  Fingerprint,
  Briefcase,
  LayoutGrid,
  Globe,
  Video,
  ChevronLeft,
  ChevronRight,
  Download,
  Printer,
  Mail,
  Edit2,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
  CheckCircle2,
  Star,
  Sliders,
  Layers,
  Phone,
  MapPin,
  Calendar,
  Car,
  Linkedin,
  X,
} from 'lucide-react';

interface TabItem {
  id: string;
  name: string;
  icon: React.ElementType;
  isPremium?: boolean;
  headline: string;
  description: string;
}

const tabs: TabItem[] = [
  // Row 1 (5 items)
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    icon: FilePenLine,
    headline: 'Build a recruiter-ready CV in minutes',
    description: 'Recruiter-approved templates and an AI assistant do the heavy lifting.',
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Builder',
    icon: FileText,
    headline: 'Matching cover letters in a few clicks',
    description: 'Create a professional cover letter formatted to match your CV template.',
  },
  {
    id: 'resume-checker',
    name: 'Resume checker',
    icon: ScanText,
    headline: 'Instant ATS compliance score',
    description: 'Check your CV against modern recruitment filters and fix parsing errors.',
  },
  {
    id: 'resignation-letter',
    name: 'Resignation letter builder',
    icon: FileSpreadsheet,
    headline: 'Standard polite resignation notices',
    description: 'Draft polite UK notice letters in compliance with your employment terms.',
  },
  {
    id: 'headshot-pro',
    name: 'Headshot pro',
    icon: SquareUserRound,
    headline: 'Convert casual photos into executive portraits',
    description: 'Clean up lighting, remove messy backgrounds, and generate sharp portraits.',
  },

  // Row 2 (5 items)
  {
    id: 'career-test',
    name: 'Career test',
    icon: Fingerprint,
    headline: 'Discover roles suited to your strengths',
    description: 'Identify top occupational matches and salary expectations in the UK market.',
  },
  {
    id: 'job-search',
    name: 'Job search',
    icon: Briefcase,
    isPremium: true,
    headline: 'Curated feed of active UK vacancies',
    description: 'Find direct job postings with verified salary benchmarks.',
  },
  {
    id: 'job-tracker',
    name: 'Job tracker',
    icon: LayoutGrid,
    isPremium: true,
    headline: 'Organise applications in one pipeline',
    description: 'Keep track of submitted roles, follow-up dates, and interview stages.',
  },
  {
    id: 'remote-job',
    name: 'Remote job',
    icon: Globe,
    headline: 'Verified work-from-home UK positions',
    description: 'Search remote opportunities offering British employment contracts.',
  },
  {
    id: 'interview-prep',
    name: 'Interview prep',
    icon: Video,
    isPremium: true,
    headline: 'Master competency & STAR questions',
    description: 'Practice real UK interview questions with instant AI feedback.',
  },
];

export default function FeatureTabsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeDock, setActiveDock] = useState<'templates' | 'formatting' | 'sections'>('formatting');
  const [selectedColor, setSelectedColor] = useState('#4a4df2');
  const [lineSpacing, setLineSpacing] = useState(1.25);
  const [fontSize, setFontSize] = useState(4);

  const currentTab = tabs[activeTab];

  const handlePrev = () => {
    setActiveTab((prev) => (prev > 0 ? prev - 1 : tabs.length - 1));
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev < tabs.length - 1 ? prev + 1 : 0));
  };

  const row1Tabs = tabs.slice(0, 5);
  const row2Tabs = tabs.slice(5, 10);

  const renderTabButton = (tab: TabItem, globalIdx: number) => {
    const Icon = tab.icon;
    const isActive = activeTab === globalIdx;

    return (
      <button
        key={tab.id}
        type="button"
        onClick={() => setActiveTab(globalIdx)}
        className={`inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-lg text-[13.5px] sm:text-[14.5px] font-medium transition-all select-none border shrink-0 cursor-pointer ${
          isActive
            ? 'bg-[#edf0fe] border-[#d4dcfe] text-slate-950 font-semibold shadow-2xs ring-1 ring-[#4a4df2]/15'
            : 'bg-white border-slate-200/90 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
        }`}
      >
        <Icon
          className={`w-4 h-4 sm:w-[17px] sm:h-[17px] shrink-0 ${
            isActive ? 'text-[#4a4df2]' : 'text-slate-800'
          }`}
          strokeWidth={isActive ? 2.2 : 2}
        />
        <span className="whitespace-nowrap">{tab.name}</span>

        {tab.isPremium && (
          <span className="ml-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#4a4df2] bg-[#eaedff] px-2 py-0.5 rounded-full leading-none">
            <Star className="w-2.5 h-2.5 fill-current text-[#4a4df2]" />
            <span>Premium</span>
          </span>
        )}
      </button>
    );
  };

  return (
    <section id="features-section" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading matching reference screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-950 tracking-tight leading-tight">
            Everything you need to land interviews
          </h2>
          <div className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#4a4df2] mt-1 tracking-tight leading-tight">
            in one place
          </div>
        </div>

        {/* Two Rows of Feature Tab Buttons */}
        <div className="flex flex-col items-center gap-2.5 sm:gap-3 w-full max-w-6xl mx-auto mb-10 sm:mb-12">
          {/* Row 1 (5 items) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {row1Tabs.map((tab, idx) => renderTabButton(tab, idx))}
          </div>

          {/* Row 2 (5 items) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {row2Tabs.map((tab, idx) => renderTabButton(tab, idx + 5))}
          </div>
        </div>

        {/* =========================================================================
            FEATURE SHOWCASE: Left side has Dark Navy Frame with Editor;
            Right side is on White Background with Headline, Text, CTA, and Arrows!
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* LEFT: Dark Navy Rounded Container (#121845) holding the complete editor window */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="rounded-[24px] sm:rounded-[32px] bg-[#121845] p-3 sm:p-6 lg:p-7 shadow-2xl relative overflow-hidden">
              {/* White App Window */}
              <div className="rounded-xl bg-white shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col relative">
                {/* 1. Top Editor Header Bar */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white border-b border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-[13px] sm:text-sm">
                      {activeTab === 0 ? 'Resume builder' : currentTab.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-medium transition-colors"
                    >
                      <Printer className="w-3 h-3 text-slate-500" />
                      <span>Print</span>
                    </button>
                    <button
                      type="button"
                      className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-medium transition-colors"
                    >
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span>Email</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-medium transition-colors"
                    >
                      <Download className="w-3 h-3 text-slate-500" />
                      <span>Download</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-3 sm:px-3.5 py-1 rounded bg-[#5054ec] hover:bg-[#4347db] text-white font-semibold text-[11.5px] transition-colors shadow-2xs"
                    >
                      Save &amp; next
                    </button>
                  </div>
                </div>

                {/* 2. Sub-Toolbar Bar */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-[#f8fafc] border-b border-slate-200 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1 font-medium text-slate-700">
                    <span>My new CV</span>
                    <Edit2 className="w-2.5 h-2.5 text-[#5054ec]" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-slate-700 font-medium cursor-pointer">
                      <span>🇬🇧</span>
                      <span>English</span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>

                    <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2">
                      <span className="text-[10px] text-slate-400">🔍</span>
                      <span className="text-[10px] font-semibold text-slate-700">100%</span>
                      <button type="button" className="text-slate-400 hover:text-slate-700 font-bold px-0.5">
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <button type="button" className="text-slate-400 hover:text-slate-700 font-bold px-0.5">
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Main Workspace with Left Formatting Drawer and CV Sheet */}
                <div className="p-3 sm:p-4 bg-[#edf2fb] flex gap-3 sm:gap-4 relative min-h-[440px] sm:min-h-[480px]">
                  {/* Left Drawer: Design & Formatting (matching screenshot) */}
                  <div className="w-[130px] sm:w-[155px] bg-white rounded-lg border border-slate-200 p-2 sm:p-2.5 space-y-2.5 shadow-sm text-slate-800 shrink-0 text-[10px]">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="font-semibold text-[10.5px] text-slate-800">Formatting</span>
                      <button type="button" className="text-slate-400 hover:text-slate-600">
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Color Circles Grid */}
                    <div>
                      <div className="grid grid-cols-5 gap-1.5 pt-0.5">
                        {[
                          '#dc2626',
                          '#ea580c',
                          '#f59e0b',
                          '#84cc16',
                          '#10b981',
                          '#06b6d4',
                          '#2563eb',
                          '#4a4df2',
                          '#7c3aed',
                          '#0f172a',
                        ].map((hex) => (
                          <button
                            key={hex}
                            type="button"
                            onClick={() => setSelectedColor(hex)}
                            style={{ backgroundColor: hex }}
                            className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer ${
                              selectedColor === hex ? 'ring-2 ring-slate-400 scale-110' : 'hover:scale-110'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Saturation / 2D Color Picker Simulation */}
                    <div className="space-y-1">
                      <div className="w-full h-16 rounded bg-gradient-to-tr from-blue-700 via-indigo-500 to-purple-400 relative overflow-hidden shadow-2xs border border-slate-200">
                        <div className="absolute top-4 left-8 w-3 h-3 rounded-full border-2 border-white shadow-md bg-transparent" />
                      </div>
                      <div className="w-full h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500" />
                      <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 pt-0.5">
                        <span>72</span>
                        <span>151</span>
                        <span>81</span>
                        <span>242</span>
                      </div>
                    </div>

                    {/* Spacing & Sizing Sliders */}
                    <div className="space-y-1.5 border-t border-slate-100 pt-1.5">
                      <div>
                        <div className="flex items-center justify-between text-[9px] text-slate-600 mb-0.5">
                          <span>Line height</span>
                          <span className="font-mono font-semibold text-slate-800">{lineSpacing}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="2"
                          step="0.05"
                          value={lineSpacing}
                          onChange={(e) => setLineSpacing(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5054ec]"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-[9px] text-slate-600 mb-0.5">
                          <span>Font size</span>
                          <span className="font-mono font-semibold text-slate-800">{fontSize}</span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="6"
                          step="0.5"
                          value={fontSize}
                          onChange={(e) => setFontSize(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5054ec]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Center CV Document Sheet: Elsa Manet (exact match to screenshot) */}
                  <div className="flex-1 bg-white rounded shadow-md border border-slate-200 p-3 sm:p-4 text-[8px] sm:text-[8.5px] leading-tight space-y-2.5 overflow-hidden flex flex-col justify-between">
                    <div>
                      {/* Header Section with Portrait */}
                      <div className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                          <Image
                            src="https://picsum.photos/seed/elsamanet/120/120"
                            alt="Elsa Manet"
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-bold text-[13px] sm:text-[14px] text-slate-900 leading-tight">
                            Elsa Manet
                          </h4>
                          <p
                            className="font-semibold text-[8px] sm:text-[8.5px] mt-0.5"
                            style={{ color: selectedColor }}
                          >
                            Women&apos;s Ready-to-Wear Sales Consultant
                          </p>

                          {/* Contact Info Pills Grid */}
                          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7px] text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Phone className="w-1.5 h-1.5 text-slate-400" />
                              06 01 21 48 52
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-1.5 h-1.5 text-slate-400" />
                              28 / 04 / 1994
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <Mail className="w-1.5 h-1.5 text-slate-400" />
                              elsa.manet@gmail.com
                            </span>
                            <span className="flex items-center gap-1">
                              <Car className="w-1.5 h-1.5 text-slate-400" />
                              Permis B
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-1.5 h-1.5 text-slate-400" />
                              Lille
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <Linkedin className="w-1.5 h-1.5 text-slate-400" />
                              linkedin.com/in/elsa-manet
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Main Two Columns */}
                      <div className="grid grid-cols-12 gap-2.5 pt-2">
                        {/* Left Column (Skills, Languages, Interests) */}
                        <div className="col-span-4 border-r border-slate-100 pr-1.5 space-y-2">
                          <div>
                            <p className="font-bold uppercase tracking-wider text-[7.5px] text-slate-900 mb-0.5">
                              Skills
                            </p>
                            <p className="text-[6.5px] text-slate-500">Provide tailored service to customers</p>
                          </div>
                          <div>
                            <p className="font-bold uppercase tracking-wider text-[7.5px] text-slate-900 mb-0.5">
                              Languages
                            </p>
                            <p className="text-[6.5px] text-slate-600">French (Native)</p>
                            <p className="text-[6.5px] text-slate-600">English (Fluent)</p>
                          </div>
                          <div>
                            <p className="font-bold uppercase tracking-wider text-[7.5px] text-slate-900 mb-0.5">
                              Interests
                            </p>
                            <p className="text-[6.5px] text-slate-600">Swimming • Design</p>
                          </div>
                        </div>

                        {/* Right Column (Profil, Experience, Degrees) */}
                        <div className="col-span-8 pl-1 space-y-2">
                          <div>
                            <p className="font-bold uppercase tracking-wider text-[7.5px] text-slate-900 mb-0.5">
                              Profil
                            </p>
                            <p className="text-[6.5px] text-slate-600 leading-normal">
                              After more than 5 years of experience in sales in the luxury and ready-to-wear sector, I now wish to apply my sales skills to the wellness industry.
                            </p>
                          </div>

                          <div>
                            <p
                              className="font-bold uppercase tracking-wider text-[7.5px] mb-0.5"
                              style={{ color: selectedColor }}
                            >
                              Professional experience
                            </p>
                            <div className="space-y-1">
                              <div>
                                <p className="font-bold text-[7.5px] text-slate-900">
                                  Women&apos;s Ready-to-Wear Sales Consultant
                                </p>
                                <p className="text-[6.5px] text-slate-400">
                                  Sandro Fashion Store, Lille / Oct. 2019 - Sept. 2020
                                </p>
                                <p className="text-[6.5px] text-slate-500">• Led development of retail display</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="font-bold uppercase tracking-wider text-[7.5px] text-slate-900 mb-0.5">
                              Degrees and training
                            </p>
                            <p className="font-bold text-[7px] text-slate-800">High school diploma</p>
                            <p className="text-[6.5px] text-slate-400">Lycée / Oct. 2016 - Sept. 2019</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-400">
                      <span>MakeMyCV Editor Preview</span>
                      <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Recruiter Approved
                      </span>
                    </div>
                  </div>

                  {/* 4. Floating Bottom Dock Bar (Templates | Design & formatting | Sections) */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 bg-[#edf0fd] border border-indigo-200/80 rounded-xl p-1 shadow-lg flex items-center gap-1 z-20">
                    <button
                      type="button"
                      onClick={() => setActiveDock('templates')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                        activeDock === 'templates'
                          ? 'bg-[#5054ec] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-white/60'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Templates</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDock('formatting')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10.5px] font-semibold transition-colors ${
                        activeDock === 'formatting'
                          ? 'bg-[#5054ec] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-white/60'
                      }`}
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Design &amp; formatting</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDock('sections')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                        activeDock === 'sections'
                          ? 'bg-[#5054ec] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-white/60'
                      }`}
                    >
                      <LayoutGrid className="w-3 h-3" />
                      <span>Sections</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Clean White Background with Headline, Description, CTA, and Arrows */}
          <div className="lg:col-span-5 xl:col-span-5 text-left space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-950 tracking-tight leading-[1.12]">
                {currentTab.headline}
              </h3>
              <p className="text-base sm:text-[18px] text-slate-600 font-normal leading-relaxed max-w-md">
                {currentTab.description}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/start"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#5054ec] hover:bg-[#4347db] text-white font-semibold text-[17px] shadow-sm transition-all active:scale-[0.99]"
              >
                Create my CV
              </Link>
            </div>

            {/* Circular Arrow Buttons matching screenshot */}
            <div className="flex items-center gap-3.5 pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                aria-label="Previous feature"
              >
                <ChevronLeft className="w-5 h-5 text-slate-800" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                aria-label="Next feature"
              >
                <ChevronRight className="w-5 h-5 text-slate-800" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
