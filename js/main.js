const STORAGE_THEME = "portfolio-theme";
const STORAGE_LANG = "portfolio-lang";

const i18n = {
  th: {
    "nav.theme": "ธีม",
    "theme.dark": "มืด",
    "theme.light": "สว่าง",
    "theme.darkAria": "เปลี่ยนเป็นธีมมืด",
    "theme.lightAria": "เปลี่ยนเป็นธีมสว่าง",
    "nav.work": "งาน",
    "nav.about": "ตัวเอง",
    "nav.process": "วิธีทำ",
    "nav.contact": "คุยกัน",
    "hero.badge": "ว่างรับงานอยู่ — let's build something sharp",
    "hero.title": "ทำของที่<br>ใช้ได้จริง<br>ให้ดู<em>ดีด้วย</em><span class='line-muted'>Full-Stack · Creative Technologist</span>",
    "hero.desc": "Code ดี + Design ดี ต้องไปด้วยกัน — ผมทำตั้งแต่ concept, UX, development จนถึง production โดยไม่ปล่อยให้งานดูธรรมดาเกินจำเป็น",
    "hero.ctaPrimary": "ดูผลงาน",
    "hero.ctaSecondary": "คุยกัน",
    "hero.centerLabel": "Years",
    "hero.cardA.label": "UI / UX",
    "hero.cardA.value": "Clean systems",
    "hero.cardB.label": "Code",
    "hero.cardB.value": "Production-ready",
    "work.eyebrow": "// 01 — selected work",
    "work.title": "งานที่ภูมิใจ<br><em>พอจะโชว์</em> ได้",
    "work.cta": "เริ่มคุยงาน",
    "about.eyebrow": "// 02 — about me",
    "about.title": "ผม Alex<br>dev ที่ไม่ยอม<br>ให้งาน<em>ดูห่วย</em>",
    "about.p1": "5+ ปีที่ build digital products มา ตั้งแต่ startup เล็กๆ จนถึงองค์กรระดับใหญ่ สิ่งที่ยึดมาตลอดคือ — ถ้า code ดีแต่หน้าตาแย่ มันก็ยังไม่ดีพอ",
    "about.p2": "ไม่ว่าจะเป็นงานใหม่ตั้งแต่ศูนย์ หรือ redesign ระบบที่มีอยู่แล้ว ผมเน้นความเรียบง่าย ความเร็ว และประสบการณ์ใช้งานที่รู้สึกได้ว่า "ลื่น"",
    "about.stat1": "ปีที่ build digital products",
    "about.stat2": "Projects ที่ส่ง production ไปแล้ว",
    "about.stat3": "งานทุกชิ้นต้องผ่านตัวเองก่อน — ไม่ปล่อย half-baked",
    "process.eyebrow": "// 03 — how i work",
    "process.title": "วิธีทำงาน",
    "process.sub": "ไม่เดาสุ่ม — ทุก project มี process ชัดเจน ตั้งแต่วันแรกจนถึงวัน launch",
    "contact.eyebrow": "// 04 — let's work together",
    "contact.title": "มีอะไร<br>อยู่ในหัว<br><em>อยู่แล้ว?</em>",
    "contact.sub": "ส่งมาได้เลย ไม่ต้อง perfect ก่อนติดต่อ — คุยกันก่อนก็พอ",
    "form.name": "ชื่อ *",
    "form.company": "บริษัท",
    "form.email": "Email *",
    "form.type": "งานแบบไหน?",
    "form.message": "เล่าให้ฟังหน่อย *",
    "form.namePh": "ชื่อคุณ",
    "form.companyPh": "ถ้ามี",
    "form.emailPh": "สำหรับตอบกลับ",
    "form.messagePh": "ไม่ต้องเป็นทางการ บอก idea คร่าวๆ ก็ได้",
    "form.submit": "ส่งเลย",
    "footer.copy": "© 2025 Alex · Full-Stack Creative Technologist",
    "footer.github": "GitHub",
    "footer.linkedin": "LinkedIn",
    "footer.admin": "admin",
    "projects.cta1": "ดูรายละเอียด",
    "projects.cta2": "คุยโปรเจกต์นี้",
    "project.status.live": "ใช้งานจริง",
    "project.status.deployed": "ส่งขึ้นระบบแล้ว",
    "project.status.optimized": "ปรับจบแล้ว",
    "project.status.delivered": "ส่งมอบแล้ว",
    "project.case": "Case study",
    "project.demo": "Demo",
    "project.repo": "Code",
    "project.more": "คุยงานนี้"
  },
  en: {
    "nav.theme": "Theme",
    "theme.dark": "Dark",
    "theme.light": "Light",
    "theme.darkAria": "Switch to dark theme",
    "theme.lightAria": "Switch to light theme",
    "nav.work": "Work",
    "nav.about": "About",
    "nav.process": "Process",
    "nav.contact": "Contact",
    "hero.badge": "Available for work — let's build something sharp",
    "hero.title": "Build things<br>that actually work<br>and still look<em> good</em><span class='line-muted'>Full-Stack · Creative Technologist</span>",
    "hero.desc": "Good code and good design belong together. I work from concept, UX, and development through production without letting the product feel generic.",
    "hero.ctaPrimary": "View work",
    "hero.ctaSecondary": "Talk to me",
    "hero.centerLabel": "Years",
    "hero.cardA.label": "UI / UX",
    "hero.cardA.value": "Clean systems",
    "hero.cardB.label": "Code",
    "hero.cardB.value": "Production-ready",
    "work.eyebrow": "// 01 — selected work",
    "work.title": "Work I am<br><em>proud</em> to show",
    "work.cta": "Start a project",
    "about.eyebrow": "// 02 — about me",
    "about.title": "I am Alex<br>a dev who does not<br>let work look<em> bad</em>",
    "about.p1": "Over 5 years building digital products, from small startups to larger organizations. My baseline stays the same — if the code is good but the interface looks weak, it is still not enough.",
    "about.p2": "Whether it is a brand-new product or a redesign of an existing system, I focus on clarity, speed, and a user experience that feels smooth.",
    "about.stat1": "Years building digital products",
    "about.stat2": "Projects shipped to production",
    "about.stat3": "Every piece of work passes my own review first — no half-baked delivery",
    "process.eyebrow": "// 03 — how i work",
    "process.title": "Process",
    "process.sub": "No guessing — every project follows a clear process from day one to launch.",
    "contact.eyebrow": "// 04 — let's work together",
    "contact.title": "Got<br>something<br><em>in mind?</em>",
    "contact.sub": "Send it over. It does not need to be perfect before reaching out.",
    "form.name": "Name *",
    "form.company": "Company",
    "form.email": "Email *",
    "form.type": "Project type",
    "form.message": "Tell me more *",
    "form.namePh": "Your name",
    "form.companyPh": "Optional",
    "form.emailPh": "For reply",
    "form.messagePh": "A rough idea is enough",
    "form.submit": "Send",
    "footer.copy": "© 2025 Alex · Full-Stack Creative Technologist",
    "footer.github": "GitHub",
    "footer.linkedin": "LinkedIn",
    "footer.admin": "admin",
    "projects.cta1": "Details",
    "projects.cta2": "Discuss this",
    "project.status.live": "Live",
    "project.status.deployed": "Deployed",
    "project.status.optimized": "Optimized",
    "project.status.delivered": "Delivered",
    "project.case": "Case study",
    "project.demo": "Demo",
    "project.repo": "Code",
    "project.more": "Discuss"
  }
};

