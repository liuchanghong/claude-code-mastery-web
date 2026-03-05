/* ============================================================
   Claude Code for Coders — App
   ============================================================ */

const SITE_NAME = 'Claude Code for Coders';
const SITE_URL  = 'https://liuchanghong.github.io/claude-code-mastery-web/';

const CHAPTERS = [
  {
    id: '00',
    en:  { file: 'content/en/00-preface_en.md',              title: 'Preface: Shattering Your AI Illusions' },
    zht: { file: 'content/zh-TW/00-preface_zht.md',          title: '前言：打破你對 AI 助理的幻想' },
    zh:  { file: 'content/zh/00-preface.md',                 title: '序言：打破你对 AI 助手的幻想' },
  },
  {
    id: '01',
    en:  { file: 'content/en/01-mental-model_en.md',         title: 'The Mental Model You Need' },
    zht: { file: 'content/zh-TW/01-mental-model_zht.md',     title: '你需要的核心思維模型' },
    zh:  { file: 'content/zh/01-mental-model.md',            title: '核心心智模型' },
  },
  {
    id: '02',
    en:  { file: 'content/en/02-setup-and-first-steps_en.md',title: 'Setup & First Steps' },
    zht: { file: 'content/zh-TW/02-setup-and-first-steps_zht.md', title: '安裝與起步' },
    zh:  { file: 'content/zh/02-setup-and-first-steps.md',   title: '安装与第一步' },
  },
  {
    id: '03',
    en:  { file: 'content/en/03-art-of-instructions_en.md',  title: 'The Art of Instructions' },
    zht: { file: 'content/zh-TW/03-art-of-instructions_zht.md', title: '下指令的藝術' },
    zh:  { file: 'content/zh/03-art-of-instructions.md',     title: '指令的艺术' },
  },
  {
    id: '04',
    en:  { file: 'content/en/04-file-and-code-operations_en.md', title: 'Code Operations Mastery' },
    zht: { file: 'content/zh-TW/04-file-and-code-operations_zht.md', title: '程式碼操作精通' },
    zh:  { file: 'content/zh/04-file-and-code-operations.md',title: '代码操作精通' },
  },
  {
    id: '05',
    en:  { file: 'content/en/05-git-workflow_en.md',         title: 'Git Workflow Integration' },
    zht: { file: 'content/zh-TW/05-git-workflow_zht.md',     title: 'Git 工作流整合' },
    zh:  { file: 'content/zh/05-git-workflow.md',            title: 'Git 工作流集成' },
  },
  {
    id: '06',
    en:  { file: 'content/en/06-debugging_en.md',            title: 'The Art of Debugging' },
    zht: { file: 'content/zh-TW/06-debugging_zht.md',        title: '除錯的藝術' },
    zh:  { file: 'content/zh/06-debugging.md',               title: '调试的艺术' },
  },
  {
    id: '07',
    en:  { file: 'content/en/07-claude-md-mastery_en.md',    title: 'The CLAUDE.md Secret' },
    zht: { file: 'content/zh-TW/07-claude-md-mastery_zht.md',title: 'CLAUDE.md 的秘密' },
    zh:  { file: 'content/zh/07-claude-md-mastery.md',       title: 'CLAUDE.md 的秘密' },
  },
  {
    id: '08',
    en:  { file: 'content/en/08-building-real-projects_en.md',title: 'Building Real Projects' },
    zht: { file: 'content/zh-TW/08-building-real-projects_zht.md', title: '打造真實專案' },
    zh:  { file: 'content/zh/08-building-real-projects.md',  title: '构建真实项目' },
  },
  {
    id: '09',
    en:  { file: 'content/en/09-ios-and-swift_en.md',        title: 'iOS & Swift Deep Dive' },
    zht: { file: 'content/zh-TW/09-ios-and-swift_zht.md',    title: 'iOS & Swift 深度指南' },
    zh:  { file: 'content/zh/09-ios-and-swift.md',           title: 'iOS & Swift 专项' },
  },
  {
    id: '10',
    en:  { file: 'content/en/10-advanced-techniques_en.md',  title: 'Advanced Techniques: Join the 1%' },
    zht: { file: 'content/zh-TW/10-advanced-techniques_zht.md', title: '進階技巧：進入前 1%' },
    zh:  { file: 'content/zh/10-advanced-techniques.md',     title: '高级技巧：成为 1%' },
  },
  {
    id: '11',
    en:  { file: 'content/en/11-workflows-and-automation_en.md', title: 'Workflows & Automation' },
    zht: { file: 'content/zh-TW/11-workflows-and-automation_zht.md', title: '工作流與自動化' },
    zh:  { file: 'content/zh/11-workflows-and-automation.md',title: '工作流与自动化' },
  },
  {
    id: '12',
    en:  { file: 'content/en/12-mistakes-and-fixes_en.md',   title: 'Common Mistakes & Fixes' },
    zht: { file: 'content/zh-TW/12-mistakes-and-fixes_zht.md', title: '常見錯誤與解法' },
    zh:  { file: 'content/zh/12-mistakes-and-fixes.md',      title: '最常见的错误与解法' },
  },
  {
    id: '13',
    en:  { file: 'content/en/13-expert-mindset_en.md',       title: 'The Expert Mindset' },
    zht: { file: 'content/zh-TW/13-expert-mindset_zht.md',   title: '高手心態' },
    zh:  { file: 'content/zh/13-expert-mindset.md',          title: '专家心智' },
  },
  {
    id: 'ap',
    en:  { file: 'content/en/APPENDIX_en.md',                title: 'Quick Reference' },
    zht: { file: 'content/zh-TW/APPENDIX_zht.md',            title: '快速參考手冊' },
    zh:  { file: 'content/zh/APPENDIX.md',                   title: '快速参考手册' },
  },
];

