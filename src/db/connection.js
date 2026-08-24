const mysql = require('mysql2/promise');

// Pool kết nối MySQL dùng chung cho toàn bộ project (và các chương trình khác nếu cần).
// Cấu hình lấy từ biến môi trường trong file .env:
//   DB_HOST=localhost
//   DB_PORT=3306
//   DB_USER=root
//   DB_PASSWORD=your_password
//   DB_NAME=rebatex

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rebatex',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4_unicode_ci',
});

module.exports = pool;