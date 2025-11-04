// ===== Тёмная тема с запоминанием =====
const themeToggle = document.getElementById('themeToggle');

// 1) Применяем сохранённую тему при загрузке
(function applySavedTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggle.checked = true;
  }
})();

// 2) Переключаем и сохраняем
themeToggle.addEventListener('change', () => {
  const isDark = themeToggle.checked;
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 3) Для удобства: горячая клавиша  Shift + D
document.addEventListener('keydown', (e) => {
  if (e.shiftKey && (e.key === 'd' || e.key === 'в')) {
    themeToggle.checked = !themeToggle.checked;
    themeToggle.dispatchEvent(new Event('change'));
  }
});

// ===== Магическая кнопка =====
const btn = document.getElementById('magicBtn');

const note = document.createElement('div');
note.textContent = '✨ Магия работает, Андрей!';
note.className = 'note';
// Немного стилей прямо здесь (без правки CSS)
note.style.cssText = `
  position: fixed;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  font-size: 16px;
  opacity: 0;
  transition: opacity .3s ease;
  z-index: 9999;
`;
document.body.appendChild(note);

btn.addEventListener('click', () => {
  note.style.opacity = 1;
  setTimeout(() => (note.style.opacity = 0), 2000);
});

// Для наглядности в DevTools
console.log('Привет, GitHub! Переключатель темы и магия готовы ✌️');

// =============== ЦИТАТА ДНЯ ===============
(() => {
  // 1) Набор коротких цитат (можешь редактировать/добавлять)
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

  // 2) Выберем «цитату дня» детерминированно (меняется раз в сутки)
  const todayKey = (() => {
    const d = new Date();
    // номер дня в году (0..365)
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  })();
  const quote = QUOTES[todayKey % QUOTES.length];

  // 3) Создаём узел цитаты
  const box = document.createElement('section');
  box.className = 'quote-of-day';
  box.innerHTML = `
    <div class="q-wrap">
      <div class="q-badge">Цитата дня</div>
      <p class="q-text">“${quote}”</p>
    </div>
  `;

  // 4) Вставляем в начало карточки с контентом (если есть), иначе — в <main>
  const target =
    document.querySelector('.card') ||
    document.querySelector('main') ||
    document.body;
  target?.prepend(box);

  // 5) Мини-стили добавим прямо отсюда, чтобы не править CSS
  const style = document.createElement('style');
  style.textContent = `
    .quote-of-day { margin: 12px 0 20px; }
    .quote-of-day .q-wrap{
      position: relative;
      padding: 14px 16px;
      border: 1px solid var(--border, #e5e7eb);
      background: var(--card, #fff);
      border-radius: 12px;
      box-shadow: var(--shadow, 0 6px 28px rgba(2,6,23,.08));
    }
    .quote-of-day .q-badge{
      position: absolute;
      top: -10px; left: 12px;
      padding: 2px 8px;
      font-size: 12px;
      border-radius: 8px;
      background: var(--accent, #22c55e);
      color: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,.15);
    }
    .quote-of-day .q-text{
      margin: 6px 0 0;
      line-height: 1.45;
      font-size: 15px;
      color: var(--text, #1e293b);
    }
    @media (prefers-reduced-motion: no-preference){
      .quote-of-day .q-wrap{ animation: q-pop .35s ease; }
      @keyframes q-pop{
        from{ transform: translateY(-4px); opacity: 0; }
        to  { transform: translateY(0);    opacity: 1; }
      }
    }
  `;
  document.head.appendChild(style);
})();

// Случайное приветствие в заголовке
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('greet');
  if (!el) return;

  // Определяем время суток
  const h = new Date().getHours();
  let part = 'Добро пожаловать';
  if (h >= 5 && h < 12) part = 'Доброе утро';
  else if (h >= 12 && h < 18) part = 'Добрый день';
  else if (h >= 18 && h < 23) part = 'Добрый вечер';
  else part = 'Ночная смена';

  // Варианты приветствий
  const list = [
    `${part}, Андрей`,
    'Привет, Андрей',
    'С возвращением, Neo',
    'Готов к новому коммиту',
    'Поехали, капитан',
    'Время творить магию'
  ];

  // Берём случайный
  const text = list[Math.floor(Math.random() * list.length)];

  // Ставим в заголовок (без эмодзи, эмодзи уже в разметке после span)
  el.textContent = text;
});