const skills = [
  { label: { th: "Frontend", en: "Frontend" }, pct: 92 },
  { label: { th: "Backend", en: "Backend" }, pct: 85 },
  { label: { th: "UI / UX", en: "UI / UX" }, pct: 78 },
  { label: { th: "DevOps", en: "DevOps" }, pct: 64 }
];

const stack = ["React", "Next.js", "Node.js", "TypeScript", "Python", "Figma", "PostgreSQL"];

// ─────────────────────────────────────────────────────────
// PROJECTS: อ่านจาก localStorage (ที่ admin เซฟไว้)
// ถ้ายังไม่มีจะใช้ default
// ─────────────────────────────────────────────────────────
const defaultProjects = [
  {
    id: 1,
    year: "2025",
    emoji: "🗂️",
    bg: "#e8f0fe",
    title: { th: "Portfolio CMS", en: "Portfolio CMS" },
    desc: {
      th: "ระบบพอร์ตโฟลิโอที่เชื่อมกับ Admin panel เพื่อแก้เนื้อหาได้เองโดยไม่ต้องยุ่งกับโค้ดทุกครั้ง",
      en: "A portfolio system connected to an admin panel so content can be updated without touching code every time."
    },
    tags: ["Next.js", "Admin", "CMS"],
    status: "live",
    link: "#contact"
  },
  {
    id: 2,
    year: "2024",
    emoji: "🧾",
    bg: "#ecfdf5",
    title: { th: "Fuel Receipt System", en: "Fuel Receipt System" },
    desc: {
      th: "ระบบสแกนใบเสร็จและบันทึกข้อมูลเติมน้ำมัน ลดงาน manual และช่วยจัดสต็อกข้อมูลให้เป็นระเบียบ",
      en: "An OCR-based fuel receipt workflow that cuts manual work and keeps data organized."
    },
    tags: ["OCR", "Apps Script", "Workflow"],
    status: "deployed",
    link: "#contact"
  },
  {
    id: 3,
    year: "2024",
    emoji: "📊",
    bg: "#fef3c7",
    title: { th: "Internal Dashboard", en: "Internal Dashboard" },
    desc: {
      th: "แดชบอร์ดสำหรับทีมปฏิบัติการที่เน้นอ่านง่าย ตัด noise ออก และโชว์ข้อมูลสำคัญแบบทันที",
      en: "An operations dashboard designed for readability, low noise, and fast access to critical data."
    },
    tags: ["Dashboard", "UX", "Data"],
    status: "optimized",
    link: "#contact"
  },
  {
    id: 4,
    year: "2023",
    emoji: "🎨",
    bg: "#f7e8df",
    title: { th: "Creative Landing Page", en: "Creative Landing Page" },
    desc: {
      th: "หน้า landing page ที่ใช้ visual system ชัดเจน เน้น conversion แต่ยังคงบุคลิกของแบรนด์ไว้ครบ",
      en: "A landing page with a clear visual system, conversion focus, and a strong brand personality."
    },
    tags: ["Brand", "Motion", "Conversion"],
    status: "delivered",
    link: "#contact"
  }
];

