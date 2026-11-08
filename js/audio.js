/**
 * Deepawali Web Audio Engine
 * Provides authentic festive sound effects (Temple bells, Diyas, Fireworks, Sparklers).
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;

    // Check saved mute preference
    const saved = localStorage.getItem('diwali_sound_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('diwali_sound_muted', this.isMuted);

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0 : 0.8,
        this.ctx.currentTime,
        0.05
      );
    }
    return this.isMuted;
  }

  // Authentic brass temple bell (घण्टा) with rich metallic harmonics
  playBell(rootFreq = 440) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const partials = [
      { f: rootFreq * 0.56, g: 0.3, d: 2.5 },
      { f: rootFreq * 1.00, g: 0.5, d: 3.0 },
      { f: rootFreq * 1.19, g: 0.35, d: 2.2 },
      { f: rootFreq * 1.56, g: 0.25, d: 1.8 },
      { f: rootFreq * 2.00, g: 0.15, d: 1.2 },
      { f: rootFreq * 2.74, g: 0.10, d: 0.9 },
      { f: rootFreq * 3.00, g: 0.08, d: 0.7 }
    ];

    partials.forEach(p => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(p.f, t);

      gain.gain.setValueAtTime(p.g * 0.6, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + p.d);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + p.d);
    });
  }

  // Sacred Shankha Naad (Conch Shell) divine acoustic resonance
  playShankh() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const baseFreq = 220; // A3 conch fundamental

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    // Pitch swell characteristic of shankha blowing
    osc1.frequency.setValueAtTime(baseFreq * 0.92, t);
    osc1.frequency.linearRampToValueAtTime(baseFreq * 1.05, t + 0.6);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.0, t + 2.5);

    osc2.frequency.setValueAtTime(baseFreq * 1.84, t);
    osc2.frequency.linearRampToValueAtTime(baseFreq * 2.1, t + 0.6);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.0, t + 2.5);

    // Warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.Q.setValueAtTime(3.0, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 3.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 3.2);
    osc2.stop(t + 3.2);
  }

  // Flower shower soft rustle
  playFlowerChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [784, 988, 1175, 1318];
    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t + i * 0.06);
      g.gain.setValueAtTime(0.12, t + i * 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.8);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.8);
    });
  }

  // Joyous chime chord when a diya is lit
  playDiyaChime(index = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    // Raag Bhupali notes (Sa, Re, Ga, Pa, Dha) in Hz
    const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const baseFreq = scale[index % scale.length];

    const t = this.ctx.currentTime;
    [baseFreq, baseFreq * 1.5].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.08);

      gain.gain.setValueAtTime(0.3, t + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.08 + 1.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 1.6);
    });
  }

  // Realistic firework blast with low-end thump and sizzle
  playFirework() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Low Thump
    const osc = this.ctx.createOscillator();
    const thumpGain = this.ctx.createGain();
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.35);

    thumpGain.gain.setValueAtTime(0.6, t);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(thumpGain);
    thumpGain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.4);

    // 2. White noise burst with bandpass for explosion crackle
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t);
    filter.Q.setValueAtTime(1.5, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.5);
  }

  // Phuljhadi (sparkler) crackle burst
  playSparklerCrackle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2000 + Math.random() * 2500, t);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.05);
  }

}

// Global singleton instance
window.soundEngine = new SoundEngine();
