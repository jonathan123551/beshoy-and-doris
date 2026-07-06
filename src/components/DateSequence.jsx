import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DateSequence() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const num14 = sectionRef.current.querySelector('.date-14');
      const num11 = sectionRef.current.querySelector('.date-11');
      const num2026 = sectionRef.current.querySelector('.date-2026');
      const assembled = sectionRef.current.querySelector('.date-assembled');
      const details = sectionRef.current.querySelector('.date-details');
      const inner = sectionRef.current.querySelector('.date-inner');

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

        // Fast pacing for mobile beats
        const b1 = 0;
        const b2 = isMobile ? 0.2 : 0.25;
        const b3 = isMobile ? 0.4 : 0.45;
        const b4 = isMobile ? 0.6 : 0.65;
        const b5 = isMobile ? 0.8 : 0.85;

        // Phase 1: 14 enters
        tl.fromTo(num14, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, ease: 'power2.out' }, b1);
        
        // Phase 2: 11 enters, 14 fades up
        tl.to(num14, { y: '-50%', opacity: 0, scale: 0.9 }, b2);
        tl.fromTo(num11, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, ease: 'power2.out' }, b2);

        // Phase 3: 2026 enters, 11 fades up
        tl.to(num11, { y: '-50%', opacity: 0, scale: 0.9 }, b3);
        tl.fromTo(num2026, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, ease: 'power2.out' }, b3);

        // Phase 4: 2026 fades up, assembled date enters
        tl.to(num2026, { y: '-50%', opacity: 0, scale: 0.9 }, b4);
        tl.fromTo(assembled, { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power2.out' }, b4);

        // Phase 5: Reveal details
        tl.fromTo(details, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, b5);
        
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hugeStyle = {
    position: 'absolute',
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: 'clamp(8rem, 30vw, 20rem)',
    color: '#F4EFE6',
    lineHeight: 1,
    opacity: 0,
    pointerEvents: 'none',
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: 'var(--date-height, 400vh)',
        background: '#0B0A09',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          section {
            --date-height: 200svh;
          }
        }
      `}</style>
      <div
        className="date-inner"
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
        {/* Giant Numbers */}
        <div className="date-14" style={hugeStyle}>14</div>
        <div className="date-11" style={hugeStyle}>11</div>
        <div className="date-2026" style={{ ...hugeStyle, fontSize: 'clamp(5rem, 22vw, 15rem)' }}>2026</div>

        {/* Assembled Date */}
        <div
          className="date-assembled"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2em',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            letterSpacing: '0.1em',
            color: '#F4EFE6',
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <span>14</span>
          <span style={{ color: '#C7A66A' }}>.</span>
          <span>11</span>
          <span style={{ color: '#C7A66A' }}>.</span>
          <span>2026</span>
        </div>

        {/* Details */}
        <div
          className="date-details"
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#9A9185',
              marginBottom: '0.5em',
            }}
          >
            Saturday
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.5rem',
              color: '#F4EFE6',
            }}
          >
            5:00 PM
          </p>
        </div>
      </div>
    </section>
  );
}
