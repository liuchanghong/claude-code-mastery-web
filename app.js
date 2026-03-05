/* ============================================================
   Claude Code Mastery — App
   ============================================================ */

const CHAPTERS = [
  {
    id: '00',
    zh: { file: 'content/zh/00-preface.md',                 title: '序言：打破你对 AI 助手的幻想' },
    en: { file: 'content/en/00-preface_en.md',              title: 'Preface: Shattering Your AI Illusions' },
  },
  {
    id: '01',
    zh: { file: 'content/zh/01-mental-model.md',            title: '核心心智模型' },
    en: { file: 'content/en/01-mental-model_en.md',         title: 'The Mental Model You Need' },
  },
  {
    id: '02',
    zh: { file: 'content/zh/02-setup-and-first-steps.md',   title: '安装与第一步' },
    en: { file: 'content/en/02-setup-and-first-steps_en.md',title: 'Setup & First Steps' },
  },
  {
    id: '03',
    zh: { file: 'content/zh/03-art-of-instructions.md',     title: '指令的艺术' },
    en: { file: 'content/en/03-art-of-instructions_en.md',  title: 'The Art of Instructions' },
  },
  {
    id: '04',
    zh: { file: 'content/zh/04-file-and-code-operations.md',title: '代码操作精通' },
    en: { file: 'content/en/04-file-and-code-operations_en.md', title: 'Code Operations Mastery' },
  },
  {
    id: '05',
    zh: { file: 'content/zh/05-git-workflow.md',            title: 'Git 工作流集成' },
    en: { file: 'content/en/05-git-workflow_en.md',         title: 'Git Workflow Integration' },
  },
  {
    id: '06',
    zh: { file: 'content/zh/06-debugging.md',               title: '调试的艺术' },
    en: { file: 'content/en/06-debugging_en.md',            title: 'The Art of Debugging' },
  },
  {
    id: '07',
    zh: { file: 'content/zh/07-claude-md-mastery.md',       title: 'CLAUDE.md 的秘密' },
    en: { file: 'content/en/07-claude-md-mastery_en.md',    title: 'The CLAUDE.md Secret' },
  },
  {
    id: '08',
    zh: { file: 'content/zh/08-building-real-projects.md',  title: '构建真实项目' },
    en: { file: 'content/en/08-building-real-projects_en.md',title: 'Building Real Projects' },
  },
  {
    id: '09',
    zh: { file: 'content/zh/09-ios-and-swift.md',           title: 'iOS & Swift 专项' },
    en: { file: 'content/en/09-ios-and-swift_en.md',        title: 'iOS & Swift Deep Dive' },
  },
  {
    id: '10',
    zh: { file: 'content/zh/10-advanced-techniques.md',     title: '高级技巧：成为 1%' },
    en: { file: 'content/en/10-advanced-techniques_en.md',  title: 'Advanced Techniques: Join the 1%' },
  },
  {
    id: '11',
    zh: { file: 'content/zh/11-workflows-and-automation.md',title: '工作流与自动化' },
    en: { file: 'content/en/11-workflows-and-automation_en.md', title: 'Workflows & Automation' },
  },
  {
    id: '12',
    zh: { file: 'content/zh/12-mistakes-and-fixes.md',      title: '最常见的错误与解法' },
    en: { file: 'content/en/12-mistakes-and-fixes_en.md',   title: 'Common Mistakes & Fixes' },
  },
  {
    id: '13',
    zh: { file: 'content/zh/13-expert-mindset.md',          title: '专家心智' },
    en: { file: 'content/en/13-expert-mindset_en.md',       title: 'The Expert Mindset' },
  },
  {
    id: 'ap',
    zh: { file: 'content/zh/APPENDIX.md',                   title: '快速参考手册' },
    en: { file: 'content/en/APPENDIX_en.md',                title: 'Quick Reference' },
  },
];

/* ============================================================
   State
   ============================================================ */
