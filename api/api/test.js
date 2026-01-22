// api/test.js - СУПЕР-ПРОСТОЙ РАБОЧИЙ API
export default async function handler(req, res) {
  console.log('🟢 TEST API вызван');
  
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Всегда возвращаем успешный ответ
  return res.status(200).json({
    success: true,
    message: 'API работает!',
    response: {
      essence: 'Тестовый ответ от API',
      resonance: 'Что чувствуешь, читая это?',
      step: 'Улыбнись — система работает!',
      type: 'тест'
    },
    collective: {
      peopleCount: 1,
      message: 'Ты первый тестировщик',
      similarQuestions: []
    },
    timestamp: new Date().toISOString()
  });
}
