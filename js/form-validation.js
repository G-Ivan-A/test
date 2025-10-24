// js/form-validation.js

document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('leadForm');
  if(!form) return; // Если форма не найдена, выходим
  form.addEventListener('submit', async function(e){
    e.preventDefault(); // Останавливаем стандартную отправку формы
    const data = new FormData(form);

    // Простая клиентская валидация
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    if(name.trim().length < 2){
        alert('Пожалуйста, укажите имя (минимум 2 символа).');
        return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        alert('Укажите корректный email.');
        return;
    }

    // Имитация отправки данных (замените на реальный fetch запрос к вашему API)
    try {
      console.log('Данные заявки (имитация отправки):', Object.fromEntries(data.entries()));
      alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
      form.reset(); // Очищаем форму после "успешной" отправки
    } catch(err){
      console.error('Ошибка при отправке:', err);
      alert('Ошибка отправки. Попробуйте позже.');
    }
  });
});
