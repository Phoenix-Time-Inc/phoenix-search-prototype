// app.js - Феникс-Поиск v3.1 с коллективной мудростью
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Феникс-Поиск: Живой диалог с коллективным разумом');
    
    // ЭЛЕМЕНТЫ ИНТЕРФЕЙСА
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultSection = document.getElementById('resultSection');
    const responseContainer = document.getElementById('responseContainer');
    const initialState = document.getElementById('initialState');
    const exampleTags = document.querySelectorAll('.tag');
    
    // ИНИЦИАЛИЗАЦИЯ ПОИСКОВОЙ СИСТЕМЫ
    const phoenix = new PhoenixSearch();
    let currentSessionId = Date.now();
    
    // ====================
    // ОСНОВНЫЕ ФУНКЦИИ
    // ====================
    
    // 1. ВЫПОЛНЕНИЕ ПОИСКА
    async function performSearch(query) {
        console.log('🔍 Поиск запущен:', query);
        
        if (!query || query.trim().length < 2) {
            showError('Задай вопрос хотя бы из 2-х символов... даже "я?" уже начало пути');
            return;
        }
        
        // Показываем состояние загрузки
        showLoading(query);
        
        try {
            // Имитируем "глубокий поиск"
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
            
            // Получаем ответ от ИИ
            const response = await phoenix.search(query);
            
            console.log('✅ Ответ получен, коллективные данные:', response.collective);
            
            // Показываем результат
            showResponse(query, response);
            
            // Сохраняем в историю
            saveToHistory(query, response);
            
            // Генерируем следующий вопрос для углубления
            setTimeout(() => {
                suggestNextQuestion(query, response);
            }, 1000);
            
        } catch (error) {
            console.error('Ошибка поиска:', error);
            showError(`Путь временно закрыт: ${error.message}. Попробуй перефразировать вопрос.`);
        }
    }
    
    // 2. ПОКАЗ ЗАГРУЗКИ
    function showLoading(query) {
        initialState.style.display = 'none';
        responseContainer.style.display = 'block';
        responseContainer.innerHTML = `
            <div class="loading-state">
                <div class="searching-animation">
                    <div class="pulse-circle"></div>
                    <div class="pulse-circle delay-1"></div>
                    <div class="pulse-circle delay-2"></div>
                    <div class="phoenix-center">🦅</div>
                </div>
                <h3>ПОГРУЖАЕМСЯ В ГЛУБИНУ</h3>
                <p class="query-in-process">"${escapeHtml(query)}"</p>
                <div class="search-steps">
                    <div class="step active">Анализирую суть...</div>
                    <div class="step">Ищу резонансные паттерны...</div>
                    <div class="step">Связываюсь с коллективным разумом...</div>
                    <div class="step">Формулирую практику...</div>
                </div>
                <p class="loading-hint">Истинные ответы приходят не сразу — они зреют в тишине.</p>
            </div>
        `;
        
        // Анимируем шаги поиска
        animateSearchSteps();
    }
    
    // 3. ПОКАЗ ОТВЕТА (С КОЛЛЕКТИВНОЙ МУДРОСТЬЮ)
    function showResponse(query, response) {
        const timestamp = new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // HTML для коллективной мудрости
        const collectiveHTML = response.collective && response.collective.peopleCount > 0 ? `
            <div class="collective-wisdom">
                <div class="collective-header">
                    <span class="collective-icon">🌍</span>
                    <h4>КОЛЛЕКТИВНЫЙ РАЗУМ</h4>
                </div>
                <div class="collective-content">
                    <p class="collective-stats">
                        <span class="people-count">${response.collective.peopleCount}+</span> 
                        человек искали ответ на похожий вопрос
                    </p>
                    ${response.collective.message ? 
                        `<p class="collective-message">${response.collective.message}</p>` : ''}
                    ${response.collective.similarQuestions && response.collective.similarQuestions.length > 0 ? `
                        <div class="similar-questions">
                            <p>Похожие вопросы других искателей:</p>
                            <ul>
                                ${response.collective.similarQuestions.map(q => 
                                    `<li title="${escapeHtml(q.query)}">${escapeHtml(q.query.substring(0, 60))}...</li>`
                                ).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        ` : '';
        
        responseContainer.innerHTML = `
            <div class="response-view">
                <div class="response-header">
                    <span class="response-type ${response.type}">${getTypeIcon(response.type)} ${response.type ? response.type.toUpperCase() : 'ОТВЕТ'}</span>
                    <span class="response-time">🕊️ ${timestamp}</span>
                </div>
                
                <div class="original-query">
                    <div class="query-icon">🎯</div>
                    <div class="query-text">${escapeHtml(query)}</div>
                </div>
                
                <div class="response-sections">
                    <div class="section essence-section">
                        <div class="section-header">
                            <span class="section-icon">🦅</span>
                            <h4>СУТЬ</h4>
                        </div>
                        <div class="section-content">
                            <p>${escapeHtml(response.essence || 'Ответ формируется...')}</p>
                        </div>
                    </div>
                    
                    <div class="section resonance-section">
                        <div class="section-header">
                            <span class="section-icon">🔥</span>
                            <h4>РЕЗОНАНС</h4>
                        </div>
                        <div class="section-content">
                            <p><em>${escapeHtml(response.resonance || 'Что этот вопрос открывает в тебе?')}</em></p>
                        </div>
                    </div>
                    
                    <div class="section practice-section">
                        <div class="section-header">
                            <span class="section-icon">🧭</span>
                            <h4>ПРАКТИКА</h4>
                        </div>
                        <div class="section-content">
                            <p>${escapeHtml(response.step || 'Сделай паузу на 3 дыхания и почувствуй, куда ведёт тебя этот вопрос.')}</p>
                            <div class="practice-timer">
                                <span class="timer-icon">⏳</span>
                                <span>5-10 минут</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${collectiveHTML}
                
                <div class="response-actions">
                    <button class="action-btn deepen-action" data-query="${escapeHtml(query)}">
                        <span class="action-icon">⚡</span> УГЛУБИТЬ
                    </button>
                    <button class="action-btn save-action" data-query="${escapeHtml(query)}" data-essence="${escapeHtml(response.essence || '').substring(0, 50)}">
                        <span class="action-icon">💾</span> СОХРАНИТЬ
                    </button>
                    <button class="action-btn ritual-action" data-type="${response.type || 'глубинный'}">
                        <span class="action-icon">🌀</span> РИТУАЛ
                    </button>
                </div>
                
                <div class="response-footer">
                    <p class="insight-note">Этот ответ — начало диалога, а не его конец.</p>
                </div>
            </div>
        `;
        
        // Плавное появление
        setTimeout(() => {
            const responseView = responseContainer.querySelector('.response-view');
            if (responseView) {
                responseView.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                responseView.style.opacity = '1';
                responseView.style.transform = 'translateY(0)';
            }
        }, 50);
        
        // Привязываем обработчики кнопок
        bindResponseButtons();
        
        // Прокручиваем к результату
        setTimeout(() => {
            resultSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 300);
        
        console.log('✅ Ответ отображён с коллективной мудростью');
    }
    
    // 4. ПРЕДЛОЖЕНИЕ СЛЕДУЮЩЕГО ВОПРОСА
    function suggestNextQuestion(originalQuery, response) {
        const suggestions = [
            `Что стоит за моим вопросом "${originalQuery}"?`,
            `Как ${originalQuery.toLowerCase()} связано с моим призванием?`,
            `Если бы "${originalQuery}" был ключом, какую дверь он открывает?`,
            `Какой противоположный вопрос скрывается в "${originalQuery}"?`,
            `Что я не спрашиваю, когда спрашиваю "${originalQuery}"?`
        ];
        
        const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        
        const suggestionEl = document.createElement('div');
        suggestionEl.className = 'next-question-suggestion';
        suggestionEl.innerHTML = `
            <div class="suggestion-header">
                <span class="suggestion-icon">💡</span>
                <h4>ВОПРОС ДЛЯ УГЛУБЛЕНИЯ</h4>
            </div>
            <p class="suggestion-text">${escapeHtml(suggestion)}</p>
            <button class="suggestion-btn" onclick="useSuggestion('${escapeHtml(suggestion).replace(/'/g, "\\'")}')">
                ИСПОЛЬЗОВАТЬ ДЛЯ ПОИСКА
            </button>
        `;
        
        responseContainer.querySelector('.response-footer').appendChild(suggestionEl);
    }
    
    // 5. ОБРАБОТКА ОШИБОК
    function showError(message) {
        responseContainer.style.display = 'block';
        responseContainer.innerHTML = `
            <div class="error-state">
                <div class="error-icon">🌀</div>
                <h3>ПУТЬ ПРЕРВАЛСЯ</h3>
                <p class="error-message">${escapeHtml(message)}</p>
                <div class="error-actions">
                    <button class="retry-btn" onclick="retrySearch()">ПОПРОБОВАТЬ СНОВА</button>
                    <button class="simplify-btn" onclick="simplifyQuestion()">УПРОСТИТЬ ВОПРОС</button>
                </div>
            </div>
        `;
    }
    
    // ====================
    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
    // ====================
    
    function animateSearchSteps() {
        const steps = document.querySelectorAll('.search-steps .step');
        let current = 0;
        
        const interval = setInterval(() => {
            if (current > 0) steps[current - 1].classList.remove('active');
            if (current < steps.length) {
                steps[current].classList.add('active');
                current++;
            } else {
                clearInterval(interval);
            }
        }, 600);
    }
    
    function getTypeIcon(type) {
        const icons = {
            'глубинный': '🦅',
            'практический': '🛠️',
            'философский': '🌀',
            'эмоциональный': '💖',
            'интуитивный': '🔮',
            'исследование': '🧪',
            'резервный': '🛡️'
        };
        return icons[type] || '✨';
    }
    
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function saveToHistory(query, response) {
        const history = JSON.parse(localStorage.getItem('phoenixHistory') || '[]');
        history.unshift({
            id: Date.now(),
            query,
            response,
            collective: response.collective,
            timestamp: new Date().toISOString()
        });
        
        if (history.length > 20) history.pop();
        localStorage.setItem('phoenixHistory', JSON.stringify(history));
    }
    
    // Привязка обработчиков кнопок
    function bindResponseButtons() {
        // Кнопка "Углубить"
        document.querySelectorAll('.deepen-action').forEach(btn => {
            btn.onclick = function() {
                const query = this.getAttribute('data-query');
                const deepenVariants = [
                    `Раскрой суть вопроса "${query}" еще глубже`,
                    `Что является корневой причиной вопроса "${query}"?`,
                    `Как ${query} связано с моей жизненной миссией?`
                ];
                const newQuery = deepenVariants[Math.floor(Math.random() * deepenVariants.length)];
                searchInput.value = newQuery;
                performSearch(newQuery);
            };
        });
        
        // Кнопка "Сохранить"
        document.querySelectorAll('.save-action').forEach(btn => {
            btn.onclick = function() {
                const query = this.getAttribute('data-query');
                const essence = this.getAttribute('data-essence');
                alert(`💾 Сохранено в "Сокровищницу Феникса":\n\nВопрос: ${query}\n\nСуть: ${essence}...`);
            };
        });
        
        // Кнопка "Ритуал"
        document.querySelectorAll('.ritual-action').forEach(btn => {
            btn.onclick = function() {
                const type = this.getAttribute('data-type');
                startRitual(type);
            };
        });
    }
    
    // Функция запуска ритуала
    function startRitual(type) {
        const rituals = {
            'глубинный': '🌀 Ритуал "Погружение в Суть"',
            'практический': '🛠️ Практика "Воплощение Действия"',
            'эмоциональный': '💖 Церемония "Исцеление Сердца"',
            'философский': '🧠 Медитация "Бесконечность Вопроса"',
            'исследование': '🔍 Практика "Картография Смыслов"'
        };
        
        const ritual = rituals[type] || '🌀 Базовая практика осознанности';
        
        // Показываем активацию
        const ritualHTML = `
            <div class="ritual-activation">
                <div class="ritual-header">
                    <span class="ritual-icon">🔥</span>
                    <h4>АКТИВАЦИЯ РИТУАЛА</h4>
                </div>
                <p>Запускаю <strong>${ritual}</strong>...</p>
                <div class="countdown">3</div>
                <p class="ritual-instruction">Закрой глаза и следи за дыханием. Ритуал начнётся через:</p>
            </div>
        `;
        
        // Добавляем к текущему ответу
        responseContainer.insertAdjacentHTML('beforeend', ritualHTML);
        
        // Анимация обратного отсчёта
        let count = 3;
        const countdownEl = responseContainer.querySelector('.countdown');
        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownEl.textContent = count;
            } else {
                clearInterval(interval);
                document.querySelector('.ritual-activation').innerHTML = `
                    <div style="text-align:center; padding:20px;">
                        <span style="font-size:2em;">🌀</span><br>
                        <strong>Ритуал активирован</strong><br>
                        <em>Продолжай в пространстве Феникс-Тайм</em><br><br>
                        <button onclick="continueSearch()" style="background:#ff6b35; color:white; border:none; padding:10px 20px; border-radius:8px; cursor:pointer;">
                            Вернуться к поиску
                        </button>
                    </div>
                `;
            }
        }, 1000);
    }
    
    // ====================
    // ОБРАБОТЧИКИ СОБЫТИЙ
    // ====================
    
    // Поиск по кнопке
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value.trim());
    });
    
    // Поиск по Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value.trim());
        }
    });
    
    // Примеры вопросов
    exampleTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const query = tag.getAttribute('data-query');
            searchInput.value = query;
            performSearch(query);
        });
    });
    
    // Автофокус
    setTimeout(() => {
        if (searchInput) searchInput.focus();
    }, 1000);
    
    // ====================
    // ГЛОБАЛЬНЫЕ ФУНКЦИИ
    // ====================
    
    window.useSuggestion = function(suggestion) {
        searchInput.value = suggestion;
        performSearch(suggestion);
    };
    
    window.retrySearch = function() {
        performSearch(searchInput.value.trim());
    };
    
    window.simplifyQuestion = function() {
        const simple = searchInput.value
            .replace(/\?/g, '')
            .replace(/как|что|почему|зачем/gi, '')
            .trim();
        
        if (simple.length > 3) {
            searchInput.value = simple + '?';
            performSearch(searchInput.value);
        } else {
            searchInput.value = 'В чём мой следующий шаг?';
            performSearch(searchInput.value);
        }
    };
    
    window.continueSearch = function() {
        const ritualEl = document.querySelector('.ritual-activation');
        if (ritualEl) ritualEl.remove();
        if (searchInput) searchInput.focus();
    };
    
    console.log('✅ Система инициализирована. Ожидаю вопросы...');
});

// Стили для новых элементов
const injectStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Анимации загрузки */
        .searching-animation {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 30px auto;
        }
        
        .pulse-circle {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid #ff6b35;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        .delay-1 { animation-delay: 0.3s; opacity: 0.7; }
        .delay-2 { animation-delay: 0.6s; opacity: 0.4; }
        
        .phoenix-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
        }
        
        @keyframes pulse {
            0% { transform: scale(0.8); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 0.3; }
            100% { transform: scale(0.8); opacity: 0.7; }
        }
        
        .query-in-process {
            font-style: italic;
            color: #ff8e53;
            font-size: 1.2rem;
            margin: 15px 0;
        }
        
        .search-steps {
            margin: 25px auto;
            max-width: 400px;
        }
        
        .step {
            padding: 10px;
            margin: 8px 0;
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
            opacity: 0.5;
            transition: all 0.3s ease;
        }
        
        .step.active {
            opacity: 1;
            background: rgba(255,107,53,0.1);
            border-left: 3px solid #ff6b35;
        }
        
        /* Ответы */
        .response-view {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        }
        
        .response-type {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
        }
        
        .глубинный { background: rgba(255,107,53,0.2); color: #ff6b35; }
        .практический { background: rgba(66,153,225,0.2); color: #4299e1; }
        .философский { background: rgba(159,122,234,0.2); color: #9f7aea; }
        .эмоциональный { background: rgba(236,112,99,0.2); color: #ec7063; }
        .исследование { background: rgba(46,204,113,0.2); color: #2ecc71; }
        
        .original-query {
            background: linear-gradient(90deg, rgba(255,107,53,0.1), transparent);
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .query-icon { font-size: 1.5rem; }
        .query-text { font-size: 1.2rem; font-weight: 500; }
        
        .response-sections {
            display: grid;
            gap: 25px;
            margin: 30px 0;
        }
        
        .section {
            background: rgba(26,26,46,0.7);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 25px;
            transition: transform 0.3s ease;
        }
        
        .section:hover {
            transform: translateY(-5px);
        }
        
        .section-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .section-icon {
            font-size: 1.8rem;
        }
        
        .essence-section { border-top: 4px solid #ff6b35; }
        .resonance-section { border-top: 4px solid #ffd166; }
        .practice-section { border-top: 4px solid #0ea5e9; }
        
        .practice-timer {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(14,165,233,0.1);
            padding: 8px 15px;
            border-radius: 20px;
            margin-top: 15px;
        }
        
        /* КОЛЛЕКТИВНАЯ МУДРОСТЬ */
        .collective-wisdom {
            background: linear-gradient(135deg, 
                rgba(26, 26, 46, 0.95), 
                rgba(41, 128, 185, 0.15));
            border: 1px solid rgba(52, 152, 219, 0.4);
            border-radius: 16px;
            padding: 25px;
            margin: 30px 0 20px 0;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
        }
        
        .collective-wisdom::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, 
                #3498db, #9b59b6, #e74c3c, #f1c40f);
            animation: gradientShift 8s infinite alternate;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
        
        .collective-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .collective-icon {
            font-size: 2.2rem;
            animation: pulse 3s infinite;
            filter: drop-shadow(0 0 8px rgba(52, 152, 219, 0.5));
        }
        
        .collective-header h4 {
            margin: 0;
            background: linear-gradient(45deg, #3498db, #9b59b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 1.4rem;
        }
        
        .collective-stats {
            font-size: 1.2rem;
            margin: 15px 0;
            padding: 15px;
            background: rgba(52, 152, 219, 0.1);
            border-radius: 12px;
            border-left: 4px solid #3498db;
        }
        
        .people-count {
            font-size: 2.8rem;
            font-weight: 900;
            background: linear-gradient(45deg, #3498db, #9b59b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-right: 10px;
            text-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
        }
        
        .collective-message {
            font-style: italic;
            padding: 18px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            margin: 20px 0;
            border: 1px solid rgba(155, 89, 182, 0.3);
            font-size: 1.1rem;
            line-height: 1.5;
        }
        
        .similar-questions {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px dashed rgba(255, 255, 255, 0.2);
        }
        
        .similar-questions > p {
            font-size: 1.1rem;
            opacity: 0.9;
            margin-bottom: 15px;
            color: #ffd166;
        }
        
        .similar-questions ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
        }
        
        .similar-questions li {
            padding: 14px 18px;
            margin: 10px 0;
            background: rgba(255, 255, 255, 0.03);
            border-left: 4px solid #9b59b6;
            border-radius: 10px;
            transition: all 0.3s ease;
            cursor: default;
            position: relative;
            overflow: hidden;
        }
        
        .similar-questions li::before {
            content: '👤';
            margin-right: 12px;
            opacity: 0.7;
        }
        
        .similar-questions li:hover {
            transform: translateX(8px);
            background: rgba(155, 89, 182, 0.15);
            box-shadow: 0 5px 20px rgba(155, 89, 182, 0.2);
        }
        
        .similar-questions li:hover::before {
            opacity: 1;
            transform: scale(1.2);
        }
        
        /* Кнопки действий */
        .response-actions {
            display: flex;
            gap: 15px;
            margin: 30px 0;
        }
        
        .action-btn {
            flex: 1;
            padding: 18px 10px;
            border: none;
            border-radius: 12px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            transition: all 0.3s ease;
        }
        
        .deepen-action { 
            background: linear-gradient(45deg, #ff6b35, #ff8e53);
            color: white;
        }
        
        .save-action {
            background: transparent;
            border: 2px solid #ff6b35;
            color: #ff6b35;
        }
        
        .ritual-action {
            background: linear-gradient(45deg, #1a1a2e, #16213e);
            border: 2px solid #ffd166;
            color: #ffd166;
        }
        
        .action-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(255,107,53,0.3);
        }
        
        /* Следующий вопрос */
        .next-question-suggestion {
            background: linear-gradient(135deg, rgba(255,209,102,0.1), rgba(255,107,53,0.05));
            border: 1px dashed #ffd166;
            border-radius: 15px;
            padding: 25px;
            margin-top: 25px;
        }
        
        .suggestion-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 15px;
        }
        
        .suggestion-text {
            font-size: 1.1rem;
            font-style: italic;
            margin-bottom: 20px;
        }
        
        .suggestion-btn {
            background: transparent;
            border: 2px solid #ff6b35;
            color: #ff6b35;
            padding: 12px 25px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            width: 100%;
        }
        
        /* Ошибки */
        .error-state {
            text-align: center;
            padding: 40px 20px;
        }
        
        .error-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            animation: pulse 2s infinite;
        }
        
        .error-message {
            font-size: 1.1rem;
            margin: 25px 0;
            color: #ffd166;
        }
        
        .error-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
        }
        
        .retry-btn, .simplify-btn {
            padding: 12px 25px;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .retry-btn {
            background: #ff6b35;
            color: white;
            border: none;
        }
        
        .simplify-btn {
            background: transparent;
            border: 2px solid #ff6b35;
            color: #ff6b35;
        }
        
        /* Ритуал */
        .ritual-activation {
            text-align: center;
            padding: 30px;
            background: rgba(26,26,46,0.9);
            border-radius: 15px;
            margin-top: 30px;
            border: 2px solid #ffd166;
        }
        
        .ritual-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .countdown {
            font-size: 4rem;
            font-weight: bold;
            color: #ff6b35;
            margin: 20px 0;
        }
        
        /* Адаптивность */
        @media (max-width: 768px) {
            .response-actions {
                flex-direction: column;
            }
            
            .error-actions {
                flex-direction: column;
            }
            
            .searching-animation {
                width: 120px;
                height: 120px;
            }
            
            .collective-wisdom {
                padding: 20px;
                margin: 20px 0;
            }
            
            .people-count {
                font-size: 2.2rem;
            }
            
            .collective-header {
                flex-direction: column;
                text-align: center;
                gap: 10px;
            }
            
            .similar-questions li {
                padding: 12px 15px;
                font-size: 0.95rem;
            }
        }
    `;
    document.head.appendChild(style);
};

// Встраиваем стили при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectStyles);
} else {
    injectStyles();
}

// ========= НАЧАЛО ВСТАВКИ В app.js =========
// Тестовая функция для проверки API
async function testPhoenixAPI() {
    const testQuery = 'призвание';
    console.log('🧪 Тестирую API с запросом:', testQuery);
    
    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query: testQuery})
        });
        
        const data = await response.json();
        console.log('📊 Результат теста:', data);
        
        if (data.success) {
            console.log('🎉 API работает! Ответ:', data.answer);
            return true;
        } else {
            console.log('⚠️ API ответил с ошибкой');
            return false;
        }
    } catch (error) {
        console.error('🔥 Ошибка теста API:', error);
        return false;
    }
}

// Автоматический тест при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('🔄 Запускаю автоматический тест API...');
        testPhoenixAPI();
    }, 2000);
});
// ========= КОНЕЦ ВСТАВКИ =========
