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
      const bg = sectionRef.current.querySelector('.ceremony-bg');
      const textEls = sectionRef.current.querySelectorAll('.ceremony-text');
      
      const mm = gsap.matchMedia();

      mm.add({
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)"
      }, (context) => {
        const { isMobile } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: sectionRef.current.querySelector('.ceremony-inner'),
          },
        });

        // Beat 1: Zoom out bg
        tl.fromTo(bg, { scale: isMobile ? 1.2 : 1.4 }, { scale: 1, ease: 'none' }, 0);

        // Beat 2: Title & English Name
        tl.fromTo(textEls[0], { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, isMobile ? 0.1 : 0.2);
        tl.fromTo(textEls[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, isMobile ? 0.15 : 0.25);
        
        // Beat 3: Arabic Name & Area & Date
        tl.fromTo(textEls[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, isMobile ? 0.25 : 0.4);
        tl.fromTo(textEls[3], { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, isMobile ? 0.35 : 0.5);
        
        // Beat 4: Location CTA
        tl.fromTo(textEls[4], { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, isMobile ? 0.5 : 0.65);
        
        // Fade out at end
        tl.to(textEls, { opacity: 0, y: -10, stagger: 0.05 }, isMobile ? 0.85 : 0.85);

      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: 'var(--ceremony-height, 300vh)',
        background: '#0B0A09',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          section {
            --ceremony-height: 180svh;
          }
        }
      `}</style>
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
        {/* Placeholder BG */}
        <div
          className="ceremony-bg"
          style={{
            position: 'absolute',
            inset: '-10%',
            background: 'radial-gradient(circle at center, rgba(36,31,26,0.8) 0%, #0B0A09 70%)',
            zIndex: 1,
          }}
        >
          {/* Cross pattern lines */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(244,239,230,0.03)' }} />
          <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: '1px', background: 'rgba(244,239,230,0.03)' }} />
        </div>

        {/* Noise overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center',
            padding: '0 1.5rem',
            width: '100%',
          }}
        >
          <div className="ceremony-text" style={{ marginBottom: '1.5rem' }}>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#9A9185',
              }}
            >
              The Ceremony
            </span>
          </div>

          <div className="ceremony-text" style={{ marginBottom: '1rem' }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.8rem, 6vw, 3rem)',
                color: '#F4EFE6',
                lineHeight: 1.2,
              }}
            >
              {eventConfig.church.name}
            </h2>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.75rem',
                color: '#9A9185',
                marginTop: '0.3em',
              }}
            >
              {eventConfig.church.area}
            </p>
          </div>

          <div className="ceremony-text" style={{ marginBottom: '2.5rem' }}>
            <h2
              dir="rtl"
              lang="ar"
              style={{
                fontFamily: "'Amiri', 'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: 'clamp(1.4rem, 5vw, 2rem)',
                color: '#F4EFE6',
                lineHeight: 1.4,
              }}
            >
              كنيسة رئيس الملائكة ميخائيل
            </h2>
            <p
              dir="rtl"
              lang="ar"
              style={{
                fontFamily: "'Amiri', sans-serif",
                fontSize: '0.9rem',
                color: '#9A9185',
                marginTop: '0.1em',
              }}
            >
              شيراتون
            </p>
          </div>

          <div className="ceremony-text" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#F4EFE6' }}>14</span>
              <span style={{ width: '1px', height: '20px', background: '#C7A66A' }} />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em', color: '#9A9185' }}>NOV 2026</span>
              <span style={{ width: '1px', height: '20px', background: '#C7A66A' }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: '#F4EFE6' }}>{eventConfig.displayTime}</span>
            </div>
          </div>

          <div className="ceremony-text">
            <a
              href={eventConfig.church.mapUrl}
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
                  Open Church Location
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
      </div>
    </section>
  );
}
