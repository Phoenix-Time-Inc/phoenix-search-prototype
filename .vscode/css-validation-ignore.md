# Игнорирование CSS предупреждений

Предупреждения VS Code о "@tailwind" директив можно игнорировать:
1. Эти директивы обрабатываются Tailwind CLI, а не браузером
2. Next.js правильно компилирует их во время сборки
3. Предупреждения не влияют на работу приложения

Чтобы убрать предупреждения, установи расширение:
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)

Или отключи CSS валидацию в настройках VS Code:
1. Ctrl+Shift+P → "Preferences: Open Settings (JSON)"
2. Добавь: "css.validate": false
