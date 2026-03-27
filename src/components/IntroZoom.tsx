'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import LogoASvg from './LogoASvg';

interface IntroZoomProps {
  active: boolean;
  onComplete: () => void;
}

export default function IntroZoom({ active, onComplete }: IntroZoomProps) {
  const t = useTranslations('hero');
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const breatheRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(false);
  const breatheTweenRef = useRef<gsap.core.Tween | null>(null);

  const playAnimation = useCallback(() => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;

    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const breatheEl = breatheRef.current;
    const glow = glowRef.current;
    const heroContent = heroContentRef.current;
    const scrollHint = scrollHintRef.current;
    if (!overlay || !logo || !breatheEl || !glow || !heroContent || !scrollHint) return;

    // Stop breathing smoothly
    if (breatheTweenRef.current) {
      gsap.to(breatheEl, {
        scale: 1,
        duration: 0.3,
        ease: 'power1.out',
        onComplete: () => { breatheTweenRef.current?.kill(); },
      });
    }

    const baseScale = 0.14;

    const bg = bgRef.current;
    if (!bg) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade only the black background — hero content stays visible
        // then signal removal (HeroSection underneath is identical)
        gsap.to(bg, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            document.body.style.overflow = '';
            onComplete();
          },
        });
      },
    });

    // Scroll hint fades out
    tl.to(scrollHint, { opacity: 0, duration: 0.3 }, 0);

    // Logo zooms in
    tl.to(logo, { scale: baseScale * 60, duration: 2, ease: 'power2.in' }, 0.1);

    // Logo fades out while zooming
    tl.to(logo, { opacity: 0, duration: 0.6 }, 1.4);

    // Red glow flash
    tl.to(glow, { opacity: 0.7, duration: 0.4 }, 1.2);
    tl.to(glow, { opacity: 0, duration: 0.6 }, 1.6);

    // Hero content fades in
    tl.to(heroContent, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 2.0);

    // Brief hold before revealing navbar
    tl.to({}, { duration: 0.3 });
  }, [onComplete]);

  useEffect(() => {
    if (!active) return;

    const logo = logoRef.current;
    const breatheEl = breatheRef.current;
    const heroContent = heroContentRef.current;
    if (!logo || !breatheEl || !heroContent) return;

    // Breathing animation on the SVG (initial states handled via inline styles)
    breatheTweenRef.current = gsap.to(breatheEl, {
      scale: 1.05,
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Lock body scroll while intro is visible
    document.body.style.overflow = 'hidden';

    // Listen for first scroll gesture to trigger animation
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      playAnimation();
      removeListeners();
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      playAnimation();
      removeListeners();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'Space', 'PageDown'].includes(e.code)) {
        e.preventDefault();
        playAnimation();
        removeListeners();
      }
    };

    const removeListeners = () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      breatheTweenRef.current?.kill();
      removeListeners();
      document.body.style.overflow = '';
    };
  }, [active, playAnimation]);

  // When not active, render nothing but still occupy the component slot in the tree
  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60]"
    >
      {/* Black background — faded out separately at end of animation */}
      <div ref={bgRef} className="absolute inset-0 bg-black" />

      {/* The A monogram — zooms on trigger, breathes while idle */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ willChange: 'transform, opacity', transform: 'scale(0.14)' }}
      >
        <LogoASvg ref={breatheRef} className="w-[250vmin] h-auto" />
      </div>

      {/* Red glow flash when "passing through" */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(204,0,0,0.5) 0%, rgba(204,0,0,0.15) 40%, transparent 70%)',
        }}
      />

      {/* Hero content — revealed during animation (hidden by default, GSAP animates in) */}
      <div
        ref={heroContentRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0, transform: 'translateY(60px)' }}
      >
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

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-xs text-gray tracking-widest uppercase">
          {t('scroll')}
        </span>
        <div className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div
            className="w-1 h-2 bg-red rounded-full"
            style={{ animation: 'scrollBounce 2s infinite' }}
          />
        </div>
      </div>
    </div>
  );
}
