'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useFadeInUp } from '@/hooks/useScrollAnimation';

export default function ContactSection() {
  const t = useTranslations('contact');
  const titleRef = useFadeInUp<HTMLDivElement>();

  return (
    <section id="contact" className="relative">
      {/* Full-screen Calendly CTA */}
      <div className="relative min-h-[70vh] bg-red flex items-center justify-center px-6 overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div ref={titleRef} className="relative z-10 text-center max-w-2xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-12">
            {t('subtitle')}
          </p>

          {/* Slide to unlock button */}
          <SlideToBook label={t('slideText')} />
        </div>
      </div>

      {/* Contact form */}
      <div className="bg-black py-24 px-6">
        <div className="max-w-xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-10">
            {t('formTitle')}
          </h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function SlideToBook({ label }: { label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX =
      'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left - 30, rect.width - 60));
    setOffset(x);

    if (x >= rect.width - 80) {
      setUnlocked(true);
      setDragging(false);
      // Open Calendly - replace with your link
      window.open('https://calendly.com', '_blank');
      setTimeout(() => {
        setUnlocked(false);
        setOffset(0);
      }, 1500);
    }
  };

  useEffect(() => {
    const up = () => {
      if (!unlocked) {
        setDragging(false);
        setOffset(0);
      }
    };
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  }, [unlocked]);

  return (
    <div
      ref={trackRef}
      className="relative w-full max-w-sm mx-auto h-16 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 select-none"
      onMouseMove={handleDrag}
      onTouchMove={handleDrag}
    >
      {/* Track label */}
      <span className="absolute inset-0 flex items-center justify-center text-white/60 text-sm font-medium pointer-events-none">
        {unlocked ? '✓' : label}
      </span>

      {/* Slider thumb */}
      <motion.div
        className="absolute top-1.5 left-1.5 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-lg"
        style={{ x: offset }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
        whileHover={{ scale: 1.05 }}
      >
        <svg
          className="w-5 h-5 text-red"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </motion.div>
    </div>
  );
}

function ContactForm() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrate with your backend / form service
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm text-gray mb-2">{t('name')}</label>
        <input
          type="text"
          required
          placeholder={t('namePlaceholder')}
          className="w-full bg-black-light border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-red/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-gray mb-2">{t('email')}</label>
        <input
          type="email"
          required
          placeholder={t('emailPlaceholder')}
          className="w-full bg-black-light border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-red/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-gray mb-2">{t('message')}</label>
        <textarea
          required
          rows={4}
          placeholder={t('messagePlaceholder')}
          className="w-full bg-black-light border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-red/50 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="btn-red-fill w-full bg-red text-white py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-red/20"
      >
        {sent ? t('sent') : t('send')}
      </button>
    </form>
  );
}
