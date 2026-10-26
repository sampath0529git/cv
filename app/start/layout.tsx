import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/config';

const canonicalDomainUrl = `https://${BRAND_CONFIG.domain}`;

export const metadata: Metadata = {
  title: 'Start Your Free UK CV – Scratch, Upload or LinkedIn',
  description:
    'Start building your UK CV for free on freecvmakeruk.co.uk. Create from scratch, upload an existing CV, or sync LinkedIn into recruiter-approved A4 layouts.',
  keywords: [
    'start free uk cv',
    'create cv online free uk',
    'linkedin to uk cv converter',
    'freecvmakeruk.co.uk start',
  ],
  alternates: {
    canonical: '/start',
  },
  openGraph: {
    title: 'Start Your Free UK CV – Scratch, Upload or LinkedIn | freecvmakeruk.co.uk',
    description:
      'Start building your UK CV for free on freecvmakeruk.co.uk. Create from scratch, upload an existing CV, or sync LinkedIn into recruiter-approved A4 layouts.',
    url: '/start',
    siteName: BRAND_CONFIG.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/hero-backdrop-clean.png',
        width: 1200,
        height: 630,
        alt: 'Start Your Free UK CV on freecvmakeruk.co.uk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start Your Free UK CV – Scratch, Upload or LinkedIn | freecvmakeruk.co.uk',
    description:
      'Start your British CV from scratch, upload an existing file, or import from LinkedIn for free.',
    images: ['/assets/hero-backdrop-clean.png'],
  },
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
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
        name: 'Start Free UK CV',
        item: `${canonicalDomainUrl}/start`,
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
