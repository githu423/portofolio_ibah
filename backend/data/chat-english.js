/**
 * ==============================================================================
 * ASK IBAH — ENGLISH KNOWLEDGE DIALOGUE (BILINGUAL SUPPORT)
 * Used when the website language switcher is set to English.
 * ==============================================================================
 */

function getEnglishReply(rawQuery) {
  const text = ` ${rawQuery.toLowerCase()} `;
  const has = (...terms) => terms.some((term) => text.includes(term));

  if (
    has(
      "assalamu",
      "hello",
      "hi ",
      " hey",
      "good morning",
      "good afternoon",
      "good evening",
      "how are you",
    )
  ) {
    return `Hello! 👋 Welcome to **Ibah Misbah**'s portfolio. I'm the official assistant here. You can ask about his background, tech stack, video editing & design services, four real projects, internship and leadership experience, or full-time and freelance opportunities. What would you like to know?`;
  }

  if (has("thank", "thanks", "appreciate")) {
    return `You're welcome! 😊 Happy to help. If you'd like to discuss a full-time role, a freelance project, or a collaboration, contact Ibah at **+62 822-1967-8296** or **ibahmisbahh6@gmail.com**.`;
  }

  if (
    has(
      "full-time",
      "full time",
      "recruit",
      "hire",
      "career",
      "internship",
      "opportunit",
      "availability",
      "available",
    )
  ) {
    return `💼 **Ibah Misbah's Availability:**\n\n• **Full-time:** open to web developer / information systems roles\n• **Freelance:** website and information-system projects\n• **Internship & collaboration:** remote, hybrid, or on-site around Ciamis/Tasikmalaya\n\nTell Ibah about your opportunity via WhatsApp: [+62 822-1967-8296](https://wa.me/6282219678296) or email: [ibahmisbahh6@gmail.com](mailto:ibahmisbahh6@gmail.com).`;
  }

  if (
    has(
      "workflow",
      "process",
      "how do you work",
      "steps",
      "timeline",
      "duration",
    )
  ) {
    return `🔧 **Workflow with Ibah:**\n\n1. **Consultation** — share your idea, goals, and required features via WhatsApp or email.\n2. **Plan & estimate** — architecture, timeline, and a transparent quote.\n3. **Development** — UI, Laravel/PHP back-end, and MySQL integration with progress updates.\n4. **Testing & revision** — functionality, security, and mobile responsiveness reviewed together.\n5. **Deployment & handover** — go live with usage documentation.`;
  }

  if (
    has("price", "pricing", "rate", "cost", "budget", "fee", "harga", "tarif")
  ) {
    return `💰 Pricing for freelance work is flexible and discussed based on scope, timeline, and features—friendly to UMKM, students, and organizations. For full-time roles, Ibah is happy to discuss a salary range. Please contact him directly at **+62 822-1967-8296** or **ibahmisbahh6@gmail.com**.`;
  }

  if (
    has(
      "video",
      "editing",
      "reels",
      "shorts",
      "youtube",
      "capcut",
      "graphic",
      "design",
      "canva",
      "figma",
      "poster",
      "logo",
      "thumbnail",
    )
  ) {
    return `🎬 **Ibah’s Creative Services: Video Editing & Graphic Design**\n\nBesides web development, Ibah also takes creative work:\n• **Video Editing (CapCut):** Instagram/TikTok reels & shorts, YouTube videos, company profiles, subtitles, music, and transitions.\n• **Graphic Design (Figma & Canva):** logos, posters/flyers, Instagram feeds, banners, YouTube thumbnails, and event publication materials.\n• **Experience:** PR & Media Coordinator of BEM UBSI — managed social media, posters, and event video reels.\n• **Showcase:** see sample works on Instagram [@ibah.codes](https://instagram.com/ibah.codes).\n\nTell him your creative needs via WhatsApp: **+62 822-1967-8296**.`;
  }

  if (has("project", "portfolio", "karya", "proyek", "featured work")) {
    return `Here are **Ibah Misbah**'s five portfolio highlights:\n\n1. 📄 **Salary Slip Sorting Website** — Excel to print-ready Word/PDF automation (HTML, CSS, JS)\n2. 🏛️ **Cipakat-Hub** — integrated village service platform (Laravel, PHP, MySQL, Bootstrap)\n3. 🏢 **Tourism Office Internal Website** — paperless meeting & archive portal (Laravel, PHP, MySQL, Tailwind)\n4. 🧶 **UMKM Knitting Landing Page** — a digital storefront for local artisans (Laravel, PHP, MySQL, JS)\n5. 🎬 **Video Editing & Design Works** — creative showcase on Instagram @ibah.codes (CapCut, Figma, Canva)\n\nOpen the **Projects** section and click **Details & Architecture** for more.`;
  }

  if (
    has(
      "skill",
      "stack",
      "technology",
      "laravel",
      "php",
      "mysql",
      "javascript",
      "html",
      "css",
      "tech",
    )
  ) {
    return `💻 **Ibah Misbah's Tech Stack:**\n\n• **Back-End:** PHP (native & OOP), Laravel (MVC, Eloquent, Blade, Auth), basic Node.js\n• **Database:** MySQL relational design, normalization, query optimization, XAMPP\n• **Front-End:** HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap 5\n• **Tools:** Git/GitHub, VS Code, Figma, Canva, CapCut, PixelLab, Photoshop\n• **Productivity:** Word, Excel, Google Docs & Sheets`;
  }

  if (
    has(
      "experience",
      "intern",
      "pkl",
      "organization",
      "himasi",
      "bem",
      "leader",
      "president",
    )
  ) {
    return `🏢 **Experience & Leadership:**\n\n• **Web Developer intern — Ciamis Tourism Office** (Aug–Oct 2026): built a paperless meeting system and a salary-slip sorting tool with a two-person team\n• **President of HIMASI UBSI** (2026–2027): led policies and coordinated all student chapters\n• **Public Relations Coordinator — BEM UBSI Tasikmalaya** (2024–2025): managed social media, posters, video reels, and event promotion\n• **BEM Setasik & HIMASI R&D** (2024–2026): documentation, research, and organizational evaluation`;
  }

  if (has("contact", "whatsapp", "email", "phone", "reach", "hubungi")) {
    return `📬 **Official Contacts:**\n\n• WhatsApp: [+62 822-1967-8296](https://wa.me/6282219678296)\n• Email: [ibahmisbahh6@gmail.com](mailto:ibahmisbahh6@gmail.com)\n• GitHub: [github.com/githu423](https://github.com/githu423)\n• LinkedIn: [linkedin.com/in/ibah-misbah](https://linkedin.com/in/ibah-misbah)\n\nYou can also use the form in the Contact section—email is delivered straight to Ibah's inbox.`;
  }

  if (
    has(
      "who is",
      "tell me about",
      "about ibah",
      "profile",
      "biodata",
      "background",
      "siapa",
    )
  ) {
    return `**Ibah Misbah** is a web developer and an Information Systems student at Universitas Bina Sarana Informatika (UBSI), Tasikmalaya campus (2024–2027), based in Ciamis, West Java, Indonesia.\n\n• **Focus:** PHP, Laravel (MVC), MySQL, responsive front-end\n• **Experience:** Ciamis Tourism Office internship, village platform (Cipakat-Hub), student organizations (BEM & HIMASI), and UMKM landing pages\n• **Creative side:** video editing (CapCut) and graphic design (Figma, Canva) — showcase at Instagram @ibah.codes\n• **Open to:** full-time roles, freelance projects, and team collaborations\n• **Built around:** clean code, tidy database design, and solutions that solve real problems`;
  }

  if (has("education", "university", "campus", "study", "degree", "ubsi")) {
    return `🎓 **Education:** Information Systems (BSc), Universitas Bina Sarana Informatika (UBSI), Tasikmalaya campus — 2024 to 2027. Faculty of Engineering & Informatics. Focus: software engineering, relational databases, information systems analysis, and project management.`;
  }

  if (has("why laravel", "why mysql", "why ")) {
    return `Ibah chooses **Laravel** for its clean MVC structure, built-in security (CSRF, XSS, SQL injection protection), Eloquent ORM, and maintainable Blade/Migration workflow. **MySQL** is used for reliable relational schemas, normalized tables, and optimized queries that keep applications fast.`;
  }

  if (
    has("location", "where", "domicile", "domisili", "ciamis", "tasikmalaya")
  ) {
    return `📍 Ibah is based in **Ciamis Regency, West Java, Indonesia**, near Tasikmalaya. He works remotely, hybrid, or on-site for local collaboration.`;
  }

  return null;
}

function getEnglishFallback() {
  return `That's a great question! 😊 I can explain Ibah's background, four real projects, internship and organizational experience, web stack, or full-time/freelance opportunities. You can also reach Ibah directly on **+62 822-1967-8296** or **ibahmisbahh6@gmail.com**.`;
}

module.exports = { getEnglishReply, getEnglishFallback };
