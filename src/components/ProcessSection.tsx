'use client';

import { useTranslations } from 'next-intl';
import {
  useFadeInUp,
  useStaggerChildren,
  useDrawLine,
} from '@/hooks/useScrollAnimation';

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const;

export default function ProcessSection() {
  const t = useTranslations('process');
  const titleRef = useFadeInUp<HTMLDivElement>();
  const stepsRef = useStaggerChildren<HTMLDivElement>(0.2);
  const lineRef = useDrawLine<HTMLDivElement>();

  return (
    <section id="process" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="text-center mb-20">
          <span className="text-red text-sm font-semibold tracking-widest uppercase">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">{t('title')}</h2>
        </div>

        <div ref={stepsRef} className="relative">
          {/* Red vertical line that draws on scroll */}
          <div
            ref={lineRef}
            className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-0.5 bg-red origin-top"
          />

          <div className="space-y-16">
            {STEPS.map((step, i) => (
              <div key={step} className="flex gap-6 md:gap-10 relative">
                {/* Step number */}
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black-light border-2 border-red flex items-center justify-center z-10">
                  <span className="text-red font-bold text-lg md:text-xl">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-2 md:pt-4">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {t(`${step}.title`)}
                  </h3>
                  <p className="text-gray leading-relaxed">
                    {t(`${step}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
