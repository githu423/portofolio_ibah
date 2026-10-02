/**
 * ==============================================================================
 * IBAH MISBAH — ADVANCED AI CONVERSATIONAL & REASONING ENGINE (BACKEND)
 * Comprehensive, High-Detail, Empathetic Multi-Intent Knowledge Graph
 * ==============================================================================
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const IBAH_PROFILE = require('./data/ibah-profile');

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());
app.use(express.json({ limit: '30kb' }));
app.use(express.static(path.join(__dirname, '..')));

// In-Memory Rate Limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 80;

function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || 'client';
  const now = Date.now();
  const clientData = rateLimitMap.get(ip) || { count: 0, firstReq: now };

  if (now - clientData.firstReq > RATE_LIMIT_WINDOW_MS) {
    clientData.count = 1;
    clientData.firstReq = now;
  } else {
    clientData.count += 1;
  }

  rateLimitMap.set(ip, clientData);

  if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Terlalu banyak pesan dalam waktu singkat. Mohon tunggu beberapa detik.'
    });
  }

  next();
}

app.get('/api/profile', (req, res) => {
  res.json({ success: true, data: IBAH_PROFILE });
});

// -----------------------------------------------------------------------------
// POST /api/chat — Deep Conversational Knowledge Endpoint
// -----------------------------------------------------------------------------
app.post('/api/chat', rateLimiter, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
    }

    if (message.length > 1000) {
      return res.status(400).json({ error: 'Pesan terlalu panjang (maksimal 1000 karakter).' });
    }

    const userMessage = message.trim();

    // 1. OpenAI Integration if API Key is available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'YOUR_API_KEY') {
      try {
        const systemPrompt = `You are ASK IBAH, the friendly, articulate, highly detailed AI Assistant for IBAH MISBAH (Freelance Web Developer & Information Systems student at UBSI Tasikmalaya).
Your goal is to provide deep, exhaustive, comprehensive, empathetic, and beautifully formatted answers about Ibah Misbah.
Always answer with rich context, structured bullet points, bold highlights, code snippets if relevant, and direct clickable action links.
WhatsApp for consultation: 0822-1967-8296. Email: ibahmisbahh6@gmail.com. GitHub: https://github.com/githu423.

VERIFIED KNOWLEDGE BASE:
${JSON.stringify(IBAH_PROFILE, null, 2)}`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage }
            ],
            temperature: 0.6,
            max_tokens: 700
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices[0].message.content;
          return res.json({ reply });
        }
      } catch (err) {
        console.error('OpenAI Error, falling back to Deep NLP Engine:', err.message);
      }
    }

    // 2. Comprehensive Deep NLP Dialogue Engine
    const reply = generateComprehensiveDialogue(userMessage);
    return res.json({ reply });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      reply: 'Halo! Terjadi kendala teknis sementara. Anda dapat langsung terhubung dengan Ibah via WhatsApp di **0822-1967-8296** atau email **ibahmisbahh6@gmail.com**.'
    });
  }
});

/**
 * ==============================================================================
 * EXHAUSTIVE DEEP DIALOGUE ENGINE
 * ==============================================================================
 */
