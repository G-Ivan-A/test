// js/include-parts.js

function loadHTML(elementId, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Не удалось загрузить ${url}: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // Заменяем placeholder элементом из загруженного HTML
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        // Заменяем первый дочерний элемент placeholder на первый элемент из temp
        const newElement = temp.firstElementChild;
        if (newElement) {
          targetElement.parentNode.replaceChild(newElement, targetElement);
        } else {
          // Если в файле нет элементов (например, только текст), просто вставляем содержимое
          targetElement.innerHTML = temp.innerHTML;
        }
      } else {
        console.warn(`Элемент с id="${elementId}" не найден для вставки содержимого из ${url}`);
      }

      // Выполняем <script> теги вручную
      temp.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.async = oldScript.async;
          newScript.defer = oldScript.defer;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        // Копируем атрибуты, если нужно (например, type="module")
        Array.from(oldScript.attributes).forEach(attr => {
          if (attr.name !== 'src' && attr.name !== 'type') {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
        document.head.appendChild(newScript);
        // Удаляем скрипт после выполнения, чтобы избежать дублирования в head при повторном вызове
        // (не удаляем, если он асинхронный или внешний src)
        if (!oldScript.src) {
          document.head.removeChild(newScript);
        }
      });
    })
    .catch(err => console.error('Ошибка при загрузке фрагмента:', err));
}

// Загружаем части после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  loadHTML('header', 'partials/header.html');
  loadHTML('footer', 'partials/footer.html');
});
