// ============= НАЧАЛО ФАЙЛА api/search.js =============
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
        // Чтение тела запроса
        if (req.body) {
            const body = typeof req.body === 'string' 
                ? JSON.parse(req.body) 
                : req.body;
            query = body.query || query;
        }
    } catch(e) {
        console.log('Ошибка парсинга:', e.message);
    }
    
    // ВРЕМЕННАЯ БАЗА МУДРОСТИ (прямо в коде)
    const wisdomDB = {
        "призвание": "Находится в точке пересечения таланта и служения.",
        "страх": "Страх указывает на важность, а не на опасность.",
        "одиночество": "Пространство для диалога с глубиной себя.",
        "смысл жизни": "Смысл жизни — в создании смыслов.",
        "успех": "Успех — это движение от одной неудачи к другой без потери энтузиазма.",
        "любовь": "Любовь — это не чувство, а действие.",
        "счастье": "Счастье — это побочный продукт осмысленной жизни.",
        "тревога": "Тревога — это ум, который пытается контролировать то, что не в его власти.",
        "доверие": "Доверие — это риск, на который идёшь, чтобы жить полной жизнью.",
        "поиск себя": "Себя не найти, себя можно только создать."
    };
    
    // Ищем ответ в базе
    const lowerQuery = query.toLowerCase();
    const answer = wisdomDB[lowerQuery] 
        ? wisdomDB[lowerQuery]
        : `Ищу ответ на вопрос: "${query}". Пока его нет в моей базе, но скоро появится.`;
    
    // Успешный ответ
    return res.status(200).json({
        success: true,
        query: query,
        answer: answer,
        collective: {
            totalInsights: Object.keys(wisdomDB).length,
            similarQuestions: Object.keys(wisdomDB).filter(key => 
                key.includes(lowerQuery) || lowerQuery.includes(key)
            )
        },
        timestamp: new Date().toISOString()
    });
}
// ============= КОНЕЦ ФАЙЛА =============
