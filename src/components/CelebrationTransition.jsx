import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CelebrationTransition() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const line1 = sectionRef.current.querySelector('.celeb-line-1');
      const line2 = sectionRef.current.querySelector('.celeb-line-2');
      const inner = sectionRef.current.querySelector('.celeb-inner');

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
            scrub: true,
            pin: inner,
          },
        });

        // "And then…" appears quickly
        tl.fromTo(line1, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, isMobile ? 0.05 : 0.1);
        
        // "we celebrate." appears
        tl.fromTo(line2, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, isMobile ? 0.2 : 0.3);

        // "And then…" fades out
        tl.to(line1, { opacity: 0, y: -10 }, isMobile ? 0.35 : 0.4);

        // "we celebrate." dramatically scales up
        tl.to(
          line2,
          {
            scale: isMobile ? 30 : 20, // scales up massively to fill screen
            color: '#F4EFE6',
            ease: 'power2.in',
          },
          isMobile ? 0.4 : 0.5
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: 'var(--celeb-height, 250vh)',
        background: '#0B0A09',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          section {
            --celeb-height: 140svh;
          }
        }
      `}</style>
      <div
        className="celeb-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <p
          className="celeb-line-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '1.2rem',
            color: '#9A9185',
            position: 'absolute',
            opacity: 0,
            transform: 'translateY(-2rem)',
          }}
        >
          And then…
        </p>

        <p
          className="celeb-line-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            color: '#9A9185', // Transitions to #F4EFE6 via GSAP
            margin: 0,
            whiteSpace: 'nowrap',
            transformOrigin: 'center center',
            opacity: 0,
          }}
        >
          we celebrate.
        </p>
      </div>
    </section>
  );
}
