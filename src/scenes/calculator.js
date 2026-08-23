const { Scenes, Markup } = require('telegraf');
const { EXCHANGES, calculateRebate } = require('../config/exchanges');
const { t, getLang } = require('../i18n');

const calculatorScene = new Scenes.WizardScene(
  'calculator-wizard',

  async (ctx) => {
    const lang = getLang(ctx);
    const buttons = EXCHANGES.map((e) => Markup.button.callback(e.name, `CALC_EX_${e.id}`));
    const rows = [];
    for (let i = 0; i < buttons.length; i += 2) rows.push(buttons.slice(i, i + 2));

    await ctx.reply(t(lang, 'calc_choose_exchange'), Markup.inlineKeyboard(rows));
    return ctx.wizard.next();
  },

  async (ctx) => {
    const lang = getLang(ctx);

    if (ctx.message?.text === '/cancel') {
      await ctx.reply(t(lang, 'calc_cancelled'));
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

    let result;
    if (exchange.market === 'forex') {
      result = calculateRebate(exchange.id, { lots: value });
      await ctx.replyWithMarkdown(
        t(lang, 'calc_result_forex', {
          name: exchange.name,
          lots: value,
          feePerLot: exchange.feePerLot,
          currency: result.currency,
          fee: result.fee.toFixed(2),
          rebate: exchange.rebate,
          rebateAmount: result.rebateAmount.toFixed(2),
        })
      );
    } else {
      const feeType = ctx.wizard.state.feeType || 'taker';
      result = calculateRebate(exchange.id, { volume: value, feeType });
      const feeRate = feeType === 'maker' ? exchange.makerFee : exchange.takerFee;

      await ctx.replyWithMarkdown(
        t(lang, 'calc_result_crypto', {
          name: exchange.name,
          volume: value.toLocaleString('en-US'),
          feeType,
          feeRate: (feeRate * 100).toFixed(3),
          currency: result.currency,
          fee: result.fee.toFixed(2),
          rebate: exchange.rebate,
          rebateAmount: result.rebateAmount.toFixed(2),
        })
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

  if (exchange.market === 'forex') {
    await ctx.editMessageText(t(lang, 'calc_enter_lots_prompt', { name: exchange.name }), { parse_mode: 'Markdown' });
  } else {
    await ctx.editMessageText(t(lang, 'calc_enter_volume_prompt', { name: exchange.name }), { parse_mode: 'Markdown' });
  }
});

calculatorScene.command('maker', async (ctx) => {
  const lang = getLang(ctx);
  ctx.wizard.state.feeType = 'maker';
  await ctx.reply(t(lang, 'maker_switched'));
});

calculatorScene.command('cancel', async (ctx) => {
  const lang = getLang(ctx);
  await ctx.reply(t(lang, 'calc_cancelled'));
  return ctx.scene.leave();
});

module.exports = calculatorScene;