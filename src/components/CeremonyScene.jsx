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
      const bg = sectionRef.current.querySelector('.cer-bg');
      const textEls = sectionRef.current.querySelectorAll('.cer-text');
      const inner = sectionRef.current.querySelector('.cer-inner');

      const mm = gsap.matchMedia();

      mm.add({
        isMobile: '(max-width: 768px)',
        isDesktop: '(min-width: 769px)',
      }, (context) => {
        const { isMobile } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: inner,
          },
        });

        // Background zoom
        tl.fromTo(bg,
          { scale: isMobile ? 1.15 : 1.3 },
          { scale: 1, ease: 'none' },
          0
        );

        // Beat 1: Title (immediate)
        tl.fromTo(textEls[0],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          isMobile ? 0.05 : 0.1
        );

        // Beat 2: English church name + area
        tl.fromTo(textEls[1],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          isMobile ? 0.12 : 0.2
        );

        // Beat 3: Arabic name
        tl.fromTo(textEls[2],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          isMobile ? 0.22 : 0.35
        );

        // Beat 4: Date/time
        tl.fromTo(textEls[3],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          isMobile ? 0.35 : 0.5
        );

        // Beat 5: Location CTA
        tl.fromTo(textEls[4],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          isMobile ? 0.48 : 0.6
        );

        // Fade out
        tl.to(textEls, {
          opacity: 0,
          y: -10,
          stagger: 0.02,
        }, 0.82);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '170svh',
        background: '#0A0908',
      }}
    >
      <div
        className="cer-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Architectural BG */}
        <div
          className="cer-bg"
          style={{
            position: 'absolute',
            inset: '-15%',
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(42, 36, 30, 0.6) 0%, transparent 60%),
              radial-gradient(circle at 50% 70%, rgba(30, 26, 22, 0.4) 0%, #0A0908 70%)
            `,
            zIndex: 1,
          }}
        >
          {/* Subtle cross lines */}
          <div style={{ position: 'absolute', left: '50%', top: '10%', bottom: '10%', width: '1px', background: 'rgba(242, 236, 226, 0.02)' }} />
          <div style={{ position: 'absolute', top: '35%', left: '20%', right: '20%', height: '1px', background: 'rgba(242, 236, 226, 0.02)' }} />
        </div>

        {/* Film grain */}
        <div className="film-grain" style={{ position: 'absolute', zIndex: 2 }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 1.5rem', width: '100%', maxWidth: '500px' }}>
          {/* Title */}
          <div className="cer-text" style={{ marginBottom: '1.8rem' }}>
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#8A8279',
            }}>
              The Ceremony
            </span>
          </div>

          {/* English name + area */}
          <div className="cer-text" style={{ marginBottom: '1.2rem' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1.6rem, 5.5vw, 2.8rem)',
              color: '#F2ECE2',
              lineHeight: 1.2,
            }}>
              {eventConfig.church.name}
            </h2>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.7rem',
              color: '#8A8279',
              marginTop: '0.4em',
              letterSpacing: '0.1em',
            }}>
              {eventConfig.church.area}
            </p>
          </div>

          {/* Arabic name */}
          <div className="cer-text" style={{ marginBottom: '2rem' }}>
            <h3
              dir="rtl"
              lang="ar"
              style={{
                fontFamily: "'Amiri', serif",
                fontWeight: 400,
                fontSize: 'clamp(1.3rem, 4.5vw, 1.8rem)',
                color: 'rgba(242, 236, 226, 0.8)',
                lineHeight: 1.5,
              }}
            >
              كنيسة رئيس الملائكة ميخائيل
            </h3>
            <p
              dir="rtl"
              lang="ar"
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: '0.85rem',
                color: '#8A8279',
                marginTop: '0.15em',
              }}
            >
              شيراتون
            </p>
          </div>

          {/* Date/Time */}
          <div className="cer-text" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#F2ECE2', fontWeight: 300 }}>14</span>
              <span style={{ width: '1px', height: '18px', background: 'rgba(201, 169, 110, 0.4)' }} />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: '#8A8279', textTransform: 'uppercase' }}>November 2026</span>
              <span style={{ width: '1px', height: '18px', background: 'rgba(201, 169, 110, 0.4)' }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: '#F2ECE2', fontWeight: 300 }}>{eventConfig.displayTime}</span>
            </div>
          </div>

          {/* Location CTA */}
          <div className="cer-text">
            <a
              href={eventConfig.church.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.6rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                }}>
                  Open Church Location
                </span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
              <span dir="rtl" lang="ar" style={{
                fontFamily: "'Amiri', serif",
                fontSize: '0.75rem',
                color: '#8A8279',
                marginTop: '0.25em',
              }}>
                الموقع على الخريطة
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
