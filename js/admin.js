/* ═══════════════════════════════════
   ADMIN — admin.js
═══════════════════════════════════ */

const CREDS = { user: 'admin', pass: 'admin1234' };

// ── AUTH ───────────────────────────────────────────
function doLogin() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  if (u === CREDS.user && p === CREDS.pass) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminApp').style.display   = 'block';
    initAdmin();
  } else {
    const err = document.getElementById('loginErr');
    err.style.display = 'block';
    document.getElementById('loginPass').value = '';
    setTimeout(() => (err.style.display = 'none'), 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const p = document.getElementById('loginPass');
  if (p) p.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
});

// ── DATA ───────────────────────────────────────────
function getProjects() {
  const s = localStorage.getItem('portfolio_projects');
  return s ? JSON.parse(s) : getDefaultProjects();
}
function saveProjects(d) { localStorage.setItem('portfolio_projects', JSON.stringify(d)); }
function getContacts() { return JSON.parse(localStorage.getItem('portfolio_contacts') || '[]'); }
function saveContacts(d) { localStorage.setItem('portfolio_contacts', JSON.stringify(d)); }
function getSettings() { return JSON.parse(localStorage.getItem('portfolio_settings') || '{}'); }
function saveSettingsData(d) { localStorage.setItem('portfolio_settings', JSON.stringify(d)); }

function getDefaultProjects() {
  return [
    { id:1, emoji:'🗂️', bg:'#1a1a2e', tags:['Next.js','GSheets','Admin'], year:'2025', title:'Portfolio CMS', desc:'ระบบ portfolio ที่เชื่อมกับ Google Sheets แก้ content ได้โดยไม่แตะ code', link:'' },
    { id:2, emoji:'🧾', bg:'#1a2e1a', tags:['OCR','Apps Script','Workflow'], year:'2024', title:'Fuel Receipt System', desc:'OCR สแกนใบเสร็จน้ำมัน ลด manual work จัดสต็อกข้อมูลอัตโนมัติ', link:'' },
    { id:3, emoji:'📊', bg:'#2e1a0a', tags:['Dashboard','UX','Data'], year:'2024', title:'Internal Dashboard', desc:'แดชบอร์ดทีมปฏิบัติการ เน้นอ่านง่าย ข้อมูลสำคัญขึ้นก่อนเสมอ', link:'' },
    { id:4, emoji:'🎨', bg:'#1a0a2e', tags:['Brand','Motion','HTML'], year:'2023', title:'Creative Landing Page', desc:'Landing page visual system แน่น focus conversion ไม่ทิ้ง brand', link:'' },
  ];
}

// ── INIT ───────────────────────────────────────────
function initAdmin() {
  refreshStats();
  renderDashRecents();
  renderProjectsTable();
  renderContactsTable();
  renderAnalyticsChart();
  loadSettingsForm();
  showPage('dashboard');
}

// ── NAVIGATION ─────────────────────────────────────
const PAGE_LABELS = {
  dashboard: 'Dashboard', projects: 'Projects',
  contacts: 'Contacts', analytics: 'Analytics', settings: 'Settings'
};

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-link[data-page]').forEach(l => l.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  const link = document.querySelector(`.sidebar-link[data-page="${id}"]`);
  if (link) link.classList.add('active');
  const title = document.getElementById('topbarTitle');
  if (title) title.textContent = PAGE_LABELS[id] || id;
}

