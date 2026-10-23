'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  title: string;
  quote: string;
  author: string;
}

const reviews: Review[] = [
  {
    id: 'rev-1',
    rating: 5,
    title: 'Really good for making cv',
    quote:
      'Really good for making cv. Easy and looks awesome. Got the Job in two days. Maybe I was lucky. Maybe my cv was that goo...',
    author: 'Ivan',
  },
  {
    id: 'rev-2',
    rating: 5,
    title: 'The format was extremely easy to follow...',
    quote:
      'The format was extremely easy to follow and organised. The AI suggestions were very helpful in guiding my content.',
    author: 'Ally Fox',
  },
  {
    id: 'rev-3',
    rating: 5,
    title: 'User friendly',
    quote:
      'Very easy to use, the best way to complete your key to search your way for the profession of your life',
    author: 'Rocco Giordano',
  },
  {
    id: 'rev-4',
    rating: 5,
    title: 'Easy and excellent...',
    quote:
      'Easy and straightforward to create your CV, clean templates and great suggestions needed in minutes.',
    author: 'Lorenzo',
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

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Trustpilot */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            +1 million satisfied users
          </h2>

          <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
            <span className="font-bold tracking-wider text-slate-900 uppercase">
              EXCELLENT
            </span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-[1px]">
                  <Star className="w-2.5 h-2.5 fill-white text-white" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-slate-600 font-medium">
              <span>on</span>
              <span className="font-bold text-slate-900">★ Trustpilot</span>
              <span className="text-slate-300 mx-1">|</span>
              <span className="text-slate-500">Based on 3000+ reviews</span>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 flex items-center justify-center transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 flex items-center justify-center transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-xl bg-[#fbfbfb] border border-slate-200/80 p-5 flex flex-col justify-between hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <div className="space-y-2.5">
                {/* 5 Green Star Blocks */}
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <div key={i} className="w-3.5 h-3.5 bg-[#00b67a] flex items-center justify-center rounded-[1px]">
                      <Star className="w-2 h-2 fill-white text-white" />
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {rev.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {rev.quote}
                </p>
              </div>

              <div className="pt-4 text-xs font-semibold text-slate-700">
                {rev.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
