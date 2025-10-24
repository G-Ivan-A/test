// js/main.js

async function includeHTML(id, file) {
  try {
    const el = document.getElementById(id);
    if (!el) return;
    const resp = await fetch(file, {cache: "no-cache"});
    if (!resp.ok) { el.innerHTML = ''; return; }
    el.innerHTML = await resp.text();
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
    // Проверяем, соответствует ли href текущему URL или конечному пути
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
