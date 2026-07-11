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

        // Background zoom (very subtle)
        tl.fromTo(bg,
          { scale: isMobile ? 1.08 : 1.15 },
          { scale: 1, ease: 'none' },
          0
        );

        // Beats (faster pacing)
        const b = isMobile ? [0.05, 0.15, 0.3, 0.45, 0.6] : [0.1, 0.2, 0.35, 0.5, 0.6];

        // Beat 1: Title
        tl.fromTo(textEls[0], { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, b[0]);
        // Beat 2: English church
        tl.fromTo(textEls[1], { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, b[1]);
        // Beat 3: Arabic name
        tl.fromTo(textEls[2], { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, b[2]);
        // Beat 4: Date/time
        tl.fromTo(textEls[3], { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, b[3]);
        // Beat 5: Location CTA
        tl.fromTo(textEls[4], { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, b[4]);

        // Fade out
        tl.to(textEls, {
          opacity: 0,
          y: -10,
          stagger: 0.02,
        }, 0.85);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '140svh', // Highly compressed pacing
        background: 'transparent',
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
        {/* Warm luxury architectural hint */}
        <div
          className="cer-bg"
          style={{
            position: 'absolute',
            inset: '-10%',
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(243, 236, 227, 0.6) 0%, transparent 60%),
              radial-gradient(circle at 50% 70%, rgba(232, 200, 200, 0.3) 0%, transparent 70%)
            `,
            zIndex: 1,
          }}
        >
          {/* Subtle architectural lines */}
          <div style={{ position: 'absolute', left: '50%', top: '10%', bottom: '10%', width: '1px', background: 'rgba(106, 81, 72, 0.04)' }} />
          <div style={{ position: 'absolute', top: '35%', left: '20%', right: '20%', height: '1px', background: 'rgba(106, 81, 72, 0.04)' }} />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 1.5rem', width: '100%', maxWidth: '500px' }}>
          
          {/* Title */}
          <div className="cer-text" style={{ marginBottom: '1.8rem' }}>
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#8F7D78',
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
              color: '#4F3E39',
              lineHeight: 1.2,
            }}>
              {eventConfig.church.name}
            </h2>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.7rem',
              color: '#8F7D78',
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
                color: '#6A5148',
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
                color: '#8F7D78',
                marginTop: '0.15em',
              }}
            >
              شيراتون
            </p>
          </div>

          {/* Date/Time */}
          <div className="cer-text" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#4F3E39', fontWeight: 300 }}>14</span>
              <span style={{ width: '1px', height: '18px', background: 'rgba(214, 181, 122, 0.4)' }} />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: '#8F7D78', textTransform: 'uppercase' }}>November 2026</span>
              <span style={{ width: '1px', height: '18px', background: 'rgba(214, 181, 122, 0.4)' }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: '#4F3E39', fontWeight: 300 }}>{eventConfig.displayTime}</span>
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
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C79A8B', // Rose gold
                }}>
                  Open Church Location
                </span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C79A8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
              <span dir="rtl" lang="ar" style={{
                fontFamily: "'Amiri', serif",
                fontSize: '0.75rem',
                color: '#8F7D78',
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
