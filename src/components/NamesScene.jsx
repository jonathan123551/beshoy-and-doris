import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

export default function NamesScene() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: '.ns-inner',
        },
      });

      tl.fromTo(
        '.ns-card',
        { autoAlpha: 0.28, scale: 0.94, yPercent: 8 },
        { autoAlpha: 1, scale: 1, yPercent: 0, ease: 'none' },
        0
      );
      tl.fromTo(
        '.ns-overline, .ns-rule, .ns-subline',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, stagger: 0.06, ease: 'none' },
        0.08
      );
      tl.fromTo(
        '.ns-name-a',
        { xPercent: -24, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, ease: 'none' },
        0.12
      );
      tl.fromTo(
        '.ns-name-b',
        { xPercent: 24, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, ease: 'none' },
        0.18
      );
      tl.fromTo(
        '.ns-amp',
        { scale: 0.7, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, ease: 'none' },
        0.24
      );
      tl.to(
        '.ns-card',
        {
          yPercent: -6,
          scale: 0.97,
          ease: 'none',
        },
        0.62
      );
      tl.to(
        '.ns-card > *',
        {
          autoAlpha: 0,
          yPercent: -10,
          stagger: 0.03,
          ease: 'none',
        },
        0.68
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '150svh',
      }}
    >
      <div
        className="ns-inner"
        style={{
          position: 'relative',
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          padding: '1.5rem',
          overflow: 'hidden',
        }}
      >
        <div
          className="ns-card lux-paper"
          style={{
            width: 'min(100%, 780px)',
            minHeight: 'min(68vh, 620px)',
            borderRadius: '28px',
            padding: 'clamp(1.5rem, 5vw, 3rem)',
            display: 'grid',
            alignContent: 'center',
            justifyItems: 'center',
            gap: '1rem',
            textAlign: 'center',
          }}
        >
          <p
            className="ns-overline"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.66rem',
              fontWeight: 500,
              letterSpacing: '0.44em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}
          >
            Together with their families
          </p>

          <div className="ns-rule lux-rule" />

          <div
            style={{
              display: 'grid',
              gap: '0.35rem',
              width: '100%',
            }}
          >
            <h2
              className="ns-name-a"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(3.2rem, 15vw, 7rem)',
                lineHeight: 0.9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-dark)',
              }}
            >
              {eventConfig.groomName}
            </h2>
            <div
              className="ns-amp"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 7vw, 2.8rem)',
                color: 'var(--color-rose-gold)',
              }}
            >
              &
            </div>
            <h2
              className="ns-name-b"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(3.2rem, 15vw, 7rem)',
                lineHeight: 0.9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-dark)',
              }}
            >
              {eventConfig.brideName}
            </h2>
          </div>

          <p
            className="ns-subline"
            style={{
              width: 'min(80vw, 420px)',
              marginTop: '0.35rem',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 3.9vw, 1.25rem)',
              lineHeight: 1.5,
              color: 'var(--color-cocoa)',
              letterSpacing: '0.03em',
            }}
          >
            Two stories, one vow, and a day we would be honored to share with you.
          </p>
        </div>
      </div>
    </section>
  );
}
