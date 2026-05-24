const Database = require('better-sqlite3');
const path = require('path');

// Cria o arquivo do banco de dados (se não existir)
const db = new Database(path.join(__dirname, 'todo.db'));

// Cria a tabela tasks
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT,
    completed   INTEGER DEFAULT 0,
    created_at  TEXT DEFAULT (datetime('now', 'localtime'))
  )
`);

console.log('✅ SQLite conectado com sucesso!');
console.log('📁 Banco de dados em:', path.join(__dirname, 'todo.db'));

module.exports = db;