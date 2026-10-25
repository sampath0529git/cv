'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  title: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  avatarBg: string;
}

const reviews: Review[] = [
  {
    id: 'rev-1',
    rating: 5,
    title: 'Landed interviews within two days',
    quote:
      'Clean UK A4 formatting and super fast to edit on my phone. Exported the PDF in seconds and got two interview callbacks the same week.',
    author: 'Ivan K.',
    role: 'Financial Analyst · London',
    initials: 'IK',
    avatarBg: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'rev-2',
    rating: 5,
    title: 'Extremely easy to organise',
    quote:
      'The step-by-step layout made structuring my work history effortless. Switching between corporate templates kept every bullet aligned.',
    author: 'Ally Fox',
    role: 'Operations Manager · Manchester',
    initials: 'AF',
    avatarBg: 'from-purple-600 to-indigo-600',
  },
  {
    id: 'rev-3',
    rating: 5,
    title: 'Mobile friendly and straightforward',
    quote:
      'Updated my CV on the train from my phone, shared a preview link for feedback, and downloaded the final A4 PDF without any layout issues.',
    author: 'Rocco Giordano',
    role: 'Product Designer · Bristol',
    initials: 'RG',
    avatarBg: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'rev-4',
    rating: 5,
    title: 'Crisp templates that recruiters love',
    quote:
      'Straightforward to build, zero clutter, and the Hopkins and Oxford templates look far sharper than standard Word documents.',
    author: 'Lorenzo M.',
    role: 'Graduate Consultant · Edinburgh',
    initials: 'LM',
    avatarBg: 'from-amber-500 to-orange-600',
  },
  {
    id: 'rev-5',
    rating: 5,
    title: 'Passed ATS screening immediately',
    quote:
      'The pre-written bullet suggestions and keyword alignment helped me tailor my CV for NHS and public sector applications flawlessly.',
    author: 'Sarah Jenkins',
    role: 'Programme Lead · Leeds',
    initials: 'SJ',
    avatarBg: 'from-rose-500 to-indigo-600',
  },
  {
    id: 'rev-6',
    rating: 5,
    title: 'Secured senior director role',
    quote:
      'The Modern Executive layout gave my board-level achievements the authoritative, polished presentation they needed. 10/10 tool.',
    author: 'Marcus Sterling',
    role: 'Commercial Director · London',
    initials: 'MS',
    avatarBg: 'from-slate-700 to-indigo-900',
  },
];

export default function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
  };

  // Rotate reviews based on active carousel index
  const orderedReviews = reviews.map(
    (_, offset) => reviews[(startIndex + offset) % reviews.length]
  );

  return (
    <section
      aria-label="User reviews and testimonials"
      className="py-16 sm:py-20 lg:py-24 bg-[#fafcff] sm:bg-white border-t border-slate-100"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Trustpilot Rating */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight tabular-nums [text-wrap:balance]">
            +1 million satisfied users
          </h2>

          <div
            className="flex items-center justify-center gap-2 flex-wrap text-xs sm:text-sm"
            aria-label="Rated Excellent on Trustpilot based on 3,000 plus verified ratings"
          >
            <span className="font-bold tracking-wider text-slate-900 text-xs">EXCELLENT</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-[1px]"
                >
                  <Star className="w-2.5 h-2.5 fill-white text-white" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-slate-600 font-medium tabular-nums text-xs">
              <span>on</span>
              <span className="font-bold text-slate-900">★ Trustpilot</span>
              <span className="text-slate-300 mx-1">·</span>
              <span className="text-slate-500">3,000+ verified ratings</span>
            </div>
          </div>

          {/* Carousel Controls with Page Indicator */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:border-slate-300 active:scale-95 flex items-center justify-center transition-all duration-150 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2]"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Carousel Dot Indicators */}
            <div className="flex items-center gap-1.5 px-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStartIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2] ${
                    startIndex === i ? 'w-6 bg-[#4a4df2]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:border-slate-300 active:scale-95 flex items-center justify-center transition-all duration-150 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a4df2]"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Review Cards Grid with Unified Heights and Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {orderedReviews.map((rev, idx) => (
            <div
              key={rev.id}
              className={`h-full rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] p-6 flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 group ${
                idx === 0
                  ? 'flex'
                  : idx === 1
                  ? 'hidden sm:flex'
                  : 'hidden lg:flex'
              }`}
            >
              <div className="space-y-3.5">
                {/* Top Row: Stars + Verified Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-[2px]"
                      >
                        <Star className="w-2.5 h-2.5 fill-white text-white" />
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified User</span>
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-[15px] leading-snug">
                  {rev.title}
                </h3>

                <p className="text-sm text-slate-600 leading-[1.65]">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author & Avatar Section */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-tr ${rev.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 ring-2 ring-white`}
                >
                  {rev.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{rev.author}</p>
                  <p className="text-[11px] text-slate-500 truncate">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
