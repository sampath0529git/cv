'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import {
  ArrowUp,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Star,
  Lock,
  Globe,
  FileCheck,
  Sparkles,
  Heart,
  ChevronRight,
  Check,
} from 'lucide-react';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!emailInput || !emailInput.includes('@') || !emailInput.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
    }, 1500);
  };

  return (
    <footer
      aria-label="freecvmakeruk.co.uk Global Footer"
      className="bg-slate-900 text-slate-300 border-t border-slate-800"
    >
      {/* 1. Newsletter & Career Insights Strip */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-10 sm:py-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Weekly Career Advice &amp; CV Tips</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Get interview tips &amp; salary benchmarks
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Join over 250,000+ job seekers receiving recruiter-approved templates, ATS guidance, and career strategies directly to their inbox.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <div className="w-full lg:w-auto shrink-0">
              {subscribed ? (
                <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Thank you! Check your inbox for your free UK CV Checklist.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-[440px]"
                >
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full min-h-[46px] pl-10 pr-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="min-h-[46px] px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
              {errorMsg && (
                <p className="text-xs text-rose-400 mt-2 text-left pl-1">{errorMsg}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Multi-Column Sitemap Grid */}
      <div className="py-14 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 text-left">
            {/* Column 1: Brand & Credibility (4 cols on lg) */}
            <div className="lg:col-span-4 space-y-5">
              <Logo variant="light" href="/" />

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                freecvmakeruk.co.uk is the UK&apos;s leading free CV maker. Create recruiter-approved, ATS-compliant UK CVs and resumes in minutes with instant free PDF &amp; Word downloads.
              </p>

              {/* Trust Indicators */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">4.8/5 on Trustpilot</span>
                  <span className="text-xs text-slate-400">· 1M+ Happy Users</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ATS Verified</span>
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-blue-400" />
                    <span>256-Bit SSL Secure</span>
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>ISO A4 Calibrated</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: CV Builder & Tools (2 cols) */}
            <div className="lg:col-span-2 space-y-3.5">
              <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                CV Tools
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link href="/builder" className="hover:text-white transition-colors">
                    CV Builder Studio
                  </Link>
                </li>
                <li>
                  <Link href="/start" className="hover:text-white transition-colors">
                    Create from Scratch
                  </Link>
                </li>
                <li>
                  <Link href="/import" className="hover:text-white transition-colors">
                    Import Existing CV
                  </Link>
                </li>
                <li>
                  <Link href="/import" className="hover:text-white transition-colors">
                    LinkedIn CV Sync
                  </Link>
                </li>
                <li>
                  <Link href="/builder" className="hover:text-white transition-colors">
                    ATS Formatting Checker
                  </Link>
                </li>
                <li>
                  <Link href="/builder" className="hover:text-white transition-colors">
                    PDF &amp; DOCX Export
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: CV Templates (2 cols) */}
            <div className="lg:col-span-2 space-y-3.5">
              <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                Templates
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link href="/templates" className="hover:text-white transition-colors">
                    Corporate Executive
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-white transition-colors">
                    Modern Minimalist
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-white transition-colors">
                    Tech &amp; Engineering
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-white transition-colors">
                    Graduate &amp; Starter
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-white transition-colors">
                    Academic Traditional
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-white transition-colors">
                    Creative &amp; Design
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Career Advice & Guides (2 cols) */}
            <div className="lg:col-span-2 space-y-3.5">
              <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                Resources
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link href="/templates" className="hover:text-white transition-colors">
                    UK CV Templates
                  </Link>
                </li>
                <li>
                  <Link href="/import" className="hover:text-white transition-colors">
                    Smart CV Parser
                  </Link>
                </li>
                <li>
                  <Link href="/builder" className="hover:text-white transition-colors">
                    AI Summary Rewrite
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Career Advice Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Company & Legal (2 cols) */}
            <div className="lg:col-span-2 space-y-3.5">
              <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                Company &amp; Legal
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link href="#how-it-works" className="hover:text-white transition-colors">
                    About freecvmakeruk.co.uk
                  </Link>
                </li>
                <li>
                  <Link href="/start" className="hover:text-white transition-colors">
                    Start Free CV
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/builder" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/builder" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Systems Operational</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Trademark Disclaimer Notice */}
      <div className="border-t border-slate-800/80 py-6 text-slate-500 text-[11px] leading-relaxed">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <p>
            *The names and logos of companies such as Google, Microsoft, Amazon, LinkedIn, Deloitte, Nike, IBM, and Tesla are trademarks belonging to their respective owners. Mention of these companies indicates where our candidates have successfully interviewed or worked and does not imply direct commercial partnership or endorsement.
          </p>
        </div>
      </div>

      {/* 4. Bottom Sub-Footer Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-center md:text-left">
              <span>&copy; 2026 freecvmakeruk.co.uk. All rights reserved.</span>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <Link href="/builder" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <span>·</span>
              <Link href="/builder" className="hover:text-white transition-colors">
                Terms
              </Link>
              <span>·</span>
              <Link href="/builder" className="hover:text-white transition-colors">
                Cookies
              </Link>
              <span>·</span>
              <Link href="/builder" className="hover:text-white transition-colors">
                Security
              </Link>
            </div>

            {/* Social Media Icons & Scroll to Top */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-slate-400">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter / X"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>

              {/* Scroll To Top Button */}
              <button
                type="button"
                onClick={scrollToTop}
                className="w-9 h-9 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                aria-label="Scroll back to top"
                title="Back to top"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
