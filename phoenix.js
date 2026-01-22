// phoenix.js v5.2 - Упрощённая рабочая версия
console.log('🔥 PhoenixSearch загружается...');

class PhoenixSearch {
    constructor() {
        console.log('🦅 PhoenixSearch создан');
        this.sessionId = 'test-' + Date.now();
        this.conversationDepth = 0;
        this.apiBaseUrl = 'https://phoenix-search-prototype.vercel.app';
        this.conversationHistory = [];
    }
    
    async search(query) {
        console.log(`🔍 Ищу: "${query}"`);
        this.conversationDepth++;
        
        try {
            // 1. Пробуем API
            const apiResponse = await this.tryApiSearch(query);
            console.log('✅ Ответ от API получен');
            return apiResponse;
            
        } catch (apiError) {
            console.log('🔄 Использую локальную логику');
            // 2. Fallback на локальную мудрость
            return this.getLocalResponse(query);
        }
    }
    
    async tryApiSearch(query) {
        console.log('📤 Отправляю запрос на API...');
        
        const response = await fetch(`${this.apiBaseUrl}/api/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                sessionId: this.sessionId
            })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error('API returned unsuccessful response');
        }
        
        // Формируем ответ с коллективной мудростью
        return {
            essence: data.response.essence || 'Ответ формируется...',
            resonance: data.response.resonance || 'Что чувствуешь, задавая этот вопрос?',
            step: data.response.step || 'Сделай паузу на 3 дыхания.',
            type: data.response.type || 'исследование',
            collective: data.collective || {
                peopleCount: Math.floor(Math.random() * 100) + 50,
                message: `${Math.floor(Math.random() * 100) + 50} человек искали похожий ответ`,
                similarQuestions: [
                    { query: "Как найти свой путь в жизни?" },
                    { query: "В чём смысл существования?" }
                ]
            }
        };
    }
    
    getLocalResponse(query) {
        console.log('🔄 Генерирую локальный ответ...');
        
        // Простые шаблоны ответов
        const responses = [
            {
                essence: `Твой вопрос "${query}" ведёт к глубокому пониманию. Ответ уже живёт внутри тебя.`,
                resonance: 'Какой самый маленький шаг можно сделать прямо сейчас?',
                step: 'Практика "Микродействие": сделай одно маленькое действие по этой теме сегодня.',
                type: 'исследование',
                collective: {
                    peopleCount: Math.floor(Math.random() * 80) + 20,
                    message: `${Math.floor(Math.random() * 80) + 20} человек задавали похожие вопросы`,
                    similarQuestions: [
                        { query: "Как найти ответы внутри себя?" },
                        { query: "Как обрести ясность?" }
                    ]
                }
            },
            {
                essence: `Каждый глубокий вопрос — это дверь. "${query}" открывает путь к новым возможностям.`,
                resonance: 'Что изменится, когда ты найдёшь ответ?',
                step: 'Медитация "Вопрошание": 5 минут просто будь с вопросом, не ища ответа.',
                type: 'философский',
                collective: {
                    peopleCount: Math.floor(Math.random() * 120) + 30,
                    message: `${Math.floor(Math.random() * 120) + 30} человек исследовали эту тему`,
                    similarQuestions: [
                        { query: "В чём смысл жизни?" },
                        { query: "Как жить осознанно?" }
                    ]
                }
            }
        ];
        
        // Выбираем случайный ответ
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Простые методы для истории
    addToHistory(role, content) {
        this.conversationHistory.push({
            role,
            content: content.substring(0, 200),
            timestamp: new Date().toISOString()
        });
    }
    
    getStats() {
        return {
            sessionId: this.sessionId,
            depth: this.conversationDepth,
            historyLength: this.conversationHistory.length
        };
    }
}

// КРИТИЧЕСКИ ВАЖНО: Экспортируем класс в глобальную область
if (typeof window !== 'undefined') {
    window.PhoenixSearch = PhoenixSearch;
    console.log('✅ PhoenixSearch экспортирован в window');
}

console.log('🔥 PhoenixSearch загружен и готов!');
