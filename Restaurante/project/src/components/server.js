const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const db = new Database('local_database.db');
const JWT_SECRET = 'seu-secret-key-super-secreto';

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Criação das tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'user'
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    table_id TEXT,
    user_id TEXT,
    total_amount REAL,
    notes TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT,
    menu_item_id TEXT,
    quantity INTEGER,
    unit_price REAL,
    notes TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );

  CREATE TABLE IF NOT EXISTS tables (
    id TEXT PRIMARY KEY,
    number INTEGER,
    capacity INTEGER,
    is_active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    table_id TEXT,
    reservation_date TEXT,
    reservation_time TEXT,
    party_size INTEGER,
    notes TEXT,
    status TEXT DEFAULT 'pending'
  );

  CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    full_name TEXT
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    content TEXT,
    rating INTEGER,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS menu_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    display_order INTEGER
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    category_id TEXT,
    is_available INTEGER DEFAULT 1,
    dietary_info TEXT
  );
`);

// Criar admin se não existir
const adminPassword = bcrypt.hashSync('admin123', 10);
const createAdmin = db.prepare(`
  INSERT OR IGNORE INTO users (email, password, full_name, role)
  VALUES (?, ?, ?, ?)
`);

createAdmin.run(
  'admin@restaurante.com',
  adminPassword,
  'Administrador',
  'admin'
);

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};



// Rotas de Autenticação
app.post('/auth/signin', (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    return res.status(401).json({ error: 'Email ou senha inválidos' });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Email ou senha inválidos' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ user: { id: user.id, role: user.role, fullName: user.full_name }, token });
});

app.post('/auth/signup', (req, res) => {
  const { email, password, fullName } = req.body;

  const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existingUser) {
    return res.status(400).json({ error: 'Usuário já existe' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = db.prepare(`
    INSERT INTO users (email, password, full_name)
    VALUES (?, ?, ?)
  `).run(email, hashedPassword, fullName);

  const token = jwt.sign({ userId: result.lastInsertRowid, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ user: { id: result.lastInsertRowid, role: 'user', fullName }, token });
});

// Rotas de Mesas
app.get('/tables', (req, res) => {
  const { is_active } = req.query;
  let query = 'SELECT * FROM tables';

  if (is_active === 'true') {
    query += ' WHERE is_active = 1';
  }

  const tables = db.prepare(query).all();
  res.json(tables);
});

// Rotas de Reservas
app.get('/reservations', authenticate, (req, res) => {
  const { user_id } = req.query;
  const reservations = db.prepare(`
    SELECT * FROM reservations
    WHERE user_id = ?
    ORDER BY reservation_date ASC
  `).all(user_id);
  res.json(reservations);
});

app.post('/reservations', authenticate, (req, res) => {
  const { tableId, reservationDate, reservationTime, partySize, notes } = req.body;
  const userId = req.user.userId;

  const result = db.prepare(`
    INSERT INTO reservations (user_id, table_id, reservation_date, reservation_time, party_size, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(userId, tableId, reservationDate, reservationTime, partySize, notes);

  res.json({ id: result.lastInsertRowid });
});

// Rotas de Menu
app.get('/menu_categories', (req, res) => {
  const categories = db.prepare('SELECT * FROM menu_categories ORDER BY display_order').all();
  res.json(categories);
});

app.get('/menu_items', (req, res) => {
  const items = db.prepare('SELECT * FROM menu_items WHERE is_available = 1').all();
  res.json(items);
});

// Iniciar o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});