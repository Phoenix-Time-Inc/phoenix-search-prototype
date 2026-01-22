// app.js - Упрощённая рабочая версия
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultSection = document.getElementById('resultSection');
    
    // Проверяем, что элементы найдены
    if (!searchInput || !searchBtn || !resultSection) {
        console.error("❌ Не найдены необходимые элементы DOM");
        return;
    }
    
    // Создаём экземпляр поиска
    const phoenix = new PhoenixSearch();
    console.log("✅ PhoenixSearch создан");
    
    // Далее оставляем ВЕСЬ остальной код без изменений
    // (цикл примеров, обработчики событий, функции displayResponse и т.д.)
    // НИЧЕГО НЕ УДАЛЯЙ после этой части!
        }
    }
    
    // Запускаем цикл каждые 3 секунды
    setInterval(cycleExamples, 3000);
    
    // Обработчики событий
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
    
    // Функция поиска
    async function performSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            showError('Вопрос — это уже начало пути. Напиши что-то из глубины.');
            return;
        }
        
        // Показываем состояние загрузки
        showLoading(query);
        
        try {
            // Ищем ответ
            const response = await phoenix.search(query);
            
            // Показываем результат
            displayResponse(query, response);
            
            // Записываем в историю (localStorage)
            saveToHistory(query, response);
            
        } catch (error) {
            console.error('Error:', error);
            showError('Путь временно закрыт туманом. Попробуй переформулировать вопрос.');
        }
    }
    
    // Показать загрузку
    function showLoading(query) {
        resultSection.innerHTML = `
            <div class="loading">
                <div class="phoenix-animation">
                    <div class="fire"></div>
                    <div class="bird">🦅</div>
                </div>
                <h3>ПРЕВРАЩАЕМ ВОПРОС В ПУТЬ</h3>
                <p class="query-preview">"${query}"</p>
                <p class="loading-text">Ищем не в базе данных, а в пространстве смыслов...</p>
                <div class="pulse"></div>
            </div>
        `;
        resultSection.style.display = 'block';
        
        // Прокручиваем к результатам
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Показать ответ
    function displayResponse(query, response) {
        const timestamp = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        resultSection.innerHTML = `
            <div class="response">
                <div class="response-header">
                    <span class="type-badge">${response.type}</span>
                    <span class="timestamp">🕊️ ${timestamp}</span>
                </div>
                
                <div class="query-display">
                    <span class="query-icon">🔍</span>
                    <h3>${query}</h3>
                </div>
                
                <div class="essence-section">
                    <h4>🦅 СУТЬ</h4>
                    <div class="essence-content">
                        <p>${response.essence}</p>
                    </div>
                </div>
                
                <div class="resonance-section">
                    <h4>🔥 РЕЗОНАНС</h4>
                    <div class="resonance-content">
                        <p>${response.resonance}</p>
                    </div>
                </div>
                
                <div class="step-section">
                    <h4>🧭 ПРАКТИКА</h4>
                    <div class="step-content">
                        <p>${response.step}</p>
                    </div>
                </div>
                
                <div class="actions">
                    <button class="action-btn deepen-btn" onclick="deepenSearch()">
                        <span class="btn-icon">⚡</span> УГЛУБИТЬ ПОИСК
                    </button>
                    <button class="action-btn save-btn" onclick="saveInsight()">
                        <span class="btn-icon">💾</span> СОХРАНИТЬ ИНСАЙТ
                    </button>
                    <button class="action-btn ritual-btn" onclick="goToRitual()">
                        <span class="btn-icon">🔄</span> РИТУАЛ ФЕНИКС ТАЙМ
                    </button>
                </div>
                
                <div class="footer-note">
                    <p>Этот ответ — начало диалога, а не его конец.</p>
                </div>
            </div>
        `;
        
        // Добавляем интерактивность
        addResponseInteractions();
    }
    
    // Показать ошибку
    function showError(message) {
        resultSection.innerHTML = `
            <div class="error-state">
                <div class="error-icon">🌀</div>
                <h3>ПУТЬ ПРЕРВАЛСЯ</h3>
                <p>${message}</p>
                <button onclick="retrySearch()" class="retry-btn">ПОПРОБОВАТЬ СНОВА</button>
            </div>
        `;
        resultSection.style.display = 'block';
    }
    
    // Сохранить в историю
    function saveToHistory(query, response) {
        const history = JSON.parse(localStorage.getItem('phoenixHistory') || '[]');
        history.unshift({
            query,
            response,
            date: new Date().toISOString()
        });
        
        // Храним только последние 50 запросов
        if (history.length > 50) history.pop();
        
        localStorage.setItem('phoenixHistory', JSON.stringify(history));
    }
    
    // Добавляем интерактивные функции
    window.deepenSearch = function() {
        const currentQuery = searchInput.value;
        const deepenQueries = [
            `Что стоит за моим вопросом "${currentQuery}"?`,
            `Какой более глубокий вопрос скрывается в "${currentQuery}"?`,
            `Если бы "${currentQuery}" был симптомом, какой была бы причина?`
        ];
        
        searchInput.value = deepenQueries[Math.floor(Math.random() * deepenQueries.length)];
        performSearch();
    };
    
    window.saveInsight = function() {
        alert('Инсайт сохранён в "Сокровищницу Феникса". Скоро здесь будет облачное хранилище.');
        // В будущем: отправка на сервер
    };
    
    window.goToRitual = function() {
        const rituals = [
            'Ритуал "Пробуждение Ветра"',
            'Практика "Тень и Свет"',
            'Медитация "Корни и Крылья"',
            'Церемония "Сжигание Масок"'
        ];
        
        const ritual = rituals[Math.floor(Math.random() * rituals.length)];
        resultSection.innerHTML += `
            <div class="ritual-transition">
                <h4>🌀 ПЕРЕХОД В ${ritual.toUpperCase()}</h4>
                <p>Готовься к погружению через 3... 2... 1...</p>
                <div class="countdown">3</div>
            </div>
        `;
        
        // Имитация перехода
        let count = 3;
        const countdown = setInterval(() => {
            count--;
            if (count > 0) {
                document.querySelector('.countdown').textContent = count;
            } else {
                clearInterval(countdown);
                document.querySelector('.ritual-transition').innerHTML = `
                    <p>🔄 Перенаправляем в пространство практики...</p>
                    <p><em>Подсказка: В реальной версии здесь будет переход в приложение "Феникс Тайм"</em></p>
                `;
            }
        }, 1000);
    };
    
    window.retrySearch = function() {
        searchInput.focus();
        searchInput.select();
    };
    
    // Инициализация
    cycleExamples(); // Первый пример сразу
    
    // Добавляем CSS для новых элементов
    addEnhancedStyles();
});

