'use client';

import { useTranslations } from 'next-intl';
import { useFadeInUp, useStaggerChildren } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

const ICONS = {
  strategy: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),
  funding: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  execution: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
};

export default function ServicesSection() {
  const t = useTranslations('services');
  const titleRef = useFadeInUp<HTMLDivElement>();
  const cardsRef = useStaggerChildren<HTMLDivElement>(0.2);
  const parallaxRef = useParallax<HTMLDivElement>(-0.15);

  const services = [
    { key: 'strategy' as const, icon: ICONS.strategy },
    { key: 'funding' as const, icon: ICONS.funding },
    { key: 'execution' as const, icon: ICONS.execution },
  ];

  return (
    <section id="services" className="relative py-32 px-6">
      {/* Background monogram */}
      <div
        ref={parallaxRef}
        className="absolute right-0 top-0 pointer-events-none"
      >
        <Image src="/Logo_A-removebg.svg" alt="" width={500} height={525} className="w-[500px] h-auto opacity-[0.05]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-red text-sm font-semibold tracking-widest uppercase">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">{t('title')}</h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {services.map(({ key, icon }) => (
            <div
              key={key}
              className="group relative bg-black-light border border-white/5 rounded-2xl p-8 hover:border-red/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-red/10 flex items-center justify-center text-red mb-6 group-hover:bg-red/20 transition-colors">
                {icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{t(`${key}.title`)}</h3>
              <p className="text-gray leading-relaxed text-sm">
                {t(`${key}.desc`)}
              </p>
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
