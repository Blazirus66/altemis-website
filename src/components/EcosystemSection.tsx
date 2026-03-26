'use client';

import { useRef, useCallback, useEffect, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { useFadeInUp } from '@/hooks/useScrollAnimation';

const PARTNERS: { name: string; file: string; h: string; url: string }[] = [
  { name: 'BPI France', file: 'BPIFrance', h: 'h-10', url: 'https://www.bpifrance.com/' },
  { name: 'Outlier Ventures', file: 'Outlier Ventures', h: 'h-7', url: 'https://outlierventures.io/' },
  { name: 'Pixelette', file: 'Pixelette', h: 'h-10', url: 'https://pixelettetech.com/' },
  { name: 'PRIM3', file: 'PRIM3', h: 'h-9', url: 'https://prim3.vc/' },
  { name: 'Syndika', file: 'syndika', h: 'h-7', url: 'https://syndika.co/' },
  { name: '50 Partners', file: '50 partners', h: 'h-10', url: 'https://www.50partners.fr/' },
  { name: 'Kryptosphere', file: 'Kryptoshere', h: 'h-10', url: 'https://www.kryptosphere.org/en' },
  { name: 'Jobited', file: 'Jobited', h: 'h-6', url: 'https://jobited.com/' },
];

const ECOSYSTEMS: { name: string; h: string; url: string }[] = [
  { name: 'Solana', h: 'h-7', url: 'https://solana.com/' },
  { name: 'Ripple', h: 'h-9', url: 'https://ripple.com/' },
  { name: 'Stellar', h: 'h-10', url: 'https://stellar.org/' },
  { name: 'Hedera', h: 'h-12', url: 'https://hedera.com/' },
  { name: 'Tezos', h: 'h-12', url: 'https://tezos.com/' },
  { name: 'Alephium', h: 'h-9', url: 'https://alephium.org/' },
  { name: 'Arbitrium', h: 'h-12', url: 'https://arbitrum.io/' },
  { name: 'ICP', h: 'h-8', url: 'https://internetcomputer.org/' },
  { name: 'iExec', h: 'h-10', url: 'https://www.iex.ec/' },
  { name: 'Starknet', h: 'h-11', url: 'https://www.starknet.io/' },
];

function EcosystemTrack() {
  return (
    <div className="marquee-track">
      {ECOSYSTEMS.map(({ name, h, url }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-12 cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logo/${name}.svg`}
            alt={name}
            className={`${h} w-auto invert opacity-60 grayscale transition-all duration-300 ease-in-out hover:opacity-100 hover:grayscale-0 hover:scale-108`}
          />
        </a>
      ))}
    </div>
  );
}

function PartnerTrack() {
  return (
    <div className="marquee-track">
      {PARTNERS.map(({ name, file, h, url }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-12 cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/Partenaire/${encodeURIComponent(file)}.svg`}
            alt={name}
            className={`${h} w-auto invert opacity-60 grayscale transition-all duration-300 ease-in-out hover:opacity-100 hover:grayscale-0 hover:scale-108`}
          />
        </a>
      ))}
    </div>
  );
}

const NORMAL_SPEED = 0.5;
const SLOW_SPEED = 0.15;
const LERP_FACTOR = 0.03;

function Marquee({ children, className, reverse }: { children: ReactNode; className?: string; reverse?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const speed = useRef(NORMAL_SPEED);
  const targetSpeed = useRef(NORMAL_SPEED);
  const position = useRef(0);
  const rafId = useRef(0);
  const direction = reverse ? 1 : -1;

  const animate = useCallback(() => {
    speed.current += (targetSpeed.current - speed.current) * LERP_FACTOR;
    position.current += speed.current * direction;

    const el = wrapperRef.current;
    if (el) {
      const half = el.scrollWidth / 2;
      if (direction === -1 && position.current <= -half) {
        position.current += half;
      } else if (direction === 1 && position.current >= 0) {
        position.current -= half;
      }
      el.style.transform = `translateX(${position.current}px)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, [direction]);

  useEffect(() => {
    if (reverse && wrapperRef.current) {
      position.current = -(wrapperRef.current.scrollWidth / 2);
    }
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate, reverse]);

  return (
    <div
      className={`relative overflow-x-clip overflow-y-visible py-4 ${className ?? ''}`}
      onMouseEnter={() => { targetSpeed.current = SLOW_SPEED; }}
      onMouseLeave={() => { targetSpeed.current = NORMAL_SPEED; }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-black-light to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-black-light to-transparent" />
      <div ref={wrapperRef} className="marquee-track-wrapper">
        {children}
      </div>
    </div>
  );
}

export default function EcosystemSection() {
  const t = useTranslations('ecosystem');
  const titleRef = useFadeInUp<HTMLDivElement>();

  return (
    <section id="ecosystem" className="relative py-32 px-6 bg-black-light overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-red text-sm font-semibold tracking-widest uppercase">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">{t('title')}</h2>
          <p className="mt-4 text-gray max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </div>

      {/* Ecosystem marquee */}
      <Marquee>
        <EcosystemTrack />
        <EcosystemTrack />
      </Marquee>

      {/* Partners marquee */}
      <Marquee className="mt-10" reverse>
        <PartnerTrack />
        <PartnerTrack />
        <PartnerTrack />
        <PartnerTrack />
      </Marquee>
    </section>
  );
}
