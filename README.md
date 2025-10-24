# openai-business-lab

Минимальный многостраничный шаблон веб-сайта для тестирования интеграций Mango-виджетов и лидогенерации.

Структура:
- index.html
- services.html
- contacts.html (форма лидогенерации)
- privacy-policy.html
- partials/header.html
- partials/footer.html (здесь подключены Mango-скрипты)
- css/styles.css
- js/main.js
- js/form-validation.js
- images/placeholder.png

Динамическое подключение `header` и `footer` реализовано через `js/main.js` (fetch).
Mango-скрипты подключены **только в footer.html** — чтобы избежать дублирования.

Для публикации на GitHub Pages: загрузите содержимое этого архива в ветку `main` репозитория и включите GitHub Pages в настройках.
