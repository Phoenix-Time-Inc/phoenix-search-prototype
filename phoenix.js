// phoenix.js - СУПЕР-НАДЁЖНАЯ ВЕРСИЯ
console.log('🦅 PhoenixSearch загружается...');

// НОВАЯ ФУНКЦИЯ API - ВСТАВЬ В НАЧАЛО ФАЙЛА (перед классом)
async function callPhoenixAPI(userQuery) {
    console.log('📡 Отправляю запрос в Phoenix API:', userQuery);
    
    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: userQuery,
                timestamp: new Date().toISOString(),
                source: 'phoenix_web'
            })
        });
        
        if (!response.ok) {
            throw new Error(`API ошибка: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ API ответил:', data);
        
        return {
            success: true,
            answer: data.answer || data.response?.essence || 'Ответ от API',
            collective: data.collective || { peopleCount: 1, message: 'Коллективная мудрость' },
            source: 'API Phoenix'
        };
        
    } catch (error) {
        console.error('❌ Ошибка подключения к API:', error);
        return {
            success: false,
            answer: `Локальный ответ на: "${userQuery}"`,
            source: 'Локальный Phoenix',
            error: error.message
        };
    }
}

class PhoenixSearch {
    constructor() {
        this.apiUrl = 'https://phoenix-search-prototype.vercel.app/api/search';
        console.log('✅ Класс создан');
    }
    
    async search(query) {
        console.log(`🔍 Ищу: "${query}"`);
        
        // ПЕРВЫЙ ВАРИАНТ: Используем новую функцию callPhoenixAPI
        const apiResult = await callPhoenixAPI(query);
        
        // Если API успешно ответило
        if (apiResult.success) {
            console.log('🎯 Получен ответ от API');
            return {
                essence: apiResult.answer,
                resonance: 'Что это значит для тебя?',
                step: 'Подумай над ответом',
                type: 'ответ',
                collective: apiResult.collective
            };
        }
        
        // ВТОРОЙ ВАРИАНТ: Старая логика (fallback)
        console.log('🔄 Использую локальный ответ');
        
        try {
            // Пробуем старый API (если новый не сработал)
            console.log('📤 Отправляю запрос по старому адресу...');
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query || 'тест' })
            });
            
            console.log('📥 Статус:', response.status);
            
            if (!response.ok) {
                throw new Error(`API ошибка: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Данные получены:', data.success);
            
            return {
                essence: data.response?.essence || data.answer || 'Ответ от API',
                resonance: data.response?.resonance || 'Что это значит для тебя?',
                step: data.response?.step || 'Подумай над ответом',
                type: data.response?.type || 'ответ',
                collective: data.collective || { peopleCount: 1, message: 'Тестовый режим' }
            };
            
        } catch (error) {
            console.log('🔄 Использую полный локальный fallback');
            
            // Финальный fallback
            return {
                essence: `Даже если API временно недоступен, твой вопрос "${query}" важен.`,
                resonance: 'Что ты узнал, задав этот вопрос?',
                step: 'Сделай перерыв на 1 минуту',
                type: 'локальный',
                collective: { peopleCount: 0, message: 'Локальный режим' }
            };
        }
    }
}

// КРИТИЧЕСКИ ВАЖНО
if (typeof window !== 'undefined') {
    window.PhoenixSearch = PhoenixSearch;
    console.log('🚀 PhoenixSearch готов!');
}
