import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { eventConfig } from '../config/eventConfig';
import { playMusic } from '../utils/audioManager';

export default function EnvelopeIntro({ onOpen }) {
  const containerRef = useRef(null);
  const [opened, setOpened] = useState(false);

  // Float animation for envelope
  useEffect(() => {
    if (opened) return;
    const ctx = gsap.context(() => {
      // Envelope entrance
      const tl = gsap.timeline();
      tl.fromTo('.env-wrap',
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power3.out' }
      );
      tl.fromTo('.env-hint',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power1.inOut' },
        '-=0.3'
      );

      // Gentle float
      gsap.to('.env-envelope', {
        y: -6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Glow pulse
      gsap.to('.env-glow', {
        opacity: 0.8,
        scale: 1.05,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [opened]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    
    // Call synchronously to satisfy iOS Safari restrictions
    playMusic(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove('lock-scroll');
          if (onOpen) onOpen();
        },
      });

      // Seal breaks
      tl.to('.env-seal', {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.5,
        ease: 'back.in(3)',
      });

      // Flap opens
      tl.to('.env-flap', {
        rotateX: -180,
        duration: 0.9,
        ease: 'power2.inOut',
      }, '-=0.1');

      // Letter slides out slightly, envelope drops
      tl.to('.env-envelope-body', {
        y: 150,
        duration: 1,
        ease: 'power2.inOut',
      }, '-=0.3');
      tl.to('.env-flap', {
        y: 150,
        duration: 1,
        ease: 'power2.inOut',
      }, '-=1');

      tl.to('.env-letter', {
        y: -100,
        scale: 1.1,
        duration: 1,
        ease: 'power2.out',
      }, '-=1');

      // Hint fades
      tl.to('.env-hint', {
        opacity: 0,
        duration: 0.3,
      }, '-=1.2');

      // Brief hold to appreciate the letter
      tl.to({}, { duration: 0.4 });

      // Camera pushes INTO the letter until it fills the screen
      // The letter is #FCF8F5, matching the global background
      tl.to('.env-letter', {
        scale: 15,
        y: 100, // Move down so we zoom into the blank paper part
        opacity: 0, // Crossfade to the actual scene behind it
        duration: 1.2,
        ease: 'power3.in',
      });

      // The entire wrapper fades out seamlessly
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power1.inOut',
      }, '-=0.4');

      // Hide the container to remove from DOM flow
      tl.set(containerRef.current, { display: 'none' });

    }, containerRef);
  };

  // Lock scroll on mount
  useEffect(() => {
    document.body.classList.add('lock-scroll');
    return () => document.body.classList.remove('lock-scroll');
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: `
          radial-gradient(circle at top, #F7F1EA 0%, transparent 60%),
          #FCF8F5
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: opened ? 'default' : 'pointer',
      }}
      onClick={handleOpen}
    >
      {/* Warm Glow behind envelope */}
      <div
        className="env-glow"
        style={{
          position: 'absolute',
          width: '80vw',
          height: '80vw',
          maxWidth: '400px',
          maxHeight: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 200, 200, 0.4) 0%, transparent 65%)',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      <div className="env-wrap" style={{ opacity: 0, position: 'relative', zIndex: 2 }}>
        {/* Envelope */}
        <div
          className="env-envelope"
          style={{
            width: 'min(85vw, 380px)',
            height: '240px',
            position: 'relative',
            perspective: '1200px',
            filter: 'drop-shadow(0 25px 45px rgba(79, 62, 57, 0.15))',
          }}
        >
          {/* Envelope body (back pocket) */}
          <div
            className="env-envelope-body"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #F3ECE3 0%, #F7F1EA 50%, #E8C8C8 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(214, 181, 122, 0.3)',
              overflow: 'hidden',
              zIndex: 3,
            }}
          >
            {/* Paper texture overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'multiply',
            }} />
            {/* Fold lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `
                linear-gradient(32deg, transparent 48.5%, rgba(255,255,255,0.6) 49.5%, transparent 51%),
                linear-gradient(-32deg, transparent 48.5%, rgba(255,255,255,0.6) 49.5%, transparent 51%)
              `,
            }} />
          </div>

          {/* Letter inside */}
          <div
            className="env-letter"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '15px',
              transform: 'translateX(-50%)',
              width: '84%',
              height: '210px',
              background: '#FCF8F5', /* Matches global background for seamless transition */
              borderRadius: '10px',
              border: '1px solid rgba(199, 154, 139, 0.2)',
              zIndex: 2,
              padding: '2rem 1rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(79, 62, 57, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transformOrigin: 'bottom center',
            }}
          >
            {/* Paper texture on letter */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'multiply',
              borderRadius: '10px',
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '0.85rem',
                color: '#C79A8B',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.8em',
              }}>
                You're Invited
              </p>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 9vw, 3.2rem)',
                fontWeight: 300,
                color: '#4F3E39',
                lineHeight: 0.95,
              }}>
                {eventConfig.groomName}
              </h1>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.2rem',
                color: '#D6B57A',
                margin: '0.2em 0',
                fontStyle: 'italic',
                display: 'block',
              }}>
                &amp;
              </span>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 9vw, 3.2rem)',
                fontWeight: 300,
                color: '#4F3E39',
                lineHeight: 0.95,
              }}>
                {eventConfig.brideName}
              </h1>
            </div>
          </div>

          {/* Flap */}
          <div
            className="env-flap"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '135px',
              background: 'linear-gradient(135deg, #F3ECE3 0%, #E8C8C8 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformOrigin: 'top center',
              zIndex: 4,
              borderRadius: '12px 12px 0 0',
              borderTop: '1px solid #FFF',
            }}
          >
            {/* Paper texture on flap */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'multiply',
            }} />
          </div>

          {/* Wax seal */}
          <div
            className="env-seal"
            style={{
              position: 'absolute',
              left: '50%',
              top: '115px',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C79A8B 0%, #A67B6D 50%, #8A6155 100%)',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(106, 81, 72, 0.3), inset 0 2px 4px rgba(255,255,255,0.2)',
            }}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: '#F7F1EA',
              letterSpacing: '0.05em',
              fontWeight: 500,
              textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}>
              B&D
            </span>
          </div>
        </div>

        {/* Tap hint */}
        <p
          className="env-hint"
          style={{
            marginTop: '3.5rem',
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#8F7D78',
            textAlign: 'center',
            opacity: 0,
          }}
        >
          Tap to Open
        </p>
      </div>
    </div>
  );
}
