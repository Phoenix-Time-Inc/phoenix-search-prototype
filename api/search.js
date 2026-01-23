// api/search.js - с эмоциональным тегированием
import { analyzeEmotionalProfile } from './emotional-tags.js';

// Загружаем базу мудрости
import wisdomDB from './wisdom.json' assert { type: 'json' };

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // OPTIONS
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  // Только POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Только POST' });
  }
  
  let query = 'тест';
  
  try {
    if (req.body) {
      const body = typeof req.body === 'string' 
        ? JSON.parse(req.body) 
        : req.body;
      query = body.query || query;
    }
  } catch(e) {
    console.log('Ошибка парсинга:', e.message);
  }
  
  // 1. Анализируем эмоциональный профиль запроса
  const queryEmotions = analyzeEmotionalProfile(query);
  console.log('Эмоции запроса:', queryEmotions);
  
  // 2. Ищем резонансные ответы
  const matches = findResonantMatches(query, queryEmotions);
  
  // 3. Формируем ответ
  return res.status(200).json({
    success: true,
    query: query,
    emotional_profile: queryEmotions,
    matches: matches,
    resonance_level: matches.length > 0 ? 'high' : 'low',
    invitation: matches.length > 0 
      ? 'Эти ответы резонируют с вашим запросом'
      : 'Этот вопрос создаёт новое пространство для мудрости',
    timestamp: new Date().toISOString()
  });
}

// Функция поиска резонансных совпадений
function findResonantMatches(query, queryEmotions) {
  const results = [];
  
  for (const [key, data] of Object.entries(wisdomDB)) {
    // Проверяем текстовое совпадение
    const textMatch = key.toLowerCase().includes(query.toLowerCase()) || 
                     query.toLowerCase().includes(key.toLowerCase());
    
    // Проверяем эмоциональное совпадение
    const wisdomTags = data.tags || [];
    const emotionalMatch = wisdomTags.some(tag => 
      Object.keys(queryEmotions).includes(tag)
    );
    
    // Если есть хотя бы одно совпадение
    if (textMatch || emotionalMatch) {
      results.push({
        id: key,
        text: data.text,
        tags: wisdomTags,
        match_type: textMatch ? 'text' : 'emotional',
        heat: data.heat || 0.5,
        source: data.source || 'unknown'
      });
    }
  }
  
  // Сортируем по "температуре" (heat)
  return results.sort((a, b) => b.heat - a.heat);
}
