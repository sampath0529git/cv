'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import Logo from '@/components/brand/Logo';

export default function TopNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', isActive: pathname === '/' },
    {
      href: '/templates',
      label: 'Templates',
      isActive: pathname.startsWith('/templates'),
    },
    {
      href: '/blog',
      label: 'Blog',
      isActive: pathname.startsWith('/blog'),
    },
  ];

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
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-white/75 backdrop-blur-xl border-b border-white/70 shadow-[0_8px_32px_rgba(15,23,42,0.06),inset_0_-1px_0_rgba(255,255,255,0.8)]'
          : 'bg-white/85 backdrop-blur-lg border-b border-white/60 shadow-[0_2px_16px_rgba(15,23,42,0.03)]'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-[56px] sm:h-[64px] md:h-[72px] flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center shrink-0">
          <Logo variant="dark" href="/" />
        </div>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-2 text-[15px] whitespace-nowrap transition-colors ${
                item.isActive
                  ? 'font-semibold text-[#2563EB]'
                  : 'font-medium text-slate-700 hover:text-[#2563EB]'
              }`}
            >
              <span>{item.label}</span>
              {item.isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2563EB] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Desktop CTA (Login button removed) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link
            href="/start"
            className="h-[42px] px-6 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold flex items-center justify-center shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile Actions: Primary CTA + Hamburger Button */}
        <div className="flex items-center gap-2.5 md:hidden shrink-0">
          <Link
            href="/start"
            className="min-h-[38px] px-4 rounded-full bg-[#2563EB] text-white text-xs font-semibold inline-flex items-center justify-center shadow-xs"
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
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
            className="fixed inset-0 top-[56px] bg-slate-900/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 md:hidden border-t border-white/60 bg-white/90 backdrop-blur-2xl px-4 pt-3 pb-6 shadow-2xl rounded-b-3xl">
            <nav className="flex flex-col divide-y divide-slate-100" aria-label="Mobile Navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[48px] flex items-center justify-between px-3 py-2.5 text-sm ${
                    item.isActive
                      ? 'font-semibold text-[#2563EB]'
                      : 'font-medium text-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      item.isActive ? 'text-[#2563EB]' : 'text-slate-400'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <Link
                href="/start"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[46px] rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm flex items-center justify-center shadow-sm active:scale-[0.99] whitespace-nowrap"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
