import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: `Free CV Templates UK | ATS-Friendly British Layouts – ${BRAND_CONFIG.name}`,
  description:
    'Browse recruiter-approved free CV templates in the UK. Choose from graduate, executive, minimal, and modern ISO A4 formats with instant free PDF download.',
  keywords: [
    'free cv templates',
    'free CV templates UK',
    'graduate cv templates',
    'school leaver cv template',
    'finance cv template',
    'ATS friendly CV templates',
    'British CV format download',
    'UK resume templates free',
  ],
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/templates`,
  },
  openGraph: {
    title: `Free CV Templates UK | ATS-Friendly British Layouts – ${BRAND_CONFIG.name}`,
    description:
      'Browse recruiter-approved free CV templates in the UK. Choose from graduate, executive, and corporate ISO A4 formats with instant free PDF download.',
    url: `https://${BRAND_CONFIG.domain}/templates`,
    siteName: `${BRAND_CONFIG.name} - Free CV Maker UK`,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Free CV Templates UK | ATS-Friendly British Layouts – ${BRAND_CONFIG.name}`,
    description:
      'Recruiter-approved free CV templates calibrated for the UK job market and ATS compliance.',
  },
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `https://${BRAND_CONFIG.domain}/templates/#webpage`,
    name: 'Free CV Templates UK - Recruiter-Approved British Formats',
    description:
      'Collection of free, ATS-optimised CV templates calibrated to British hiring standards and ISO A4 dimensions.',
    url: `https://${BRAND_CONFIG.domain}/templates`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `https://${BRAND_CONFIG.domain}/#website`,
      name: `${BRAND_CONFIG.name} - Free CV Maker UK`,
    },
    about: {
      '@type': 'Thing',
      name: 'Free CV Templates',
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
        name: 'CV Templates',
        item: `https://${BRAND_CONFIG.domain}/templates`,
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
