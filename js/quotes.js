/**
 * Karnataka Deepavali Curated Greetings & Quotes (ಕನ್ನಡ & English)
 * Rich collection of traditional Kannada Deepavali wishes,
 * vachanas, shlokas, and English festive greetings reflecting Karnataka's culture.
 */

const DIWALI_WISHES = {
  kannada: [
    {
      title: "ಸಮೃದ್ಧಿ ಮತ್ತು ಸಂತಸ (Prosperity & Joy)",
      text: "ಹಣತೆಯ ಬೆಳಕು ನಿಮ್ಮ ಬಾಳಿನ ಕತ್ತಲೆಯನ್ನು ಓಡಿಸಿ, ಸುಖ, ಶಾಂತಿ, ನೆಮ್ಮದಿ ಮತ್ತು ಸಮೃದ್ಧಿಯ ಬೆಳಕನ್ನು ತರಲಿ. ನಿಮಗೂ ನಿಮ್ಮ ಸಮಸ್ತ ಕುಟುಂಬದವರಿಗೂ ದೀಪಾವಳಿ ಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು!",
      tag: "ಸಾಂಪ್ರದಾಯಿಕ"
    },
    {
      title: "ಬಲಿಪಾಡ್ಯಮಿ ಹಾಗೂ ಗೋಪೂಜೆ (Bali Padyami & Gau Pooja)",
      text: "ಬಲೀಂದ್ರನ ತ್ಯಾಗ, ಗೋಮಾತೆಯ ಪವಿತ್ರ ಕೃಪೆ ಹಾಗೂ ಸಿರಿ ಮಹಾಲಕ್ಷ್ಮಿಯ ದಿವ್ಯ ಆಶೀರ್ವಾದ ಸದಾ ನಿಮ್ಮ ಮೇಲಿರಲಿ. ಬಲಿಪಾಡ್ಯಮಿ ಹಾಗೂ ದೀಪಾವಳಿ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು!",
      tag: "ಬಲಿಪಾಡ್ಯಮಿ"
    },
    {
      title: "ಅಭ್ಯಂಜನ ಸ್ನಾನ ಹಾಗೂ ನರಕ ಚತುರ್ದಶಿ (Enne Shastra)",
      text: "ನರಕ ಚತುರ್ದಶಿಯ ಪವಿತ್ರ ಎಣ್ಣೆ ಶಾಸ್ತ್ರ ಮತ್ತು ಅಭ್ಯಂಜನ ಸ್ನಾನ ನಿಮ್ಮ ಎಲ್ಲಾ ದುರಿತಗಳನ್ನು ಕಳೆಯಲಿ. ಅಜ್ಞಾನದ ಕತ್ತಲೆ ಸರಿದು ಜ್ಞಾನದ ದೀಪ ಬೆಳಗಲಿ. ಶುಭ ದೀಪಾವಳಿ!",
      tag: "ನರಕ ಚತುರ್ದಶಿ"
    },
    {
      title: "ಸಿರಿ ಸಂಪತ್ತು - ಧನಲಕ್ಷ್ಮೀ ಕೃಪೆ (Dhanalakshmi Blessings)",
      text: "ಮನೆಯಂಗಳದಲ್ಲಿ ರಂಗೋಲಿ, ಹೊಸ್ತಿಲಲ್ಲಿ ಹಣತೆಯ ಸಾಲು, ಮನದಲ್ಲಿ ಹರುಷದ ಹೊನಲು! ಧನಲಕ್ಷ್ಮಿ ಸದಾ ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ನೆಲೆಸಲಿ. ದೀಪಾವಳಿ ಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭ ಹಾರೈಕೆಗಳು!",
      tag: "ಲಕ್ಷ್ಮೀ ಪೂಜೆ"
    },
    {
      title: "ತಮಸೋಮಾ ಜ್ಯೋತಿರ್ಗಮಯ (Vedic Light)",
      text: "ಕತ್ತಲೆಯಿಂದ ಬೆಳಕಿನೆಡೆಗೆ, ಅಜ್ಞಾನದಿಂದ ಜ್ಞಾನದೆಡೆಗೆ ನಮ್ಮನ್ನು ಮುನ್ನಡೆಸಲಿ. ದೀಪಗಳ ಹಬ್ಬ ದೀಪಾವಳಿಯು ನಿಮ್ಮೆಲ್ಲಾ ಆಸೆ-ಆಕಾಂಕ್ಷೆಗಳನ್ನು ಈಡೇರಿಸಲಿ!",
      tag: "ಆಶೀರ್ವಾದ"
    }
  ],

  english: [
    {
      title: "Divine Light & Prosperity",
      text: "May the divine glow of sacred diyas illuminate your home and life with abundant health, peace, wealth, and boundless joy. Wishing you and your family a very Happy Deepavali!",
      tag: "Blessings"
    },
    {
      title: "Karnataka's Bali Padyami & Gau Pooja",
      text: "May the sacred spirit of Bali Padyami and the maternal grace of Kamadhenu Gau Pooja bring eternal harmony, auspicious beginnings, and sweet togetherness to your abode.",
      tag: "Bali Padyami"
    },
    {
      title: "Triumph of Goodness (Naraka Chaturdashi)",
      text: "As we celebrate the sacred dawn of Naraka Chaturdashi with the cleansing holy oil bath, may every shadow of adversity disappear from your path. Happy Deepavali!",
      tag: "Festive"
    },
    {
      title: "Sweet Delicacies & Warm Wishes",
      text: "From the aroma of fresh Holige and Kajjaya to the glittering lights of Akasha Deepa, may this festive season fill your heart with sweetness and unforgettable memories.",
      tag: "Celebration"
    }
  ],

  shlokas: [
    {
      title: "ದೀಪಜ್ಯೋತಿ ನಮೋಸ್ತುತೇ (Deepa Jyoti Stotram)",
      shloka: "ಶುಭಂ ಕರೋತಿ ಕಲ್ಯಾಣಂ ಆರೋಗ್ಯಂ ಧನಸಂಪದಾ ।\nಶತ್ರುಬುದ್ಧಿ ವಿನಾಶಾಯ ದೀಪಜ್ಯೋತಿರ್ನಮೋಽಸ್ತು ತೇ ॥",
      meaning: "Salutations to the supreme light of the Diya that bestows auspiciousness, vibrant health, and wealth; and dispels all negativity and ignorance.",
      tag: "ಸ್ತೋತ್ರ"
    },
    {
      title: "ಮಹಾಲಕ್ಷ್ಮೀ ಅಷ್ಟಕಮ್ (Mahalakshmi Vandana)",
      shloka: "ನಮಸ್ತೇಽಸ್ತು ಮಹಾಮಾಯೇ ಶ್ರೀಪೀಠೇ ಸುರಪೂಜಿತೇ ।\nಶಂಖಚಕ್ರಗದಾಹಸ್ತೇ ಮಹಾಲಕ್ಷ್ಮಿ ನಮೋಽಸ್ತು ತೇ ॥",
      meaning: "Salutations to Goddess Mahalakshmi, the Divine Mother seated on the sacred throne, worshipped by devas, bestowing boons and eternal abundance.",
      tag: "ಲಕ್ಷ್ಮೀ ಮಂತ್ರ"
    },
    {
      title: "ಬಲೀಂದ್ರ ಪ್ರಾರ್ಥನೆ (Balindra Pooja Shloka)",
      shloka: "ಬಲಿರಾಜ ನಮಸ್ತುಭ್ಯಂ ವಿರೋಚನಸುತ ಪ್ರಭೋ ।\nಭವಿಷ್ಯೇಂದ್ರ ಸುರಾರಾತೇ ಪೂಜೇಯಂ ಪ್ರತಿಗೃಹ್ಯತಾಮ್ ॥",
      meaning: "O King Bali, son of Virochana and future Indra, we welcome you to our homes on this auspicious Bali Padyami and offer our humble worship.",
      tag: "ಬಲೀಂದ್ರ ಪೂಜೆ"
    }
  ]
};

