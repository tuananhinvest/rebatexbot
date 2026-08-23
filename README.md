# Telegram Fee Rebate Bot

Bot Telegram cho phép người dùng chọn sàn giao dịch (BingX, Vantage, MEXC, Gate...),
đăng ký hoàn phí, xem VIP Signals, và tính thử phí giao dịch — viết bằng Node.js + Telegraf.

## 1. Cài đặt

```bash
npm install
cp .env.example .env
```

Mở file `.env` và điền:
- `BOT_TOKEN`: lấy từ [@BotFather](https://t.me/BotFather) trên Telegram (`/newbot`)
- `ADMIN_CHAT_ID` (tuỳ chọn): chat id nhận thông báo mỗi khi có người đăng ký mới

## 2. Chạy bot

```bash
npm start
```

Hoặc khi phát triển (tự restart khi sửa code):

```bash
npm run dev
```

Bot chạy ở chế độ **long polling** mặc định — phù hợp để test và cho lượng
traffic vừa phải (vài nghìn user, không quá nhiều update/giây).

## 3. Cấu trúc dự án

```
src/
  bot.js                  # điểm khởi động, đăng ký tất cả handler
  db.js                   # SQLite: lưu user & đăng ký hoàn phí
  config/exchanges.js     # danh sách sàn, mức hoàn phí, link ref
  keyboards/mainMenu.js   # các bàn phím inline dùng chung
  scenes/registration.js  # luồng đăng ký hoàn phí (wizard nhiều bước)
  scenes/calculator.js    # luồng tính thử phí giao dịch
  handlers/vipSignals.js  # nội dung VIP Signals
```

Để **thêm/sửa sàn**, chỉ cần sửa mảng trong `src/config/exchanges.js` — menu,
luồng đăng ký và calculator tự động cập nhật theo.

## 4. Vì sao xử lý được hàng ngàn user cùng lúc?

- Telegraf/Node.js là bất đồng bộ (non-blocking) — một tiến trình đơn có thể
  xử lý hàng ngàn kết nối I/O (gọi Telegram API, đọc/ghi DB) đồng thời mà
  không cần thread riêng cho mỗi user.
- `Scenes.Stage` + `session()` tự động cô lập trạng thái hội thoại theo từng
  `(chatId, userId)` — user A đang ở bước 2 của đăng ký không ảnh hưởng gì
  đến user B đang dùng calculator.
- SQLite (`better-sqlite3`, chế độ WAL) đủ nhanh cho hàng chục nghìn bản ghi
  đăng ký; các thao tác ghi là đồng bộ nhưng cực nhanh (µs) nên không nghẽn
  event loop đáng kể ở quy mô vừa.

## 5. Khi cần scale lớn hơn nữa

Nếu lượng user tăng mạnh (hàng chục/trăm nghìn, hoặc cần chạy nhiều instance
để chịu tải/failover), cân nhắc:

1. **Chuyển sang webhook thay vì long polling**
   Long polling chỉ chạy được 1 instance/bot token. Webhook cho phép Telegram
   gọi thẳng tới server của bạn (qua HTTPS), dễ đặt sau load balancer.
   ```js
   bot.launch({
     webhook: {
       domain: process.env.WEBHOOK_DOMAIN,
       port: process.env.PORT,
     },
   });
   ```

2. **Session store dùng Redis** thay vì RAM mặc định — bắt buộc nếu chạy
   nhiều instance, để user không bị "văng" giữa luồng đăng ký khi request
   rơi vào instance khác. Ví dụ dùng `@telegraf/session` với Redis adapter.

3. **Đổi SQLite → PostgreSQL/MySQL** khi cần nhiều instance ghi đồng thời
   (SQLite chỉ cho 1 writer tại một thời điểm).

4. **Giới hạn tốc độ (rate limit) khi gửi tin nhắn hàng loạt** (ví dụ broadcast
   VIP signal cho tất cả user) — Telegram giới hạn ~30 tin/giây tổng và ~1
   tin/giây/chat. Dùng thư viện như `telegraf-ratelimit` hoặc queue (BullMQ)
   khi cần gửi thông báo hàng loạt.

5. **Chạy bằng PM2 hoặc container + auto-restart** để bot tự khởi động lại
   nếu crash, và theo dõi log/metrics production.

## 6. Mở rộng thêm

- Thêm lệnh admin xem thống kê đăng ký (`db.countRegistrations()` đã có sẵn).
- Thêm xác thực UID tự động qua API của sàn (nếu sàn hỗ trợ) thay vì nhập thủ công.
- Thêm nút "Lịch sử đăng ký của tôi" dùng `db.getRegistrations(telegramId)`.
