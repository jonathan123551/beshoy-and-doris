import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';
import { generateICS } from '../utils/calendar';

gsap.registerPlugin(ScrollTrigger);

export default function FinalInvitation() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const card = sectionRef.current.querySelector('.fi-card');
      const els = card.querySelectorAll('.fi-anim');

      // The card slides up and tilts slightly into place like a real printed card
      gsap.fromTo(card,
        { opacity: 0, y: 50, rotateX: 5, scale: 0.95 },
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(els,
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const actionStyle = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#C79A8B', // Rose Gold
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.6em 0',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'color 0.3s',
    minHeight: '44px',
    minWidth: '44px',
  };

  const dividerStyle = {
    width: '25px',
    height: '1px',
    background: 'rgba(214, 181, 122, 0.4)',
    margin: '1.3em auto',
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        minHeight: '100dvh',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8vh 1.5rem',
        perspective: '1000px',
        overflow: 'hidden',
      }}
    >
      {/* Light blush backdrop */}
      <div style={{
        position: 'absolute',
        width: '80vw',
        height: '80vw',
        maxWidth: '450px',
        maxHeight: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232, 200, 200, 0.4) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Luxury Invitation Card (Already open) */}
      <div
        className="fi-card"
        style={{
          background: 'linear-gradient(170deg, #FDFBfa 0%, #F7F1EA 100%)',
          border: '1px solid rgba(214, 181, 122, 0.3)',
          maxWidth: '380px',
          width: '88vw',
          padding: 'clamp(2rem, 6vw, 3rem) clamp(1.5rem, 5vw, 2.5rem)',
          textAlign: 'center',
          transformStyle: 'preserve-3d',
          boxShadow: '0 25px 60px rgba(79, 62, 57, 0.1), 0 0 40px rgba(232, 200, 200, 0.2)',
          position: 'relative',
          zIndex: 2,
          borderRadius: '4px',
        }}
      >
        {/* Paper texture overlay inside the card */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }} />

        {/* Top ornament */}
        <div className="fi-anim" style={{ width: '35px', height: '1px', background: 'linear-gradient(90deg, transparent, #D6B57A, transparent)', margin: '0 auto 1.8rem' }} />

        <h3 className="fi-anim" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1.8rem, 6vw, 2.2rem)',
          color: '#4F3E39', // Dark luxury text
          lineHeight: 1.2,
        }}>
          {eventConfig.brideName}
        </h3>

        <span className="fi-anim" style={{
          display: 'block',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          color: '#C79A8B', // Rose gold
          margin: '0.4em 0',
          fontStyle: 'italic',
        }}>
          &amp;
        </span>

        <h3 className="fi-anim" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1.8rem, 6vw, 2.2rem)',
          color: '#4F3E39',
          lineHeight: 1.2,
        }}>
          {eventConfig.groomName}
        </h3>

        <div className="fi-anim" style={dividerStyle} />

        <p className="fi-anim" style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#8F7D78',
        }}>
          14 November 2026
        </p>

        <p className="fi-anim" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1rem',
          fontWeight: 500,
          color: '#6A5148', // Warm brown
          marginTop: '0.4em',
        }}>
          {eventConfig.displayTime}
        </p>

        <div className="fi-anim" style={dividerStyle} />

        {/* Ceremony */}
        <div className="fi-anim">
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8F7D78', marginBottom: '0.4em' }}>
            Ceremony
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: '1.05rem', color: '#4F3E39' }}>
            {eventConfig.church.name}
          </p>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: '#6A5148', marginBottom: '1.2em', marginTop: '0.2em' }}>
            {eventConfig.church.area}
          </p>
        </div>

        {/* Reception */}
        <div className="fi-anim">
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8F7D78', marginBottom: '0.4em' }}>
            Reception
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: '1.05rem', color: '#4F3E39' }}>
            {eventConfig.reception.name}
          </p>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: '#6A5148', marginTop: '0.2em' }}>
            {eventConfig.reception.area}
          </p>
        </div>

        <div className="fi-anim" style={dividerStyle} />

        {/* Actions */}
        <div className="fi-anim" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.2em' }}>
          <a
            href={eventConfig.church.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={actionStyle}
          >
            Church ↗
          </a>
          <a
            href={eventConfig.reception.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={actionStyle}
          >
            Reception ↗
          </a>
          <button
            onClick={() => generateICS(eventConfig)}
            style={actionStyle}
          >
            Calendar +
          </button>
        </div>

        {/* Bottom ornament */}
        <div className="fi-anim" style={{ width: '35px', height: '1px', background: 'linear-gradient(90deg, transparent, #D6B57A, transparent)', margin: '1.8rem auto 0' }} />
      </div>
    </section>
  );
}
