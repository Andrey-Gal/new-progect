// ===== ТЁМНАЯ ТЕМА (с запоминанием) =====
const themeToggle = document.getElementById('themeToggle');
(function applySavedTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggle.checked = true;
  }
})();
themeToggle.addEventListener('change', () => {
  const isDark = themeToggle.checked;
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
document.addEventListener('keydown', (e) => {
  if (e.shiftKey && (e.key === 'd' || e.key === 'в')) {
    themeToggle.checked = !themeToggle.checked;
    themeToggle.dispatchEvent(new Event('change'));
  }
});

// ===== МАГИЧЕСКАЯ КНОПКА =====
const btn = document.getElementById('magicBtn');
const note = document.createElement('div');
note.textContent = '✨ Магия работает, Андрей!';
note.className = 'note';
note.style.cssText = `
  position: fixed; bottom: 48px; left: 50%; transform: translateX(-50%);
  background: var(--accent); color: white; padding: 12px 24px;
  border-radius: 12px; box-shadow: var(--shadow);
  font-size: 16px; opacity: 0; transition: opacity .3s ease; z-index: 9999;
`;
document.body.appendChild(note);
btn.addEventListener('click', () => {
  note.style.opacity = 1;
  setTimeout(() => (note.style.opacity = 0), 2000);
});

// ===== ЦИТАТА ДНЯ =====
(() => {
  const QUOTES = [
    "Код — это лестница. Поднимайся по одной ступеньке каждый день.",
    "Маленький коммит сегодня — большой проект завтра.",
    "Не бойся консоли: она не кусается, она помогает.",
    "Секрет стабильности — делать маленькие улучшения регулярно.",
    "Тёмная тема включена, сомнения — выключены.",
    "Ошибки — это подсказки, а не приговор.",
    "Главное — оставить проект лучше, чем он был 5 минут назад.",
    "Не нужно бежать марафон — достаточно идти без остановок.",
    "Если страшно пушить — пушь чаще 😉",
    "Сохранение — это уважение к своему будущему."
  ];
  const todayKey = (() => {
    const d = new Date();
    const start = new Date(d.getFullYear(), 0, 0);
    return Math.floor((d - start) / (1000 * 60 * 60 * 24));
  })();
  const quote = QUOTES[todayKey % QUOTES.length];
  const box = document.createElement('section');
  box.className = 'quote-of-day';
  box.innerHTML = `
    <div class="q-wrap">
      <div class="q-badge">Цитата дня</div>
      <p class="q-text">“${quote}”</p>
    </div>
  `;
  const target =
    document.querySelector('.card') || document.querySelector('main') || document.body;
  target.prepend(box);
})();

// ===== СЛУЧАЙНОЕ ПРИВЕТСТВИЕ =====
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

// ===== ПЛАВНОЕ ПОЯВЛЕНИЕ ЦИТАТЫ =====
document.addEventListener('DOMContentLoaded', () => {
  const quote = document.querySelector('.quote-of-day');
  if (quote) requestAnimationFrame(() => quote.classList.add('reveal'));
});

// Плавное появление приветствия и подзаголовка
document.addEventListener('DOMContentLoaded', () => {
  const greet = document.getElementById('greet');
  const sub   = document.querySelector('.sub');

  if (greet) requestAnimationFrame(() => greet.classList.add('show'));
  if (sub)   setTimeout(() => sub.classList.add('show'), 120);
});

