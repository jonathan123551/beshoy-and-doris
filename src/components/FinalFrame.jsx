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
      const texts = sectionRef.current.querySelectorAll('.final-text');
      const line = sectionRef.current.querySelector('.final-line');

      gsap.fromTo(
        texts,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Line fades out on scroll
      if (line) {
        gsap.fromTo(
          line,
          { opacity: 1, scaleY: 1 },
          {
            opacity: 0,
            scaleY: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'center center',
              end: 'bottom top',
              scrub: true,
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
        minHeight: '80vh',
        background: '#0B0A09',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10vh 2rem 20vh',
        textAlign: 'center',
      }}
    >
      <h2
        className="final-text"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          color: '#F4EFE6',
          lineHeight: 1.2,
          opacity: 0,
        }}
      >
        {eventConfig.groomName} & {eventConfig.brideName}
      </h2>

      <p
        className="final-text"
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 400,
          letterSpacing: '0.2em',
          color: '#9A9185',
          marginTop: '1em',
          opacity: 0,
        }}
      >
        14 — 11 — 2026
      </p>

      <div
        className="final-line"
        style={{
          width: '1px',
          height: '60px',
          background: '#C7A66A',
          margin: '2.5rem auto',
          transformOrigin: 'top center',
        }}
      />

      <p
        className="final-text"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '0.9rem',
          color: '#9A9185',
          opacity: 0,
        }}
      >
        See you there.
      </p>
    </section>
  );
}
