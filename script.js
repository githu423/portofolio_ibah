/**
 * ==============================================================================
 * IBAH MISBAH — PORTFOLIO CORE SCRIPT & ADVANCED CHATBOT INTERACTIONS
 * Features: Dark/Light Mode, Animations, Terminal Tabs, Filters, Modals, Chatbot
 * ==============================================================================
 */

// 1. DATA PROJECTS DEFINITION (RICH DETAILS)
const PROJECTS_DATA = {
  'proj-1': {
    title: 'Website Sortir Slip Gaji',
    image: 'assets/images/project-01.jpg',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Excel Parsing', 'Client-Side Export'],
    description: 'Proyek otomasi pengolahan dokumen keuangan untuk menyelesaikan bottleneck penyortiran data slip gaji staf. Mengubah file spreadsheet Excel menjadi dokumen Word/PDF siap cetak secara digital tanpa upload ke server.',
    purpose: 'Meningkatkan efisiensi kerja staf administrasi dinas dalam mendistribusikan slip gaji dan menghemat ribuan lembar penggunaan kertas melalui alur digital terstruktur.',
    liveUrl: 'https://githu423.github.io/website-slip-gaji',
    githubUrl: 'https://github.com/githu423/website-slip-gaji'
  },
  'proj-2': {
    title: 'Cipakat-Hub (Sistem Informasi Desa)',
    image: 'assets/images/project-02.jpg',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'MVC Architecture'],
    description: 'Platform sistem informasi terpadu desa untuk mendukung alur pengaduan masyarakat secara transparan, pengajuan surat pengantar mandiri, permohonan pinjaman, booking fasilitas umum, dan showcase produk UMKM lokal.',
    purpose: 'Mendigitalisasi layanan administrasi desa agar lebih cepat, transparan, dan memperluas pemasaran produk UMKM warga desa.',
    liveUrl: 'https://cipakat-hub.example.com',
    githubUrl: 'https://github.com/githu423/cipakat-hub'
  },
  'proj-3': {
    title: 'Website Internal Dinas Pariwisata Ciamis',
    image: 'assets/images/project-03.jpg',
    tags: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Role-Based Access', 'Paperless'],
    description: 'Solusi portal informasi dan dashboard internal untuk mendukung alur kerja koordinasi rapat instansi, arsip notulensi, dan mengurangi ketergantungan dokumen fisik berbasis kertas.',
    purpose: 'Mempercepat alur distribusi bahan rapat, transparansi agenda sekretariat, dan efisiensi arsip instansi pemerintahan daerah.',
    liveUrl: 'https://dispar-ciamis-internal.example.com',
    githubUrl: 'https://github.com/githu423/dinas-pariwisata-internal'
  },
  'proj-4': {
    title: 'Landing Page UMKM Rajut Tasikmalaya',
    image: 'assets/images/project-04.jpg',
    tags: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'SEO Friendly'],
    description: 'Landing page promosi komersial modern berkinerja tinggi untuk memperkenalkan produk kerajinan rajut lokal Tasikmalaya kepada pasar nasional dan internasional.',
    purpose: 'Membantu pelaku UMKM rajut lokal memiliki etalase digital profesional yang responsif di smartphone serta meningkatkan konversi pemesanan produk.',
    liveUrl: 'https://umkm-rajut-tasik.example.com',
    githubUrl: 'https://github.com/githu423/umkm-rajut-tasik'
  }
};

