/**
 * Main Application Orchestrator for Karnataka Deepavali Wishing Website
 * Handles Kannada & English personalization, Karnataka rituals, WhatsApp sharing,
 * audio synthesizers, and festive countdown.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas Fireworks
  window.fireworks = new FireworksEngine('fireworks-canvas');
  window.fireworks.start();

  // 2. Initialize Pancha Diya Altar (Karnataka Traditions)
  window.diyaAltar = new DiyaAltar();

  // 3. Multi-Step Wizard Controller (Mobile First)
  window.goToStep = function(stepNum) {
    const steps = [1, 2, 3];
    steps.forEach(num => {
      const view = document.getElementById(`step-view-${num}`);
      const navBtn = document.getElementById(`step-nav-${num}`);
      if (view) {
        view.classList.toggle('active', num === stepNum);
      }
      if (navBtn) {
        navBtn.classList.toggle('active', num === stepNum);
      }
    });

    // Audio cue
    if (window.soundEngine) {
      window.soundEngine.playDiyaChime(stepNum);
    }

    // Scroll smoothly to top on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Initialize URL Personalized Parameters
  const params = new URLSearchParams(window.location.search);
  const senderParam = params.get('from') || params.get('sender') || '';
  const recipientParam = params.get('to') || params.get('recipient') || '';
  const customMsgParam = params.get('msg') || '';
  const langParam = params.get('lang') || 'kannada';

  const heroSenderEl = document.getElementById('hero-sender-name');
  const heroRecipientEl = document.getElementById('hero-recipient-name');
  const heroGreetingContainer = document.getElementById('personalized-banner');

  if (senderParam || recipientParam) {
    if (recipientParam && heroRecipientEl) {
      heroRecipientEl.textContent = recipientParam;
    }
    if (senderParam && heroSenderEl) {
      heroSenderEl.textContent = senderParam;
    }
    if (heroGreetingContainer) {
      heroGreetingContainer.classList.remove('hidden');
    }
  }

  // Pre-fill generator inputs if present in URL
  const inputSender = document.getElementById('input-sender');
  const inputRecipient = document.getElementById('input-recipient');
  const inputWishText = document.getElementById('input-wishtext');

  if (inputSender && senderParam) inputSender.value = senderParam;
  if (inputRecipient && recipientParam) inputRecipient.value = recipientParam;
  if (inputWishText && customMsgParam) inputWishText.value = customMsgParam;

  // 4. Setup Wish Selection & Generator (Kannada & English)
  setupWishGenerator(langParam);

  // 5. Setup Action Buttons (Audio, Music, Fireworks, Sparklers)
  setupControlButtons();

  // 6. Auto-first-interaction audio resume handler
  const enableAudioOnFirstClick = () => {
    if (window.soundEngine) {
      window.soundEngine.init();
    }
    window.removeEventListener('click', enableAudioOnFirstClick);
    window.removeEventListener('touchstart', enableAudioOnFirstClick);
  };
  window.addEventListener('click', enableAudioOnFirstClick);
  window.addEventListener('touchstart', enableAudioOnFirstClick);
});

/**
 * Setup Wish Generator logic & Live Preview (Kannada & English)
 */
