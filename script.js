/**
 * ==============================================================================
 * IBAH MISBAH — PORTFOLIO CORE SCRIPT & ADVANCED CHATBOT INTERACTIONS
 * Features: Dark/Light Mode, Animations, Terminal Tabs, Filters, Modals, Chatbot
 * ==============================================================================
 */

// 1. PROJECT DATA — bilingual content comes from i18n.js
const PROJECT_LINKS = {
  'proj-1': {
    image: 'assets/images/project-01.jpg',
    liveUrl: 'https://githu423.github.io/website-slip-gaji',
    githubUrl: 'https://github.com/githu423/website-slip-gaji',
  },
  'proj-2': {
    image: 'assets/images/project-02.jpg',
    liveUrl: 'https://cipakat-hub.example.com',
    githubUrl: 'https://github.com/githu423/cipakat-hub',
  },
  'proj-3': {
    image: 'assets/images/project-03.jpg',
    liveUrl: 'https://dispar-ciamis-internal.example.com',
    githubUrl: 'https://github.com/githu423/dinas-pariwisata-internal',
  },
  'proj-4': {
    image: 'assets/images/project-04.jpg',
    liveUrl: 'https://umkm-rajut-tasik.example.com',
    githubUrl: 'https://github.com/githu423/umkm-rajut-tasik',
  },
};

function getProjectData(projectId) {
  const links = PROJECT_LINKS[projectId];
  if (!links) return null;
  const number = projectId.split('-')[1];
  return {
    title: t(`proj.${number}.title`),
    tags: tArray(`proj.${number}.tags`),
    description: t(`proj.${number}.description`),
    purpose: t(`proj.${number}.purpose`),
    ...links,
  };
}

// 2. CODE TAB CONTENT — bilingual snippets from i18n.js
function getCodeSnippet(tabKey) {
  return t(`code.${tabKey}`);
}

// 3. INITIALIZE ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initTheme();
  initNavbarScroll();
  initMobileNav();
  initTypewriter();
  initScrollAnimations();
  initCounters();
  initContactForm();
  initChatbot();
  initLanguageReactiveViews();
  refreshActiveCodeTab();
});

// Re-render dynamic UI pieces whenever the language changes
function initLanguageReactiveViews() {
  document.addEventListener('languagechange', () => {
    refreshActiveCodeTab();
    initTypewriter();
    if (document.getElementById('projectModal')?.classList.contains('open')) {
      renderProjectModal();
    }
    const firstBotBubble = document.querySelector('#aiMessagesContainer .ai-chat-bubble.bot .bubble-content');
    const hasUserMessage = document.querySelector('#aiMessagesContainer .ai-chat-bubble.user');
    if (firstBotBubble && !hasUserMessage) firstBotBubble.innerHTML = t('chat.greeting');
  });
}

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
      mobileThemeLabel.textContent = t(theme === 'dark' ? 'theme.light' : 'theme.dark');
    }
  }
}

// -------------------- HERO CODE SNIPPET SWITCHER --------------------
function switchCodeTab(tabKey) {
  const tabs = document.querySelectorAll('.code-tab');
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.getAttribute('data-tab') === tabKey);
  });
  refreshActiveCodeTab();
}

function refreshActiveCodeTab() {
  const display = document.getElementById('codeContentDisplay');
  const activeTab = document.querySelector('.code-tab.active');
  if (display && activeTab) {
    display.innerHTML = `<code>${getCodeSnippet(activeTab.getAttribute('data-tab'))}</code>`;
  }
}

// -------------------- SKILL & PROJECT FILTERING --------------------
function filterSkills(category) {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.getAttribute('data-filter') === category);
  });

  const cards = document.querySelectorAll('.skills-group-card');
  cards.forEach((card) => {
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
  buttons.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
  });

  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card) => {
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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          const bars = entry.target.querySelectorAll('.skill-bar');
          bars.forEach((bar) => {
            const width = bar.getAttribute('data-width');
            if (width) bar.style.width = width;
          });
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  revealElements.forEach((el) => observer.observe(el));
}

function initCounters() {
  const counterElements = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counterElements.forEach((counter) => {
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
    },
    { threshold: 0.5 },
  );

  const heroStats = document.querySelector('.profile-card-footer');
  if (heroStats) observer.observe(heroStats);
}

