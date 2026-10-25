'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/lib/config';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  href?: string;
}

export default function Logo({ className = '', variant = 'dark', href = '/' }: LogoProps) {
  const isDark = variant === 'dark';

  const isMakemyCv = BRAND_CONFIG.name.toLowerCase() === 'makemycv';

  const content = (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight text-xl sm:text-2xl select-none ${className}`}>
      {/* Green rounded icon with clean white M matching the reference screenshot */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <rect
            x="2"
            y="2"
            width="28"
            height="28"
            rx="8"
            fill="#00B67A"
          />
          <path
            d="M8.5 21V11.5L14 17L19.5 11.5V21"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <span className={`text-[20px] sm:text-[22px] tracking-tight font-bold ${isDark ? 'text-[#0B112C]' : 'text-white'}`}>
        Makemeyour
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
