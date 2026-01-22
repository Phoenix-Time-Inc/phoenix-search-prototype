// В начале функции handler, после получения ответа:
const localResponse = getLocalWisdomResponse(query);

// ДОБАВЛЯЕМ КОЛЛЕКТИВНУЮ МУДРОСТЬ
let collectiveWisdom = null;
try {
  const wisdomRes = await fetch(`${process.env.VERCEL_URL}/api/questions?query=${encodeURIComponent(query)}`);
  if (wisdomRes.ok) {
    collectiveWisdom = await wisdomRes.json();
  }
} catch (error) {
  console.log('Коллективная мудрость временно недоступна');
}

// ОТПРАВЛЯЕМ ВОПРОС В КОЛЛЕКТИВНУЮ БАЗУ (асинхронно, не ждём)
fetch(`${process.env.VERCEL_URL}/api/questions`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: query,
    response: localResponse,
    userId: req.headers['x-vercel-id'] || 'anonymous'
  })
}).catch(() => {}); // Игнорируем ошибки

// ВОЗВРАЩАЕМ ОТВЕТ С КОЛЛЕКТИВНОЙ МУДРОСТЬЮ
return res.status(200).json({
  success: true,
  source: 'local_wisdom',
  response: localResponse,
  collective: collectiveWisdom ? {
    peopleCount: collectiveWisdom.count || 0,
    message: collectiveWisdom.wisdom?.message,
    similarQuestions: collectiveWisdom.questions?.slice(0, 2)
  } : null,
  debug: { timestamp: new Date().toISOString() }
});
