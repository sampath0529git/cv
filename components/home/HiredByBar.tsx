import React from 'react';
import Image from 'next/image';

export default function HiredByBar() {
  return (
    <section className="bg-white py-9 sm:py-14 border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        <h2 className="text-xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight text-center mb-6 sm:mb-10 [text-wrap:balance]">
          Get hired at top companies
        </h2>

        <div className="relative w-full">
          {/* Soft edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Use justify-start on mobile so left-side logos are never clipped off-screen */}
          <div className="flex items-center justify-start md:justify-center overflow-x-auto scrollbar-none py-1.5 px-2">
            <Image
              src="/assets/top-companies-logos.png"
              alt="Get hired at top companies: HSBC, OVO Energy, Ocado Group, Tesco, BT, Amazon, Microsoft, Unilever, ASOS, Nike, BBC"
              width={1884}
              height={110}
              referrerPolicy="no-referrer"
              className="min-w-[660px] sm:min-w-[820px] md:min-w-0 w-full max-w-[1360px] h-auto object-contain select-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