let currentLang = localStorage.getItem('cc-lang') || 'zh';
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
const langBtn      = $('langBtn');
const langBtnTop   = $('langBtnTop');
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
  // close mobile sidebar
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

  // show loading
  content.innerHTML = '<div class="loading-state"><div class="spinner"></div></div>';
  content.style.animation = 'none';

  try {
    let md = cache[filePath];
    if (!md) {
      const res = await fetch(filePath);
      if (!res.ok) throw new Error(`Failed to load: ${filePath}`);
      md = await res.text();
      cache[filePath] = md;
    }

    // Intercept internal .md links → hash navigation
    const processed = md.replace(/\[([^\]]+)\]\(\.\/([^)]+\.md[^)]*)\)/g, (match, text, href) => {
      const linkedId = resolveChapterIdFromHref(href);
      if (linkedId !== null) return `[${text}](#${linkedId})`;
      return match;
    });

    const html = marked.parse(processed);

    // force re-animation
    void content.offsetWidth;
    content.style.animation = '';
    content.innerHTML = html;

    // highlight any code blocks not caught by marked
    content.querySelectorAll('pre code').forEach(el => {
      if (!el.classList.contains('hljs')) hljs.highlightElement(el);
    });

    // intercept link clicks for hash navigation
    content.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href').replace('#', '');
        const idx = CHAPTERS.findIndex(c => c.id === id);
        if (idx >= 0) { e.preventDefault(); navigateTo(idx); }
      });
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    content.innerHTML = `
      <div style="text-align:center;padding:80px 20px;color:var(--text-muted)">
        <div style="font-size:2rem;margin-bottom:16px">⚠️</div>
        <p>Failed to load chapter. Make sure you're serving this over HTTP.</p>
        <code style="font-size:0.8rem">${err.message}</code>
      </div>`;
  }
}

function resolveChapterIdFromHref(href) {
  // strip ./ and _en.md or .md
  const clean = href.replace(/^\.\//, '').replace(/_en\.md.*$/, '').replace(/\.md.*$/, '');
  const idx = CHAPTERS.findIndex(c =>
    c.zh.file.includes(clean) || c.en.file.includes(clean)
  );
  return idx >= 0 ? CHAPTERS[idx].id : null;
}

/* ============================================================
   Build sidebar chapter list
   ============================================================ */
function buildChapterList() {
  chapterList.innerHTML = '';

  const mainLabel = document.createElement('div');
  mainLabel.className = 'ch-group-label';
  mainLabel.textContent = currentLang === 'zh' ? '章节' : 'Chapters';
  chapterList.appendChild(mainLabel);

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
  // scroll active item into view in sidebar
  const activeEl = chapterList.querySelector('.ch-item.active');
  if (activeEl) {
    activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

/* ============================================================
   Topbar + pager
   ============================================================ */
function updateTopbar(title) {
  topbarTitle.textContent = title;
  document.title = `${title} — Claude Code Mastery`;
}

function updatePager(idx) {
  pager.innerHTML = '';

  if (idx > 0) {
    const prev = CHAPTERS[idx - 1];
    const btn = document.createElement('button');
    btn.className = 'pager-btn prev';
    btn.innerHTML = `
      <span class="pager-label">← ${currentLang === 'zh' ? '上一章' : 'Previous'}</span>
      <span class="pager-title">${prev[currentLang].title}</span>`;
    btn.addEventListener('click', () => navigateTo(idx - 1));
    pager.appendChild(btn);
  } else {
    pager.appendChild(document.createElement('div')); // spacer
  }

  if (idx < CHAPTERS.length - 1) {
    const next = CHAPTERS[idx + 1];
    const btn = document.createElement('button');
    btn.className = 'pager-btn next';
    btn.innerHTML = `
      <span class="pager-label">${currentLang === 'zh' ? '下一章' : 'Next'} →</span>
      <span class="pager-title">${next[currentLang].title}</span>`;
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
  // update brand sub
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  if (reload) {
    cache[CHAPTERS[currentChapterIdx][lang].file]; // warm cache
    buildChapterList();
    loadChapter(currentChapterIdx);
  }
}

function toggleLang() {
  applyLang(currentLang === 'zh' ? 'en' : 'zh');
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
   Reading progress bar
   ============================================================ */
function setupScrollProgress() {
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop;
    const total = doc.scrollHeight - doc.clientHeight;
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
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

  langBtn.addEventListener('click', toggleLang);
  langBtnTop.addEventListener('click', toggleLang);
  themeBtn.addEventListener('click', toggleTheme);
  themeBtnTop.addEventListener('click', toggleTheme);

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' || e.key === 'l') navigateTo(currentChapterIdx + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'h') navigateTo(currentChapterIdx - 1);
  });
}

/* ============================================================
   Start
   ============================================================ */
init();
