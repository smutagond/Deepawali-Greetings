/**
 * Interactive Pancha Diya (5 Sacred Diyas) Altar - Karnataka Traditions
 * Features traditional Karnataka Deepavali lamps (Arogya, Samriddhi, Bali Padyami, Jnana, Gau Pooja).
 */

class DiyaAltar {
  constructor() {
    this.diyas = [
      {
        id: 0,
        name: "ಆರೋಗ್ಯ ದೀಪ (Arogya Deepa)",
        slogan: "ಅಭ್ಯಂಜನ ಸ್ನಾನ ಮತ್ತು ಉತ್ತಮ ಆರೋಗ್ಯ",
        desc: "ನರಕ ಚತುರ್ದಶಿಯ ಪವಿತ್ರ ಎಳ್ಳೆಣ್ಣೆ ಸ್ನಾನದಂತೆ, ಈ ದಿವ್ಯ ದೀಪವು ನಿಮ್ಮ ಎಲ್ಲಾ ಕಲ್ಮಶಗಳನ್ನು ತೊಳೆದು ದೀರ್ಘಾಯುಷ್ಯ ಮತ್ತು ಪರಿಪೂರ್ಣ ಆರೋಗ್ಯವನ್ನು ಕರುಣಿಸಲಿ.",
        engDesc: "May this sacred lamp bestow vibrant health, vigor, and purification as celebrated during the traditional Abhyanjana Snana.",
        isLit: false
      },
      {
        id: 1,
        name: "ಧನಸಮೃದ್ಧಿ ದೀಪ (Samriddhi Deepa)",
        slogan: "ಸಿರಿ ಮಹಾಲಕ್ಷ್ಮಿ ಹಾಗೂ ಕುಬೇರ ಕೃಪೆ",
        desc: "ಮಹಾಲಕ್ಷ್ಮಿ ಪೂಜೆಯ ಶುಭ ಸಂದರ್ಭದಲ್ಲಿ, ನಿಮ್ಮ ಮನೆ-ಮನಗಳಲ್ಲಿ ಧನ-ಧಾನ್ಯ, ಐಶ್ವರ್ಯ ಮತ್ತು ಕೀರ್ತಿ ಸದಾ ತುಂಬಿರಲಿ ಎಂದು ಹಾರೈಸುವ ಮಂಗಳ ದೀಪ.",
        engDesc: "May Goddess Dhanalakshmi shower your household with abundant wealth, prosperity, and joyous success.",
        isLit: false
      },
      {
        id: 2,
        name: "ಬಲೀಂದ್ರ ದೀಪ (Bali Padyami Deepa)",
        slogan: "ತ್ಯಾಗ, ಧರ್ಮ ಹಾಗೂ ಶಾಂತಿ",
        desc: "ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆಯ ಬಲಿಪಾಡ್ಯಮಿಯ ದಿನ ಬಲಿ ಚಕ್ರವರ್ತಿಯನ್ನು ಸ್ವಾಗತಿಸುವ ಪಾವನ ದೀಪ. ನಿಮ್ಮ ಬಾಳಿನಲ್ಲಿ ನ್ಯಾಯ, ಧರ್ಮ ಹಾಗೂ ಶಾಂತಿ ಸದಾ ನೆಲೆಯಾಗಲಿ.",
        engDesc: "Welcoming King Bali on the sacred occasion of Bali Padyami; may truth, generosity, and peace reign supreme in your life.",
        isLit: false
      },
      {
        id: 3,
        name: "ಜ್ಞಾನಜ್ಯೋತಿ ದೀಪ (Jnana Deepa)",
        slogan: "ತಮಸೋಮಾ ಜ್ಯೋತಿರ್ಗಮಯ",
        desc: "ಅಜ್ಞಾನದ ಕತ್ತಲೆಯನ್ನು ಓಡಿಸಿ ಜ್ಞಾನ, ಸದ್ಬುದ್ಧಿ ಮತ್ತು ವಿವೇಕದ ದಿವ್ಯ ಬೆಳಕನ್ನು ಚೆಲ್ಲುವ ಪವಿತ್ರ ಹಣತೆ.",
        engDesc: "Dispelling darkness and ignorance with the illuminating radiance of wisdom, clarity, and knowledge.",
        isLit: false
      },
      {
        id: 4,
        name: "ಗೋಪೂಜಾ ಹಾಗೂ ಪ್ರೇಮ ದೀಪ (Gau Pooja Deepa)",
        slogan: "ಕಾಮಧೇನು ಕೃಪೆ ಮತ್ತು ಕುಟುಂಬ ಸೌಹಾರ್ದ",
        desc: "ಬಲಿಪಾಡ್ಯಮಿಯಂದು ಗೋಮಾತೆಯನ್ನು ಪೂಜಿಸಿ ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸುವಂತೆ, ನಿಮ್ಮ ಕುಟುಂಬದಲ್ಲಿ ಪ್ರೀತಿ, ವಾತ್ಸಲ್ಯ, ಒಗ್ಗಟ್ಟು ಮತ್ತು ಸುಖ-ಸಂತೋಷ ಶಾಶ್ವತವಾಗಿರಲಿ.",
        engDesc: "Honoring Kamadhenu Gomata during Gau Pooja; may unconditional love, harmony, and togetherness flourish in your family.",
        isLit: false
      }
    ];

    this.litCount = 0;
    this.totalDiyas = this.diyas.length;
    this.initDOM();
  }