function setupWishGenerator(initialLang = 'kannada') {
  const inputSender = document.getElementById('input-sender');
  const inputRecipient = document.getElementById('input-recipient');
  const inputWishText = document.getElementById('input-wishtext');
  const templateList = document.getElementById('wish-templates-list');
  const langTabs = document.querySelectorAll('.lang-tab');

  const substepNames = document.getElementById('wishes-substep-names');
  const substepCustomize = document.getElementById('wishes-substep-customize');
  const btnNamesNext = document.getElementById('btn-names-next');
  const btnEditNames = document.getElementById('btn-edit-names');
  const namesSummaryText = document.getElementById('names-summary-text');

  const previewSender = document.getElementById('preview-sender');
  const previewRecipient = document.getElementById('preview-recipient');
  const previewText = document.getElementById('preview-text');

  let currentLang = (initialLang === 'english') ? 'english' : 'kannada';

  function resizeWishText() {
    if (!inputWishText) return;
    inputWishText.style.height = 'auto';
    inputWishText.style.height = `${inputWishText.scrollHeight}px`;
  }

  // Update Summary Bar in Substep 2
  function updateNamesSummary() {
    const s = inputSender ? inputSender.value.trim() : '';
    const r = inputRecipient ? inputRecipient.value.trim() : '';
    const isKn = currentLang === 'kannada';
    if (namesSummaryText) {
      if (s && r) {
        namesSummaryText.textContent = `${s} ➔ ${r}`;
      } else if (s) {
        namesSummaryText.textContent = isKn ? `ಹಾರೈಸುವವರು: ${s}` : `From: ${s}`;
      } else if (r) {
        namesSummaryText.textContent = isKn ? `ಸ್ವೀಕರಿಸುವವರು: ${r}` : `To: ${r}`;
      } else {
        namesSummaryText.textContent = isKn ? 'ದೀಪಾವಳಿ ಶುಭ ಸಂದೇಶ' : 'Deepavali Festive Greeting';
      }
    }
  }

  // Next button click from Substep 1 (Names) to Substep 2 (Customize & Share)
  if (btnNamesNext) {
    btnNamesNext.addEventListener('click', () => {
      updateNamesSummary();
      updatePreview();
      if (substepNames) substepNames.classList.add('hidden');
      if (substepCustomize) {
        substepCustomize.classList.remove('hidden');
        substepCustomize.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      resizeWishText();
      if (window.soundEngine) {
        window.soundEngine.playDiyaChime(2);
      }
    });
  }

  // Edit Names button in Substep 2 (back to Substep 1)
  if (btnEditNames) {
    btnEditNames.addEventListener('click', () => {
      if (substepCustomize) substepCustomize.classList.add('hidden');
      if (substepNames) {
        substepNames.classList.remove('hidden');
        substepNames.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (inputSender) inputSender.focus();
    });
  }

  // Enter key in inputs navigates to Next
  [inputSender, inputRecipient].forEach(inp => {
    if (inp) {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (btnNamesNext) btnNamesNext.click();
        }
      });
    }
  });

  // Render templates for current language
  function renderTemplates(lang) {
    currentLang = lang;
    if (!templateList) return;
    templateList.innerHTML = '';

    const list = window.DIWALI_WISHES[lang] || [];
    list.forEach((item, index) => {
      const chip = document.createElement('div');
      chip.className = `wish-chip ${index === 0 ? 'selected' : ''}`;
      chip.innerHTML = `
        <span class="chip-tag">${item.tag}</span>
        <span class="chip-text">${item.title}</span>
      `;
      chip.addEventListener('click', () => {
        document.querySelectorAll('.wish-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        const chosen = item.shloka ? `${item.shloka}\n\n[ಅರ್ಥ/Meaning: ${item.meaning}]` : item.text;
        inputWishText.value = chosen;
        resizeWishText();
        updatePreview();
      });
      templateList.appendChild(chip);
    });

    // Default first selection if input is empty
    if (list.length > 0 && (!inputWishText.value || inputWishText.value.trim() === '')) {
      const first = list[0];
      inputWishText.value = first.shloka ? `${first.shloka}\n\n[ಅರ್ಥ/Meaning: ${first.meaning}]` : first.text;
    }
    resizeWishText();
    updatePreview();
  }

  // Language Tabs click
  langTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      langTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderTemplates(tab.dataset.lang);
    });
  });

  function updatePreview() {
    const sender = inputSender ? inputSender.value.trim() : '';
    const recipient = inputRecipient ? inputRecipient.value.trim() : '';
    const wish = inputWishText ? inputWishText.value.trim() : '';
    const isKn = currentLang === 'kannada';

    if (previewRecipient) {
      if (recipient) {
        previewRecipient.textContent = isKn ? `ಆತ್ಮೀಯ ${recipient} ಅವರಿಗೆ,` : `Dearest ${recipient},`;
      } else {
        previewRecipient.textContent = isKn ? 'ಆತ್ಮೀಯ ಬಂಧು-ಮಿತ್ರರೇ,' : 'Dearest Family & Friends,';
      }
    }
    if (previewText) {
      previewText.textContent = wish || (isKn ? 'ನಿಮಗೂ ನಿಮ್ಮ ಕುಟುಂಬದವರಿಗೂ ದೀಪಾವಳಿ ಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು!' : 'Wishing you a very Happy & Blessed Deepavali!');
    }
    if (previewSender) {
      if (sender) {
        previewSender.textContent = isKn ? `— ಹಾರ್ದಿಕ ಶುಭ ಹಾರೈಕೆಗಳೊಂದಿಗೆ: ${sender}` : `— With Warm Wishes: ${sender}`;
      } else {
        previewSender.textContent = isKn ? '— ದೀಪಾವಳಿ ಶುಭ ಹಾರೈಕೆಗಳು' : '— Deepavali Wishes';
      }
    }
  }

  // Input listeners
  if (inputSender) inputSender.addEventListener('input', updatePreview);
  if (inputRecipient) inputRecipient.addEventListener('input', updatePreview);
  if (inputWishText) {
    inputWishText.addEventListener('input', () => {
      resizeWishText();
      updatePreview();
    });
  }

  // Initial render
  renderTemplates(currentLang);

  // Share on WhatsApp
  const btnWhatsApp = document.getElementById('btn-share-whatsapp');
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', async () => {
      const sender = inputSender ? inputSender.value.trim() : '';
      const recipient = inputRecipient ? inputRecipient.value.trim() : '';
      const wish = inputWishText ? inputWishText.value.trim() : '';

      const shareUrl = buildShareableUrl(sender, recipient, wish, currentLang);
      const textMessage = window.createShareMessage(sender, recipient, wish, shareUrl, currentLang);
      const isKn = currentLang === 'kannada';

      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textMessage)}`;
      const backgroundMusic = document.getElementById('background-music');
      if (backgroundMusic instanceof HTMLAudioElement) {
        backgroundMusic.pause();
      }

      let cardFile;
      try {
        cardFile = window.cardGenerator.createShareFile(sender, recipient, wish, isKn);
      } catch (error) {
        console.error('Unable to generate the greeting card for sharing.', error);
        showCopyToast(isKn
          ? 'ಕಾರ್ಡ್ ಸಿದ್ಧಪಡಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
          : 'The greeting card could not be prepared. Please try again.');
        return;
      }

      if (navigator.canShare && navigator.canShare({ files: [cardFile] }) && navigator.share) {
        try {
          await navigator.share({
            files: [cardFile],
            text: textMessage,
            title: isKn ? 'ದೀಪಾವಳಿ ಶುಭಾಶಯಗಳು' : 'Deepavali Greetings'
          });
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('Unable to share the greeting card.', error);
            showCopyToast(isKn
              ? 'ಕಾರ್ಡ್ ಹಂಚಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು PNG ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಹಂಚಿಕೊಳ್ಳಿ.'
              : 'Unable to share the card. Please download the PNG and share it.');
          }
        }
        return;
      }

      try {
        window.cardGenerator.downloadShareFile(cardFile);
        window.open(waUrl, '_blank');
        showCopyToast(isKn
          ? 'ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ. WhatsApp ಸಂದೇಶಕ್ಕೆ ಅದನ್ನು ಲಗತ್ತಿಸಿ.'
          : 'Card downloaded. Attach it to the WhatsApp message.');
      } catch (error) {
        console.error('Unable to prepare the greeting card for WhatsApp.', error);
        showCopyToast(isKn
          ? 'ಕಾರ್ಡ್ ಸಿದ್ಧಪಡಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
          : 'The greeting card could not be prepared. Please try again.');
      }
    });
  }

  // Copy Shareable Link
  const btnCopyLink = document.getElementById('btn-copy-link');
  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      const sender = inputSender ? inputSender.value.trim() : '';
      const recipient = inputRecipient ? inputRecipient.value.trim() : '';
      const wish = inputWishText ? inputWishText.value.trim() : '';

      const shareUrl = buildShareableUrl(sender, recipient, wish, currentLang);
      navigator.clipboard.writeText(shareUrl).then(() => {
        showCopyToast(currentLang === 'kannada' ? '✨ ದೀಪಾವಳಿ ಶುಭಾಶಯ ಲಿಂಕ್ ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!' : '✨ Shareable greeting link copied to clipboard!');
        if (window.soundEngine) window.soundEngine.playDiyaChime(2);
      }).catch(() => {
        prompt('Copy your link:', shareUrl);
      });
    });
  }

  // Download Greeting Card as PNG
  const btnDownloadCard = document.getElementById('btn-download-card');
  if (btnDownloadCard) {
    btnDownloadCard.addEventListener('click', () => {
      const sender = inputSender ? inputSender.value.trim() : '';
      const recipient = inputRecipient ? inputRecipient.value.trim() : '';
      const wish = inputWishText ? inputWishText.value.trim() : '';
      const isKn = currentLang === 'kannada';

      btnDownloadCard.disabled = true;
      btnDownloadCard.textContent = isKn ? '⏳ ಕಾರ್ಡ್ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...' : '⏳ Generating Card...';

      setTimeout(async () => {
        await window.cardGenerator.downloadCard(sender, recipient, wish, isKn);
        btnDownloadCard.disabled = false;
        btnDownloadCard.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          ${isKn ? 'ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ (PNG)' : 'Download PNG Card'}
        `;
        showCopyToast(isKn ? '📥 ದೀಪಾವಳಿ ಶುಭಾಶಯ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ!' : '📥 Festive greeting card downloaded successfully!');
      }, 250);
    });
  }
}

