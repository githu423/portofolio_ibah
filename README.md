# Website Personal Portfolio — Ibah Misbah

Website **portofolio personal** yang berfokus pada **memperkenalkan Ibah Misbah kepada dunia**: siapa saya, apa yang saya kerjakan, karya yang sudah dibuat, serta peluang kerja sama. Tidak hanya untuk freelance—portofolio ini juga menyampaikan bahwa saya terbuka untuk peran **full-time**, magang, dan kolaborasi tim.

Dibangun dengan **HTML5, CSS3, Vanilla JavaScript, Node.js/Express, dan asisten virtual “Ask Ibah”**. Seluruh antarmuka tersedia dalam **dua bahasa: Bahasa Indonesia dan English**.

---

## 1. Fitur Utama

| Fitur                       | Keterangan                                                                                                                                                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Personal branding**       | Hero, About, Focus, Experience, Projects, Education, dan Opportunities menyusun narasi “kenalan dengan Ibah”, bukan sekadar daftar jasa freelance.                                                                                 |
| **Bilingual ID / EN**       | Tombol `ID / EN` di navbar dan menu mobile mengganti seluruh teks situs, placeholder, judul halaman, meta description, modal proyek, CV, notifikasi, dan balasan chatbot. Pilihan tersimpan di `localStorage`.                     |
| **Kontak dua kanal**        | **WhatsApp** (membuka chat dengan pesan siap kirim) dan **Email** (form dikirim langsung ke `ibahmisbahh6@gmail.com` melalui API SMTP). Jika SMTP belum dikonfigurasi, sistem membuka email dengan subjek & isi yang sudah terisi. |
| **Ask Ibah (AI Assistant)** | Chatbot dengan knowledge base resmi, anti-halusinasi, balasan bilingual, dan opsi integrasi OpenAI API.                                                                                                                            |
| **Tampilan**                | Light/Dark mode, animasi scroll, typewriter, skill & project filter, modal detail proyek, CV viewer, toast, dan layout responsif.                                                                                                  |
| **Navigasi**                | Navbar horizontal yang ringkas di desktop (link sekunder masuk menu “Lainnya”) dan drawer hamburger di tablet/mobile.                                                                                                              |

---

## 2. Struktur Proyek

```text
portofolio_ibah/
├── index.html                    # Struktur semantic HTML + atribut data-i18n-* (terformat rapi)
├── style.css                     # Design system, navbar, tema, responsivitas
├── i18n.js                       # Kamus Bahasa Indonesia ↔ English + mesin switch bahasa
├── script.js                     # Interaksi, modal, filter, form WhatsApp/Email, chatbot
├── assets/
│   ├── images/                   # Foto profil & 4 gambar proyek
│   └── cv/cv.pdf                 # CV resmi (PDF)
├── backend/
│   ├── server.js                 # Express: static files, /api/chat, /api/profile, /api/contact
│   ├── data/
│   │   ├── ibah-profile.js       # Knowledge base resmi profil Ibah
│   │   └── chat-english.js       # Balasan chatbot khusus bahasa Inggris
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example              # Template env backend
├── .env.example                  # Template env root (sama dengan backend)
├── .gitignore
└── README.md
```

---

## 3. Menjalankan Website

### Opsi A — Server Express (rekomendasi, diperlukan untuk email & AI)

```bash
cd backend
npm install
cp .env.example .env       # lalu isi variabel(email/AI) sesuai kebutuhan
npm start
```

Buka `http://localhost:5173`.

### Opsi B — Buka langsung `index.html`

Seluruh tampilan, switch bahasa, modal, filter, dan chatbot lokal tetap berfungsi. Endpoint `/api/contact` tidak tersedia, sehingga form email otomatis membuka aplikasi email dengan pesan siap kirim.

---

## 4. Mengirim Email dari Form Kontak

Form kontak memiliki dua metode:

- **Email** — data dikirim ke `POST /api/contact`; server mengirim email ke `CONTACT_EMAIL_TO` via SMTP.
- **WhatsApp** — membuka `wa.me/6282219678296` dengan pesan yang sudah dirapikan.

### Menyiapkan SMTP (Gmail)

1. Aktifkan 2-Step Verification di akun Google.
2. Buat **App Password** di <https://myaccount.google.com/apppasswords>.
3. Isi `backend/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ibahmisbahh6@gmail.com
SMTP_PASS=APP_PASSWORD_16_KARAKTER
CONTACT_EMAIL_TO=ibahmisbahh6@gmail.com
CONTACT_EMAIL_FROM=ibahmisbahh6@gmail.com
```

4. Restart server. Jika `SMTP_HOST`, `SMTP_USER`, dan `SMTP_PASS` terisi, email benar-benar dikirim (dengan `Reply-To` ke alamat pengirim). Jika belum, API mengembalikan `mailto:` dan browser membuka email siap kirim—pesan tetap bisa sampai ke Ibah.

