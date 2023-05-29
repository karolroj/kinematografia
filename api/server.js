const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Inicjalizacja aplikacji Express.js
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// Połączenie z bazą danych SQLite
const db = new sqlite3.Database(':memory:');

// Tworzenie tabeli użytkowników oraz dodanie użytkownika admin/admin
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
  db.run("insert into users (username, password) values ('admin', 'admin')");
});

// Definicja endpointu do logowania
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Wyszukiwanie użytkownika w bazie danych
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error(err);
      res.sendStatus(400);
    } else if (row) {
      // Użytkownik znaleziony - generowanie i zwracanie tokena
      const token = generateRandomToken(32);
      res.json({ token });
    } else {
      // Użytkownik nieznaleziony
      res.sendStatus(401);
    }
  });
});

// Start serwera
app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`);
});

function generateRandomToken(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
}