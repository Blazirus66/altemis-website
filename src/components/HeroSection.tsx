'use client';

import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="relative h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            {t('title1')}
            <br />
            <span className="text-red">{t('title2')}</span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="mt-10">
            <a
              href="https://calendly.com/d/cwnc-h9v-zk4/30-mins-altemis"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red-fill bg-red hover:bg-red/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all inline-block"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
