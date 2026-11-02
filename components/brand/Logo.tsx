'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck2 } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  href?: string;
}

export default function Logo({ className = '', variant = 'dark', href = '/' }: LogoProps) {
  const isDark = variant === 'dark';

  const content = (
    <div
      className={`inline-flex items-center gap-2 sm:gap-2.5 font-heading font-bold tracking-tight select-none whitespace-nowrap shrink-0 ${className}`}
    >
      <div className="relative w-7.5 h-7.5 min-[390px]:w-8 min-[390px]:h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#2563EB] to-[#00B67A] flex items-center justify-center shrink-0 shadow-xs">
        <FileCheck2 className="w-4 h-4 min-[390px]:w-4.5 min-[390px]:h-4.5 sm:w-5 sm:h-5 text-white stroke-[2.4]" />
      </div>

      <span
        className={`text-[15.5px] min-[380px]:text-[16.5px] sm:text-[19.5px] tracking-tight font-extrabold leading-none whitespace-nowrap ${
          isDark ? 'text-[#0B112C]' : 'text-white'
        }`}
      >
        freecvmakeruk
        <span className={isDark ? 'text-[#2563EB]' : 'text-[#38BDF8]'}>.co.uk</span>
      </span>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label="freecvmakeruk.co.uk – Free CV Maker UK Home"
        className="inline-flex items-center min-h-[44px] shrink-0 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}