> Jangan pernah menyimpan `backend/.env` ke Git. File sudah masuk `.gitignore`.

### Endpoint

| Method | Path           | Fungsi                                            |
| ------ | -------------- | ------------------------------------------------- |
| `GET`  | `/api/profile` | Data profil resmi (bilingual knowledge base)      |
| `POST` | `/api/chat`    | Chatbot; body `{ message, language: "id"\|"en" }` |
| `POST` | `/api/contact` | Kirim pesan kontak ke email Ibah                  |

---

## 5. Cara Kerja Switch Bahasa

1. Setiap teks di `index.html` diberi atribut `data-i18n`, `data-i18n-title`, `data-i18n-placeholder`, `data-i18n-aria`, `data-i18n-alt`, atau `data-i18n-options`.
2. `i18n.js` menyimpan terjemahan di `I18N.id` dan `I18N.en`, lalu `applyTranslations()` menulis ulang teks di halaman.
3. `setLanguage('en' | 'id')` mengubah `<html lang>`, `document.title`, meta description, tombol aktif, `localStorage`, dan memicu event `languagechange`.
4. `script.js` mendengarkan event tersebut untuk memperbarui typewriter, kode terminal, modal proyek, label tombol form, dan balasan chatbot.

Untuk menambah/mengubah teks: cukup edit entri yang sesuai di `i18n.js` (keduanya, `id` dan `en`).

---

## 6. Chatbot “ASK IBAH”

- Tombol mengambang di kanan bawah + pintasan di navbar dan hero card.
- Quick questions: 4 proyek, **Full-Time**, PKL Dispar, Tech Stack, Kenapa Laravel, Ketua HIMASI, Alur & Biaya, dan Kontak.
- Aturan anti-halusinasi: hanya menjawab dari data resmi di `backend/data/ibah-profile.js`, knowledge base frontend, dan `chat-english.js`.
- Pertanyaan di luar data diarahkan ke WhatsApp/Email resmi.
- Jika `OPENAI_API_KEY` diisi, jawaban dibuat oleh OpenAI dengan instruksi bahasa sesuai pilihan pengunjung; jika gagal, otomatis jatuh ke engine lokal.

---

## 7. Konvensi & Kerapian Kode

- Seluruh file HTML, CSS, dan JavaScript diformat dengan **Prettier** (`printWidth: 110`, `singleQuote: true`, `trailingComma: all`).
- CSS dikelompokkan menjadi bagian bernomor dengan komentar deskriptif; variabel desain ada di `:root`.
- Teks UI tidak ditanam langsung di banyak elemen: semuanya memakai atribut `data-i18n-*` dan diterjemahkan dari `i18n.js`.
- Navbar desktop memakai `.nav-links-desktop` dengan dropdown `.nav-dropdown`; aktif link dikelola bersama menu mobile oleh `initNavbarScroll()` dan `initNavDropdown()` handles menu “Lainnya”.

## 8. Kustomisasi Cepat

| Yang diubah                               | Lokasi                                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------------ |
| Foto profil                               | `assets/images/profile.jpg`                                                    |
| Gambar proyek                             | `assets/images/project-01.jpg` … `project-04.jpg`                              |
| CV                                        | `assets/cv/cv.pdf`                                                             |
| Teks & terjemahan                         | `i18n.js`                                                                      |
| Nomor WhatsApp / email                    | `index.html`, `script.js`, `backend/server.js`, `backend/data/ibah-profile.js` |
| Skill, pengalaman, proyek (knowledge bot) | `backend/data/ibah-profile.js`                                                 |
| Warna & tipografi                         | variabel di bagian atas `style.css`                                            |
| Navbar & dropdown                         | blok `NAVBAR POLISH & LAYOUT RHYTHM` di `style.css`                            |

---

© 2026 **Ibah Misbah**. All rights reserved.

Catatan: identitas/avatar sengaja tidak ditampilkan di navbar; nama dan foto tetap tampil di hero, CV, dan footer. Pada layar mobile, foto profil berada paling atas tepat di bawah navbar.

## Status Link Proyek

- Semua proyek di bagian _Karya & Implementasi_ masih berupa **repositori GitHub** — belum di-hosting atau dipublikasikan. Karena itu setiap kartu proyek memakai chip status "Repositori GitHub — belum di-hosting", dan tombol "Demo / Link" pada modal detail sengaja dinonaktifkan dengan label "Demo Belum Tersedia".
- Link repositori disesuaikan dengan akun asli: `slip_gaji` dan `Cipakat-Hub` (publik), Website Internal Dinas Pariwisata (privat → mengarah ke profil GitHub), dan Landing Page UMKM Rajut (repo `umkm-rajut-tasik` mengikuti judul proyek; buat repo dengan nama tersebut agar link aktif).
- Saat sebuah proyek nanti di-hosting, cukup isi `liveUrl` pada `PROJECT_LINKS` di `script.js`; tombol demo akan aktif otomatis dan labelnya kembali normal.
