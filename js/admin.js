/* ═══════════════════════════════════
   ADMIN — admin.js
═══════════════════════════════════ */

// ── AUTH ──────────────────────────────────────────────
const CREDS = { user: 'admin', pass: 'admin1234' };

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
  const passInput = document.getElementById('loginPass');
  if (passInput) passInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
});

// ── DATA ──────────────────────────────────────────────
function getProjects() {
  const s = localStorage.getItem('portfolio_projects');
  return s ? JSON.parse(s) : getDefaultProjects();
}
function saveProjects(d) { localStorage.setItem('portfolio_projects', JSON.stringify(d)); }
function getContacts() { return JSON.parse(localStorage.getItem('portfolio_contacts') || '[]'); }
function saveContacts(d) { localStorage.setItem('portfolio_contacts', JSON.stringify(d)); }

function getDefaultProjects() {
  return [
    { id: 1, emoji: '🛒', bg: '#fef3c7', tags: ['React','Node.js','PostgreSQL'], year: '2024', title: 'E-Commerce Platform', desc: 'ระบบ e-commerce ครบจบในที่เดียว', link: '' },
    { id: 2, emoji: '📊', bg: '#e8f0fe', tags: ['Next.js','D3.js','API'],         year: '2024', title: 'Data Viz Dashboard',   desc: 'เปลี่ยน raw data ให้กลายเป็น interactive charts', link: '' },
    { id: 3, emoji: '🤖', bg: '#ecfdf5', tags: ['Python','FastAPI','React'],      year: '2023', title: 'AI Content Assistant', desc: 'Web app ช่วยทีม content ด้วย AI', link: '' },
  ];
}

// ── INIT ──────────────────────────────────────────────
function initAdmin() {
  refreshStats();
  renderDashRecents();
  renderProjectsTable();
  renderContactsTable();
  renderAnalyticsChart();
  showPage('dashboard');
}

