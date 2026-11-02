import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  FileText,
  BookOpen,
} from 'lucide-react';
import TopNav from '@/components/navigation/TopNav';
import Footer from '@/components/layout/Footer';
import { BRAND_CONFIG } from '@/lib/config';
import { BLOG_POSTS, getBlogPostBySlug } from '@/data/blogPosts';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.id,
  }));
}

/**
 * Parses inline markdown-style internal links `[anchor text](/path)` and `**bold**`
 * into crawlable Next.js `<Link>` and `<strong>` elements with zero external dependencies.
 */
function renderRichEditorialText(text: string): React.ReactNode {
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <Link
          key={`link-${idx}`}
          href={href}
          className="font-semibold text-[#2563EB] underline decoration-blue-300 underline-offset-3 hover:text-[#1D4ED8] hover:decoration-[#1D4ED8] transition-colors"
        >
          {label}
        </Link>
      );
    }

    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={`bold-${idx}`} className="font-semibold text-slate-900">
          {boldMatch[1]}
        </strong>
      );
    }

    return <React.Fragment key={`txt-${idx}`}>{part}</React.Fragment>;
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const url = `/blog/${post.id}`;

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: url,
      languages: {
        'en-GB': url,
      },
    },
    openGraph: {
      title: `${post.seoTitle} | ${BRAND_CONFIG.name}`,
      description: post.metaDescription,
      url,
      siteName: BRAND_CONFIG.name,
      locale: 'en_GB',
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 675,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
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

  const canonicalDomain = `https://${BRAND_CONFIG.domain}`;
  const postUrl = `${canonicalDomain}/blog/${post.id}`;

  const structuredGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}/#article`,
        headline: post.title,
        alternativeHeadline: post.seoTitle,
        description: post.metaDescription,
        image: [`${canonicalDomain}${post.image}`],
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        inLanguage: 'en-GB',
        keywords: post.keywords.join(', '),
        articleSection: post.category,
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
          '@id': `${canonicalDomain}/#organization`,
          name: BRAND_CONFIG.name,
          url: canonicalDomain,
          logo: {
            '@type': 'ImageObject',
            url: `${canonicalDomain}/assets/logo-mark.png`,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${postUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: canonicalDomain,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'UK CV Guides',
            item: `${canonicalDomain}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.seoTitle,
            item: postUrl,
          },
        ],
      },
      ...(post.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${postUrl}/#faq`,
              mainEntity: post.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredGraph) }}
      />

      <TopNav />

      <main className="flex-1">
        {/* Breadcrumb & Editorial Header */}
        <header className="bg-white border-b border-slate-200/85 pt-5 sm:pt-8 pb-10 sm:pb-14">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-6"
            >
              <Link href="/" className="hover:text-[#2563EB] transition-colors font-medium">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <Link href="/blog" className="hover:text-[#2563EB] transition-colors font-medium">
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-slate-900 font-semibold truncate max-w-[230px] sm:max-w-md">
                {post.seoTitle}
              </span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-[13px] font-medium text-slate-500 mb-3">
                <span className="font-semibold text-[#2563EB]">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.date}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{post.readTime}</span>
              </div>

              <h1 className="text-[28px] sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0B112C] leading-[1.14] [text-wrap:balance]">
                {post.title}
              </h1>

              <p className="mt-3.5 text-[15px] sm:text-lg text-slate-600 leading-relaxed max-w-[64ch]">
                {post.excerpt}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-[#2563EB] font-bold text-sm flex items-center justify-center shrink-0">
                    {post.author.name.charAt(0)}
                  </div>
                  <div className="text-xs sm:text-[13px]">
                    <div className="font-bold text-slate-900">{post.author.name}</div>
                    <div className="text-slate-500">{post.author.role}</div>
                  </div>
                </div>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-slate-600 hover:text-[#2563EB] transition-colors whitespace-nowrap"
                >
                  <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                  <span>All UK CV Guides</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Asymmetric Two-Column Editorial Reading Canvas (Main Article + Sticky Sidebar) */}
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Main Reading Column (8 cols) */}
            <article className="lg:col-span-8 min-w-0 blog-article-content">
              {/* 16:9 Editorial Hero Cover Image */}
              <figure className="mb-8 sm:mb-10">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-200 border border-slate-200/80 shadow-xs">
                  <Image
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <figcaption className="text-xs text-slate-500 mt-2.5">
                  {post.imageAlt}
                </figcaption>
              </figure>

              {/* Key Takeaways Box */}
              {post.keyTakeaways.length > 0 && (
                <section
                  aria-label="Key Takeaways"
                  className="mb-8 sm:mb-10 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)]"
                >
                  <h2 className="text-sm sm:text-base font-bold text-[#0B112C] mb-3.5">
                    Key UK Takeaways at a Glance
                  </h2>
                  <ul className="space-y-2.5">
                    {post.keyTakeaways.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-[13.5px] sm:text-sm text-slate-700 leading-relaxed"
                      >
                        <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5 stroke-[2.4]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Mobile Jump-to-Section Navigation */}
              <nav
                aria-label="Table of contents"
                className="lg:hidden mb-8 p-4 rounded-2xl bg-white border border-slate-200/85"
              >
                <div className="text-xs font-bold text-slate-900 mb-2.5">In this guide</div>
                <ol className="space-y-2 text-[13px]">
                  {post.content.sections.map((sec) => (
                    <li key={sec.id}>
                      <a
                        href={`#${sec.id}`}
                        className="text-slate-600 hover:text-[#2563EB] transition-colors block leading-snug"
                      >
                        {sec.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Editorial Body Prose */}
              <div className="max-w-[68ch] space-y-8 text-slate-700">
                <p className="text-base sm:text-[17.5px] text-slate-800 leading-[1.75] font-normal">
                  {renderRichEditorialText(post.content.intro)}
                </p>

                {post.content.sections.map((sec) => (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-24 pt-6 border-t border-slate-200/75 space-y-4"
                  >
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B112C] tracking-tight leading-snug [text-wrap:balance]">
                      {sec.heading}
                    </h2>

                    {sec.body.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-[15px] sm:text-base text-slate-700 leading-[1.75]"
                      >
                        {renderRichEditorialText(paragraph)}
                      </p>
                    ))}

                    {sec.bullets && sec.bullets.length > 0 && (
                      <ul className="space-y-2.5 pt-1 pl-1">
                        {sec.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-[14.5px] sm:text-[15px] text-slate-700 leading-relaxed"
                          >
                            <span
                              aria-hidden="true"
                              className="font-mono text-xs font-bold text-[#2563EB] mt-1 shrink-0"
                            >
                              —
                            </span>
                            <span>{renderRichEditorialText(bullet)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                {/* Editorial Conclusion */}
                <div className="pt-6 border-t border-slate-200/80">
                  <p className="text-[15px] sm:text-base text-slate-700 leading-[1.75]">
                    {renderRichEditorialText(post.content.conclusion)}
                  </p>
                </div>
              </div>

              {/* Matching UK CV Templates Internal Silo Grid */}
              {post.relatedTemplateLinks.length > 0 && (
                <section
                  aria-label="Recommended UK CV templates for this guide"
                  className="mt-10 pt-8 border-t border-slate-200"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-[#0B112C]">
                      Recommended UK Templates &amp; Tools
                    </h2>
                    <Link
                      href="/cv-templates"
                      className="text-xs sm:text-[13px] font-semibold text-[#2563EB] hover:underline whitespace-nowrap"
                    >
                      All templates
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {post.relatedTemplateLinks.map((tpl) => (
                      <Link
                        key={tpl.href}
                        href={tpl.href}
                        className="group p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#2563EB] shadow-[0_1px_6px_rgba(15,23,42,0.02)] transition-all duration-150 flex flex-col justify-between gap-2"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-bold text-[#0B112C] group-hover:text-[#2563EB] transition-colors">
                              {tpl.label}
                            </h3>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {tpl.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* SSR-Mounted Article FAQs (Synchronized with FAQPage JSON-LD) */}
              {post.faqs.length > 0 && (
                <section
                  aria-label="Frequently Asked Questions"
                  className="mt-10 pt-8 border-t border-slate-200"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-[#0B112C] mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3.5">
                    {post.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white border border-slate-200/90"
                      >
                        <h3 className="text-[15px] font-bold text-[#0B112C] leading-snug">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Bottom Conversion Banner */}
              <div className="mt-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0B112C] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Put this UK CV advice into practice
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                    Build from scratch, upload an existing CV, or switch between 20+ British ISO A4
                    layouts with instant free PDF and DOCX downloads.
                  </p>
                </div>
                <Link
                  href={post.content.ctaLink}
                  className="min-h-[46px] px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{post.content.ctaText}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>

              {/* Related UK Career Guides Cross-Links */}
              {relatedPosts.length > 0 && (
                <section
                  aria-label="Related UK career guides"
                  className="mt-12 pt-8 border-t border-slate-200"
                >
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <h2 className="text-lg sm:text-xl font-bold text-[#0B112C]">
                      Continue Reading: UK CV Guides
                    </h2>
                    <Link
                      href="/blog"
                      className="text-xs sm:text-[13px] font-semibold text-[#2563EB] hover:underline whitespace-nowrap"
                    >
                      View all articles
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/blog/${rel.id}`}
                        className="group rounded-2xl bg-white border border-slate-200/90 hover:border-[#2563EB] overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.03)] transition-all flex flex-col justify-between"
                      >
                        <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                          <Image
                            src={rel.image}
                            alt={rel.imageAlt || rel.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 380px"
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                              <span className="font-semibold text-[#2563EB]">{rel.category}</span>
                              <span aria-hidden="true">·</span>
                              <span>{rel.readTime}</span>
                            </div>
                            <h3 className="text-[15px] font-bold text-[#0B112C] group-hover:text-[#2563EB] transition-colors mt-1.5 leading-snug line-clamp-2">
                              {rel.title}
                            </h3>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB]">
                            <span>Read guide</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Right Sticky Sidebar (Desktop lg+): Table of Contents + Quick Template Links */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-[88px] space-y-6">
              {/* Table of Contents */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B112C] mb-3.5">
                  <BookOpen className="w-4 h-4 text-[#2563EB]" />
                  <span>On this page</span>
                </div>
                <ol className="space-y-2.5 text-[13px]">
                  {post.content.sections.map((sec) => (
                    <li key={sec.id}>
                      <a
                        href={`#${sec.id}`}
                        className="text-slate-600 hover:text-[#2563EB] transition-colors leading-snug block"
                      >
                        {sec.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Quick UK CV Builder Card */}
              <div className="p-5 rounded-2xl bg-[#0B112C] text-white space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Free British A4 Builder</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  Build an ATS-ready UK CV in minutes
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Choose from 20+ recruiter-tested British templates or import an existing PDF/Word
                  CV with instant free downloads.
                </p>
                <div className="space-y-2 pt-1">
                  <Link
                    href="/start"
                    className="w-full min-h-[42px] px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>Start Free UK CV</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                  <Link
                    href="/cv-templates"
                    className="w-full min-h-[40px] px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center transition-colors whitespace-nowrap"
                  >
                    Browse A4 Templates
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
