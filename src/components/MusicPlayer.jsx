import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const btnRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.loop = true;
    
    const onCanPlay = () => setLoaded(true);
    audio.addEventListener('canplaythrough', onCanPlay);
    return () => audio.removeEventListener('canplaythrough', onCanPlay);
  }, []);

  // Pulse animation on the button
  useEffect(() => {
    if (!btnRef.current) return;
    const ctx = gsap.context(() => {
      if (!playing) {
        gsap.to(btnRef.current.querySelector('.pulse-ring'), {
          scale: 1.6,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: 'power1.out',
        });
      }
    }, btnRef);
    return () => ctx.revert();
  }, [playing]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      gsap.to(audio, {
        volume: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          audio.pause();
          setPlaying(false);
        },
      });
    } else {
      audio.play().then(() => {
        setPlaying(true);
        gsap.to(audio, {
          volume: 0.15,
          duration: 1.5,
          ease: 'power2.in',
        });
      }).catch(() => {
        // Autoplay blocked — user needs to interact again
      });
    }
  }, [playing]);

  // Entrance animation
  useEffect(() => {
    if (!btnRef.current) return;
    gsap.fromTo(btnRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 4, ease: 'power3.out' }
    );
  }, []);

  return (
    <>
      <audio ref={audioRef} preload="auto" src="/music/theme.mp3" />
      <button
        ref={btnRef}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        style={{
          position: 'fixed',
          bottom: 'max(env(safe-area-inset-bottom, 16px), 20px)',
          right: '20px',
          zIndex: 200,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(30, 26, 22, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(201, 169, 110, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: 0,
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Pulse ring when paused */}
        {!playing && (
          <span
            className="pulse-ring"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid rgba(201, 169, 110, 0.3)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Icon */}
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="4" width="4" height="16" rx="1" fill="#C9A96E" />
            <rect x="14" y="4" width="4" height="16" rx="1" fill="#C9A96E" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M8 5.14v14.72a1 1 0 001.5.86l11.14-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" fill="#C9A96E" />
          </svg>
        )}
      </button>
    </>
  );
}
