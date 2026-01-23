// test-local.js - локальный тест без Vercel
import { analyzeEmotionalProfile } from './emotional-tags.js';
import wisdomDB from './wisdom.json' assert { type: 'json' };

console.log('🧪 ТЕСТ ЭМОЦИОНАЛЬНОГО ПОИСКА\n');

// Тестовые запросы
const testQueries = [
  "Как найти своё призвание?",
  "Страх перед будущим",
  "Одиночество в толпе",
  "Что такое счастье?"
];

testQueries.forEach(query => {
  console.log(`\n🔍 Запрос: "${query}"`);
  const emotions = analyzeEmotionalProfile(query);
  console.log('📊 Эмоциональный профиль:', emotions);
  
  // Простой поиск резонанса
  const matches = [];
  for (const [key, data] of Object.entries(wisdomDB)) {
    const wisdomTags = data.tags || [];
    const hasMatch = wisdomTags.some(tag => 
      Object.keys(emotions).includes(tag)
    );
    if (hasMatch) {
      matches.push({ id: key, text: data.text, tags: wisdomTags });
    }
  }
  
  console.log(`🎯 Найдено совпадений: ${matches.length}`);
  matches.forEach(match => {
    console.log(`   • ${match.id}: ${match.text} [${match.tags.join(', ')}]`);
  });
});

console.log('\n✅ Локальный тест завершён!');