function buildShareableUrl(sender, recipient, wish, lang) {
  const url = new URL(window.location.origin + window.location.pathname);
  if (sender) url.searchParams.set('from', sender);
  if (recipient) url.searchParams.set('to', recipient);
  if (wish) url.searchParams.set('msg', wish);
  if (lang) url.searchParams.set('lang', lang);
  return url.toString();
}

function showCopyToast(msg) {
  const toast = document.getElementById('copy-feedback-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/**
 * Setup Control Buttons (Sound, Music, Sparklers, Diya Altar)
 */
function setupControlButtons() {
  const btnSound = document.getElementById('btn-sound-toggle');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      const isMuted = window.soundEngine.toggleMute();
      btnSound.innerHTML = isMuted 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg> ಧ್ವನಿ: ಆಫ್ (Off)`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> ಧ್ವನಿ: ಆನ್ (On)`;
    });
  }

  const btnSparkler = document.getElementById('btn-sparkler-toggle');
  if (btnSparkler) {
    btnSparkler.addEventListener('click', () => {
      window.fireworks.sparklerActive = !window.fireworks.sparklerActive;
      btnSparkler.classList.toggle('active', window.fireworks.sparklerActive);
      btnSparkler.textContent = window.fireworks.sparklerActive ? '✨ ಸುರಸುರಬತ್ತಿ: ಚಾಲ್ತಿಯಲ್ಲಿದೆ' : '✨ ಸುರಸುರಬತ್ತಿ (Sparkler)';
      if (window.fireworks.sparklerActive) {
        showCopyToast('✨ ಪರದೆಯ ಮೇಲೆ ಬೆರಳು / ಮೌಸ್ ಚಲಿಸಿ ಸುರಸುರಬತ್ತಿಯ ಕಿಡಿಗಳನ್ನು ಹೊತ್ತಿಸಿ!');
      }
    });
  }

  const btnSkyBurst = document.getElementById('btn-burst-fireworks');
  if (btnSkyBurst) {
    btnSkyBurst.addEventListener('click', () => {
      window.fireworks.launchCelebrationFinale(4);
      if (window.soundEngine) {
        window.soundEngine.playFirework();
        window.soundEngine.playShankh();
      }
    });
  }

  const btnLightAll = document.getElementById('btn-light-all-diyas');
  if (btnLightAll) {
    btnLightAll.addEventListener('click', () => {
      window.diyaAltar.lightAll();
    });
  }

  const btnResetDiyas = document.getElementById('btn-reset-diyas');
  if (btnResetDiyas) {
    btnResetDiyas.addEventListener('click', () => {
      window.diyaAltar.resetAll();
    });
  }

  const btnCloseModal = document.getElementById('btn-close-modal');
  const grandModal = document.getElementById('grand-celebration-modal');
  if (btnCloseModal && grandModal) {
    btnCloseModal.addEventListener('click', () => {
      grandModal.classList.remove('active');
    });
    grandModal.addEventListener('click', (e) => {
      if (e.target === grandModal) {
        grandModal.classList.remove('active');
      }
    });
  }
}
