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

    if (!email || !senha) {
      return res.status(400).json({
        erro: 'Email e senha são obrigatórios'
      })
    }

    // Busca o usuário de forma segura usando "usuarios" com aspas para o Postgres
    const resultadoBusca = await pool.query(
      'SELECT * FROM "usuarios" WHERE email = $1',
      [email]
    )

    const usuarios = resultadoBusca.rows

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

// ==========================
// CADASTRO (FLUXO CORRIGIDO)
// ==========================

export const cadastrar = async (req, res) => {
  try {
    const { nome, email, senha, telefone, tipo_interesse } = req.body

    // 1. Validação básica de campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' })
    }

    // 2. PASSO CORRETO: Verifica primeiro se o e-mail já existe no banco Neon
    const resultadoBusca = await pool.query('SELECT * FROM "usuarios" WHERE email = $1', [email])
    const usuarioExiste = resultadoBusca.rows

    if (usuarioExiste.length > 0) {
      return res.status(400).json({ erro: 'Este e-mail já está cadastrado!' })
    }

    // 3. PASSO CORRETO: Cria a criptografia da senha de forma segura antes de salvar
    const senhaHash = await gerarHashSenha(senha)

    // 4. PASSO CORRETO: Executa um único INSERT limpo no PostgreSQL
    await pool.query(
      `INSERT INTO "usuarios"
      (nome, email, senha, telefone, adm, tipo_interesse)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        nome,
        email,
        senhaHash,
        telefone,
        0, // Padrão 0 para não-administrador
        tipo_interesse
      ]
    )

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso'
    })

  } catch (erro) {
    console.error("========== ERRO ==========")
    console.error(erro)
    console.error("==========================")
  
    return res.status(500).json({
      erro: 'Erro interno ao realizar o cadastro.'
    })
  }
}
