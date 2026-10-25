import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BottomHeroBanner() {
  return (
    <section className="bg-[#0b0e20] text-white py-10 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Subtle curved vector line art in background */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Left Column: Heading, Subheading, Button */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight [text-wrap:balance] max-w-xl">
              Create and edit your CV in just a few clicks
            </h2>

            <p className="text-sm sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Stand out with a recruiter-approved CV template, live A4 formatting, and instant PDF export on any device.
            </p>

            <div className="pt-1 sm:pt-2">
              <Link
                href="/start"
                className="w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#3b5bfd] hover:bg-[#2f4ee8] text-white font-semibold text-base sm:text-sm shadow-md transition-all active:scale-98 whitespace-nowrap"
              >
                <span>Create my CV</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right Column: Candidate Outcome Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[290px] sm:w-80 h-60 sm:h-68 flex items-center justify-center">
              <div className="absolute right-0 bottom-0 w-52 sm:w-60 h-52 sm:h-60 bg-[#3b5bfd] rounded-tl-[72px] rounded-br-[36px] -z-10 shadow-xl opacity-90" />

              <div className="relative w-full max-w-[260px] sm:w-64 h-56 sm:h-60 rounded-2xl bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 border border-white/20 p-5 flex flex-col justify-between shadow-2xl text-left">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-slate-900 font-bold text-sm shadow shrink-0">
                    EM
                  </div>
                  <span className="text-[11px] font-medium text-emerald-300 tabular-nums">
                    ATS Verified · A4
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-bold text-white">Land interviews faster</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    &ldquo;My application passed ATS screening and I was invited to interview within 48 hours.&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Elsa M. · London</span>
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
