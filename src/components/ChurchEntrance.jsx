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
      const door = sectionRef.current.querySelector('.entrance-door');
      const doorGlow = sectionRef.current.querySelector('.entrance-glow');
      const inner = sectionRef.current.querySelector('.entrance-inner');
      const darkOverlay = sectionRef.current.querySelector('.entrance-dark-overlay');

      const mm = gsap.matchMedia();

      mm.add({
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)"
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

        // Door scale up dramatically
        // Faster pacing on mobile
        tl.fromTo(
          door,
          { width: isMobile ? '20vw' : '15vw', height: isMobile ? '35vh' : '30vh' },
          { width: '200vw', height: '200vh', ease: 'power2.in' },
          0
        );

        // Glow increases
        tl.to(doorGlow, { opacity: 1, ease: 'power1.in' }, 0);

        // Fade to complete darkness right at the end
        tl.to(darkOverlay, { opacity: 1, ease: 'power2.in' }, 0.8);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: 'var(--entrance-height, 250vh)',
        background: '#0B0A09',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          section {
            --entrance-height: 120svh;
          }
        }
      `}</style>
      <div
        className="entrance-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0A09',
        }}
      >
        <div
          className="entrance-door"
          style={{
            position: 'relative',
            background: '#F4EFE6',
            boxShadow: '0 0 30px rgba(199, 166, 106, 0.1)',
            overflow: 'hidden',
            borderRadius: '2px',
          }}
        >
          {/* Inner warm glow */}
          <div
            className="entrance-glow"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(199, 166, 106, 0.4) 0%, transparent 80%)',
              opacity: 0.2,
            }}
          />
        </div>

        <div
          className="entrance-dark-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: '#0B0A09',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}
