'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ChevronRight, ArrowRight } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import { useCvStore } from '@/store/useCvStore';

const UK_NICHE_SHORTCUTS = [
  { href: '/cv-template-16-year-old', label: '16-Year-Old CV' },
  { href: '/school-leaver-cv-template', label: 'School Leaver' },
  { href: '/graduate-cv-templates', label: 'Graduate CVs' },
  { href: '/nursing-cv-template', label: 'NHS & Nursing' },
  { href: '/finance-cv-template', label: 'Finance & City' },
  { href: '/ats-friendly-cv-template', label: 'ATS-Friendly' },
];

export default function TopNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);

  const experiencesCount = useCvStore((s) => s.experiences.length);
  const educationsCount = useCvStore((s) => s.educations.length);
  const skillsCount = useCvStore((s) => s.skills.length);
  const hasSummary = useCvStore((s) => Boolean(s.summary?.trim()));
  const hasJobTitle = useCvStore((s) => Boolean(s.contact?.jobTitle?.trim()));
  const hasImportedFile = useCvStore((s) => Boolean(s.importedFileName));

  useEffect(() => {
    setHasSavedDraft(
      experiencesCount > 0 ||
        educationsCount > 0 ||
        skillsCount > 0 ||
        hasSummary ||
        hasJobTitle ||
        hasImportedFile
    );
  }, [
    experiencesCount,
    educationsCount,
    skillsCount,
    hasSummary,
    hasJobTitle,
    hasImportedFile,
  ]);

  const isStartPage = pathname === '/start';
  const isTemplateRoute =
    pathname === '/cv-templates' ||
    pathname.startsWith('/cv-template') ||
    pathname === '/school-leaver-cv-template' ||
    pathname === '/graduate-cv-templates' ||
    pathname === '/acting-cv-template' ||
    pathname === '/finance-cv-template' ||
    pathname === '/nursing-cv-template' ||
    pathname === '/ats-friendly-cv-template';

  const navItems = [
    { href: '/', label: 'Home', isActive: pathname === '/' },
    {
      href: '/cv-templates',
      label: 'Templates',
      isActive: isTemplateRoute,
    },
    {
      href: '/import',
      label: 'Import CV',
      isActive: pathname === '/import',
    },
    {
      href: '/blog',
      label: 'Blog',
      isActive: pathname.startsWith('/blog'),
    },
  ];

  // Close mobile drawer automatically on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Scroll listener for subtle sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on viewport resize to desktop or Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock background scroll while mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  const primaryDesktopHref = isStartPage ? '/builder' : '/start';
  const primaryDesktopLabel = isStartPage
    ? hasSavedDraft
      ? 'Continue CV'
      : 'Open Builder'
    : 'Get Started Free';

  const primaryMobileHref = isStartPage ? '/builder' : '/start';
  const primaryMobileLabel = isStartPage
    ? hasSavedDraft
      ? 'Continue'
      : 'Builder'
    : 'Start CV';

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.05)]'
          : 'bg-white/90 backdrop-blur-lg border-b border-slate-200/75'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-3.5 sm:px-6 lg:px-8 h-[56px] md:h-[68px] flex items-center justify-between gap-3 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center min-w-0 shrink-0">
          <Logo variant="dark" href="/" />
        </div>

        {/* Zone 2: Desktop Navigation Links (4 concise single-line links) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-2 text-[14.5px] whitespace-nowrap shrink-0 transition-colors duration-150 ${
                item.isActive
                  ? 'font-semibold text-[#2563EB]'
                  : 'font-medium text-slate-600 hover:text-slate-950'
              }`}
            >
              <span>{item.label}</span>
              {item.isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563EB] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Desktop Single Primary Action */}
        <div className="hidden md:flex items-center shrink-0">
          <Link
            href={primaryDesktopHref}
            className="h-[42px] px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold inline-flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(37,99,235,0.24)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.34)] active:scale-[0.98] transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{primaryDesktopLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>

        {/* Mobile Actions: Single-line Primary CTA + 44x44 Tactile Menu Button */}
        <div className="flex items-center gap-2 md:hidden shrink-0">
          <Link
            href={primaryMobileHref}
            className="h-[36px] px-3.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.97] text-white text-[12.5px] font-semibold inline-flex items-center justify-center shadow-[0_2px_10px_rgba(37,99,235,0.22)] transition-all duration-150 whitespace-nowrap shrink-0"
          >
            {primaryMobileLabel}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`min-h-[44px] min-w-[44px] rounded-xl border flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer shrink-0 ${
              mobileMenuOpen
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'bg-slate-50/90 hover:bg-slate-100 border-slate-200/90 text-slate-800'
            }`}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-sheet"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="fixed inset-0 top-[56px] bg-slate-950/35 backdrop-blur-[2px] z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-nav-sheet"
              key="mobile-nav-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 top-[56px] z-50 md:hidden max-h-[calc(100dvh-56px)] overflow-y-auto bg-white border-b border-slate-200 shadow-[0_20px_48px_rgba(15,23,42,0.16)] rounded-b-3xl px-4 pt-3 pb-6"
            >
              {/* Primary Navigation Tap Rows */}
              <nav className="flex flex-col divide-y divide-slate-100" aria-label="Mobile Navigation">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[52px] flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] transition-colors duration-150 ${
                      item.isActive
                        ? 'font-semibold text-[#2563EB] bg-blue-50/60'
                        : 'font-medium text-slate-800 active:bg-slate-50'
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${
                        item.isActive ? 'text-[#2563EB]' : 'text-slate-400'
                      }`}
                    />
                  </Link>
                ))}
              </nav>

              {/* Popular UK Template Categories Quick-Jump Grid */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between px-1 mb-2.5">
                  <span className="text-xs font-semibold text-slate-500">
                    UK Templates by Career Stage
                  </span>
                  <Link
                    href="/cv-templates"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-semibold text-[#2563EB] hover:underline whitespace-nowrap"
                  >
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {UK_NICHE_SHORTCUTS.map((niche) => {
                    const isNicheActive = pathname === niche.href;
                    return (
                      <Link
                        key={niche.href}
                        href={niche.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`min-h-[44px] px-3 py-2 rounded-xl border text-[13px] font-medium flex items-center justify-between gap-1.5 transition-colors duration-150 ${
                          isNicheActive
                            ? 'border-[#2563EB] bg-blue-50/70 text-[#2563EB] font-semibold'
                            : 'border-slate-200/85 bg-slate-50/60 text-slate-700 active:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{niche.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Thumb-Zone Action Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                {hasSavedDraft ? (
                  <>
                    <Link
                      href="/builder"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full min-h-[48px] px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-[14.5px] flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.25)] active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
                    >
                      <span>Continue Editing Your CV</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                    {!isStartPage && (
                      <Link
                        href="/start"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full min-h-[46px] px-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-[14px] flex items-center justify-center active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
                      >
                        Start New or Import CV
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      href={isStartPage ? '/builder' : '/start'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full min-h-[48px] px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-[14.5px] flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.25)] active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
                    >
                      <span>{isStartPage ? 'Open Blank CV Builder' : 'Start Free UK CV'}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                    <Link
                      href="/import"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full min-h-[46px] px-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-[14px] flex items-center justify-center active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
                    >
                      Upload Existing CV (PDF / Word)
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
