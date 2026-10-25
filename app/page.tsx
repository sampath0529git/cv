import React from 'react';
import TopNav from '@/components/navigation/TopNav';
import HeroSection from '@/components/home/HeroSection';
import HiredByBar from '@/components/home/HiredByBar';
import FeatureTabsSection from '@/components/home/FeatureTabsSection';
import StepsSection from '@/components/home/StepsSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import TemplatesSection from '@/components/home/TemplatesSection';
import ReasonsSection from '@/components/home/ReasonsSection';
import SeoGuideFaqSection from '@/components/home/SeoGuideFaqSection';
import BottomHeroBanner from '@/components/home/BottomHeroBanner';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
import { StartCvProvider } from '@/components/builder/StartCvContext';

export default function HomePage() {
  return (
    <StartCvProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 overflow-x-clip selection:bg-blue-600 selection:text-white">
        {/* 1. Header Navigation Bar */}
        <TopNav />

        {/* 2. Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section with primary value prop and live CV mockup */}
          <HeroSection />

          {/* Hired by top employers banner */}
          <HiredByBar />

          {/* Feature Showcase Tabs Section */}
          <FeatureTabsSection />

          {/* 4-Step Creation Workflow */}
          <StepsSection />

          {/* Social Proof Reviews and Ratings Carousel */}
          <ReviewsSection />

          {/* Recruiter-Approved CV Templates Carousel (Dark Navy Mode) */}
          <TemplatesSection />

          {/* 6 Reasons to Choose ukcvmaker */}
          <ReasonsSection />

          {/* Editorial UK SEO Guide & Structured FAQ */}
          <SeoGuideFaqSection />

          {/* Bottom Conversion Banner */}
          <BottomHeroBanner />
        </main>

        {/* 3. Global UK Footer */}
        <Footer />

        {/* Floating Scroll to Top button */}
        <ScrollToTop />
      </div>
    </StartCvProvider>
  );
}
