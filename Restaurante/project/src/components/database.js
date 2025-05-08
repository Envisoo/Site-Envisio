// database.js
const Database = require('better-sqlite3');
const db = new Database('local_database.db');

// Criação das tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    createdAt TEXT,
    status TEXT,
    totalAmount REAL,
    notes TEXT
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    orderId TEXT,
    menuItemId TEXT,
    quantity INTEGER,
    unitPrice REAL,
    FOREIGN KEY (orderId) REFERENCES orders(id)
  );

  CREATE TABLE IF NOT EXISTS tables (
    id TEXT PRIMARY KEY,
    number INTEGER,
    capacity INTEGER,
    isActive INTEGER
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    profileId TEXT,
    tableId TEXT,
    reservationDate TEXT,
    reservationTime TEXT,
    partySize INTEGER,
    status TEXT,
    notes TEXT
  );

  CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    full_name TEXT
  );
`);

module.exports = db;