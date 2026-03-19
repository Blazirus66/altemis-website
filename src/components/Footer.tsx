'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-black border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Image src="/Logo-removebg-white.svg" alt="ALTEMIS" width={180} height={47} className="h-9 w-auto" />

        <div className="flex items-center gap-6 text-xs text-gray">
          <span>
            &copy; {new Date().getFullYear()} Altemis. {t('rights')}
          </span>
          <a href="#" className="hover:text-white transition-colors">
            {t('privacy')}
          </a>
          <a href="#" className="hover:text-white transition-colors">
            {t('legal')}
          </a>
        </div>
      </div>
    </footer>
  );
}
