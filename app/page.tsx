import React from 'react';
import TopNav from '@/components/navigation/TopNav';
import HeroSection from '@/components/home/HeroSection';
import HiredByBar from '@/components/home/HiredByBar';
import StepsSection from '@/components/home/StepsSection';
import TemplatesSection from '@/components/home/TemplatesSection';
import ReasonsSection from '@/components/home/ReasonsSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import UkCvSeoSection from '@/components/home/UkCvSeoSection';
import BottomHeroBanner from '@/components/home/BottomHeroBanner';
import Footer from '@/components/layout/Footer';
import { StartCvProvider } from '@/components/builder/StartCvContext';

export default function HomePage() {
  return (
    <StartCvProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 overflow-x-clip selection:bg-blue-600 selection:text-white">
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
