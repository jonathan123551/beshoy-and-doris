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
      const inner = sectionRef.current.querySelector('.date-inner');
      const num14 = sectionRef.current.querySelector('.date-14');
      const num11 = sectionRef.current.querySelector('.date-11');
      const num2026 = sectionRef.current.querySelector('.date-2026');
      const assembled = sectionRef.current.querySelector('.date-assembled');
      const dayTime = sectionRef.current.querySelector('.date-daytime');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: inner,
        },
      });

      // Phase 1: "14" rises in
      tl.fromTo(num14, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.15 }, 0);
      // Phase 2: "14" exits up, "11" enters
      tl.to(num14, { y: '-100%', opacity: 0, duration: 0.12 }, 0.2);
      tl.fromTo(num11, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.15 }, 0.25);
      // Phase 3: "11" exits, "2026" enters
      tl.to(num11, { y: '-100%', opacity: 0, duration: 0.12 }, 0.4);
      tl.fromTo(num2026, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.15 }, 0.45);
      // Phase 4: "2026" exits, assembled date appears
      tl.to(num2026, { y: '-50%', opacity: 0, duration: 0.1 }, 0.62);
      tl.fromTo(assembled, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.15 }, 0.7);
      // Phase 5: Day and time reveal
      tl.fromTo(dayTime, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.12 }, 0.85);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bigNumStyle = {
    position: 'absolute',
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: 'clamp(8rem, 30vw, 18rem)',
    color: '#F4EFE6',
    lineHeight: 1,
    opacity: 0,
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '400vh',
        background: '#0B0A09',
      }}
    >
      <div
        className="date-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0B0A09',
        }}
      >
        <span className="date-14" style={bigNumStyle}>14</span>
        <span className="date-11" style={bigNumStyle}>11</span>
        <span className="date-2026" style={{ ...bigNumStyle, fontSize: 'clamp(5rem, 22vw, 14rem)' }}>2026</span>

        {/* Assembled date */}
        <div
          className="date-assembled"
          style={{
            position: 'absolute',
            textAlign: 'center',
            opacity: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              color: '#F4EFE6',
              letterSpacing: '0.1em',
            }}
          >
            14
            <span style={{ color: '#C7A66A', margin: '0 0.15em' }}>.</span>
            11
            <span style={{ color: '#C7A66A', margin: '0 0.15em' }}>.</span>
            2026
          </span>
        </div>

        {/* Day and time */}
        <div
          className="date-daytime"
          style={{
            position: 'absolute',
            bottom: '25vh',
            textAlign: 'center',
            opacity: 0,
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#9A9185',
              marginBottom: '0.8em',
            }}
          >
            Saturday
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.5rem',
              fontWeight: 300,
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
