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
