'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useCvStore } from '@/store/useCvStore';

const LANGUAGES = [
  'English (UK)',
  'English (US)',
  'Sinhala',
  'Tamil',
  'French',
  'German',
  'Spanish',
];

export default function LanguageSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const language = useCvStore((state) => state.language);
  const setLanguage = useCvStore((state) => state.setLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] text-slate-600 hover:text-slate-900 font-normal py-2 px-3 rounded-lg hover:bg-slate-100/60 transition-colors cursor-pointer select-none"
      >
        <Globe className="w-4 h-4 text-[#4B4DED]" />
        <span>Your CV language</span>
        <span className="font-medium text-[#4B4DED] underline underline-offset-2 ml-0.5">
          {language}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white shadow-xl border border-slate-100 py-1.5 z-50 animate-[fadeIn_0.15s_ease-out]">
          <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Select Language
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = language === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-[#EEF1FF] text-[#4B4DED] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{lang}</span>
                {isSelected && <Check className="w-4 h-4 text-[#4B4DED]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
