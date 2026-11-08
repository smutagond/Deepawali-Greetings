/**
 * Karnataka Deepavali Greeting Card Generator (ಕನ್ನಡ & English)
 * Renders an ornate, high-resolution downloadable festive greeting card on HTML5 Canvas.
 */

class CardGenerator {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1080;
    this.canvas.height = 1080;
    this.ctx = this.canvas.getContext('2d');
  }

  generate(sender, recipient, wishText, isKannada = true) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. Background Gradient (Deep Royal Mysore Crimson & Night Indigo)
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 80, w / 2, h / 2, w * 0.75);
    bgGrad.addColorStop(0, '#3a0818');
    bgGrad.addColorStop(0.5, '#1e051c');
    bgGrad.addColorStop(1, '#090314');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Ambient Golden Glow in Center
    const centerGlow = ctx.createRadialGradient(w / 2, 420, 10, w / 2, 420, 380);
    centerGlow.addColorStop(0, 'rgba(255, 204, 0, 0.28)');
    centerGlow.addColorStop(0.5, 'rgba(255, 120, 0, 0.12)');
    centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, w, h);

    // 3. Subtle background stars / sparkles
    ctx.fillStyle = '#FFD700';
    for (let i = 0; i < 75; i++) {
      const sx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
      const sy = (Math.cos(i * 33) * 0.5 + 0.5) * h;
      const sRadius = (i % 3 === 0 ? 2.5 : 1.2);
      ctx.globalAlpha = 0.2 + (i % 5) * 0.15;
      ctx.beginPath();
      ctx.arc(sx, sy, sRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // 4. Ornate Gold Border & Frames
    this.drawOrnateBorders(ctx, w, h);

    // 5. Header: Sacred Symbol & Subtitle
    ctx.textAlign = 'center';

    // Sacred Invocation in Kannada
    ctx.font = 'bold 34px "Noto Sans Kannada", "Anek Kannada", "Georgia", serif';
    ctx.fillStyle = '#FFE066';
    ctx.fillText('॥ ಶ್ರೀ ಮಹಾಲಕ್ಷ್ಮಿ ಪ್ರಸನ್ನ ॥', w / 2, 130);

    // Main Greeting in Kannada: "ದೀಪಾವಳಿ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು"
    ctx.font = 'bold 54px "Anek Kannada", "Noto Sans Kannada", "Tiro Kannada", serif';
    ctx.fillStyle = '#FFF2A3';
    ctx.shadowColor = '#FF9900';
    ctx.shadowBlur = 18;
    ctx.fillText('ದೀಪಾವಳಿ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು', w / 2, 210);

    // English Sub-title
    ctx.font = '600 30px "Cinzel", "Georgia", serif';
    ctx.letterSpacing = '6px';
    ctx.fillStyle = '#FFD700';
    ctx.shadowBlur = 8;
    ctx.fillText('HAPPY DEEPAVALI', w / 2, 265);
    ctx.shadowBlur = 0;

    // 6. Center Decorative Diya Illustration
    this.drawDiya(ctx, w / 2, 380);

    // 7. Recipient Greeting
    let currentY = 530;
    if (recipient && recipient.trim() !== '') {
      ctx.font = 'italic 500 34px "Noto Sans Kannada", "Cinzel", serif';
      ctx.fillStyle = '#FFE599';
      const dearPrefix = isKannada ? `ಆತ್ಮೀಯ ${recipient.trim()} ಅವರಿಗೆ,` : `Dearest ${recipient.trim()},`;
      ctx.fillText(dearPrefix, w / 2, currentY);
      currentY += 50;
    }

    // 8. Wish / Quote Body (Auto-wrapped)
    ctx.font = '400 28px "Noto Sans Kannada", "Anek Kannada", "Georgia", serif';
    ctx.fillStyle = '#FFFFFF';
    const maxWidth = 820;
    const lineHeight = 44;
    const lines = this.wrapText(ctx, wishText, maxWidth);

    lines.forEach(line => {
      ctx.fillText(line, w / 2, currentY);
      currentY += lineHeight;
    });

    // 9. Sender Sign-Off
    currentY += 40;
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 140, currentY);
    ctx.lineTo(w / 2 + 140, currentY);
    ctx.stroke();

    currentY += 48;
    ctx.font = 'italic 24px "Noto Sans Kannada", "Cinzel", serif';
    ctx.fillStyle = '#E6C687';
    const wishFromLabel = isKannada ? 'ಹಾರ್ದಿಕ ಶುಭ ಹಾರೈಕೆಗಳೊಂದಿಗೆ' : 'Warm Festive Wishes & Blessings From';
    ctx.fillText(wishFromLabel, w / 2, currentY);

    currentY += 46;
    const senderName = sender && sender.trim() !== '' ? sender.trim() : (isKannada ? 'ನಿಮ್ಮ ಆತ್ಮೀಯರು' : 'Well Wisher');
    ctx.font = 'bold 38px "Anek Kannada", "Noto Sans Kannada", "Cinzel", serif';
    ctx.fillStyle = '#FFE066';
    ctx.shadowColor = '#FF9900';
    ctx.shadowBlur = 12;
    ctx.fillText(senderName, w / 2, currentY);
    ctx.shadowBlur = 0;

    // 10. Bottom Footer Stamp
    ctx.font = '22px "Noto Sans Kannada", "Georgia", serif';
    ctx.fillStyle = 'rgba(255, 215, 0, 0.7)';
    ctx.fillText('✨ ಬಲೀಂದ್ರನ ಕೃಪೆ ಮತ್ತು ಮಹಾಲಕ್ಷ್ಮಿಯ ಆಶೀರ್ವಾದ ಸದಾ ನಿಮ್ಮೊಂದಿಗಿರಲಿ ✨', w / 2, h - 75);

    return this.canvas.toDataURL('image/png');
  }

  drawOrnateBorders(ctx, w, h) {
    const pad = 42;
    const innerPad = 54;

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);

    ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(innerPad, innerPad, w - innerPad * 2, h - innerPad * 2);

    const corners = [
      { x: innerPad, y: innerPad, rot: 0 },
      { x: w - innerPad, y: innerPad, rot: Math.PI / 2 },
      { x: w - innerPad, y: h - innerPad, rot: Math.PI },
      { x: innerPad, y: h - innerPad, rot: -Math.PI / 2 }
    ];

    corners.forEach(c => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      ctx.fillStyle = '#FFD700';

      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI / 2);
      ctx.strokeStyle = '#FFE066';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(18, 18);
      ctx.lineTo(26, 18);
      ctx.lineTo(18, 26);
      ctx.closePath();
      ctx.fillStyle = '#FF9900';
      ctx.fill();

      ctx.restore();
    });
  }

  drawDiya(ctx, cx, cy) {
    ctx.save();
    ctx.translate(cx, cy);

    // Diya Brass Base
    const diyaGrad = ctx.createLinearGradient(0, 0, 0, 45);
    diyaGrad.addColorStop(0, '#FFE066');
    diyaGrad.addColorStop(0.5, '#CC8800');
    diyaGrad.addColorStop(1, '#8B4500');

    ctx.fillStyle = diyaGrad;
    ctx.beginPath();
    ctx.moveTo(-70, 0);
    ctx.quadraticCurveTo(0, 65, 70, 0);
    ctx.quadraticCurveTo(80, 5, 0, 15);
    ctx.quadraticCurveTo(-80, 5, -70, 0);
    ctx.fill();

    // Diya Rim highlight
    ctx.strokeStyle = '#FFF5BA';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 68, 14, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Oil / Wick
    ctx.fillStyle = '#3E1C00';
    ctx.beginPath();
    ctx.ellipse(0, 0, 60, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Radiant Flame Outer Glow
    const flameGlow = ctx.createRadialGradient(0, -35, 5, 0, -35, 70);
    flameGlow.addColorStop(0, 'rgba(255, 230, 80, 0.85)');
    flameGlow.addColorStop(0.4, 'rgba(255, 100, 0, 0.4)');
    flameGlow.addColorStop(1, 'rgba(255, 50, 0, 0)');
    ctx.fillStyle = flameGlow;
    ctx.beginPath();
    ctx.arc(0, -35, 70, 0, Math.PI * 2);
    ctx.fill();

    // Main Flame
    const flameGrad = ctx.createLinearGradient(0, 0, 0, -75);
    flameGrad.addColorStop(0, '#FF4500');
    flameGrad.addColorStop(0.4, '#FFA500');
    flameGrad.addColorStop(0.8, '#FFFF66');
    flameGrad.addColorStop(1, '#FFFFFF');

    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-26, -20, -22, -55, 0, -82);
    ctx.bezierCurveTo(22, -55, 26, -20, 0, 0);
    ctx.fill();

    // Flame Core
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.bezierCurveTo(-10, -18, -8, -45, 0, -62);
    ctx.bezierCurveTo(8, -45, 10, -18, 0, -5);
    ctx.fill();

    ctx.restore();
  }

  wrapText(ctx, text, maxWidth) {
    const paragraphs = text.split('\n');
    const resultLines = [];

    paragraphs.forEach(paragraph => {
      const words = paragraph.split(' ');
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          resultLines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        resultLines.push(currentLine);
      }
    });

    return resultLines;
  }

  async downloadCard(sender, recipient, wishText, isKannada = true) {
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn('Font loading check bypassed:', e);
      }
    }
    const dataUrl = this.generate(sender, recipient, wishText, isKannada);
    const link = document.createElement('a');
    const namePart = recipient ? recipient.trim().replace(/\s+/g, '-') : 'Karnataka';
    link.download = `Deepavali-Karnataka-Wishes-${namePart}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

window.cardGenerator = new CardGenerator();
