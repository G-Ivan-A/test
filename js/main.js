// js/main.js

async function includeHTML(id, file) {
  try {
    const el = document.getElementById(id);
    if (!el) return;

    const resp = await fetch(file, { cache: "no-cache" });
    if (!resp.ok) {
      el.innerHTML = '';
      return;
    }

    const html = await resp.text();

    // Создаем временный элемент для парсинга HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // Вставляем содержимое
    el.replaceWith(temp);

    // Выполняем <script> теги вручную
    const scripts = temp.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
        newScript.async = true;
      } else {
        newScript.textContent = script.textContent;
      }
      // Копируем атрибуты
      Array.from(script.attributes).forEach(attr => {
        if (attr.name !== 'src' && attr.name !== 'type') {
          newScript.setAttribute(attr.name, attr.value);
        }
      });
      document.body.appendChild(newScript);
      // Удаляем скрипт после выполнения, чтобы избежать дублирования
      if (!script.src) {
        document.body.removeChild(newScript);
      }
    });

    // После вставки header/footer, выполнить дополнительные функции
    runAfterIncludes();

  } catch (e) {
    console.error("Ошибка подключения HTML:", e);
  }
}

function runAfterIncludes(){
  // Подсветка активной ссылки навигации
  const links = document.querySelectorAll('.site-nav a');
  links.forEach(a=>{
    if(a.href === location.href || a.getAttribute('href') === location.pathname.split('/').pop()){
      a.classList.add('active');
    }
  });
}

// Загрузка header и footer при загрузке DOM
document.addEventListener('DOMContentLoaded', ()=>{
  includeHTML('header', 'partials/header.html');
  includeHTML('footer', 'partials/footer.html');
});
