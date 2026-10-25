'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  CheckCircle2,
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
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    icon: FilePenLine,
    headline: 'Build a recruiter-ready CV in minutes',
    description: 'Recruiter-approved templates and guided formatting do the heavy lifting.',
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
    headline: 'Instant ATS compliance check',
    description: 'Verify your CV structure against modern recruitment filters and fix layout gaps.',
  },
  {
    id: 'resignation-letter',
    name: 'Resignation letter',
    icon: FileSpreadsheet,
    headline: 'Standard polite resignation notices',
    description: 'Draft clear UK notice letters aligned with standard employment terms.',
  },
  {
    id: 'headshot-pro',
    name: 'Headshot framing',
    icon: SquareUserRound,
    headline: 'Frame clean executive profile portraits',
    description: 'Crop and toggle optional profile photos cleanly across executive layouts.',
  },
  {
    id: 'career-test',
    name: 'Career match',
    icon: Fingerprint,
    headline: 'Discover roles suited to your strengths',
    description: 'Identify occupational matches and salary benchmarks in the UK market.',
  },
  {
    id: 'job-search',
    name: 'Job search',
    icon: Briefcase,
    isPremium: true,
    headline: 'Curated feed of active UK vacancies',
    description: 'Explore direct job postings with transparent salary ranges.',
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
    name: 'Remote roles',
    icon: Globe,
    headline: 'Verified work-from-home UK positions',
    description: 'Browse remote opportunities offering British employment contracts.',
  },
  {
    id: 'interview-prep',
    name: 'Interview prep',
    icon: Video,
    isPremium: true,
    headline: 'Master competency & STAR questions',
    description: 'Structure concise STAR examples tailored to UK hiring panels.',
  },
];

const SWATCH_COLORS = [
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
];