/* ============================================================
   State
   ============================================================ */
let currentLang = localStorage.getItem('cc-lang') || 'en';
let currentTheme = localStorage.getItem('cc-theme') || 'light';
let currentChapterIdx = 0;
const cache = {};

/* ============================================================
   DOM refs
   ============================================================ */
const $ = id => document.getElementById(id);
const body         = document.body;
const sidebar      = $('sidebar');
const overlay      = $('overlay');
const chapterList  = $('chapterList');
const content      = $('content');
const pager        = $('pager');
const progressFill = $('progressFill');
const topbarTitle  = $('topbarTitle');
const menuBtn      = $('menuBtn');
const closeSidebar = $('closeSidebar');
const themeBtn     = $('themeBtn');
const themeBtnTop  = $('themeBtnTop');

/* ============================================================
   Init
   ============================================================ */
function init() {
  applyTheme(currentTheme, false);
  applyLang(currentLang, false);
  buildChapterList();
  setupEventListeners();
  setupScrollProgress();
  setupMarked();
  routeFromHash();
  window.addEventListener('hashchange', routeFromHash);
}

/* ============================================================
   marked.js config
   ============================================================ */
function setupMarked() {
  marked.setOptions({
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
    breaks: true,
    gfm: true,
  });
}

/* ============================================================
   Routing
   ============================================================ */
function routeFromHash() {
  const hash = window.location.hash.replace('#', '');
  const idx = hash ? CHAPTERS.findIndex(c => c.id === hash) : 0;
  loadChapter(idx < 0 ? 0 : idx);
}

function navigateTo(idx) {
  if (idx < 0 || idx >= CHAPTERS.length) return;
  window.location.hash = CHAPTERS[idx].id;
  closeMobileSidebar();
}

/* ============================================================
   Load chapter
   ============================================================ */
async function loadChapter(idx) {
  currentChapterIdx = idx;
  const chapter = CHAPTERS[idx];
  const langData = chapter[currentLang];
  const filePath = langData.file;

  updateSidebarActive(idx);
  updateTopbar(langData.title);
  updatePager(idx);

  content.innerHTML = '<div class="loading-state"><div class="spinner"></div></div>';
  content.style.animation = 'none';

  try {
    let md = cache[filePath];
    if (!md) {
      const res = await fetch(filePath);
      if (!res.ok) throw new Error(`${res.status} ${filePath}`);
      md = await res.text();
      cache[filePath] = md;
    }

    const processed = md.replace(/\[([^\]]+)\]\(\.\/([^)]+\.md[^)]*)\)/g, (match, text, href) => {
      const linkedId = resolveChapterIdFromHref(href);
      if (linkedId !== null) return `[${text}](#${linkedId})`;
      return match;
    });

    const html = marked.parse(processed);

    void content.offsetWidth;
    content.style.animation = '';
    content.innerHTML = html;

    content.querySelectorAll('pre code').forEach(el => {
      if (!el.classList.contains('hljs')) hljs.highlightElement(el);
    });

    content.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href').replace('#', '');
        const target = CHAPTERS.findIndex(c => c.id === id);
        if (target >= 0) { e.preventDefault(); navigateTo(target); }
      });
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    content.innerHTML = `
      <div style="text-align:center;padding:80px 20px;color:var(--text-muted)">
        <div style="font-size:2rem;margin-bottom:16px">⚠️</div>
        <p>Failed to load chapter. Serve over HTTP to read locally.</p>
        <code style="font-size:0.8rem">${err.message}</code>
      </div>`;
  }
}