function generateComprehensiveDialogue(rawQuery) {
  const text = rawQuery.toLowerCase();
  const clean = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ');
  const words = clean.split(/\s+/).filter(Boolean);

  const has = (...terms) => terms.some(t => text.includes(t));
  const hasWord = (...terms) => terms.some(t => words.includes(t));

  // 1. GREETINGS & CASUAL DIALOGUE
  if (has('assalamu', 'assalamualaikum', 'samlikum', 'kulonuwun')) {
    return `Wa'alaikumussalam Warahmatullahi Wabarakatuh! 🙏✨\n\nSelamat datang di portofolio resmi **Ibah Misbah**! Senang sekali Anda berkunjung. Saya adalah **Ask Ibah**, asisten virtual cerdas yang siap membantu Anda.\n\nAnda dapat menanyakan apa saja seputar:\n• 💻 **Keahlian Web** (Laravel, PHP, MySQL, Tailwind CSS, JS)\n• 📁 **Detail 4 Proyek Nyata** (Aplikasi Slip Gaji, Cipakat-Hub, Sistem Dinas Pariwisata, UMKM Rajut)\n• 🏢 **Riwayat PKL & Kepemimpinan** (Dinas Pariwisata Ciamis, Ketua Umum HIMASI UBSI)\n• 📋 **Alur Pemesanan Website & Estimasi Biaya**\n• 🟢 **Kontak WhatsApp Langsung (0822-1967-8296)**\n\nAda topik khusus yang ingin Anda diskusikan?`;
  }

  if (hasWord('pagi', 'siang', 'sore', 'malam') && has('selamat', 'halo', 'hai', 'met')) {
    const timeMatch = words.find(w => ['pagi', 'siang', 'sore', 'malam'].includes(w)) || 'hari';
    return `Selamat ${timeMatch}! 👋 Semoga hari Anda menyenangkan dan penuh kelancaran.\n\nSaya adalah asisten virtual resmi **Ibah Misbah**. Saya siap memandu Anda menelusuri detail keahlian teknis, demonstrasi 4 proyek nyata, pengalaman PKL di Dinas Pariwisata, atau membantu konsultasi pembuatan website baru. Silakan tanyakan apa saja yang Anda butuhkan!`;
  }

  if (has('apa kabar', 'gimana kabar', 'how are you', 'kabarnya')) {
    return `Alhamdulillah, kabar saya sangat baik dan bersemangat mendampingi Anda! 😊\n\nIbah Misbah saat ini juga aktif berstatus **Available for Work** (siap menerima proyek freelance website remote atau kolaborasi baru). Apakah Anda sedang merencanakan pembuatan sistem digital atau mencari partner web developer yang andal?`;
  }

  if (has('lagi apa', 'sedang apa', 'lagi ngapain', 'lagi sibuk')) {
    return `Saya sedang siap siaga mendampingi Anda menjelajahi seluruh portofolio dan menjawab pertanyaan seputar karya, keterampilan pemrograman, serta layanan web developer dari **Ibah Misbah**! 🚀\n\nSementara itu, Ibah Misbah aktif mengembangkan solusi web berbasis Laravel & MySQL serta memimpin organisasi kemahasiswaan HIMASI UBSI. Anda ingin mendiskusikan topik tertentu?`;
  }

  if (hasWord('halo', 'hai', 'hi', 'hey', 'helo', 'hello', 'hola', 'oy', 'oi', 'bro', 'min', 'gan', 'bang', 'mas', 'kak', 'cuy') && words.length <= 4) {
    return `Halo juga! 👋 Senang bisa menyapa Anda.\n\nSaya asisten virtual cerdas **Ibah Misbah**. Anda bisa bertanya apa saja seputar:\n• 💻 **Keahlian Teknis & Tech Stack** (Laravel, PHP, MySQL, Tailwind CSS, JS)\n• 📁 **4 Proyek Nyata & Arsitekturnya** (Aplikasi Slip Gaji, Cipakat-Hub, Sistem Dinas Pariwisata, UMKM Rajut)\n• 🏢 **Riwayat PKL & Kepemimpinan** (Dinas Pariwisata Ciamis, Ketua Umum HIMASI UBSI)\n• 📋 **Alur Pemesanan Website & Estimasi Biaya**\n• 🟢 **Kontak WhatsApp Langsung (0822-1967-8296)**\n\nApa yang ingin Anda ketahui lebih lanjut?`;
  }

  // 2. GRATITUDE & COMPLIMENTS
  if (has('terima kasih', 'makasih', 'makasi', 'matursuwun', 'hatur nuhun', 'thanks', 'thank you', 'tengkyu', 'arigato')) {
    return `Sama-sama! Senang sekali bisa membantu Anda 😊\n\nJika ada kebutuhan pembuatan website kustom, penambahan fitur Laravel, atau kerja sama proyek, jangan ragu untuk menghubungi Ibah langsung via WhatsApp di **0822-1967-8296** atau email **ibahmisbahh6@gmail.com**. Sukses selalu untuk semua rencana Anda! ✨`;
  }

  if (has('keren', 'bagus', 'mantap', 'top', 'hebat', 'kece', 'cakep', 'rapi', 'smooth', 'clean', 'suka', 'keren banget', 'luar biasa')) {
    return `Terima kasih banyak atas apresiasi positifnya! ✨\n\nPortofolio ini dirancang dengan standar kualitas profesional: mengutamakan kebersihan tampilan, kemudahan navigasi, responsivitas smartphone, kecepatan akses, dan keamanan. Ibah selalu menerapkan standar tinggi yang sama untuk setiap website klien yang dikerjakan.`;
  }

  // 3. SPECIFIC 4 PROJECTS (CHECK SPECIFIC PROJECT NAMES FIRST BEFORE GENERAL BIO)
  // 3a. Slip Gaji
  if (has('slip gaji', 'sortir', 'excel to pdf', 'excel to word', 'otomasi gaji')) {
    return `📄 **Proyek 01: Website Sortir Slip Gaji (Otomasi Dokumen)**\n\n• **Latar Belakang Masalah:** Staf bendahara/keuangan instansi sebelumnya harus memilah ribuan baris data penggajian di Excel dan mencetaknya secara manual yang memakan waktu berhari-hari serta boros kertas.\n• **Solusi yang Dibuat Ibah:** Aplikasi web interaktif yang mampu mem-parsing spreadsheet Excel secara instan, mengelompokkan data berdasarkan unit/nama, dan mengonversinya langsung ke dokumen Word/PDF siap cetak dengan layout rapi.\n• **Fitur Utama:** Drag-and-drop file Excel, filter data otomatis, preview layout slip gaji, cetak/ekspor PDF instan dengan keamanan data 100% di sisi klien (*client-side*).\n• **Teknologi:** HTML5, CSS3 modern, JavaScript Client-Side Processing.\n• **Tautan Repositori:** [github.com/githu423/website-slip-gaji](https://github.com/githu423/website-slip-gaji)`;
  }

  // 3b. Cipakat-Hub
  if (has('cipakat', 'sistem desa', 'layanan desa', 'surat desa', 'hub desa')) {
    return `🏛️ **Proyek 02: Cipakat-Hub (Platform Sistem Informasi Terpadu Desa)**\n\n• **Latar Belakang Masalah:** Pelayanan birokrasi surat warga desa masih manual, alur pengaduan lambat, dan produk UMKM warga desa belum memiliki media promosi digital yang terpadu.\n• **Solusi yang Dibuat Ibah:** Membangun platform web terpadu dengan 4 modul utama:\n  1. *Pengajuan Surat Mandiri:* Surat Keterangan Domisili, Usaha, Tidak Mampu dengan QR Code verifikasi.\n  2. *Pengaduan Masyarakat:* Sistem tiket pengaduan transparan dengan pelacakan status (*Diajukan, Diproses, Selesai*).\n  3. *Booking Fasilitas Desa:* Peminjaman aula/gedung/lapangan desa dengan kalender interaktif.\n  4. *Etalase UMKM Desa:* Showcase produk kerajinan/makanan khas warga desa dengan tombol order WhatsApp langsung.\n• **Teknologi:** Laravel Framework, PHP, MySQL Database, Bootstrap 5, JavaScript.\n• **Tautan Repositori:** [github.com/githu423/cipakat-hub](https://github.com/githu423/cipakat-hub)`;
  }

  // 3c. Dinas Pariwisata Project (Specific website project)
  if (has('website internal', 'sistem internal dinas', 'web dinas pariwisata', 'proyek dinas', 'paperless dinas', 'sistem rapat dinas')) {
    return `🏢 **Proyek 03: Website Internal Dinas Pariwisata Ciamis**\n\n• **Latar Belakang Masalah:** Koordinasi agenda rapat instansi di Bidang Perencanaan & Sekretariat sering terhambat oleh penumpukan dokumen fisik berbasis kertas dan lambatnya distribusi materi rapat.\n• **Solusi yang Dibuat Ibah:** Merancang portal dashboard internal *paperless* dengan otentikasi multi-role (Admin, Kepala Bidang, Notulis, Peserta), manajemen jadwal rapat terpusat, pengunggahan materi presentasi digital, dan arsip notulensi rapat.\n• **Fitur Utama:** Manajemen jadwal rapat, repository bahan tayang PDF/PPT, modul notulensi digital langsung terdistribusi, dan hemat kertas (*paperless*).\n• **Teknologi:** Laravel Framework, PHP, MySQL, Tailwind CSS.\n• **Tautan Repositori:** [github.com/githu423/dinas-pariwisata-internal](https://github.com/githu423/dinas-pariwisata-internal)`;
  }

  // 3d. UMKM Rajut
  if (has('rajut', 'tasikmalaya', 'rajut tasik', 'landing page rajut')) {
    return `🧶 **Proyek 04: Landing Page UMKM Rajut Tasikmalaya**\n\n• **Latar Belakang Masalah:** Perajin rajut lokal Tasikmalaya memiliki produk kerajinan berkualitas tinggi namun kesulitan menjangkau pasar di luar daerah karena belum memiliki etalase digital profesional.\n• **Solusi yang Dibuat Ibah:** Membangun landing page komersial berkecepatan tinggi, mobile-first layout, dilengkapi galeri katalog visual menarik dan integrasi pesanan langsung ke WhatsApp penjual dengan pre-filled text.\n• **Fitur Utama:** Galeri produk berfilter, kalkulator perkiraan harga pesanan rajut, integrasi tombol WhatsApp, optimasi SEO Google.\n• **Teknologi:** Laravel, PHP, MySQL, JavaScript, Node.js.\n• **Tautan Repositori:** [github.com/githu423/umkm-rajut-tasik](https://github.com/githu423/umkm-rajut-tasik)`;
  }

  // 4. SPECIFIC EXPERIENCES & LEADERSHIP
  // 4a. PKL Dispar (Internship & responsibilities)
  if (has('pkl', 'magang', 'dinas', 'kerja di dinas', 'dispar', 'tugas di dinas')) {
    return `🏢 **Pengalaman PKL di Dinas Pariwisata Ciamis (Agustus – Oktober 2026):**\n\n• **Divisi Penempatan:** Bidang Perencanaan, Sekretariat\n• **Peran:** Web Developer (Bekerja dalam tim 2 developer)\n• **Kontribusi & Capaian Nyata:**\n  1. Mengembangkan website internal sistem rapat digital (*paperless*) untuk mempercepat koordinasi rapat dan menghemat ribuan lembar kertas instansi.\n  2. Mengembangkan website penyortiran data slip gaji staf dari format Excel menjadi Word/PDF siap cetak secara digital.\n  3. Berkoordinasi intensif dengan staf dinas dalam merancang antarmuka yang mudah digunakan oleh seluruh pegawai.`;
  }

  // 4b. Ketua HIMASI
  if (has('ketua', 'himasi', 'ketua umum', 'himpunan', 'organisasi himasi')) {
    return `👑 **Kepemimpinan di HIMASI (Himpunan Mahasiswa Sistem Informasi UBSI):**\n\n• **Periode 2026 – 2027 (Ketua Umum):** Ibah memimpin seluruh pengurus himpunan, merumuskan arah kebijakan organisasi, mengoordinasikan program kerja tahunan (Seminar IT, Workshop Web Dev, Studi Banding), dan menjaga sinergi dengan program studi.\n• **Periode 2024 – 2025 (Anggota Litbang):** Mengadakan riset pengembangan SDM mahasiswa, survei kebutuhan skill pemrograman, dan menyusun evaluasi program kerja organisasi.`;
  }

  // 4c. BEM
  if (has('bem', 'kominfo', 'bem setasik', 'bem ubsi', 'organisasi')) {
    return `📢 **Riwayat Organisasi & Manajemen Media Digital:**\n\n1. **BEM Setasik (2025 – 2026):** Anggota Bidang Kominfo — Menangani dokumentasi kegiatan lapangan se-Tasikmalaya, produksi poster visual, dan publikasi media.\n2. **BEM UBSI Tasikmalaya (2024 – 2025):** Koordinator Kominfo — Mengelola akun Instagram resmi kampus, memproduksi video reels edukasi, pembuatan rilis poster, dan kehumasan lintas kampus.`;
  }

  // 5. TECH COMPARISON: WHY LARAVEL & WHY MYSQL
  if (has('kenapa laravel', 'mengapa laravel', 'apa itu laravel', 'kelebihan laravel', 'laravel vs', 'laravel dan bukan', 'laravel dibanding', 'milih laravel', 'pilih laravel')) {
    return `**Kenapa Ibah Memilih Framework Laravel untuk Web Development?** 🚀\n\n1. 🏗️ **Arsitektur MVC (Model-View-Controller):** Kode terstruktur rapi dan modular, memisahkan logika query database, pemrosesan bisnis, dan tampilan antarmuka.\n2. 🛡️ **Keamanan Bawaan (Built-in Security):** Proteksi otomatis terhadap ancaman web umum seperti CSRF (Cross-Site Request Forgery), XSS (Cross-Site Scripting), dan SQL Injection.\n3. ⚡ **Eloquent ORM:** Mempermudah manipulasi database relasional dengan sintaks yang ekspresif, cepat, dan minim bug.\n4. 📦 **Ekosistem Modern & Scalable:** Didukung fitur Blade Templating, Migration, Seeder, dan REST API routing yang memudahkan penambahan fitur baru di masa depan.`;
  }

  if (has('kenapa mysql', 'mengapa mysql', 'apa itu mysql', 'kelebihan mysql', 'mysql vs', 'mysql dibanding')) {
    return `**Kenapa Ibah Menggunakan MySQL?** 🗄️\n\nMySQL adalah sistem basis data relasional (RDBMS) standar industri yang sangat teruji, cepat, andal, dan aman.\n\nIbah memanfaatkannya untuk merancang skema relasi tabel yang terstruktur rapi (1NF–3NF), memastikan relasi antar tabel (foreign keys) berjalan optimal, serta mengoptimasi query data instansi, transaksi UMKM, maupun portal publik agar tidak mengalami *bottleneck*.`;
  }

  // 6. WHO IS IBAH / PROFILE & BIO
  if (has('siapa ibah', 'profil', 'biodata', 'tentang ibah', 'latar belakang', 'siapakah', 'siapa anda', 'siapa developer', 'ceritakan tentang', 'kenalan')) {
    return `**Ibah Misbah** adalah seorang **Freelance Web Developer** berdedikasi dan mahasiswa aktif S1 **Sistem Informasi di Universitas Bina Sarana Informatika (UBSI) Kampus Tasikmalaya** (periode 2024–2027).\n\n📌 **Ringkasan Profil & Dedikasi:**\n• **Spesialisasi:** Pengembangan aplikasi web terstruktur berbasis PHP & Framework Laravel, optimasi database relasional MySQL, dan antarmuka responsif modern.\n• **Domisili:** Kabupaten Ciamis, Jawa Barat, Indonesia.\n• **Pengalaman Nyata:** Berpengalaman membangun sistem internal instansi (*paperless meeting system* di Dinas Pariwisata Ciamis), platform pelayanan desa (*Cipakat-Hub*), landing page UMKM, serta dipercaya menjabat sebagai **Ketua Umum HIMASI UBSI Tasikmalaya (2026–2027)**.\n• **Filosofi Kerja:** Menghasilkan kode yang rapi (*clean code*), arsitektur database yang efisien, dan website yang menyelesaikan masalah nyata pengguna.`;
  }

  // 4. LOCATION & REACH
  if (has('tinggal di mana', 'tinggal dimana', 'orang mana', 'domisili', 'lokasi', 'asal mana', 'alamat', 'kota mana', 'daerah mana', 'ciamis')) {
    return `📍 **Domisili & Lokasi Kerja Ibah Misbah:**\nIbah berdomisili di **Kabupaten Ciamis, Jawa Barat, Indonesia**.\n\n🌐 **Jangkauan Layanan:**\n• Siap melayani proyek secara **Remote (Daring)** dari seluruh wilayah Indonesia maupun luar negeri.\n• Untuk wilayah Ciamis, Tasikmalaya, dan sekitarnya, sangat memungkinkan untuk koordinasi atau meeting tatap muka jika diperlukan.`;
  }

  // 5. TECH COMPARISON: WHY LARAVEL & WHY MYSQL
  if (has('kenapa laravel', 'mengapa laravel', 'apa itu laravel', 'kelebihan laravel', 'laravel vs', 'laravel dan bukan', 'laravel dibanding', 'php native')) {
    return `**Kenapa Ibah Memilih Framework Laravel untuk Web Development?** 🚀\n\n1. 🏗️ **Arsitektur MVC (Model-View-Controller):** Kode terstruktur rapi dan modular, memisahkan logika query database, pemrosesan bisnis, dan tampilan antarmuka.\n2. 🛡️ **Keamanan Bawaan (Built-in Security):** Proteksi otomatis terhadap ancaman web umum seperti CSRF (Cross-Site Request Forgery), XSS (Cross-Site Scripting), dan SQL Injection.\n3. ⚡ **Eloquent ORM:** Mempermudah manipulasi database relasional dengan sintaks yang ekspresif, cepat, dan minim bug.\n4. 📦 **Ekosistem Modern & Scalable:** Didukung fitur Blade Templating, Migration, Seeder, dan REST API routing yang memudahkan penambahan fitur baru di masa depan.`;
  }

  if (has('kenapa mysql', 'mengapa mysql', 'apa itu mysql', 'kelebihan mysql', 'mysql vs', 'mysql dibanding')) {
    return `**Kenapa Ibah Menggunakan MySQL?** 🗄️\n\nMySQL adalah sistem basis data relasional (RDBMS) standar industri yang sangat teruji, cepat, andal, dan aman.\n\nIbah memanfaatkannya untuk merancang skema relasi tabel yang terstruktur rapi (1NF–3NF), memastikan relasi antar tabel (foreign keys) berjalan optimal, serta mengoptimasi query data instansi, transaksi UMKM, maupun portal publik agar tidak mengalami *bottleneck*.`;
  }

  // 6. DETAILED 4 PROJECTS
  // 6a. Slip Gaji
  if (has('slip gaji', 'sortir', 'excel to pdf', 'excel to word', 'otomasi gaji')) {
    return `📄 **Proyek 01: Website Sortir Slip Gaji (Otomasi Dokumen)**\n\n• **Latar Belakang Masalah:** Staf bendahara/keuangan instansi sebelumnya harus memilah ribuan baris data penggajian di Excel dan mencetaknya secara manual yang memakan waktu berhari-hari serta boros kertas.\n• **Solusi yang Dibuat Ibah:** Aplikasi web interaktif yang mampu mem-parsing spreadsheet Excel secara instan, mengelompokkan data berdasarkan unit/nama, dan mengonversinya langsung ke dokumen Word/PDF siap cetak dengan layout rapi.\n• **Fitur Utama:** Drag-and-drop file Excel, filter data otomatis, preview layout slip gaji, cetak/ekspor PDF instan dengan keamanan data 100% di sisi klien (*client-side*).\n• **Teknologi:** HTML5, CSS3 modern, JavaScript Client-Side Processing.\n• **Tautan Repositori:** [github.com/githu423/website-slip-gaji](https://github.com/githu423/website-slip-gaji)`;
  }

  // 6b. Cipakat-Hub
  if (has('cipakat', 'sistem desa', 'layanan desa', 'surat desa', 'hub desa')) {
    return `🏛️ **Proyek 02: Cipakat-Hub (Platform Sistem Informasi Terpadu Desa)**\n\n• **Latar Belakang Masalah:** Pelayanan birokrasi surat warga desa masih manual, alur pengaduan lambat, dan produk UMKM warga desa belum memiliki media promosi digital yang terpadu.\n• **Solusi yang Dibuat Ibah:** Membangun platform web terpadu dengan 4 modul utama:\n  1. *Pengajuan Surat Mandiri:* Surat Keterangan Domisili, Usaha, Tidak Mampu dengan QR Code verifikasi.\n  2. *Pengaduan Masyarakat:* Sistem tiket pengaduan transparan dengan pelacakan status (*Diajukan, Diproses, Selesai*).\n  3. *Booking Fasilitas Desa:* Peminjaman aula/gedung/lapangan desa dengan kalender interaktif.\n  4. *Etalase UMKM Desa:* Showcase produk kerajinan/makanan khas warga desa dengan tombol order WhatsApp langsung.\n• **Teknologi:** Laravel Framework, PHP, MySQL Database, Bootstrap 5, JavaScript.\n• **Tautan Repositori:** [github.com/githu423/cipakat-hub](https://github.com/githu423/cipakat-hub)`;
  }

  // 6c. Dinas Pariwisata
  if (has('dinas pariwisata', 'dispar', 'rapat internal', 'paperless', 'sistem rapat')) {
    return `🏢 **Proyek 03: Website Internal Dinas Pariwisata Ciamis**\n\n• **Latar Belakang Masalah:** Koordinasi agenda rapat instansi di Bidang Perencanaan & Sekretariat sering terhambat oleh penumpukan dokumen fisik berbasis kertas dan lambatnya distribusi materi rapat.\n• **Solusi yang Dibuat Ibah:** Merancang portal dashboard internal *paperless* dengan otentikasi multi-role (Admin, Kepala Bidang, Notulis, Peserta), manajemen jadwal rapat terpusat, pengunggahan materi presentasi digital, dan arsip notulensi rapat.\n• **Fitur Utama:** Manajemen jadwal rapat, repository bahan tayang PDF/PPT, modul notulensi digital langsung terdistribusi, dan hemat kertas (*paperless*).\n• **Teknologi:** Laravel Framework, PHP, MySQL, Tailwind CSS.\n• **Tautan Repositori:** [github.com/githu423/dinas-pariwisata-internal](https://github.com/githu423/dinas-pariwisata-internal)`;
  }

  // 6d. UMKM Rajut
  if (has('rajut', 'tasikmalaya', 'rajut tasik', 'landing page rajut')) {
    return `🧶 **Proyek 04: Landing Page UMKM Rajut Tasikmalaya**\n\n• **Latar Belakang Masalah:** Perajin rajut lokal Tasikmalaya memiliki produk kerajinan berkualitas tinggi namun kesulitan menjangkau pasar di luar daerah karena belum memiliki etalase digital profesional.\n• **Solusi yang Dibuat Ibah:** Membangun landing page komersial berkecepatan tinggi, mobile-first layout, dilengkapi galeri katalog visual menarik dan integrasi pesanan langsung ke WhatsApp penjual dengan pre-filled text.\n• **Fitur Utama:** Galeri produk berfilter, kalkulator perkiraan harga pesanan rajut, integrasi tombol WhatsApp, optimasi SEO Google.\n• **Teknologi:** Laravel, PHP, MySQL, JavaScript, Node.js.\n• **Tautan Repositori:** [github.com/githu423/umkm-rajut-tasik](https://github.com/githu423/umkm-rajut-tasik)`;
  }

  // 6e. All Projects Overview
  if (has('proyek', 'project', 'portofolio', 'portfolio', 'karya', 'bikin apa aja', 'hasil kerja', 'daftar proyek', 'contoh web')) {
    return `Berikut 4 proyek unggulan yang telah diselesaikan oleh **Ibah Misbah**:\n\n1. 📄 **Website Sortir Slip Gaji** (HTML, CSS, JS) — Otomasi pengolahan data slip gaji dari Excel ke Word/PDF siap cetak.\n2. 🏛️ **Cipakat-Hub** (Laravel, PHP, MySQL, Bootstrap) — Sistem informasi terpadu pelayanan warga desa & etalase produk UMKM.\n3. 🏢 **Website Internal Dinas Pariwisata Ciamis** (Laravel, PHP, MySQL, Tailwind) — Portal rapat instansi digital *paperless*.\n4. 🧶 **Landing Page UMKM Rajut Tasikmalaya** (Laravel, PHP, MySQL, JS) — Landing page komersial promosi produk rajut lokal.\n\nAnda dapat mengklik tombol **Detail & Arsitektur** pada kartu proyek di website untuk melihat modal detail dan repositori GitHub!`;
  }

  // 7. EXPERIENCES & LEADERSHIP
  // 7a. PKL Dispar
  if (has('pkl', 'magang', 'dinas', 'kerja di dinas')) {
    return `🏢 **Pengalaman PKL di Dinas Pariwisata Ciamis (Agustus – Oktober 2026):**\n\n• **Divisi Penempatan:** Bidang Perencanaan, Sekretariat\n• **Peran:** Web Developer (Bekerja dalam tim 2 developer)\n• **Kontribusi & Capaian Nyata:**\n  1. Mengembangkan website internal sistem rapat digital (*paperless*) untuk mempercepat koordinasi rapat dan menghemat ribuan lembar kertas instansi.\n  2. Mengembangkan website penyortiran data slip gaji staf dari format Excel menjadi Word/PDF siap cetak secara digital.\n  3. Berkoordinasi intensif dengan staf dinas dalam merancang antarmuka yang mudah digunakan oleh seluruh pegawai.`;
  }

  // 7b. Ketua HIMASI
  if (has('ketua', 'himasi', 'ketua umum', 'himpunan', 'organisasi himasi')) {
    return `👑 **Kepemimpinan di HIMASI (Himpunan Mahasiswa Sistem Informasi UBSI):**\n\n• **Periode 2026 – 2027 (Ketua Umum):** Ibah memimpin seluruh pengurus himpunan, merumuskan arah kebijakan organisasi, mengoordinasikan program kerja tahunan (Seminar IT, Workshop Web Dev, Studi Banding), dan menjaga sinergi dengan program studi.\n• **Periode 2024 – 2025 (Anggota Litbang):** Mengadakan riset pengembangan SDM mahasiswa, survei kebutuhan skill pemrograman, dan menyusun evaluasi program kerja organisasi.`;
  }

  // 7c. BEM
  if (has('bem', 'kominfo', 'bem setasik', 'bem ubsi', 'organisasi')) {
    return `📢 **Riwayat Organisasi & Manajemen Media Digital:**\n\n1. **BEM Setasik (2025 – 2026):** Anggota Bidang Kominfo — Menangani dokumentasi kegiatan lapangan se-Tasikmalaya, produksi poster visual, dan publikasi media.\n2. **BEM UBSI Tasikmalaya (2024 – 2025):** Koordinator Kominfo — Mengelola akun Instagram resmi kampus, memproduksi video reels edukasi, pembuatan rilis poster, dan kehumasan lintas kampus.`;
  }

  // 8. TECHNICAL STACK & PROGRAMMING SKILLS
  if (has('skill', 'keahlian', 'teknologi', 'stack', 'bahasa pemrograman', 'kuasai', 'bisa koding apa', 'tools', 'laravel', 'php', 'mysql', 'javascript', 'html', 'css', 'tailwind', 'bootstrap', 'git', 'canva')) {
    return `💻 **Keahlian Teknis & Pemrograman Ibah Misbah:**\n\n• **Back-End Development (Tingkat Mahir / Advanced):**\n  - PHP Native & OOP\n  - Framework Laravel (MVC, Eloquent ORM, REST API Routing, Auth Guards, Blade)\n  - Node.js (Dasar package management & runtime)\n• **Database Engineering (Tingkat Mahir / Advanced):**\n  - MySQL (Perancangan Skema Relasional, Foreign Keys, Normalisasi 1NF–3NF, Query Optimization, XAMPP)\n• **Front-End Development (Tingkat Mahir / Advanced):**\n  - HTML5 Semantic & Accessibility\n  - CSS3 Modern, Flexbox, Grid, Animations\n  - JavaScript ES6+ (DOM Manipulation, Fetch API, Async/Await)\n  - Tailwind CSS & Bootstrap 5\n• **Development & Multimedia Tools:**\n  - Git & GitHub, Visual Studio Code, XAMPP\n  - Canva, CapCut, PixelLab, Photoshop, After Effects, Word, Excel, Google Sheets.`;
  }

  // 9. CAPABILITIES: CUSTOM WEB, SKRIPSI, TOKO ONLINE, BUG FIX
  if (has('tugas akhir', 'skripsi', 'bantu ta', 'proyek kuliah', 'bantu skripsi', 'bantu koding')) {
    return `Ya, Ibah Misbah sangat siap membantu perancangan dan pembuatan **Website untuk Tugas Akhir / Skripsi / Proyek Akademik**! 🎓\n\n• Membantu pembuatan sistem informasi berbasis Laravel, PHP, dan MySQL yang terstruktur rapi sesuai kaidah metodologi (Waterfall/Agile).\n• Penulisan kode bersih (*clean code*) dengan diagram alur database yang jelas sehingga sangat mudah dipahami dan dipresentasikan saat sidang tugas akhir.\n\nSilakan diskusikan judul atau rancangan ide tugas akhir Anda via WhatsApp: **0822-1967-8296**.`;
  }

  if (has('toko online', 'olshop', 'ecommerce', 'e-commerce', 'jualan', 'katalog', 'umkm')) {
    return `Tentu saja! Ibah berpengalaman membangun **Landing Page dan Katalog Online untuk UMKM** (salah satu portofolionya adalah *Landing Page UMKM Rajut Tasikmalaya*). 🛍️\n\nFitur yang bisa disematkan:\n• Tampilan responsif & cepat di smartphone.\n• Galeri foto produk berkualitas dengan filter kategori.\n• Tombol 'Pesan Sekarang' yang langsung terhubung ke WhatsApp penjual dengan format teks otomatis.\n• Panel admin untuk update harga dan foto produk.\n\nIngin membuat katalog toko online Anda? Hubungi Ibah di WhatsApp: [0822-1967-8296](${IBAH_PROFILE.personal.whatsappUrl})`;
  }

  if (has('benerin', 'error', 'bug', 'tambah fitur', 'perbaiki web', 'maintenance', 'ngedit web', 'bantu coding')) {
    return `Bisa! Ibah melayani **Bug Fixing, Penambahan Fitur, dan Maintenance Website** yang sudah ada, khususnya untuk proyek berbasis **PHP, Laravel, MySQL, JavaScript, HTML, atau CSS**.\n\nIbah akan menganalisis kode yang mengalami error dan memberikan solusi yang efektif. Silakan kirimkan kendala atau screenshot error ke WhatsApp Ibah: **0822-1967-8296**.`;
  }

  // 10. WHY HIRE IBAH / COMPARISON
  if (has('kenapa harus', 'mengapa harus', 'alasan memilih', 'kelebihan ibah', 'keunggulan', 'apa bedanya', 'kenapa pilih ibah', 'kenapa rekrut')) {
    return `Berikut 5 alasan mengapa **Ibah Misbah** adalah pilihan tepat untuk proyek website Anda:\n\n1. 🎯 **Struktur Kode & Database Rapi:** Mengikuti standar arsitektur MVC Laravel dan normalisasi MySQL, membuat website mudah dikembangkan di masa depan.\n2. 💡 **Solutif Berdasarkan Masalah Nyata:** Terbukti sukses membuat sistem digital untuk instansi pemerintah daerah dan masyarakat desa.\n3. ⚡ **Komunikasi Cepat & Transparan:** Ibah sangat komunikatif, memberikan update rutin, dan terbuka menerima masukan selama proses development.\n4. 👑 **Kombinasi Teknis & Jiwa Kepemimpinan:** Pengalaman memimpin organisasi mahasiswa melatih kemampuan manajemen waktu, ketelitian, dan kepemimpinan proyek.\n5. 🤝 **Fleksibel & Terjangkau:** Penawaran biaya yang adil dan dapat disesuaikan dengan skala kebutuhan Anda.`;
  }

  // 11. WORKFLOW & TIMELINE
  if (has('cara kerja', 'alur kerja', 'cara pesan', 'cara order', 'gimana cara', 'langkah pemesanan', 'tahapan pembuatan', 'mau bikin web', 'pengen buat web')) {
    return `Berikut 5 langkah mudah bekerja sama dengan **Ibah Misbah**:\n\n1. 💬 **Konsultasi Kebutuhan (Gratis):** Sampaikan ide, tujuan, dan fitur website yang Anda inginkan via WhatsApp (**0822-1967-8296**).\n2. 📋 **Penyusunan Rencana & Penawaran:** Ibah akan memberikan rekomendasi arsitektur sistem, estimasi waktu (timeline), dan penawaran biaya yang transparan.\n3. 💻 **Tahap Development (Koding):** Pengerjaan antarmuka UI/UX, backend logic Laravel/PHP, dan integrasi database MySQL dengan update progres berkala.\n4. 🧪 **Uji Coba & Revisi (Testing):** Pengecekan fungsionalitas, keamanan, dan responsivitas di smartphone bersama Anda.\n5. 🚀 **Peluncuran (Deployment) & Serah Terima:** Website di-online-kan (hosting & domain) lengkap dengan panduan penggunaan sistem.`;
  }

  if (has('berapa lama', 'lama pengerjaan', 'durasi', 'deadline', 'waktu pengerjaan', 'bisa cepat', 'berapa hari')) {
    return `⏱️ **Estimasi Waktu Pengerjaan Website oleh Ibah:**\n\n• **Landing Page / Web Promosi UMKM:** 3 – 5 hari kerja.\n• **Sistem Informasi Standar / Profil Instansi:** 1 – 2 minggu.\n• **Aplikasi Web Kompleks (Multi-Role User, Database Custom):** 2 – 4 minggu.\n\n*Catatan:* Timeline bisa disesuaikan jika Anda memiliki tenggat waktu (deadline) khusus yang mendesak.`;
  }

  // 12. PRICING & PAYMENT TERMS
  if (has('harga', 'tarif', 'biaya', 'rate', 'budget', 'duit', 'ongkos', 'mahal gak', 'bisa nego', 'bisa cicil', 'bayar berapa', 'kisaran harga')) {
    return `💰 **Biaya Pembuatan Website oleh Ibah Misbah:**\n\n• Biaya bersifat **fleksibel dan dapat disesuaikan dengan ruang lingkup fitur & anggaran Anda**.\n• Sangat terjangkau dan ramah bagi pelaku UMKM, organisasi kemahasiswaan, kantor instansi dinas, maupun mahasiswa tugas akhir.\n• Pembayaran dapat dilakukan bertahap (sistem termin/DP) selama proses development berjalan.\n\nSilakan diskusikan kebutuhan dan anggaran Anda langsung dengan Ibah via WhatsApp: **0822-1967-8296**.`;
  }

  // 13. CONTACT & SOCIALS
  if (has('kontak', 'whatsapp', 'wa', 'nomor hp', 'no hp', 'nomor wa', 'email', 'telepon', 'hubungi', 'instagram', 'linkedin', 'github', 'sosmed')) {
    return `📬 **Kanal Kontak Resmi Ibah Misbah:**\n\n• 🟢 **WhatsApp / Telepon:** [0822-1967-8296](https://wa.me/6282219678296?text=Halo%20Ibah,%20saya%20melihat%20portfolio%20Anda)\n• ✉️ **Email Resmi:** [ibahmisbahh6@gmail.com](mailto:ibahmisbahh6@gmail.com)\n• 🐙 **GitHub:** [github.com/githu423](https://github.com/githu423)\n• 💼 **LinkedIn:** [linkedin.com/in/ibah-misbah](https://linkedin.com/in/ibah-misbah)\n• 📸 **Instagram:** [instagram.com/ibah.codes](https://instagram.com/ibah.codes)\n• 📍 **Domisili:** Kabupaten Ciamis, Jawa Barat, ID\n\nKlik tautan WhatsApp di atas untuk respon instan setiap hari!`;
  }

  // 14. MEETING VIA ZOOM / GOOGLE MEET
  if (has('meeting', 'zoom', 'google meet', 'gmeet', 'ketemuan', 'diskusi langsung', 'video call')) {
    return `Tentu saja! Ibah sangat terbuka untuk **Meeting Daring via Google Meet atau Zoom** guna mendiskusikan detail spesifikasi website Anda secara lebih mendalam.\n\nUntuk wilayah Ciamis dan Tasikmalaya juga memungkinkan pertemuan tatap muka. Silakan tentukan jadwal yang nyaman bagi Anda melalui WhatsApp: **0822-1967-8296**.`;
  }

  // 15. AVAILABILITY
  if (has('tersedia', 'available', 'part time', 'remote', 'kapan bisa', 'bisa remote', 'jam kerja', 'waktu luang', 'malam bisa')) {
    return `💼 **Ketersediaan Kerja Ibah Misbah:**\n\n• **Status:** Available for Projects (Tersedia menerima proyek baru)\n• **Tipe Kontrak:** Freelance Part-Time / Project-Based\n• **Metode Kolaborasi:** Remote (Daring) dari mana saja\n• **Waktu Kerja Aktif:** Fleksibel / Sore & Malam Hari.\n\nIbah sangat responsif dan siap berdiskusi daring mengenai ide proyek Anda.`;
  }

  // 16. EDUCATION (GENERAL)
  if (has('kuliah', 'kampus', 'universitas', 'sekolah', 'pendidikan', 'ubsi', 'jurusan', 'prodi', 'semester', 'sarjana', 's1', 'studi')) {
    return `🎓 **Riwayat Pendidikan Ibah Misbah:**\n\n• **Institusi:** Universitas Bina Sarana Informatika (UBSI) Kampus Tasikmalaya\n• **Program Studi:** S1 Sistem Informasi\n• **Fakultas:** Fakultas Teknik & Informatika\n• **Periode:** 2024 – 2027 (Sedang Menempuh)\n• **Fokus Kompetensi:** Rekayasa Perangkat Lunak Berorientasi Objek (OOP), Basis Data Relasional (MySQL), Analisis & Perancangan Sistem Informasi, serta Manajemen Proyek Teknologi.`;
  }

  // 17. ENGLISH QUERY HANDLING
  if (has('who is', 'tell me about', 'skills', 'projects', 'contact', 'hire', 'services', 'price', 'experience', 'hello', 'hi')) {
    return `**Ibah Misbah** is a professional **Freelance Web Developer** and Information Systems student at Universitas Bina Sarana Informatika (UBSI), located in Ciamis, West Java, Indonesia.\n\n• **Core Stack:** PHP, Laravel (MVC), MySQL Relational Database, HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap.\n• **Featured Works:** Excel-to-Word Salary Slip Automated Sorter, Cipakat-Hub Village System, Internal Paperless Meeting System for Dinas Pariwisata Ciamis, and UMKM Knitting Landing Page.\n• **Contact & Hiring:** Direct WhatsApp: [+62 822-1967-8296](https://wa.me/6282219678296) | Email: [ibahmisbahh6@gmail.com](mailto:ibahmisbahh6@gmail.com).`;
  }

  // 18. NATURAL GUIDED FALLBACK
  return `Pertanyaan yang sangat menarik! 😊\n\nUntuk informasi lebih mendalam seputar hal tersebut atau jika Anda memiliki kebutuhan spesifik mengenai pembuatan website, Anda dapat langsung berdiskusi dengan **Ibah Misbah** via WhatsApp di [0822-1967-8296](https://wa.me/6282219678296?text=Halo%20Ibah,%20saya%20ingin%20berdiskusi%20mengenai%20project).\n\nSaya juga dapat menjelaskan seputar:\n• 💻 **Keahlian Teknis & Tech Stack** (Laravel, PHP, MySQL, Tailwind)\n• 📁 **4 Proyek Nyata & Repositori GitHub**\n• 🏢 **Pengalaman PKL di Dinas Pariwisata & Ketua HIMASI UBSI**\n• 📋 **Alur Pemesanan & Estimasi Waktu Website**\n\nAda bagian portofolio Ibah yang ingin Anda tanyakan lebih rinci?`;
}

// Fallback for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===================================================`);
  console.log(` IBAH MISBAH PORTFOLIO & ADVANCED AI SERVER RUNNING`);
  console.log(` Port: ${PORT}`);
  console.log(` Local: http://localhost:${PORT}`);
  console.log(`===================================================`);
});
