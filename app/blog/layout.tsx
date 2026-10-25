import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: `UK CV Writing Guides & Career Advice | ${BRAND_CONFIG.name}`,
  description:
    'Expert advice on writing a UK CV, ATS optimisation, personal statement examples, school leaver CVs, and interview techniques from British recruitment consultants.',
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/blog`,
  },
  openGraph: {
    title: `UK CV Writing Guides & Career Advice | ${BRAND_CONFIG.name}`,
    description:
      'Recruiter-approved advice on UK CV formatting, personal statements, graduate applications, and ATS compliance.',
    url: `https://${BRAND_CONFIG.domain}/blog`,
    siteName: `${BRAND_CONFIG.name} - Free CV Maker UK`,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `UK CV Writing Guides & Career Advice | ${BRAND_CONFIG.name}`,
    description:
      'Recruiter-approved advice on UK CV formatting, personal statements, and ATS compliance.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
