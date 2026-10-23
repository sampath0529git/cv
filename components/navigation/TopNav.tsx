'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, FileText } from 'lucide-react';

export default function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-20 flex items-center justify-between">
        {/* Left: MakeMyCV Brand Logo */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center group" aria-label="Makemycv Home">
            <Image
              src="/assets/logo-mark.png"
              alt="Makemycv"
              width={220}
              height={60}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links matching exact screenshot */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {/* CV builder */}
            <Link
              href="#cv-builder-section"
              className="flex items-center gap-2.5 text-[15px] font-medium text-slate-900 hover:text-[#4a4df2] transition-colors py-1 group"
            >
              {/* Exact folded document with pencil icon from screenshot */}
              <svg
                className="w-[18px] h-[18px] text-[#4a4df2] transition-transform group-hover:scale-105"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M4 21l3.5-3.5 2 2L6 23z" />
              </svg>
              <span>CV builder</span>
            </Link>

            {/* Cover letter */}
            <Link
              href="#features-section"
              className="flex items-center gap-2.5 text-[15px] font-medium text-slate-900 hover:text-[#4a4df2] transition-colors py-1 group"
            >
              {/* Exact document with dashed rows icon from screenshot */}
              <svg
                className="w-[18px] h-[18px] text-[#4a4df2] transition-transform group-hover:scale-105"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="15" x2="10" y2="15" />
                <line x1="12" y1="15" x2="14" y2="15" />
                <line x1="8" y1="18" x2="10" y2="18" />
                <line x1="12" y1="18" x2="14" y2="18" />
              </svg>
              <span>Cover letter</span>
            </Link>

            {/* Features Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setFeaturesDropdownOpen(!featuresDropdownOpen)}
                onBlur={() => setTimeout(() => setFeaturesDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 text-[15px] font-medium text-slate-900 hover:text-[#4a4df2] transition-colors py-1 cursor-pointer"
                aria-expanded={featuresDropdownOpen}
              >
                <span>Features</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-700 transition-transform duration-200 ${
                    featuresDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {featuresDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="#cv-builder-section"
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#4a4df2]"
                  >
                    CV Builder &amp; Editor
                  </Link>
                  <Link
                    href="#templates-section"
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#4a4df2]"
                  >
                    Recruiter Templates
                  </Link>
                  <Link
                    href="#seo-guide"
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#4a4df2]"
                  >
                    UK CV Guide 2026
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Nav: Language selector and My account with exact styling from image_c32bf789.png */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language selector dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
              className="h-[44px] px-3.5 rounded-xl border border-slate-200/90 hover:border-slate-300 text-[15px] font-medium text-[#0f172a] transition-all bg-white flex items-center gap-2 shadow-2xs hover:shadow-xs cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-slate-200"
              aria-label="Select language (Current: English UK)"
              aria-expanded={langDropdownOpen}
            >
              {/* Razor-sharp official UK Union Jack Flag SVG */}
              <svg className="w-[20px] h-[14px] rounded-[2px] shadow-2xs shrink-0" viewBox="0 0 60 30" aria-hidden="true">
                <clipPath id="uk-clip-top">
                  <path d="M0,0 v30 h60 v-30 z"/>
                </clipPath>
                <clipPath id="uk-diag-top">
                  <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                </clipPath>
                <g clipPath="url(#uk-clip-top)">
                  <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-diag-top)" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </g>
              </svg>
              <span className="leading-none">{selectedLang}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#64748b] transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180' : ''
                }`}
                strokeWidth={2}
              />
            </button>

            {/* Language Selection Menu */}
            {langDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  type="button"
                  onClick={() => { setSelectedLang('EN'); setLangDropdownOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <span>🇬🇧</span> English (UK)
                  </span>
                  <span className="text-[#4a4df2] font-bold">✓</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedLang('US'); setLangDropdownOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <span>🇺🇸</span> English (US)
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedLang('FR'); setLangDropdownOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <span>🇫🇷</span> Français
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedLang('DE'); setLangDropdownOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <span>🇩🇪</span> Deutsch
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* My account button matching exact reference */}
          <button
            type="button"
            onClick={() => setAccountModalOpen(true)}
            className="h-[44px] px-5 rounded-xl border border-slate-200/90 hover:border-slate-300 text-[15px] font-normal text-[#002447] hover:text-black transition-all bg-white flex items-center justify-center shadow-2xs hover:shadow-xs cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-slate-200"
          >
            My account
          </button>
        </div>

        {/* Account Sign-In Modal */}
        {accountModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8 relative animate-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => setAccountModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#4a4df2]/10 text-[#4a4df2] mx-auto flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Sign in to MakeMyCV</h3>
                <p className="text-xs text-slate-500">Access your saved CVs, tailored cover letters, and job applications.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setAccountModalOpen(false); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
                  <input
                    type="email"
                    placeholder="e.g. alex.smith@example.co.uk"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a4df2] focus:border-[#4a4df2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a4df2] focus:border-[#4a4df2]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#4a4df2] hover:bg-[#383be0] text-white font-semibold text-sm transition-all shadow-sm"
                >
                  Continue to my account
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="#templates-section"
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-[#4a4df2] text-white"
          >
            Create CV
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-3">
          <nav className="flex flex-col gap-2">
            <Link
              href="#cv-builder-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              <FileText className="w-4 h-4 text-[#4a4df2]" />
              <span>CV builder</span>
            </Link>
            <Link
              href="#features-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              <FileText className="w-4 h-4 text-[#4a4df2]" />
              <span>Cover letter</span>
            </Link>
            <Link
              href="#templates-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              <span>Features &amp; Templates</span>
            </Link>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 px-3">
              <span>🇬🇧 United Kingdom (EN)</span>
              <span className="font-semibold text-[#4a4df2]">My account</span>
            </div>
            <Link
              href="#templates-section"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center mt-3 py-3 rounded-lg bg-[#4a4df2] text-white font-semibold text-sm shadow-sm"
            >
              Create my CV
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