// 2. CODE TAB CONTENT DEFINITIONS (HERO INTERACTION)
const CODE_SNIPPETS = {
  config: `{\n  <span class="code-key">"developer"</span>: <span class="code-str">"Ibah Misbah"</span>,\n  <span class="code-key">"role"</span>: <span class="code-str">"Freelance Web Developer"</span>,\n  <span class="code-key">"status"</span>: <span class="code-str">"Available for Projects"</span>,\n  <span class="code-key">"location"</span>: <span class="code-str">"Kab. Ciamis, Jawa Barat"</span>,\n  <span class="code-key">"frameworks"</span>: [<span class="code-str">"Laravel"</span>, <span class="code-str">"PHP"</span>, <span class="code-str">"MySQL"</span>]\n}`,
  stack: `export const techStack = {\n  <span class="code-key">backend</span>: [<span class="code-str">"PHP"</span>, <span class="code-str">"Laravel (MVC)"</span>, <span class="code-str">"Node.js"</span>],\n  <span class="code-key">database</span>: [<span class="code-str">"MySQL Relational"</span>, <span class="code-str">"XAMPP"</span>],\n  <span class="code-key">frontend</span>: [<span class="code-str">"HTML5"</span>, <span class="code-str">"CSS3"</span>, <span class="code-str">"JavaScript"</span>, <span class="code-str">"Tailwind"</span>],\n  <span class="code-key">tools</span>: [<span class="code-str">"Git / GitHub"</span>, <span class="code-str">"VS Code"</span>]\n};`,
  contact: `# Verified Direct Credentials\n<span class="code-key">WHATSAPP</span>=<span class="code-str">"082219678296"</span>\n<span class="code-key">EMAIL</span>=<span class="code-str">"ibahmisbahh6@gmail.com"</span>\n<span class="code-key">GITHUB</span>=<span class="code-str">"https://github.com/githu423"</span>\n<span class="code-key">LOCATION</span>=<span class="code-str">"Kabupaten Ciamis, ID"</span>`
};

// 3. INITIALIZE ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbarScroll();
  initMobileNav();
  initTypewriter();
  initScrollAnimations();
  initCounters();
  initContactForm();
  initChatbot();
});

// -------------------- THEME (DARK / LIGHT MODE) --------------------
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const mobileThemeLabel = document.getElementById('mobileThemeLabel');

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (mobileThemeLabel) {
      mobileThemeLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  }
}

// -------------------- HERO CODE SNIPPET SWITCHER --------------------
function switchCodeTab(tabKey) {
  const tabs = document.querySelectorAll('.code-tab');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-tab') === tabKey);
  });

  const display = document.getElementById('codeContentDisplay');
  if (display && CODE_SNIPPETS[tabKey]) {
    display.innerHTML = `<code>${CODE_SNIPPETS[tabKey]}</code>`;
  }
}

// -------------------- SKILL & PROJECT FILTERING --------------------
function filterSkills(category) {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-filter') === category);
  });

  const cards = document.querySelectorAll('.skills-group-card');
  cards.forEach(card => {
    if (category === 'all') {
      card.classList.remove('hidden');
    } else {
      const cardCats = card.getAttribute('data-category') || '';
      card.classList.toggle('hidden', !cardCats.includes(category));
    }
  });
}

function filterProjects(category) {
  const buttons = document.querySelectorAll('.proj-filter-btn');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
  });

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    if (category === 'all') {
      card.classList.remove('hidden');
    } else {
      const cardCats = card.getAttribute('data-category') || '';
      card.classList.toggle('hidden', !cardCats.includes(category));
    }
  });
}

// -------------------- SCROLL REVEAL & COUNTERS --------------------
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        const bars = entry.target.querySelectorAll('.skill-bar');
        bars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          if (width) bar.style.width = width;
        });
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

function initCounters() {
  const counterElements = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const speed = 120;
          const increment = Math.ceil(target / speed) || 1;

          const updateCounter = () => {
            count += increment;
            if (count < target) {
              counter.innerText = count + '+';
              setTimeout(updateCounter, 25);
            } else {
              counter.innerText = target + '+';
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.profile-card-footer');
  if (heroStats) observer.observe(heroStats);
}

// -------------------- NAVBAR SCROLL & ACTIVE TRACKING --------------------
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
  }, { passive: true });
}

// -------------------- MOBILE DRAWER NAV --------------------
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && drawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      drawer.classList.toggle('open', !isOpen);
      hamburgerBtn.classList.toggle('open', !isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
      drawer.setAttribute('aria-hidden', String(isOpen));
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      });
    });
  }
}

