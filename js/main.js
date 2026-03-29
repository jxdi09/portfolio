/* ════════════════════════════════════════════════════
   PORTFOLIO — main.js
   Google Sheets เป็น backend จริง
   วิธีตั้งค่า:
   1. สร้าง Google Sheet ตามโครงสร้างด้านล่าง
   2. Publish → CSV (File > Share > Publish to web)
   3. ใส่ Sheet ID ใน CONFIG
════════════════════════════════════════════════════ */

/* ─── CONFIG ──────────────────────────────────────
   ลงชื่อ: เปลี่ยน SHEET_ID เป็น ID ของ Google Sheet คุณ
   และ FORM_URL เป็น Google Form URL (ถ้าใช้ form)
   
   โครงสร้าง Sheet:
   Sheet1 "Projects":  id | title | desc | tags | year | status | link | emoji | bg
   Sheet2 "Settings":  key | value  (name, email, github, linkedin, tagline)
   Sheet3 "Skills":    name | pct
   Sheet4 "Process":   icon | name | desc
─────────────────────────────────────────────────── */
const CONFIG = {
  SHEET_ID: 'YOUR_SHEET_ID_HERE',   // ← เปลี่ยนตรงนี้
  // Sheet names → gid numbers (ดูจาก URL ตอนคลิก tab)
  GID_PROJECTS:  '0',
  GID_SETTINGS:  '1',
  GID_SKILLS:    '2',
  GID_PROCESS:   '3',

  // Google Form สำหรับ contact (optional — ถ้าไม่ใช้ให้ใช้ localStorage)
  // เอา URL ของ form มาใส่ตรงนี้ แล้วแมป field name ด้านล่าง
  USE_GFORM: false,
  GFORM_URL: '',
  GFORM_FIELDS: {
    name:    'entry.000000001',
    company: 'entry.000000002',
    email:    'entry.000000003',
    type:    'entry.000000004',
    message: 'entry.000000005',
  }
};

/* ─── DEFAULT DATA (fallback เมื่อยังไม่ได้ตั้งค่า Sheet) ── */
const DEFAULTS = {
  settings: {
    name:     'Alex',
    tagline:  'Full-Stack Creative Technologist',
    email:    'alex@portfolio.dev',
    github:   'https://github.com/',
    linkedin: 'https://linkedin.com/',
    available: 'true',
    badge:    'ว่างรับงาน — Let\'s build something sharp',
  },
  projects: [
    { id:'1', title:'Portfolio CMS', desc:'ระบบ portfolio ที่เชื่อมกับ Google Sheets แก้ content ได้โดยไม่แตะ code', tags:'Next.js,GSheets,Admin', year:'2025', status:'live', link:'#contact', emoji:'🗂️', bg:'#1a1a2e' },
    { id:'2', title:'Fuel Receipt System', desc:'OCR สแกนใบเสร็จน้ำมัน ลด manual work และจัดสต็อกข้อมูลอัตโนมัติ', tags:'OCR,Apps Script,Workflow', year:'2024', status:'deployed', link:'#contact', emoji:'🧾', bg:'#1a2e1a' },
    { id:'3', title:'Internal Dashboard', desc:'แดชบอร์ดทีมปฏิบัติการ เน้นอ่านง่าย ข้อมูลสำคัญขึ้นก่อนเสมอ', tags:'Dashboard,UX,Data', year:'2024', status:'live', link:'#contact', emoji:'📊', bg:'#2e1a0a' },
    { id:'4', title:'Creative Landing Page', desc:'Landing page visual system แน่น focus conversion ไม่ทิ้ง brand', tags:'Brand,Motion,HTML', year:'2023', status:'delivered', link:'#contact', emoji:'🎨', bg:'#1a0a2e' },
  ],
  skills: [
    { name:'Frontend', pct:'92' }, { name:'Backend', pct:'85' },
    { name:'UI / UX',  pct:'78' }, { name:'DevOps',  pct:'64' },
  ],
  process: [
    { icon:'🔍', name:'Discover', desc:'ทำความเข้าใจ business goal, user pain points และ constraints ก่อนลงมือ' },
    { icon:'📐', name:'Design',   desc:'Wireframe → Prototype → Iterate ด้วย Figma และ flow ที่ทีมเข้าใจตรงกัน' },
    { icon:'⚡', name:'Build',    desc:'Code ที่อ่านได้ ทดสอบได้ scale ได้ — รันดี ไม่ใช่แค่รันติด' },
    { icon:'🚀', name:'Launch',   desc:'Deploy พร้อม monitoring ครบ ติดตามหลัง launch ต่อเพราะงานดีไม่จบวัน go-live' },
  ],
};

/* ─── SHEET FETCH ─────────────────────────────────── */
async function fetchSheet(gid) {
  if (CONFIG.SHEET_ID === 'YOUR_SHEET_ID_HERE') return null;
  const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/export?format=csv&gid=${gid}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    return parseCSV(text);
  } catch { return null; }
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = csvLine(lines[0]);
  return lines.slice(1).map(line => {
    const vals = csvLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h.trim()] = (vals[i] || '').trim(); });
    return obj;
  }).filter(r => Object.values(r).some(v => v));
}

