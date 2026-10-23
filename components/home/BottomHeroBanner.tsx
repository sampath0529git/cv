import React from 'react';
import Link from 'next/link';

export default function BottomHeroBanner() {
  return (
    <section className="bg-[#0b0e20] text-white py-16 md:py-24 relative overflow-hidden">
      {/* Curved white vector line art in background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C400,300 800,0 1200,200"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <path
          d="M0,250 C500,450 700,100 1200,400"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading, Subheading, Button */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Create and edit your<br />
              CV in just a few<br />
              clicks
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Stand out with a stylish CV template and land the job of your dreams.
            </p>

            <div className="pt-2">
              <Link
                href="#templates-section"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#3b5bfd] hover:bg-[#2f4ee8] text-white font-semibold text-sm shadow-md transition-all active:scale-95"
              >
                Create my CV
              </Link>
            </div>
          </div>

          {/* Right Column: Visual illustration matching the reference photo of smiling professional at desk with laptop */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 h-64 sm:w-80 sm:h-72 flex items-center justify-center">
              {/* Blue curved backing shape */}
              <div className="absolute right-0 bottom-0 w-60 h-60 bg-[#3b5bfd] rounded-tl-[80px] rounded-br-[40px] -z-10 shadow-xl opacity-90" />

              {/* Character Illustration / Card */}
              <div className="relative w-64 h-64 rounded-2xl bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 border-2 border-white/20 p-5 flex flex-col justify-between shadow-2xl text-left">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-slate-900 font-bold text-sm shadow">
                    EM
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                    Online &bull; Ready
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">Land interviews faster</div>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    &ldquo;My application passed ATS and I was invited to interview in 48 hours.&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>ATS Compliant Format</span>
                  <span className="text-blue-400 font-semibold">MakeMyCV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
