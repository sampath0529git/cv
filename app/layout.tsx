import type { Metadata } from 'next';
import './globals.css';
import { BRAND_CONFIG, getSiteUrl } from '@/lib/config';
import CvStoreHydrator from '@/components/common/CvStoreHydrator';

const siteUrl = getSiteUrl();
const canonicalDomainUrl = `https://${BRAND_CONFIG.domain}`;

export const metadata: Metadata = {
  title: {
    default: 'Free CV Maker UK | Online CV Builder – freecvmakeruk.co.uk',
    template: '%s | freecvmakeruk.co.uk',
  },
  description:
    'Build a job-winning UK CV in minutes with freecvmakeruk.co.uk. Choose recruiter-approved British A4 templates and download an ATS-friendly PDF for free.',
  applicationName: 'freecvmakeruk.co.uk',
  keywords: [
    'freecvmakeruk.co.uk',
    'free cv maker uk',
    'free cv builder uk',
    'uk cv maker free',
    'online cv maker uk',
    'free uk cv templates',
    'ats friendly cv builder uk',
    'british cv format',
    'cv maker free pdf download uk',
    'graduate cv builder uk',
    'nhs and corporate cv templates uk',
  ],
  authors: [{ name: 'freecvmakeruk.co.uk', url: canonicalDomainUrl }],
  creator: 'freecvmakeruk.co.uk',
  publisher: 'freecvmakeruk.co.uk',
  category: 'Career & Employment',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'en-GB': '/',
    },
  },
  openGraph: {
    title: 'Free CV Maker UK | Online CV Builder – freecvmakeruk.co.uk',
    description:
      'Build a job-winning UK CV in minutes with freecvmakeruk.co.uk. Choose recruiter-approved British A4 templates and download an ATS-friendly PDF for free.',
    url: '/',
    siteName: 'freecvmakeruk.co.uk',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/hero-backdrop-clean.png',
        width: 1200,
        height: 630,
        alt: 'freecvmakeruk.co.uk – Free CV Maker UK with Recruiter-Approved British A4 Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CV Maker UK | Online CV Builder – freecvmakeruk.co.uk',
    description:
      'Build a job-winning UK CV in minutes with freecvmakeruk.co.uk. Choose recruiter-approved British A4 templates and download an ATS-friendly PDF for free.',
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
          'The UK free online CV maker with recruiter-approved British A4 CV templates, AI writing assistance, and instant PDF & Word downloads.',
        inLanguage: 'en-GB',
        publisher: {
          '@id': `${canonicalDomainUrl}/#organization`,
        },
      },
      {
        '@type': 'WebApplication',
        '@id': `${canonicalDomainUrl}/#webapp`,
        name: 'freecvmakeruk.co.uk – Free CV Maker UK',
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
          'UK Recruiter-Approved A4 CV Templates',
          'ATS-Friendly British CV Layouts',
          'Instant Free A4 PDF & Word (.docx) Export',
          'British English AI Summary & Bullet Point Assistant',
          'Real-Time Live A4 Multi-Page Preview',
          'UK Equality Act Compliant Photo-Optional Formatting',
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `${canonicalDomainUrl}/#howto`,
        name: 'How to Create a Job-Winning UK CV for Free',
        description:
          'Create an ATS-compliant British CV online in 4 quick steps using freecvmakeruk.co.uk.',
        totalTime: 'PT5M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose a UK CV Template',
            text: 'Select from recruiter-approved corporate, modern, minimal, academic, or graduate ISO A4 UK CV templates.',
            url: `${canonicalDomainUrl}/templates`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Add or Import Your Career Details',
            text: 'Enter your personal profile, work experience, qualifications, and key skills—or import an existing CV or LinkedIn profile.',
            url: `${canonicalDomainUrl}/start`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Customise Typography & Layout',
            text: 'Refine accent colours, font pairing, font scale, letter spacing, and section order with real-time A4 preview.',
            url: `${canonicalDomainUrl}/builder`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Download Free PDF or Word CV',
            text: 'Export your finished CV instantly as a crisp 300 DPI A4 PDF or editable DOCX ready for UK employers and job boards.',
            url: `${canonicalDomainUrl}/builder`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalDomainUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is freecvmakeruk.co.uk really a free CV maker in the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, 100%. freecvmakeruk.co.uk is a completely free CV maker UK jobseekers can use to create, customise, and download ATS-friendly A4 CVs without hidden subscriptions or paywalls.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does freecvmakeruk.co.uk support standard British CV formats?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All templates on freecvmakeruk.co.uk follow UK employment standards, including 2-page reverse-chronological A4 layouts, personal statements, British date conventions, and Equality Act 2010 compliant structures.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will my CV pass ATS scanners used by UK recruitment agencies?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every template on freecvmakeruk.co.uk is engineered for Applicant Tracking Systems (ATS) used by major British employers and portals including Reed.co.uk, Indeed UK, Totaljobs, and CV-Library.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download my UK CV as a PDF or Word document for free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can instantly export your completed UK CV as an ATS-optimised ISO A4 PDF or editable Microsoft Word (.docx) file at no cost.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Merriweather:ital,wght@0,400;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto:wght@400;500;700;900&display=swap"
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
