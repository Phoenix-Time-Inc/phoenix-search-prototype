// phoenix.js v5.2 - С коллективной мудростью
class PhoenixSearch {
    constructor() {
        this.sessionId = 'phoenix-' + Date.now();
        this.conversationDepth = 0;
        
        // Динамическое определение URL API
        this.apiBaseUrl = this.detectApiUrl();
        
        console.log(`🦅 Феникс-ИИ v5.2`);
        console.log(`🌐 API URL: ${this.apiBaseUrl}`);
        console.log(`🆔 Сессия: ${this.sessionId}`);
        
        // История диалога
        this.conversationHistory = this.loadConversationHistory();
        
        // Статистика
        this.stats = {
            totalSearches: 0,
            apiSuccess: 0,
            localFallback: 0,
            errors: 0
        };
    }
    
    detectApiUrl() {
        // Если мы на Vercel - используем текущий origin
        if (window.location.hostname.includes('vercel.app')) {
            return window.location.origin;
        }
        
        // Если на GitHub Pages - используем Vercel деплой
        if (window.location.hostname.includes('github.io')) {
            return 'https://phoenix-search-prototype.vercel.app';
        }
        
        // Для локальной разработки
        return 'http://localhost:3000';
    }
    
    async search(query) {
        this.conversationDepth++;
        this.stats.totalSearches++;
        
        console.log(`🔍 Поиск #${this.stats.totalSearches} (глубина ${this.conversationDepth}):`, query);
        
        // Добавляем в историю
        this.addToHistory('user', query);
        
        try {
            // Пытаемся получить ответ от сервера
            const response = await this.fetchFromAPI(query);
            
            // Успех API
            this.stats.apiSuccess++;
            
            // Добавляем ответ в историю
            this.addToHistory('assistant', response.essence);
            
            // Сохраняем историю
            this.saveConversationHistory();
            
            // Логируем статистику
            this.logStats();
            
            // ВОЗВРАЩАЕМ ОТВЕТ С КОЛЛЕКТИВНОЙ МУДРОСТЬЮ
            return {
                ...response,
                collective: response.collective || this.generateCollectiveWisdom(query)
            };
            
        } catch (error) {
            console.warn('⚠️ Ошибка API, использую локальную мудрость:', error.message);
            
            // Увеличиваем счётчик ошибок
            this.stats.errors++;
            
            // Fallback на локальную мудрость
            const localResponse = this.getLocalResponse(query);
            
            // Увеличиваем счётчик локальных ответов
            this.stats.localFallback++;
            
            // Добавляем в историю
            this.addToHistory('assistant', localResponse.essence);
            
            // Логируем статистику
            this.logStats();
            
            // Возвращаем с коллективной мудростью
            return {
                ...localResponse,
                collective: this.generateCollectiveWisdom(query)
            };
        }
    }
    
    async fetchFromAPI(query) {
        // Формируем тело запроса
        const requestBody = {
            query: query,
            context: this.getRecentContext(2), // Последние 2 вопроса
            sessionId: this.sessionId,
            depth: this.conversationDepth
        };
        
        console.log('📤 Отправляю запрос на API:', {
            url: `${this.apiBaseUrl}/api/search`,
            body: requestBody
        });
        
        // Таймаут 10 секунд
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Phoenix-Session': this.sessionId
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error('API вернул неуспешный ответ');
            }
            
            console.log(`✅ Ответ от ${data.source || 'неизвестного источника'}`);
            console.log('📊 Коллективные данные:', data.collective);
            
