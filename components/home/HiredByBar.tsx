import React from 'react';
import Image from 'next/image';

export default function HiredByBar() {
  return (
    <section
      aria-label="Companies hiring MakeMyCV users"
      className="bg-white py-10 sm:py-12 border-b border-slate-100 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-widest text-center mb-6 [text-wrap:balance]">
          Get hired at top companies
        </h2>

        <div className="relative w-full">
          {/* Soft edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Grayscale with subtle opacity, hover to full color */}
          <div className="flex items-center justify-start md:justify-center overflow-x-auto scrollbar-none py-2 px-1">
            <div className="transition-all duration-300 opacity-60 grayscale hover:opacity-100 hover:grayscale-0">
              <Image
                src="/assets/top-companies-logos.png"
                alt="Get hired at top companies: HSBC, OVO Energy, Ocado Group, Tesco, BT, Amazon, Microsoft, Unilever, ASOS, Nike, BBC"
                width={1884}
                height={110}
                referrerPolicy="no-referrer"
                className="min-w-[620px] sm:min-w-[760px] md:min-w-0 w-full max-w-[1100px] h-auto object-contain select-none"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
