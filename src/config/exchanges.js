const EXCHANGES = [
  {
    id: 'bingx', name: 'BingX', market: 'crypto', rebate: '45%',
    makerFee: 0.0002, takerFee: 0.0005,
    refLink: 'https://bingxdao.com/partner/rebatex/',
    mechanism: '45% of trading fees will be automatically rebated daily directly into your account'
  },
  {
    id: 'mexc', name: 'MEXC', market: 'crypto', rebate: '40%',
    makerFee: 0.0000, takerFee: 0.0005,
    refLink: 'https://www.mexc.co/acquisition/custom-sign-up?shareCode=mexc-rebatex',
    mechanism: 'Rebate X offers a total 40% trading-fee rebate for MEXC users:\n- *20% Instant Auto-Rebate* — applied instantly by MEXC (maximum allowed by the exchange).\n- *20% Monthly Rebate* — paid by Rebate X at the beginning of each month.\nThat means you receive the full 40% of your trading fees back — transparent and verifiable every month.'
  },
  {
    id: 'gate', name: 'Gate', market: 'crypto', rebate: '50%',
    makerFee: 0.0002, takerFee: 0.0005,
    refLink: 'https://www.gate.com/share/REBATEXX',
    mechanism: 'Rebate X offers a 50% total fee rebate for Gate traders:\n- *20% Instant Auto-Rebate* — Applied automatically per trade by Gate.io (maximum system limit allowed by the exchange).\n- *30% Monthly Rebate* — Credited directly to your account by Rebate X at the start of every month.\nThat means you receive the full 50% of your trading fees back — transparent and verifiable every month. '
  },
  {
    id: 'bybit', name: 'Bybit', market: 'crypto', rebate: '40%',
    makerFee: 0.0002, takerFee: 0.00055,
    refLink: 'https://partner.bybit.com/b/REBATEX',
    mechanism: '40% Weekly Rebate — Because Bybit does not support automatic daily rebates, Rebate X credits 40% of your total trading fees directly to your Bybit account every week via internal transfer.'
  },
  {
    id: 'weex', name: 'WEEX', market: 'crypto', rebate: '50%',
    makerFee: 0.0002, takerFee: 0.0008,
    refLink: 'https://www.weex.com/en/register?vipCode=weexrebate',
    mechanism: '50% Instant Auto-Rebate — Applied automatically to your account right after every trade.'
  },
  {
    id: 'vantage', name: 'Vantage', market: 'forex', rebate: '100%',
    feePerLot: 11, feeCurrency: 'USD',
    refLink: 'https://www.vantagemarkets.com/?affid=YOUR_REF_CODE',
    mechanism: '*100% Commission Cashback* — We pass 100% of the partner commission generated from your trading volume back to you.'
  },
];

function calculateRebate(exchangeId, params = {}) {
  const exchange = EXCHANGES.find((e) => e.id === exchangeId);
  if (!exchange) throw new Error(`Exchange not found: ${exchangeId}`);

  const rebatePercent = parseFloat(exchange.rebate) / 100;

  if (exchange.market === 'crypto') {
    const { volume, feeType = 'taker' } = params;
    if (!volume || volume <= 0) throw new Error('Missing or invalid volume');
    const feeRate = feeType === 'maker' ? exchange.makerFee : exchange.takerFee;
    const fee = volume * feeRate;
    return { market: 'crypto', fee, rebateAmount: fee * rebatePercent, rebatePercent: rebatePercent * 100, currency: 'USDT' };
  }

  if (exchange.market === 'forex') {
    const { lots } = params;
    if (!lots || lots <= 0) throw new Error('Missing or invalid lot size');
    const fee = lots * exchange.feePerLot;
    return { market: 'forex', fee, rebateAmount: fee * rebatePercent, rebatePercent: rebatePercent * 100, currency: exchange.feeCurrency };
  }

  throw new Error(`Invalid market: ${exchange.market}`);
}

/**
 * Tính khoảng phí giao dịch và khoảng hoàn phí cho sàn crypto,
 * dựa trên volume nhập vào, dùng cả makerFee và takerFee làm 2 đầu mút.
 * Không cần người dùng chọn maker/taker.
 *
 * @param {string} exchangeId - id sàn crypto trong EXCHANGES
 * @param {number} volume - khối lượng giao dịch (USDT)
 * @returns {{ market: 'crypto', feeMin: number, feeMax: number, rebateMin: number, rebateMax: number, rebatePercent: number, currency: string }}
 */
function calculateRebateRange(exchangeId, volume) {
  const exchange = EXCHANGES.find((e) => e.id === exchangeId);
  if (!exchange) throw new Error(`Exchange not found: ${exchangeId}`);
  if (exchange.market !== 'crypto') throw new Error('calculateRebateRange only applies to crypto exchanges');
  if (!volume || volume <= 0) throw new Error('Missing or invalid volume');

  const rebatePercent = parseFloat(exchange.rebate) / 100;

  const ROUND_TURN_MULTIPLIER = 2; // phí tính cả lúc mở lệnh và đóng lệnh

  const feeAtMaker = volume * exchange.makerFee * ROUND_TURN_MULTIPLIER;
  const feeAtTaker = volume * exchange.takerFee * ROUND_TURN_MULTIPLIER;
  const feeMin = Math.min(feeAtMaker, feeAtTaker);
  const feeMax = Math.max(feeAtMaker, feeAtTaker);

  return {
    market: 'crypto',
    feeMin,
    feeMax,
    rebateMin: feeMin * rebatePercent,
    rebateMax: feeMax * rebatePercent,
    rebatePercent: rebatePercent * 100,
    currency: 'USDT',
  };
}

module.exports = { EXCHANGES, calculateRebate, calculateRebateRange };