// -------------------- TYPEWRITER ANIMATION --------------------
function initTypewriter() {
  const roleEl = document.getElementById('heroRoleText');
  if (!roleEl) return;

  const roles = [
    'FREELANCE WEB DEVELOPER',
    'LARAVEL & PHP SPECIALIST',
    'MYSQL DATABASE BUILDER',
    'SISTEM INFORMASI UBSI'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      roleEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 45;
    } else {
      roleEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// -------------------- TOAST & CLIPBOARD --------------------
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} berhasil disalin ke clipboard!`);
  }).catch(() => {
    showToast(`Disalin: ${text}`);
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (toast && msgEl) {
    msgEl.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

// -------------------- PROJECT & CV MODALS --------------------
function openProjectModal(projectId) {
  const project = PROJECTS_DATA[projectId];
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const title = document.getElementById('modalProjectTitle');
  const img = document.getElementById('modalProjectImg');
  const techs = document.getElementById('modalProjectTechs');
  const desc = document.getElementById('modalProjectDesc');
  const purpose = document.getElementById('modalProjectPurpose');
  const liveBtn = document.getElementById('modalLiveDemoBtn');
  const githubBtn = document.getElementById('modalGithubBtn');

  if (title) title.textContent = project.title;
  if (img) {
    img.src = project.image;
    img.alt = project.title;
  }
  if (desc) desc.textContent = project.description;
  if (purpose) purpose.textContent = project.purpose;

  if (techs) {
    techs.innerHTML = project.tags
      .map(tag => `<span class="tech-badge">${tag}</span>`)
      .join('');
  }

  if (liveBtn) liveBtn.href = project.liveUrl;
  if (githubBtn) githubBtn.href = project.githubUrl;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

const modalCloseBtn = document.getElementById('modalCloseBtn');
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeProjectModal);
}

const projectModal = document.getElementById('projectModal');
if (projectModal) {
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });
}

function openCVModal() {
  const modal = document.getElementById('cvModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCVModal() {
  const modal = document.getElementById('cvModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

const cvModal = document.getElementById('cvModal');
if (cvModal) {
  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) closeCVModal();
  });
}

// -------------------- CONTACT FORM & WHATSAPP REDIRECT --------------------
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('senderName');
    const subjectInput = document.getElementById('senderSubject');
    const messageInput = document.getElementById('senderMessage');

    const nameError = document.getElementById('nameError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    if (nameError) nameError.textContent = '';
    if (subjectError) subjectError.textContent = '';
    if (messageError) messageError.textContent = '';

    let isValid = true;

    if (!nameInput.value.trim()) {
      if (nameError) nameError.textContent = 'Mohon masukkan nama Anda.';
      isValid = false;
    }

    if (!subjectInput.value) {
      if (subjectError) subjectError.textContent = 'Mohon pilih topik kebutuhan proyek.';
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      if (messageError) messageError.textContent = 'Mohon tuliskan pesan atau rincian project Anda.';
      isValid = false;
    }

    if (!isValid) return;

    const name = nameInput.value.trim();
    const subject = subjectInput.value;
    const message = messageInput.value.trim();

    const waText = `Halo Ibah, saya ${name}.\n\nSaya melihat portfolio Anda dan ingin berdiskusi mengenai project:\n*Topik:* ${subject}\n*Deskripsi:* ${message}`;
    const waUrl = `https://wa.me/6282219678296?text=${encodeURIComponent(waText)}`;

    const alertEl = document.getElementById('formSuccessAlert');
    if (alertEl) alertEl.style.display = 'flex';

    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
      if (alertEl) alertEl.style.display = 'none';
    }, 900);
  });
}

