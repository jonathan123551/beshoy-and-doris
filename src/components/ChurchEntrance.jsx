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
      const darkOverlay = sectionRef.current.querySelector('.ent-dark');
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
            scrub: 1,
            pin: inner,
          },
        });

        // Door scales up
        tl.to(door, {
          width: '250vw',
          height: '250vh',
          ease: 'power2.in',
        }, 0);

        // Glow intensifies
        tl.to(glowInner, {
          opacity: 0.8,
          scale: 2,
          ease: 'power1.in',
        }, 0);

        // Darkness takes over
        tl.to(darkOverlay, {
          opacity: 1,
          ease: 'power2.in',
        }, 0.7);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '110svh',
        background: '#0A0908',
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
          background: '#0A0908',
        }}
      >
        {/* Door opening */}
        <div
          className="ent-door"
          style={{
            position: 'relative',
            width: '18vw',
            height: '35vh',
            background: 'linear-gradient(180deg, rgba(242, 236, 226, 0.08) 0%, rgba(201, 169, 110, 0.04) 100%)',
            overflow: 'hidden',
            borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
          }}
        >
          <div
            className="ent-glow"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 60%, rgba(201, 169, 110, 0.15) 0%, transparent 70%)',
              opacity: 0.3,
            }}
          />
        </div>

        {/* Dark overlay */}
        <div
          className="ent-dark"
          style={{
            position: 'absolute',
            inset: 0,
            background: '#0A0908',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}
