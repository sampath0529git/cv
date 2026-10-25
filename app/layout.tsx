import type { Metadata } from 'next';
import './globals.css';
import { BRAND_CONFIG } from '@/lib/config';
import CvStoreHydrator from '@/components/common/CvStoreHydrator';

export const metadata: Metadata = {
  title: `Free CV Maker UK | Best Free Online CV Builder – ${BRAND_CONFIG.name}`,
  description:
    'The #1 free CV maker UK. Create an ATS-friendly British CV online with recruiter-approved templates, live preview, and instant free PDF download.',
  keywords: [
    'free cv maker',
    'free cv maker uk',
    'cv maker free',
    'cv maker online free',
    'online cv maker free',
    'free online cv maker',
    'cv maker free download',
    'free cv maker online',
    'free cv templates uk',
    'ATS friendly CV builder',
    'British CV format',
  ],
  authors: [{ name: BRAND_CONFIG.name }],
  creator: BRAND_CONFIG.name,
  publisher: BRAND_CONFIG.name,
  metadataBase: new URL(process.env.APP_URL || `https://${BRAND_CONFIG.domain}`),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `Free CV Maker UK | Best Free Online CV Builder – ${BRAND_CONFIG.name}`,
    description:
      'Build professional, ATS-friendly UK CVs in minutes with the premier free CV maker UK. Recruiter-approved British formats with instant free PDF download.',
    url: '/',
    siteName: `${BRAND_CONFIG.name} - Free CV Maker UK`,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Free CV Maker UK | Best Free Online CV Builder – ${BRAND_CONFIG.name}`,
    description:
      'Create a standout UK CV in minutes with AI. The #1 free CV maker UK featuring British templates and instant ATS-friendly PDF download.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `https://${BRAND_CONFIG.domain}/#website`,
        url: `https://${BRAND_CONFIG.domain}`,
        name: `${BRAND_CONFIG.name} - Free CV Maker UK`,
        description:
          'The leading free CV maker UK with recruiter-approved British CV templates, AI guidance, and instant PDF download.',
        inLanguage: 'en-GB',
      },
      {
        '@type': 'WebApplication',
        '@id': `https://${BRAND_CONFIG.domain}/#webapp`,
        name: `${BRAND_CONFIG.name} Free CV Maker UK`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'GBP',
        },
        featureList: [
          'UK Recruiter-Approved CV Templates',
          'ATS-Friendly British Layouts',
          'Instant Free PDF Export',
          'British English AI Phrasing',
          'Real-time Live Preview',
          '100% Free CV Builder for UK Jobseekers',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `https://${BRAND_CONFIG.domain}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is Makemeyour really a free CV maker in the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Makemeyour is a completely free CV maker UK jobseekers can use to create, format, and download ATS-friendly CVs without hidden subscriptions or paywalls.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does this free CV maker support standard UK CV formats?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All templates on Makemeyour follow British employment standards, including 2-page reverse-chronological layouts, personal statements, UK date formats, and bias-free structures that comply with UK Equality Act recruitment practices.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will my CV pass ATS scanners used by UK recruitment agencies?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every template is strictly tested against Applicant Tracking Systems (ATS) used by major UK employers and job boards like Reed, Totaljobs, Indeed UK, and CV-Library.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download my UK CV as a PDF for free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can instantly export your finalized UK CV as an ATS-optimized, high-resolution A4 PDF ready for submitting to British employers.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
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
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-[#4B4DED] selection:text-white" suppressHydrationWarning>
        <CvStoreHydrator />
        {children}
      </body>
    </html>
  );
}
