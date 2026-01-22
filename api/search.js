// api/search.js - САМЫЙ ПРОСТОЙ РАБОЧИЙ API
export default async function handler(req, res) {
    console.log('🔥 API Search вызван');
    
    // 1. ВКЛЮЧАЕМ CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
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
    
    // 4. ПАРСИМ ТЕЛО
    let body = {};
    try {
        body = req.body;
        console.log('📦 Тело:', body);
    } catch(e) {
        console.log('⚠️ Тело не распарсилось, использую пустое');
    }
    
    const query = body.query || 'тест';
    
    // 5. ВСЕГДА ВОЗВРАЩАЕМ УСПЕШНЫЙ ОТВЕТ
    console.log(`✅ Отвечаю на: "${query}"`);
    
    return res.status(200).json({
        success: true,
        source: 'phoenix_api',
        response: {
            essence: `API работает! Твой вопрос: "${query}" принят.`,
            resonance: 'Что чувствуешь, зная что система отвечает?',
            step: 'Сделай глубокий вдох — всё работает!',
            type: 'успех'
        },
        collective: {
            peopleCount: 1,
            message: 'Ты первый, кто тестирует этот API',
            similarQuestions: []
        },
        timestamp: new Date().toISOString(),
        debug: {
            method: req.method,
            query_length: query.length,
            has_body: !!body
        }
    });
}
