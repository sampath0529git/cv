import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/config';

const canonicalDomainUrl = `https://${BRAND_CONFIG.domain}`;

export const metadata: Metadata = {
  title: 'Free Online UK CV Builder & A4 PDF Maker',
  description:
    'Create, customise, and download your UK CV online for free on freecvmakeruk.co.uk. Live A4 preview, ATS-friendly layouts, and instant PDF or Word export.',
  keywords: [
    'free online cv builder uk',
    'uk cv maker online',
    'free a4 cv pdf generator',
    'ats cv builder uk',
    'freecvmakeruk.co.uk builder',
  ],
  alternates: {
    canonical: '/builder',
  },
  openGraph: {
    title: 'Free Online UK CV Builder & A4 PDF Maker | freecvmakeruk.co.uk',
    description:
      'Create, customise, and download your UK CV online for free on freecvmakeruk.co.uk. Live A4 preview, ATS-friendly layouts, and instant PDF or Word export.',
    url: '/builder',
    siteName: BRAND_CONFIG.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/hero-backdrop-clean.png',
        width: 1200,
        height: 630,
        alt: 'Free Online UK CV Builder Studio – freecvmakeruk.co.uk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online UK CV Builder & A4 PDF Maker | freecvmakeruk.co.uk',
    description:
      'Build an ATS-compliant British CV with live A4 preview and instant free PDF or Word export.',
    images: ['/assets/hero-backdrop-clean.png'],
  },
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
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
        name: 'UK CV Builder Studio',
        item: `${canonicalDomainUrl}/builder`,
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
