async function showVipSignals(ctx) {
  const text =
    `📊 *VIP SIGNALS*\n\n` +
    `Nhận tín hiệu giao dịch chất lượng cao, cập nhật realtime từ đội ngũ phân tích chuyên nghiệp.\n\n` +
    `✅ Tín hiệu Long/Short kèm điểm vào lệnh / chốt lời / cắt lỗ\n` +
    `✅ Phân tích thị trường hàng ngày\n` +
    `✅ Hỗ trợ riêng qua nhóm VIP\n\n` +
    `👉 Đăng ký hoàn phí qua bot (chọn một sàn ở menu chính) để được thêm vào nhóm VIP SIGNALS miễn phí!`;

  await ctx.replyWithMarkdown(text);
}

module.exports = { showVipSignals };
