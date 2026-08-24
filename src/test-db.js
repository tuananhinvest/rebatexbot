require('dotenv').config();
const pool = require('./db/connection');

async function testConnection() {
  try {
    console.log('🔌 Đang kết nối tới MySQL...');
    console.log(`   Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log(`   Database: ${process.env.DB_NAME}`);

    // Test 1: kết nối cơ bản
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('✅ Kết nối MySQL thành công! (1 + 1 =', rows[0].result, ')');

    // Test 2: kiểm tra bảng bot_user đã tồn tại chưa
    const [tables] = await pool.query(
      `SELECT COUNT(*) AS total FROM information_schema.tables
       WHERE table_schema = ? AND table_name = 'bot_user'`,
      [process.env.DB_NAME]
    );

    if (tables[0].total > 0) {
      console.log('✅ Bảng bot_user đã tồn tại.');

      const [countRows] = await pool.query('SELECT COUNT(*) AS total FROM bot_user');
      console.log(`📊 Hiện có ${countRows[0].total} user trong bảng.`);
    } else {
      console.log('⚠️  Bảng bot_user CHƯA tồn tại — chạy câu lệnh CREATE TABLE trước.');
    }

    // Test 3: thử luôn hàm addOrUpdateUser với 1 user giả
    const { addOrUpdateUser } = require('./db/user');
    const testResult = await addOrUpdateUser({
      telegramId: 999999999,
      username: 'test_user',
      name: 'Test User',
    });
    console.log('✅ Test addOrUpdateUser:', testResult);

    // Chạy lại lần 2 với username khác để test nhánh "update"
    const testResult2 = await addOrUpdateUser({
      telegramId: 999999999,
      username: 'test_user_renamed',
      name: 'Test User',
    });
    console.log('✅ Test addOrUpdateUser (đổi username):', testResult2);

  } catch (err) {
    console.error('❌ Lỗi kết nối hoặc truy vấn:', err.message);
    console.error(err);
  } finally {
    await pool.end();
    console.log('🔚 Đã đóng kết nối.');
  }
}

testConnection();