function csvLine(line) {
  const result = []; let cur = ''; let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQ = !inQ; continue; }
    if (c === ',' && !inQ) { result.push(cur); cur = ''; continue; }
    cur += c;
  }
  result.push(cur);
  return result;
}

/* ─── LOAD ALL DATA ───────────────────────────────── */
async function loadData() {
  const [projRows, settRows, skillRows, procRows] = await Promise.all([
    fetchSheet(CONFIG.GID_PROJECTS),
    fetchSheet(CONFIG.GID_SETTINGS),
    fetchSheet(CONFIG.GID_SKILLS),
    fetchSheet(CONFIG.GID_PROCESS),
  ]);

  const settings = {};
  if (settRows && settRows.length) {
    settRows.forEach(r => { if (r.key) settings[r.key] = r.value; });
  }
  const mergedSettings = { ...DEFAULTS.settings, ...settings };

  const projects = (projRows && projRows.length) ? projRows : DEFAULTS.projects;
  const skills   = (skillRows && skillRows.length) ? skillRows : DEFAULTS.skills;
  const process  = (procRows && procRows.length) ? procRows : DEFAULTS.process;

  return { settings: mergedSettings, projects, skills, process };
}

/* ─── STATE ───────────────────────────────────────── */
const state = { lang: localStorage.getItem('port-lang') || 'th' };

/* ─── RENDER FUNCTIONS ────────────────────────────── */
function renderSettings(s) {
  const name = s.name || 'Alex';
  // nav logo
  const logo = document.getElementById('navLogo');
  if (logo) logo.innerHTML = name.toLowerCase() + '<span>.</span>dev';
  // hero
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    heroTitle.innerHTML =
      `${name.toUpperCase()}<br><span class="stroke">CREATIVE</span><br><span class="accent">DEV</span>`;
  }
  const heroBadge = document.getElementById('heroBadge');
  if (heroBadge && s.badge) heroBadge.querySelector('span:last-child').textContent = s.badge;

  const heroAvail = document.getElementById('heroAvail');
  if (heroAvail) heroAvail.style.display = s.available === 'false' ? 'none' : '';

  // footer
  const ftGH = document.getElementById('ftGithub');
  if (ftGH && s.github) ftGH.href = s.github;
  const ftLI = document.getElementById('ftLinkedin');
  if (ftLI && s.linkedin) ftLI.href = s.linkedin;

  // contact info
  document.querySelectorAll('[data-email]').forEach(el => { el.href = `mailto:${s.email}`; el.textContent = s.email; });
  document.querySelectorAll('[data-github]').forEach(el => { el.href = s.github; el.textContent = s.github.replace('https://',''); });
  document.querySelectorAll('[data-linkedin]').forEach(el => { el.href = s.linkedin; el.textContent = s.linkedin.replace('https://',''); });
}

function renderProjects(projects) {
  const list = document.getElementById('projectsList');
  if (!list) return;
  if (!projects.length) {
    list.innerHTML = `<div class="data-error">ไม่พบโปรเจกต์ — ตรวจสอบ Sheet ด้วย</div>`;
    return;
  }
  list.innerHTML = projects.map((p, i) => {
    const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    const num  = String(i+1).padStart(2,'0');
    const href = p.link && p.link !== '#contact' && p.link !== '' ? p.link : '#contact';
    return `
      <a class="project-item reveal" href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>
        <div class="proj-num">${num}</div>
        <div class="proj-main">
          <div class="proj-title">${p.title || '—'}</div>
          <div class="proj-tags">
            ${tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="proj-right">
          <span class="proj-year">${p.year || '2024'}</span>
          <span class="proj-status">${p.status || 'live'}</span>
          <span class="proj-arrow">↗</span>
        </div>
      </a>
    `;
  }).join('');
  observeReveals();
}

function renderSkills(skills) {
  const wrap = document.getElementById('skillsWrap');
  if (!wrap) return;
  wrap.innerHTML = skills.map(s => `
    <div class="skill-row reveal">
      <span class="skill-name">${s.name}</span>
      <div class="skill-track"><div class="skill-bar" data-pct="${s.pct}"></div></div>
      <span class="skill-pct">${s.pct}%</span>
    </div>
  `).join('');
  observeReveals();
  animateSkillBars();
}

function renderProcess(proc) {
  const grid = document.getElementById('processGrid');
  if (!grid) return;
  grid.innerHTML = proc.map((p, i) => `
    <div class="process-card reveal reveal-d${Math.min(i+1,3)}">
      <div class="process-num">0${i+1}</div>
      <div class="proc-icon-box">${p.icon || '⚡'}</div>
      <div class="proc-name">${(p.name || '').toUpperCase()}</div>
      <p class="proc-desc">${p.desc || ''}</p>
    </div>
  `).join('');
  observeReveals();
}

