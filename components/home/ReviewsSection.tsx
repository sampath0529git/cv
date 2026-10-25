'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  title: string;
  quote: string;
  author: string;
  role: string;
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
  },
  {
    id: 'rev-2',
    rating: 5,
    title: 'Extremely easy to organise',
    quote:
      'The step-by-step layout made structuring my work history effortless. Switching between corporate templates kept every bullet aligned.',
    author: 'Ally Fox',
    role: 'Operations Manager · Manchester',
  },
  {
    id: 'rev-3',
    rating: 5,
    title: 'Mobile friendly and straightforward',
    quote:
      'Updated my CV on the train from my phone, shared a preview link for feedback, and downloaded the final A4 PDF without any layout issues.',
    author: 'Rocco Giordano',
    role: 'Product Designer · Bristol',
  },
  {
    id: 'rev-4',
    rating: 5,
    title: 'Crisp templates that recruiters love',
    quote:
      'Straightforward to build, zero clutter, and the Hopkins and Oxford templates look far sharper than standard Word documents.',
    author: 'Lorenzo M.',
    role: 'Graduate Consultant · Edinburgh',
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

  // Rotate reviews based on active carousel index so Prev/Next works on all screen sizes
  const orderedReviews = reviews.map(
    (_, offset) => reviews[(startIndex + offset) % reviews.length]
  );

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Rating */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-7 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
            +1 million satisfied users
          </h2>

          <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
            <span className="font-bold tracking-wider text-slate-900">EXCELLENT</span>
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
            <div className="flex items-center gap-1 text-slate-600 font-medium tabular-nums">
              <span>on</span>
              <span className="font-bold text-slate-900">★ Trustpilot</span>
              <span className="text-slate-300 mx-1">·</span>
              <span className="text-slate-500">3,000+ reviews</span>
            </div>
          </div>

          {/* 44x44px Touch-Friendly Carousel Controls + Mobile Counter */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-400 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="sm:hidden text-xs font-mono font-semibold text-slate-500 tabular-nums min-w-[42px]">
              {startIndex + 1} / {reviews.length}
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-400 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Review Cards: 1 focused card on mobile (<sm) to avoid vertical wall of text, 2 on sm, 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
          {orderedReviews.map((rev, idx) => (
            <div
              key={rev.id}
              className={`rounded-2xl bg-[#fbfcff] border border-slate-200/85 p-5 flex-col justify-between hover:bg-slate-50 transition-colors shadow-2xs ${
                idx === 0
                  ? 'flex'
                  : idx === 1
                  ? 'hidden sm:flex'
                  : 'hidden lg:flex'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3.5 h-3.5 bg-[#00b67a] flex items-center justify-center rounded-[1px]"
                    >
                      <Star className="w-2 h-2 fill-white text-white" />
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-[15px] leading-snug">
                  {rev.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {rev.quote}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-900">{rev.author}</span>
                <span className="text-slate-300 mx-1.5">·</span>
                <span className="text-slate-500">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
