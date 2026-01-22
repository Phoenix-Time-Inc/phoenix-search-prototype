// api/search.js - Полная версия с коллективной мудростью
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Только POST' });
  
  try {
    const { query } = req.body;
    
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Минимум 2 символа',
        fallback: getFallbackResponse(query)
      });
    }
    
    console.log('📝 Запрос:', query.substring(0, 50) + '...');
    
    // 1. Локальный ответ
    const localResponse = getLocalWisdomResponse(query);
    
    // 2. Коллективная мудрость (пробуем получить)
    let collectiveWisdom = null;
    try {
      const apiUrl = process.env.VERCEL_URL || 'https://phoenix-search-prototype.vercel.app';
      const wisdomRes = await fetch(`${apiUrl}/api/questions?query=${encodeURIComponent(query)}&limit=3`);
      if (wisdomRes.ok) {
        collectiveWisdom = await wisdomRes.json();
      }
    } catch (error) {
      console.log('Коллективная мудрость временно недоступна');
    }
    
    // 3. Сохраняем вопрос в коллективную базу (асинхронно)
    try {
      const apiUrl = process.env.VERCEL_URL || 'https://phoenix-search-prototype.vercel.app';
      fetch(`${apiUrl}/api/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
          response: localResponse,
          userId: 'phoenix-user'
        })
      }).catch(() => {});
    } catch (error) {
      // Игнорируем ошибки сохранения
    }
    
    // 4. Возвращаем ответ
    return res.status(200).json({
      success: true,
      source: 'local_wisdom',
      response: localResponse,
      collective: collectiveWisdom ? {
        peopleCount: collectiveWisdom.count || 0,
        message: collectiveWisdom.wisdom?.message,
        similarQuestions: collectiveWisdom.questions?.slice(0, 2)
      } : null,
      debug: { 
        timestamp: new Date().toISOString(),
        queryLength: query.length 
      }
    });
    
  } catch (error) {
    console.error('❌ Ошибка в API:', error);
    return res.status(200).json({
      success: true,
      source: 'fallback',
      response: getFallbackResponse('ошибка системы'),
      error: error.message
    });
  }
}

// Локальная мудрость
function getLocalWisdomResponse(query) {
  const queryLower = query.toLowerCase();
  let type = 'исследование';
  
  if (queryLower.includes('призвание') || queryLower.includes('назначение')) type = 'глубинный';
  else if (queryLower.includes('прокрастинация') || queryLower.includes('лень')) type = 'практический';
  else if (queryLower.includes('страх') || queryLower.includes('боюсь')) type = 'эмоциональный';
  else if (queryLower.includes('смысл') || queryLower.includes('зачем')) type = 'философский';
  
  const wisdomBase = {
    'глубинный': {
      essence: `Призвание — это не то, что ты находишь, а то, что проявляется, когда ты начинаешь действовать из целостности. Твой вопрос "${query}" — уже первый шаг.`,
      resonance: 'Что бы ты делал, даже если бы за это не платили?',
      step: 'Практика "След мастера": неделю посвящай 20 минут в день делу, которое заставляет тебя забыть о времени.',
      type: 'глубинный'
    },
    'практический': {
      essence: `Прокрастинация — не враг, а сигнальная система. Она показывает, где энергия встречает сопротивление. "${query}" указывает на место для перестройки.`,
      resonance: 'Что в откладываемом деле кажется наименее "твоим"?',
      step: 'Метод "2 минуты": сделай только первые 2 минуты самого страшного дела. Не больше.',
      type: 'практический'
    },
    'эмоциональный': {
      essence: `Страх — страж порога. Твой вопрос "${query}" отмечает место, где начинается следующий уровень роста.`,
      resonance: 'Если бы этот страх был защитником, что бы он защищал?',
      step: 'Диалог со страхом: напиши ему письмо и дай ему ответить.',
      type: 'эмоциональный'
    },
    'философский': {
      essence: `Смысл рождается не в ответах, а в качестве вопрошания. "${query}" — это уже проживание смысла.`,
      resonance: 'Что перестаёт быть важным, когда ты глубоко погружаешься в этот вопрос?',
      step: 'Медитация "Вопросительное молчание": 7 минут просто будь с вопросом.',
      type: 'философский'
    },
    'исследование': {
      essence: `Каждый глубокий вопрос содержит семя ответа. В "${query}" уже есть всё необходимое — осталось сменить фокус.`,
      resonance: 'Какая часть этого вопроса чувствуется самой живой?',
      step: 'Свободное письмо: 5 минут пиши всё, что приходит в голову по этой теме.',
      type: 'исследование'
    }
  };
  
  return wisdomBase[type] || wisdomBase['исследование'];
}

function getFallbackResponse(query) {
  return {
    essence: `Истинный ответ на "${query}" зреет в тишине между мыслями.`,
    resonance: 'Что происходит, когда ты отпускаешь потребность в немедленном ответе?',
    step: 'Пауза на чай: приготовь напиток и просто наблюдай за паром 5 минут.',
    type: 'резервный'
  };
}
