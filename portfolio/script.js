// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

// Отправка формы в Formspree (адрес формы указан в атрибуте action в HTML)
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  note.style.color = '';
  note.textContent = 'Отправляю...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      note.textContent = 'Спасибо! Заявка отправлена — отвечу в течение дня.';
      form.reset();
    } else {
      const data = await response.json().catch(() => null);
      note.textContent = data?.errors
        ? data.errors.map(err => err.message).join(', ')
        : 'Не получилось отправить. Попробуйте ещё раз или напишите на email напрямую.';
      note.style.color = '#e07a5f';
    }
  } catch (err) {
    note.textContent = 'Ошибка сети. Проверьте соединение и попробуйте снова.';
    note.style.color = '#e07a5f';
  } finally {
    submitBtn.disabled = false;
  }
});
