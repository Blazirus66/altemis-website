'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import IntroZoom from '@/components/IntroZoom';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ResultsSection from '@/components/ResultsSection';
import ProcessSection from '@/components/ProcessSection';
import EcosystemSection from '@/components/EcosystemSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [introActive, setIntroActive] = useState(true);

  const handleIntroComplete = () => {
    setIntroActive(false);
  };

  return (
    <>
      <Navbar visible={!introActive} />
      <IntroZoom active={introActive} onComplete={handleIntroComplete} />
      <main>
        <HeroSection />
        <ServicesSection />
        <ResultsSection />
        <ProcessSection />
        <EcosystemSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
