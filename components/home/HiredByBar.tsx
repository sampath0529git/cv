import React from 'react';

export default function HiredByBar() {
  return (
    <section
      aria-label="Companies hiring Makemeyour candidates"
      className="relative bg-gradient-to-b from-white via-[#F8FAFF] to-white py-8 sm:py-10 border-b border-slate-100 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xs sm:text-[13px] font-bold text-slate-600 uppercase tracking-wider text-center mb-4 sm:mb-5">
          Get hired at top companies
        </h2>

        {/* Frosted Glass Ribbon Container */}
        <div className="rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)] py-3 sm:py-4 px-5 sm:px-8">
          <div className="flex items-center justify-between gap-6 sm:gap-8 overflow-x-auto scrollbar-none py-1 text-slate-400">
          {/* Google */}
          <div className="flex items-center justify-center shrink-0 hover:text-slate-800 transition-colors">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-400 hover:text-slate-700">
              Google
            </span>
          </div>

          {/* Microsoft */}
          <div className="flex items-center gap-1.5 shrink-0 hover:text-slate-800 transition-colors">
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <span className="bg-[#F25022] rounded-xs" />
              <span className="bg-[#7FBA00] rounded-xs" />
              <span className="bg-[#00A4EF] rounded-xs" />
              <span className="bg-[#FFB900] rounded-xs" />
            </div>
            <span className="text-base sm:text-lg font-semibold text-slate-500">
              Microsoft
            </span>
          </div>

          {/* Amazon */}
          <div className="flex items-center shrink-0 hover:text-slate-800 transition-colors">
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-500">
              amazon
            </span>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-1 shrink-0 hover:text-slate-800 transition-colors">
            <span className="text-base sm:text-lg font-bold text-slate-600">Linked</span>
            <span className="bg-slate-500 text-white font-bold text-xs px-1 py-0.5 rounded-sm">in</span>
          </div>

          {/* Deloitte. */}
          <div className="flex items-center shrink-0 hover:text-slate-800 transition-colors">
            <span className="text-base sm:text-lg font-bold text-slate-600">
              Deloitte<span className="text-emerald-500">.</span>
            </span>
          </div>

          {/* Nike Swoosh */}
          <div className="flex items-center shrink-0 hover:text-slate-800 transition-colors">
            <svg
              className="w-10 h-5 text-slate-400 hover:text-slate-800 transition-colors fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M21.707 5.293c-.225-.225-.568-.313-.88-.231L3.414 9.424c-.66.173-1.077.828-.962 1.503.116.674.686 1.183 1.365 1.218l9.646.495-7.608 2.536c-.636.212-.997.886-.827 1.542.17.656.816 1.053 1.482.911l14.125-3.027c.432-.093.774-.41.875-.837.102-.427-.058-.874-.408-1.144L21.707 5.293z" />
            </svg>
          </div>

          {/* IBM */}
          <div className="flex items-center shrink-0 hover:text-slate-800 transition-colors">
            <span className="text-base sm:text-lg font-extrabold tracking-widest text-slate-500 font-mono">
              IBM
            </span>
          </div>

          {/* Tesla */}
          <div className="flex items-center shrink-0 hover:text-slate-800 transition-colors">
            <span className="text-base sm:text-lg font-bold tracking-[0.2em] text-slate-500">
              TESLA
            </span>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
