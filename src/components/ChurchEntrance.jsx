import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ChurchEntrance() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const door = sectionRef.current.querySelector('.ent-door');
      const lightOverlay = sectionRef.current.querySelector('.ent-light');
      const inner = sectionRef.current.querySelector('.ent-inner');
      const glowInner = sectionRef.current.querySelector('.ent-glow');

      const mm = gsap.matchMedia();

      mm.add({
        isMobile: '(max-width: 768px)',
        isDesktop: '(min-width: 769px)',
      }, (context) => {
        const { isMobile } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: inner,
          },
        });

        // Door scales up dramatically
        tl.to(door, {
          width: '250vw',
          height: '250vh',
          ease: 'power2.in',
        }, 0);

        // Warm light intensifies inside
        tl.to(glowInner, {
          opacity: 0.9,
          scale: 2,
          ease: 'power1.in',
        }, 0);

        // Fade out everything into a soft blush/light transition
        tl.to(lightOverlay, {
          opacity: 1,
          ease: 'power2.in',
        }, 0.6);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100svh', // Highly compressed
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <div
        className="ent-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {/* Door opening - warm light pouring out */}
        <div
          className="ent-door"
          style={{
            position: 'relative',
            width: '18vw',
            height: '35vh',
            background: 'linear-gradient(180deg, rgba(232, 200, 200, 0.2) 0%, rgba(214, 181, 122, 0.1) 100%)',
            overflow: 'hidden',
            borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
            border: '1px solid rgba(199, 154, 139, 0.1)',
            boxShadow: 'inset 0 10px 30px rgba(214, 181, 122, 0.1)',
          }}
        >
          <div
            className="ent-glow"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 60%, rgba(214, 181, 122, 0.4) 0%, transparent 70%)',
              opacity: 0.3,
            }}
          />
        </div>

        {/* Transition overlay - pure light paper color */}
        <div
          className="ent-light"
          style={{
            position: 'absolute',
            inset: 0,
            background: '#F7F1EA',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}