// -------------------- NAVBAR SCROLL & ACTIVE TRACKING --------------------
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  function updateScrollState() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);

    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();
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

    links.forEach((link) => {
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
let typeWriterTimeout = null;

function initTypewriter() {
  const roleEl = document.getElementById('heroRoleText');
  if (!roleEl) return;

  if (typeWriterTimeout) clearTimeout(typeWriterTimeout);

  const roles = tArray('roles');
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const current = roles[roleIdx] || '';
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

    typeWriterTimeout = setTimeout(type, typeSpeed);
  }

  type();
}

// -------------------- TOAST & CLIPBOARD --------------------
function copyToClipboard(text, label) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast(t('toast.copied', { label }));
    })
    .catch(() => {
      showToast(t('toast.copied', { label: text }));
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
let activeProjectId = null;

function openProjectModal(projectId) {
  if (!getProjectData(projectId)) return;
  activeProjectId = projectId;
  renderProjectModal();

  const modal = document.getElementById('projectModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderProjectModal() {
  const project = getProjectData(activeProjectId);
  if (!project) return;

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
      .map((tag) => `<span class="tech-badge">${escapeHTML(tag)}</span>`)
      .join('');
  }
  if (liveBtn) liveBtn.href = project.liveUrl;
  if (githubBtn) githubBtn.href = project.githubUrl;
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

// -------------------- CONTACT FORM — EMAIL + WHATSAPP --------------------
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const subjectInput = document.getElementById('senderSubject');
  const messageInput = document.getElementById('senderMessage');
  const emailGroup = document.getElementById('emailGroup');
  const submitLabel = document.getElementById('submitContactLabel');
  const submitIcon = document.getElementById('submitContactIcon');
  const submitBtn = document.getElementById('submitContactBtn');
  const methodInputs = form.querySelectorAll('input[name="contactMethod"]');
  const successAlert = document.getElementById('formSuccessAlert');
  const errorAlert = document.getElementById('formErrorAlert');

  function selectedMethod() {
    const checked = form.querySelector('input[name="contactMethod"]:checked');
    return checked ? checked.value : 'email';
  }

  function updateMethodUI() {
    const isEmail = selectedMethod() === 'email';
    if (emailGroup) emailGroup.style.display = isEmail ? '' : 'none';
    if (emailInput) emailInput.required = isEmail;
    if (submitLabel) submitLabel.textContent = t(isEmail ? 'form.submitEmail' : 'form.submitWhatsapp');
    if (submitIcon) submitIcon.className = isEmail ? 'fa-solid fa-envelope' : 'fa-brands fa-whatsapp';
  }

  methodInputs.forEach((input) => input.addEventListener('change', updateMethodUI));
  document.addEventListener('languagechange', updateMethodUI);
  updateMethodUI();

  function clearErrors() {
    ['nameError', 'emailError', 'subjectError', 'messageError'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    if (successAlert) successAlert.style.display = 'none';
    if (errorAlert) errorAlert.style.display = 'none';
  }

  function showAlert(type, title, text) {
    const alertEl = type === 'success' ? successAlert : errorAlert;
    const titleEl = document.getElementById(type === 'success' ? 'formSuccessTitle' : 'formErrorTitle');
    const textEl = document.getElementById(type === 'success' ? 'formSuccessText' : 'formErrorText');
    if (titleEl) titleEl.textContent = title;
    if (textEl) textEl.textContent = text;
    if (alertEl) {
      alertEl.style.display = 'flex';
      alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function buildMailto(name, email, subject, message) {
    const body = `Nama: ${name}\nEmail: ${email}\nTopik: ${subject}\n\n${message}`;
    return `mailto:ibahmisbahh6@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(body)}`;
  }

  async function sendViaEmail(payload) {
    if (submitBtn) {
      submitBtn.disabled = true;
      const label = document.getElementById('submitContactLabel');
      if (label) label.textContent = t('form.sending');
    }

    let result = null;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      result = await response.json().catch(() => ({}));

      if (result && result.mailto) {
        window.location.href = result.mailto;
        showAlert('error', t('form.errorTitle'), t('form.errorFallback'));
      } else if (response.ok && result && result.success) {
        showAlert('success', t('form.successEmailTitle'), t('form.successEmailText'));
      } else {
        const fallback = buildMailto(payload.name, payload.email, payload.subject, payload.message);
        window.location.href = fallback;
        showAlert('error', t('form.errorTitle'), t('form.errorFallback'));
      }
    } catch (err) {
      const fallback = buildMailto(payload.name, payload.email, payload.subject, payload.message);
      window.location.href = fallback;
      showAlert('error', t('form.errorTitle'), t('form.errorFallback'));
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      updateMethodUI();
    }
  }

  function sendViaWhatsApp(name, subject, message) {
    const waText = `Halo Ibah, saya ${name}.\n\nSaya melihat portofolio Anda dan ingin berdiskusi mengenai:${'\n'}Topik: ${subject}\nPesan: ${message}`;
    const waUrl = `https://wa.me/6282219678296?text=${encodeURIComponent(waText)}`;
    showAlert('success', t('form.successWaTitle'), t('form.successWaText'));
    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
      updateMethodUI();
      setTimeout(() => {
        if (successAlert) successAlert.style.display = 'none';
      }, 4000);
    }, 900);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value;
    const message = messageInput.value.trim();
    const method = selectedMethod();
    let isValid = true;

    if (!name) {
      const el = document.getElementById('nameError');
      if (el) el.textContent = t('form.errName');
      isValid = false;
    }
    if (method === 'email') {
      if (!email) {
        const el = document.getElementById('emailError');
        if (el) el.textContent = t('form.errEmail');
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const el = document.getElementById('emailError');
        if (el) el.textContent = t('form.errEmailInvalid');
        isValid = false;
      }
    }
    if (!subject) {
      const el = document.getElementById('subjectError');
      if (el) el.textContent = t('form.errSubject');
      isValid = false;
    }
    if (message.length < 10) {
      const el = document.getElementById('messageError');
      if (el) el.textContent = t('form.errMessage');
      isValid = false;
    }
    if (!isValid) return;

    if (method === 'whatsapp') {
      sendViaWhatsApp(name, subject, message);
    } else {
      await sendViaEmail({ name, email, subject, message });
    }
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
          body: JSON.stringify({ message, language: getLanguage() }),
        });

        const data = await response.json();
        removeLoadingBubble(loadingBubble);

        if (data.reply) {
          appendBotBubble(formatMarkdown(data.reply));
        } else {
          appendBotBubble(formatMarkdown(getLocalDialogueReply(message, getLanguage())));
        }
      } catch (err) {
        removeLoadingBubble(loadingBubble);
        appendBotBubble(formatMarkdown(getLocalDialogueReply(message, getLanguage())));
      }
    });
  }
}

