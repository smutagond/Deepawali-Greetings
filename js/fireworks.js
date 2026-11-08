/**
 * Deepawali Canvas Fireworks & Sparkler Engine
 * High-performance physics-based fireworks, glittering trails,
 * and interactive Phuljhadi (sparkler) effects.
 */

class FireworksEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.rockets = [];
    this.sparklers = [];

    this.isRunning = false;
    this.autoInterval = null;
    this.sparklerActive = false;
    this.lastSparklerSound = 0;

    // Palette: Festive auspicious Diwali colors
    this.colors = [
      '#FFD700', // Gold
      '#FFA500', // Amber Marigold
      '#FF3366', // Crimson Ruby
      '#00FFCC', // Cyan Turquoise
      '#FF66CC', // Lotus Pink
      '#33FF66', // Emerald
      '#FF9900', // Saffron
      '#FFFFFF'  // Diamond White
    ];

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindEvents();
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  bindEvents() {
    // Click or tap anywhere to launch firework
    window.addEventListener('pointerdown', (e) => {
      // Don't launch if clicking on buttons, inputs, links or interactive cards
      if (e.target.closest('button, input, select, textarea, a, .interactive-card, .diya-click-zone, .no-firework')) {
        return;
      }
      this.launchRocketTo(e.clientX, e.clientY);
    });

    // Sparkler touch/mouse tracking
    window.addEventListener('pointermove', (e) => {
      if (this.sparklerActive) {
        this.addSparklerBurst(e.clientX, e.clientY, 8);
      }
    });
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
    this.startAutoFireworks();
  }

  stop() {
    this.isRunning = false;
    if (this.autoInterval) {
      clearInterval(this.autoInterval);
      this.autoInterval = null;
    }
  }

  startAutoFireworks() {
    if (this.autoInterval) clearInterval(this.autoInterval);
    this.autoInterval = setInterval(() => {
      if (!this.isRunning || document.hidden) return;
      const targetX = this.width * 0.15 + Math.random() * (this.width * 0.7);
      const targetY = this.height * 0.12 + Math.random() * (this.height * 0.45);
      this.launchRocketTo(targetX, targetY);
    }, 2400);
  }

  launchRocketTo(tx, ty) {
    const sx = this.width * (0.2 + Math.random() * 0.6);
    const sy = this.height + 10;
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];

    const angle = Math.atan2(ty - sy, tx - sx);
    const distance = Math.hypot(tx - sx, ty - sy);
    const speed = distance / (30 + Math.random() * 10);

    this.rockets.push({
      x: sx,
      y: sy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      tx: tx,
      ty: ty,
      color: color,
      trail: [],
      type: Math.random() > 0.3 ? 'chrysanthemum' : 'willow'
    });
  }

  burst(x, y, color, type = 'chrysanthemum') {
    if (window.soundEngine) {
      window.soundEngine.playFirework();
    }

    const count = type === 'willow' ? 70 : 85;
    const baseHueColor = color;
    const secondaryColor = this.colors[Math.floor(Math.random() * this.colors.length)];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 5 + (type === 'willow' ? 2 : 3);
      
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: type === 'willow' ? 0.012 + Math.random() * 0.008 : 0.02 + Math.random() * 0.015,
        gravity: type === 'willow' ? 0.045 : 0.06,
        color: Math.random() > 0.4 ? baseHueColor : secondaryColor,
        size: Math.random() * 2.5 + 1.2,
        flicker: Math.random() > 0.4,
        history: []
      });
    }

    // Add central flash
    this.particles.push({
      x: x,
      y: y,
      vx: 0,
      vy: 0,
      alpha: 1,
      decay: 0.15,
      gravity: 0,
      color: '#FFFFFF',
      size: 16,
      history: []
    });
  }

  addSparklerBurst(x, y, count = 12) {
    const now = Date.now();
    if (now - this.lastSparklerSound > 100 && window.soundEngine) {
      window.soundEngine.playSparklerCrackle();
      this.lastSparklerSound = now;
    }

    const sparkColors = ['#FFF5BA', '#FFD700', '#FF9900', '#FFFFFF', '#FFE066'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.5 + 1;
      this.sparklers.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        alpha: 1,
        decay: 0.035 + Math.random() * 0.04,
        gravity: 0.12,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        size: Math.random() * 2 + 0.8,
        length: Math.random() * 6 + 3
      });
    }
  }

  // Grand celebration finale triggered when lighting all 5 diyas
  launchCelebrationFinale(durationSeconds = 6) {
    const end = Date.now() + durationSeconds * 1000;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      const x = Math.random() * this.width;
      const y = this.height * 0.15 + Math.random() * (this.height * 0.4);
      this.burst(x, y, this.colors[Math.floor(Math.random() * this.colors.length)], Math.random() > 0.5 ? 'willow' : 'chrysanthemum');
    }, 280);
  }

  loop() {
    if (!this.isRunning) return;

    // Soft trail clear effect
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.globalCompositeOperation = 'lighter';

    // 1. Update & Render Rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 5) r.trail.shift();

      r.x += r.vx;
      r.y += r.vy;

      // Draw rocket trail
      this.ctx.beginPath();
      for (let j = 0; j < r.trail.length; j++) {
        const pt = r.trail[j];
        if (j === 0) this.ctx.moveTo(pt.x, pt.y);
        else this.ctx.lineTo(pt.x, pt.y);
      }
      this.ctx.strokeStyle = '#FFE066';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Explode when near target
      const dist = Math.hypot(r.tx - r.x, r.ty - r.y);
      if (dist < 20 || r.y <= r.ty) {
        this.burst(r.tx, r.ty, r.color, r.type);
        this.rockets.splice(i, 1);
      }
    }

    // 2. Update & Render Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.history.push({ x: p.x, y: p.y });
      if (p.history.length > 4) p.history.shift();

      p.vx *= 0.96;
      p.vy *= 0.96;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      // Draw trailing tail
      if (p.history.length > 1) {
        this.ctx.beginPath();
        this.ctx.moveTo(p.history[0].x, p.history[0].y);
        for (let j = 1; j < p.history.length; j++) {
          this.ctx.lineTo(p.history[j].x, p.history[j].y);
        }
        this.ctx.strokeStyle = p.color;
        this.ctx.lineWidth = p.size;
        this.ctx.globalAlpha = p.flicker ? Math.random() * p.alpha : p.alpha;
        this.ctx.stroke();
      }

      // Draw particle head
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();
    }

    // 3. Update & Render Sparklers
    for (let i = this.sparklers.length - 1; i >= 0; i--) {
      const s = this.sparklers[i];
      s.vy += s.gravity;
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        this.sparklers.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(s.x, s.y);
      this.ctx.rotate(Math.atan2(s.vy, s.vx));
      this.ctx.fillStyle = s.color;
      this.ctx.globalAlpha = s.alpha;
      this.ctx.fillRect(0, -s.size / 2, s.length, s.size);
      this.ctx.restore();
    }

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.loop());
  }
}

window.FireworksEngine = FireworksEngine;

