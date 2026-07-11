import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { toggleMusic, playMusic, dismissRetry, subscribeToAudio, initAudio } from '../utils/audioManager';

export default function MusicPlayer() {
  const [state, setState] = useState({ isPlaying: false, playFailed: false });

  useEffect(() => {
    // Initialize audio instance (does not play)
    initAudio();
    // Subscribe to state changes
    const unsubscribe = subscribeToAudio(newState => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  const { isPlaying, playFailed } = state;

  return (
    <>
      <button
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          bottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))',
          right: '2rem',
          zIndex: 50,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(199, 154, 139, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(106, 81, 72, 0.08)',
          transition: 'transform 0.3s ease, border-color 0.3s ease',
          transform: isPlaying ? 'scale(1)' : 'scale(0.95)',
        }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {/* Animated bars */}
        <div style={{ display: 'flex', gap: '3px', height: '14px', alignItems: 'flex-end' }}>
          {[1, 2, 3].map((bar) => (
            <div
              key={bar}
              style={{
                width: '2px',
                backgroundColor: '#4F3E39', // Dark luxury text color
                borderRadius: '2px',
                height: isPlaying ? '100%' : '3px',
                transition: 'height 0.3s ease',
                animation: isPlaying ? `bounce${bar} 1s infinite alternate ease-in-out` : 'none',
                animationDelay: `${bar * 0.15}s`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes bounce1 { 0% { height: 4px; } 100% { height: 14px; } }
          @keyframes bounce2 { 0% { height: 8px; } 100% { height: 12px; } }
          @keyframes bounce3 { 0% { height: 3px; } 100% { height: 10px; } }
          
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(20px) translateX(-50%); }
            to { opacity: 1; transform: translateY(0) translateX(-50%); }
          }
        `}</style>
      </button>

      {/* Playback Failed Retry Interaction */}
      {playFailed && createPortal(
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            background: 'rgba(252, 248, 245, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(199, 154, 139, 0.4)',
            borderRadius: '30px',
            padding: '0.8rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 15px 35px rgba(79, 62, 57, 0.15)',
            animation: 'slideUpFade 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          }}
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: '#4F3E39',
            whiteSpace: 'nowrap',
          }}>
            Experience with sound
          </span>
          <button
            onClick={() => playMusic(false)}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#F7F1EA',
              background: '#C79A8B',
              border: 'none',
              padding: '0.5rem 1.2rem',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#A67B6D'}
            onMouseOut={(e) => e.currentTarget.style.background = '#C79A8B'}
          >
            Play Music
          </button>
          
          <button
            onClick={dismissRetry}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8F7D78',
            }}
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>,
        document.body
      )}
    </>
  );
}