  initDOM() {
    this.container = document.getElementById('diyas-grid');
    this.progressFill = document.getElementById('diya-progress-fill');
    this.progressLabel = document.getElementById('diya-progress-label');
    this.blessingToast = document.getElementById('blessing-toast');
    this.blessingTitle = document.getElementById('blessing-title');
    this.blessingText = document.getElementById('blessing-desc');
    this.grandModal = document.getElementById('grand-celebration-modal');

    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.diyas.forEach((diya, idx) => {
      const card = document.createElement('div');
      card.className = `diya-item ${diya.isLit ? 'is-lit' : ''}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${diya.name}: ${diya.isLit ? 'ಬೆಳಗಿದೆ (Lit)' : 'ಬೆಳಗಿಸಲು ಸ್ಪರ್ಶಿಸಿ (Click to light)'}`);

      card.innerHTML = `
        <div class="diya-wrapper">
          <div class="diya-flame-halo ${diya.isLit ? 'active' : ''}"></div>
          
          <div class="flame-element ${diya.isLit ? 'lit' : ''}">
            <div class="flame-main"></div>
            <div class="flame-inner"></div>
            <div class="flame-sparkle"></div>
          </div>

          <!-- Ornate Brass Diya Base SVG (ಸಾಂಪ್ರದಾಯಿಕ ಹಿತ್ತಾಳೆ ಹಣತೆ) -->
          <svg class="diya-svg" viewBox="0 0 120 70" width="100" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brassGrad${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFE57F"/>
                <stop offset="40%" stop-color="#D4AF37"/>
                <stop offset="80%" stop-color="#AA771C"/>
                <stop offset="100%" stop-color="#603813"/>
              </linearGradient>
              <linearGradient id="goldRim${idx}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#FFF2A3"/>
                <stop offset="50%" stop-color="#FFD700"/>
                <stop offset="100%" stop-color="#CC8800"/>
              </linearGradient>
            </defs>
            <!-- Diya Base Stand -->
            <path d="M42 62 Q60 67 78 62 L74 68 Q60 70 46 68 Z" fill="#4A2600" />
            <!-- Diya Brass Bowl -->
            <path d="M10 24 Q60 75 110 24 Q95 32 60 32 Q25 32 10 24 Z" fill="url(#brassGrad${idx})" stroke="#FFE066" stroke-width="1.5"/>
            <!-- Diya Lip / Top Opening -->
            <ellipse cx="60" cy="24" rx="50" ry="11" fill="#3D1C06" stroke="url(#goldRim${idx})" stroke-width="2"/>
            <!-- Inner Sesame Oil Well -->
            <ellipse cx="60" cy="25" rx="42" ry="7" fill="#240F00"/>
            <!-- Traditional Engraved Motifs -->
            <circle cx="35" cy="38" r="3" fill="#FFF2A3"/>
            <circle cx="48" cy="44" r="3.5" fill="#FFF2A3"/>
            <circle cx="60" cy="46" r="4" fill="#FFD700"/>
            <circle cx="72" cy="44" r="3.5" fill="#FFF2A3"/>
            <circle cx="85" cy="38" r="3" fill="#FFF2A3"/>
          </svg>
        </div>

        <div class="diya-info">
          <div class="diya-badge">${diya.isLit ? '✨ ಬೆಳಗಿದೆ (Lit)' : 'ದೀಪ ಬೆಳಗಿಸಿ'}</div>
          <h4 class="diya-title">${diya.name}</h4>
          <p class="diya-slogan">${diya.slogan}</p>
        </div>
      `;

      card.addEventListener('click', (e) => this.toggleDiya(idx, e));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleDiya(idx, e);
        }
      });

      this.container.appendChild(card);
    });

    this.updateProgress();
  }

  toggleDiya(index, event) {
    const diya = this.diyas[index];
    if (diya.isLit) {
      this.showBlessing(diya);
      return;
    }

    diya.isLit = true;
    this.litCount++;

    // Audio cue (temple chime)
    if (window.soundEngine) {
      window.soundEngine.playDiyaChime(index);
    }

    // Sparkle burst around click location
    if (window.fireworks && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      window.fireworks.addSparklerBurst(rect.left + rect.width / 2, rect.top + 30, 24);
    }

    this.render();
    this.showBlessing(diya);

    // Check if all 5 diyas are lit!
    if (this.litCount === this.totalDiyas) {
      setTimeout(() => this.triggerGrandCelebration(), 700);
    }
  }

  lightAll() {
    this.diyas.forEach((d, i) => {
      setTimeout(() => {
        if (!d.isLit) {
          d.isLit = true;
          this.litCount++;
          if (window.soundEngine) window.soundEngine.playDiyaChime(i);
          this.render();
          if (this.litCount === this.totalDiyas) {
            setTimeout(() => this.triggerGrandCelebration(), 800);
          }
        }
      }, i * 220);
    });
  }

  resetAll() {
    this.diyas.forEach(d => d.isLit = false);
    this.litCount = 0;
    this.render();
    if (this.blessingToast) this.blessingToast.classList.remove('show');
  }

  showBlessing(diya) {
    if (!this.blessingToast) return;
    this.blessingTitle.textContent = `🪔 ${diya.name}`;
    this.blessingText.textContent = `${diya.desc} (${diya.engDesc})`;
    this.blessingToast.classList.add('show');

    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.blessingToast.classList.remove('show');
    }, 5500);
  }

  updateProgress() {
    if (!this.progressFill || !this.progressLabel) return;
    const percent = (this.litCount / this.totalDiyas) * 100;
    this.progressFill.style.width = `${percent}%`;
    this.progressLabel.textContent = `${this.litCount} / ${this.totalDiyas} ಪವಿತ್ರ ಹಣತೆಗಳು ಬೆಳಗಿವೆ (Sacred Diyas Lit)`;
  }

  triggerGrandCelebration() {
    if (window.soundEngine) window.soundEngine.playShankh();
    if (window.fireworks) {
      window.fireworks.launchCelebrationFinale(7);
    }

    this.launchConfetti();

    if (this.grandModal) {
      this.grandModal.classList.add('active');
    }
  }

  launchConfetti() {
    const confettiColors = ['#FFD700', '#FF4500', '#FF1493', '#00FFFF', '#32CD32', '#FFF5BA'];
    const confettiCount = 90;

    for (let i = 0; i < confettiCount; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = `${Math.random() * 100}vw`;
      el.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      el.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
      el.style.animationDelay = `${Math.random() * 0.8}s`;
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(el);

      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 5500);
    }
  }
}

window.DiyaAltar = DiyaAltar;
