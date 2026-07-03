
import { Router } from 'express'

import * as controller from '../controllers/generic.controller.js'
import { autenticar } from '../controllers/auth.controller.js'

const router = Router()


// ==========================
// ROTAS PÚBLICAS
// ==========================
console.log('Rotas genéricas carregadas');
// Cadastro de usuários
router.post('/cadastro.html', controller.criar)
router.post('/administrador', controller.criar)
// Listagem pública de imóveis
 router.get('/imoveis', (req, res) => {
  req.params.tabela = 'imoveis'
  controller.listar(req, res)
})
router.get('/imoveis/:id', (req, res) => {
  req.params.tabela = 'imoveis'
  req.params.id = req.params.id
  controller.listar(req, res)
}) 

// ==========================
// ROTAS PROTEGIDAS
// ==========================

// CRUD genérico
router.post('/:tabela', controller.criar)
//os autenticar foram removidos
//autenticar acima
router.get(
  ['/:tabela', '/:tabela/:id'],
  
  controller.listar
)
//auntenticar acima
router.put(
  '/:tabela/:id',
  
  controller.atualizar
)
//auntenticar acima
router.delete(
  '/:tabela/:id',
  
  controller.remover
)
//auntenticar acima
export default router

