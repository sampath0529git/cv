import React from 'react';
import type { Metadata } from 'next';
import TopNav from '@/components/navigation/TopNav';
import HeroSection from '@/components/home/HeroSection';
import HiredByBar from '@/components/home/HiredByBar';
import StepsSection from '@/components/home/StepsSection';
import TemplatesSection from '@/components/home/TemplatesSection';
import ReasonsSection from '@/components/home/ReasonsSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import UkCvSeoSection from '@/components/home/UkCvSeoSection';
import { HOMEPAGE_UK_FAQS } from '@/data/homepageFaqs';
import BottomHeroBanner from '@/components/home/BottomHeroBanner';
import Footer from '@/components/layout/Footer';
import { StartCvProvider } from '@/components/builder/StartCvContext';
import { BRAND_CONFIG } from '@/lib/config';

const canonicalDomainUrl = `https://${BRAND_CONFIG.domain}`;

export const metadata: Metadata = {
  title: 'CV Creator Free | Build a Standout UK Curriculum Vitae Online',
  description:
    'Use our #1 free CV creator online. Build an ATS-friendly British curriculum vitae in minutes with our curriculum vitae maker free tool, free online resume builder, and instant A4 PDF & Word export.',
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
    'free cv template word',
    'free cv template pdf',
    'cv uk format',
    'uk cv format template',
    'cv layout free',
    'cv template 16 year old',
    'acting cv template',
    'cv templates for students',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'en-GB': '/',
    },
  },
  openGraph: {
    title: 'CV Creator Free | Build a Standout UK Curriculum Vitae Online',
    description:
      'The leading free CV creator online and CV maker UK. Recruiter-approved British A4 layouts, AI writing assistance, and instant free PDF & Word downloads.',
    url: '/',
    siteName: BRAND_CONFIG.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/hero-backdrop-clean.png',
        width: 1200,
        height: 630,
        alt: 'CV Creator Free UK – Build a Standout Curriculum Vitae Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV Creator Free | Build a Standout UK Curriculum Vitae Online',
    description:
      'The leading free CV creator online and CV maker UK. Recruiter-approved British A4 layouts with instant free PDF & Word downloads.',
    images: ['/assets/hero-backdrop-clean.png'],
  },
};

export default function HomePage() {
  // Scoped STRICTLY to the Homepage (prevents schema pollution across subpages)
  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        '@id': `${canonicalDomainUrl}/#howto`,
        name: 'How to Create a Job-Winning UK CV for Free',
        description:
          'Create an ATS-compliant British curriculum vitae online in 4 quick steps using our cv creator free platform.',
        totalTime: 'PT5M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose a Free CV Template',
            text: 'Select from recruiter-approved free cv templates, corporate, modern, academic, or graduate ISO A4 British CV layouts.',
            url: `${canonicalDomainUrl}/cv-templates`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Add or Import Your Career Details',
            text: 'Enter your personal profile, work experience, qualifications, and key skills—or convert an existing Europass CV or vita CV into UK format.',
            url: `${canonicalDomainUrl}/start`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Customise Typography & Layout Free',
            text: 'Refine accent colours, font pairing, font scale, and British section order with real-time A4 preview.',
            url: `${canonicalDomainUrl}/builder`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Download Free CV Template PDF or Word Document',
            text: 'Export your finished CV instantly as a crisp 300 DPI free cv template pdf or editable free cv template word (.docx) file ready for UK employers.',
            url: `${canonicalDomainUrl}/builder`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalDomainUrl}/#faq`,
        mainEntity: HOMEPAGE_UK_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <StartCvProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <div className="min-h-screen flex flex-col bg-transparent text-slate-900 overflow-x-clip selection:bg-blue-600 selection:text-white">
        {/* 1. Header Navigation Bar */}
        <TopNav />

        {/* 2. Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection />

          {/* Hired by top employers banner */}
          <HiredByBar />

          {/* Create your CV in 4 steps + Why 1M+ users trust freecvmakeruk.co.uk */}
          <StepsSection />

          {/* Professional Academic & Corporate CV Templates (Dark Navy) */}
          <TemplatesSection />

          {/* 6 Reasons to Create Your CV with freecvmakeruk.co.uk */}
          <ReasonsSection />

          {/* Real Stories / Customer Testimonial Slider */}
          <ReviewsSection />

          {/* UK CV Standards & Free CV Maker UK SEO Section with FAQ */}
          <UkCvSeoSection />

          {/* Bottom Callout Banner */}
          <BottomHeroBanner />
        </main>

        {/* 3. Global Footer */}
        <Footer />
      </div>
    </StartCvProvider>
  );
}