// -------------------- AI CHATBOT (ASK IBAH) --------------------
function initChatbot() {
  const fabBtn = document.getElementById('aiFabBtn');
  const chatWindow = document.getElementById('aiChatWindow');
  const closeBtn = document.getElementById('aiCloseBtn');
  const form = document.getElementById('aiChatForm');
  const input = document.getElementById('aiMessageInput');
  const messagesContainer = document.getElementById('aiMessagesContainer');

  if (fabBtn && chatWindow) {
    fabBtn.addEventListener('click', () => {
      chatWindow.classList.toggle('open');
      if (chatWindow.classList.contains('open') && input) {
        input.focus();
      }
    });
  }

  if (closeBtn && chatWindow) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('open');
    });
  }

  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
      }
    });
  }

  if (form && input && messagesContainer) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = input.value.trim();
      if (!message) return;

      appendUserBubble(message);
      input.value = '';

      const loadingBubble = appendBotLoading();

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });

        const data = await response.json();
        removeLoadingBubble(loadingBubble);

        if (data.reply) {
          appendBotBubble(formatMarkdown(data.reply));
        } else {
          appendBotBubble(formatMarkdown(getLocalDialogueReply(message)));
        }
      } catch (err) {
        removeLoadingBubble(loadingBubble);
        appendBotBubble(formatMarkdown(getLocalDialogueReply(message)));
      }
    });
  }
}

function handleQuickChip(query) {
  const input = document.getElementById('aiMessageInput');
  const form = document.getElementById('aiChatForm');
  if (input && form) {
    input.value = query;
    form.dispatchEvent(new Event('submit'));
  }
}

function openChatWithQuery(query) {
  const chatWindow = document.getElementById('aiChatWindow');
  if (chatWindow) {
    chatWindow.classList.add('open');
    handleQuickChip(query);
  }
}

function getCurrentTime() {
  const now = new Date();
  const hrs = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  return `${hrs}:${mins}`;
}

