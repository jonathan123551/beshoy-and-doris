import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

function PhotoImage({ photo, className, style }) {
  const [error, setError] = useState(false);
  return (
    <div className={className} style={{ overflow: 'hidden', ...style }}>
      {error ? (
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1E1A16 0%, #0A0908 100%)' }} />
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          onError={() => setError(true)}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: photo.objectPositionMobile || '50% 35%',
            display: 'block',
          }}
        />
      )}
    </div>
  );
}

export default function PhotoStory() {
  const { couplePhotos } = eventConfig;
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!couplePhotos || couplePhotos.length === 0) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const inner = sectionRef.current.querySelector('.ps-inner');
      const photos = sectionRef.current.querySelectorAll('.ps-photo');
      const bgWords = sectionRef.current.querySelectorAll('.ps-bg');
      const caption = sectionRef.current.querySelector('.ps-caption');

      const mm = gsap.matchMedia();

      mm.add({
        isMobile: '(max-width: 768px)',
        isDesktop: '(min-width: 769px)',
      }, (context) => {
        const { isMobile } = context.conditions;

        if (couplePhotos.length >= 2) {
          // Dual photo cinematic layout
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
              pin: inner,
            },
          });

          // Photo 1: slides in from left with parallax
          tl.fromTo(photos[0],
            { x: isMobile ? '-20%' : '-40%', opacity: 0, scale: 1.05, filter: 'blur(4px)' },
            { x: '0%', opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power2.out' },
            0
          );

          // Photo 2: slides in from right, slightly delayed
          tl.fromTo(photos[1],
            { x: isMobile ? '20%' : '40%', opacity: 0, scale: 1.05, filter: 'blur(4px)' },
            { x: '0%', opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power2.out' },
            0.08
          );

          // Background words drift
          bgWords.forEach((w, i) => {
            tl.fromTo(w,
              { x: `${i % 2 === 0 ? 8 : -8}%` },
              { x: `${i % 2 === 0 ? -8 : 8}%`, ease: 'none' },
              0
            );
          });

          // Subtle depth movement
          tl.to(photos[0], { y: isMobile ? '-2%' : '-5%' }, 0.4);
          tl.to(photos[1], { y: isMobile ? '2%' : '4%' }, 0.4);

          // Caption
          if (caption) {
            tl.fromTo(caption,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0 },
              0.5
            );
          }
        } else if (couplePhotos.length === 1) {
          // Single photo hero
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
              pin: inner,
            },
          });

          tl.fromTo(photos[0],
            { scale: 1.1, filter: 'blur(6px)', opacity: 0 },
            { scale: 1, filter: 'blur(0px)', opacity: 1, ease: 'power2.out' },
            0
          );

          bgWords.forEach((w, i) => {
            tl.fromTo(w,
              { x: `${i % 2 === 0 ? 5 : -5}%` },
              { x: `${i % 2 === 0 ? -5 : 5}%`, ease: 'none' },
              0
            );
          });

          if (caption) {
            tl.fromTo(caption, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, 0.4);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [couplePhotos]);

  if (!couplePhotos || couplePhotos.length === 0) return null;

  const isDual = couplePhotos.length >= 2;

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: isDual ? '160svh' : '140svh',
        background: '#0A0908',
      }}
    >
      <div
        className="ps-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0A0908',
        }}
      >
        {/* Background typography */}
        {[eventConfig.groomName, eventConfig.brideName].map((name, i) => (
          <span
            key={name}
            className="ps-bg"
            style={{
              position: 'absolute',
              top: i === 0 ? '8%' : undefined,
              bottom: i === 1 ? '8%' : undefined,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(4rem, 18vw, 13rem)',
              color: 'rgba(242, 236, 226, 0.025)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        ))}

        {isDual ? (
          /* Dual photo layout — overlapping editorial */
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <PhotoImage
              photo={couplePhotos[0]}
              className="ps-photo"
              style={{
                position: 'absolute',
                width: 'min(75vw, 320px)',
                height: 'min(55vh, 450px)',
                left: 'clamp(3%, 5vw, 10%)',
                top: '12%',
                zIndex: 3,
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                borderRadius: '2px',
              }}
            />
            <PhotoImage
              photo={couplePhotos[1]}
              className="ps-photo"
              style={{
                position: 'absolute',
                width: 'min(65vw, 280px)',
                height: 'min(50vh, 420px)',
                right: 'clamp(3%, 5vw, 10%)',
                bottom: '12%',
                zIndex: 2,
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                borderRadius: '2px',
              }}
            />
          </div>
        ) : (
          /* Single photo hero */
          <PhotoImage
            photo={couplePhotos[0]}
            className="ps-photo"
            style={{
              width: 'min(85vw, 400px)',
              height: 'min(70vh, 600px)',
              zIndex: 2,
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              borderRadius: '2px',
            }}
          />
        )}

        {/* Caption */}
        <p className="ps-caption" style={{
          position: 'absolute',
          bottom: '6%',
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '0.9rem',
          color: '#8A8279',
          zIndex: 5,
          opacity: 0,
        }}>
          Together.
        </p>
      </div>
    </section>
  );
}
