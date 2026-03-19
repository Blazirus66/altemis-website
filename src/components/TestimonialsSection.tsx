'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useFadeInUp, useStaggerChildren } from '@/hooks/useScrollAnimation';

const TESTIMONIALS = {
  fr: [
    {
      quote:
        "Altemis nous a permis de sécuriser plus de $500K en grants en moins de 3 mois. Leur connaissance des écosystèmes est inégalée.",
      name: 'Alexandre D.',
      role: 'CEO, DeFi Protocol',
    },
    {
      quote:
        "Le process est clair, l'exécution impeccable. On a pu se concentrer sur notre produit pendant qu'Altemis gérait toute la partie écosystème.",
      name: 'Sarah M.',
      role: 'CTO, Infrastructure Web3',
    },
    {
      quote:
        "En 6 mois, on est passé de zéro à présent sur 4 écosystèmes majeurs grâce à leur accompagnement stratégique.",
      name: 'Thomas L.',
      role: 'Founder, Gaming Studio',
    },
  ],
  en: [
    {
      quote:
        'Altemis helped us secure over $500K in grants in less than 3 months. Their ecosystem knowledge is unmatched.',
      name: 'Alexandre D.',
      role: 'CEO, DeFi Protocol',
    },
    {
      quote:
        'The process is clear, execution flawless. We could focus on our product while Altemis handled the entire ecosystem side.',
      name: 'Sarah M.',
      role: 'CTO, Web3 Infrastructure',
    },
    {
      quote:
        'In 6 months, we went from zero to present on 4 major ecosystems thanks to their strategic support.',
      name: 'Thomas L.',
      role: 'Founder, Gaming Studio',
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
              className="bg-black-light border border-white/5 rounded-2xl p-8 relative"
            >
              {/* Quote mark */}
              <span className="text-red text-6xl font-serif absolute top-4 left-6 opacity-30">
                &ldquo;
              </span>
              <p className="text-gray leading-relaxed mb-6 pt-8 text-sm">
                {item.quote}
              </p>
              <div>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-xs text-gray">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
