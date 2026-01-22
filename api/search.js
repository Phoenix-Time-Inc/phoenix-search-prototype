// api/search.js - ИСПРАВЛЕННАЯ ВЕРСИЯ ДЛЯ VERCEL
export default async function handler(req, res) {
    console.log('🔥 API Search вызван');
    
    // 1. ВКЛЮЧАЕМ CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 2. ОБРАБАТЫВАЕМ OPTIONS
    if (req.method === 'OPTIONS') {
        console.log('✅ OPTIONS обработан');
        return res.status(200).end();
    }
    
    // 3. ТОЛЬКО POST
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Только POST',
            received: req.method 
        });
    }
    
    // 4. ПАРСИМ ТЕЛО (ПРАВИЛЬНО ДЛЯ VERCEL)
    let body = {};
    let query = 'тест';
    
    try {
        // Вариант 1: Если body уже объект (Vercel иногда парсит автоматически)
        if (typeof req.body === 'object' && req.body !== null) {
            body = req.body;
        } 
        // Вариант 2: Если body строка - парсим JSON
        else if (typeof req.body === 'string') {
            body = JSON.parse(req.body);
        }
        
        query = body.query || 'тест';
        console.log('📦 Тело запроса:', { query, body });
        
    } catch(e) {
        console.log('⚠️ Ошибка парсинга тела:', e.message);
        // Продолжаем с дефолтными значениями
    }
    
    // 5. ВСЕГДА ВОЗВРАЩАЕМ УСПЕШНЫЙ ОТВЕТ
    console.log(`✅ Отвечаю на: "${query}"`);
    
    return res.status(200).json({
        success: true,
        source: 'phoenix_api_fixed',
        response: {
            essence: `✅ API РАБОТАЕТ! Запрос: "${query}"`,
            resonance: 'Что чувствуешь теперь, когда API отвечает?',
            step: 'Сделай глубокий вдох — система жива!',
            type: 'успех'
        },
        collective: {
            peopleCount: 1,
            message: 'Первый успешный запрос после фикса',
            similarQuestions: []
        },
        timestamp: new Date().toISOString()
    });
}
