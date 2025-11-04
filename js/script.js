/* ===============================
   ТЁМНАЯ ТЕМА (с запоминанием)
   =============================== */
const themeToggle = document.getElementById('themeToggle');

// 1) Применяем сохранённую тему при загрузке
(function applySavedTheme() {
  try {
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      if (themeToggle) themeToggle.checked = true;
    }
  } catch (e) { /* localStorage может быть недоступен — не критично */ }
})();

// 2) Переключаем и сохраняем
if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    const isDark = themeToggle.checked;
    document.documentElement.classList.toggle('dark', isDark);
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
  });
}

// 3) Горячая клавиша: Shift + D (или русская «В»)
document.addEventListener('keydown', (e) => {
  if (e.shiftKey && (e.key.toLowerCase() === 'd' || e.key.toLowerCase() === 'в')) {
    if (!themeToggle) return;
    themeToggle.checked = !themeToggle.checked;
    themeToggle.dispatchEvent(new Event('change'));
  }
});

/* ===============================
   «МАГИЧЕСКАЯ» КНОПКА (тост)
   =============================== */
const btn = document.getElementById('magicBtn');

(function initToast() {
  if (!document.getElementById('magic-note')) {
    const note = document.createElement('div');
    note.id = 'magic-note';
    note.textContent = '✨ Магия работает, Андрей!';
    note.style.cssText = `
      position: fixed; bottom: 48px; left: 50%; transform: translateX(-50%);
      background: var(--accent); color: #fff; padding: 12px 24px; border-radius: 12px;
      box-shadow: var(--shadow); font-size: 16px; opacity: 0; transition: opacity .3s ease;
      z-index: 9999; pointer-events: none;
    `;
    document.body.appendChild(note);
  }
})();

if (btn) {
  btn.addEventListener('click', () => {
    const note = document.getElementById('magic-note');
    if (!note) return;
    note.style.opacity = 1;
    setTimeout(() => (note.style.opacity = 0), 2000);
  });
}

console.log('Привет, GitHub! Тема/магия/цитата дня подключены ✌️');

/* ===============================
   ЦИТАТА ДНЯ (с анимацией)
   =============================== */
(() => {
  // защита от дублирования при авто-перезагрузках Live Server
  if (document.querySelector('.quote-of-day')) return;

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
    'Сохранение — это уважение к своему будущему.'
  ];

  // «детерминированная» цитата по дню года
  const dayOfYear = (() => {
    const d = new Date();
    const start = new Date(d.getFullYear(), 0, 0);
    return Math.floor((d - start) / (1000 * 60 * 60 * 24));
  })();
  const quote = QUOTES[dayOfYear % QUOTES.length];

  // ВАЖНО: добавляем класс .quote для CSS-анимации
  const box = document.createElement('section');
  box.className = 'quote-of-day quote';
  box.innerHTML = `
    <div class="q-wrap">
      <div class="q-badge">Цитата дня</div>
      <p class="q-text">“${quote}”</p>
    </div>
  `;

  // вставляем в начало .card, затем в <main>, иначе в <body>
  const target = document.querySelector('.card') || document.querySelector('main') || document.body;
  target.prepend(box);

  // одноразово подключаем мини-стили
  if (!document.getElementById('qod-style')) {
    const style = document.createElement('style');
    style.id = 'qod-style';
    style.textContent = `
      .quote-of-day { margin: 12px 0 20px; }
      .quote-of-day .q-wrap{
        position: relative; padding: 14px 16px; border-radius: 12px;
        border: 1px solid var(--border, #e5e7eb); background: var(--card, #fff);
        box-shadow: var(--shadow, 0 6px 28px rgba(2,6,23,.08));
      }
      .quote-of-day .q-badge{
        position: absolute; top: -10px; left: 12px; padding: 2px 8px; font-size: 12px;
        border-radius: 8px; background: var(--accent, #22c55e); color: #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,.15);
      }
      .quote-of-day .q-text{ margin: 6px 0 0; line-height: 1.45; font-size: 15px; color: var(--text, #1e293b); }
      @media (prefers-reduced-motion: no-preference){
        .quote-of-day .q-wrap{ animation: q-pop .35s ease; }
        @keyframes q-pop{ from{ transform: translateY(-4px); opacity:0; } to{ transform: none; opacity:1; } }
      }
      /* поддержка существующей анимации .quote.reveal из style.css */
      .quote{ opacity: 0; transform: translateY(8px); }
      .quote.reveal{ animation: quote-fade-in .6s ease-out forwards; }
      @keyframes quote-fade-in{ from{opacity:0; transform: translateY(8px);} to{opacity:1; transform:none;} }
    `;
    document.head.appendChild(style);
  }
})();

/* ===============================
   СЛУЧАЙНОЕ ПРИВЕТСТВИЕ
   =============================== */
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('greet');
  if (!el) return;

  const h = new Date().getHours();
  let part = 'Добро пожаловать';
  if (h >= 5 && h < 12) part = 'Доброе утро';
  else if (h >= 12 && h < 18) part = 'Добрый день';
  else if (h >= 18 && h < 23) part = 'Добрый вечер';
  else part = 'Ночная смена';

  const list = [
    `${part}, Андрей`,
    'Привет, Андрей',
    'С возвращением, Neo',
    'Готов к новому коммиту',
    'Поехали, капитан',
    'Время творить магию'
  ];

  el.textContent = list[Math.floor(Math.random() * list.length)];
});

/* ===============================
   ВКЛЮЧАЕМ РЕВИЛ ДЛЯ ЦИТАТЫ
   =============================== */
document.addEventListener('DOMContentLoaded', () => {
  const quote = document.querySelector('.quote');
  if (quote) requestAnimationFrame(() => quote.classList.add('reveal'));
});
