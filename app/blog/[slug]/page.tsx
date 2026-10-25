import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import TopNav from '@/components/navigation/TopNav';
import Footer from '@/components/layout/Footer';
import { BRAND_CONFIG } from '@/lib/config';
import { BLOG_POSTS, getBlogPostBySlug } from '@/data/blogPosts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: `Article Not Found | ${BRAND_CONFIG.name}`,
    };
  }

  const url = `https://${BRAND_CONFIG.domain}/blog/${post.id}`;

  return {
    title: `${post.title} | ${BRAND_CONFIG.name}`,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | ${BRAND_CONFIG.name}`,
      description: post.metaDescription,
      url,
      siteName: `${BRAND_CONFIG.name} - Free CV Maker UK`,
      locale: 'en_GB',
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://${BRAND_CONFIG.domain}/blog/${post.id}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}/#article`,
    headline: post.title,
    description: post.metaDescription,
    image: [post.image],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: 'en-GB',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_CONFIG.name,
      url: `https://${BRAND_CONFIG.domain}`,
      logo: {
        '@type': 'ImageObject',
        url: `https://${BRAND_CONFIG.domain}/assets/logo.png`,
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${BRAND_CONFIG.domain}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `https://${BRAND_CONFIG.domain}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  // Other related articles for internal linking
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <TopNav />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
              <Link href="/" className="hover:text-[#2563EB] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/blog" className="hover:text-[#2563EB] transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-800 font-medium truncate max-w-[220px] sm:max-w-md">
                {post.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="bg-gradient-to-b from-[#121845] to-[#1e2761] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all guides</span>
            </Link>

            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
              {post.category}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-400/20 text-blue-300 font-bold flex items-center justify-center">
                  {post.author.name.charAt(0)}
                </div>
                <span>
                  By <strong className="text-white">{post.author.name}</strong> ({post.author.role})
                </span>
              </div>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-300" />
                {post.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-300" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image & Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md bg-slate-200 mb-8 sm:mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
            <p className="font-medium text-slate-900 text-lg sm:text-xl leading-relaxed border-l-4 border-[#2563EB] pl-4 italic bg-blue-50/50 py-2 rounded-r-xl">
              {post.content.intro}
            </p>

            {post.content.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3 pt-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {sec.heading}
                </h2>
                {sec.body.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            {/* Contextual In-Article Callout Box */}
            <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#2563EB] font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>UK CV Builder Tip</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Looking to format your CV in standard British A4 dimensions? Our free online CV maker includes recruiter-verified templates for graduates, career changers, and experienced professionals.
              </p>
              <div className="pt-1">
                <Link
                  href={post.content.ctaLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
                >
                  <span>{post.content.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm sm:text-base text-slate-600 italic">
                {post.content.conclusion}
              </p>
            </div>
          </div>

          {/* Bottom Action Card */}
          <div className="mt-12 p-8 rounded-3xl bg-[#0B112C] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold">Ready to write your winning UK CV?</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Choose from recruiter-approved UK templates and download an ATS-compliant PDF for free.
              </p>
            </div>
            <Link
              href="/start"
              className="px-6 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-lg shadow-blue-600/40 whitespace-nowrap transition-all"
            >
              Create Free CV Now
            </Link>
          </div>

          {/* Related Articles Strip for Contextual Crawling */}
          <div className="mt-14 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Related UK Career Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.id}`}
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-[#2563EB]">{rel.category}</span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{rel.readTime}</span>
                    <span className="text-[#2563EB] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
