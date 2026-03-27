'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useFadeInUp, useStaggerChildren } from '@/hooks/useScrollAnimation';

const TESTIMONIALS = {
  fr: [
    {
      quote:
        "Grâce à Altemis, nous avons financé une première learning map sur Stellar et posé les bases de notre expansion vers d'autres écosystèmes.",
      name: 'Marvin Scaringella',
      role: 'CEO, Venalabs',
    },
    {
      quote:
        "Cet accompagnement nous a permis de financer une solution blockchain adaptée à nos enjeux de traçabilité, d'auditabilité des composants aéronautique.",
      name: 'Sébastien Batty',
      role: 'CEO, Aerochain',
    },
    {
      quote:
        "Un accompagnement clé pour structurer le financement et le déploiement de nos produits DeFi, du liquid staking aux stratégies de rendement tokenisées.",
      name: 'Ahmed Serghini',
      role: 'CEO, Hatom',
    },
  ],
  en: [
    {
      quote:
        'Thanks to Altemis, we funded an initial learning map on Stellar and laid the foundations for our expansion into other ecosystems.',
      name: 'Marvin Scaringella',
      role: 'CEO, Venalabs',
    },
    {
      quote:
        'This support enabled us to fund a blockchain solution tailored to our traceability and auditability challenges for aeronautical components.',
      name: 'Sébastien Batty',
      role: 'CEO, Aerochain',
    },
    {
      quote:
        'Key support for structuring the funding and deployment of our DeFi products, from liquid staking to tokenized yield strategies.',
      name: 'Ahmed Serghini',
      role: 'CEO, Hatom',
    },
  ],
};

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale() as 'fr' | 'en';
  const titleRef = useFadeInUp<HTMLDivElement>();
  const cardsRef = useStaggerChildren<HTMLDivElement>(0.15);

  const items = TESTIMONIALS[locale];

  return (
    <section id="testimonials" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-red text-sm font-semibold tracking-widest uppercase">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">{t('title')}</h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-black-light border border-white/5 rounded-2xl p-8 relative flex flex-col"
            >
              {/* Quote mark */}
              <span className="text-red text-6xl font-serif absolute top-4 left-6 opacity-30">
                &ldquo;
              </span>
              <p className="text-gray leading-relaxed mb-6 pt-8 text-base flex-grow">
                {item.quote}
              </p>
              <div>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-gray">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
