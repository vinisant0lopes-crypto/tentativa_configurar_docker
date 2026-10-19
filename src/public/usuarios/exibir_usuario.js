import { conexao } from './conexaoSQL.js';

async function buscarUsuarios() {
  console.log('DAO de Usuario');
  const sql = `SELECT idUsuario, emailUsuario FROM tbUsuario;`;
  
  try {
    const pool = await conexao();
    // O pool executa e devolve a conexão automaticamente ao grupo
    const [rows] = await pool.query(sql); 
    return rows;
  } catch (err) {
    console.error('Erro ao buscar usuários:', err.message);
    throw err;
  }
}

async function buscarUsuarioPorId(idUsuario) {
  const sql = `SELECT idUsuario, emailUsuario FROM tbUsuario WHERE idUsuario = ?;`;
  
  try {
    const pool = await conexao();
    const [rows] = await pool.query(sql, [idUsuario]);
    return rows[0] || null; // Retorna apenas o usuário encontrado ou null
  } catch (err) {
    console.error(`Erro ao buscar usuário ${idUsuario}:`, err.message);
    throw err;
  }
}

export { buscarUsuarios, buscarUsuarioPorId };