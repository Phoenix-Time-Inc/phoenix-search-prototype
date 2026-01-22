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
    let query = 'тест';
    
    try {
        // Вариант 1: Если body уже объект (Vercel иногда парсит автоматически)
        if (typeof req.body === 'object' && req.body !== null) {
            console.log('📦 Body уже объект:', req.body);
            query = req.body.query || 'тест';
        } 
        // Вариант 2: Если body строка - парсим JSON
        else if (typeof req.body === 'string' && req.body.length > 0) {
            console.log('📦 Body строка:', req.body);
            const parsedBody = JSON.parse(req.body);
            query = parsedBody.query || 'тест';
        }
        // Вариант 3: Правильный способ для Vercel - через req.json()
        else {
            try {
                // Сначала попробуем прочитать как поток
                const bodyText = await new Promise((resolve) => {
                    let data = '';
                    req.on('data', chunk => data += chunk);
                    req.on('end', () => resolve(data));
                });
                
                if (bodyText) {
                    const parsed = JSON.parse(bodyText);
                    query = parsed.query || 'тест';
                    console.log('📦 Прочитано из потока:', { query });
                }
            } catch(streamError) {
                console.log('⚠️ Не удалось прочитать поток:', streamError.message);
            }
        }
        
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
