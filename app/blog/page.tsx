'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, CheckCircle2, ChevronRight } from 'lucide-react';
import TopNav from '@/components/navigation/TopNav';
import Footer from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/data/blogPosts';

const CATEGORIES = [
  'All',
  'CV Tips',
  'ATS Guide',
  'Graduate & School Leaver',
];

const POPULAR_TEMPLATE_HUBS = [
  { label: 'All UK CV Templates', href: '/cv-templates' },
  { label: 'ATS-Friendly CV', href: '/ats-friendly-cv-template' },
  { label: '16-Year-Old CV', href: '/cv-template-16-year-old' },
  { label: 'School Leaver CV', href: '/school-leaver-cv-template' },
  { label: 'Graduate CVs', href: '/graduate-cv-templates' },
  { label: 'Finance & Banking', href: '/finance-cv-template' },
  { label: 'NHS & Nursing', href: '/nursing-cv-template' },
  { label: 'Acting & Spotlight', href: '/acting-cv-template' },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.keywords.some((k) => k.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const showEditorialLeadLayout =
    selectedCategory === 'All' && !searchQuery.trim() && filteredPosts.length >= 3;

  const leadPost = showEditorialLeadLayout ? filteredPosts[0] : null;
  const secondaryPosts = showEditorialLeadLayout ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900">
      <TopNav />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="bg-white/44 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/80 pt-6 sm:pt-10 pb-10 sm:pb-14 shadow-[0_8px_30px_rgba(15,23,42,0.03)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-slate-500 mb-5"
            >
              <Link href="/" className="hover:text-[#2563EB] transition-colors font-medium">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="font-semibold text-slate-900" aria-current="page">
                UK CV Writing Guides
              </span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#2563EB] mb-2">
                  British Career &amp; Recruitment Editorial
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0B112C] leading-[1.13] [text-wrap:balance]">
                  UK CV Writing Guides &amp; Career Advice
                </h1>
                <p className="mt-3 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                  Practical, recruiter-verified guidance on British ISO A4 formatting, passing
                  Applicant Tracking Systems, and writing first CVs for GCSEs, A-Levels, and
                  university graduates.
                </p>
              </div>

              {/* Search Input */}
              <div className="w-full lg:w-[340px] shrink-0">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search UK CV guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search UK CV writing guides"
                    className="w-full min-h-[46px] pl-10 pr-4 rounded-xl bg-white/68 hover:bg-white/92 focus:bg-white/96 backdrop-blur-xl border border-white/85 ring-1 ring-slate-900/[0.05] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/12 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Category Filter Controls */}
            <div
              role="tablist"
              aria-label="Filter guides by topic"
              className="mt-7 pt-5 border-t border-white/75 flex items-center gap-2 overflow-x-auto scrollbar-none"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-[38px] px-4 py-1.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#0B112C] text-white border border-[#0B112C] shadow-[0_6px_16px_rgba(11,17,44,0.18)]'
                        : 'bg-white/62 hover:bg-white/88 backdrop-blur-xl border border-white/85 ring-1 ring-slate-900/[0.04] text-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blog Articles Showcase */}
        <section className="py-10 sm:py-14 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white/66 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl border border-white/85 ring-1 ring-slate-900/[0.04] shadow-[0_12px_36px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-3">
              <p className="text-base sm:text-lg font-bold text-slate-800">
                No guides matched &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold cursor-pointer"
              >
                Show all UK CV guides
              </button>
            </div>
          ) : (
            <div className="space-y-8 sm:space-y-10">
              {/* Tier 1: Featured Lead Pillar Guide */}
              {leadPost && (
                <article className="group bg-white/64 hover:bg-white/86 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl sm:rounded-3xl border border-white/85 ring-1 ring-slate-900/[0.04] hover:border-[#2563EB]/55 shadow-[0_14px_40px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] overflow-hidden transition-all grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <Link
                    href={`/blog/${leadPost.id}`}
                    className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto lg:min-h-[340px] bg-slate-100 block overflow-hidden"
                  >
                    <Image
                      src={leadPost.image}
                      alt={leadPost.imageAlt || leadPost.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 680px"
                      className="object-cover lg:h-full group-hover:scale-[1.02] transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </Link>

                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                        <span className="font-semibold text-[#2563EB]">{leadPost.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{leadPost.date}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{leadPost.readTime}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0B112C] group-hover:text-[#2563EB] transition-colors leading-snug [text-wrap:balance]">
                        <Link href={`/blog/${leadPost.id}`}>{leadPost.title}</Link>
                      </h2>

                      <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                        {leadPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/75 flex items-center justify-between gap-3">
                      <div className="text-xs">
                        <span className="font-bold text-slate-900">{leadPost.author.name}</span>
                        <span className="text-slate-400 mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-slate-500">{leadPost.author.role}</span>
                      </div>

                      <Link
                        href={`/blog/${leadPost.id}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#2563EB] whitespace-nowrap shrink-0"
                      >
                        <span>Read guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {/* Tier 2: Secondary Guides Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {secondaryPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white/64 hover:bg-white/86 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl border border-white/85 ring-1 ring-slate-900/[0.04] hover:border-[#2563EB]/55 overflow-hidden shadow-[0_12px_34px_rgba(15,23,42,0.05),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_18px_44px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.98)] transition-all flex flex-col min-w-0"
                  >
                    <Link
                      href={`/blog/${post.id}`}
                      className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 block"
                    >
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 580px"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </Link>

                    <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between gap-5 min-w-0">
                      <div className="space-y-2.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                          <span className="font-semibold text-[#2563EB]">{post.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{post.date}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{post.readTime}</span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-[#0B112C] group-hover:text-[#2563EB] transition-colors leading-snug [text-wrap:balance]">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h2>

                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/75 flex items-center justify-between gap-3">
                        <div className="text-xs min-w-0 truncate">
                          <span className="font-bold text-slate-900">{post.author.name}</span>
                          <span className="text-slate-400 mx-1.5" aria-hidden="true">
                            ·
                          </span>
                          <span className="text-slate-500">{post.author.role}</span>
                        </div>

                        <Link
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-semibold text-[#2563EB] whitespace-nowrap shrink-0"
                        >
                          <span>Read guide</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Internal Link Hub: Popular UK CV Template Collections */}
        <section
          aria-label="Explore UK CV templates by career stage"
          className="py-12 sm:py-14 bg-white/34 backdrop-blur-2xl border-t border-white/80"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B112C] tracking-tight">
                  Pair Our Guides With a British ISO A4 Template
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Open any specialist template directly in our free UK CV builder—no registration
                  required.
                </p>
              </div>
              <Link
                href="/start"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] whitespace-nowrap"
              >
                <span>Start building your CV</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
              {POPULAR_TEMPLATE_HUBS.map((hub) => (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className="group min-h-[48px] px-4 py-3 rounded-xl bg-white/62 hover:bg-white/88 backdrop-blur-xl border border-white/85 ring-1 ring-slate-900/[0.04] hover:border-[#2563EB]/55 shadow-[0_6px_20px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] text-xs sm:text-[13.5px] font-semibold text-slate-800 hover:text-[#2563EB] flex items-center justify-between gap-2 transition-all"
                >
                  <span className="truncate">{hub.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Smoked Sapphire Glass Newsletter Section */}
        <section className="relative overflow-hidden bg-[#080E24]/86 backdrop-blur-2xl backdrop-saturate-150 border-t border-white/18 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rounded-full bg-blue-500/20 blur-3xl"
          />
          <div className="relative max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Get UK CV &amp; interview guides in your inbox
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Practical British hiring insights, personal statement formulas, and ATS formatting
              checklists—sent weekly with one-click unsubscribe.
            </p>
            {newsletterSubscribed ? (
              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/18 backdrop-blur-md border border-emerald-400/35 text-emerald-300 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! Your first UK CV checklist is on its way.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterSubscribed(true);
                }}
                className="flex flex-col sm:flex-row gap-2.5 pt-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="flex-1 min-h-[46px] px-4 rounded-xl bg-white/10 hover:bg-white/14 focus:bg-white/16 backdrop-blur-md border border-white/22 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400 transition-colors"
                />
                <button
                  type="submit"
                  className="min-h-[46px] px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
