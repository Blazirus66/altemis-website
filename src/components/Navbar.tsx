'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from '@/i18n/navigation';
import Image from 'next/image';

const NAV_ITEMS = [
  'services',
  'results',
  'process',
  'ecosystem',
  'testimonials',
  'contact',
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show navbar only after passing ~60% of the intro zoom (h-[400vh])
      const introThreshold = window.innerHeight * 2.4;
      setVisible(window.scrollY > introThreshold);
      setScrolled(window.scrollY > introThreshold + 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const switchLocale = (locale: 'fr' | 'en') => {
    router.replace(pathname, { locale });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2"
          >
            <Image src="/Logo-removebg-white.svg" alt="ALTEMIS" width={200} height={52} className="h-10 w-auto" />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-sm text-gray hover:text-white transition-colors duration-200"
              >
                {t(item)}
              </button>
            ))}

            {/* Language switcher */}
            <div className="flex items-center gap-1 text-sm border border-white/10 rounded-full px-3 py-1">
              <button
                onClick={() => switchLocale('fr')}
                className="px-1 hover:text-red transition-colors"
              >
                FR
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => switchLocale('en')}
                className="px-1 hover:text-red transition-colors"
              >
                EN
              </button>
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="btn-red-fill border border-red text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all"
            >
              {t('bookCall')}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <motion.span
              className="w-6 h-0.5 bg-white block"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white block"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white block"
              animate={
                mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-2xl font-light text-white hover:text-red transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {t(item)}
              </motion.button>
            ))}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => switchLocale('fr')}
                className="text-lg hover:text-red transition-colors"
              >
                FR
              </button>
              <button
                onClick={() => switchLocale('en')}
                className="text-lg hover:text-red transition-colors"
              >
                EN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
