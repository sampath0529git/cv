import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/config';
import { BLOG_POSTS } from '@/data/blogPosts';

const canonicalDomainUrl = `https://${BRAND_CONFIG.domain}`;

export const metadata: Metadata = {
  title: 'UK CV Writing Guides, ATS Tips & Career Advice',
  description:
    'Recruiter-approved UK CV writing guides, British A4 formatting rules, ATS scanner checklists, and first CV advice for 16-year-olds, school leavers, and graduates.',
  keywords: [
    'uk cv writing guides',
    'how to write a cv uk',
    'ats friendly cv uk',
    'first cv guide uk',
    'british a4 cv advice',
  ],
  alternates: {
    canonical: '/blog',
    languages: {
      'en-GB': '/blog',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'UK CV Writing Guides, ATS Tips & Career Advice | freecvmakeruk.co.uk',
    description:
      'Recruiter-approved advice on UK CV formatting, personal statements, graduate applications, and ATS compliance.',
    url: '/blog',
    siteName: BRAND_CONFIG.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/blog/uk-cv-writing-guide.jpg',
        width: 1200,
        height: 675,
        alt: 'UK CV Writing Guides & Career Advice – freecvmakeruk.co.uk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK CV Writing Guides, ATS Tips & Career Advice | freecvmakeruk.co.uk',
    description:
      'Recruiter-approved advice on UK CV formatting, personal statements, and ATS compliance.',
    images: ['/assets/blog/uk-cv-writing-guide.jpg'],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const blogCollectionSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalDomainUrl}/blog/#collection`,
        url: `${canonicalDomainUrl}/blog`,
        name: 'UK CV Writing Guides & Career Advice',
        description:
          'Recruiter-approved UK CV writing guides, British ISO A4 formatting standards, and ATS checklists.',
        inLanguage: 'en-GB',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: BLOG_POSTS.map((post, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${canonicalDomainUrl}/blog/${post.id}`,
            name: post.title,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalDomainUrl}/blog/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: canonicalDomainUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'UK CV Writing Guides',
            item: `${canonicalDomainUrl}/blog`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />
      {children}
    </>
  );
}
