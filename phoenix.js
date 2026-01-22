// phoenix.js - СУПЕР-НАДЁЖНАЯ ВЕРСИЯ
console.log('🦅 PhoenixSearch загружается...');

class PhoenixSearch {
  constructor() {
    this.apiUrl = 'https://phoenix-search-prototype.vercel.app/api/search';
    console.log('✅ Класс создан, API:', this.apiUrl);
  }
  
  async search(query) {
    console.log(`🔍 Ищу: "${query}"`);
    
    try {
      // Пробуем API
      console.log('📤 Отправляю запрос...');
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: query || 'тест'})
      });
      
      console.log('📥 Статус:', response.status);
      
      if (!response.ok) {
        throw new Error(`API ошибка: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Данные получены:', data.success);
      
      // Форматируем ответ
      return {
        essence: data.response?.essence || 'Ответ от API',
        resonance: data.response?.resonance || 'Что это значит для тебя?',
        step: data.response?.step || 'Подумай над ответом',
        type: data.response?.type || 'ответ',
        collective: data.collective || {peopleCount: 1, message: 'Тестовый режим'}
      };
      
    } catch (error) {
      console.log('🔄 Использую локальный ответ');
      
      // Fallback
      return {
        essence: `Даже если API временно недоступен, твой вопрос "${query}" важен.`,
        resonance: 'Что ты узнал, задав этот вопрос?',
        step: 'Сделай перерыв на 1 минуту',
        type: 'локальный',
        collective: {peopleCount: 0, message: 'Локальный режим'}
      };
    }
  }
}

// КРИТИЧЕСКИ ВАЖНО
if (typeof window !== 'undefined') {
  window.PhoenixSearch = PhoenixSearch;
  console.log('🚀 PhoenixSearch готов!');
}
