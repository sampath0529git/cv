import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/config';
import { BLOG_POSTS } from '@/data/blogPosts';

const hasPosts = BLOG_POSTS.length > 0;

export const metadata: Metadata = {
  title: 'UK CV Writing Guides & Career Advice',
  description:
    'Expert UK CV writing guides, ATS formatting advice, personal statement examples, and British interview tips from freecvmakeruk.co.uk.',
  alternates: {
    canonical: '/blog',
  },
  robots: {
    index: hasPosts,
    follow: true,
  },
  openGraph: {
    title: 'UK CV Writing Guides & Career Advice | freecvmakeruk.co.uk',
    description:
      'Recruiter-approved advice on UK CV formatting, personal statements, graduate applications, and ATS compliance.',
    url: '/blog',
    siteName: BRAND_CONFIG.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/hero-backdrop-clean.png',
        width: 1200,
        height: 630,
        alt: 'UK CV Writing Guides & Career Advice – freecvmakeruk.co.uk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK CV Writing Guides & Career Advice | freecvmakeruk.co.uk',
    description:
      'Recruiter-approved advice on UK CV formatting, personal statements, and ATS compliance.',
    images: ['/assets/hero-backdrop-clean.png'],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
