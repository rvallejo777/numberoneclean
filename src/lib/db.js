import Database from 'better-sqlite3';
import path from 'path';

// Utiliza la ruta local del proyecto para la base de datos
const dbPath = path.join(process.cwd(), 'leads.db');
const db = new Database(dbPath, { verbose: console.log });

// Inicializar la tabla si no existe
const initDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      service TEXT,
      priority TEXT DEFAULT 'Media',
      status TEXT DEFAULT 'New',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

initDb();

export default db;