export default function FeatureTabsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeDock, setActiveDock] = useState<'templates' | 'formatting' | 'sections'>('formatting');
  const [selectedColor, setSelectedColor] = useState('#4a4df2');
  const [lineSpacing, setLineSpacing] = useState(1.25);
  const [fontSize, setFontSize] = useState(4);
  const mobileTabRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const currentTab = tabs[activeTab];

  // Auto-center active tab inside horizontal scroll strip on mobile
  useEffect(() => {
    const el = mobileTabRefs.current[activeTab];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeTab]);

  const handlePrev = () => {
    setActiveTab((prev) => (prev > 0 ? prev - 1 : tabs.length - 1));
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev < tabs.length - 1 ? prev + 1 : 0));
  };

  const row1Tabs = tabs.slice(0, 5);
  const row2Tabs = tabs.slice(5, 10);

  const renderTabButton = (tab: TabItem, globalIdx: number, registerMobileRef = false) => {
    const Icon = tab.icon;
    const isActive = activeTab === globalIdx;

    return (
      <button
        key={tab.id}
        ref={
          registerMobileRef
            ? (el) => {
                mobileTabRefs.current[globalIdx] = el;
              }
            : undefined
        }
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`feature-panel-${tab.id}`}
        id={`tab-${tab.id}`}
        onClick={() => setActiveTab(globalIdx)}
        className={`min-h-[44px] snap-start inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 select-none border shrink-0 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] ${
          isActive
            ? 'bg-[#edf0fe] border-[#c7d2fe] text-slate-950 font-semibold shadow-2xs ring-2 ring-[#4a4df2]/20'
            : 'bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
        }`}
      >
        <Icon
          className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#4a4df2]' : 'text-slate-600'}`}
          strokeWidth={isActive ? 2.2 : 2}
        />
        <span>{tab.name}</span>
        {tab.isPremium && (
          <span className="text-[11px] font-bold text-[#4a4df2] bg-[#4a4df2]/10 px-1.5 py-0.5 rounded">
            Pro
          </span>
        )}
      </button>
    );
  };

  return (
    <section
      id="features-section"
      aria-label="Features and tools to land interviews"
      className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden border-b border-slate-100"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-950 tracking-tight leading-[1.15] [text-wrap:balance]">
            Everything you need to land interviews{' '}
            <span className="text-[#4a4df2] block sm:inline">in one place</span>
          </h2>
        </div>

        {/* Mobile/Tablet (< lg): Single Sleek Horizontal Swipeable Strip */}
        <div
          role="tablist"
          aria-label="MakeMyCV Features Tabs"
          className="lg:hidden -mx-4 px-4 pb-2 mb-8 overflow-x-auto scrollbar-none snap-x flex items-center gap-2.5"
        >
          {tabs.map((tab, idx) => renderTabButton(tab, idx, true))}
        </div>

        {/* Desktop (lg+): Classic Two Centered Rows */}
        <div
          role="tablist"
          aria-label="MakeMyCV Features Tabs"
          className="hidden lg:flex flex-col items-center gap-3 w-full max-w-5xl mx-auto mb-14"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {row1Tabs.map((tab, idx) => renderTabButton(tab, idx))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {row2Tabs.map((tab, idx) => renderTabButton(tab, idx + 5))}
          </div>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Mobile Feature Headline & Controls right above editor on small screens */}
          <div className="lg:hidden text-left space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#4a4df2] tabular-nums">
                Feature {activeTab + 1} of {tabs.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white active:bg-slate-50 text-slate-800 flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2]"
                  aria-label="Previous feature"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white active:bg-slate-50 text-slate-800 flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2]"
                  aria-label="Next feature"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-snug [text-wrap:balance]">
              {currentTab.headline}
            </h3>
            <p className="text-base text-slate-600 leading-[1.65]">
              {currentTab.description}
            </p>
          </div>

          {/* LEFT: Dark Navy Rounded Container (#121845) holding the interactive editor preview */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl bg-[#121845] p-3 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(18,24,69,0.3)] relative overflow-hidden">
              {/* White App Window */}
              <div className="rounded-xl bg-white shadow-xl border border-slate-200/80 overflow-hidden flex flex-col relative">
                {/* 1. Top Editor Header Bar */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-white border-b border-slate-200 text-xs gap-2">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {activeTab === 0 ? 'Resume builder' : currentTab.name}
                  </span>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button
                      type="button"
                      className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Printer className="w-3 h-3 text-slate-500" />
                      <span>Print</span>
                    </button>
                    <button
                      type="button"
                      className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span>Email</span>
                    </button>
                    <Link
                      href="/builder"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-medium transition-colors whitespace-nowrap"
                    >
                      <Download className="w-3 h-3 text-slate-500" />
                      <span>PDF</span>
                    </Link>
                    <Link
                      href="/start"
                      className="inline-flex items-center justify-center px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#4a4df2] hover:bg-[#3d40e0] text-white font-semibold text-[11px] sm:text-[11.5px] transition-colors shadow-2xs whitespace-nowrap"
                    >
                      Save &amp; next
                    </Link>
                  </div>
                </div>

                {/* 2. Sub-Toolbar Bar (Mobile Quick Color Picker + Desktop Language/Zoom) */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-[#f8fafc] border-b border-slate-200 text-[11px] text-slate-600 gap-2">
                  <div className="flex items-center gap-1 font-medium text-slate-700 truncate">
                    <span className="truncate">My new CV</span>
                    <Edit2 className="w-2.5 h-2.5 text-[#5054ec] shrink-0" />
                  </div>

                  {/* Mobile Compact Color Swatch Strip (< sm) */}
                  <div className="flex sm:hidden items-center gap-1.5">
                    {['#4a4df2', '#10b981', '#0f172a', '#dc2626', '#2563eb'].map((hex) => (
                      <button
                        key={hex}
                        type="button"
                        onClick={() => setSelectedColor(hex)}
                        style={{ backgroundColor: hex }}
                        aria-label={`Select accent colour ${hex}`}
                        className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                          selectedColor === hex ? 'ring-2 ring-slate-400 scale-110' : ''
                        }`}
                      />
                    ))}
                  </div>

                  <div className="hidden sm:flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-slate-700 font-medium">
                      <span>English (UK)</span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>

                    <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2 tabular-nums">
                      <span className="text-[10px] font-semibold text-slate-700">100%</span>
                      <button
                        type="button"
                        aria-label="Zoom out preview"
                        className="text-slate-400 hover:text-slate-700 font-bold px-0.5 cursor-pointer"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Zoom in preview"
                        className="text-slate-400 hover:text-slate-700 font-bold px-0.5 cursor-pointer"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Main Workspace: Full-Width Crisp CV on <sm, Side-by-Side Drawer + CV on sm+ */}
                <div className="p-3 sm:p-4 pb-12 sm:pb-14 bg-[#edf2fb] flex gap-3 sm:gap-4 relative min-h-[380px] sm:min-h-[480px]">
                  {/* Left Drawer: Design & Formatting */}
                  <div className="hidden sm:block w-[160px] bg-white rounded-xl border border-slate-200 p-3 space-y-2.5 shadow-xs text-slate-800 shrink-0 text-[10px]">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span className="font-semibold text-[11px] text-slate-800">Formatting</span>
                      <X className="w-3 h-3 text-slate-400" />
                    </div>

                    {/* Color Circles Grid */}
                    <div className="grid grid-cols-5 gap-1.5 pt-0.5">
                      {SWATCH_COLORS.map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => setSelectedColor(hex)}
                          style={{ backgroundColor: hex }}
                          aria-label={`Accent ${hex}`}
                          className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer ${
                            selectedColor === hex
                              ? 'ring-2 ring-slate-400 scale-110'
                              : 'hover:scale-110'
                          }`}
                        />
                      ))}
                    </div>

                    {/* 2D Color Spectrum */}
                    <div className="space-y-1">
                      <div className="w-full h-16 rounded bg-gradient-to-tr from-blue-700 via-indigo-500 to-purple-400 relative overflow-hidden shadow-2xs border border-slate-200">
                        <div className="absolute top-4 left-8 w-3 h-3 rounded-full border-2 border-white shadow-md bg-transparent" />
                      </div>
                      <div className="w-full h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500" />
                      <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 pt-0.5 tabular-nums">
                        <span>72</span>
                        <span>151</span>
                        <span>81</span>
                        <span>242</span>
                      </div>
                    </div>

                    {/* Spacing & Sizing Sliders */}
                    <div className="space-y-2 border-t border-slate-100 pt-2">
                      <div>
                        <div className="flex items-center justify-between text-[9px] text-slate-600 mb-0.5">
                          <span>Line height</span>
                          <span className="font-mono font-semibold text-slate-800 tabular-nums">
                            {lineSpacing}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="2"
                          step="0.05"
                          value={lineSpacing}
                          onChange={(e) => setLineSpacing(parseFloat(e.target.value))}
                          aria-label="Line spacing"
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5054ec]"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-[9px] text-slate-600 mb-0.5">
                          <span>Font size</span>
                          <span className="font-mono font-semibold text-slate-800 tabular-nums">
                            {fontSize}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="6"
                          step="0.5"
                          value={fontSize}
                          onChange={(e) => setFontSize(parseFloat(e.target.value))}
                          aria-label="Font size"
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5054ec]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Center CV Document Sheet: Elsa Manet */}
                  <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4 text-[8.5px] leading-tight space-y-2.5 overflow-hidden flex flex-col justify-between min-w-0">
                    <div>
                      {/* Header Section with Candidate Portrait */}
                      <div className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-[#eef2ff] border border-slate-200 shrink-0 relative">
                          <Image
                            src="/assets/hero-new-candidate.png"
                            alt="Elsa Manet"
                            fill
                            sizes="44px"
                            className="object-cover object-top"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[13px] sm:text-[14px] text-slate-900 leading-tight">
                            Elsa Manet
                          </h4>
                          <p
                            className="font-semibold text-[8px] sm:text-[8.5px] mt-0.5 truncate"
                            style={{ color: selectedColor }}
                          >
                            Women&apos;s Ready-to-Wear Sales Consultant
                          </p>

                          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7px] text-slate-500 mt-1">
                            <span className="flex items-center gap-1 truncate">
                              <Phone className="w-2 h-2 text-slate-400 shrink-0" />
                              <span className="truncate">+44 20 7946 0192</span>
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <Calendar className="w-2 h-2 text-slate-400 shrink-0" />
                              <span>London, UK</span>
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <Mail className="w-2 h-2 text-slate-400 shrink-0" />
                              <span className="truncate">elsa.manet@cv.co.uk</span>
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <Car className="w-2 h-2 text-slate-400 shrink-0" />
                              <span>Full UK Licence</span>
                            </span>
                            <span className="hidden xs:flex sm:flex items-center gap-1 truncate">
                              <MapPin className="w-2 h-2 text-slate-400 shrink-0" />
                              <span>Mayfair, W1K</span>
                            </span>
                            <span className="hidden xs:flex sm:flex items-center gap-1 truncate">
                              <Linkedin className="w-2 h-2 text-slate-400 shrink-0" />
                              <span className="truncate">linkedin.com/in/elsa</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Main Two Columns */}
                      <div
                        className="grid grid-cols-12 gap-2.5 pt-2"
                        style={{ lineHeight: lineSpacing }}
                      >
                        <div className="col-span-4 border-r border-slate-100 pr-1.5 space-y-2">
                          <div>
                            <p className="font-bold uppercase tracking-wider text-[7.5px] text-slate-900 mb-0.5">
                              Skills
                            </p>
                            <p className="text-[7px] text-slate-600">Client advisory &amp; VIP styling</p>
                          </div>
                          <div>
                            <p className="font-bold uppercase tracking-wider text-[7.5px] text-slate-900 mb-0.5">
                              Languages
                            </p>
                            <p className="text-[7px] text-slate-600">English (Fluent)</p>
                            <p className="text-[7px] text-slate-600">French (Native)</p>
                          </div>
                          <div>
                            <p className="font-bold uppercase tracking-wider text-[7.5px] text-slate-900 mb-0.5">
                              Interests
                            </p>
                            <p className="text-[7px] text-slate-600">Swimming · Design</p>
                          </div>
                        </div>

                        <div className="col-span-8 pl-1 space-y-2">
                          <div>
                            <p className="font-bold uppercase tracking-wider text-[7.5px] text-slate-900 mb-0.5">
                              Profile
                            </p>
                            <p className="text-[7px] text-slate-600 leading-normal">
                              Over 5 years of experience in luxury ready-to-wear retail across flagship London boutiques, consistently exceeding quarterly targets.
                            </p>
                          </div>

                          <div>
                            <p
                              className="font-bold uppercase tracking-wider text-[7.5px] mb-0.5"
                              style={{ color: selectedColor }}
                            >
                              Professional experience
                            </p>
                            <div>
                              <p className="font-bold text-[7.5px] text-slate-900">
                                Senior Ready-to-Wear Consultant
                              </p>
                              <p className="text-[6.5px] text-slate-400">
                                Sandro Boutique, London · 2021 – Present
                              </p>
                              <p className="text-[7px] text-slate-600 mt-0.5">
                                • Led seasonal visual merchandising &amp; VIP client appointments
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="font-bold uppercase tracking-wider text-[7.5px] text-slate-900 mb-0.5">
                              Education
                            </p>
                            <p className="font-bold text-[7px] text-slate-800">
                              BA (Hons) Fashion Management
                            </p>
                            <p className="text-[6.5px] text-slate-400">
                              London College of Fashion · 2017 – 2020
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-400">
                      <span>MakeMyCV Live Preview</span>
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> ATS Verified
                      </span>
                    </div>
                  </div>

                  {/* 4. Floating Bottom Dock Bar */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 bg-[#edf0fd] border border-indigo-200/80 rounded-xl p-1 shadow-md flex items-center gap-1 z-20 max-w-[calc(100%-16px)]">
                    <button
                      type="button"
                      onClick={() => setActiveDock('templates')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        activeDock === 'templates'
                          ? 'bg-[#5054ec] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-white/60'
                      }`}
                    >
                      <Layers className="w-3 h-3 shrink-0" />
                      <span>Templates</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDock('formatting')}
                      className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[10.5px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        activeDock === 'formatting'
                          ? 'bg-[#5054ec] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-white/60'
                      }`}
                    >
                      <Sliders className="w-3 h-3 shrink-0" />
                      <span className="sm:hidden">Formatting</span>
                      <span className="hidden sm:inline">Design &amp; formatting</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDock('sections')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        activeDock === 'sections'
                          ? 'bg-[#5054ec] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-white/60'
                      }`}
                    >
                      <LayoutGrid className="w-3 h-3 shrink-0" />
                      <span>Sections</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Primary CTA below interactive preview */}
            <div className="lg:hidden mt-6">
              <Link
                href="/start"
                className="w-full min-h-[52px] inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4a4df2] to-[#6366f1] hover:from-[#3d40e0] hover:to-[#4f46e5] text-white font-bold text-base shadow-[0_8px_25px_rgba(74,77,242,0.32)] transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] whitespace-nowrap"
              >
                Create my CV
              </Link>
            </div>
          </div>

          {/* RIGHT (Desktop lg+): Headline, Description, CTA, and Carousel Arrows */}
          <div className="hidden lg:block lg:col-span-5 text-left space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#4a4df2] uppercase tracking-wider tabular-nums">
                Feature {activeTab + 1} of {tabs.length}
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-950 tracking-tight leading-[1.12] [text-wrap:balance]">
                {currentTab.headline}
              </h3>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-[1.65] max-w-md">
                {currentTab.description}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/start"
                className="min-h-[52px] inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4a4df2] to-[#6366f1] hover:from-[#3d40e0] hover:to-[#4f46e5] text-white font-bold text-base shadow-[0_8px_25px_rgba(74,77,242,0.32)] hover:shadow-[0_12px_28px_rgba(74,77,242,0.42)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] whitespace-nowrap"
              >
                Create my CV
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-all duration-150 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2]"
                aria-label="Previous feature"
              >
                <ChevronLeft className="w-5 h-5 text-slate-800" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-all duration-150 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2]"
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
