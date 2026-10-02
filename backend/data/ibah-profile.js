/**
 * ==============================================================================
 * IBAH MISBAH — OFFICIAL PORTFOLIO KNOWLEDGE BASE
 * Sumber Data Resmi untuk Chatbot AI & Profil
 * ==============================================================================
 */

const IBAH_PROFILE = {
  personal: {
    name: "Ibah Misbah",
    role: "Freelance Web Developer",
    location: "Kabupaten Ciamis",
    email: "ibahmisbahh6@gmail.com",
    phone: "082219678296",
    whatsappUrl: "https://wa.me/6282219678296?text=Halo%20Ibah,%20saya%20tertarik%20berdiskusi%20mengenai%20project%20website",
    githubUrl: "https://github.com/githu423",
    linkedinUrl: "https://linkedin.com/in/ibah-misbah",
    bio: "Ibah Misbah adalah Freelance Web Developer dan mahasiswa Sistem Informasi dengan pengalaman mengembangkan solusi berbasis website untuk kebutuhan akademik, organisasi, dan instansi. Berfokus menghasilkan website yang sesuai kebutuhan client.",
    availability: {
      status: "Available for Work",
      type: "Freelance Part-Time",
      workMode: "Remote",
      time: "Evening Availability"
    }
  },

  education: {
    institution: "Universitas Bina Sarana Informatika (UBSI) Tasikmalaya",
    major: "Sistem Informasi",
    faculty: "Fakultas Teknik & Informatika",
    period: "2024 – 2027"
  },

  services: [
    {
      id: "srv-1",
      number: "01",
      title: "WEBSITE DEVELOPMENT",
      description: "Pengembangan website sesuai kebutuhan akademik, organisasi, instansi, maupun bisnis."
    },
    {
      id: "srv-2",
      number: "02",
      title: "FRONT-END DEVELOPMENT",
      description: "Membangun interface website yang responsive, terstruktur, dan mudah digunakan."
    },
    {
      id: "srv-3",
      number: "03",
      title: "BACK-END DEVELOPMENT",
      description: "Mengembangkan logic aplikasi website menggunakan PHP dan Laravel."
    },
    {
      id: "srv-4",
      number: "04",
      title: "DATABASE / MYSQL",
      description: "Perancangan dan pengelolaan database menggunakan MySQL."
    }
  ],

  skills: {
    webDevelopment: [
      { name: "PHP", level: "Advanced / Mahir", pct: 90 },
      { name: "Laravel", level: "Advanced / Mahir", pct: 90 },
      { name: "MySQL", level: "Advanced / Mahir", pct: 90 },
      { name: "HTML", level: "Advanced / Mahir", pct: 90 },
      { name: "CSS", level: "Advanced / Mahir", pct: 90 },
      { name: "JavaScript", level: "Advanced / Mahir", pct: 90 },
      { name: "Bootstrap", level: "Advanced / Mahir", pct: 90 },
      { name: "Tailwind CSS", level: "Advanced / Mahir", pct: 90 },
      { name: "Node.js", level: "Basic / Dasar", pct: 40 }
    ],
    developmentTools: [
      { name: "Git / GitHub", level: "Advanced / Mahir", pct: 90 },
      { name: "XAMPP", level: "Advanced / Mahir", pct: 90 },
      { name: "Visual Studio Code", level: "Advanced / Mahir", pct: 90 }
    ],
    otherTools: [
      { name: "Canva", level: "Advanced / Mahir", pct: 90 },
      { name: "CapCut", level: "Advanced / Mahir", pct: 90 },
      { name: "PixelLab", level: "Advanced / Mahir", pct: 90 },
      { name: "Photoshop", level: "Intermediate / Menengah", pct: 70 },
      { name: "After Effects", level: "Intermediate / Menengah", pct: 70 },
      { name: "Microsoft Word", level: "Advanced / Mahir", pct: 90 },
      { name: "Microsoft Excel", level: "Intermediate / Menengah", pct: 70 },
      { name: "Microsoft PowerPoint", level: "Intermediate / Menengah", pct: 70 },
      { name: "Google Docs", level: "Intermediate / Menengah", pct: 70 },
      { name: "Google Sheets", level: "Advanced / Mahir", pct: 90 }
    ]
  },

  experience: [
    {
      id: "exp-1",
      number: "01",
      organization: "Dinas Pariwisata Ciamis",
      role: "Web Developer (PKL)",
      division: "Bidang Perencanaan, Sekretariat",
      period: "Agustus – Oktober 2026",
      description: [
        "Mengembangkan website internal untuk mendukung kebutuhan rapat dan mengurangi penggunaan dokumen berbasis kertas melalui alur digital.",
        "Mengembangkan website penyortiran slip gaji untuk membantu pengolahan data gaji dari Excel menjadi Word/PDF.",
        "Bekerja dalam tim pengembangan beranggotakan 2 orang."
      ]
    },
    {
      id: "exp-2",
      number: "02",
      organization: "BEM UBSI Tasikmalaya",
      role: "Koordinator Kominfo",
      period: "2024 – 2025",
      description: [
        "Mengelola Instagram dan konten digital organisasi.",
        "Membuat poster, video, caption, publikasi, dan dokumentasi kegiatan.",
        "Menangani komunikasi lintas organisasi/mahasiswa dan kegiatan pengiklanan."
      ]
    },
    {
      id: "exp-3",
      number: "03",
      organization: "HIMASI",
      role: "Anggota Penelitian & Pengembangan",
      period: "2024 – 2025",
      description: [
        "Mendukung penelitian dan pengembangan SDM mahasiswa, kegiatan organisasi, serta penyusunan saran kepada ketua."
      ]
    },
    {
      id: "exp-4",
      number: "04",
      organization: "BEM Setasik",
      role: "Anggota Bidang Kominfo",
      period: "2025 – 2026",
      description: [
        "Membuat dokumentasi dan poster serta terlibat dalam kegiatan lapangan sebagai tim media."
      ]
    },
    {
      id: "exp-5",
      number: "05",
      organization: "HIMASI",
      role: "Ketua",
      period: "2026 – 2027",
      description: [
        "Mengelola organisasi, membuat keputusan, mengoordinasikan kegiatan, dan memastikan keberlangsungan program organisasi."
      ]
    }
  ],

  projects: [
    {
      id: "proj-1",
      number: "01",
      title: "Website Sortir Slip Gaji",
      image: "assets/images/project-01.jpg",
      description: "Proyek individu untuk membantu proses penyortiran dan pengolahan data slip gaji dari Excel menjadi dokumen Word/PDF siap cetak secara digital.",
      purpose: "Meningkatkan efisiensi kerja staf keuangan instansi dalam mendistribusikan slip gaji dan menghemat penggunaan kertas.",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://githu423.github.io/website-slip-gaji",
      githubUrl: "https://github.com/githu423/website-slip-gaji"
    },
    {
      id: "proj-2",
      number: "02",
      title: "Cipakat-Hub",
      image: "assets/images/project-02.jpg",
      description: "Platform sistem informasi terpadu desa untuk mendukung alur pengaduan masyarakat, pengajuan surat, pinjaman, booking fasilitas, dan promosi produk UMKM desa.",
      purpose: "Mendigitalisasi layanan administrasi desa dan memperluas pemasaran produk UMKM lokal masyarakat.",
      technologies: ["Laravel", "PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      liveUrl: "https://cipakat-hub.example.com",
      githubUrl: "https://github.com/githu423/cipakat-hub"
    },
    {
      id: "proj-3",
      number: "03",
      title: "Website Internal Dinas Pariwisata",
      image: "assets/images/project-03.jpg",
      description: "Solusi portal informasi dan dashboard internal untuk mendukung alur kerja koordinasi rapat instansi dan mengurangi dokumen kertas.",
      purpose: "Mempercepat koordinasi agenda dinas, pengarsipan notulensi rapat, dan digitalisasi data sekretariat.",
      technologies: ["Laravel", "PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      liveUrl: "https://dispar-ciamis-internal.example.com",
      githubUrl: "https://github.com/githu423/dinas-pariwisata-internal"
    },
    {
      id: "proj-4",
      number: "04",
      title: "Landing Page UMKM Rajut Tasikmalaya",
      image: "assets/images/project-04.jpg",
      description: "Landing page modern untuk memperluas jangkauan pengenalan produk kerajinan rajut lokal dan meningkatkan daya jual UMKM Tasikmalaya.",
      purpose: "Membantu pelaku usaha mikro mempromosikan produk rajut secara online dengan desain responsif dan menarik.",
      technologies: ["Laravel", "PHP", "MySQL", "HTML", "CSS", "JavaScript", "Node.js"],
      liveUrl: "https://umkm-rajut-tasik.example.com",
      githubUrl: "https://github.com/githu423/umkm-rajut-tasik"
    }
  ],

  certifications: [
    {
      name: "Database Competency Certificate (SerKom Database)",
      year: "2025"
    },
    {
      name: "Database Training (Campus & Partner Institution)",
      year: "2025"
    },
    {
      name: "Organization / Committee Certificates",
      year: "2024 – 2026"
    },
    {
      name: "Seminars / Workshops Participation",
      year: "2024 – 2026"
    }
  ],

  languages: [
    {
      name: "Indonesian (Bahasa Indonesia)",
      level: "Fluent / Lancar"
    },
    {
      name: "English (Bahasa Inggris)",
      level: "Intermediate / Menengah"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = IBAH_PROFILE;
}
