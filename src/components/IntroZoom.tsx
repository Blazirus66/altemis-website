'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoASvg from './LogoASvg';

gsap.registerPlugin(ScrollTrigger);

export default function IntroZoom() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const breatheRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinnedRef.current;
    const logo = logoRef.current;
    const breatheEl = breatheRef.current;
    const glow = glowRef.current;
    const heroContent = heroContentRef.current;
    const scrollHint = scrollHintRef.current;
    if (!container || !pinned || !logo || !breatheEl || !glow || !heroContent || !scrollHint) return;

    // Initial states — logo starts scaled down from its large render size
    // SVG is rendered at 250vmin but displayed at ~35vmin (scale 0.14)
    // This gives the GPU a high-res texture to work with during zoom
    const baseScale = 0.14;
    gsap.set(heroContent, { opacity: 0, y: 60 });
    gsap.set(logo, { scale: baseScale, opacity: 1 });

    // Breathing on the SVG element (child), NOT the scroll-zoom container
    const breathe = gsap.to(breatheEl, {
      scale: 1.05,
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Scroll-driven timeline on the parent container (logoRef)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinned,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    // 0% – 5%: Scroll hint fades
    tl.to(scrollHint, {
      opacity: 0,
      duration: 0.05,
    });

    // 5% – 50%: Zoom INTO the A (from 0.14 to ~8.4 = equivalent of 60x from original)
    tl.to(logo, {
      scale: baseScale * 60,
      duration: 0.45,
      ease: 'power2.in',
    });

    // 35% – 50%: Logo fades out as we pass through
    tl.to(
      logo,
      {
        opacity: 0,
        duration: 0.15,
      },
      0.35
    );

    // 30% – 50%: Red glow flash while crossing
    tl.to(
      glow,
      {
        opacity: 0.7,
        duration: 0.1,
      },
      0.3
    );
    tl.to(
      glow,
      {
        opacity: 0,
        duration: 0.15,
      },
      0.4
    );

    // 50% – 80%: Hero content fades in
    tl.to(
      heroContent,
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      },
      0.5
    );

    // Smoothly stop breathing when scroll starts, resume when back to top
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '10% top',
      onLeave: () => {
        // Smoothly tween breathing element back to scale 1, then pause
        gsap.to(breatheEl, {
          scale: 1,
          duration: 0.3,
          ease: 'power1.out',
          onComplete: () => { breathe.pause(); },
        });
      },
      onEnterBack: () => {
        breathe.resume();
      },
    });

    return () => {
      breathe.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) trigger.kill();
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div
        ref={pinnedRef}
        className="h-screen w-full overflow-hidden bg-black"
      >
        {/* The A monogram — parent zooms on scroll, child breathes */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ willChange: 'transform, opacity' }}
        >
          <LogoASvg
            ref={breatheRef}
            className="w-[250vmin] h-auto"
          />
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

        {/* Hero content — revealed after zoom */}
        <div
          ref={heroContentRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              {t('title1')}
              <br />
              <span className="text-red">{t('title2')}</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>

            <div className="mt-10">
              <button
                onClick={scrollToContact}
                className="btn-red-fill bg-red hover:bg-red/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
              >
                {t('cta')}
              </button>
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
              style={{
                animation: 'scrollBounce 2s infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
