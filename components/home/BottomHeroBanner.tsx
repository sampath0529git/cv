'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BottomHeroBanner() {
  return (
    <section
      aria-label="Get Started Today"
      className="py-12 sm:py-16 bg-white"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#070B1E] via-[#0A1132] to-[#121B45] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle decorative glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                GET STARTED TODAY
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
                Create and edit your CV<br className="hidden sm:block" />
                in just a few clicks
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                Join 1+ million people who&apos;ve already built their dream career with Makemeyour.
              </p>

              <div className="pt-3">
                <Link
                  href="/start"
                  className="min-h-[46px] sm:min-h-[50px] inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
                >
                  <span>Create My CV</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual: Fanned CVs with "Build your future today" badge */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
              <div className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center">
                {/* Floating Badge: Frosted Glass */}
                <div className="absolute top-4 right-0 z-20 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-xl text-white text-[11px] font-bold flex items-center gap-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Build your future today</span>
                </div>

                {/* Layered CV sheets */}
                <div className="relative w-48 h-64 bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-6 border border-slate-200 p-3 select-none">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200" />
                    <div className="space-y-1">
                      <div className="w-16 h-2 bg-slate-800 rounded" />
                      <div className="w-10 h-1.5 bg-[#2563EB] rounded" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-slate-200 rounded" />
                    <div className="w-4/5 h-1.5 bg-slate-200 rounded" />
                    <div className="w-3/4 h-1.5 bg-slate-200 rounded" />
                  </div>
                </div>

                <div className="absolute top-6 left-6 w-48 h-64 bg-white rounded-xl shadow-xl overflow-hidden transform -rotate-3 border border-slate-200 p-3 select-none">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200" />
                    <div className="space-y-1">
                      <div className="w-16 h-2 bg-slate-800 rounded" />
                      <div className="w-10 h-1.5 bg-emerald-500 rounded" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-slate-200 rounded" />
                    <div className="w-4/5 h-1.5 bg-slate-200 rounded" />
                    <div className="w-3/4 h-1.5 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