function appendUserBubble(text) {
  const container = document.getElementById('aiMessagesContainer');
  if (!container) return;

  const time = getCurrentTime();
  const bubble = document.createElement('div');
  bubble.className = 'ai-chat-bubble user';
  bubble.innerHTML = `
    <div class="bubble-content">
      ${escapeHTML(text)}
      <div class="bubble-time">${time}</div>
    </div>`;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function appendBotBubble(htmlContent) {
  const container = document.getElementById('aiMessagesContainer');
  if (!container) return;

  const time = getCurrentTime();
  const bubble = document.createElement('div');
  bubble.className = 'ai-chat-bubble bot';
  bubble.innerHTML = `
    <div class="bubble-content">
      ${htmlContent}
      <div class="bubble-time">${time}</div>
    </div>`;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function appendBotLoading() {
  const container = document.getElementById('aiMessagesContainer');
  if (!container) return null;

  const bubble = document.createElement('div');
  bubble.className = 'ai-chat-bubble bot loading';
  bubble.innerHTML = `<div class="bubble-content"><i class="fa-solid fa-spinner fa-spin"></i> Menyiapkan jawaban detail...</div>`;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return bubble;
}

function removeLoadingBubble(bubble) {
  if (bubble && bubble.parentNode) {
    bubble.parentNode.removeChild(bubble);
  }
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatMarkdown(text) {
  return text
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/•/g, '&bull;');
}

/**
 * Client-Side Instant Fallback Dialogue Engine
 */
function getLocalDialogueReply(rawQuery) {
  const text = rawQuery.toLowerCase();
  const clean = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ');
  const words = clean.split(/\s+/).filter(Boolean);

  const has = (...terms) => terms.some(t => text.includes(t));
  const hasWord = (...terms) => terms.some(t => words.includes(t));

  // Greetings
  if (has('assalamu', 'assalamualaikum', 'samlikum')) {
    return `Wa'alaikumussalam Warahmatullahi Wabarakatuh! 🙏✨\n\nSelamat datang di portofolio **Ibah Misbah**! Ada yang bisa saya bantu terkait proyek website, keahlian, atau peluang kerja sama?`;
  }

  if (hasWord('pagi', 'siang', 'sore', 'malam') && has('selamat', 'halo', 'hai', 'met')) {
    return `Selamat berjumpa! 👋 Saya asisten virtual **Ibah Misbah**. Ada yang ingin Anda tanyakan seputar portofolio atau jasa web development?`;
  }

  if (has('apa kabar', 'gimana kabar')) {
    return `Kabar saya sangat baik dan siap membantu Anda! 😊 Ibah Misbah saat ini berstatus **Available for Work** (siap menerima proyek freelance website remote). Ada proyek yang ingin Anda diskusikan?`;
  }

  if (hasWord('halo', 'hai', 'hi', 'hey', 'hello', 'bro', 'min', 'gan', 'bang', 'mas', 'kak', 'cuy') && words.length <= 4) {
    return `Halo! 👋 Selamat datang di portfolio resmi **Ibah Misbah**.\n\nSaya siap menjawab pertanyaan Anda tentang:\n• 💻 **Keahlian Web** (Laravel, PHP, MySQL, Tailwind, JS)\n• 📁 **4 Proyek Nyata** (Aplikasi Slip Gaji, Cipakat-Hub, Sistem Dinas Pariwisata, UMKM Rajut)\n• 🏢 **Pengalaman PKL & Organisasi** (Dinas Pariwisata Ciamis, Ketua HIMASI UBSI)\n• 📋 **Alur Kerja Sama & Pemesanan Website**\n• 🟢 **Kontak WhatsApp (0822-1967-8296)**`;
  }

  // Gratitude
  if (has('terima kasih', 'makasih', 'thanks', 'thank you')) {
    return `Sama-sama! Senang bisa membantu Anda 😊 Jika ingin konsultasi langsung atau memulai kerja sama proyek website, silakan hubungi Ibah via WhatsApp di **0822-1967-8296**!`;
  }

  if (has('keren', 'bagus', 'mantap', 'hebat', 'clean', 'suka')) {
    return `Terima kasih banyak atas apresiasinya! ✨ Portofolio ini dibangun dengan dedikasi tinggi mengutamakan desain bersih dan performa cepat.`;
  }

  // Location
  if (has('tinggal di mana', 'tinggal dimana', 'orang mana', 'domisili', 'lokasi', 'alamat', 'ciamis')) {
    return `📍 **Domisili Ibah Misbah:** Kabupaten Ciamis, Jawa Barat, Indonesia.\n\nIbah siap melayani proyek secara **Remote (Daring)** dari seluruh wilayah Indonesia maupun luar negeri.`;
  }

  // Tech comparisons
  if (has('kenapa laravel', 'mengapa laravel', 'apa itu laravel', 'kelebihan laravel', 'laravel vs', 'laravel dan bukan')) {
    return `**Kenapa Ibah Memilih Framework Laravel?** 🚀\n\n1. 🏗️ **Arsitektur MVC:** Kode terstruktur rapi memisahkan database, logic, dan UI.\n2. 🛡️ **Keamanan Bawaan:** Proteksi CSRF, XSS, dan SQL Injection.\n3. ⚡ **Eloquent ORM:** Manipulasi database relasional yang ekspresif & cepat.\n4. 📦 **Mudah Di-maintain:** Standar industri modern yang memudahkan ekspansi fitur.`;
  }

  if (has('kenapa mysql', 'mengapa mysql', 'apa itu mysql', 'kelebihan mysql')) {
    return `**Kenapa Ibah Menggunakan MySQL?** 🗄️\n\nMySQL adalah sistem basis data relasional (RDBMS) standar industri yang terbukti cepat, andal, dan aman untuk merancang skema relasi tabel yang terstruktur rapi (1NF–3NF).`;
  }

  // Projects
  if (has('slip gaji', 'sortir', 'excel')) {
    return `📄 **Proyek 01: Website Sortir Slip Gaji (Otomasi Dokumen)**\n\n• **Masalah:** Staf keuangan memilah ribuan baris data Excel secara manual yang boros kertas & waktu.\n• **Solusi:** Aplikasi web client-side untuk mem-parsing Excel dan mengonversinya langsung ke Word/PDF siap cetak.\n• **Teknologi:** HTML5, CSS3, JavaScript.\n• **Repo:** [github.com/githu423/website-slip-gaji](https://github.com/githu423/website-slip-gaji)`;
  }

  if (has('cipakat', 'sistem desa')) {
    return `🏛️ **Proyek 02: Cipakat-Hub (Platform Desa Terpadu)**\n\n• **Masalah:** Pelayanan birokrasi surat warga desa masih manual & produk UMKM belum terekspos.\n• **Solusi:** Web portal terpadu untuk pengajuan surat mandiri, tiket pengaduan transparan, booking fasilitas, dan etalase UMKM desa.\n• **Teknologi:** Laravel, PHP, MySQL, Bootstrap 5.\n• **Repo:** [github.com/githu423/cipakat-hub](https://github.com/githu423/cipakat-hub)`;
  }

  if (has('dinas pariwisata', 'dispar', 'rapat')) {
    return `🏢 **Proyek 03: Website Internal Dinas Pariwisata Ciamis**\n\n• **Masalah:** Koordinasi rapat sering terhambat penumpukan dokumen fisik kertas.\n• **Solusi:** Portal dashboard internal *paperless* dengan otentikasi multi-role, arsip digital, dan notulensi rapat.\n• **Teknologi:** Laravel, PHP, MySQL, Tailwind CSS.\n• **Repo:** [github.com/githu423/dinas-pariwisata-internal](https://github.com/githu423/dinas-pariwisata-internal)`;
  }

  if (has('rajut', 'tasikmalaya')) {
    return `🧶 **Proyek 04: Landing Page UMKM Rajut Tasikmalaya**\n\n• **Masalah:** Perajin rajut lokal Tasikmalaya kesulitan menjangkau pasar luar daerah.\n• **Solusi:** Landing page komersial mobile-first dengan galeri produk & checkout order langsung via WhatsApp.\n• **Teknologi:** Laravel, PHP, MySQL, JavaScript.\n• **Repo:** [github.com/githu423/umkm-rajut-tasik](https://github.com/githu423/umkm-rajut-tasik)`;
  }

  if (has('proyek', 'project', 'portofolio', 'karya')) {
    return `Berikut 4 proyek unggulan **Ibah Misbah**:\n1. 📄 **Website Sortir Slip Gaji** (HTML, CSS, JS)\n2. 🏛️ **Cipakat-Hub** (Laravel, PHP, MySQL, Bootstrap)\n3. 🏢 **Website Internal Dinas Pariwisata** (Laravel, PHP, MySQL, Tailwind)\n4. 🧶 **Landing Page UMKM Rajut** (Laravel, PHP, MySQL, JS)\n\nDetail lengkap dapat dilihat di menu **Projects**.`;
  }

  // Experience
  if (has('pkl', 'magang', 'dinas')) {
    return `🏢 **PKL di Dinas Pariwisata Ciamis (Agt – Okt 2026):** Web Developer di Bidang Perencanaan, membangun sistem rapat internal paperless dan aplikasi sortir slip gaji Excel.`;
  }

  if (has('ketua', 'himasi', 'bem', 'organisasi')) {
    return `👑 **Kepemimpinan Organisasi Ibah Misbah:**\n• **Ketua Umum HIMASI UBSI** (2026–2027)\n• **Anggota Kominfo BEM Setasik** (2025–2026)\n• **Koordinator Kominfo BEM UBSI** (2024–2025)\n• **Litbang HIMASI UBSI** (2024–2025)`;
  }

  // Skills
  if (has('skill', 'keahlian', 'stack', 'laravel', 'php', 'mysql', 'javascript', 'tools')) {
    return `💻 **Tech Stack Ibah Misbah:**\n• **Back-End:** PHP, Laravel Framework (MVC), Node.js (Basic)\n• **Database:** MySQL (Relasional, Query CRUD, XAMPP)\n• **Front-End:** HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap 5\n• **Tools:** Git/GitHub, VS Code, Canva, CapCut, PixelLab, Photoshop.`;
  }

  // Why Hire
  if (has('kenapa', 'mengapa', 'alasan', 'kelebihan', 'keunggulan', 'apa bedanya')) {
    return `Alasan utama memilih **Ibah Misbah**:\n1. **Kode & Database Rapi:** Mengikuti arsitektur MVC Laravel & normalisasi MySQL.\n2. **Solutif Nyata:** Berpengalaman membangun sistem instansi dinas & UMKM.\n3. **Komunikasi Cepat:** Diskusi langsung & transparan via WhatsApp (0822-1967-8296).\n4. **Jiwa Kepemimpinan:** Ketua Umum HIMASI UBSI teruji memimpin tim & proyek.`;
  }

  // Workflow
  if (has('cara kerja', 'alur', 'cara pesan', 'cara order', 'tahapan')) {
    return `Alur kerja sama pembuatan website dengan Ibah:\n1. **Konsultasi Kebutuhan:** Sampaikan ide via WhatsApp (0822-1967-8296).\n2. **Rancangan & Estimasi:** Penentuan arsitektur, timeline, dan biaya.\n3. **Tahap Development:** Koding UI/UX, backend Laravel, dan database MySQL.\n4. **Testing & Review:** Uji coba responsivitas dan revisi bersama Anda.\n5. **Deployment:** Website online siap digunakan!`;
  }

  // Timeline
  if (has('berapa lama', 'lama pengerjaan', 'durasi', 'deadline')) {
    return `⏱️ **Estimasi Waktu Pengerjaan:**\n• Landing Page UMKM: 3–5 hari kerja\n• Sistem Informasi Standar: 1–2 minggu\n• Web Kustom Kompleks: 2–4 minggu\n(Bisa disesuaikan jika ada deadline mendesak).`;
  }

  // Pricing
  if (has('harga', 'tarif', 'biaya', 'budget', 'duit', 'ongkos', 'nego')) {
    return `💰 **Tarif Pembuatan Website:** Fleksibel dan dapat disesuaikan dengan anggaran Anda (ramah UMKM, instansi, & mahasiswa). Pembayaran bertahap (sistem termin/DP). Silakan hubungi Ibah langsung via WhatsApp di **0822-1967-8296**.`;
  }

  // Contact
  if (has('kontak', 'whatsapp', 'wa', 'nomor hp', 'email', 'telepon', 'hubungi')) {
    return `📬 **Kanal Kontak Resmi Ibah Misbah:**\n• 🟢 **WhatsApp:** [0822-1967-8296](https://wa.me/6282219678296)\n• ✉️ **Email:** [ibahmisbahh6@gmail.com](mailto:ibahmisbahh6@gmail.com)\n• 🐙 **GitHub:** [github.com/githu423](https://github.com/githu423)\n• 💼 **LinkedIn:** [linkedin.com/in/ibah-misbah](https://linkedin.com/in/ibah-misbah)\n• 📍 **Domisili:** Kabupaten Ciamis, Jawa Barat`;
  }

  // Education
  if (has('kuliah', 'kampus', 'universitas', 'sekolah', 'pendidikan', 'ubsi', 'jurusan', 'prodi', 's1')) {
    return `🎓 **Pendidikan Ibah Misbah:**\n• **Institusi:** Universitas Bina Sarana Informatika (UBSI) Kampus Tasikmalaya\n• **Program Studi:** S1 Sistem Informasi (2024–2027)\n• **Fakultas:** Fakultas Teknik & Informatika`;
  }

  return `Pertanyaan yang bagus! 😊 Saya siap menjelaskan seputar keahlian web, 4 proyek nyata, pengalaman PKL Dinas Pariwisata Ciamis, organisasi HIMASI/BEM, atau alur pembuatan website Ibah. Anda juga bisa langsung chat dengan Ibah di WhatsApp **0822-1967-8296**!`;
}
