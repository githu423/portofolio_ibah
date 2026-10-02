# Website Personal Portfolio Profesional — Ibah Misbah

Website **Personal Portfolio Profesional & Responsif** untuk **Ibah Misbah** (*Freelance Web Developer*). Dibangun dengan arsitektur bersih menggunakan **HTML5, CSS3, Vanilla JavaScript, Node.js, Express, dan AI Chatbot Assistant (Ask Ibah)**.

---

## 1. 📁 Struktur Folder Proyek

```text
portofolio_ibah/
│
├── index.html                   # Halaman utama (Struktur Semantic HTML5)
├── style.css                    # Styling visual, Typography, Responsive & Theme System
├── script.js                    # Interaktivitas frontend, Modal, Validasi Form & Client Chatbot
│
├── assets/
│   ├── images/
│   │   ├── profile.jpg          # Foto profil utama Ibah Misbah
│   │   ├── profile.svg          # Vektor ilustrasi avatar profil cadangan
│   │   ├── project-01.jpg       # Gambar proyek Website Sortir Slip Gaji
│   │   ├── project-02.jpg       # Gambar proyek Cipakat-Hub
│   │   ├── project-03.jpg       # Gambar proyek Website Internal Dinas Pariwisata
│   │   └── project-04.jpg       # Gambar proyek Landing Page UMKM Rajut Tasikmalaya
│   │
│   └── cv/
│       └── cv.pdf               # Dokumen resmi Curriculum Vitae (PDF)
│
├── backend/
│   ├── server.js                # Server Node.js / Express & Endpoint POST /api/chat
│   ├── package.json             # Dependensi backend (express, cors, dotenv)
│   ├── .env.example             # Contoh konfigurasi environment variable
│   └── data/
│       └── ibah-profile.js      # Basis data pengetahuan resmi profil Ibah Misbah
│
├── .env.example                 # Template konfigurasi environment root
├── .gitignore                   # Ignore file node_modules, .env, log
└── README.md                    # Dokumentasi lengkap proyek
```

---

## 2. ⚙️ Fungsi Setiap File

1. **`index.html`**
   - Struktur semantic HTML5 lengkap: **Navbar Sticky**, **Hero Section**, **About Me**, **Services (What I Do)**, **Technical Skills Matrix**, **Experience Timeline (PKL & Organisasi)**, **My Projects Showcase**, **Education & Certifications**, **Languages**, **Availability Banner**, **Contact Form & Direct WhatsApp**, **Footer**, **Project Detail Modal**, dan **Floating AI Chatbot (Ask Ibah)**.

2. **`style.css`**
   - Mengatur sistem desain minimalis, bersih, dan profesional:
     - Latar Belakang: `#FFFFFF` & `#F7F8FA`
     - Teks: `#111111` & `#555555`
     - Aksen Utama: `#2563EB` (Royal Blue) & Hover `#1D4ED8`
     - Tipografi: *Poppins* (Google Fonts) & *JetBrains Mono*
     - Responsive Breakpoints: Desktop (>=1200px), Tablet (768px–1199px), Mobile (<768px), Small Mobile (<480px).

3. **`script.js`**
   - Mengontrol interaksi navbar sticky dan active state link saat scrolling.
   - Mengelola pembukaan dan penutupan **Project Detail Modal** saat kartu proyek diklik.
   - Validasi formulir kontak (Name, Email format, Subject, Message min. 10 karakter).
   - Mengoperasikan **Ask Ibah AI Chatbot** (koneksi ke `/api/chat` dan fallback lokal anti-halusinasi).
   - Tombol Back to Top halus.

4. **`backend/server.js`**
   - Server Node.js Express yang melayani file static frontend dan endpoint `POST /api/chat`.
   - Mengamankan API key di sisi server (tidak terekspos ke browser).
   - Dilengkapi *rate limiting* dan validasi input.
   - Mendukung integrasi OpenAI API atau beralih otomatis ke *Knowledge Base Matcher*.

5. **`backend/data/ibah-profile.js`**
   - Berisi data terverifikasi riwayat pendidikan, skill, pengalaman, dan proyek Ibah Misbah sebagai sumber data anti-halusinasi chatbot.

---

## 3. 🚀 Cara Menjalankan Website

### Opsi A: Menggunakan Node.js Backend Server (Rekomendasi)
1. Pastikan Node.js telah terpasang.
2. Masuk ke folder backend dan install dependensi:
   ```bash
   cd backend
   npm install
   ```
3. Salin file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
4. Jalankan server:
   ```bash
   npm start
   ```
5. Buka browser pada alamat: **`http://localhost:5173`**

### Opsi B: Membuka Langsung di Browser (Frontend Standalone)
- Cukup klik dua kali pada file **`index.html`** di browser manapun (*Chrome, Firefox, Safari, Edge*).
- Seluruh fitur UI, modal proyek, validasi form, dan chatbot AI (mode lokal anti-halusinasi) akan berjalan 100% normal tanpa perlu instalasi server.

---

## 4. ✏️ Panduan Kustomisasi

### A. Mengganti Foto Profil
1. Siapkan foto profil Anda dengan format JPG/PNG (rasio 1:1 atau kotak).
2. Simpan ke folder `assets/images/` dengan nama **`profile.jpg`**.
3. File `index.html` sudah otomatis membaca file `assets/images/profile.jpg`.

### B. Mengganti Gambar Proyek
1. Simpan screenshot/tampilan proyek ke `assets/images/` dengan nama:
   - Proyek 1: `assets/images/project-01.jpg`
   - Proyek 2: `assets/images/project-02.jpg`
   - Proyek 3: `assets/images/project-03.jpg`
   - Proyek 4: `assets/images/project-04.jpg`

### C. Mengganti Link GitHub & LinkedIn
1. Buka file **`index.html`**, cari tag `<a>` social media di Hero Section, Footer, dan Modal.
2. Ganti URL placeholder:
   ```html
   <!-- Ganti dengan URL GitHub Anda -->
   <a href="https://github.com/username-anda" class="social-icon">...</a>

   <!-- Ganti dengan URL LinkedIn Anda -->
   <a href="https://linkedin.com/in/username-anda" class="social-icon">...</a>
   ```
3. Sesuaikan juga pada file `backend/data/ibah-profile.js`.

### D. Mengganti Dokumen CV (PDF)
1. Simpan file PDF CV Anda ke folder `assets/cv/` dengan nama **`cv.pdf`**.

### E. Memasang OpenAI API Key untuk Chatbot (Opsional)
1. Buka file `backend/.env` (atau buat dari `.env.example`).
2. Masukkan API key OpenAI Anda:
   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Jika tidak diisi, chatbot akan secara otomatis menggunakan engine pencocokan data resmi Ibah Misbah tanpa biaya API dan tanpa halusinasi!

---

## 5. 🤖 Fitur AI Chatbot ("ASK IBAH")

- **Floating Action Button (60px)** di sudut kanan bawah dengan status `● Online`.
- **Quick Question Chips**:
  - *"Siapa Ibah Misbah?"*
  - *"Apa skill Ibah?"*
  - *"Project apa saja?"*
  - *"Apakah Ibah menerima freelance?"*
  - *"Di mana Ibah kuliah?"*
  - *"Bagaimana cara menghubungi Ibah?"*
- **Aturan Anti-Halusinasi:** Bot hanya memberikan informasi yang tercantum dalam CV/portofolio resmi. Pertanyaan di luar kualifikasi (seperti tarif pasti atau hal pribadi) akan diarahkan dengan sopan ke kontak WhatsApp/Email Ibah.

---

© 2026 **Ibah Misbah**. All rights reserved.
