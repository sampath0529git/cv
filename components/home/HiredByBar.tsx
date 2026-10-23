import React from 'react';
import Image from 'next/image';

export default function HiredByBar() {
  return (
    <section className="bg-white py-12 sm:py-16 border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        {/* Heading matching reference screenshot */}
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight text-center mb-8 sm:mb-12">
          Get hired at top companies
        </h2>

        {/* Logo Banner with soft edge fades matching the screenshot */}
        <div className="relative w-full">
          {/* Subtle gradient fades on both edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Logo Showcase Row */}
          <div className="flex items-center justify-center overflow-x-auto scrollbar-none py-2">
            <Image
              src="/assets/top-companies-logos.png"
              alt="Get hired at top companies: HSBC, OVO Energy, Ocado Group, Tesco, BT, Amazon, Microsoft, Unilever, ASOS, Nike, BBC"
              width={1884}
              height={110}
              className="min-w-[860px] md:min-w-0 w-full max-w-[1360px] h-auto object-contain select-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}


