let audioInstance = null;
let fadeInterval = null;
let isPlaying = false;
let playFailed = false;

const TARGET_VOLUME = 0.15;
const listeners = new Set();

function notifyListeners() {
  listeners.forEach((callback) => callback({ isPlaying, playFailed }));
}

function clearFade() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
}

function syncPlayingState(nextPlaying) {
  isPlaying = nextPlaying;
  if (nextPlaying) playFailed = false;
  notifyListeners();
}

export function initAudio() {
  if (typeof window === 'undefined' || audioInstance) return;

  const audio = new Audio('/music/theme.mp3');
  audio.loop = true;
  audio.volume = 0;
  audio.preload = 'auto';
  audio.playsInline = true;
  audio.setAttribute?.('playsinline', '');
  audio.setAttribute?.('webkit-playsinline', '');

  audio.addEventListener('play', () => syncPlayingState(true));
  audio.addEventListener('playing', () => syncPlayingState(true));
  audio.addEventListener('pause', () => {
    if (audio.ended) return;
    syncPlayingState(false);
  });
  audio.addEventListener('ended', () => syncPlayingState(false));
  audio.addEventListener('error', () => {
    clearFade();
    playFailed = true;
    isPlaying = false;
    notifyListeners();
  });

  audioInstance = audio;
  audio.load();
}

export function playMusic(fadeIn = true) {
  initAudio();
  if (!audioInstance) return Promise.resolve();

  clearFade();

  if (fadeIn) {
    audioInstance.volume = 0;
  }

  return audioInstance
    .play()
    .then(() => {
      playFailed = false;
      notifyListeners();

      if (!fadeIn) {
        audioInstance.volume = TARGET_VOLUME;
        return;
      }

      let volume = audioInstance.volume;
      fadeInterval = window.setInterval(() => {
        if (!audioInstance) {
          clearFade();
          return;
        }

        volume = Math.min(volume + 0.012, TARGET_VOLUME);
        audioInstance.volume = volume;

        if (volume >= TARGET_VOLUME) {
          clearFade();
        }
      }, 120);
    })
    .catch(() => {
      clearFade();
      playFailed = true;
      isPlaying = false;
      notifyListeners();
    });
}

export function toggleMusic() {
  initAudio();
  if (!audioInstance) return;

  if (isPlaying) {
    clearFade();
    audioInstance.pause();
    return;
  }

  playMusic(false);
}

export function dismissRetry() {
  playFailed = false;
  notifyListeners();
}

export function subscribeToAudio(callback) {
  listeners.add(callback);
  callback({ isPlaying, playFailed });

  return () => {
    listeners.delete(callback);
  };
}
