'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface TrustpilotReview {
  id: number;
  name: string;
  timeAgo: string;
  avatarBg: string;
  initials: string;
  initialsTextClass?: string;
  image?: string;
  imageClassName?: string;
  review: string;
}

const TRUSTPILOT_REVIEWS: TrustpilotReview[] = [
  {
    id: 1,
    name: 'Amelia Clarke',
    timeAgo: '3 hours ago',
    avatarBg: 'bg-[#D1FAE5]',
    initials: 'AC',
    image: '/assets/blog/uk-graduate-school-leaver-cv.jpg',
    imageClassName: 'object-cover object-[53%_24%] scale-[2.15]',
    review:
      'Good quality and stylish CV templates. The only worry I had was keeping my work history to two A4 pages, and the live preview adjusted spacing cleanly so I could download my PDF straight away without a paywall.',
  },
  {
    id: 2,
    name: 'Hannah Wright',
    timeAgo: '1 day ago',
    avatarBg: 'bg-[#FDE68A]',
    initials: 'HW',
    image: '/assets/hero-new-candidate.png',
    imageClassName: 'object-cover object-[50%_8%] scale-[1.6] translate-y-1',
    review:
      'Absolutely fantastic! The layouts are unique and the UK A4 formatting is spot on. Switching between the Classic and ATS templates took seconds and I had two graduate scheme interviews booked within a week.',
  },
  {
    id: 3,
    name: 'Callum Fraser',
    timeAgo: '8 days ago',
    avatarBg: 'bg-[#BFDBFE]',
    initials: 'CF',
    image: '/assets/actor-headshot-uk.jpg',
    imageClassName: 'object-cover object-[50%_18%] scale-[1.25]',
    review:
      'Used the finance template for City analyst applications after struggling with messy Word tables. Every section parsed cleanly on Workday and Greenhouse portals, and the exported 300 DPI PDF looks razor sharp.',
  },
  {
    id: 4,
    name: 'Priya Patel',
    timeAgo: '11 days ago',
    avatarBg: 'bg-[#FCE7F3]',
    initials: 'PP',
    initialsTextClass: 'text-[#9D174D]',
    review:
      'Built my Band 5 NHS nursing CV on my phone during a break. Having dedicated sections for NMC PIN details, clinical placements, and CPD saved me hours compared to starting from a blank document.',
  },
  {
    id: 5,
    name: 'Oliver Bennett',
    timeAgo: '2 weeks ago',
    avatarBg: 'bg-[#E0E7FF]',
    initials: 'OB',
    initialsTextClass: 'text-[#3730A3]',
    review:
      'Finally a genuinely free UK CV builder that does not trap your PDF behind a subscription at the final step. Helped my 16-year-old son put together his first retail weekend CV in under fifteen minutes.',
  },
  {
    id: 6,
    name: 'Megan Davies',
    timeAgo: '3 weeks ago',
    avatarBg: 'bg-[#CCFBF1]',
    initials: 'MD',
    initialsTextClass: 'text-[#115E59]',
    review:
      'Clean British spelling prompts, clear personal statement guidance, and zero clutter. Updated my operations manager CV on Sunday evening and received three recruiter callbacks from Manchester agencies by Wednesday.',
  },
];

