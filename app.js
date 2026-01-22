document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultSection = document.getElementById('resultSection');
    
    // Примеры вопросов для вдохновения
    const examples = [
        "Как найти своё призвание?",
        "Почему я прокрастинирую?",
        "В чём смысл боли?",
        "Как перестать бояться?",
        "Что такое настоящая свобода?"
    ];
    
    let exampleIndex = 0;
    
    // Анимация примеров в placeholder
    function cycleExamples() {
        searchInput.placeholder = examples[exampleIndex];
        exampleIndex = (exampleIndex + 1) % examples.length;
    }
    
    setInterval(cycleExamples, 3000);
    
    // Обработчик поиска
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
    
    async function performSearch() {
        const query = searchInput.value.trim();
        if (!query) return;
        
        // Показываем состояние загрузки
        resultSection.innerHTML = `
            <div class="loading">
                <h3>🦾 ИЩЕМ НЕ ОТВЕТ, А ПУТЬ...</h3>
                <div class="spinner"></div>
                <p>Готовим резонансный ответ специально для вас</p>
            </div>
        `;
        resultSection.style.display = 'block';
        
        // Имитация работы с ИИ (пока без реального API)
        setTimeout(() => {
            generateResonanceResponse(query);
        }, 1500);
    }
    
    function generateResonanceResponse(query) {
        // Это временная функция-заглушка
        // В реальности здесь будет вызов моего API
        
        const responses = {
            "призвание": {
                essence: "Призвание — не пункт назначения, а способ путешествия. Это не то, что ты найдёшь, а то, что проявится, когда ты начнёшь действовать из своей глубинной целостности.",
                resonance: "Какое действие, даже самое маленькое, зажигает в тебе чувство 'я на своём месте'?",
                nextStep: "Практика 'След мастера': неделю посвяти 15 минут в день делу, которое делает тешь собой без усилий.",
                type: "глубинный"
            },
            "прокрастинация": {
                essence: "Прокрастинация — не лень, а мудрость подсознания, которое отказывается тратить энергию на то, что не резонирует с твоей истинной природой.",
                resonance: "Что стоит за тем делом, которое ты откладываешь? Страх неудачи или признание его неважности для твоей души?",
                nextStep: "Ритуал 'Диалог с Сопротивлением': спроси своё сопротивление, что оно пытается защитить в тебе.",
                type: "практический"
            },
            "смысл": {
                essence: "Смысл — не объект для обнаружения, а качество присутствия. Он рождается в том, как ты встречаешь каждый момент, а не в том, что ты в нём находишь.",
                resonance: "В какой момент за последнюю неделю ты чувствовал себя полностью живым? Что происходило в тот момент?",
                nextStep: "Практика 'Сакрализация обыденного': выбери одно рутинное действие и соверши его как священный ритуал.",
                type: "экзистенциальный"
            }
        };
        
        // Определяем тип запроса
        let response;
        if (query.toLowerCase().includes("призвание")) response = responses["призвание"];
        else if (query.toLowerCase().includes("прокрастинация")) response = responses["прокрастинация"];
        else if (query.toLowerCase().includes("смысл")) response = responses["смысл"];
        else {
            // Общий ответ
            response = {
                essence: `Твой вопрос "${query}" касается чего-то важного. Истинный ответ всегда находится не вовне, а в том, как вопрос резонирует в твоей глубине.`,
                resonance: "Что в этом вопросе самое живое для тебя прямо сейчас?",
                nextStep: "Попробуй переформулировать вопрос как исследование, а не как поиск ответа.",
                type: "исследование"
            };
        }
        
        // Отображаем ответ
        resultSection.innerHTML = `
            <div class="response">
                <div class="response-header">
                    <span class="type-badge">${response.type}</span>
                    <h3>🦅 СУТЬ ВОПРОСА</h3>
                </div>
                <div class="essence">
                    <p>${response.essence}</p>
                </div>
                
                <div class="resonance">
                    <h4>🔥 РЕЗОНАНС</h4>
                    <p>${response.resonance}</p>
                </div>
                
                <div class="next-step">
                    <h4>🧭 СЛЕДУЮЩИЙ ШАГ</h4>
                    <p>${response.nextStep}</p>
                </div>
                
                <div class="actions">
                    <button class="action-btn" onclick="this.innerHTML='🦅 Путь углубляется...'">УГЛУБИТЬ ПОИСК</button>
                    <button class="action-btn secondary" onclick="this.innerHTML='🔥 Ритуал активирован...'">ПЕРЕЙТИ В ФЕНИКС ТАЙМ</button>
                </div>
            </div>
        `;
        
        // Добавляем стили для ответа
        const style = document.createElement('style');
        style.textContent = `
            .response-header {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 25px;
            }
            
            .type-badge {
                background: rgba(255, 107, 53, 0.2);
                color: var(--phoenix-orange);
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
            }
            
            .essence {
                font-size: 1.2rem;
                margin-bottom: 30px;
                padding-left: 10px;
                border-left: 3px solid var(--phoenix-orange);
            }
            
            .resonance, .next-step {
                background: rgba(255, 209, 102, 0.1);
                padding: 20px;
                border-radius: 12px;
                margin-bottom: 20px;
                border: 1px solid rgba(255, 209, 102, 0.2);
            }
            
            .resonance h4, .next-step h4 {
                color: var(--phoenix-gold);
                margin-bottom: 10px;
            }
            
            .actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
            }
            
            .action-btn {
                flex: 1;
                padding: 15px;
                background: linear-gradient(45deg, var(--phoenix-orange), #ff8e53);
                color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-weight: bold;
                transition: transform 0.3s ease;
            }
            
            .action-btn.secondary {
                background: transparent;
                border: 2px solid var(--phoenix-orange);
            }
            
            .action-btn:hover {
                transform: translateY(-2px);
            }
            
            .loading {
                text-align: center;
                padding: 40px;
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255, 107, 53, 0.3);
                border-top-color: var(--phoenix-orange);
                border-radius: 50%;
                margin: 20px auto;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        resultSection.appendChild(style);
    }
});
