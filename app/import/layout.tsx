import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/config';

const canonicalDomainUrl = `https://${BRAND_CONFIG.domain}`;

export const metadata: Metadata = {
  title: 'Import Existing CV or LinkedIn – UK CV Formatter',
  description:
    'Upload an existing PDF or Word CV on freecvmakeruk.co.uk to reformat it into an ATS-friendly British A4 template with instant free PDF and DOCX export.',
  keywords: [
    'import cv uk',
    'reformat cv online free uk',
    'uk cv parser free',
    'convert resume to uk cv',
    'freecvmakeruk.co.uk import',
  ],
  alternates: {
    canonical: '/import',
  },
  openGraph: {
    title: 'Import Existing CV or LinkedIn – UK CV Formatter | freecvmakeruk.co.uk',
    description:
      'Upload an existing PDF or Word CV on freecvmakeruk.co.uk to reformat it into an ATS-friendly British A4 template with instant free PDF and DOCX export.',
    url: '/import',
    siteName: BRAND_CONFIG.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/hero-backdrop-clean.png',
        width: 1200,
        height: 630,
        alt: 'Import and Reformat Your UK CV – freecvmakeruk.co.uk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Import Existing CV or LinkedIn – UK CV Formatter | freecvmakeruk.co.uk',
    description:
      'Upload your existing PDF or Word CV and convert it into a recruiter-approved British A4 layout.',
    images: ['/assets/hero-backdrop-clean.png'],
  },
};

export default function ImportLayout({ children }: { children: React.ReactNode }) {
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
        name: 'Import Existing CV',
        item: `${canonicalDomainUrl}/import`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