/**
 * Format a personalized greeting for WhatsApp and social sharing (Kannada & English)
 */
function createShareMessage(sender, recipient, wishText, customUrl, lang = 'kannada') {
  let msg = '';
  if (lang === 'kannada') {
    msg += `✨ 🪔 *ದೀಪಾವಳಿ ಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು* 🪔 ✨\n\n`;
    if (recipient) {
      msg += `ಆತ್ಮೀಯ *${recipient}* ಅವರಿಗೆ,\n\n`;
    }
    msg += `"${wishText}"\n\n`;
    if (sender) {
      msg += `ಹಾರ್ದಿಕ ಶುಭ ಹಾರೈಕೆಗಳೊಂದಿಗೆ:\n🌟 *${sender} ಮತ್ತು ಕುಟುಂಬದವರು* 🌟\n\n`;
    }
    msg += `🪔 ನಿಮ್ಮ ವಿಶೇಷ ದೀಪಾವಳಿ ಶುಭಾಶಯ ಮತ್ತು ಪಂಚ ದೀಪಗಳನ್ನು ಬೆಳಗಿಸಲು ಈ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ:\n${customUrl}\n\n`;
    msg += `✨ *ಶುಭ ದೀಪಾವಳಿ | Happy Deepavali* ✨`;
  } else {
    msg += `✨ 🪔 *HAPPY DEEPAVALI* 🪔 ✨\n\n`;
    if (recipient) {
      msg += `Dearest *${recipient}*,\n\n`;
    }
    msg += `"${wishText}"\n\n`;
    if (sender) {
      msg += `Warm festive wishes & prayers from:\n🌟 *${sender} & Family* 🌟\n\n`;
    }
    msg += `🪔 Click the link below to light the sacred Diyas and receive your Deepavali blessings:\n${customUrl}\n\n`;
    msg += `✨ *ದೀಪಾವಳಿ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು | Shubh Deepavali* ✨`;
  }
  return msg;
}

window.DIWALI_WISHES = DIWALI_WISHES;
window.createShareMessage = createShareMessage;