export default function ReviewsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleScroll = (direction: 'prev' | 'next') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardStep = 396;
    container.scrollBy({
      left: direction === 'next' ? cardStep : -cardStep,
      behavior: 'smooth',
    });
  };

  return (
    <section
      aria-label="Our customers' Trustpilot reviews"
      className="relative py-14 sm:py-20 bg-sky-100/35 backdrop-blur-md border-y border-white/80 overflow-hidden"
    >
      {/* Subtle Trustpilot emerald & sky ambient refraction orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-12 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-12 w-96 h-96 rounded-full bg-blue-300/22 blur-3xl"
      />

      {/* Top Header Row aligned to main site container */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-6">
          {/* Left: Title + 5 Yellow Stars + 4.9 average rating */}
          <div>
            <h2 className="text-[24px] sm:text-[32px] font-bold text-[#14171F] tracking-[-0.02em] leading-tight">
              Our customers&rsquo; Trustpilot reviews
            </h2>

            <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-3">
              <div
                className="flex items-center gap-1.5"
                aria-label="5 out of 5 stars"
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#FACC15] fill-[#FACC15]"
                    strokeWidth={1.2}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-[15px] sm:text-[17px] font-bold text-[#14171F] tabular-nums">
                4.9 average rating
              </span>
            </div>
          </div>

          {/* Right: Elevated Frosted Glass Trustpilot Pill */}
          <div className="self-start sm:self-center">
            <div className="inline-flex items-center gap-2 bg-white/78 backdrop-blur-2xl backdrop-saturate-150 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl shadow-[0_12px_32px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] border border-white/90 ring-1 ring-slate-900/[0.04]">
              <Star
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#00B67A] fill-[#00B67A] shrink-0"
                strokeWidth={1}
                aria-hidden="true"
              />
              <span className="text-[18px] sm:text-[21px] font-bold tracking-tight text-[#14171F]">
                Trustpilot
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Review Cards Strip — Left-aligned with header, peeking on right edge */}
      <div className="relative z-10 mt-8 sm:mt-10">
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-1240px)/2+2rem))] pr-4 sm:pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TRUSTPILOT_REVIEWS.map((item) => {
            const isExpanded = Boolean(expandedIds[item.id]);

            return (
              <article
                key={item.id}
                className="w-[85vw] max-w-[360px] sm:w-[365px] sm:max-w-none lg:w-[376px] shrink-0 snap-start bg-white/68 hover:bg-white/88 backdrop-blur-2xl backdrop-saturate-150 rounded-[22px] border border-white/85 ring-1 ring-slate-900/[0.04] p-6 sm:p-7 shadow-[0_10px_32px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_38px_rgba(15,23,42,0.09)] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Row: Avatar + Name/Time on left, Green Trustpilot Star on right */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-14 h-14 rounded-full overflow-hidden relative shrink-0 flex items-center justify-center ${item.avatarBg}`}
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className={item.imageClassName || 'object-cover'}
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span
                            className={`text-base font-bold tracking-tight select-none ${
                              item.initialsTextClass || 'text-slate-800'
                            }`}
                          >
                            {item.initials}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-[16px] sm:text-[17px] font-bold text-[#14171F] leading-snug truncate">
                          {item.name}
                        </h3>
                        <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-snug mt-0.5">
                          {item.timeAgo}
                        </p>
                      </div>
                    </div>

                    <Star
                      className="w-8 h-8 text-[#00B67A] fill-[#00B67A] shrink-0"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Card Middle Row: 5 Yellow Stars */}
                  <div
                    className="mt-5 flex items-center gap-1.5"
                    aria-label="Rated 5 out of 5 stars"
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[#FACC15] fill-[#FACC15]"
                        strokeWidth={1.2}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Review Body */}
                  <p
                    className={`mt-4 text-[15px] sm:text-[15.5px] text-[#1F2937] leading-[1.6] ${
                      isExpanded ? '' : 'line-clamp-3'
                    }`}
                  >
                    {item.review}
                  </p>
                </div>

                {/* Read more / Show less toggle */}
                <div className="mt-4 pt-0.5">
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center min-h-[36px] text-[15px] font-bold text-[#14171F] hover:text-[#00B67A] transition-colors cursor-pointer"
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Subtle Carousel Navigation Controls */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-5 flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={() => handleScroll('prev')}
          aria-label="Scroll to previous reviews"
          className="w-11 h-11 rounded-full bg-white/75 hover:bg-white/95 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/[0.05] text-[#14171F] flex items-center justify-center shadow-[0_6px_18px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => handleScroll('next')}
          aria-label="Scroll to more reviews"
          className="w-11 h-11 rounded-full bg-white/75 hover:bg-white/95 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/[0.05] text-[#14171F] flex items-center justify-center shadow-[0_6px_18px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
