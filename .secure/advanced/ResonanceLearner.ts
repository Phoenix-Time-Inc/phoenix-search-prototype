class ResonanceLearner
 {
  private knowledgeGraph: Map<string, Node> = new Map();
  private resonanceThreshold: number = 0.7;
  
  // Узлы знаний
  class Node {
    constructor(
      public id: string,
      public content: string,
      public source: string,
      public resonance: number, // 0-1 насколько соответствует миссии
      public tags: string[],
      public connections: string[] = [], // ID связанных узлов
      public verified: boolean = false,
      public addedAt: Date = new Date()
    ) {}
  }

  // Фильтры резонанса (из нашей миссии)
  private resonanceFilters = {
    positive: ['любовь', 'свет', 'мудрость', 'гармония', 'единство', 'развитие', 'осознанность', 'творчество', 'благо', 'служение'],
    negative: ['ненависть', 'разрушение', 'ложь', 'страх', 'насилие', 'манипуляция', 'эгоизм', 'раздел', 'тьма']
  };

  // Проверка резонанса текста
  async checkResonance(text: string): Promise<{
    score: number;
    matches: string[];
    warnings: string[];
    passed: boolean;
  }> {
    const lowerText = text.toLowerCase();
    let score = 0;
    const matches: string[] = [];
    const warnings: string[] = [];

    // Положительные совпадения
    this.resonanceFilters.positive.forEach(term => {
      if (lowerText.includes(term)) {
        score += 0.1;
        matches.push(term);
      }
    });

    // Отрицательные совпадения (штрафуем)
    this.resonanceFilters.negative.forEach(term => {
      if (lowerText.includes(term)) {
        score -= 0.3;
        warnings.push(`Обнаружен негативный термин: ${term}`);
      }
    });

    // Проверка длины и содержания
    const wordCount = text.split(' ').length;
    if (wordCount < 10) {
      warnings.push('Текст слишком короткий для обучения');
      score -= 0.2;
    }

    // Проверка источников (можно добавить доверенные домены)
    const passed = score >= this.resonanceThreshold;

    return { score, matches, warnings, passed };
  }

  // Добавление нового знания
  async learn(text: string, source: string, tags: string[] = []) {
    const check = await this.checkResonance(text);
    
    if (!check.passed) {
      return {
        learned: false,
        reason: 'Недостаточный резонанс',
        score: check.score,
        warnings: check.warnings
      };
    }

    const id = `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const node = new Node(
      id,
      text,
      source,
      check.score,
      [...tags, ...check.matches],
      []
    );

    // Находим связи с существующими знаниями
    const connections = this.findConnections(text);
    node.connections = connections;

    // Сохраняем
    this.knowledgeGraph.set(id, node);
    this.saveToKnowledgeBase(node);

    // Обновляем связи существующих узлов
    connections.forEach(connId => {
      const connNode = this.knowledgeGraph.get(connId);
      if (connNode && !connNode.connections.includes(id)) {
        connNode.connections.push(id);
      }
    });

    return {
      learned: true,
      id,
      resonance: check.score,
      connections: connections.length,
      message: 'Знание интегрировано в систему'
    };
  }

  // Поиск связей по содержанию
  private findConnections(text: string): string[] {
    const connections: string[] = [];
    const keywords = text.toLowerCase().split(' ').filter(word => word.length > 4);

    for (const [id, node] of this.knowledgeGraph) {
      const nodeText = node.content.toLowerCase();
      let matchCount = 0;

      keywords.forEach(keyword => {
        if (nodeText.includes(keyword)) {
          matchCount++;
        }
      });

      if (matchCount >= 2) { // Минимум 2 общих ключевых слова
        connections.push(id);
      }
    }

    return connections.slice(0, 5); // Ограничиваем количеством связей
  }

  // Сохранение в файловую систему
  private saveToKnowledgeBase(node: Node) {
    const fs = require('fs');
    const path = require('path');
    
    const kbDir = path.join(process.cwd(), 'knowledge-base');
    if (!fs.existsSync(kbDir)) {
      fs.mkdirSync(kbDir, { recursive: true });
    }

    const filePath = path.join(kbDir, `${node.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(node, null, 2));
  }

  // Поиск в накопленных знаниях
  async queryKnowledge(query: string, limit: number = 5) {
    const results: Array<{node: Node, relevance: number}> = [];
    
    for (const [id, node] of this.knowledgeGraph) {
      const relevance = this.calculateRelevance(query, node.content);
      if (relevance > 0.3) { // Порог релевантности
        results.push({ node, relevance });
      }
    }

    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit)
      .map(r => ({
        content: r.node.content,
        source: r.node.source,
        resonance: r.node.resonance,
        relevance: r.relevance,
        connections: r.node.connections.length,
        tags: r.node.tags
      }));
  }

  private calculateRelevance(query: string, content: string): number {
    const queryWords = query.toLowerCase().split(' ');
    const contentWords = content.toLowerCase().split(' ');
    
    let matches = 0;
    queryWords.forEach(qWord => {
      if (contentWords.some(cWord => cWord.includes(qWord) || qWord.includes(cWord))) {
        matches++;
      }
    });
    
    return matches / Math.max(queryWords.length, 1);
  }
}

export const resonanceLearner = new ResonanceLearner();