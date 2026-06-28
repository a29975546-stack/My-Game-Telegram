# Bubble Boom Bot Server

Этот сервер нужен, чтобы бот отвечал на `/start` кнопкой `🎮 Играть`.

## Переменные окружения

Нужны 3 переменные:

```env
BOT_TOKEN=новый_токен_из_BotFather
WEB_APP_URL=https://a29975546-stack.github.io/My-Game-Telegram/
PUBLIC_URL=https://адрес-твоего-сервера.onrender.com
```

Токен не вставляй в GitHub и не отправляй в чат.

## Запуск локально

```bash
npm install
npm start
```

## Webhook

После деплоя открой в браузере или через curl:

```text
https://адрес-твоего-сервера.onrender.com/set-webhook
```

Но если хостинг не поддерживает GET для этого адреса, можно вызвать POST через Postman/Insomnia. После webhook команда `/start` начнёт отправлять кнопку игры.
