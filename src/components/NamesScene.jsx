import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

export default function NamesScene() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const groom = sectionRef.current.querySelector('.names-groom');
      const bride = sectionRef.current.querySelector('.names-bride');
      const twoStories = sectionRef.current.querySelector('.names-two');
      const onePromise = sectionRef.current.querySelector('.names-one');
      const panelL = sectionRef.current.querySelector('.names-panel-l');
      const panelR = sectionRef.current.querySelector('.names-panel-r');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: sectionRef.current.querySelector('.names-inner'),
        },
      });

      // Names slide in
      tl.fromTo(groom, { x: '-100vw' }, { x: '0vw', ease: 'none' }, 0);
      tl.fromTo(bride, { x: '100vw' }, { x: '0vw', ease: 'none' }, 0);

      // Reveal "Two stories."
      tl.fromTo(twoStories, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.35);

      // Reveal "One promise."
      tl.fromTo(onePromise, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.5);

      // Curtain open
      tl.to(panelL, { x: '-100%', ease: 'power2.inOut' }, 0.7);
      tl.to(panelR, { x: '100%', ease: 'power2.inOut' }, 0.7);

      // Fade names and text
      tl.to([groom, bride, twoStories, onePromise], { opacity: 0 }, 0.75);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: 'clamp(3rem, 12vw, 8rem)',
    color: '#F4EFE6',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    lineHeight: 1,
    whiteSpace: 'nowrap',
  };

  const subtextStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
    color: '#9A9185',
    letterSpacing: '0.05em',
    opacity: 0,
  };

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
        className="names-inner"
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
        <div
          className="names-groom"
          style={{ ...nameStyle, textAlign: 'center' }}
        >
          {eventConfig.groomName}
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#C7A66A',
            margin: '0.3em 0',
            fontWeight: 300,
          }}
        >
          &amp;
        </div>

        <div
          className="names-bride"
          style={{ ...nameStyle, textAlign: 'center' }}
        >
          {eventConfig.brideName}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p className="names-two" style={subtextStyle}>
            Two stories.
          </p>
          <p
            className="names-one"
            style={{ ...subtextStyle, marginTop: '0.8em' }}
          >
            One promise.
          </p>
        </div>

        {/* Curtain panels */}
        <div
          className="names-panel-l"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            background: '#0B0A09',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
        <div
          className="names-panel-r"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            background: '#0B0A09',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}