// อ่าน projects จาก admin localStorage — ถ้ามีให้ใช้ของ admin
function getProjectsForSite() {
  try {
    const stored = localStorage.getItem('portfolio_projects');
    if (stored) {
      const adminProjects = JSON.parse(stored);
      // แปลงจาก admin format → site format
      return adminProjects.map(p => ({
        id: p.id,
        year: p.year || "2024",
        emoji: p.emoji || "💻",
        bg: p.bg || "#f0ede6",
        title: { th: p.title, en: p.title },
        desc: { th: p.desc || "", en: p.desc || "" },
        tags: p.tags || [],
        status: "live",
        link: p.link || "#contact"
      }));
    }
  } catch (e) {}
  return defaultProjects;
}

const processSteps = [
  {
    icon: "🔍",
    name: { th: "Discover", en: "Discover" },
    desc: {
      th: "ทำความเข้าใจก่อนลงมือ — business goal, user pain points และ constraints ทั้งหมด",
      en: "Understand the business goal, user pain points, and constraints before writing a single line."
    }
  },
  {
    icon: "📐",
    name: { th: "Design", en: "Design" },
    desc: {
      th: "Wireframe → Prototype → Iterate ด้วย Figma และ flow ที่ทีมเข้าใจตรงกัน",
      en: "Wireframe → prototype → iterate with a Figma flow the whole team can align on."
    }
  },
  {
    icon: "⚡",
    name: { th: "Build", en: "Build" },
    desc: {
      th: "เขียน code ที่อ่านได้ ทดสอบได้ และ scale ได้ — ทำให้มันรันได้ดี ไม่ใช่แค่รันติด",
      en: "Write code that is readable, testable, and scalable — not merely functional."
    }
  },
  {
    icon: "🚀",
    name: { th: "Launch", en: "Launch" },
    desc: {
      th: "Deploy พร้อม monitoring ครบ และยังติดตามหลัง launch ต่อ เพราะงานดีไม่จบวัน go-live",
      en: "Deploy with monitoring and stay involved after launch, because good work does not end at go-live."
    }
  }
];

