'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useScrollAnimation';
import MonogramSVG from './MonogramSVG';

export default function HeroSection() {
  const t = useTranslations('hero');
  const parallaxRef = useParallax<HTMLDivElement>(0.2);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background A logo parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none"
      >
        <MonogramSVG className="w-[500px] lg:w-[600px] h-auto opacity-[0.06]" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            {t('title1')}
            <br />
            <span className="text-red">{t('title2')}</span>
          </h1>
        </motion.div>

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={scrollToContact}
            className="btn-red-fill bg-red hover:bg-red/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
          >
            {t('cta')}
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-gray tracking-widest uppercase">
            {t('scroll')}
          </span>
          <motion.div
            className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-red rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
