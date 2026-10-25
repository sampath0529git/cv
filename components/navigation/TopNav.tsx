'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  FilePenLine,
  FileText,
  Upload,
  User,
  LayoutGrid,
  BookOpen,
} from 'lucide-react';
import Logo from '@/components/brand/Logo';

export default function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky glassmorphism elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on viewport resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ease-out ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-[12px] border-b border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.05)]'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-[64px] md:h-[72px] flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center shrink-0">
          <Logo variant="dark" href="/" />
        </div>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7" aria-label="Main Navigation">
          <Link
            href="/start"
            className="flex items-center gap-2 text-[15px] font-medium text-slate-800 hover:text-[#4a4df2] transition-colors py-1 whitespace-nowrap shrink-0"
          >
            <FilePenLine className="w-[17px] h-[17px] text-[#4a4df2] shrink-0" />
            <span>CV builder</span>
          </Link>

          <Link
            href="/templates"
            className="flex items-center gap-2 text-[15px] font-medium text-slate-800 hover:text-[#4a4df2] transition-colors py-1 whitespace-nowrap shrink-0"
          >
            <LayoutGrid className="w-[17px] h-[17px] text-[#4a4df2] shrink-0" />
            <span>Templates</span>
          </Link>

          <Link
            href="/import"
            className="flex items-center gap-2 text-[15px] font-medium text-slate-800 hover:text-[#4a4df2] transition-colors py-1 whitespace-nowrap shrink-0"
          >
            <Upload className="w-[17px] h-[17px] text-[#4a4df2] shrink-0" />
            <span>Import CV</span>
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-2 text-[15px] font-medium text-slate-800 hover:text-[#4a4df2] transition-colors py-1 whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-[17px] h-[17px] text-[#4a4df2] shrink-0" />
            <span>Blog</span>
          </Link>
        </nav>

        {/* Zone 3: Desktop Language + Account Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
              className="h-[44px] px-3.5 rounded-xl border border-slate-200/90 hover:border-slate-300 text-sm font-medium text-[#0f172a] transition-all bg-white flex items-center gap-2 shadow-2xs hover:shadow-xs cursor-pointer whitespace-nowrap shrink-0"
              aria-label="Select language (Current: English UK)"
              aria-expanded={langDropdownOpen}
            >
              <span className="leading-none">{selectedLang}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#64748b] transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {langDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-50">
                {[
                  { code: 'EN', label: 'English (UK)' },
                  { code: 'US', label: 'English (US)' },
                  { code: 'FR', label: 'Français' },
                  { code: 'DE', label: 'Deutsch' },
                ].map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setSelectedLang(item.code);
                      setLangDropdownOpen(false);
                    }}
                    className="w-full min-h-[38px] flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{item.label}</span>
                    {selectedLang === item.code && (
                      <span className="text-[#4a4df2] font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setAccountModalOpen(true)}
            className="h-[44px] px-5 rounded-xl border border-slate-200/90 hover:border-slate-300 text-[15px] font-medium text-[#002447] hover:text-black transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 bg-white flex items-center justify-center shadow-2xs hover:shadow-xs cursor-pointer whitespace-nowrap shrink-0"
          >
            My account
          </button>
        </div>

        {/* Mobile Actions: Primary CTA + 44x44px Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden shrink-0">
          <Link
            href="/start"
            className="min-h-[40px] px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#4a4df2] to-[#6366f1] hover:from-[#383be0] hover:to-[#4f46e5] text-white text-xs font-semibold inline-flex items-center justify-center shadow-2xs hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out whitespace-nowrap shrink-0"
          >
            Create CV
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 flex items-center justify-center transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[60px] bg-slate-900/25 backdrop-blur-[1px] z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-2xl rounded-b-3xl">
            <nav className="flex flex-col divide-y divide-slate-100" aria-label="Mobile Navigation">
              <Link
                href="/builder"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[52px] flex items-center justify-between px-2 py-3 text-sm font-semibold text-slate-900 active:bg-slate-50 rounded-xl"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#eef2ff] text-[#4a4df2] flex items-center justify-center shrink-0">
                    <FilePenLine className="w-4 h-4" />
                  </span>
                  <span>CV Builder Studio</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/import"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[52px] flex items-center justify-between px-2 py-3 text-sm font-semibold text-slate-900 active:bg-slate-50 rounded-xl"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#eef2ff] text-[#4a4df2] flex items-center justify-center shrink-0">
                    <Upload className="w-4 h-4" />
                  </span>
                  <span>Import Existing CV</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/templates"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[52px] flex items-center justify-between px-2 py-3 text-sm font-semibold text-slate-900 active:bg-slate-50 rounded-xl"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#eef2ff] text-[#4a4df2] flex items-center justify-center shrink-0">
                    <LayoutGrid className="w-4 h-4" />
                  </span>
                  <span>Recruiter Templates</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[52px] flex items-center justify-between px-2 py-3 text-sm font-semibold text-slate-900 active:bg-slate-50 rounded-xl"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#eef2ff] text-[#4a4df2] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <span>Career Blog &amp; Advice</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="#seo-guide"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[52px] flex items-center justify-between px-2 py-3 text-sm font-semibold text-slate-900 active:bg-slate-50 rounded-xl"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#eef2ff] text-[#4a4df2] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <span>UK CV Guide 2026</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </nav>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 px-1">
              <span className="text-xs text-slate-500 font-medium">United Kingdom ({selectedLang})</span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAccountModalOpen(true);
                }}
                className="min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#4a4df2] hover:bg-[#eef2ff] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>My account</span>
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <Link
                href="/start"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[46px] rounded-xl bg-[#4a4df2] hover:bg-[#383be0] text-white font-semibold text-sm flex items-center justify-center shadow-sm active:scale-[0.99] whitespace-nowrap"
              >
                Create my CV
              </Link>
              <Link
                href="/import"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[46px] rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold text-sm flex items-center justify-center active:scale-[0.99] whitespace-nowrap"
              >
                Import CV
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Account Sign-In Modal */}
      {accountModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/45 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => setAccountModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8 relative pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <button
              type="button"
              onClick={() => setAccountModalOpen(false)}
              className="absolute top-4 right-4 min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#4a4df2]/10 text-[#4a4df2] mx-auto flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Sign in to MakeMyCV</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Access your saved CVs, tailored cover letters, and job applications.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAccountModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  inputMode="email"
                  placeholder="e.g. alex.smith@example.co.uk"
                  required
                  className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a4df2] focus:border-[#4a4df2]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a4df2] focus:border-[#4a4df2]"
                />
              </div>
              <button
                type="submit"
                className="w-full min-h-[48px] py-3 rounded-xl bg-[#4a4df2] hover:bg-[#383be0] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
              >
                Continue to my account
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