const contactRows = [
  { icon: "📧", label: "Email", value: "alex@yourportfolio.com", href: "mailto:alex@yourportfolio.com" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/alexdev", href: "https://www.linkedin.com/" },
  { icon: "🐙", label: "GitHub", value: "github.com/alexdev", href: "https://github.com/" }
];

const formTypeOptions = {
  th: ["เลือกได้เลย", "Web Application", "Mobile App", "UX / UI Design", "Full-Stack Development", "Consulting", "อื่นๆ"],
  en: ["Choose one", "Web Application", "Mobile App", "UX / UI Design", "Full-Stack Development", "Consulting", "Other"]
};

const state = {
  theme: localStorage.getItem(STORAGE_THEME) || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"),
  lang: localStorage.getItem(STORAGE_LANG) || "th"
};

const htmlEl = document.documentElement;

function getThemeLabel() {
  if (state.lang === "th") return state.theme === "dark" ? "มืด" : "สว่าง";
  return state.theme === "dark" ? "Dark" : "Light";
}

function getThemeAriaLabel() {
  if (state.lang === "th") return state.theme === "dark" ? "เปลี่ยนเป็นธีมสว่าง" : "เปลี่ยนเป็นธีมมืด";
  return state.theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
}

function updateThemeButton() {
  if (!themeToggle) return;
  const mark = themeToggle.querySelector(".icon-btn-mark");
  const text = themeToggle.querySelector(".icon-btn-text");
  if (mark) mark.textContent = state.theme === "dark" ? "◐" : "◑";
  if (text) text.textContent = getThemeLabel();
  themeToggle.setAttribute("aria-label", getThemeAriaLabel());
  themeToggle.setAttribute("aria-pressed", String(state.theme === "light"));
}

const navHam = document.getElementById("navHam");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const projectsGrid = document.getElementById("projectsGrid");
const processGrid = document.getElementById("processGrid");
const skillsList = document.getElementById("skillsList");
const heroStack = document.getElementById("heroStack");
const contactInfo = document.getElementById("contactInfo");
const form = document.getElementById("contactForm");
const formAlert = document.getElementById("formAlert");

function t(key) {
  return i18n[state.lang][key] || i18n.th[key] || key;
}

function setTheme(theme) {
  state.theme = theme;
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_THEME, theme);
  updateThemeButton();
}

function setLang(lang) {
  state.lang = lang;
  htmlEl.lang = lang;
  localStorage.setItem(STORAGE_LANG, lang);

  const langLabel = langToggle.querySelector(".icon-btn-mark");
  const langText = langToggle.querySelector(".icon-btn-text");
  langLabel.textContent = lang.toUpperCase();
  langText.textContent = lang === "th" ? "EN" : "TH";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.getAttribute("data-i18n-html");
    node.innerHTML = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    node.placeholder = t(key);
  });

  updateThemeButton();
  renderDynamicContent();
  renderContactSelect();
  renderProjects();
  renderProcess();
}

function renderDynamicContent() {
  heroStack.innerHTML = stack.map((item) => `<span class="chip">${item}</span>`).join("");
}

function projectStatusLabel(status) {
  const map = {
    live: "project.status.live",
    deployed: "project.status.deployed",
    optimized: "project.status.optimized",
    delivered: "project.status.delivered"
  };
  return t(map[status] || "project.status.live");
}

function renderProjects() {
  if (!projectsGrid) return;
  const projects = getProjectsForSite();

  projectsGrid.innerHTML = projects.map((project) => {
    const titleStr = typeof project.title === "object" ? project.title[state.lang] || project.title.th : project.title;
    const descStr  = typeof project.desc  === "object" ? project.desc[state.lang]  || project.desc.th  : project.desc;
    const linkHref = project.link || "#contact";

    return `
      <article class="project-card reveal">
        <div class="project-top">
          <div>
            <div class="project-year">${project.year || "2024"}</div>
            <h3 class="project-title">${titleStr}</h3>
          </div>
          <div class="project-status">${projectStatusLabel(project.status || "live")}</div>
        </div>
        <p class="project-desc">${descStr}</p>
        <div class="project-meta">
          ${(project.tags || []).map((tag) => `<span class="meta-tag">${tag}</span>`).join("")}
        </div>
        <div class="project-footer">
          <a href="${linkHref}" class="project-link">${t("projects.cta1")} <span aria-hidden="true">→</span></a>
          <a href="#contact" class="project-link secondary">${t("projects.cta2")} <span aria-hidden="true">→</span></a>
        </div>
      </article>
    `;
  }).join("");
  observeReveals();
}

function renderProcess() {
  if (!processGrid) return;
  processGrid.innerHTML = processSteps.map((step, index) => `
    <article class="process-step reveal">
      <div class="step-num">0${index + 1}</div>
      <span class="step-icon" aria-hidden="true">${step.icon}</span>
      <h3 class="step-name">${step.name[state.lang]}</h3>
      <p class="step-desc">${step.desc[state.lang]}</p>
      ${index < processSteps.length - 1 ? `<div class="step-arrow" aria-hidden="true">›</div>` : ""}
    </article>
  `).join("");
  observeReveals();
}

