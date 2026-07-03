
// controllers/authController.js

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import pool from '../config/database.js'
import dotenv from 'dotenv'

dotenv.config()

// ==========================
// UTILITÁRIOS
// ==========================

// Gera hash para senha
export const gerarHashSenha = async (senha) => {
  return bcrypt.hash(senha, 10)
}

// Compara senha com hash
export const compararSenha = async (senha, hash) => {
  return bcrypt.compare(senha, hash)
}

// Gera token JWT
export const gerarToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || '{$Chave_Secreta$}',
    {
      expiresIn: '8h'
    }
  )
}

// ==========================
// MIDDLEWARE DE AUTENTICAÇÃO
// ==========================

export const autenticar = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        erro: 'Token não informado'
      })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || '{$Chave_Secreta$}'
    )

    // Disponibiliza dados do usuário
    req.usuario = decoded

    next()

  } catch (error) {
    return res.status(401).json({
      erro: 'Token inválido'
    })
  }
}

// ==========================
// LOGIN
// ==========================

export const login = async (req, res) => {
  try {

    const { email, senha } = req.body

    // Validação básica
    if (!email || !senha) {
      return res.status(400).json({
        erro: 'Email e senha são obrigatórios'
      })
    }

    const [usuarios] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    )

    if (!usuarios.length) {
      return res.status(401).json({
        erro: 'Usuário ou senha incorretos'
      })
    }

    const usuario = usuarios[0]

    const senhaValida = await compararSenha(
      senha,
      usuario.senha
    )

    if (!senhaValida) {
      return res.status(401).json({
        erro: 'Usuário ou senha incorretos'
      })
    }

    const token = gerarToken({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
      adm: usuario.adm
    })
    
    return res.status(200).json({
      autenticado: true,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        adm: usuario.adm
      },
      token
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      erro: 'Erro interno do servidor'
    })

  }
}
export const cadastrar = async (req, res) => {
  try {

    const {
      nome,
      email,
      senha,
      telefone,
      tipo_interesse

    
    } = req.body

    // FORMATO CORRETO PARA O NEON (POSTGRESQL)
// Note que usamos $1, $2, $3, $4, $5 em vez de pontos de interrogação (?)
const queryCadastro = 'INSERT INTO usuarios (nome, email, senha, telefone, tipo_interesse) VALUES ($1, $2, $3, $4, $5)';
const valoresCadastro = [nome, email, senha, telefone, tipo_interesse];

// Executamos usando o .query (e não .execute)
await pool.query(queryCadastro, valoresCadastro);

const resultadoBusca = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

// 2. Criamos a variável que o seu código precisa para a validação (lendo as linhas retornadas)
const usuarioExiste = resultadoBusca.rows;

// 3. Se o array tiver algum usuário dentro, significa que o e-mail já existe
if (usuarioExiste.length > 0) {
  return res.status(400).json({ erro: 'Este e-mail já está cadastrado!' });
}

    const senhaHash = await gerarHashSenha(senha)

    await pool.query(
      `INSERT INTO usuarios
      (nome, email, senha, telefone, adm, tipo_interesse)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        nome,
        email,
        senhaHash,
        telefone,
        0,
        tipo_interesse
      ]
    );

    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso'
    })

  } catch (erro) {
    console.error("========== ERRO ==========");
    console.error(erro);
    console.error(erro.message);
    console.error("==========================");
  
    res.status(500).json({
      erro: erro.message
    });
  }

  }

