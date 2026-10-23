import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Free CV Maker | Create a Professional CV Online – MakeMyCV',
  description:
    'Create a perfect CV in minutes with AI. MakeMyCV is the UK’s favourite free CV maker featuring recruiter-approved templates, smart phrasing, and instant PDF download.',
  keywords: [
    'free cv maker',
    'free CV maker UK',
    'free CV builder',
    'CV builder UK',
    'create a CV online',
    'make a CV online',
    'free CV template',
    'professional CV maker',
    'CV creator',
    'online CV builder',
    'free resume builder',
    'ATS friendly CV',
    'professional CV templates UK',
  ],
  authors: [{ name: 'MakeMyCV' }],
  creator: 'MakeMyCV',
  publisher: 'MakeMyCV',
  metadataBase: new URL(process.env.APP_URL || 'https://makemycv.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free CV Maker | Create a Professional CV Online – MakeMyCV',
    description:
      'Create a perfect CV in minutes with AI. Recruiter-approved templates, free CV builder, and instant PDF download.',
    url: '/',
    siteName: 'MakeMyCV',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CV Maker | Create a Professional CV Online – MakeMyCV',
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
        '@id': 'https://makemycv.co.uk/#website',
        url: 'https://makemycv.co.uk',
        name: 'MakeMyCV - Free CV Maker',
        description:
          'Free online CV maker and CV templates tailored for UK jobseekers and recruiters.',
        inLanguage: 'en-GB',
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://makemycv.co.uk/#webapp',
        name: 'MakeMyCV Free CV Maker',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'GBP',
        },
        featureList: [
          'ATS-Friendly CV Templates',
          'Recruiter-Approved UK Layouts',
          'Instant PDF Export',
          'AI-Powered Section Phrasing',
          'Matching Cover Letter Builder',
        ],
      },
    ],
  };

  return (
    <html lang="en-GB" className={plusJakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-[#3b5bfd] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