function renderSkills() {
  if (!skillsList) return;
  skillsList.innerHTML = skills.map((skill) => `
    <div class="skill-item">
      <span class="skill-label">${skill.label[state.lang]}</span>
      <div class="skill-track"><div class="skill-bar" data-pct="${skill.pct}"></div></div>
      <span class="skill-pct">${skill.pct}%</span>
    </div>
  `).join("");
  animateSkills();
}

function renderContactSelect() {
  const select = document.getElementById("cf-type");
  if (!select) return;
  select.innerHTML = formTypeOptions[state.lang].map((label, index) => {
    const value = index === 0 ? "" : label;
    return `<option value="${value}">${label}</option>`;
  }).join("");
}

function renderContactInfo() {
  if (!contactInfo) return;
  contactInfo.innerHTML = contactRows.map((row) => `
    <a class="contact-row" href="${row.href}" target="${row.href.startsWith("mailto:") ? "_self" : "_blank"}" rel="noreferrer">
      <div class="contact-icon" aria-hidden="true">${row.icon}</div>
      <div>
        <div class="contact-lbl">${row.label}</div>
        <div class="contact-val">${row.value}</div>
      </div>
    </a>
  `).join("");
}

function observeReveals() {
  const reveals = document.querySelectorAll(".reveal:not(.visible)");
  reveals.forEach((el) => revealObserver.observe(el));
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

function animateSkills() {
  const bars = document.querySelectorAll(".skill-bar");
  const skillObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.width = `${entry.target.getAttribute("data-pct")}%`;
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );
  bars.forEach((bar) => skillObserver.observe(bar));
}

function resetStatus(message, type = "ok") {
  formAlert.style.display = "block";
  formAlert.textContent = message;
  if (type === "ok") {
    formAlert.style.color = "var(--text)";
    formAlert.style.background = "rgba(74, 222, 128, 0.12)";
    formAlert.style.borderColor = "rgba(74, 222, 128, 0.18)";
  } else {
    formAlert.style.color = "var(--text)";
    formAlert.style.background = "rgba(255, 107, 107, 0.12)";
    formAlert.style.borderColor = "rgba(255, 107, 107, 0.18)";
  }
}

// ─────────────────────────────────────────────────────────
// SAVE CONTACT → localStorage → admin จะเห็น
// ─────────────────────────────────────────────────────────
function saveContactToAdmin(data) {
  try {
    const existing = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
    const newContact = {
      id: Date.now(),
      name: data.name,
      company: data.company || '',
      email: data.email,
      type: data.type || '',
      message: data.message,
      date: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }),
      read: false
    };
    existing.unshift(newContact);
    localStorage.setItem('portfolio_contacts', JSON.stringify(existing));
  } catch (e) {}
}

// ── EVENT LISTENERS ──
if (navHam && navLinks) {
  navHam.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navHam.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navHam.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !navHam.contains(e.target)) {
      navLinks.classList.remove("open");
      navHam.setAttribute("aria-expanded", "false");
    }
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(state.theme === "dark" ? "light" : "dark");
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    setLang(state.lang === "th" ? "en" : "th");
  });
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameEl    = document.getElementById("cf-name");
    const emailEl   = document.getElementById("cf-email");
    const messageEl = document.getElementById("cf-message");
    const companyEl = document.getElementById("cf-company");
    const typeEl    = document.getElementById("cf-type");

    const valid = nameEl.value.trim() && emailEl.value.trim() && messageEl.value.trim();
    if (!valid) {
      resetStatus(state.lang === "th" ? "กรุณากรอกช่องที่จำเป็นให้ครบก่อน" : "Please complete the required fields first.", "error");
      return;
    }

    // บันทึกลง localStorage เพื่อให้ admin เห็น
    saveContactToAdmin({
      name:    nameEl.value.trim(),
      company: companyEl ? companyEl.value.trim() : '',
      email:   emailEl.value.trim(),
      type:    typeEl ? typeEl.value : '',
      message: messageEl.value.trim()
    });

    resetStatus(state.lang === "th" ? "✓ ได้รับแล้ว! จะตอบกลับภายใน 24 ชั่วโมง" : "✓ Received. I will reply within 24 hours.", "ok");
    form.reset();
    renderContactSelect();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTheme(state.theme);
  setLang(state.lang);
  renderDynamicContent();
  renderContactInfo();
  renderSkills();
  renderProjects();
  renderProcess();
  observeReveals();

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.getAttribute("data-i18n-html");
    node.innerHTML = t(key);
  });
});

window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  nav.style.borderColor = window.scrollY > 10 ? "var(--line-strong)" : "var(--line)";
});
