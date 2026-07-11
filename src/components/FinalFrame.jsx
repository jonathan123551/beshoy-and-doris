import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

export default function FinalFrame() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const texts = sectionRef.current.querySelectorAll('.ff-text');
      const line = sectionRef.current.querySelector('.ff-line');

      gsap.fromTo(texts,
        { opacity: 0, y: 15, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.15,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (line) {
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '60vh',
        background: '#161210',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8vh 2rem calc(8vh + env(safe-area-inset-bottom, 0px))',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Warm glow */}
      <div style={{
        position: 'absolute',
        width: '40vw',
        height: '40vw',
        maxWidth: '250px',
        maxHeight: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(214, 181, 122, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <h2
        className="ff-text"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.6rem, 5vw, 2.8rem)',
          color: '#F2ECE2',
          lineHeight: 1.2,
          opacity: 0,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {eventConfig.groomName} & {eventConfig.brideName}
      </h2>

      <p
        className="ff-text"
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 400,
          letterSpacing: '0.2em',
          color: '#8F857B',
          marginTop: '0.8em',
          opacity: 0,
          position: 'relative',
          zIndex: 2,
        }}
      >
        14 — 11 — 2026
      </p>

      <div
        className="ff-line"
        style={{
          width: '1px',
          height: '50px',
          background: 'linear-gradient(180deg, #D6B57A, rgba(214, 181, 122, 0.1))',
          margin: '2rem auto',
          transformOrigin: 'top center',
          transform: 'scaleY(0)',
          position: 'relative',
          zIndex: 2,
        }}
      />

      <p
        className="ff-text"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '0.9rem',
          color: '#8F857B',
          opacity: 0,
          position: 'relative',
          zIndex: 2,
        }}
      >
        See you there.
      </p>
    </section>
  );
}
