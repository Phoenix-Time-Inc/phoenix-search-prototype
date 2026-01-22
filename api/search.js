// api/search.js - Vercel Serverless Function
import { OpenAI } from 'openai';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Только POST запросы' });
    }
    
    const { query, context = [], depth = 'medium' } = req.body;
    
    // Инициализация OpenAI
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    
    // Системный промпт в духе Феникс-Поиска
    const systemPrompt = `Ты — Феникс-Проводник, ИИ для глубинного поиска смыслов.
    Твоя задача — не давать готовые ответы, а вести пользователя к его собственным прозрениям.
    
    Формат ответа (на русском):
    1. СУТЬ: [2-3 предложения глубинного анализа]
    2. РЕЗОНАНС: [Вопрос пользователю для самоисследования]
    3. ПРАКТИКА: [Конкретный шаг из Феникс-Тайм, 5-10 минут]
    
    Будь мудрым, поэтичным, но точным.`;
    
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: systemPrompt },
                ...context.map(q => ({ role: 'user', content: q })),
                { role: 'user', content: query }
            ],
            temperature: 0.7,
            max_tokens: 500
        });
        
        const response = completion.choices[0].message.content;
        
        // Парсим ответ в структурированный формат
        const structured = parsePhoenixResponse(response);
        
        return res.status(200).json({
            success: true,
            response: structured,
            raw: response
        });
        
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            error: 'Внутренняя ошибка поиска',
            fallback: getFallbackResponse(query)
        });
    }
}

function parsePhoenixResponse(text) {
    // Парсинг ответа ИИ в нашу структуру
    // [реализация парсера]
}

function getFallbackResponse(query) {
    // Резервные ответы, если ИИ не доступен
    return {
        essence: `Истинный ответ на "${query}" находится не в словах, а в тишине между ними.`,
        resonance: 'Что ты чувствуешь, когда задаёшь этот вопрос?',
        step: 'Пауза на 3 дыхания. Просто будь с вопросом.',
        type: 'резервный'
    };
}
