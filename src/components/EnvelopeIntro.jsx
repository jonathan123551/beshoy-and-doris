import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { eventConfig } from '../config/eventConfig';

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
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Glow pulse
      gsap.to('.env-glow', {
        opacity: 0.15,
        scale: 1.1,
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

      // Letter slides out
      tl.to('.env-letter', {
        y: -200,
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4');

      // Hint fades
      tl.to('.env-hint', {
        opacity: 0,
        duration: 0.3,
      }, '-=0.8');

      // Brief hold to appreciate
      tl.to({}, { duration: 0.6 });

      // Everything zooms in and fades
      tl.to('.env-wrap', {
        scale: 1.3,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 1,
        ease: 'power2.inOut',
      });

      // Container slides up
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
      }, '-=0.5');

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
          radial-gradient(ellipse at 50% 30%, rgba(42, 35, 30, 0.6) 0%, transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(214, 181, 122, 0.03) 0%, transparent 40%),
          #161210
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: opened ? 'default' : 'pointer',
      }}
      onClick={handleOpen}
    >
      {/* Ambient glow behind envelope */}
      <div
        className="env-glow"
        style={{
          position: 'absolute',
          width: '80vw',
          height: '80vw',
          maxWidth: '400px',
          maxHeight: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 181, 122, 0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
          opacity: 0.08,
        }}
      />

      <div className="env-wrap" style={{ opacity: 0, position: 'relative' }}>
        {/* Envelope */}
        <div
          className="env-envelope"
          style={{
            width: 'min(85vw, 380px)',
            height: '220px',
            position: 'relative',
            perspective: '1000px',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
          }}
        >
          {/* Envelope body */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(145deg, #E9DED0 0%, #D6CBBD 50%, #C9BDA8 100%)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            {/* Paper texture overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.08,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'multiply',
            }} />
            {/* Fold lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `
                linear-gradient(32deg, transparent 48%, rgba(255,255,255,0.3) 49.5%, transparent 51%),
                linear-gradient(-32deg, transparent 48%, rgba(255,255,255,0.25) 49.5%, transparent 51%)
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
              width: '82%',
              height: '180px',
              background: 'linear-gradient(180deg, #F8F3EA 0%, #F2ECE2 100%)',
              borderRadius: '10px',
              border: '1px solid rgba(214, 181, 122, 0.2)',
              zIndex: 2,
              padding: '1.5rem 1rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '0.75rem',
              color: '#8F857B',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.6em',
            }}>
              You're Invited
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 8vw, 2.8rem)',
              fontWeight: 300,
              color: '#5C4B3E',
              lineHeight: 0.95,
            }}>
              {eventConfig.groomName}
            </h1>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1rem',
              color: '#D6B57A',
              margin: '0.2em 0',
              fontStyle: 'italic',
            }}>
              &amp;
            </span>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 8vw, 2.8rem)',
              fontWeight: 300,
              color: '#5C4B3E',
              lineHeight: 0.95,
            }}>
              {eventConfig.brideName}
            </h1>
          </div>

          {/* Flap */}
          <div
            className="env-flap"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '120px',
              background: 'linear-gradient(145deg, #D6CBBD 0%, #C9BDA8 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformOrigin: 'top center',
              zIndex: 4,
              borderRadius: '12px 12px 0 0',
            }}
          >
            {/* Paper texture on flap */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.06,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'multiply',
            }} />
          </div>

          {/* Wax seal */}
          <div
            className="env-seal"
            style={{
              position: 'absolute',
              left: '50%',
              top: '105px',
              transform: 'translateX(-50%)',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #A9885B 0%, #8B6F47 50%, #7A603C 100%)',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15)',
            }}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '0.8rem',
              color: '#F8F3EA',
              letterSpacing: '0.05em',
              fontWeight: 500,
            }}>
              B&D
            </span>
          </div>
        </div>

        {/* Tap hint */}
        <p
          className="env-hint"
          style={{
            marginTop: '2.5rem',
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#8F857B',
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
