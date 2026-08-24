const { Markup } = require('telegraf');
const { EXCHANGES } = require('../config/exchanges');
const { t, SUPPORTED_LANGS } = require('../i18n');

function languageKeyboard() {
  const buttons = SUPPORTED_LANGS.map((l) =>
    Markup.button.callback(`${l.flag} ${l.name}`, `LANG_${l.code}`)
  );
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) rows.push(buttons.slice(i, i + 2));
  return Markup.inlineKeyboard(rows);
}

function mainMenuKeyboard(lang) {
  const exchangeButtons = EXCHANGES.map((ex) =>
    Markup.button.callback(ex.name, `EXCHANGE_${ex.id}`)
  );

  const rows = [];
  for (let i = 0; i < exchangeButtons.length; i += 3) {
    rows.push(exchangeButtons.slice(i, i + 3));
  }

  rows.push([Markup.button.callback(t(lang, 'vip_signals_btn'), 'VIP_SIGNALS')]);
  rows.push([Markup.button.callback(t(lang, 'calculator_btn'), 'CALCULATOR')]);
  rows.push([Markup.button.callback(t(lang, 'language_btn'), 'CHANGE_LANG')]);

  return Markup.inlineKeyboard(rows);
}

function exchangeDetailKeyboard(exchangeId, lang) {
  const exchange = EXCHANGES.find((e) => e.id === exchangeId);
  const rows = [];

  if (exchange?.refLink) {
    rows.push([
      {
        text: t(lang, 'register_btn'),
        url: exchange.refLink,
        style: 'success', // 🧪 thử nghiệm - theo docs chính thức field này không được hỗ trợ
      },
    ]);
  }

  rows.push([Markup.button.callback(t(lang, 'guide_btn'), `GUIDE_${exchangeId}`)]);
  rows.push([Markup.button.callback(t(lang, 'back_btn'), 'BACK_MAIN')]);

  return Markup.inlineKeyboard(rows);
}

function guideKeyboard(exchangeId, lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(t(lang, 'back_btn'), `EXCHANGE_${exchangeId}`)],
  ]);
}

// Bàn phím chung: chỉ có 1 nút Back quay về menu chính.
// Dùng cho các màn hình "ngõ cụt" như VIP Signals, kết quả Calculator, v.v.
function backToMainKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(t(lang, 'back_btn'), 'BACK_MAIN')],
  ]);
}

module.exports = { mainMenuKeyboard, exchangeDetailKeyboard, guideKeyboard, languageKeyboard, backToMainKeyboard };