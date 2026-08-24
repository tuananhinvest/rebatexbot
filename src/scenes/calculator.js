const { Scenes, Markup } = require('telegraf');
const { EXCHANGES, calculateRebate, calculateRebateRange } = require('../config/exchanges');
const { t, getLang } = require('../i18n');
const { backToMainKeyboard } = require('../keyboards/mainMenu');
const { sendMainMenu } = require('../helpers/render');

const calculatorScene = new Scenes.WizardScene(
  'calculator-wizard',

  // Step 1: choose exchange - edit ngay trên tin nhắn menu chính (từ nút Calculator)
  async (ctx) => {
    const lang = getLang(ctx);
    const buttons = EXCHANGES.map((e) => Markup.button.callback(e.name, `CALC_EX_${e.id}`));
    const rows = [];
    for (let i = 0; i < buttons.length; i += 2) rows.push(buttons.slice(i, i + 2));
    rows.push([Markup.button.callback(t(lang, 'back_btn'), 'BACK_MAIN')]);

    await ctx.editMessageText(t(lang, 'calc_choose_exchange'), Markup.inlineKeyboard(rows));
    return ctx.wizard.next();
  },

  // Step 2: sau khi chọn sàn (action bên dưới đã gửi tin nhắn mới hỏi nhập số),
  // nhận volume/lots và tính toán, trả kết quả bằng tin nhắn mới.
  async (ctx) => {
    const lang = getLang(ctx);

    if (ctx.message?.text === '/cancel') {
      await ctx.reply(t(lang, 'calc_cancelled'), backToMainKeyboard(lang));
      return ctx.scene.leave();
    }

    if (!ctx.wizard.state.exchangeId) {
      await ctx.reply(t(lang, 'calc_choose_first'));
      return;
    }

    const exchange = EXCHANGES.find((e) => e.id === ctx.wizard.state.exchangeId);
    const raw = ctx.message?.text?.replace(/,/g, '').trim();
    const value = parseFloat(raw);

    if (isNaN(value) || value <= 0) {
      await ctx.reply(t(lang, exchange.market === 'forex' ? 'calc_invalid_lots' : 'calc_invalid_volume'));
      return;
    }

    if (exchange.market === 'forex') {
      const result = calculateRebate(exchange.id, { lots: value });
      await ctx.replyWithMarkdown(
        t(lang, 'calc_result_forex', {
          name: exchange.name,
          lots: value,
          feePerLot: exchange.feePerLot,
          currency: result.currency,
          fee: result.fee.toFixed(2),
          rebate: exchange.rebate,
          rebateAmount: result.rebateAmount.toFixed(2),
        }),
        backToMainKeyboard(lang)
      );
    } else {
      // Crypto: tính khoảng phí/rebate dựa trên cả maker và taker, không cần chọn loại lệnh
      const result = calculateRebateRange(exchange.id, value);

      await ctx.replyWithMarkdown(
        t(lang, 'calc_result_crypto_range', {
          name: exchange.name,
          volume: value.toLocaleString('en-US'),
          currency: result.currency,
          feeMin: result.feeMin.toFixed(2),
          feeMax: result.feeMax.toFixed(2),
          makerFeePct: (exchange.makerFee * 100).toFixed(3),
          takerFeePct: (exchange.takerFee * 100).toFixed(3),
          rebate: exchange.rebate,
          rebateMin: result.rebateMin.toFixed(2),
          rebateMax: result.rebateMax.toFixed(2),
        }),
        backToMainKeyboard(lang)
      );
    }

    return ctx.scene.leave();
  }
);

calculatorScene.action(/CALC_EX_(.+)/, async (ctx) => {
  const lang = getLang(ctx);
  const exchangeId = ctx.match[1];
  ctx.wizard.state.exchangeId = exchangeId;
  await ctx.answerCbQuery();

  const exchange = EXCHANGES.find((e) => e.id === exchangeId);
  const promptKey = exchange.market === 'forex' ? 'calc_enter_lots_prompt' : 'calc_enter_volume_prompt';

  // Gửi tin nhắn mới hỏi nhập volume/lot, thay vì edit tin nhắn danh sách sàn.
  await ctx.replyWithMarkdown(t(lang, promptKey, { name: exchange.name }), backToMainKeyboard(lang));
});

// Back button - có thể bấm ở bước chọn sàn (edit) hoặc ở kết quả cuối (gửi kèm keyboard)
calculatorScene.action('BACK_MAIN', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.scene.leave();
  await sendMainMenu(ctx, { edit: true });
});

calculatorScene.command('cancel', async (ctx) => {
  const lang = getLang(ctx);
  await ctx.reply(t(lang, 'calc_cancelled'));
  return ctx.scene.leave();
});

module.exports = calculatorScene;
