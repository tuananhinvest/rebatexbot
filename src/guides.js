// Mỗi sàn có nội dung hướng dẫn riêng, theo từng ngôn ngữ.
// Key ngoài cùng = exchange id (phải khớp với id trong config/exchanges.js)
// Nếu thiếu 1 ngôn ngữ nào đó, hệ thống sẽ tự fallback sang bản tiếng Anh (en).

const GUIDES = {
  bingx: {
    en: `*How to Register a BINGX Account with 45% Fee Rebate*\n\n` +
      `*Case 1: Already have a BingX account under another referral*\n` +
      `↳ Register new account: https://bingxdao.com/partner/rebatex/\n` +
      `↳ After creating the new account, log in to your old one and transfer your verified identity to the new account.\n\n` +
      `*Case 2: Have a BingX account but not under any referral*\n` +
      `↳ Simply send your UID to @AlexVance\n`+
      `↳ We’ll register your UID for lifetime rebates directly.\n\n`+
      `*Case 3: Don’t have a BingX account yet*\n`+
      `↳ Just register a new account using the official Rebate X link:\n`+
      `https://bingxdao.com/partner/rebatex/\n`+
      `↳ Then trade as usual — your rebates will be automatically tracked and paid every month.\n\n`,
    th: `*วิธีลงทะเบียนบัญชี BINGX พร้อมรับส่วนลดค่าธรรมเนียม 45%*\n\n` +
      `*กรณีที่ 1: มีบัญชี BingX อยู่แล้วภายใต้ผู้แนะนำอื่น*\n` +
      `↳ ลงทะเบียนบัญชีใหม่: https://bingxdao.com/partner/rebatex/\n` +
      `↳ หลังจากสร้างบัญชีใหม่แล้ว ให้เข้าสู่ระบบบัญชีเก่าและย้ายการยืนยันตัวตน (KYC) มายังบัญชีใหม่\n\n` +
      `*กรณีที่ 2: มีบัญชี BingX อยู่แล้วแต่ไม่ได้อยู่ภายใต้ผู้แนะนำใดๆ*\n` +
      `↳ เพียงส่ง UID ของคุณมาที่ @AlexVance\n` +
      `↳ เราจะลงทะเบียน UID ของคุณเพื่อรับเงินคืนตลอดชีพโดยตรง\n\n` +
      `*กรณีที่ 3: ยังไม่มีบัญชี BingX*\n` +
      `↳ เพียงลงทะเบียนบัญชีใหม่โดยใช้ลิงก์ Rebate X อย่างเป็นทางการ:\n` +
      `https://bingxdao.com/partner/rebatex/\n` +
      `↳ จากนั้นเทรดได้ตามปกติ — เงินคืนของคุณจะถูกบันทึกและจ่ายให้อย่างอัตโนมัติทุกเดือน\n\n`,
    id: `*Cara Mendaftar Akun BINGX dengan Rebate Biaya 45%*\n\n` +
      `*Kasus 1: Sudah memiliki akun BingX di bawah referral lain*\n` +
      `↳ Daftar akun baru: https://bingxdao.com/partner/rebatex/\n` +
      `↳ Setelah membuat akun baru, login ke akun lama Anda dan transfer verifikasi identitas (KYC) ke akun baru.\n\n` +
      `*Kasus 2: Memiliki akun BingX tetapi tidak di bawah referral mana pun*\n` +
      `↳ Cukup kirimkan UID Anda ke @AlexVance\n` +
      `↳ Kami akan mendaftarkan UID Anda untuk mendapatkan rebate seumur hidup secara langsung.\n\n` +
      `*Kasus 3: Belum memiliki akun BingX*\n` +
      `↳ Cukup daftar akun baru menggunakan link resmi Rebate X:\n` +
      `https://bingxdao.com/partner/rebatex/\n` +
      `↳ Kemudian berdagang seperti biasa — rebate Anda akan dilacak dan dibayarkan secara otomatis setiap bulan.\n\n`,
    tr: `*%45 Komisyon İadesi ile BINGX Hesabı Nasıl Açılır?*\n\n` +
      `*Durum 1: Başka bir referans altında BingX hesabınız varsa*\n` +
      `↳ Yeni hesap açın: https://bingxdao.com/partner/rebatex/\n` +
      `↳ Yeni hesabı oluşturduktan sonra eski hesabınıza giriş yapın ve kimlik doğrulamanızı (KYC) yeni hesaba aktarın.\n\n` +
      `*Durum 2: BingX hesabınız var ama herhangi bir referansa bağlı değilse*\n` +
      `↳ UID numaranızı doğrudan @AlexVance adresine gönderin.\n` +
      `↳ UID'nizi ömür boyu komisyon iadesi için doğrudan kaydedelim.\n\n` +
      `*Durum 3: Henüz bir BingX hesabınız yoksa*\n` +
      `↳ Resmi Rebate X bağlantısını kullanarak yeni bir hesap açın:\n` +
      `https://bingxdao.com/partner/rebatex/\n` +
      `↳ Ardından işlem yapmaya başlayın — iadeleriniz otomatik olarak takip edilecek ve her ay ödenecektir.\n\n`,
  },

  mexc: {
    en: `*How to Register a MEXC Account with 40% Fee Rebate*\n\n`+
      `On MEXC, each verified ID can register up to 10 accounts, so you can simply create a new one using the official Rebate X link below:\n`+
      `↳ Register here: https://www.mexc.co/acquisition/custom-sign-up?shareCode=mexc-rebatex\n`+
      `↳ Referral Code: \`mexc-rebatex\`\n`,
    th: `*วิธีลงทะเบียนบัญชี MEXC พร้อมรับส่วนลดค่าธรรมเนียม 40%*\n\n`+
      `บน MEXC บัตรประชาชนที่ยืนยันแล้ว 1 ใบสามารถลงทะเบียนได้สูงสุด 10 บัญชี ดังนั้นคุณสามารถสร้างบัญชีใหม่ได้ง่ายๆ โดยใช้ลิงก์ Rebate X ด้านล่าง:\n`+
      `↳ ลงทะเบียนที่นี่: https://www.mexc.co/acquisition/custom-sign-up?shareCode=mexc-rebatex\n`+
      `↳ รหัสแนะนำ: \`mexc-rebatex\`\n`,
    id: `*Cara Mendaftar Akun MEXC dengan Rebate Biaya 40%*\n\n`+
      `Di MEXC, setiap ID yang terverifikasi dapat mendaftarkan hingga 10 akun, jadi Anda cukup membuat akun baru menggunakan link resmi Rebate X di bawah ini:\n`+
      `↳ Daftar di sini: https://www.mexc.co/acquisition/custom-sign-up?shareCode=mexc-rebatex\n`+
      `↳ Kode Referral: \`mexc-rebatex\`\n`,
    tr: `*%40 Komisyon İadesi ile MEXC Hesabı Nasıl Açılır?*\n\n`+
      `MEXC'de doğrulanmış her kimlik ile 10 adede kadar hesap açılabilir, bu nedenle aşağıdaki resmi Rebate X bağlantısını kullanarak kolayca yeni bir hesap oluşturabilirsiniz:\n`+
      `↳ Buradan kayıt olun: https://www.mexc.co/acquisition/custom-sign-up?shareCode=mexc-rebatex\n`+
      `↳ Referans Kodu: \`mexc-rebatex\`\n`,
  },

  gate: {
    en: `*How to Register a Gate Account with 50% Fee Rebate*\n\n`
      + `*Case 1: Don’t have a Gate account yet*\n`+
      `↳ Simply register a new account using the official Rebate X link:\n`+
      `https://www.gate.com/share/REBATEXX\n`+
      `↳ Complete your account setup and start trading — your 50% rebates will be tracked and credited automatically.\n\n`+
      `*Case 2: Already have a Gate account*\n`+
      `↳ You must close/delete your old account and create a brand-new one using a new email address or phone number.\n`+
      `Register your new account via:\n`+
      `https://www.gate.com/share/REBATEXX\n`+
      `↳ Complete KYC verification for the new account.\n\n`+
      `⚠️ Important KYC Tip: It is highly recommended to use a different ID document than your old account (e.g., if your old account was verified with a National ID, use a Driver’s License or Passport for the new one) to ensure seamless verification.`,
    th: `*วิธีลงทะเบียนบัญชี Gate พร้อมรับส่วนลดค่าธรรมเนียม 50%*\n\n` +
      `*กรณีที่ 1: ยังไม่มีบัญชี Gate*\n` +
      `↳ เพียงลงทะเบียนบัญชีใหม่โดยใช้ลิงก์ Rebate X อย่างเป็นทางการ:\n` +
      `https://www.gate.com/share/REBATEXX\n` +
      `↳ ตั้งค่าบัญชีให้สมบูรณ์และเริ่มเทรด — ส่วนลด 50% ของคุณจะถูกบันทึกและโอนเข้าบัญชีให้อัตโนมัติ\n\n` +
      `*กรณีที่ 2: มีบัญชี Gate อยู่แล้ว*\n` +
      `↳ คุณต้องปิด/ลบบัญชีเก่าของคุณ แล้วสร้างบัญชีใหม่โดยใช้อีเมลหรือเบอร์โทรศัพท์ใหม่\n` +
      `ลงทะเบียนบัญชีใหม่ผ่าน:\n` +
      `https://www.gate.com/share/REBATEXX\n` +
      `↳ ดำเนินการยืนยันตัวตน (KYC) สำหรับบัญชีใหม่ให้เรียบร้อย\n\n` +
      `⚠️ คำแนะนำ KYC ที่สำคัญ: แนะนำให้ใช้เอกสารยืนยันตัวตนคนละฉบับกับบัญชีเก่า (เช่น หากบัญชีเก่าใช้บัตรประชาชน ให้ใช้ใบขับขี่หรือหนังสือเดินทางสำหรับบัญชีใหม่) เพื่อให้การยืนยันราบรื่น`,
    id: `*Cara Mendaftar Akun Gate dengan Rebate Biaya 50%*\n\n` +
      `*Kasus 1: Belum memiliki akun Gate*\n` +
      `↳ Cukup daftar akun baru menggunakan link resmi Rebate X:\n` +
      `https://www.gate.com/share/REBATEXX\n` +
      `↳ Selesaikan pengaturan akun Anda dan mulai berdagang — rebate 50% Anda akan dilacak dan dikreditkan secara otomatis.\n\n` +
      `*Kasus 2: Sudah memiliki akun Gate*\n` +
      `↳ Anda harus menutup/menghapus akun lama Anda dan membuat akun baru menggunakan alamat email atau nomor telepon baru.\n` +
      `Daftar akun baru Anda melalui:\n` +
      `https://www.gate.com/share/REBATEXX\n` +
      `↳ Selesaikan verifikasi KYC untuk akun baru.\n\n` +
      `⚠️ Tips KYC Penting: Sangat disarankan untuk menggunakan dokumen ID yang berbeda dari akun lama Anda (misalnya, jika akun lama diverifikasi dengan KTP, gunakan SIM atau Paspor untuk akun baru) untuk memastikan verifikasi berjalan lancar.`,
    tr: `*%50 Komisyon İadesi ile Gate Hesabı Nasıl Açılır?*\n\n` +
      `*Durum 1: Henüz bir Gate hesabınız yoksa*\n` +
      `↳ Resmi Rebate X bağlantısını kullanarak yeni bir hesap açın:\n` +
      `https://www.gate.com/share/REBATEXX\n` +
      `↳ Hesap kurulumunuzu tamamlayın ve işlem yapmaya başlayın — %50 iadeniz otomatik olarak takip edilecek ve bakiyenize aktarılacaktır.\n\n` +
      `*Durum 2: Zaten bir Gate hesabınız varsa*\n` +
      `↳ Eski hesabınızı kapatmalı/silmeli ve yeni bir e-posta adresi veya telefon numarası kullanarak tamamen yeni bir hesap oluşturmalısınız.\n` +
      `Yeni hesabınızı şu adresten açın:\n` +
      `https://www.gate.com/share/REBATEXX\n` +
      `↳ Yeni hesap için KYC doğrulamasını tamamlayın.\n\n` +
      `⚠️ Önemli KYC İpucu: Sorunsuz doğrulama sağlamak için eski hesabınızdan farklı bir kimlik belgesi kullanmanız önemle tavsiye edilir (örneğin eski hesabınız T.C. Kimlik ile doğrulandıysa, yeni hesap için Sürücü Belgesi veya Pasaport kullanın).`,
  },

  bybit: {
    en: `*How to Register a BYBIT Account with 40% Fee Rebate*\n\n`+
      `*Case 1: Don’t have a Bybit account yet*\n`+
      `Simply register a new account using the official Rebate X link:\nhttps://partner.bybit.com/b/REBATEX\n`+
      `Complete your account setup and start trading — your 40% rebates will be tracked and credited automatically every week.\n\n`+
      `*Case 2: Already have a Bybit account*\n`+
      `↳ Option A: Log in to your existing account and transfer your identity verification to the new account created via: https://partner.bybit.com/b/REBATEX\n`+
      `(Use the "Transfer Identity Verification" feature in the Bybit app).\n\n`+
      `↳ Option B: If your account is not eligible for identity transfer, simply close/delete your old account, then register a new one using a new email address or phone number via: https://partner.bybit.com/b/REBATEX\n`+
      `Complete KYC verification for the new account to finish setup.`,
    th: `*วิธีลงทะเบียนบัญชี BYBIT พร้อมรับส่วนลดค่าธรรมเนียม 40%*\n\n`+
      `*กรณีที่ 1: ยังไม่มีบัญชี Bybit*\n`+
      `เพียงลงทะเบียนบัญชีใหม่โดยใช้ลิงก์ Rebate X อย่างเป็นทางการ:\nhttps://partner.bybit.com/b/REBATEX\n`+
      `ตั้งค่าบัญชีให้สมบูรณ์และเริ่มเทรด — ส่วนลด 40% ของคุณจะถูกบันทึกและโอนเข้าบัญชีให้อัตโนมัติทุกสัปดาห์\n\n`+
      `*กรณีที่ 2: มีบัญชี Bybit อยู่แล้ว*\n`+
      `↳ ทางเลือก A: เข้าสู่ระบบบัญชีเดิมของคุณและโอนย้ายการยืนยันตัวตนไปยังบัญชีใหม่ที่สร้างผ่าน: https://partner.bybit.com/b/REBATEX\n`+
      `(ใช้ฟีเจอร์ "Transfer Identity Verification" ในแอป Bybit)\n\n`+
      `↳ ทางเลือก B: หากบัญชีของคุณไม่เข้าเงื่อนไขการโอนย้ายตัวตน ให้ปิด/ลบบัญชีเก่า จากนั้นลงทะเบียนบัญชีใหม่ด้วยอีเมลหรือเบอร์โทรศัพท์ใหม่ผ่าน: https://partner.bybit.com/b/REBATEX\n`+
      `ดำเนินการยืนยันตัวตน (KYC) สำหรับบัญชีใหม่เพื่อเสร็จสิ้นการตั้งค่า`,
    id: `*Cara Mendaftar Akun BYBIT dengan Rebate Biaya 40%*\n\n`+
      `*Kasus 1: Belum memiliki akun Bybit*\n`+
      `Cukup daftar akun baru menggunakan link resmi Rebate X:\nhttps://partner.bybit.com/b/REBATEX\n`+
      `Selesaikan pengaturan akun Anda dan mulai berdagang — rebate 40% Anda akan dilacak dan dikreditkan secara otomatis setiap minggu.\n\n`+
      `*Kasus 2: Sudah memiliki akun Bybit*\n`+
      `↳ Opsi A: Login ke akun lama Anda dan transfer verifikasi identitas ke akun baru yang dibuat melalui: https://partner.bybit.com/b/REBATEX\n`+
      `(Gunakan fitur "Transfer Identity Verification" di aplikasi Bybit).\n\n`+
      `↳ Opsi B: Jika akun Anda tidak memenuhi syarat untuk transfer identitas, cukup tutup/hapus akun lama Anda, lalu daftar akun baru menggunakan email atau nomor telepon baru melalui: https://partner.bybit.com/b/REBATEX\n`+
      `Selesaikan verifikasi KYC untuk akun baru untuk menyelesaikan pengaturan.`,
    tr: `*%40 Komisyon İadesi ile BYBIT Hesabı Nasıl Açılır?*\n\n`+
      `*Durum 1: Henüz bir Bybit hesabınız yoksa*\n`+
      `Resmi Rebate X bağlantısını kullanarak yeni bir hesap açın:\nhttps://partner.bybit.com/b/REBATEX\n`+
      `Hesap kurulumunuzu tamamlayın ve işlem yapmaya başlayın — %40 iadeniz otomatik olarak takip edilecek ve her hafta bakiyenize aktarılacaktır.\n\n`+
      `*Durum 2: Zaten bir Bybit hesabınız varsa*\n`+
      `↳ Seçenek A: Mevcut hesabınıza giriş yapın ve kimlik doğrulamanızı şu adresten oluşturduğunuz yeni hesaba aktarın: https://partner.bybit.com/b/REBATEX\n`+
      `(Bybit uygulamasında "Transfer Identity Verification" özelliğini kullanın).\n\n`+
      `↳ Seçenek B: Hesabınız kimlik aktarımına uygun değilse, eski hesabınızı kapatın/silin ve ardından şu adresten yeni bir e-posta veya telefon numarası ile yeni bir hesap açın: https://partner.bybit.com/b/REBATEX\n`+
      `Kurulumu tamamlamak için yeni hesabın KYC doğrulamasını yapın.`,
  },

  weex: {
    en: `*How to Register a WEEX Account with 50% Fee Rebate*\n\n`+
      `Register a new account via the official Rebate X link:\n`+
      `↳ Register here: https://www.weex.com/en/register?vipCode=weexrebate\n`+
      `↳ Referral Code: \`weexrebate\`\n\n`+
      `Once registered, start trading — your 50% fee rebates will be automatically tracked and credited to your account after every trade.`,
    th: `*วิธีลงทะเบียนบัญชี WEEX พร้อมรับส่วนลดค่าธรรมเนียม 50%*\n\n`+
      `ลงทะเบียนบัญชีใหม่ผ่านลิงก์ Rebate X อย่างเป็นทางการ:\n`+
      `↳ ลงทะเบียนที่นี่: https://www.weex.com/en/register?vipCode=weexrebate\n`+
      `↳ รหัสแนะนำ: \`weexrebate\`\n\n`+
      `เมื่อลงทะเบียนแล้ว เริ่มเทรดได้ทันที — ส่วนลดค่าธรรมเนียม 50% ของคุณจะถูกบันทึกและโอนเข้าบัญชีให้อัตโนมัติหลังจากการเทรดแต่ละครั้ง`,
    id: `*Cara Mendaftar Akun WEEX dengan Rebate Biaya 50%*\n\n`+
      `Daftar akun baru melalui link resmi Rebate X:\n`+
      `↳ Daftar di sini: https://www.weex.com/en/register?vipCode=weexrebate\n`+
      `↳ Kode Referral: \`weexrebate\`\n\n`+
      `Setelah mendaftar, mulailah berdagang — rebate biaya 50% Anda akan dilacak dan dikreditkan ke akun Anda secara otomatis setelah setiap transaksi.`,
    tr: `*%50 Komisyon İadesi ile WEEX Hesabı Nasıl Açılır?*\n\n`+
      `Resmi Rebate X bağlantısı üzerinden yeni bir hesap açın:\n`+
      `↳ Buradan kayıt olun: https://www.weex.com/en/register?vipCode=weexrebate\n`+
      `↳ Referans Kodu: \`weexrebate\`\n\n`+
      `Kayıt olduktan sonra işlem yapmaya başlayın — %50 komisyon iadeniz her işlemden sonra otomatik olarak takip edilecek ve hesabınıza aktarılacaktır.`,
  },

  vantage: {
    en: `*How to Register a Vantage Account with 100% Commission Rebate*\n\n`+
      `*Case 1: Don’t have a Vantage account yet*\n`+
      `↳ Simply register a new account using the official Rebate X link:\n`+
      `https://vigco.co/la-com-inv/vi/GOLDBTC\n`+
      `↳ Complete your verification, make a deposit, and start trading — your commission rebates will be credited automatically.\n\n`+
      `*Case 2: Already have a Vantage account*\n`+
      `↳ Contact Support Admin @AlexVance directly on Telegram.\n`+
      `↳ We will guide you through the fast-track process to link your existing account or transfer your IB under Rebate X to activate your 100% rebate instantly.`,
    th: `*วิธีลงทะเบียนบัญชี Vantage พร้อมรับคืนค่าคอมมิชชั่น 100%*\n\n`+
      `*กรณีที่ 1: ยังไม่มีบัญชี Vantage*\n`+
      `↳ เพียงลงทะเบียนบัญชีใหม่โดยใช้ลิงก์ Rebate X อย่างเป็นทางการ:\n`+
      `https://vigco.co/la-com-inv/vi/GOLDBTC\n`+
      `↳ ยืนยันตัวตน ฝากเงิน และเริ่มเทรด — ค่าคอมมิชชั่นจะถูกคืนเข้าบัญชีให้อัตโนมัติ\n\n`+
      `*กรณีที่ 2: มีบัญชี Vantage อยู่แล้ว*\n`+
      `↳ ติดต่อผู้ดูแลระบบ @AlexVance โดยตรงทาง Telegram\n`+
      `↳ เราจะแนะนำขั้นตอนการเชื่อมโยงบัญชีเดิมของคุณหรือย้าย IB มาอยู่ใต้ Rebate X เพื่อเปิดใช้งานการคืนเงิน 100% ทันที`,
    id: `*Cara Mendaftar Akun Vantage dengan Rebate Komisi 100%*\n\n`+
      `*Kasus 1: Belum memiliki akun Vantage*\n`+
      `↳ Cukup daftar akun baru menggunakan link resmi Rebate X:\n`+
      `https://vigco.co/la-com-inv/vi/GOLDBTC\n`+
      `↳ Selesaikan verifikasi Anda, lakukan deposit, dan mulai berdagang — rebate komisi Anda akan dikreditkan secara otomatis.\n\n`+
      `*Kasus 2: Sudah memiliki akun Vantage*\n`+
      `↳ Hubungi Admin Dukungan @AlexVance secara langsung di Telegram.\n`+
      `↳ Kami akan memandu Anda melalui proses cepat untuk menghubungkan akun yang ada atau memindahkan IB Anda ke bawah Rebate X untuk mengaktifkan rebate 100% Anda secara instan.`,
    tr: `*%100 Komisyon İadesi ile Vantage Hesabı Nasıl Açılır?*\n\n`+
      `*Durum 1: Henüz bir Vantage hesabınız yoksa*\n`+
      `↳ Resmi Rebate X bağlantısını kullanarak yeni bir hesap açın:\n`+
      `https://vigco.co/la-com-inv/vi/GOLDBTC\n`+
      `↳ Doğrulamanızı tamamlayın, para yatırın ve işlem yapmaya başlayın — komisyon iadeleriniz otomatik olarak bakiyenize aktarılacaktır.\n\n` +
      `*Durum 2: Zaten bir Vantage hesabınız varsa*\n`+
      `↳ Telegram üzerinden doğrudan Destek Yöneticisi @AlexVance ile iletişime geçin.\n`+
      `↳ %100 iadenizi anında aktifleştirmek için mevcut hesabınızı bağlama veya IB'nizi Rebate X altına taşıma konusunda hızlı işlem sürecinde size rehberlik edeceğiz.`,
  },
};

/**
 * Lấy nội dung hướng dẫn cho một sàn theo ngôn ngữ.
 * Nếu thiếu ngôn ngữ đó -> fallback về tiếng Anh.
 * Nếu sàn chưa có guide nào -> trả về null (caller tự xử lý fallback "no_guide").
 */
function getGuide(exchange, lang) {
  const set = GUIDES[exchange.id];
  if (!set) return null;
  return set[lang] || set.en || null;
}

module.exports = { getGuide };