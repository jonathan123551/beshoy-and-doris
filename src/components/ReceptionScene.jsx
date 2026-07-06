import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

export default function ReceptionScene() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const textEls = sectionRef.current.querySelectorAll('.reception-text');
      const orbs = sectionRef.current.querySelectorAll('.light-orb');

      // Floating ambient lights
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: i % 2 === 0 ? '30%' : '-30%',
          y: i % 2 === 0 ? '20%' : '-20%',
          duration: 12 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Text stagger in on scroll
      gsap.fromTo(
        textEls,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        minHeight: '100dvh',
        background: '#0B0A09', // Warmer feel visually created by the orbs below
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10vh 1.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Warm Ambient Lights */}
      <div
        className="light-orb"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(199, 166, 106, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="light-orb"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(154, 145, 133, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%' }}>
        <div className="reception-text" style={{ marginBottom: '1.5rem' }}>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#9A9185',
            }}
          >
            The Reception
          </span>
        </div>

        <div className="reception-text" style={{ marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              color: '#F4EFE6',
              lineHeight: 1.1,
            }}
          >
            {eventConfig.reception.name}
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.75rem',
              color: '#9A9185',
              marginTop: '0.5em',
            }}
          >
            {eventConfig.reception.area}
          </p>
        </div>

        <div className="reception-text" style={{ marginBottom: '3rem' }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '1.2rem',
              color: '#C7A66A',
            }}
          >
            Dinner. Music. Memories.
          </p>
        </div>

        <div className="reception-text">
          <a
            href={eventConfig.reception.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              minHeight: '44px',
              padding: '0.8rem 2rem',
              border: '1px solid rgba(199, 166, 106, 0.3)',
              background: 'rgba(11, 10, 9, 0.5)',
              backdropFilter: 'blur(5px)',
              borderRadius: '2px',
              transition: 'border-color 0.3s, background 0.3s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.65rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C7A66A',
                }}
              >
                Open Reception Location
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C7A66A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
            <span
              dir="rtl"
              lang="ar"
              style={{
                fontFamily: "'Amiri', sans-serif",
                fontSize: '0.8rem',
                color: '#9A9185',
                marginTop: '0.3em',
              }}
            >
              الموقع على الخريطة
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