function resolveChapterIdFromHref(href) {
  const clean = href.replace(/^\.\//, '').replace(/_zht\.md.*$/, '').replace(/_en\.md.*$/, '').replace(/\.md.*$/, '');
  const idx = CHAPTERS.findIndex(c =>
    Object.values(c).some(v => v && v.file && v.file.includes(clean))
  );
  return idx >= 0 ? CHAPTERS[idx].id : null;
}

/* ============================================================
   Sidebar chapter list
   ============================================================ */
function buildChapterList() {
  chapterList.innerHTML = '';

  const label = document.createElement('div');
  label.className = 'ch-group-label';
  label.textContent = currentLang === 'en' ? 'Chapters' : currentLang === 'zht' ? '章節' : '章节';
  chapterList.appendChild(label);

  CHAPTERS.forEach((ch, idx) => {
    const item = document.createElement('div');
    item.className = 'ch-item';
    item.dataset.idx = idx;

    const num = document.createElement('span');
    num.className = 'ch-num';
    num.textContent = ch.id === 'ap' ? 'AP' : ch.id;

    const title = document.createElement('span');
    title.className = 'ch-title';
    title.textContent = ch[currentLang].title;

    item.appendChild(num);
    item.appendChild(title);
    item.addEventListener('click', () => navigateTo(idx));
    chapterList.appendChild(item);
  });

  updateSidebarActive(currentChapterIdx);
}

function updateSidebarActive(idx) {
  chapterList.querySelectorAll('.ch-item').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
  const activeEl = chapterList.querySelector('.ch-item.active');
  if (activeEl) activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/* ============================================================
   Topbar + pager
   ============================================================ */
function updateTopbar(title) {
  topbarTitle.textContent = title;
  document.title = `${title} — ${SITE_NAME}`;

  const chap = CHAPTERS[currentChapterIdx];
  const descs = {
    en:  `${chap.en.title} — Part of "${SITE_NAME}", the practical Claude Code handbook for developers.`,
    zht: `${chap.zht.title} — 《${SITE_NAME}》的一部分：給真正在寫 Code 的開發者。`,
    zh:  `${chap.zh.title} — 《${SITE_NAME}》的一部分：写给真正在写代码的开发者。`,
  };
  const desc = descs[currentLang];

  setMeta('name',     'description',    desc);
  setMeta('property', 'og:title',       document.title);
  setMeta('property', 'og:description', desc);
  setMeta('property', 'og:url',         `${SITE_URL}#${chap.id}`);

  const langMap = { en: 'en', zht: 'zh-Hant', zh: 'zh-Hans' };
  document.documentElement.lang = langMap[currentLang];
}

function setMeta(attr, key, value) {
  const el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.setAttribute('content', value);
}

function updatePager(idx) {
  pager.innerHTML = '';
  const labels = {
    prev: { en: 'Previous', zht: '上一章', zh: '上一章' },
    next: { en: 'Next',     zht: '下一章', zh: '下一章' },
  };

  if (idx > 0) {
    const prev = CHAPTERS[idx - 1];
    const btn = document.createElement('button');
    btn.className = 'pager-btn prev';
    btn.innerHTML = `<span class="pager-label">← ${labels.prev[currentLang]}</span><span class="pager-title">${prev[currentLang].title}</span>`;
    btn.addEventListener('click', () => navigateTo(idx - 1));
    pager.appendChild(btn);
  } else {
    pager.appendChild(document.createElement('div'));
  }

  if (idx < CHAPTERS.length - 1) {
    const next = CHAPTERS[idx + 1];
    const btn = document.createElement('button');
    btn.className = 'pager-btn next';
    btn.innerHTML = `<span class="pager-label">${labels.next[currentLang]} →</span><span class="pager-title">${next[currentLang].title}</span>`;
    btn.addEventListener('click', () => navigateTo(idx + 1));
    pager.appendChild(btn);
  }
}

/* ============================================================
   Language
   ============================================================ */
function applyLang(lang, reload = true) {
  currentLang = lang;
  localStorage.setItem('cc-lang', lang);
  body.dataset.lang = lang;

  // Update brand subtitle
  document.querySelectorAll('[data-en][data-zht][data-zh]').forEach(el => {
    el.textContent = el.dataset[lang];
  });

  // Sync lang tab active state in sidebar + topbar
  document.querySelectorAll('.lang-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  if (reload) {
    buildChapterList();
    loadChapter(currentChapterIdx);
  }
}

/* ============================================================
   Theme
   ============================================================ */
function applyTheme(theme, save = true) {
  currentTheme = theme;
  body.dataset.theme = theme;
  if (save) localStorage.setItem('cc-theme', theme);
}

function toggleTheme() {
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
}

/* ============================================================
   Mobile sidebar
   ============================================================ */
function openMobileSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

/* ============================================================
   Reading progress
   ============================================================ */
function setupScrollProgress() {
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const pct = doc.scrollHeight - doc.clientHeight > 0
      ? (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100
      : 0;
    progressFill.style.width = pct + '%';
  });
}

/* ============================================================
   Event listeners
   ============================================================ */
function setupEventListeners() {
  menuBtn.addEventListener('click', openMobileSidebar);
  closeSidebar.addEventListener('click', closeMobileSidebar);
  overlay.addEventListener('click', closeMobileSidebar);

  // Language tabs (sidebar + topbar)
  document.querySelectorAll('.lang-tab').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  // Theme buttons
  themeBtn.addEventListener('click', toggleTheme);
  themeBtnTop.addEventListener('click', toggleTheme);

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') navigateTo(currentChapterIdx + 1);
    if (e.key === 'ArrowLeft')  navigateTo(currentChapterIdx - 1);
  });
}

/* ============================================================
   Start
   ============================================================ */
init();
