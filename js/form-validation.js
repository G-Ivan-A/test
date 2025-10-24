document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('leadForm');
  if(!form) return;
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const data = new FormData(form);
    // basic client-side validation
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    if(name.trim().length < 2){ alert('Пожалуйста, укажите имя.'); return; }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ alert('Укажите корректный email.'); return; }
    // Simulate sending
    try {
      // Here you could send to API via fetch
      console.log('Lead data', Object.fromEntries(data.entries()));
      alert('Спасибо! Ваша заявка принята. Мы свяжемся в ближайшее время.');
      form.reset();
    } catch(err){
      console.error(err);
      alert('Ошибка отправки. Попробуйте позже.');
    }
  });
});