/* ─── SKILLS ANIMATION ───────────────────────────── */
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.pct + '%';
      o.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  bars.forEach(b => obs.observe(b));
}

/* ─── REVEAL ─────────────────────────────────────── */
const revealObs = new IntersectionObserver((entries, o) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      o.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

function observeReveals() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObs.observe(el));
}

/* ─── TICKER ──────────────────────────────────────── */
function buildTicker(settings) {
  const stack = ['React','Next.js','Node.js','TypeScript','Python','Figma','PostgreSQL','GSheets'];
  const inner = document.getElementById('tickerInner');
  if (!inner) return;
  const items = stack.map(s => `<span class="ticker-item"><span class="sep">✦</span>${s}</span>`).join('');
  inner.innerHTML = items + items; // duplicate for seamless loop
}

/* ─── NAV SCROLL ─────────────────────────────────── */
window.addEventListener('scroll', () => {
  const nw = document.querySelector('.nav-wrap');
  if (nw) nw.style.borderBottomColor = scrollY > 30 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)';
}, { passive: true });

/* ─── HAMBURGER ───────────────────────────────────── */
const ham = document.getElementById('navHam');
const navLinks = document.getElementById('navLinks');
if (ham && navLinks) {
  ham.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    ham.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ─── CONTACT FORM ────────────────────────────────── */
function initContactForm(settings) {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn  = form.querySelector('[type=submit]');
    const alert = document.getElementById('formAlert');

    const name    = form.querySelector('#cf-name')?.value.trim();
    const email   = form.querySelector('#cf-email')?.value.trim();
    const company = form.querySelector('#cf-company')?.value.trim() || '';
    const type    = form.querySelector('#cf-type')?.value || '';
    const message = form.querySelector('#cf-message')?.value.trim();

    if (!name || !email || !message) {
      showAlert(alert, 'กรุณากรอกชื่อ, Email และข้อความให้ครบ', 'err');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'กำลังส่ง...';

    try {
      if (CONFIG.USE_GFORM && CONFIG.GFORM_URL) {
        // ─ ส่งผ่าน Google Form ─
        const fd = new FormData();
        fd.append(CONFIG.GFORM_FIELDS.name,    name);
        fd.append(CONFIG.GFORM_FIELDS.email,   email);
        fd.append(CONFIG.GFORM_FIELDS.company, company);
        fd.append(CONFIG.GFORM_FIELDS.type,    type);
        fd.append(CONFIG.GFORM_FIELDS.message, message);
        await fetch(CONFIG.GFORM_URL.replace('/viewform','/formResponse'), {
          method: 'POST', body: fd, mode: 'no-cors'
        });
      } else {
        // ─ ส่งลง localStorage (local fallback / ใช้คู่กับ admin) ─
        saveContactLocal({ name, email, company, type, message });
      }
      showAlert(alert, '✓ ได้รับแล้ว! จะตอบกลับภายใน 24 ชั่วโมง', 'ok');
      form.reset();
    } catch(err) {
      showAlert(alert, 'เกิดข้อผิดพลาด กรุณาลองใหม่หรือ email โดยตรง', 'err');
    } finally {
      btn.disabled = false;
      btn.textContent = 'ส่งเลย →';
    }
  });
}

function showAlert(el, msg, cls) {
  if (!el) return;
  el.textContent = msg;
  el.className = `form-alert ${cls}`;
  el.style.display = 'block';
}

function saveContactLocal(data) {
  const list = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
  list.unshift({
    id: Date.now(), read: false,
    date: new Date().toLocaleString('th-TH', { dateStyle:'short', timeStyle:'short' }),
    ...data
  });
  localStorage.setItem('portfolio_contacts', JSON.stringify(list));
}

/* ─── BOOT ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  // Show loading state
  const projList = document.getElementById('projectsList');
  if (projList) projList.innerHTML = `<div class="loading-row"><div class="spinner"></div><span>กำลังโหลดข้อมูลจาก Google Sheets...</span></div>`;

  let data;
  try {
    data = await loadData();
  } catch {
    data = {
      settings: DEFAULTS.settings,
      projects: DEFAULTS.projects,
      skills:   DEFAULTS.skills,
      process:  DEFAULTS.process,
    };
  }

  renderSettings(data.settings);
  renderProjects(data.projects);
  renderSkills(data.skills);
  renderProcess(data.process);
  buildTicker(data.settings);
  initContactForm(data.settings);

  // admin sync: อ่าน projects จาก admin ถ้ามี (override sheet)
  const adminProjs = localStorage.getItem('portfolio_projects');
  if (adminProjs && CONFIG.SHEET_ID === 'YOUR_SHEET_ID_HERE') {
    try {
      const parsed = JSON.parse(adminProjs);
      renderProjects(parsed.map(p => ({
        title: p.title, desc: p.desc, tags: (p.tags||[]).join(','),
        year: p.year, status: 'live', link: p.link||'#contact',
        emoji: p.emoji, bg: p.bg
      })));
    } catch {}
  }

  observeReveals();
});
