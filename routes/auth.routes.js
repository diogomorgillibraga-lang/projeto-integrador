import { Router } from 'express'
import { login, cadastrar } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', login)
router.post('/register', cadastrar)

export default router
