import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

/* ─── Single Hero Mode ─── */
function SinglePhotoStory({ photo }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const inner = containerRef.current.querySelector('.photo-pin');
      const bgText1 = containerRef.current.querySelector('.photo-bg-1');
      const bgText2 = containerRef.current.querySelector('.photo-bg-2');
      const fgText = containerRef.current.querySelector('.photo-fg');
      const imgWrap = containerRef.current.querySelector('.photo-wrap');
      const img = containerRef.current.querySelector('.photo-img');

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: '(max-width: 768px)',
          isDesktop: '(min-width: 769px)',
        },
        (context) => {
          const { isMobile } = context.conditions;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
              pin: inner,
            },
          });

          // Background text movement
          tl.fromTo(bgText1, { x: isMobile ? '30%' : '50%' }, { x: isMobile ? '-30%' : '-50%', ease: 'none' }, 0);
          tl.fromTo(bgText2, { x: isMobile ? '-30%' : '-50%' }, { x: isMobile ? '30%' : '50%', ease: 'none' }, 0);

          // Image crop widens
          tl.fromTo(
            imgWrap,
            { width: isMobile ? '50vw' : '30vw' },
            { width: isMobile ? '88vw' : '50vw', ease: 'power1.inOut' },
            0.1
          );

          // Image zoom settles
          tl.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none' }, 0);

          // Foreground text
          tl.fromTo(
            fgText,
            { x: isMobile ? '60vw' : '80vw', opacity: 0 },
            { x: isMobile ? '-60vw' : '-80vw', opacity: 0.08, ease: 'none' },
            0.2
          );

          return () => {};
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [imgError, setImgError] = useState(false);

  return (
    <div ref={containerRef} style={{ height: '250vh', position: 'relative' }}>
      <div
        className="photo-pin"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0B0A09',
        }}
      >
        {/* Background name - BESHOY */}
        <span
          className="photo-bg-1"
          style={{
            position: 'absolute',
            top: '18%',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(5rem, 20vw, 12rem)',
            color: 'rgba(244, 239, 230, 0.04)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            whiteSpace: 'nowrap',
            zIndex: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {eventConfig.groomName}
        </span>

        {/* Background name - DORIS */}
        <span
          className="photo-bg-2"
          style={{
            position: 'absolute',
            bottom: '18%',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(5rem, 20vw, 12rem)',
            color: 'rgba(244, 239, 230, 0.04)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            whiteSpace: 'nowrap',
            zIndex: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {eventConfig.brideName}
        </span>

        {/* Photo container */}
        <div
          className="photo-wrap"
          style={{
            position: 'relative',
            zIndex: 2,
            width: '50vw',
            maxWidth: '450px',
            height: '65vh',
            maxHeight: '600px',
            overflow: 'hidden',
          }}
        >
          {imgError ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #241F1A 0%, #0B0A09 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#9A9185', fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem' }}>
                Photo
              </span>
            </div>
          ) : (
            <img
              className="photo-img"
              src={photo.src}
              alt={photo.alt}
              onError={() => setImgError(true)}
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

        {/* Foreground "TOGETHER" */}
        <span
          className="photo-fg"
          style={{
            position: 'absolute',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(5rem, 22vw, 14rem)',
            color: 'rgba(244, 239, 230, 0.08)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            zIndex: 3,
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 0,
          }}
        >
          Together
        </span>
      </div>
    </div>
  );
}

/* ─── Dual Editorial Mode ─── */
function DualPhotoStory({ photos }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const inner = containerRef.current.querySelector('.dual-pin');
      const img1 = containerRef.current.querySelector('.dual-img-1');
      const img2 = containerRef.current.querySelector('.dual-img-2');
      const bgWords = containerRef.current.querySelectorAll('.dual-bg-word');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: inner,
        },
      });

      tl.fromTo(img1, { x: '60%', y: '40%', opacity: 0 }, { x: '15%', y: '5%', opacity: 1 }, 0);
      tl.fromTo(img2, { x: '-60%', y: '-30%', opacity: 0 }, { x: '-15%', y: '-5%', opacity: 1 }, 0.1);
      tl.fromTo(img1, { y: '5%' }, { y: '-8%' }, 0.3);
      tl.fromTo(img2, { y: '-5%' }, { y: '5%' }, 0.3);

      bgWords.forEach((w, i) => {
        tl.fromTo(w, { x: i % 2 === 0 ? '40%' : '-40%' }, { x: i % 2 === 0 ? '-40%' : '40%', ease: 'none' }, 0);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div
        className="dual-pin"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0B0A09',
        }}
      >
        {['Love', 'Promise', 'Forever'].map((word, i) => (
          <span
            key={word}
            className="dual-bg-word"
            style={{
              position: 'absolute',
              top: `${20 + i * 25}%`,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(4rem, 16vw, 10rem)',
              color: 'rgba(244, 239, 230, 0.03)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          />
        ))}

        <PhotoImage
          className="dual-img-1"
          photo={photos[0]}
          style={{
            position: 'absolute',
            width: '45vw',
            maxWidth: '350px',
            height: '55vh',
            maxHeight: '500px',
            zIndex: 2,
          }}
        />

        <PhotoImage
          className="dual-img-2"
          photo={photos[1]}
          style={{
            position: 'absolute',
            width: '35vw',
            maxWidth: '280px',
            height: '45vh',
            maxHeight: '400px',
            zIndex: 3,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Multi Photo Sequence Mode ─── */
function MultiPhotoStory({ photos }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current.querySelectorAll('.multi-item');
      items.forEach((item, i) => {
        const alignment = i % 4;
        const xStart = alignment === 0 ? '20%' : alignment === 1 ? '-20%' : alignment === 2 ? '0%' : '0%';

        gsap.fromTo(
          item,
          { opacity: 0, y: 60, x: xStart },
          {
            opacity: 1,
            y: 0,
            x: '0%',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      const bgWords = containerRef.current.querySelectorAll('.multi-bg-word');
      bgWords.forEach((w, i) => {
        gsap.fromTo(
          w,
          { x: i % 2 === 0 ? '30%' : '-30%' },
          {
            x: i % 2 === 0 ? '-30%' : '30%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const alignments = ['flex-end', 'flex-start', 'center', 'center'];
  const widths = ['70vw', '55vw', '90vw', '50vw'];
  const maxWidths = ['500px', '380px', '100%', '350px'];
  const heights = ['50vh', '60vh', '70vh', '55vh'];

  return (
    <div ref={containerRef} style={{ position: 'relative', background: '#0B0A09', padding: '10vh 0' }}>
      {['Love', 'Promise', 'Forever'].map((word, i) => (
        <span
          key={word}
          className="multi-bg-word"
          style={{
            position: 'absolute',
            top: `${15 + i * 30}%`,
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(4rem, 16vw, 10rem)',
            color: 'rgba(244, 239, 230, 0.03)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {word}
        </span>
      ))}

      {photos.map((photo, i) => {
        const alignIdx = i % 4;
        return (
          <div
            key={i}
            className="multi-item"
            style={{
              display: 'flex',
              justifyContent: alignments[alignIdx],
              padding: '5vh 1.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <PhotoImage
              photo={photo}
              style={{
                width: widths[alignIdx],
                maxWidth: maxWidths[alignIdx],
                height: heights[alignIdx],
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ─── Shared Photo Image Component ─── */
function PhotoImage({ photo, className, style }) {
  const [error, setError] = useState(false);

  return (
    <div className={className} style={{ overflow: 'hidden', ...style }}>
      {error ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #241F1A 0%, #0B0A09 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#9A9185', fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem' }}>Photo</span>
        </div>
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
            objectPosition: photo.objectPositionMobile || '50% 50%',
            display: 'block',
          }}
        />
      )}
    </div>
  );
}

/* ─── Main Export ─── */
export default function PhotoStory() {
  const { couplePhotos } = eventConfig;

  if (!couplePhotos || couplePhotos.length === 0) {
    return null;
  }

  return (
    <section style={{ position: 'relative', background: '#0B0A09' }}>
      {couplePhotos.length === 1 && <SinglePhotoStory photo={couplePhotos[0]} />}
      {couplePhotos.length === 2 && <DualPhotoStory photos={couplePhotos} />}
      {couplePhotos.length >= 3 && <MultiPhotoStory photos={couplePhotos} />}
    </section>
  );
}
