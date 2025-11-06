// ===== ТЁМНАЯ ТЕМА (с запоминанием) =====
const themeToggle = document.getElementById('themeToggle');
(function applySavedTheme(){
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
    if (themeToggle) themeToggle.checked = true;
  }
})();
themeToggle?.addEventListener('change', () => {
  const isDark = themeToggle.checked;
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
document.addEventListener('keydown', (e) => {
  if (e.shiftKey && (e.key === 'd' || e.key === 'в')) {
    if (!themeToggle) return;
    themeToggle.checked = !themeToggle.checked;
    themeToggle.dispatchEvent(new Event('change'));
  }
});

// ===== МАГИЧЕСКАЯ КНОПКА =====
const btn = document.getElementById('magicBtn');
if (btn) {
  const note = document.createElement('div');
  note.textContent = '✨ Магия работает, Андрей!';
  note.className = 'note';
  note.style.cssText = `
    position: fixed; bottom: 48px; left: 50%; transform: translateX(-50%);
    background: var(--accent); color: white; padding: 12px 24px;
    border-radius: 12px; box-shadow: var(--shadow);
    font-size: 16px; opacity: 0; transition: opacity .3s ease; z-index: 9999;`;
  document.body.appendChild(note);
  btn.addEventListener('click', () => {
    note.style.opacity = 1;
    setTimeout(() => (note.style.opacity = 0), 2000);
  });
}

// ===== ЦИТАТА ДНЯ =====
(() => {
  const QUOTES = [
    'Код — это лестница. Поднимайся по одной ступеньке каждый день.',
    'Маленький коммит сегодня — большой проект завтра.',
    'Не бойся консоли: она не кусается, она помогает.',
    'Секрет стабильности — делать маленькие улучшения регулярно.',
    'Тёмная тема включена, сомнения — выключены.',
    'Ошибки — это подсказки, а не приговор.',
    'Главное — оставить проект лучше, чем он был 5 минут назад.',
    'Не нужно бежать марафон — достаточно идти без остановок.',
    'Если страшно пушить — пушь чаще 😉',
    'Сохранение — это уважение к своему будущему.',
    'Каждый коммит — шаг к новой версии себя. 💪',
      'Ошибки — это просто доказательство, что ты действуешь. ⚡',
  'Код не кусается, если его понимать. 🧠',
  'Сделай первый байт — и остальное подтянется. 🚀',
  'Не бойся чистить старый код — будущее любит порядок. 🧹',
  'Push сегодня — гордость завтра. 💾',

  ];
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((d - start) / (1000 * 60 * 60 * 24));
  const quote = QUOTES[dayOfYear % QUOTES.length];

  const box = document.createElement('section');
  box.className = 'quote-of-day';
  box.innerHTML = `
    <div class="q-wrap">
      <div class="q-badge">Цитата дня</div>
      <p class="q-text">“${quote}”</p>
    </div>`;
  (document.querySelector('.card') || document.querySelector('main') || document.body)
    .prepend(box);
})();

// ===== СЛУЧАЙНОЕ ПРИВЕТСТВИЕ + плавное проявление =====
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('greet');
  if (el) {
    const h = new Date().getHours();
    const part = (h>=5 && h<12) ? 'Доброе утро'
               : (h>=12 && h<18) ? 'Добрый день'
               : (h>=18 && h<23) ? 'Добрый вечер'
               : 'Ночная смена';
    const list = [
      `${part}, Андрей`, 'Привет, Андрей', 'С возвращением, Neo',
      'Готов к новому коммиту', 'Поехали, капитан', 'Время творить магию'
    ];
    el.textContent = list[Math.floor(Math.random() * list.length)];
    requestAnimationFrame(() => el.classList.add('show'));
  }
  const sub = document.querySelector('.sub');
  if (sub) setTimeout(() => sub.classList.add('show'), 140);

  const q = document.querySelector('.quote-of-day');
  if (q) requestAnimationFrame(() => q.classList.add('reveal'));
});

// ===== ЗАГРУЗКА: без «скачков» и с более поздней волной =====
window.addEventListener('load', () => {
  // Не восстанавливаем старую прокрутку (особенно актуально на мобилках)
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // Мягкое проявление всей страницы
  document.body.classList.add('fade-in', 'loaded');

  // Старт волны — позже и плавнее
  const wave = document.querySelector('.wave');
  setTimeout(() => wave?.classList.add('wave-start'), 1200);
});

console.log('Готово: замедленные анимации, стабильная загрузка, без дёрганий.');
