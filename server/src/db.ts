import Database, { type Database as DatabaseType } from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db: DatabaseType = new Database(path.join(__dirname, '..', 'arbortrack.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS trees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    species TEXT NOT NULL DEFAULT 'Unknown',
    scientific_name TEXT DEFAULT '',
    confidence REAL DEFAULT 0,
    health_status TEXT NOT NULL DEFAULT 'Healthy' CHECK(health_status IN ('Healthy','Stressed','Dead')),
    vitality_score REAL DEFAULT 100,
    moisture_stress REAL DEFAULT 0,
    temperature REAL DEFAULT 0,
    rainfall_7d REAL DEFAULT 0,
    humidity REAL DEFAULT 0,
    last_watered TEXT,
    planted_at TEXT NOT NULL DEFAULT (datetime('now')),
    image_url TEXT DEFAULT '',
    needs_water INTEGER DEFAULT 0
  )
`);

export default db;
