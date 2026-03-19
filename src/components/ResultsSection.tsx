'use client';

import { useTranslations } from 'next-intl';
import { useFadeInUp, useCountUp } from '@/hooks/useScrollAnimation';

const STATS = [
  { key: 'raised', value: 2.5, prefix: '$', suffix: 'M+', decimals: 1 },
  { key: 'projects', value: 30, prefix: '', suffix: '+', decimals: 0 },
  { key: 'ecosystems', value: 12, prefix: '', suffix: '', decimals: 0 },
  { key: 'success', value: 95, prefix: '', suffix: '%', decimals: 0 },
] as const;

export default function ResultsSection() {
  const t = useTranslations('results');
  const titleRef = useFadeInUp<HTMLDivElement>();

  return (
    <section id="results" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-20">
          <span className="text-red text-sm font-semibold tracking-widest uppercase">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {STATS.map(({ key, value, prefix, suffix, decimals }) => (
            <StatCard
              key={key}
              label={t(key)}
              value={value}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  prefix,
  suffix,
  decimals,
}: {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
}) {
  const countRef = useCountUp(value, suffix, prefix, decimals);

  return (
    <div className="text-center p-4">
      <span
        ref={countRef}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-red block whitespace-nowrap"
      >
        {prefix}0{suffix}
      </span>
      <span className="mt-3 text-gray text-sm md:text-base block">
        {label}
      </span>
    </div>
  );
}
