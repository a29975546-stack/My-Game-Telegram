import 'dotenv/config';
import express from 'express';

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://a29975546-stack.github.io/My-Game-Telegram/';
const PUBLIC_URL = process.env.PUBLIC_URL || '';
const PORT = Number(process.env.PORT || 3000);

const app = express();
app.use(express.json({ limit: '1mb' }));

async function tg(method, payload) {
  if (!BOT_TOKEN) throw new Error('BOT_TOKEN is not set');
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.description || method);
  return data.result;
}

app.get('/', (req, res) => {
  res.send('Bubble Boom bot server is running');
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/webhook', async (req, res) => {
  res.json({ ok: true });

  const update = req.body;
  const msg = update.message;
  if (!msg?.chat?.id || !msg.text) return;

  const text = msg.text.trim();
  if (text.startsWith('/start')) {
    await tg('sendMessage', {
      chat_id: msg.chat.id,
      text: '🎮 Бабл Бум готов! Нажми кнопку ниже, чтобы открыть игру.',
      reply_markup: {
        inline_keyboard: [[
          { text: '🎮 Играть', web_app: { url: WEB_APP_URL } }
        ]]
      }
    }).catch(console.error);
  }
});

app.post('/set-webhook', async (req, res) => {
  try {
    if (!PUBLIC_URL) throw new Error('PUBLIC_URL is not set');
    const url = `${PUBLIC_URL.replace(/\/$/, '')}/webhook`;
    const result = await tg('setWebhook', { url });
    res.json({ ok: true, url, result });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Bot server started on port ${PORT}`);
});
