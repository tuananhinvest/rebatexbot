const { t, getLang } = require('../i18n');
const { backToMainKeyboard } = require('../keyboards/mainMenu');

async function showVipSignals(ctx) {
  const lang = getLang(ctx);

  await ctx.editMessageText(t(lang, 'vip_signals_text'), {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
    ...backToMainKeyboard(lang),
  });
}

module.exports = { showVipSignals };
