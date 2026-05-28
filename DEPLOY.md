# 🚀 Развёртывание на GitHub Pages

## Автоматическое развёртывание

Этот сайт автоматически развёртывается на GitHub Pages при каждом push в ветку `main`.

### Перейти на живой сайт:
```
https://github.com/ZORQEX/modernweb-site/deployments/activity_log
```

## Ручное развёртывание

### 1. Убедитесь, что файлы на GitHub
```bash
git push origin main
```

### 2. Включите GitHub Pages
- Перейдите на GitHub репо
- Settings → Pages
- Source: Deploy from a branch
- Branch: `main` / `(root)`

### 3. Откройте сайт
- Ссылка появится в Settings → Pages
- Обычно: `https://ZORQEX.github.io/modernweb-site/`

## Локальное тестирование перед развёртыванием

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

Откройте `http://localhost:8000` в браузере.

## Структура для GitHub Pages

```
.
├── index.html          ← Главная страница (автоматически развёртывается)
├── styles.css
├── script.js
├── README.md           ← Отображается как описание репо
├── LICENSE             ← Лицензия проекта
└── DEPLOY.md           ← Этот файл
```

## Советы

- 📱 Сайт полностью адаптивен (мобильный, планшет, desktop)
- ⚡ Нет зависимостей, чистый HTML/CSS/JS
- 🎨 Работает в любом браузере, поддерживающем ES6
- 📦 Размер < 50KB (очень быстро загружается)

---

Наслаждайтесь вашим красивым сайтом! 🌟
