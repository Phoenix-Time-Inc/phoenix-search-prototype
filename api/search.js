export default async function handler(req, res) {
    // Включаем CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Обрабатываем OPTIONS запрос
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Только POST запросы
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Только POST' });
    }
    
    let query = 'тест';
    
    try {
        // Правильное чтение тела запроса в Vercel
        if (req.body) {
            const body = typeof req.body === 'string' 
                ? JSON.parse(req.body) 
                : req.body;
            query = body.query || query;
        }
    } catch(e) {
        console.log('Ошибка парсинга:', e.message);
    }
    
    // Успешный ответ
    return res.status(200).json({
        success: true,
        message: `API работает! Запрос: "${query}"`,
        timestamp: new Date().toISOString()
    });
}