// ── NAVIGATION ────────────────────────────────────────
const PAGE_LABELS = {
  dashboard: 'Dashboard',
  projects:  'จัดการผลงาน',
  contacts:  'ข้อความจากบริษัท',
  analytics: 'Analytics',
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

// ── STATS ─────────────────────────────────────────────
function refreshStats() {
  const projects = getProjects();
  const contacts = getContacts();
  const unread   = contacts.filter(c => !c.read).length;

  setText('st-projects', projects.length);
  setText('st-contacts', contacts.length);
  setText('st-unread',   unread);
  setText('st-contacts2',contacts.length);

  const badge = document.getElementById('unreadBadge');
  if (badge) {
    badge.style.display = unread > 0 ? 'inline-flex' : 'none';
    badge.textContent   = unread;
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── DASHBOARD RECENTS ─────────────────────────────────
function renderDashRecents() {
  const contacts = getContacts().slice(0, 5);
  const tbody    = document.getElementById('dashContactTable');
  if (!tbody) return;

  if (!contacts.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="tbl-empty">ยังไม่มีข้อความ</td></tr>`;
    return;
  }

  tbody.innerHTML = contacts.map(c => `
    <tr>
      <td><span style="font-weight:500">${c.name}</span></td>
      <td style="color:var(--ink-2)">${c.company || '—'}</td>
      <td style="color:var(--ink-2)">${c.type    || '—'}</td>
      <td style="color:var(--ink-3);font-family:var(--font-mono);font-size:0.72rem">${c.date}</td>
      <td><span class="pill ${c.read ? 'pill-read' : 'pill-new'}">${c.read ? 'อ่านแล้ว' : '● ใหม่'}</span></td>
    </tr>
  `).join('');
}

// ── PROJECTS ──────────────────────────────────────────
let editingProjectId = null;

function renderProjectsTable() {
  const projects = getProjects();
  const tbody    = document.getElementById('projectsTable');
  if (!tbody) return;

  if (!projects.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="tbl-empty">📂 ยังไม่มีผลงาน</td></tr>`;
    return;
  }

  tbody.innerHTML = projects.map(p => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:0.75rem">
          <div class="proj-thumb-sm" style="background:${p.bg || '#f0ede6'}">${p.emoji || '💻'}</div>
          <span style="font-weight:500">${p.title}</span>
        </div>
      </td>
      <td>${(p.tags||[]).map(t => `<span style="font-family:var(--font-mono);font-size:0.68rem;background:var(--surface);border:1px solid var(--border);padding:2px 7px;border-radius:100px;margin-right:4px">${t}</span>`).join('')}</td>
      <td style="color:var(--ink-3);font-family:var(--font-mono)">${p.year || '—'}</td>
      <td><span class="pill pill-live">● Live</span></td>
      <td>
        <div style="display:flex;gap:0.4rem">
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

  const fields = ['pm-title','pm-year','pm-emoji','pm-bg','pm-tags','pm-desc','pm-link'];
  fields.forEach(f => { const el = document.getElementById(f); if (el) el.value = ''; });

  if (id) {
    const p = getProjects().find(x => x.id === id);
    if (p) {
      setVal('pm-title', p.title || '');
      setVal('pm-year',  p.year  || '');
      setVal('pm-emoji', p.emoji || '');
      setVal('pm-bg',    p.bg    || '');
      setVal('pm-tags',  (p.tags || []).join(', '));
      setVal('pm-desc',  p.desc  || '');
      setVal('pm-link',  p.link  || '');
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
    bg:    getVal('pm-bg')    || '#f0ede6',
    tags:  getVal('pm-tags').split(',').map(t => t.trim()).filter(Boolean),
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

// ── CONTACTS ──────────────────────────────────────────
function renderContactsTable() {
  const contacts = getContacts();
  const tbody    = document.getElementById('contactsTable');
  if (!tbody) return;

  if (!contacts.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="tbl-empty">📭 ยังไม่มีข้อความ</td></tr>`;
    return;
  }

  tbody.innerHTML = contacts.map(c => `
    <tr style="${!c.read ? 'font-weight:500' : ''}">
      <td>
        <div style="font-size:0.85rem">${c.name}</div>
        <div style="font-size:0.72rem;color:var(--ink-3)">${c.company || '—'}</div>
      </td>
      <td style="color:var(--ink-2);font-size:0.8rem">${c.email}</td>
      <td style="color:var(--ink-2)">${c.type || '—'}</td>
      <td style="color:var(--ink-3);font-family:var(--font-mono);font-size:0.72rem">${c.date}</td>
      <td><span class="pill ${c.read ? 'pill-read' : 'pill-new'}">${c.read ? 'อ่านแล้ว' : '● ใหม่'}</span></td>
      <td>
        <div style="display:flex;gap:0.4rem">
          <button class="btn btn-ghost btn-sm" onclick="viewContact(${c.id})">ดูรายละเอียด</button>
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

  contacts = contacts.map(x => x.id === id ? { ...x, read: true } : x);
  saveContacts(contacts);
  refreshStats();
  renderContactsTable();
  renderDashRecents();

  document.getElementById('contactDetailContent').innerHTML = `
    <div class="contact-detail-meta">
      <div class="detail-item"><label>ชื่อ</label><div class="val">${c.name}</div></div>
      <div class="detail-item"><label>บริษัท</label><div class="val">${c.company || '—'}</div></div>
      <div class="detail-item"><label>Email</label><div class="val"><a href="mailto:${c.email}" style="color:var(--accent)">${c.email}</a></div></div>
      <div class="detail-item"><label>ประเภทงาน</label><div class="val">${c.type || '—'}</div></div>
      <div class="detail-item"><label>วันที่</label><div class="val" style="font-family:var(--font-mono);font-size:0.8rem">${c.date}</div></div>
    </div>
    <label style="font-size:0.68rem;font-weight:600;color:var(--ink-3);text-transform:uppercase;letter-spacing:0.07em">ข้อความ</label>
    <div class="message-box" style="margin-top:0.5rem">${c.message.replace(/\n/g,'<br>')}</div>
    <div style="display:flex;gap:0.6rem;margin-top:1.5rem">
      <a href="mailto:${c.email}" class="btn btn-primary">ตอบกลับทาง Email</a>
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
  saveContacts(getContacts().map(c => ({ ...c, read: true })));
  renderContactsTable();
  refreshStats();
  renderDashRecents();
  showToast('✓ Mark all as read');
}

// ── ANALYTICS CHART ───────────────────────────────────
function renderAnalyticsChart() {
  const chart = document.getElementById('barChart');
  if (!chart) return;

  const data = [
    { m: 'ต.ค.', v: 680 }, { m: 'พ.ย.', v: 820 },
    { m: 'ธ.ค.', v: 1100 }, { m: 'ม.ค.', v: 940 },
    { m: 'ก.พ.', v: 1050 }, { m: 'มี.ค.', v: 1248 },
  ];
  const max = Math.max(...data.map(d => d.v));

  chart.innerHTML = data.map(d => `
    <div class="bar-col">
      <span class="bar-val">${d.v.toLocaleString()}</span>
      <div class="bar-fill" style="height:${Math.round((d.v/max)*100)}%;background:${d.m==='มี.ค.'?'var(--accent)':'var(--accent-lt)'};min-height:4px"></div>
      <span class="bar-lbl">${d.m}</span>
    </div>
  `).join('');
}

// ── MODAL HELPERS ─────────────────────────────────────
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ── UTILS ─────────────────────────────────────────────
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