// ── STATS ──────────────────────────────────────────
function refreshStats() {
  const projects = getProjects();
  const contacts = getContacts();
  const unread   = contacts.filter(c => !c.read).length;
  setText('st-projects', projects.length);
  setText('st-contacts', contacts.length);
  setText('st-unread', unread);
  setText('st-contacts2', contacts.length);
  const badge = document.getElementById('unreadBadge');
  if (badge) {
    badge.style.display = unread > 0 ? 'inline-flex' : 'none';
    badge.textContent = unread;
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── DASHBOARD RECENTS ──────────────────────────────
function renderDashRecents() {
  const contacts = getContacts().slice(0, 5);
  const tbody = document.getElementById('dashContactTable');
  if (!tbody) return;
  if (!contacts.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="tbl-empty">ยังไม่มีข้อความ</td></tr>`;
    return;
  }
  tbody.innerHTML = contacts.map(c => `
    <tr>
      <td><span style="font-weight:500">${c.name}</span></td>
      <td style="color:var(--muted)">${c.company || '—'}</td>
      <td style="color:var(--muted)">${c.type || '—'}</td>
      <td style="color:var(--muted2);font-family:var(--mono);font-size:0.68rem">${c.date}</td>
      <td><span class="pill ${c.read ? 'pill-read' : 'pill-new'}">${c.read ? 'อ่านแล้ว' : '● ใหม่'}</span></td>
    </tr>
  `).join('');
}

// ── PROJECTS ───────────────────────────────────────
let editingProjectId = null;

function renderProjectsTable() {
  const projects = getProjects();
  const tbody = document.getElementById('projectsTable');
  if (!tbody) return;
  if (!projects.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="tbl-empty">ยังไม่มีผลงาน</td></tr>`;
    return;
  }
  tbody.innerHTML = projects.map(p => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="proj-thumb-sm" style="background:${p.bg||'#1a1a1a'}">${p.emoji||'💻'}</div>
          <span style="font-weight:500">${p.title}</span>
        </div>
      </td>
      <td>${(p.tags||[]).map(t=>`<span style="font-family:var(--mono);font-size:0.6rem;background:rgba(255,255,255,0.05);border:1px solid var(--border2);padding:2px 7px;border-radius:3px;margin-right:4px">${t}</span>`).join('')}</td>
      <td style="font-family:var(--mono);font-size:0.7rem;color:var(--muted2)">${p.year||'—'}</td>
      <td><span class="pill pill-live">● Live</span></td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn btn-ghost btn-sm" onclick="openProjectModal(${p.id})">แก้ไข</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProject(${p.id})">ลบ</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openProjectModal(id) {
  editingProjectId = id || null;
  document.getElementById('projectModalTitle').textContent = id ? 'แก้ไขผลงาน' : 'เพิ่มผลงานใหม่';
  ['pm-title','pm-year','pm-emoji','pm-bg','pm-tags','pm-desc','pm-link'].forEach(f => {
    const el = document.getElementById(f); if (el) el.value = '';
  });
  if (id) {
    const p = getProjects().find(x => x.id === id);
    if (p) {
      setVal('pm-title', p.title||''); setVal('pm-year', p.year||'');
      setVal('pm-emoji', p.emoji||''); setVal('pm-bg', p.bg||'');
      setVal('pm-tags', (p.tags||[]).join(', ')); setVal('pm-desc', p.desc||'');
      setVal('pm-link', p.link||'');
    }
  }
  openModal('projectModal');
}

function saveProject() {
  const title = document.getElementById('pm-title')?.value.trim();
  if (!title) { showToast('❌ กรุณาใส่ชื่อผลงาน'); return; }
  const proj = {
    id:    editingProjectId || Date.now(),
    title,
    year:  getVal('pm-year'),
    emoji: getVal('pm-emoji') || '💻',
    bg:    getVal('pm-bg')    || '#1a1a2e',
    tags:  getVal('pm-tags').split(',').map(t=>t.trim()).filter(Boolean),
    desc:  getVal('pm-desc'),
    link:  getVal('pm-link'),
  };
  let projects = getProjects();
  if (editingProjectId) {
    projects = projects.map(p => p.id === editingProjectId ? proj : p);
  } else {
    projects.unshift(proj);
  }
  saveProjects(projects);
  closeModal('projectModal');
  renderProjectsTable();
  refreshStats();
  showToast(editingProjectId ? '✓ แก้ไขผลงานแล้ว' : '✓ เพิ่มผลงานใหม่แล้ว');
}

function deleteProject(id) {
  if (!confirm('ลบผลงานนี้?')) return;
  saveProjects(getProjects().filter(p => p.id !== id));
  renderProjectsTable();
  refreshStats();
  showToast('🗑 ลบผลงานแล้ว');
}

// ── SETTINGS ───────────────────────────────────────
function loadSettingsForm() {
  const s = getSettings();
  setVal('set-name',    s.name    || '');
  setVal('set-email',   s.email   || '');
  setVal('set-github',  s.github  || '');
  setVal('set-linkedin',s.linkedin|| '');
  setVal('set-badge',   s.badge   || '');
}

function saveSettings() {
  const s = {
    name:     getVal('set-name'),
    email:    getVal('set-email'),
    github:   getVal('set-github'),
    linkedin: getVal('set-linkedin'),
    badge:    getVal('set-badge'),
  };
  saveSettingsData(s);
  showToast('✓ บันทึก Settings แล้ว');
}

// ── CONTACTS ───────────────────────────────────────
function renderContactsTable() {
  const contacts = getContacts();
  const tbody = document.getElementById('contactsTable');
  if (!tbody) return;
  if (!contacts.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="tbl-empty">ยังไม่มีข้อความ</td></tr>`;
    return;
  }
  tbody.innerHTML = contacts.map(c => `
    <tr style="${!c.read ? 'font-weight:500' : ''}">
      <td>
        <div style="font-size:0.85rem">${c.name}</div>
        <div style="font-size:0.7rem;color:var(--muted2)">${c.company||'—'}</div>
      </td>
      <td style="color:var(--muted);font-size:0.8rem">${c.email}</td>
      <td style="color:var(--muted)">${c.type||'—'}</td>
      <td style="font-family:var(--mono);font-size:0.68rem;color:var(--muted2)">${c.date}</td>
      <td><span class="pill ${c.read?'pill-read':'pill-new'}">${c.read?'อ่านแล้ว':'● ใหม่'}</span></td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn btn-ghost btn-sm" onclick="viewContact(${c.id})">ดู</button>
          <button class="btn btn-danger btn-sm" onclick="deleteContact(${c.id})">ลบ</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function viewContact(id) {
  let contacts = getContacts();
  const c = contacts.find(x => x.id === id);
  if (!c) return;
  contacts = contacts.map(x => x.id === id ? {...x, read:true} : x);
  saveContacts(contacts);
  refreshStats();
  renderContactsTable();
  renderDashRecents();
  document.getElementById('contactDetailContent').innerHTML = `
    <div class="contact-detail-meta">
      <div class="detail-item"><label>ชื่อ</label><div class="val">${c.name}</div></div>
      <div class="detail-item"><label>บริษัท</label><div class="val">${c.company||'—'}</div></div>
      <div class="detail-item"><label>Email</label><div class="val"><a href="mailto:${c.email}" style="color:var(--accent)">${c.email}</a></div></div>
      <div class="detail-item"><label>ประเภทงาน</label><div class="val">${c.type||'—'}</div></div>
      <div class="detail-item"><label>วันที่</label><div class="val" style="font-family:var(--mono);font-size:0.78rem">${c.date}</div></div>
    </div>
    <label style="font-family:var(--mono);font-size:0.58rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted2)">ข้อความ</label>
    <div class="message-box" style="margin-top:8px">${c.message.replace(/\n/g,'<br>')}</div>
    <div style="display:flex;gap:8px;margin-top:1.5rem">
      <a href="mailto:${c.email}" class="btn btn-primary">Reply via Email</a>
      <button class="btn btn-ghost" onclick="closeModal('contactModal')">ปิด</button>
    </div>
  `;
  openModal('contactModal');
}

function deleteContact(id) {
  if (!confirm('ลบข้อความนี้?')) return;
  saveContacts(getContacts().filter(c => c.id !== id));
  renderContactsTable();
  refreshStats();
  renderDashRecents();
  showToast('🗑 ลบข้อความแล้ว');
}

function markAllRead() {
  saveContacts(getContacts().map(c => ({...c, read:true})));
  renderContactsTable();
  refreshStats();
  renderDashRecents();
  showToast('✓ Mark all as read');
}

// ── ANALYTICS CHART ────────────────────────────────
function renderAnalyticsChart() {
  const chart = document.getElementById('barChart');
  if (!chart) return;
  const data = [
    {m:'ต.ค.',v:680},{m:'พ.ย.',v:820},{m:'ธ.ค.',v:1100},
    {m:'ม.ค.',v:940},{m:'ก.พ.',v:1050},{m:'มี.ค.',v:1248},
  ];
  const max = Math.max(...data.map(d=>d.v));
  chart.innerHTML = data.map(d => `
    <div class="bar-col">
      <span class="bar-val">${d.v.toLocaleString()}</span>
      <div class="bar-fill" style="height:${Math.round((d.v/max)*100)}%;background:${d.m==='มี.ค.'?'var(--accent)':'rgba(240,196,25,0.3)'};min-height:4px"></div>
      <span class="bar-lbl">${d.m}</span>
    </div>
  `).join('');
}

// ── MODALS ─────────────────────────────────────────
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

// ── UTILS ──────────────────────────────────────────
function getVal(id) { return document.getElementById(id)?.value.trim() || ''; }
function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val; }

function showToast(msg) {
  const t = document.getElementById('adminToast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

function doLogout() {
  document.getElementById('adminApp').style.display   = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  setVal('loginPass', '');
}
