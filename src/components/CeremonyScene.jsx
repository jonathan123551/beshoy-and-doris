import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

export default function CeremonyScene() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const inner = sectionRef.current.querySelector('.ceremony-inner');
      const bg = sectionRef.current.querySelector('.ceremony-bg');
      const texts = sectionRef.current.querySelectorAll('.ceremony-text');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: inner,
        },
      });

      // Zoom out the architectural placeholder
      tl.fromTo(bg, { scale: 1.4 }, { scale: 1, ease: 'none' }, 0);

      // Stagger text reveals
      texts.forEach((el, i) => {
        tl.fromTo(
          el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.12 },
          0.2 + i * 0.1
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
        height: '300vh',
        background: '#0B0A09',
      }}
    >
      <div
        className="ceremony-inner"
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
        {/* Architectural background placeholder */}
        <div
          className="ceremony-bg"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(36, 31, 26, 0.8) 0%, #0B0A09 70%),
              linear-gradient(180deg, transparent 0%, transparent 48%, rgba(199, 166, 106, 0.03) 49%, rgba(199, 166, 106, 0.03) 51%, transparent 52%),
              linear-gradient(90deg, transparent 0%, transparent 49.5%, rgba(199, 166, 106, 0.04) 49.8%, rgba(199, 166, 106, 0.04) 50.2%, transparent 50.5%)
            `,
            zIndex: 0,
          }}
        >
          {/* Cross pattern */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '1px',
              height: '25%',
              background: 'rgba(199, 166, 106, 0.08)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '32%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '15%',
              height: '1px',
              background: 'rgba(199, 166, 106, 0.08)',
            }}
          />
        </div>

        {/* Film grain */}
        <div className="film-grain" />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '0 2rem',
          }}
        >
          <p
            className="ceremony-text"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#9A9185',
              marginBottom: '2rem',
              opacity: 0,
            }}
          >
            The Ceremony
          </p>

          <h2
            className="ceremony-text"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              color: '#F4EFE6',
              lineHeight: 1.2,
              marginBottom: '0.3em',
              opacity: 0,
            }}
          >
            {eventConfig.church.name}
          </h2>

          <p
            className="ceremony-text"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.875rem',
              color: '#9A9185',
              marginBottom: '3rem',
              opacity: 0,
            }}
          >
            {eventConfig.church.area}
          </p>

          <div
            className="ceremony-text"
            style={{
              marginBottom: '0.5rem',
              opacity: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3rem, 10vw, 5rem)',
                fontWeight: 300,
                color: '#F4EFE6',
                lineHeight: 1,
                display: 'block',
              }}
            >
              14
            </span>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#9A9185',
                display: 'block',
                marginTop: '0.5em',
              }}
            >
              November
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.2rem',
                fontWeight: 300,
                color: '#F4EFE6',
                display: 'block',
                marginTop: '0.3em',
              }}
            >
              2026
            </span>
          </div>

          <p
            className="ceremony-text"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.1rem',
              fontWeight: 300,
              color: '#F4EFE6',
              marginTop: '1.5rem',
              marginBottom: '3rem',
              opacity: 0,
            }}
          >
            {eventConfig.displayTime}
          </p>

          <a
            className="ceremony-text text-cta"
            href={eventConfig.church.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ opacity: 0 }}
          >
            Open Church Location →
          </a>
        </div>
      </div>
    </section>
  );
}
