import { useRef, useState } from 'react';
import gsap from 'gsap';
import { eventConfig } from '../config/eventConfig';
import { generateICS } from '../utils/calendar';

export default function FinalInvitation() {
  const cardRef = useRef(null);
  const ctaRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Hide CTA
    gsap.to(ctaRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.4,
      ease: 'power2.in',
    });

    // Reveal card
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        scale: 0.85,
        rotateX: 8,
        y: 40,
        visibility: 'hidden',
      },
      {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        y: 0,
        visibility: 'visible',
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  };

  const actionStyle = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 400,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#C7A66A',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5em 0',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'opacity 0.3s',
  };

  const dividerStyle = {
    width: '30px',
    height: '1px',
    background: 'rgba(199, 166, 106, 0.4)',
    margin: '1.5em auto',
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0B0A09',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10vh 1.5rem',
        perspective: '1000px',
      }}
    >
      {/* Pre-open text + CTA */}
      <div
        ref={ctaRef}
        style={{
          textAlign: 'center',
          display: isOpen ? 'none' : 'block',
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            color: '#9A9185',
            marginBottom: '2.5rem',
          }}
        >
          We saved a place for you.
        </p>

        <button
          onClick={handleOpen}
          aria-label="Open the invitation"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C7A66A',
            background: 'transparent',
            border: '1px solid rgba(199, 166, 106, 0.3)',
            padding: '1em 2.5em',
            cursor: 'pointer',
            transition: 'border-color 0.4s, box-shadow 0.4s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(199, 166, 106, 0.6)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(199, 166, 106, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(199, 166, 106, 0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Open the Invitation
        </button>
      </div>

      {/* Invitation Card */}
      <div
        ref={cardRef}
        style={{
          visibility: 'hidden',
          opacity: 0,
          background: '#241F1A',
          border: '1px solid rgba(199, 166, 106, 0.15)',
          maxWidth: '400px',
          width: '85vw',
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2rem)',
          textAlign: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top ornament */}
        <div style={{ width: '40px', height: '1px', background: '#C7A66A', margin: '0 auto 2rem' }} />

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '2rem',
            color: '#F4EFE6',
            lineHeight: 1.2,
          }}
        >
          {eventConfig.brideName}
        </h3>

        <span
          style={{
            display: 'block',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.2rem',
            color: '#C7A66A',
            margin: '0.5em 0',
          }}
        >
          &amp;
        </span>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '2rem',
            color: '#F4EFE6',
            lineHeight: 1.2,
          }}
        >
          {eventConfig.groomName}
        </h3>

        <div style={dividerStyle} />

        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#9A9185',
          }}
        >
          14 November 2026
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem',
            fontWeight: 300,
            color: '#F4EFE6',
            marginTop: '0.5em',
          }}
        >
          {eventConfig.displayTime}
        </p>

        <div style={dividerStyle} />

        {/* Ceremony */}
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#9A9185',
            marginBottom: '0.5em',
          }}
        >
          Ceremony
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: '#F4EFE6',
          }}
        >
          {eventConfig.church.name}
        </p>
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.75rem',
            color: '#9A9185',
            marginBottom: '1.5em',
          }}
        >
          {eventConfig.church.area}
        </p>

        {/* Reception */}
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#9A9185',
            marginBottom: '0.5em',
          }}
        >
          Reception
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: '#F4EFE6',
          }}
        >
          {eventConfig.reception.name}
        </p>
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.75rem',
            color: '#9A9185',
          }}
        >
          {eventConfig.reception.area}
        </p>

        <div style={dividerStyle} />

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5em',
          }}
        >
          <a
            href={eventConfig.church.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={actionStyle}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Church Location
          </a>
          <a
            href={eventConfig.reception.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={actionStyle}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Reception Location
          </a>
          <button
            onClick={() => generateICS(eventConfig)}
            style={actionStyle}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Add to Calendar
          </button>
        </div>

        {/* Bottom ornament */}
        <div style={{ width: '40px', height: '1px', background: '#C7A66A', margin: '2rem auto 0' }} />
      </div>
    </section>
  );
}
