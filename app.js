// ===========================================
// ФЕНИКС-ПОИСК v3.0 - ЖИВОЙ ДИАЛОГ
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 ФЕНИКС-ПОИСК: Живой диалог активирован');
    
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
                <p class="query-in-process">"${query}"</p>
                <div class="search-steps">
                    <div class="step active">Анализирую суть...</div>
                    <div class="step">Ищу резонансные паттерны...</div>
                    <div class="step">Формулирую практику...</div>
                </div>
                <p class="loading-hint">Истинные ответы приходят не сразу — они зреют в тишине.</p>
            </div>
        `;
        
        // Анимируем шаги поиска
        animateSearchSteps();
    }
    
    // 3. ПОКАЗ ОТВЕТА
    function showResponse(query, response) {
        const timestamp = new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        responseContainer.innerHTML = `
            <div class="response-view">
                <div class="response-header">
                    <span class="response-type ${response.type}">${getTypeIcon(response.type)} ${response.type.toUpperCase()}</span>
                    <span class="response-time">🕊️ ${timestamp}</span>
                </div>
                
                <div class="original-query">
                    <div class="query-icon">🎯</div>
                    <div class="query-text">${query}</div>
                </div>
                
                <div class="response-sections">
                    <div class="section essence-section">
                        <div class="section-header">
                            <span class="section-icon">🦅</span>
                            <h4>СУТЬ</h4>
                        </div>
                        <div class="section-content">
                            <p>${response.essence}</p>
                        </div>
                    </div>
                    
                    <div class="section resonance-section">
                        <div class="section-header">
                            <span class="section-icon">🔥</span>
                            <h4>РЕЗОНАНС</h4>
                        </div>
                        <div class="section-content">
                            <p><em>${response.resonance}</em></p>
                        </div>
                    </div>
                    
                    <div class="section practice-section">
                        <div class="section-header">
                            <span class="section-icon">🧭</span>
                            <h4>ПРАКТИКА</h4>
