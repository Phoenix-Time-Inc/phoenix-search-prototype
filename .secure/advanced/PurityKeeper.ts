class PurityKeeper {
  private auditLog: Array<{
    action: string;
    target: string;
    reason: string;
    timestamp: Date;
  }> = [];

  // Регулярная проверка чистоты
  async purityScan() {
    console.log('🧹 Начинаю проверку чистоты базы знаний...');
    
    const allNodes = this.getAllKnowledgeNodes();
    let removed = 0;
    let verified = 0;

    for (const node of allNodes) {
      const purityCheck = await this.checkNodePurity(node);
      
      if (purityCheck.status === 'contaminated') {
        await this.quarantineNode(node.id, purityCheck.reasons);
        removed++;
      } else if (purityCheck.status === 'pure') {
        await this.markAsVerified(node.id);
        verified++;
      }
    }

    console.log(`✅ Проверка завершена. Удалено: ${removed}, Проверено: ${verified}`);

    this.auditLog.push({
      action: 'purity_scan',
      target: 'all_nodes',
      reason: `Регулярная проверка. Удалено: ${removed}`,
      timestamp: new Date()
    });

    return { scanned: allNodes.length, removed, verified };
  }

  private getAllKnowledgeNodes(): any[] {
    // Чтение всех файлов из knowledge-base
    const fs = require('fs');
    const path = require('path');
    
    const kbDir = path.join(process.cwd(), 'knowledge-base');
    if (!fs.existsSync(kbDir)) return [];

    const files = fs.readdirSync(kbDir).filter((f: string) => f.endsWith('.json'));
    return files.map((file: string) => {
      const content = fs.readFileSync(path.join(kbDir, file), 'utf-8');
      return JSON.parse(content);
    });
  }

  private async checkNodePurity(node: any): Promise<{
    status: 'pure' | 'suspect' | 'contaminated';
    reasons: string[];
  }> {
    const reasons: string[] = [];
    let score = node.resonance || 0;

    // Проверка по времени (старые записи могут устареть)
    const nodeAge = new Date().getTime() - new Date(node.addedAt).getTime();
    const ageInDays = nodeAge / (1000 * 60 * 60 * 24);
    
    if (ageInDays > 365) { // Старее года
      reasons.push(`Устаревшая запись (${Math.floor(ageInDays)} дней)`);
      score -= 0.2;
    }

    // Проверка источников
    if (node.source?.includes('untrusted')) {
      reasons.push('Недоверенный источник');
      score -= 0.3;
    }

    // Проверка связей (если связан с удаленными узлами)
    const connections = node.connections || [];
    const brokenConnections = await this.checkConnections(connections);
    if (brokenConnections > 0) {
      reasons.push(`Имеет ${brokenConnections} разорванных связей`);
      score -= 0.1 * brokenConnections;
    }

    // Определяем статус
    if (score < 0.3) {
      return { status: 'contaminated', reasons };
    } else if (score < 0.6) {
      return { status: 'suspect', reasons: ['Требует ручной проверки'] };
    } else {
      return { status: 'pure', reasons: [] };
    }
  }

  private async checkConnections(connections: string[]): Promise<number> {
    // Проверяем существуют ли связанные узлы
    const fs = require('fs');
    const path = require('path');
    const kbDir = path.join(process.cwd(), 'knowledge-base');
    
    let broken = 0;
    
    for (const connId of connections) {
      const filePath = path.join(kbDir, `${connId}.json`);
      if (!fs.existsSync(filePath)) {
        broken++;
      }
    }
    
    return broken;
  }

  private async quarantineNode(nodeId: string, reasons: string[]) {
    // Перемещаем в карантин вместо удаления
    const fs = require('fs');
    const path = require('path');
    
    const kbDir = path.join(process.cwd(), 'knowledge-base');
    const quarantineDir = path.join(process.cwd(), 'quarantine');
    
    if (!fs.existsSync(quarantineDir)) {
      fs.mkdirSync(quarantineDir, { recursive: true });
    }

    const sourcePath = path.join(kbDir, `${nodeId}.json`);
    const destPath = path.join(quarantineDir, `${nodeId}.json`);
    
    if (fs.existsSync(sourcePath)) {
      // Добавляем метаданные о причине карантина
      const node = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
      node.quarantined = {
        at: new Date().toISOString(),
        reasons,
        action: 'auto_quarantine'
      };
      
      fs.writeFileSync(destPath, JSON.stringify(node, null, 2));
      fs.unlinkSync(sourcePath);
      
      this.auditLog.push({
        action: 'quarantine',
        target: nodeId,
        reason: reasons.join(', '),
        timestamp: new Date()
      });
    }
  }

  private async markAsVerified(nodeId: string) {
    // Добавляем метку проверено
    const fs = require('fs');
    const path = require('path');
    
    const filePath = path.join(process.cwd(), 'knowledge-base', `${nodeId}.json`);
    if (fs.existsSync(filePath)) {
      const node = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      node.verified = true;
      node.verifiedAt = new Date().toISOString();
      fs.writeFileSync(filePath, JSON.stringify(node, null, 2));
    }
  }

  // Ручное управление (для админов)
  async manualReview(nodeId: string, decision: 'restore' | 'delete' | 'keep', notes: string) {
    const fs = require('fs');
    const path = require('path');
    
    const quarantinePath = path.join(process.cwd(), 'quarantine', `${nodeId}.json`);
    
    if (decision === 'restore' && fs.existsSync(quarantinePath)) {
      // Восстанавливаем из карантина
      const kbPath = path.join(process.cwd(), 'knowledge-base', `${nodeId}.json`);
      fs.copyFileSync(quarantinePath, kbPath);
      fs.unlinkSync(quarantinePath);
    } else if (decision === 'delete') {
      // Удаляем навсегда
      if (fs.existsSync(quarantinePath)) {
        fs.unlinkSync(quarantinePath);
      }
    }
    
    this.auditLog.push({
      action: `manual_${decision}`,
      target: nodeId,
      reason: notes,
      timestamp: new Date()
    });
  }
}
export const purityKeeper = new PurityKeeper();
