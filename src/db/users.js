const pool = require('./connection');

/**
 * Thêm user mới nếu chưa tồn tại, hoặc cập nhật username nếu đã đổi.
 * Gọi hàm này mỗi khi user bấm /start.
 *
 * @param {object} params
 *   - telegramId: number|string - Telegram user id (bắt buộc)
 *   - username: string|null - username hiện tại trên Telegram (null nếu chưa đặt username)
 *   - name: string|null - tên hiển thị trên Telegram
 *   - referralBranch: string|null - mã ref của người giới thiệu
 *     (chỉ ghi khi TẠO MỚI user, không ghi đè nếu user đã tồn tại)
 *
 * @returns {Promise<{ created: boolean, updated: boolean }>}
 */
async function addOrUpdateUser({ telegramId, username = null, name = null, referralBranch = null }) {
  if (!telegramId) throw new Error('Thiếu telegramId');

  const [rows] = await pool.query(
    'SELECT username FROM bot_user WHERE telegram_id = ? LIMIT 1',
    [telegramId]
  );

  // Chưa tồn tại -> thêm mới
  if (rows.length === 0) {
    await pool.query(
      `INSERT INTO bot_user (telegram_id, username, name, referral_branch)
       VALUES (?, ?, ?, ?)`,
      [telegramId, username, name, referralBranch]
    );
    return { created: true, updated: false };
  }

  // Đã tồn tại -> chỉ cập nhật nếu username thay đổi
  const existingUsername = rows[0].username;
  if (existingUsername !== username) {
    await pool.query(
      'UPDATE bot_user SET username = ? WHERE telegram_id = ?',
      [username, telegramId]
    );
    return { created: false, updated: true };
  }

  return { created: false, updated: false };
}

module.exports = { addOrUpdateUser };