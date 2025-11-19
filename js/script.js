// ===== ТЁМНАЯ ТЕМА (с запоминанием) =====
const themeToggle = document.getElementById('themeToggle');

(function applySavedTheme() {
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

// Горячая клавиша Shift + D / В для переключения темы
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
    'Горячий кофе и холодная голова — лучший фреймворк. ☕',
    'Баг — это просто фича, которой не хватило внимания. 🐞',
    'Каждый reload — шанс начать с чистого экрана. 🔄',
    'Не ждёшь вдохновения — коммитишь настроение. 🎨',
    'Главное — не идеальный код, а живой проект. 💻',
    'Не бойся консоли, бойся пустого репозитория. 🧱',
    'Если проект не ломается — значит, ты ничего не меняешь. 🔧',
    'Сначала будет хаос — потом структура. 🔥',
    'Рефакторинг — это спа-процедура для кода. 🧴',
    'Git push — как отпустить ребёнка в большой мир. 🌍',
    'Клавиатура — это меч, а монитор — арена. ⚔️',
    'Код без души — просто текст. Вдохни смысл. 💫',
    'Пусть твой commit-message звучит как стих. ✍️',
    'Вчера ты боялся, сегодня дебажишь. 🔍',
    'Когда всё ломается — ты учишься строить. 🧱',
    'Лучше один честный push, чем сто «потом сделаю». ⏰',
    'IDE не спасёт, если мозг не в проекте. 🧠',
    'Каждая точка с запятой — след твоего опыта. ;',
    'Когда свет монитора освещает ночь — значит, ты на верном пути. 🌙',
    'Главное — не закончить, а не сдаться. 🛠️',
  ];

  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((d - start) / (1000 * 60 * 60 * 24));
  const quote = QUOTES[dayOfYear % QUOTES.length];

  const box = document.createElement('section');
  box.className = 'quote-of-day scroll-reveal';
  box.innerHTML = `
    <div class="q-wrap">
      <div class="q-badge">Цитата дня</div>
      <p class="q-text">“${quote}”</p>
    </div>`;

  (document.querySelector('.card') || document.querySelector('main') || document.body)
    .prepend(box);
})();

// ===== СЛУЧАЙНОЕ ПРИВЕТСТВИЕ + scroll-reveal =====
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('greet');
  if (el) {
    const h = new Date().getHours();
    const part =
      h >= 5 && h < 12 ? 'Доброе утро' :
      h >= 12 && h < 18 ? 'Добрый день' :
      h >= 18 && h < 23 ? 'Добрый вечер' :
      'Ночная смена';

    const list = [
      `${part}, Андрей`,
      'Привет, Андрей',
      'С возвращением, Neo',
      'Готов к новому коммиту',
      'Поехали, капитан',
      'Время творить магию',
    ];

    el.textContent = list[Math.floor(Math.random() * list.length)];
    requestAnimationFrame(() => el.classList.add('show'));
  }

  const sub = document.querySelector('.sub');
  if (sub) setTimeout(() => sub.classList.add('show'), 140);

  const q = document.querySelector('.quote-of-day');
  if (q) requestAnimationFrame(() => q.classList.add('reveal'));

  // === Scroll-reveal для секций ===
  const revealEls = document.querySelectorAll('.scroll-reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18 }
      );

      revealEls.forEach((el) => io.observe(el));
    } else {
      // fallback: если браузер старый — сразу показываем блоки
      revealEls.forEach((el) => el.classList.add('visible'));
    }
  }
});

// ===== ЗАГРУЗКА: без «скачков» и с более поздней волной =====
window.addEventListener('load', () => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  document.body.classList.add('fade-in', 'loaded');

  const wave = document.querySelector('.wave');
  setTimeout(() => wave?.classList.add('wave-start'), 1200);
});

console.log('Готово: замедленные анимации, стабильная загрузка, без дёрганий.');

/* ===== Кнопка "Наверх" ===== */
(function () {
  const btn = document.getElementById('toTop');
  if (!btn) return;

  const throttle = (fn, ms = 120) => {
    let t = 0;
    return (...args) => {
      const now = Date.now();
      if (now - t >= ms) {
        t = now;
        fn(...args);
      }
    };
  };

  const toggle = () => {
    if (window.scrollY > 500) btn.classList.add('show');
    else btn.classList.remove('show');
  };

  window.addEventListener('scroll', throttle(toggle));
  window.addEventListener('load', toggle);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
