import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { eventConfig } from '../config/eventConfig';
import { playMusic } from '../utils/audioManager';

const paperNoise =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 220 220\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.028\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.9\'/%3E%3C/svg%3E")';

export default function EnvelopeIntro({ onOpen }) {
  const containerRef = useRef(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.classList.add('lock-scroll');
    return () => document.body.classList.remove('lock-scroll');
  }, []);

  useEffect(() => {
    if (opened) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.env-stage',
        { autoAlpha: 0, y: 40, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' }
      );
      tl.fromTo(
        '.env-copy > *',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1, ease: 'power2.out' },
        '-=1'
      );
      tl.fromTo(
        '.env-cue',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.45'
      );

      gsap.to('.env-envelope', {
        yPercent: -2.8,
        rotateZ: -0.6,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.env-glow', {
        scale: 1.12,
        opacity: 0.85,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.env-dust', {
        yPercent: -8,
        xPercent: 4,
        duration: 7,
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
    playMusic(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          document.body.classList.remove('lock-scroll');
          onOpen?.();
        },
      });

      tl.to('.env-cue', {
        autoAlpha: 0,
        y: 8,
        duration: 0.3,
      });
      tl.to(
        '.env-seal',
        {
          scale: 0.84,
          duration: 0.18,
        },
        0
      );
      tl.to(
        '.env-seal',
        {
          scale: 0,
          rotate: 140,
          autoAlpha: 0,
          duration: 0.55,
          ease: 'back.in(2.8)',
        },
        0.18
      );
      tl.to(
        '.env-flap',
        {
          rotateX: -176,
          y: -6,
          duration: 1,
          ease: 'power3.inOut',
        },
        0.15
      );
      tl.to(
        '.env-letter',
        {
          yPercent: -34,
          duration: 1,
          ease: 'power3.out',
        },
        0.35
      );
      tl.to(
        '.env-envelope-shell',
        {
          y: 170,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        0.42
      );
      tl.to(
        '.env-letter',
        {
          scale: 1.08,
          duration: 0.95,
          ease: 'power2.out',
        },
        0.72
      );
      tl.to(
        '.env-copy > *',
        {
          autoAlpha: 0,
          y: -10,
          stagger: 0.03,
          duration: 0.45,
        },
        0.25
      );
      tl.to(
        '.env-aura',
        {
          autoAlpha: 0,
          duration: 0.6,
        },
        0.65
      );
      tl.to(
        '.env-letter',
        {
          scale: 10.5,
          yPercent: 10,
          autoAlpha: 0,
          duration: 1.35,
          ease: 'power3.in',
        },
        1.1
      );
      tl.to(
        containerRef.current,
        {
          autoAlpha: 0,
          duration: 0.42,
        },
        '-=0.4'
      );
      tl.set(containerRef.current, { display: 'none' });
    }, containerRef);

    return () => ctx.revert();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleOpen}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        cursor: opened ? 'default' : 'pointer',
        background:
          'radial-gradient(circle at 50% 16%, rgba(255, 248, 238, 0.94) 0%, rgba(255, 248, 238, 0.45) 34%, transparent 66%), linear-gradient(180deg, #fbf6f0 0%, #f3e9dd 58%, #f7f1ea 100%)',
      }}
    >
      <div
        className="env-aura"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          className="env-glow lux-glow"
          style={{
            width: '68vw',
            height: '68vw',
            maxWidth: 460,
            maxHeight: 460,
            left: '50%',
            top: '16%',
            transform: 'translateX(-50%)',
            background:
              'radial-gradient(circle, rgba(216, 183, 171, 0.24) 0%, rgba(204, 176, 138, 0.16) 34%, transparent 70%)',
          }}
        />
        <div
          className="env-dust"
          style={{
            position: 'absolute',
            inset: '-10%',
            opacity: 0.34,
            backgroundImage: paperNoise,
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      <div
        className="env-stage"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100%',
          display: 'grid',
          placeItems: 'center',
          padding: 'max(1.5rem, env(safe-area-inset-top)) 1.25rem max(2rem, env(safe-area-inset-bottom))',
        }}
      >
        <div
          style={{
            width: 'min(100%, 470px)',
            display: 'grid',
            gap: '1.7rem',
            justifyItems: 'center',
          }}
        >
          <div
            className="env-copy"
            style={{
              textAlign: 'center',
              display: 'grid',
              gap: '0.85rem',
              paddingTop: '1.1rem',
            }}
          >
            <p className="lux-label" style={{ color: 'var(--color-cocoa)' }}>
              Wedding Invitation
            </p>
            <div className="lux-rule" />
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.05rem, 4vw, 1.22rem)',
                color: 'var(--color-cocoa)',
                letterSpacing: '0.06em',
              }}
            >
              A quiet beginning for a beautiful promise
            </p>
          </div>

          <div
            className="env-envelope"
            style={{
              position: 'relative',
              width: 'min(88vw, 390px)',
              height: 'min(60vw, 268px)',
              perspective: '1600px',
              transformStyle: 'preserve-3d',
              filter: 'drop-shadow(0 42px 55px rgba(70, 51, 45, 0.16))',
            }}
          >
            <div
              className="env-envelope-shell"
              style={{
                position: 'absolute',
                inset: 0,
              }}
            >
              <div
                className="env-envelope-body lux-paper"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '20px',
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(241,228,213,0.96) 55%, rgba(222,196,175,0.96) 100%)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(31deg, transparent 47%, rgba(255,255,255,0.62) 49.6%, transparent 52%), linear-gradient(-31deg, transparent 47%, rgba(255,255,255,0.62) 49.6%, transparent 52%)',
                    opacity: 0.72,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 'auto 11% 14% 11%',
                    height: 1,
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(151, 123, 110, 0.26) 10%, rgba(151, 123, 110, 0.1) 90%, transparent 100%)',
                  }}
                />
              </div>

              <div
                className="env-letter lux-paper"
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 18,
                  transform: 'translateX(-50%)',
                  width: '84%',
                  height: '88%',
                  borderRadius: '14px',
                  zIndex: 2,
                  display: 'grid',
                  placeItems: 'center',
                  padding: '1.6rem 1.3rem 1.4rem',
                  transformOrigin: 'bottom center',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    gridTemplateRows: 'auto 1fr auto',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gap: '0.55rem',
                      justifyItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.58rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.38em',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      You are invited
                    </span>
                    <div className="lux-rule" style={{ width: 'min(24vw, 92px)' }} />
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gap: '0.2rem',
                    }}
                  >
                    <h1
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.1rem, 10vw, 3.4rem)',
                        fontWeight: 600,
                        lineHeight: 0.88,
                        letterSpacing: '0.06em',
                        color: 'var(--color-text-dark)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {eventConfig.groomName}
                    </h1>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.5rem',
                        fontStyle: 'italic',
                        color: 'var(--color-rose-gold)',
                      }}
                    >
                      &
                    </span>
                    <h1
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.1rem, 10vw, 3.4rem)',
                        fontWeight: 600,
                        lineHeight: 0.88,
                        letterSpacing: '0.06em',
                        color: 'var(--color-text-dark)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {eventConfig.brideName}
                    </h1>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'end',
                      gap: '1rem',
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <span>{eventConfig.displayDay}</span>
                    <span>{eventConfig.displayDate}</span>
                  </div>
                </div>
              </div>

              <div
                className="env-flap lux-paper"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '59%',
                  borderRadius: '20px 20px 0 0',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformOrigin: 'top center',
                  zIndex: 3,
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(243,229,216,0.98) 42%, rgba(214,187,164,0.98) 100%)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.42) 0%, transparent 64%), radial-gradient(circle at 50% 100%, rgba(183,135,114,0.16) 0%, transparent 62%)',
                  }}
                />
              </div>

              <div
                className="env-seal"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '52.5%',
                  transform: 'translate(-50%, -50%)',
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  zIndex: 4,
                  display: 'grid',
                  placeItems: 'center',
                  background:
                    'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.34), transparent 24%), linear-gradient(135deg, #cfa79c 0%, #b2806f 52%, #8f665b 100%)',
                  boxShadow:
                    '0 14px 24px rgba(96, 67, 57, 0.24), inset 0 2px 4px rgba(255,255,255,0.26), inset 0 -8px 16px rgba(114, 73, 58, 0.24)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    letterSpacing: '0.16em',
                    color: '#fff8f1',
                    textShadow: '0 1px 2px rgba(52, 31, 26, 0.26)',
                  }}
                >
                  B D
                </span>
              </div>
            </div>
          </div>

          <div
            className="env-cue"
            style={{
              display: 'grid',
              gap: '0.75rem',
              justifyItems: 'center',
              textAlign: 'center',
              paddingBottom: '0.2rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.64rem',
                fontWeight: 500,
                letterSpacing: '0.42em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Tap to open with sound
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'var(--color-cocoa)',
              }}
            >
              Let the invitation unfold
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