// Добавляем улучшенные стили
function addEnhancedStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Анимации */
        @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }
        
        @keyframes fire {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
        }
        
        /* Улучшенный loading */
        .loading {
            text-align: center;
            padding: 50px 20px;
        }
        
        .phoenix-animation {
            position: relative;
            width: 100px;
            height: 100px;
            margin: 0 auto 30px;
        }
        
        .fire {
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, #ff6b35 0%, transparent 70%);
            border-radius: 50%;
            animation: fire 1.5s infinite;
        }
        
        .bird {
            position: absolute;
            font-size: 50px;
            animation: pulse 2s infinite;
        }
        
        .query-preview {
            font-style: italic;
            color: #ff8e53;
            margin: 15px 0;
            font-size: 1.1em;
        }
        
        .loading-text {
            opacity: 0.8;
            margin-top: 20px;
        }
        
        .pulse {
            width: 10px;
            height: 10px;
            background: #ff6b35;
            border-radius: 50%;
            margin: 20px auto;
            animation: pulse 1s infinite;
        }
        
        /* Улучшенный результат */
        .query-display {
            background: rgba(255, 107, 53, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 15px;
            border-left: 4px solid #ff6b35;
        }
        
        .query-icon {
            font-size: 1.5em;
        }
        
        .timestamp {
            font-size: 0.8em;
            opacity: 0.7;
        }
        
        .essence-section,
        .resonance-section,
        .step-section {
            margin-bottom: 25px;
            padding: 20px;
            border-radius: 12px;
            transition: transform 0.3s ease;
        }
        
        .essence-section:hover,
        .resonance-section:hover,
        .step-section:hover {
            transform: translateY(-5px);
        }
        
        .essence-section {
            background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 209, 102, 0.1) 100%);
            border: 1px solid rgba(255, 107, 53, 0.2);
        }
        
        .resonance-section {
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%);
            border: 1px solid rgba(255, 107, 53, 0.3);
        }
        
        .step-section {
            background: linear-gradient(135deg, rgba(255, 209, 102, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%);
            border: 1px solid rgba(255, 209, 102, 0.3);
        }
        
        .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin: 30px 0;
        }
        
        .action-btn {
            flex: 1;
            min-width: 150px;
            padding: 16px 20px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            font-size: 0.95em;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .deepen-btn {
            background: linear-gradient(45deg, #ff6b35, #ff8e53);
            color: white;
        }
        
        .save-btn {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 2px solid #ff6b35;
        }
        
        .ritual-btn {
            background: linear-gradient(45deg, #1a1a2e, #16213e);
            color: white;
            border: 2px solid #ffd166;
        }
        
        .action-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
        }
        
        .btn-icon {
            font-size: 1.2em;
        }
        
        .footer-note {
            text-align: center;
            font-size: 0.9em;
            opacity: 0.7;
            font-style: italic;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Ошибка */
        .error-state {
            text-align: center;
            padding: 50px 20px;
        }
        
        .error-icon {
            font-size: 3em;
            margin-bottom: 20px;
            animation: pulse 2s infinite;
        }
        
        .retry-btn {
            margin-top: 20px;
            padding: 12px 30px;
            background: #ff6b35;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        /* Ритуал */
        .ritual-transition {
            text-align: center;
            padding: 30px;
            margin-top: 30px;
            background: rgba(26, 26, 46, 0.5);
            border-radius: 15px;
            border: 2px dashed #ffd166;
        }
        
        .countdown {
            font-size: 3em;
            font-weight: bold;
            color: #ff6b35;
            margin: 20px;
        }
        
        /* Адаптивность */
        @media (max-width: 768px) {
            .input-group {
                flex-direction: column;
            }
            
            #searchBtn {
                width: 100%;
            }
            
            .actions {
                flex-direction: column;
            }
            
            .action-btn {
                width: 100%;
            }
            
            h1 {
                font-size: 2.2rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Добавляем класс PhoenixSearch (заглушка)
class PhoenixSearch {
    async search(query) {
        // Временная заглушка
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const responses = [
            {
                essence: "Твой вопрос — не дыра в знании, а приглашение к росту. Ответы приходят не извне, а из глубины твоего собственного вопрошающего присутствия.",
                resonance: "Если бы твой вопрос был проводником, куда бы он тебя привёл?",
                step: "Практика 'Вопрошающее молчание': 7 минут просто быть с вопросом без поиска ответа.",
                type: "философский"
            },
            {
                essence: "Информация питает ум, смыслы питают душу. Ты ищешь не данные, а переживание истины, которое изменит твой способ бытия.",
                resonance: "Какой частью себя ты задаёшь этот вопрос?",
                step: "Ритуал 'Три дыхания': на вдохе — вопрос, на задержке — тишина, на выдохе — доверие.",
                type: "интуитивный"
            },
            {
                essence: "Внешние ответы — это карты чужого путешествия. Твой путь уникален, и его карта рисуется только в движении.",
                resonance: "Что изменится, если ты не получишь ответ, а станешь им?",
                step: "Медитация 'Воплощение': представь, что ты уже являешься живым ответом на свой вопрос.",
                type: "практический"
            }
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
}
