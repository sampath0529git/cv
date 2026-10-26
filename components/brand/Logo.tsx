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
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}
    >
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#00B67A] flex items-center justify-center shrink-0 shadow-xs">
        <FileCheck2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white stroke-[2.4]" />
      </div>

      <span
        className={`text-[17px] sm:text-[20px] tracking-tight font-extrabold leading-none ${
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
        className="inline-block transition-opacity hover:opacity-90"
      >
        {content}
      </Link>
    );
  }

  return content;
}

