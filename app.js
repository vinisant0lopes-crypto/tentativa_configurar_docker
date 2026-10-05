import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { buscarUsuarios, buscarUsuarioPorId } from './public/usuarios/exibir_usuario.js';

// Configuração do __dirname para suportar ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Permite que o Express leia JSON no corpo das requisições
app.use(express.json());

// Libera os arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal que entrega o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota para listar todos os usuários
// O /? torna a barra final opcional
app.get('/usuarios/?', async (req, res) => {
  try {
    const usuarios = await buscarUsuarios();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha ao buscar usuários', detalhe: erro.message });
  }
});docker build -t meu-express-app .

// Rota para buscar um usuário específico por ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await buscarUsuarioPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha ao buscar usuário', detalhe: erro.message });
  }
});

// Apenas um listener na porta
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});