            return {
                essence: data.response.essence,
                resonance: data.response.resonance,
                step: data.response.step,
                type: data.response.type,
                collective: data.collective || null
            };
            
        } catch (error) {
            clearTimeout(timeoutId);
            
            // Перебрасываем ошибку для обработки в search()
            throw error;
        }
    }
    
    // Генерация коллективной мудрости
    generateCollectiveWisdom(query) {
        const queryLower = query.toLowerCase();
        let wisdomType = 'general';
        
        if (queryLower.includes('призвание') || queryLower.includes('назначение')) {
            wisdomType = 'purpose';
        } else if (queryLower.includes('прокрастинация') || queryLower.includes('лень')) {
            wisdomType = 'action';
        } else if (queryLower.includes('страх') || queryLower.includes('боюсь')) {
            wisdomType = 'fear';
        } else if (queryLower.includes('смысл') || queryLower.includes('жизнь')) {
            wisdomType = 'meaning';
        } else if (queryLower.includes('любовь') || queryLower.includes('отношен')) {
            wisdomType = 'love';
        }
        
        // База коллективной мудрости
        const wisdomBase = {
            'purpose': {
                peopleCount: Math.floor(Math.random() * 200) + 50,
                message: `${Math.floor(Math.random() * 200) + 50} человек искали своё призвание`,
                similarQuestions: [
                    { query: "Как найти своё истинное предназначение в жизни?" },
                    { query: "В чём моя жизненная миссия?" },
                    { query: "Как понять, чем мне действительно стоит заниматься?" }
                ]
            },
            'action': {
                peopleCount: Math.floor(Math.random() * 300) + 100,
                message: `${Math.floor(Math.random() * 300) + 100} человек боролись с прокрастинацией`,
                similarQuestions: [
                    { query: "Как перестать откладывать важные дела на потом?" },
                    { query: "Почему мне не хватает мотивации действовать?" },
                    { query: "Как найти энергию для реализации планов?" }
                ]
            },
            'fear': {
                peopleCount: Math.floor(Math.random() * 150) + 30,
                message: `${Math.floor(Math.random() * 150) + 30} человек преодолевали свои страхи`,
                similarQuestions: [
                    { query: "Как перестать бояться неудачи?" },
                    { query: "Почему страх парализует мои действия?" },
                    { query: "Как обрести смелость для изменений?" }
                ]
            },
            'meaning': {
                peopleCount: Math.floor(Math.random() * 500) + 200,
                message: `${Math.floor(Math.random() * 500) + 200} человек искали смысл жизни`,
                similarQuestions: [
                    { query: "В чём смысл моего существования?" },
                    { query: "Зачем я живу и куда иду?" },
                    { query: "Как найти глубинный смысл в обычных вещах?" }
                ]
            },
            'love': {
                peopleCount: Math.floor(Math.random() * 180) + 40,
                message: `${Math.floor(Math.random() * 180) + 40} человек искали ответы про любовь`,
                similarQuestions: [
                    { query: "Как найти настоящую любовь?" },
                    { query: "Почему отношения приносят боль?" },
                    { query: "Как научиться любить себя?" }
                ]
            },
            'general': {
                peopleCount: Math.floor(Math.random() * 100) + 20,
                message: `${Math.floor(Math.random() * 100) + 20} человек задавали похожие вопросы`,
                similarQuestions: [
                    { query: "Как найти ответы внутри себя?" },
                    { query: "Почему я чувствую, что чего-то не хватает?" },
                    { query: "Как обрести внутреннюю гармонию?" }
                ]
            }
        };
        
        return wisdomBase[wisdomType] || wisdomBase['general'];
    }
    
    // ======================
    // ЛОКАЛЬНАЯ МУДРОСТЬ
    // ======================
    getLocalResponse(query) {
        console.log('🔄 Генерирую локальный ответ...');
        
        const queryLower = query.toLowerCase();
        let type = 'исследование';
        
        // Определяем тип запроса
        if (queryLower.includes('призвание') || queryLower.includes('назначение') || queryLower.includes('миссия')) {
            type = 'глубинный';
        } else if (queryLower.includes('прокрастинация') || queryLower.includes('лень') || queryLower.includes('откладываю')) {
            type = 'практический';
        } else if (queryLower.includes('страх') || queryLower.includes('боюсь') || queryLower.includes('тревож')) {
            type = 'эмоциональный';
        } else if (queryLower.includes('смысл') || queryLower.includes('зачем') || queryLower.includes('жизнь')) {
            type = 'философский';
        } else if (queryLower.includes('любовь') || queryLower.includes('отношен') || queryLower.includes('сердце')) {
            type = 'эмоциональный';
        }
        
        // База ответов с вариациями
        const responseTemplates = {
            'глубинный': [
                {
                    essence: `Призвание — не то, что ты находишь, а то, как ты ищешь. Твой вопрос "${query}" показывает, что путь уже начался.`,
                    resonance: 'Что бы ты делал, даже если бы никто никогда об этом не узнал?',
                    step: 'Упражнение "Идеальный день": подробно опиши один свой идеальный день через 5 лет.',
                    type: 'глубинный'
                },
                {
                    essence: `Миссия проявляется в моменте выбора. "${query}" — это такой момент. Каждый раз, когда ты задаёшь его, ты выбираешь глубину.`,
                    resonance: 'Какой самый маленький шаг в направлении ответа ты можешь сделать прямо сейчас?',
                    step: 'Практика "Микродействие": сегодня сделай одно самое маленькое действие, связанное с этой темой.',
                    type: 'глубинный'
                }
            ],
            'практический': [
                {
                    essence: `Энергия появляется там, где есть ясность. "${query}" указывает на место, где ясность нужнее всего.`,
                    resonance: 'Что в этой задаче самое простое, что можно сделать за 2 минуты?',
                    step: 'Метод "Два минуты": сделай только первые 2 минуты самого сложного дела. Остановись.',
                    type: 'практический'
                }
            ],
            'эмоциональный': [
                {
                    essence: `Эмоции — это компас души. "${query}" показывает направление, куда ведёт этот компас.`,
                    resonance: 'Если бы эта эмоция могла говорить, что бы она сказала?',
                    step: 'Медитация "Наблюдение": 5 минут просто наблюдай за эмоцией, не пытаясь её изменить.',
                    type: 'эмоциональный'
                }
            ],
            'философский': [
                {
                    essence: `"${query}" — это дверь. Ответ — не за дверью, а в самом акте её открытия.`,
                    resonance: 'Что происходит внутри, когда ты задаёшь этот вопрос?',
                    step: 'Практика "Быть вопросом": 3 минуты просто будь вопрошающим присутствием.',
                    type: 'философский'
                }
            ],
            'исследование': [
                {
                    essence: `В каждом глубоком вопросе уже есть семя ответа. "${query}" — это почва, где оно может прорасти.`,
                    resonance: 'Какой самый неожиданный ответ мог бы прийти к тебе?',
                    step: 'Техника "Случайные ассоциации": напиши 10 случайных слов и найди связь с вопросом.',
                    type: 'исследование'
                }
            ]
        };
        
        // Выбираем случайный шаблон
        const templates = responseTemplates[type] || responseTemplates['исследование'];
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        // Персонализируем
        return {
            essence: template.essence.replace('${query}', `"${query}"`),
            resonance: template.resonance,
            step: template.step,
            type: template.type,
            source: 'local_wisdom'
        };
    }
    
    // ======================
    // ИСТОРИЯ И СТАТИСТИКА
    // ======================
    addToHistory(role, content) {
        this.conversationHistory.push({
            role: role,
            content: content.substring(0, 500),
            timestamp: new Date().toISOString(),
            depth: this.conversationDepth
        });
        
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }
    }
    
    getRecentContext(count) {
        const userMessages = this.conversationHistory.filter(msg => msg.role === 'user');
        return userMessages.slice(-count).map(msg => ({ query: msg.content }));
    }
    
    loadConversationHistory() {
        try {
            const saved = localStorage.getItem(`phoenixConversation_${this.sessionId}`);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Ошибка загрузки истории:', e);
            return [];
        }
    }
    
    saveConversationHistory() {
        try {
            localStorage.setItem(`phoenixConversation_${this.sessionId}`, 
                JSON.stringify(this.conversationHistory));
        } catch (e) {
            console.error('Ошибка сохранения истории:', e);
        }
    }
    
    logStats() {
        console.log('📊 Статистика:', {
            total: this.stats.totalSearches,
            apiSuccess: this.stats.apiSuccess,
            localFallback: this.stats.localFallback,
            errors: this.stats.errors,
            successRate: Math.round((this.stats.apiSuccess / this.stats.totalSearches) * 100) + '%'
        });
    }
    
    getStats() {
        return {
            ...this.stats,
            sessionId: this.sessionId,
            conversationDepth: this.conversationDepth,
            historyLength: this.conversationHistory.length
        };
    }
    
    clearHistory() {
        this.conversationHistory = [];
        localStorage.removeItem(`phoenixConversation_${this.sessionId}`);
        console.log('🧹 История диалога очищена');
        return true;
    }
}

// Глобальный экспорт
if (typeof window !== 'undefined') {
    window.PhoenixSearch = PhoenixSearch;
    
    // Вспомогательная функция для отладки
    window.getPhoenixStats = function() {
        if (window.phoenixInstance) {
            return window.phoenixInstance.getStats();
        }
        return { error: 'Экземпляр PhoenixSearch не инициализирован' };
    };
}
