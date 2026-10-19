const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Utilizando Pool de conexões em vez de conexão única
const db = mysql.createPool({
  host: 'localhost', 
  port: 3307,        // Porta mapeada no Docker (-p 3307:3306)
  user: 'root',            
  password: 'root', 
  database: 'meubanco',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Suporte para JSON
app.use(express.json());

// Libera arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'src', 'public'))); 

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'index.html'));
});

// Rota para consultar a tabela tbUsuario
app.get('/usuarios', (req, res) => {
  const querySql = 'SELECT * FROM tbUsuario';

  db.query(querySql, (err, resultados) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err.message);
      return res.status(500).json({ erro: 'Erro ao buscar dados do banco.' });
    }
    res.json(resultados);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});