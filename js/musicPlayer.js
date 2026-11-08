/**
 * Background music player for the supplied Deepawali track.
 */

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');
  const button = document.getElementById('background-music-toggle');
  if (!(audio instanceof HTMLAudioElement) || !(button instanceof HTMLButtonElement)) {
    console.error('Background music player markup is missing or invalid.');
    return;
  }

  audio.volume = 0.6;

  const updateButton = () => {
    const playing = !audio.paused;
    button.classList.toggle('playing', playing);
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
    button.innerHTML = playing
      ? '<span class="music-wave"><span></span><span></span><span></span></span> ಸಂಗೀತ: ನುಡಿಸುತ್ತಿದೆ'
      : '🎵 ಹಿನ್ನೆಲೆ ಸಂಗೀತ (Play Music)';
  };

  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);
  audio.addEventListener('error', () => {
    button.disabled = true;
    button.textContent = 'ಸಂಗೀತ ಲಭ್ಯವಿಲ್ಲ (Music unavailable)';
    console.error('Unable to load the Deepawali background music file.');
  });

  button.addEventListener('click', async () => {
    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      console.error('Unable to play the Deepawali background music.', error);
    }
  });
});
