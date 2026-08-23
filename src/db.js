// Lưu trữ dữ liệu bằng SQLite (better-sqlite3: đồng bộ, nhanh, không cần server riêng).
// Phù hợp cho vài chục nghìn user/đăng ký. Nếu scale lớn hơn (nhiều instance bot chạy
// song song, hàng trăm nghìn user), nên chuyển sang PostgreSQL/MySQL.

const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'data.sqlite'));
db.pragma('journal_mode = WAL'); // cho phép đọc/ghi đồng thời tốt hơn

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  telegram_id INTEGER PRIMARY KEY,
  username    TEXT,
  first_name  TEXT,
  created_at  TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS registrations (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_id INTEGER NOT NULL,
  exchange_id TEXT NOT NULL,
  uid         TEXT NOT NULL,
  contact     TEXT NOT NULL,
  status      TEXT DEFAULT 'pending',
  created_at  TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reg_telegram_id ON registrations(telegram_id);
`);

function upsertUser(user) {
  db.prepare(`
    INSERT INTO users (telegram_id, username, first_name)
    VALUES (@id, @username, @first_name)
    ON CONFLICT(telegram_id) DO UPDATE SET
      username = excluded.username,
      first_name = excluded.first_name
  `).run({
    id: user.id,
    username: user.username || null,
    first_name: user.first_name || null,
  });
}

function saveRegistration({ telegramId, exchangeId, uid, contact }) {
  return db.prepare(`
    INSERT INTO registrations (telegram_id, exchange_id, uid, contact)
    VALUES (?, ?, ?, ?)
  `).run(telegramId, exchangeId, uid, contact);
}

function getRegistrations(telegramId) {
  return db.prepare(`
    SELECT * FROM registrations WHERE telegram_id = ? ORDER BY created_at DESC
  `).all(telegramId);
}

function countRegistrations() {
  return db.prepare(`SELECT COUNT(*) AS total FROM registrations`).get().total;
}

module.exports = {
  upsertUser,
  saveRegistration,
  getRegistrations,
  countRegistrations,
};
