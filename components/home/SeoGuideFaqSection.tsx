'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SeoGuideFaqSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article id="seo-guide" className="py-12 sm:py-20 md:py-26 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Main Title */}
        <div className="text-left sm:text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Online CV Creation: Easily Create a Stylish CV
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-5 text-slate-600 leading-relaxed text-sm sm:text-base">
          <h3 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
            What is the best CV designer software?
          </h3>

          <p>
            To create your professional CV,{' '}
            <strong className="text-slate-900 font-semibold">
              using an online CV creation studio is the fastest and simplest way
            </strong>
            . Our templates are validated by recruiters so you maximise your chances of securing an interview for your target role.
          </p>

          <p>To create your CV, follow these three steps:</p>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-md bg-[#daf5ea] text-[#00a86b] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                1
              </span>
              <p className="text-slate-700 text-sm sm:text-base">
                Choose the CV design that suits your industry from our recruiter-approved templates.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-md bg-[#daf5ea] text-[#00a86b] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                2
              </span>
              <p className="text-slate-700 text-sm sm:text-base">
                Complete each section step by step (personal details, experience, education, skills, and languages).
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-md bg-[#daf5ea] text-[#00a86b] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                3
              </span>
              <p className="text-slate-700 text-sm sm:text-base">
                Download your crisp A4 PDF or generate a temporary public preview link to share.
              </p>
            </div>
          </div>

          <p className="pt-1">
            You can{' '}
            <strong className="text-slate-900 font-semibold">edit your CV anytime from your phone or laptop</strong>{' '}
            and export tailored versions for different employers in seconds.
          </p>

          {isExpanded && (
            <div className="space-y-7 pt-4 border-t border-slate-100">
              <div className="space-y-2.5">
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
                  How to create a simple CV that appeals to UK recruiters?
                </h3>
                <p>
                  Recruiters scan applications quickly. Keep your layout clean, consistent, and structured into clear sections:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Contact details &amp; location (city and postcode)</li>
                  <li>Concise 3–4 line executive summary</li>
                  <li>Reverse-chronological work experience with measurable outcomes</li>
                  <li>Education, degrees, and academic grades</li>
                  <li>Core technical skills, certifications, and languages</li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
                  What colour should you choose for a modern CV?
                </h3>
                <p>
                  While monochrome remains traditional for law and investment banking, subtle navy, indigo, slate, or forest accents give modern corporate and tech CVs crisp visual hierarchy without distracting ATS parsers.
                </p>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
                  How to create a CV using your phone?
                </h3>
                <p>
                  <strong className="text-slate-900 font-semibold">Our CV builder is fully mobile friendly</strong>{' '}
                  with dedicated Edit, Design, and live A4 Preview tabs so you can write, style, share, and download your PDF directly from your smartphone browser—no app installation needed.
                </p>
              </div>
            </div>
          )}

          {/* Touch-Friendly Show More / Show Less Toggle */}
          <div className="text-center pt-4 sm:pt-6">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-900 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{isExpanded ? 'Show less' : 'Read full UK CV guide'}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
