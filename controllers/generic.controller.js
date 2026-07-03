
import * as model from '../models/generic.model.js'
import { gerarHashSenha } from './auth.controller.js'

// Tabelas permitidas no sistema


// ====================
// CRIAR
// ====================

export const criar = async (req, res) => {
  try {
    const tabela = req.params.tabela

   

    const dados = { ...req.body }

    // Criptografa senha automaticamente
    if (dados.senha) {
      dados.senha = await gerarHashSenha(dados.senha)
    }

    const result = await model.inserir(
      tabela,
      dados
    )

    return res.status(201).json(result)

  } catch (error) {

    return res.status(400).json({
      erro: error.message
    })

  }
}

// ====================
// LISTAR
// ====================

export const listar = async (req, res) => {
  try {
    const tabela = req.params.tabela


    const result = await model.listar(
      tabela,
      req.params.id
    )

    return res.status(200).json(result)

  } catch (error) {
    return res.status(400).json({
      erro: error.message
    })
  }
}

// ====================
// ATUALIZAR
// ====================

export const atualizar = async (req, res) => {
  try {
    const tabela = req.params.tabela


    const dados = { ...req.body }

    // Atualiza senha com hash
    if (dados.senha) {
      dados.senha = await gerarHashSenha(dados.senha)
    }

    const result = await model.atualizar(
      tabela,
      dados,
      req.params.id
    )

    return res.status(200).json(result)

  } catch (error) {

    return res.status(400).json({
      erro: error.message
    })

  }
}

// ====================
// REMOVER
// ====================

export const remover = async (req, res) => {
  try {
    const tabela = req.params.tabela

 

    const result = await model.remover(
      tabela,
      req.params.id
    )

    return res.status(200).json(result)

  } catch (error) {

    return res.status(400).json({
      erro: error.message
    })

  }
}

