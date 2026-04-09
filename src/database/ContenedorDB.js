import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('sanAlejo.db');

export function initDB() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS contenedor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      ubicacion TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS objeto (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      id_contenedor INTEGER NOT NULL,
      FOREIGN KEY (id_contenedor) REFERENCES contenedor(id) ON DELETE CASCADE
    );
  `);
}

export default db;