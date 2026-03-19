'use client';

import { useTranslations } from 'next-intl';
import { useFadeInUp, useStaggerChildren } from '@/hooks/useScrollAnimation';
import { motion } from 'framer-motion';

// Placeholder ecosystem logos — replace with real ones
const ECOSYSTEMS = [
  { name: 'Ethereum', color: '#627EEA' },
  { name: 'Solana', color: '#9945FF' },
  { name: 'Polygon', color: '#8247E5' },
  { name: 'Avalanche', color: '#E84142' },
  { name: 'Arbitrum', color: '#28A0F0' },
  { name: 'Optimism', color: '#FF0420' },
  { name: 'Near', color: '#00EC97' },
  { name: 'Cosmos', color: '#2E3148' },
  { name: 'Starknet', color: '#EC796B' },
  { name: 'Aptos', color: '#2DD8A3' },
  { name: 'Sui', color: '#6FBCF0' },
  { name: 'Base', color: '#0052FF' },
];

export default function EcosystemSection() {
  const t = useTranslations('ecosystem');
  const titleRef = useFadeInUp<HTMLDivElement>();
  const gridRef = useStaggerChildren<HTMLDivElement>(0.08);

  return (
    <section id="ecosystem" className="relative py-32 px-6 bg-black-light">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-red text-sm font-semibold tracking-widest uppercase">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">{t('title')}</h2>
          <p className="mt-4 text-gray max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {ECOSYSTEMS.map((eco) => (
            <motion.div
              key={eco.name}
              className="group bg-black border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {/* Placeholder logo circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: eco.color + '20', color: eco.color }}
              >
                {eco.name[0]}
              </div>
              <span className="text-xs text-gray group-hover:text-white transition-colors">
                {eco.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