function sendChip(key) {
  handleQuickChip(t(`chip.${key}`));
}

function openChatWithChip(key) {
  openChatWithQuery(t(`chip.${key}`));
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
  bubble.innerHTML = `<div class="bubble-content"><i class="fa-solid fa-spinner fa-spin"></i> ${t('chat.loading')}</div>`;
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
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>',
    )
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/•/g, '&bull;');
}

/**
 * Client-Side Instant Fallback Dialogue Engine (bilingual)
 */
function getLocalDialogueReply(rawQuery, language = getLanguage()) {
  const text = rawQuery.toLowerCase();

  if (/terima kasih|makasih|matur suwun|hatur nuhun|thank|thanks/.test(text)) return t('chat.thanks');
  if (/full.?time|full time|rekrut|career|karier|hire|magang|internship|peluang|opportunit/.test(text))
    return t('chat.opportunities');
  if (/kontak|contact|whatsapp|whats app|\bwa\b|email|hubungi|telepon|phone|mail/.test(text))
    return t('chat.contact');
  if (/siapa|profil|biodata|tentang|about|who/.test(text)) return t('chat.who');
  if (/proyek|project|karya|portfolio|portofolio/.test(text)) return t('chat.projects');
  if (/skill|keahlian|stack|laravel|php|mysql|javascript|tech|html|css/.test(text)) return t('chat.skills');
  if (/pkl|magang|intern|pengalaman|experience|organisasi|organization|himasi|bem|ketua/.test(text))
    return t('chat.experience');
  if (/halo|hai|hi|hello|assalamu|selamat|hey|how are you|apa kabar/.test(text)) return t('chat.greeting');
  return t('chat.default');
}
