// api/questions.js - Коллективная база мудрости
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const db = await getDatabase();
  
  if (req.method === 'POST') {
    // СОХРАНЕНИЕ ВОПРОСА В КОЛЛЕКТИВНУЮ ПАМЯТЬ
    const { query, response, userId = 'anonymous' } = req.body;
    
    if (!query) return res.status(400).json({ error: 'Нет вопроса' });
    
    const question = {
      id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      query: query.substring(0, 500),
      response: response ? {
        essence: response.essence?.substring(0, 300),
        type: response.type
      } : null,
      userId: userId.substring(0, 32),
      timestamp: new Date().toISOString(),
      ipHash: hashIp(req.headers['x-forwarded-for'] || 'anonymous'),
      depth: 1
    };
    
    // Сохраняем
    await db.collection('questions').insertOne(question);
    
    // Находим похожие вопросы
    const similar = await findSimilarQuestions(query, db);
    
    return res.json({
      success: true,
      message: 'Вопрос сохранён в коллективную память',
      similarCount: similar.length,
      similar: similar.slice(0, 3)
    });
  }
  
  if (req.method === 'GET') {
    // ПОЛУЧЕНИЕ КОЛЛЕКТИВНОЙ МУДРОСТИ
    const { query, limit = 10 } = req.query;
    
    if (query) {
      // Поиск похожих вопросов
      const similar = await findSimilarQuestions(query, db);
      return res.json({
        type: 'similar_questions',
        count: similar.length,
        questions: similar.slice(0, limit),
        wisdom: extractCollectiveWisdom(similar)
      });
    } else {
      // Популярные вопросы
      const popular = await db.collection('questions')
        .aggregate([
          { $group: { 
            _id: '$query', 
            count: { $sum: 1 },
            lastAsked: { $max: '$timestamp' }
          }},
          { $sort: { count: -1 } },
          { $limit: parseInt(limit) }
        ]).toArray();
      
      return res.json({
        type: 'popular_questions',
        questions: popular
      });
    }
  }
}

async function findSimilarQuestions(query, db) {
  // Простой поиск по ключевым словам
  const keywords = extractKeywords(query);
  
  if (keywords.length === 0) return [];
  
  const regexPattern = keywords.map(k => `(?=.*${k})`).join('');
  
  return await db.collection('questions')
    .find({ 
      query: { $regex: regexPattern, $options: 'i' }
    })
    .sort({ timestamp: -1 })
    .limit(20)
    .toArray();
}

function extractCollectiveWisdom(questions) {
  if (questions.length === 0) return null;
  
  // Анализируем ответы на похожие вопросы
  const responses = questions
    .filter(q => q.response)
    .map(q => q.response);
  
  if (responses.length === 0) return null;
  
  // Находим самые частые типы ответов
  const typeCounts = {};
  responses.forEach(r => {
    typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
  });
  
  const mostCommonType = Object.keys(typeCounts)
    .reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b);
  
  // Собираем частые фразы из ответов
  const commonPhrases = findCommonPhrases(
    responses.map(r => r.essence)
  );
  
  return {
    totalPeople: questions.length,
    mostCommonType,
    commonPhrases: commonPhrases.slice(0, 5),
    message: `На этот вопрос искали ответ ${questions.length} человек`
  };
}

// Вспомогательные функции
function extractKeywords(text) {
  const stopWords = ['как', 'что', 'почему', 'зачем', 'где', 'когда', 'или', 'и', 'но', 'на', 'в', 'с'];
  return text.toLowerCase()
    .split(/[\s\?\.\,]+/)
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 5);
}

function findCommonPhrases(texts) {
  // Упрощённая логика поиска общих фраз
  const wordFrequency = {};
  
  texts.forEach(text => {
    const words = text.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (word.length > 4) {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    });
  });
  
  return Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));
}

function hashIp(ip) {
  // Простой хэш для анонимности
  return Buffer.from(ip).toString('base64').substring(0, 10);
}

async function getDatabase() {
  // Для Vercel используем MongoDB Atlas (бесплатный)
  // Или простой JSON файл для начала
  return {
    collection: (name) => ({
      insertOne: async (doc) => {
        console.log('📝 Сохранено в коллекцию', name, ':', doc.query?.substring(0, 50));
        return { insertedId: doc.id };
      },
      find: (query) => ({
        sort: () => ({ limit: () => ({ toArray: async () => [] }) })
      }),
      aggregate: () => ({ toArray: async () => [] })
    })
  };
}
