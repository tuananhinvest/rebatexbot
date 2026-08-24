const { t, getLang } = require('../i18n');
const { mainMenuKeyboard } = require('../keyboards/mainMenu');

/**
 * Hiển thị menu chính. Dùng chung cho:
 * - Nút "Back" từ trang chi tiết sàn (edit tin nhắn hiện tại)
 * - Nút "Back" từ VIP Signals / Calculator (edit tin nhắn hiện tại)
 * - Lệnh /menu (gửi tin nhắn mới)
 *
 * @param {object} ctx - Telegraf context
 * @param {object} options
 *   - edit: true -> dùng editMessageText (áp dụng cho callback trên tin nhắn có sẵn)
 *           false -> dùng reply (gửi tin nhắn mới, ví dụ từ lệnh /menu)
 */
async function sendMainMenu(ctx, { edit = false } = {}) {
  const lang = getLang(ctx);
  const text = t(lang, 'welcome');
  const extra = {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
    ...mainMenuKeyboard(lang),
  };

  if (edit) {
    await ctx.editMessageText(text, extra);
  } else {
    await ctx.reply(text, extra);
  }
}

module.exports = { sendMainMenu };
