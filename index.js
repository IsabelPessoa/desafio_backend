
const express = require('express');
// Importa o Pool do 'pg' para gerenciar as conexões com o PostgreSQL
const { Pool } = require('pg'); 

// 1. CONFIGURAÇÃO DE AMBIENTE (apenas para testes locais) - Excluir depois
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(express.json()); // Habilita a API a receber requisições com corpo JSON

// 2. CONFIGURAÇÃO DO POOL DE CONEXÃO 
// O Pool lê as variáveis do ambiente e gerencia o acesso ao banco de dados
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, // DB
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// 3. ROTA DE TESTE (Verificação da Infraestrutura)
// Endpoint que valida se a API e o DB estão conversando
app.get('/status', async (req, res) => {
    let client;
    try {
        client = await pool.connect(); // Obtém uma conexão do Pool
        const result = await client.query('SELECT NOW()'); // Query SQL simples de teste
        
        // Sucesso: A API está de pé, o Docker está rodando, e a conexão com o DB funcionou
        res.status(200).json({ 
            message: "Infraestrutura OK: API e Banco de Dados conectados com sucesso!",
            dbTime: result.rows[0].now
        });
    } catch (err) {
        console.error('Falha crítica de Conexão com o Banco de Dados:', err.message);
        // Erro de infraestrutura. Retorna 500.
        res.status(500).json({ 
            message: "Erro de Infraestrutura: Falha na conexão com o DB. Verifique o Docker Compose.",
            error: err.message
        });
    } finally {
        // Libera a conexão de volta para o Pool, mesmo em caso de erro
        if (client) {
            client.release();
        }
    }
});


// *** 4. INICIALIZAÇÃO DO SERVIDOR ***
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});