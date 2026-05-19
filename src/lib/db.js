import fs from 'fs';
import path from 'path';

class JSONDatabase {
  constructor(filePath) {
    this.filePath = filePath;
    this.init();
  }

  init() {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf8');
      }
    } catch (e) {
      console.error('Failed to initialize JSON database:', e);
    }
  }

  read() {
    try {
      if (fs.existsSync(this.filePath)) {
        const content = fs.readFileSync(this.filePath, 'utf8');
        if (!content.trim()) return [];
        return JSON.parse(content);
      }
    } catch (e) {
      console.error('Failed to read JSON database, returning empty list:', e);
    }
    return [];
  }

  write(data) {
    try {
      const tempPath = this.filePath + '.tmp';
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
      fs.renameSync(tempPath, this.filePath);
      return true;
    } catch (e) {
      console.error('Failed to write JSON database:', e);
      return false;
    }
  }

  prepare(sql) {
    const isInsert = sql.toLowerCase().includes('insert');
    const isSelect = sql.toLowerCase().includes('select');

    if (isInsert) {
      return {
        run: (name, phone, service, priority) => {
          const leads = this.read();
          const newId = leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1;
          const newLead = {
            id: newId,
            name,
            phone: phone || '',
            service: service || '',
            priority: priority || 'Media',
            status: 'New',
            createdAt: new Date().toISOString()
          };
          leads.push(newLead);
          this.write(leads);
          return { lastInsertRowid: newId };
        }
      };
    }

    if (isSelect) {
      return {
        all: () => {
          const leads = this.read();
          // Order by createdAt DESC
          return [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
      };
    }

    return {
      run: () => ({ lastInsertRowid: 0 }),
      all: () => []
    };
  }

  exec(sql) {
    this.init();
  }
}

// Store leads in leads.json in the project root
const dbPath = path.join(process.cwd(), 'leads.json');
const db = new JSONDatabase(dbPath);

export default db;
