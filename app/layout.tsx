import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { BRAND_CONFIG } from '@/lib/config';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `Free CV Maker | Create a Professional CV Online – ${BRAND_CONFIG.name}`,
  description:
    `Create a perfect CV in minutes with AI. ${BRAND_CONFIG.name} is the premier free CV maker featuring recruiter-approved templates, real-time preview, and instant PDF download.`,
  keywords: [
    'free cv maker',
    'free CV builder',
    'create a CV online',
    'make a CV online',
    'free CV template',
    'professional CV maker',
    'online CV builder',
    'ATS friendly CV',
    'professional CV templates',
  ],
  authors: [{ name: BRAND_CONFIG.name }],
  creator: BRAND_CONFIG.name,
  publisher: BRAND_CONFIG.name,
  metadataBase: new URL(process.env.APP_URL || `https://${BRAND_CONFIG.domain}`),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `Free CV Maker | Create a Professional CV Online – ${BRAND_CONFIG.name}`,
    description:
      'Create a perfect CV in minutes with AI. Recruiter-approved templates, free CV builder, and instant PDF download.',
    url: '/',
    siteName: BRAND_CONFIG.name,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Free CV Maker | Create a Professional CV Online – ${BRAND_CONFIG.name}`,
    description:
      'Create a perfect CV in minutes with AI. Stand out with a stylish CV template and land the job of your dreams.',
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
        name: `${BRAND_CONFIG.name} - Free CV Maker`,
        description:
          'Free online CV maker and CV templates tailored for jobseekers and recruiters.',
        inLanguage: 'en-GB',
      },
      {
        '@type': 'WebApplication',
        '@id': `https://${BRAND_CONFIG.domain}/#webapp`,
        name: `${BRAND_CONFIG.name} Free CV Maker`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'ATS-Friendly CV Templates',
          'Recruiter-Approved Layouts',
          'Instant PDF Export',
          'AI-Powered Section Phrasing',
          'Real-time Live Preview',
        ],
      },
    ],
  };

  return (
    <html lang="en-GB" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-[#4B4DED] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
