import { useRef, useState } from 'react';
import gsap from 'gsap';
import { eventConfig } from '../config/eventConfig';
import { generateICS } from '../utils/calendar';

export default function FinalInvitation() {
  const cardRef = useRef(null);
  const ctaRef = useRef(null);
  const sealRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline();

    // Seal shrinks and fades
    tl.to(sealRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.in(2)',
    });

    // CTA fades
    tl.to(ctaRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.4,
      ease: 'power2.in',
    }, '-=0.3');

    // Card reveals with luxury feel
    tl.fromTo(cardRef.current,
      {
        opacity: 0,
        scale: 0.88,
        rotateX: 6,
        y: 30,
        filter: 'blur(8px)',
        visibility: 'hidden',
      },
      {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        y: 0,
        filter: 'blur(0px)',
        visibility: 'visible',
        duration: 1.4,
        ease: 'power3.out',
      },
      '-=0.1'
    );
  };

  const actionStyle = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 400,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#D6B57A',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.6em 0',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'opacity 0.3s',
    minHeight: '44px',
    minWidth: '44px',
  };

  const dividerStyle = {
    width: '25px',
    height: '1px',
    background: 'rgba(214, 181, 122, 0.35)',
    margin: '1.3em auto',
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        minHeight: '100dvh',
        background: '#161210',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8vh 1.5rem',
        perspective: '1000px',
        overflow: 'hidden',
      }}
    >
      {/* Warm radial backdrop */}
      <div style={{
        position: 'absolute',
        width: '80vw',
        height: '80vw',
        maxWidth: '450px',
        maxHeight: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(214, 181, 122, 0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Pre-open: Seal + CTA */}
      <div
        ref={ctaRef}
        style={{
          textAlign: 'center',
          display: isOpen ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Wax seal */}
        <div
          ref={sealRef}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(214, 181, 122, 0.25), rgba(166, 158, 148, 0.15))',
            border: '1px solid rgba(214, 181, 122, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          }}
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: '#D6B57A',
          }}>
            B&D
          </span>
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1rem, 3vw, 1.3rem)',
          color: '#8F857B',
          marginBottom: '2rem',
        }}>
          We saved a place for you.
        </p>

        <button
          onClick={handleOpen}
          aria-label="Open the invitation"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 400,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#D6B57A',
            background: 'transparent',
            border: '1px solid rgba(214, 181, 122, 0.25)',
            padding: '1em 2.5em',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            minHeight: '44px',
          }}
        >
          Open the Invitation
        </button>
      </div>

      {/* Luxury Invitation Card */}
      <div
        ref={cardRef}
        style={{
          visibility: 'hidden',
          opacity: 0,
          background: 'linear-gradient(170deg, #1E1A16 0%, #12100E 100%)',
          border: '1px solid rgba(214, 181, 122, 0.12)',
          maxWidth: '380px',
          width: '88vw',
          padding: 'clamp(2rem, 6vw, 3rem) clamp(1.5rem, 5vw, 2.5rem)',
          textAlign: 'center',
          transformStyle: 'preserve-3d',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(214, 181, 122, 0.03)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Top ornament */}
        <div style={{ width: '35px', height: '1px', background: 'linear-gradient(90deg, transparent, #D6B57A, transparent)', margin: '0 auto 1.8rem' }} />

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.8rem, 6vw, 2.2rem)',
          color: '#F2ECE2',
          lineHeight: 1.2,
        }}>
          {eventConfig.brideName}
        </h3>

        <span style={{
          display: 'block',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          color: '#D6B57A',
          margin: '0.4em 0',
          fontStyle: 'italic',
        }}>
          &amp;
        </span>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.8rem, 6vw, 2.2rem)',
          color: '#F2ECE2',
          lineHeight: 1.2,
        }}>
          {eventConfig.groomName}
        </h3>

        <div style={dividerStyle} />

        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#8F857B',
        }}>
          14 November 2026
        </p>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1rem',
          fontWeight: 300,
          color: '#F2ECE2',
          marginTop: '0.4em',
        }}>
          {eventConfig.displayTime}
        </p>

        <div style={dividerStyle} />

        {/* Ceremony */}
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8F857B', marginBottom: '0.4em' }}>
          Ceremony
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: '#F2ECE2' }}>
          {eventConfig.church.name}
        </p>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: '#8F857B', marginBottom: '1.2em' }}>
          {eventConfig.church.area}
        </p>

        {/* Reception */}
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8F857B', marginBottom: '0.4em' }}>
          Reception
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: '#F2ECE2' }}>
          {eventConfig.reception.name}
        </p>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: '#8F857B' }}>
          {eventConfig.reception.area}
        </p>

        <div style={dividerStyle} />

        {/* Actions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.2em' }}>
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
        <div style={{ width: '35px', height: '1px', background: 'linear-gradient(90deg, transparent, #D6B57A, transparent)', margin: '1.8rem auto 0' }} />
      </div>
    </section>
  );
}
