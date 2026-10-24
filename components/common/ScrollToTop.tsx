'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 360) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-200 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#4a4df2] hover:bg-[#383be0] text-white shadow-lg hover:shadow-xl shadow-blue-500/25 transition-all duration-200 sm:hover:-translate-y-0.5 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#4a4df2] focus:ring-offset-2 cursor-pointer"
        aria-label="Scroll to top of page"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" strokeWidth={2.5} />

        <span className="absolute bottom-full mb-2 hidden sm:group-hover:block whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white shadow-md">
          Scroll to top
        </span>
      </button>
    </div>
  );
}
