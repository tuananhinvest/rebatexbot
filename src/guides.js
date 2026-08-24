// Mỗi sàn có nội dung hướng dẫn riêng, theo từng ngôn ngữ.
// Key ngoài cùng = exchange id (phải khớp với id trong config/exchanges.js)
// Nếu thiếu 1 ngôn ngữ nào đó, hệ thống sẽ tự fallback sang bản tiếng Anh (en).

const GUIDES = {
  bingx: {
    en: `*How to Register a BINGX Account with 45% Fee Rebate*\n\n` +
      `*Case 1: Already have a BingX account under another referral*\n` +
      `↳ Register new account: https://bingxdao.com/partner/rebatex/\n` +
      `↳ After creating the new account, log in to your old one and transfer your verified identity to the new account.\n\n` +
      `*Case 2: Have a BingX account but not under any referral*\n` +
      `↳ Simply send your UID to @AlexVance\n`+
      `↳ We’ll register your UID for lifetime rebates directly.\n\n`+
      `*Case 3: Don’t have a BingX account yet*\n`+
      `↳ Just register a new account using the official Rebate X link:\n`+
      `https://bingxdao.com/partner/rebatex/\n`+
      `↳ Then trade as usual — your rebates will be automatically tracked and paid every month.\n\n`,
    th: ``,
    id: ``,
    tr: ``,
  },

  mexc: {
    en: `*How to Register a MEXC Account with 40% Fee Rebate*\n\n`+
      `On MEXC, each verified ID can register up to 10 accounts, so you can simply create a new one using the official Rebate X link below:\n`+
      `↳ Register here: https://www.mexc.co/acquisition/custom-sign-up?shareCode=mexc-rebatex\n`+
      `↳ Referral Code: \`mexc-rebatex\`\n`,
    th: ``,
    id: ``,
    tr: ``,
  },

  gate: {
    en: `*How to Register a Gate Account with 50% Fee Rebate*\n\n`
      + `*Case 1: Don’t have a Gate account yet*\n`+
      `↳ Simply register a new account using the official Rebate X link:\n`+
      `https://www.gate.com/share/REBATEXX\n`+
      `↳ Complete your account setup and start trading — your 50% rebates will be tracked and credited automatically.\n\n`+
      `*Case 2: Already have a Gate account*\n`+
      `↳ You must close/delete your old account and create a brand-new one using a new email address or phone number.\n`+
      `Register your new account via:\n`+
      `https://www.gate.com/share/REBATEXX\n`+
      `↳ Complete KYC verification for the new account.\n\n`+
      `⚠️ Important KYC Tip: It is highly recommended to use a different ID document than your old account (e.g., if your old account was verified with a National ID/CCCD, use a Driver’s License or Passport for the new one) to ensure seamless verification.`,
    th: ``,
    id: ``,
    tr: ``,
  },

  bybit: {
    en: `*How to Register a BYBIT Account with 40% Fee Rebate*\n\n`+
      `*Case 1: Don’t have a Bybit account yet*\n`+
      `Simply register a new account using the official Rebate X link:\nhttps://partner.bybit.com/b/REBATEX\n`+
      `Complete your account setup and start trading — your 40% rebates will be tracked and credited automatically every week.\n\n`+
      `*Case 2: Already have a Bybit account*\n`+
      `↳ Option A: Log in to your existing account and transfer your identity verification to the new account created via: https://partner.bybit.com/b/REBATEX\n`+
      `(Use the "Transfer Identity Verification" feature in the Bybit app).\n\n`+
      `↳ Option B: If your account is not eligible for identity transfer, simply close/delete your old account, then register a new one using a new email address or phone number via: https://partner.bybit.com/b/REBATEX\n`+
      `Complete KYC verification for the new account to finish setup.`,
    th: ``,
    id: ``,
    tr: ``,
  },

  weex: {
    en: `*How to Register a WEEX Account with 50% Fee Rebate*\n\n`+
      `Register a new account via the official Rebate X link:\n`+
      `↳ Register here: https://www.weex.com/en/register?vipCode=weexrebate\n`+
      `↳ Referral Code: \`weexrebate\`\n\n`+
      `Once registered, start trading — your 50% fee rebates will be automatically tracked and credited to your account after every trade.`,
    th: ``,
    id: ``,
    tr: ``,
  },

  vantage: {
    en: `*How to Register a Vantage Account with 100% Commission Rebate*\n\n`+
      `*Case 1: Don’t have a Vantage account yet*\n`+
      `↳ Simply register a new account using the official Rebate X link:\n`+
      `https://vigco.co/la-com-inv/vi/GOLDBTC\n`+
      `↳ Complete your verification, make a deposit, and start trading — your commission rebates will be credited automatically.\n\n`+
      `*Case 2: Already have a Vantage account*\n`+
      `↳ Contact Support Admin @AlexVance directly on Telegram.\n`+
      `↳ We will guide you through the fast-track process to link your existing account or transfer your IB under Rebate X to activate your 100% rebate instantly.`,
    th: ``,
    id: ``,
    tr: ``,
  },
};

/**
 * Lấy nội dung hướng dẫn cho một sàn theo ngôn ngữ.
 * Nếu thiếu ngôn ngữ đó -> fallback về tiếng Anh.
 * Nếu sàn chưa có guide nào -> trả về null (caller tự xử lý fallback "no_guide").
 */
function getGuide(exchange, lang) {
  const set = GUIDES[exchange.id];
  if (!set) return null;
  return set[lang] || set.en || null;
}

module.exports = { getGuide };