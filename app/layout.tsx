import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BRAND_CONFIG } from '@/lib/config';
import CvStoreHydrator from '@/components/common/CvStoreHydrator';
import AmbientGlassCanvas from '@/components/layout/AmbientGlassCanvas';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const canonicalDomainUrl = `https://${BRAND_CONFIG.domain}`;

export const metadata: Metadata = {
  title: {
    default: 'CV Creator Free | UK Curriculum Vitae Maker Online – freecvmakeruk.co.uk',
    template: '%s | freecvmakeruk.co.uk',
  },
  description:
    'Free CV creator online for UK jobseekers. Build an ATS-friendly British curriculum vitae in minutes with recruiter-approved A4 templates, instant PDF & Word export.',
  applicationName: 'freecvmakeruk.co.uk',
  keywords: [
    'cv creator free',
    'curriculum vitae maker free',
    'free cv creator online',
    'cv maker uk',
    'europass cv',
    'vita cv',
    'resume builder resume',
    'free online resume builder',
    'curriculum vitae c',
    'free cv templates',
    'free cv template',
    'free cv template word',
    'free cv template pdf',
    'cv uk format',
    'uk cv format template',
    'cv layout free',
    'cv template 16 year old',
    'acting cv template',
    'cv templates for students',
    'freecvmakeruk.co.uk',
  ],
  authors: [{ name: 'freecvmakeruk.co.uk', url: canonicalDomainUrl }],
  creator: 'freecvmakeruk.co.uk',
  publisher: 'freecvmakeruk.co.uk',
  category: 'Career & Employment',
  metadataBase: new URL('https://freecvmakeruk.co.uk'),
  alternates: {
    canonical: '/',
    languages: {
      'en-GB': '/',
    },
  },
  openGraph: {
    title: 'CV Creator Free | UK Curriculum Vitae Maker Online – freecvmakeruk.co.uk',
    description:
      'Free CV creator online for UK jobseekers. Build an ATS-friendly British curriculum vitae in minutes with recruiter-approved A4 templates, instant PDF & Word export.',
    url: '/',
    siteName: 'freecvmakeruk.co.uk',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/hero-backdrop-clean.png',
        width: 1200,
        height: 630,
        alt: 'CV Creator Free UK – Recruiter-Approved British A4 CV Maker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV Creator Free | UK Curriculum Vitae Maker Online – freecvmakeruk.co.uk',
    description:
      'Free CV creator online for UK jobseekers. Recruiter-approved British A4 CV templates with instant PDF & Word downloads.',
    images: ['/assets/hero-backdrop-clean.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Scoped strictly to site-wide entities. FAQPage and HowTo are scoped to individual pages.
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${canonicalDomainUrl}/#organization`,
        name: 'freecvmakeruk.co.uk',
        alternateName: 'Free CV Maker UK',
        url: canonicalDomainUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${canonicalDomainUrl}/assets/logo-mark.png`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'United Kingdom',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${canonicalDomainUrl}/#website`,
        url: canonicalDomainUrl,
        name: 'freecvmakeruk.co.uk – Free CV Maker UK',
        description:
          'The premier free CV creator online with recruiter-approved British A4 curriculum vitae templates, AI writing assistance, and instant PDF & Word downloads.',
        inLanguage: 'en-GB',
        publisher: {
          '@id': `${canonicalDomainUrl}/#organization`,
        },
      },
      {
        '@type': 'WebApplication',
        '@id': `${canonicalDomainUrl}/#webapp`,
        name: 'freecvmakeruk.co.uk – Free Online Resume Builder & CV Creator',
        url: `${canonicalDomainUrl}/builder`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        inLanguage: 'en-GB',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'GBP',
        },
        featureList: [
          'CV Creator Free & UK CV Maker Online',
          'Curriculum Vitae Maker Free with British A4 Formatting',
          'Free Online Resume Builder with Instant ATS Checks',
          'Europass CV and Vita CV Conversion to UK Format',
          'Instant Free A4 PDF & Word (.docx) Downloads',
          'British English AI Summary & Bullet Point Assistant',
          'Equality Act 2010 Compliant Layouts',
        ],
      },
    ],
  };

  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof window !== 'undefined') {
                    var _currentFetch = window.fetch ? window.fetch.bind(window) : undefined;
                    var descriptor = Object.getOwnPropertyDescriptor(window, 'fetch');
                    if (!descriptor || descriptor.configurable) {
                      Object.defineProperty(window, 'fetch', {
                        configurable: true,
                        enumerable: true,
                        get: function() {
                          return _currentFetch;
                        },
                        set: function(fn) {
                          _currentFetch = fn;
                        }
                      });
                    }
                    if (typeof Window !== 'undefined' && Window.prototype) {
                      var protoDesc = Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
                      if (!protoDesc || protoDesc.configurable) {
                        Object.defineProperty(Window.prototype, 'fetch', {
                          configurable: true,
                          enumerable: true,
                          get: function() {
                            return _currentFetch;
                          },
                          set: function(fn) {
                            _currentFetch = fn;
                          }
                        });
                      }
                    }
                  }
                } catch (e) {
                  // Fallback: silently handle if restricted
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased bg-[#EEF4FF] print:bg-white relative min-h-screen text-slate-900 selection:bg-[#4B4DED] selection:text-white`} suppressHydrationWarning>
        <AmbientGlassCanvas />
        <CvStoreHydrator />
        {children}
      </body>
    </html>
  );
}
