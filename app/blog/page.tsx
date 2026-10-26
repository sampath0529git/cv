'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, Clock, ArrowRight, Search, CheckCircle2 } from 'lucide-react';
import TopNav from '@/components/navigation/TopNav';
import Footer from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/data/blogPosts';

const CATEGORIES = [
  'All',
  'ATS Guide',
  'CV Tips',
  'Graduate & School Leaver',
  'Interviews',
  'Career Growth',
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const hasAnyPosts = BLOG_POSTS.length > 0;

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <TopNav />

      <main className="flex-1">
        {/* Blog Hero Section */}
        <section className="bg-gradient-to-b from-[#121845] to-[#1e2761] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-blue-300 text-xs font-semibold backdrop-blur-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Career Advice &amp; CV Insights</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white [text-wrap:balance]">
              UK CV Writing Guides &amp; Career Advice
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Recruiter-approved advice on UK CV formatting, ATS optimization, personal statement examples, school leavers, and interview techniques.
            </p>

            {/* Search Bar */}
            {hasAnyPosts && (
              <div className="max-w-md mx-auto pt-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles & advice..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full min-h-[48px] pl-11 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Category Filter Bar */}
        {hasAnyPosts && (
          <section className="bg-white border-b border-slate-200 sticky top-[56px] sm:top-[64px] md:top-[72px] z-30 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[38px] px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#4a4df2] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!hasAnyPosts ? (
            <div className="max-w-lg mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#eef2ff] text-[#4a4df2] flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">No blog articles published yet</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                New UK CV guides and career advice articles will appear here once published. In the meantime, explore our ATS-friendly templates or start building your CV for free.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/start"
                  className="min-h-[42px] px-5 py-2.5 rounded-xl bg-[#4a4df2] hover:bg-[#383be0] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Build Free CV</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/templates"
                  className="min-h-[42px] px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold inline-flex items-center transition-colors"
                >
                  Browse Templates
                </Link>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-lg font-semibold text-slate-700">No articles found matching your search.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-[#4a4df2] text-white text-xs font-semibold cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 sm:gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group min-w-0"
                >
                  <Link href={`/blog/${post.id}`} className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-100 block">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold">
                      {post.category}
                    </div>
                  </Link>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 min-w-0">
                    <div className="space-y-2.5 min-w-0">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {post.date}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#4a4df2] transition-colors leading-snug break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-sm text-slate-600 leading-relaxed break-words whitespace-pre-line [overflow-wrap:anywhere] [text-wrap:pretty]">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#eef2ff] text-[#4a4df2] font-bold text-xs flex items-center justify-center">
                          {post.author.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{post.author.name}</div>
                          <div className="text-[10px] text-slate-500">{post.author.role}</div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#4a4df2] group-hover:translate-x-1 transition-transform"
                      >
                        <span>Read article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Banner */}
        <section className="bg-[#121845] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-center my-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Get expert UK career tips in your inbox</h2>
            <p className="text-sm sm:text-base text-slate-300">
              Join 50,000+ UK jobseekers who receive our weekly newsletter with resume templates, interview guides, and salary insights.
            </p>
            {newsletterSubscribed ? (
              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you for subscribing to the career newsletter!</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterSubscribed(true);
                }}
                className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="flex-1 min-h-[46px] px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="min-h-[46px] px-6 rounded-xl bg-[#4a4df2] hover:bg-[#383be0] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer whitespace-nowrap"
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
