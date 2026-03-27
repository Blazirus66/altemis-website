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
      // Navigate to Calendly (native redirect avoids iOS popup blocker)
      window.location.href = 'https://calendly.com/d/cwnc-h9v-zk4/30-mins-altemis';
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
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      if (!res.ok) throw new Error();

      setStatus('sent');
      form.reset();
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm text-gray mb-2">{t('name')}</label>
        <input
          type="text"
          name="name"
          required
          placeholder={t('namePlaceholder')}
          className="w-full bg-black-light border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-red/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-gray mb-2">{t('email')}</label>
        <input
          type="email"
          name="email"
          required
          placeholder={t('emailPlaceholder')}
          className="w-full bg-black-light border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-red/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-gray mb-2">{t('message')}</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={t('messagePlaceholder')}
          className="w-full bg-black-light border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-red/50 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-red-fill w-full bg-red text-white py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-red/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' && t('sending')}
        {status === 'sent' && t('sent')}
        {status === 'error' && t('error')}
        {status === 'idle' && t('send')}
      </button>
    </form>
  );
}
