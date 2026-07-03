/* import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'imobiliaria',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool
 */
import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

// Cria a conexão usando a URL completa do Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Exigido pelo Neon para aceitar conexões seguras na nuvem
    rejectUnauthorized: false
  }
})

export default pool