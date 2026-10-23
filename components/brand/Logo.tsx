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
      {/* Exact Makemycv Squircle Mark from Reference Screenshot */}
      <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Rounded Squircle */}
          <rect
            x="2"
            y="2"
            width="28"
            height="28"
            rx="9"
            fill={isDark ? '#000000' : '#FFFFFF'}
          />
          {/* Internal white ribbon cutout matching Makemycv */}
          <path
            d="M9 16C9 12.134 12.134 9 16 9C19.866 9 23 12.134 23 16C23 19.866 19.866 23 16 23C13.5 23 11 21.5 10 19"
            stroke={isDark ? '#FFFFFF' : '#0F1B4D'}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Name Typography */}
      {isMakemyCv ? (
        <span className={`text-[21px] sm:text-[23px] tracking-tight ${isDark ? 'text-black' : 'text-white'}`}>
          <span className="font-medium">Makemy</span>
          <span className="font-extrabold">cv</span>
        </span>
      ) : (
        <span className={`text-[21px] sm:text-[23px] tracking-tight font-bold ${isDark ? 'text-[#0F1B4D]' : 'text-white'}`}>
          {BRAND_CONFIG.name}
        </span>
      )}
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
