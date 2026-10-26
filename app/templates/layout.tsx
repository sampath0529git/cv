import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/config';

const canonicalDomainUrl = `https://${BRAND_CONFIG.domain}`;

export const metadata: Metadata = {
  title: 'Free UK CV Templates – ATS-Friendly British Layouts',
  description:
    'Browse recruiter-approved free UK CV templates on freecvmakeruk.co.uk. Choose graduate, executive, corporate, and modern ISO A4 layouts with free PDF download.',
  keywords: [
    'free cv templates uk',
    'uk cv templates free download',
    'ats friendly cv templates uk',
    'british cv format templates',
    'graduate cv template uk',
    'corporate cv template uk',
    'freecvmakeruk.co.uk templates',
  ],
  alternates: {
    canonical: '/templates',
  },
  openGraph: {
    title: 'Free UK CV Templates – ATS-Friendly British Layouts | freecvmakeruk.co.uk',
    description:
      'Browse recruiter-approved free UK CV templates on freecvmakeruk.co.uk. Choose graduate, executive, and corporate ISO A4 layouts with free PDF download.',
    url: '/templates',
    siteName: BRAND_CONFIG.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/hero-backdrop-clean.png',
        width: 1200,
        height: 630,
        alt: 'Free UK CV Templates – Recruiter-Approved British A4 Layouts on freecvmakeruk.co.uk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free UK CV Templates – ATS-Friendly British Layouts | freecvmakeruk.co.uk',
    description:
      'Recruiter-approved free UK CV templates calibrated for the British job market and ATS compliance.',
    images: ['/assets/hero-backdrop-clean.png'],
  },
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalDomainUrl}/templates/#webpage`,
    name: 'Free UK CV Templates – Recruiter-Approved British A4 Layouts',
    description:
      'Collection of free, ATS-optimised CV templates calibrated to British hiring standards and ISO A4 dimensions on freecvmakeruk.co.uk.',
    url: `${canonicalDomainUrl}/templates`,
    inLanguage: 'en-GB',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${canonicalDomainUrl}/#website`,
      name: `${BRAND_CONFIG.name} – Free CV Maker UK`,
    },
    about: {
      '@type': 'Thing',
      name: 'Free UK CV Templates',
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
        item: canonicalDomainUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'UK CV Templates',
        item: `${canonicalDomainUrl}/templates`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
