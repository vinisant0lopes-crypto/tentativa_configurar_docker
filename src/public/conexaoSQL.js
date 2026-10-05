import mysql from "mysql2/promise";

async function conexao() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || "meu_mysql", 
        port: Number(process.env.DB_PORT) || 3306, 
        user: process.env.DB_USER || "root", 
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "meubanco", 
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    return pool;
}

async function closeConexao(pool) {
    if (pool) {
        console.log("Fechando a conexão com o banco de dados");
        await pool.end();
    } else {
        console.log("Conexão já fechada");
    }
}

async function testarConexao() {
  try {
    const pool = await conexao();
    const conn = await pool.getConnection();
    await conn.ping();
    console.log("✅ Conexão com o MySQL bem-sucedida!");
    conn.release();
  } catch (erro) {
    console.error("❌ Falha ao conectar com o MySQL:", erro.message);
  }
}

export { conexao, closeConexao, testarConexao };