require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');

const { EXCHANGES } = require('./config/exchanges');
const { getGuide } = require('./guides');
const { t, getLang, SUPPORTED_LANGS } = require('./i18n');
const { mainMenuKeyboard, exchangeDetailKeyboard, guideKeyboard, languageKeyboard } = require('./keyboards/mainMenu');
const { sendMainMenu } = require('./helpers/render');
const calculatorScene = require('./scenes/calculator');
const { showVipSignals } = require('./handlers/vipSignals');
const db = require('./db');

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error('❌ Missing BOT_TOKEN in .env file (see .env.example)');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

const stage = new Scenes.Stage([calculatorScene]);

bot.use(session());
bot.use(stage.middleware());

// ---------- /start ----------
bot.start(async (ctx) => {
  const result = await db.addOrUpdateUser({
    telegramId: ctx.from.id,
    username: ctx.from.username || null,
    name: [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' ') || null,
  });

  if (process.env.ADMIN_CHAT_ID) {
    const label = result.created ? '🆕 User mới' : '🔁 User quay lại';
    const displayName = [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' ') || 'N/A';
    const usernameText = ctx.from.username ? `@${ctx.from.username}` : '(không có username)';

    ctx.telegram
      .sendMessage(
        process.env.ADMIN_CHAT_ID,
        `${label}\n` +
          `👤 Tên: ${displayName}\n` +
          `🔗 Username: ${usernameText}\n` +
          `🆔 Telegram ID: ${ctx.from.id}`
      )
      .catch((err) => console.error('Không gửi được thông báo admin:', err.message));
  }

  // Lần đầu chưa chọn ngôn ngữ -> bắt chọn trước
  if (!ctx.session.lang) {
    await ctx.reply(t('en', 'choose_language'), languageKeyboard());
    return;
  }

  const lang = getLang(ctx);
  await ctx.replyWithMarkdown(
    t(lang, 'welcome', { name: ctx.from.first_name || 'trader' }),
    {
      disable_web_page_preview: true,
      ...mainMenuKeyboard(lang),
    }
  );
});

// ---------- Đổi ngôn ngữ ----------
bot.action('CHANGE_LANG', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(t(getLang(ctx), 'choose_language'), languageKeyboard());
});

bot.command('language', async (ctx) => {
  await ctx.reply(t(getLang(ctx), 'choose_language'), languageKeyboard());
});

bot.action(/LANG_(.+)/, async (ctx) => {
  const langCode = ctx.match[1];
  if (!SUPPORTED_LANGS.some((l) => l.code === langCode)) return ctx.answerCbQuery();

  ctx.session.lang = langCode;
  const langInfo = SUPPORTED_LANGS.find((l) => l.code === langCode);
  await ctx.answerCbQuery(t(langCode, 'language_set', { lang: langInfo.name }));

  await ctx.editMessageText(
    t(langCode, 'welcome', { name: ctx.from.first_name || 'trader' }),
    {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
      ...mainMenuKeyboard(langCode),
    }
  );
});

// ---------- Chọn một sàn ----------
bot.action(/EXCHANGE_(.+)/, async (ctx) => {
  const lang = getLang(ctx);
  const exchangeId = ctx.match[1];
  const exchange = EXCHANGES.find((e) => e.id === exchangeId);
  if (!exchange) return ctx.answerCbQuery(t(lang, 'exchange_not_found'));

  await ctx.answerCbQuery();

  let feeInfo;
  if (exchange.market === 'forex') {
    feeInfo = t(lang, 'fee_per_lot', { value: exchange.feePerLot, currency: exchange.feeCurrency });
    feeInfo = '';
  } else {
    feeInfo =
      t(lang, 'maker_fee', { value: (exchange.makerFee * 100).toFixed(3) }) +
      t(lang, 'taker_fee', { value: (exchange.takerFee * 100).toFixed(3) });
  }

  const text = t(lang, 'exchange_detail', { name: exchange.name, mechanism: exchange.mechanism, rebate: exchange.rebate, feeInfo });

  await ctx.editMessageText(text, {
    parse_mode: 'Markdown',
    ...exchangeDetailKeyboard(exchangeId, lang),
  });
});

// ---------- Guide ----------
bot.action(/GUIDE_(.+)/, async (ctx) => {
  const lang = getLang(ctx);
  const exchangeId = ctx.match[1];
  const exchange = EXCHANGES.find((e) => e.id === exchangeId);
  if (!exchange) return ctx.answerCbQuery(t(lang, 'exchange_not_found'));

  await ctx.answerCbQuery();

  const guideText = getGuide(exchange, lang) || t(lang, 'no_guide', { name: exchange.name });

  await ctx.editMessageText(guideText, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
    ...guideKeyboard(exchangeId, lang),
  });
});

// ---------- Quay lại menu chính ----------
bot.action('BACK_MAIN', async (ctx) => {
  const lang = getLang(ctx);
  await ctx.answerCbQuery();
  await sendMainMenu(ctx, { edit: true });
  //await ctx.editMessageText(
  //  t(lang, 'welcome', { name: ctx.from.first_name || 'trader' }),
  //  {
  //    parse_mode: 'Markdown',
  //    disable_web_page_preview: true,
  //    ...mainMenuKeyboard(lang),
  //  }
  //);
});

// ---------- VIP SIGNALS ----------
bot.action('VIP_SIGNALS', async (ctx) => {
  await ctx.answerCbQuery();
  await showVipSignals(ctx);
});

// ---------- Calculator ----------
bot.action('CALCULATOR', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.scene.enter('calculator-wizard');
});

// ---------- Lệnh phụ trợ ----------
bot.command('menu', async (ctx) => {
  //const lang = getLang(ctx);
  //await ctx.reply(t(lang, 'menu_prompt'), mainMenuKeyboard(lang));
  await sendMainMenu(ctx, { edit: false });
});

bot.help(async (ctx) => {
  await ctx.reply(t(getLang(ctx), 'help_text'));
});

bot.catch((err, ctx) => {
  console.error(`⚠️ Error while handling ${ctx.updateType} update from user ${ctx.from?.id}:`, err);
});

bot.launch().then(() => {
  console.log('🤖 Bot started (long polling)...');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));