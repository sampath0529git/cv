'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, Search, ChevronRight, User, CheckCircle2 } from 'lucide-react';
import TopNav from '@/components/navigation/TopNav';
import Footer from '@/components/layout/Footer';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  image: string;
  content: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'how-to-write-ats-cv-uk-2026',
    title: 'How to Write an ATS-Optimised CV for the UK Job Market in 2026',
    excerpt: 'Discover why 75% of CVs are rejected by automated recruitment software and learn the exact formatting rules to pass parsing filters.',
    category: 'ATS Guide',
    readTime: '6 min read',
    date: 'October 24, 2026',
    author: {
      name: 'Sarah Jenkins',
      role: 'Lead UK Recruitment Consultant',
    },
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    content: [
      'Applicant Tracking Systems (ATS) have become the gatekeepers for major UK employers, financial institutions, and tech firms. When you submit your CV online, software parses your document for keywords, formatting consistency, and standard headings.',
      'To ensure your CV is parsed correctly: stick to standard section titles like "Professional Experience" and "Education", avoid complex tables or text boxes, and save your document as a crisp ISO A4 PDF.',
      'Tailoring your keywords to the exact job description is paramount. Include hard technical competencies as well as transferable skills such as stakeholder management, commercial awareness, and agile delivery.'
    ],
  },
  {
    id: 'top-5-cv-mistakes-london-graduates',
    title: 'Top 5 CV Mistakes London Graduates Make (And How to Fix Them)',
    excerpt: 'Avoid the common pitfalls that cost graduates interviews in finance, consulting, and creative agencies across the UK.',
    category: 'CV Tips',
    readTime: '5 min read',
    date: 'October 20, 2026',
    author: {
      name: 'Oliver Thorne',
      role: 'Graduate Career Coach',
    },
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    content: [
      'Graduates often make the mistake of listing irrelevant part-time jobs in exhaustive detail while glossing over academic projects, dissertations, and leadership roles in university societies.',
      'Keep your CV strictly to 2 pages maximum. UK recruiters spend an average of 6 to 8 seconds on an initial scan, so clarity, concise bullet points, and strong action verbs are essential.',
      'Always proofread for British spelling conventions (e.g., organise, professional, behavioural) unless applying specifically to US-headquartered firms.'
    ],
  },
  {
    id: 'mastering-star-interview-technique',
    title: 'Mastering the STAR Interview Technique for UK Hiring Panels',
    excerpt: 'A step-by-step framework to structure compelling competency-based answers that impress interviewers.',
    category: 'Interviews',
    readTime: '7 min read',
    date: 'October 15, 2026',
    author: {
      name: 'Dr. Elena Vance',
      role: 'Executive Placement Director',
    },
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    content: [
      'The STAR method (Situation, Task, Action, Result) is the gold standard for answering competency questions in UK corporate and public sector interviews.',
      'Spend roughly 20% of your answer setting the context (Situation and Task), 50% detailing your specific contribution and initiative (Action), and 30% highlighting the measurable outcome (Result).',
      'Quantify your results wherever possible—use percentages, monetary values, time saved, or team efficiency gains to substantiate your achievements.'
    ],
  },
  {
    id: 'executive-cv-formatting-strategies',
    title: 'Executive CV Formatting Strategies for Senior Leadership Roles',
    excerpt: 'How C-suite executives and directors should frame board-level achievements and strategic growth.',
    category: 'Career Growth',
    readTime: '8 min read',
    date: 'October 10, 2026',
    author: {
      name: 'Marcus Sterling',
      role: 'Headhunter & Board Advisor',
    },
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    content: [
      'At the executive level, your CV is not just a chronological list of jobs—it is a strategic marketing document showcasing P&L ownership, organizational transformation, and visionary leadership.',
      'Lead with a powerful executive summary that encapsulates your core sector expertise, board advisory experience, and scale of operations managed.',
      'Highlight governance, stakeholder engagement, and mergers & acquisitions (M&A) experience clearly to reassure nomination committees.'
    ],
  },
];

const CATEGORIES = ['All', 'ATS Guide', 'CV Tips', 'Interviews', 'Career Growth'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

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
              The UKCVGuide Career Blog
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Expert advice on CV writing, ATS optimization, interview preparation, and career advancement in the UK and global job markets.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles &amp; advice..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-[48px] pl-11 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter Bar */}
        <section className="bg-white border-b border-slate-200 sticky top-[60px] md:top-[80px] z-30 shadow-2xs">
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

        {/* Blog Posts Grid */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
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
                  onClick={() => setActivePost(post)}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col group"
                >
                  <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
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

                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#4a4df2] transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-sm text-slate-600 leading-relaxed">
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

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4a4df2] group-hover:translate-x-1 transition-transform">
                        <span>Read article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
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
              Join 50,000+ job seekers who receive our weekly newsletter with resume templates, interview guides, and salary insights.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to the UKCVGuide career newsletter!');
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
          </div>
        </section>
      </main>

      {/* Article Detail Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={() => setActivePost(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative space-y-6 text-left"
          >
            <button
              type="button"
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-[#eef2ff] text-[#4a4df2] text-xs font-semibold">
                {activePost.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                {activePost.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <span>By {activePost.author.name} ({activePost.author.role})</span>
                <span>·</span>
                <span>{activePost.date}</span>
                <span>·</span>
                <span>{activePost.readTime}</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-64 sm:h-72 bg-slate-100">
              <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {activePost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/start"
                onClick={() => setActivePost(null)}
                className="px-6 py-3 rounded-xl bg-[#4a4df2] text-white font-semibold text-sm shadow-md hover:bg-[#383be0] transition-colors"
              >
                Create your CV now
              </Link>
              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Close article
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
