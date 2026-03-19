'use client';

import Navbar from '@/components/Navbar';
import IntroZoom from '@/components/IntroZoom';
import ServicesSection from '@/components/ServicesSection';
import ResultsSection from '@/components/ResultsSection';
import ProcessSection from '@/components/ProcessSection';
import EcosystemSection from '@/components/EcosystemSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <IntroZoom />
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
