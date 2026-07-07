import { Router } from 'express'
import { login, cadastrar } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', login)
router.post('/register', cadastrar)

// Rota rápida para o frontend do Admin verificar o token
router.get('/verificar-admin', autenticar, (req, res) => {
    if (req.usuario.adm === 1 || req.usuario.adm === true) {
        return res.status(200).json({ valido: true });
    }
    return res.status(403).json({ valido: false, erro: "Não é administrador" });
});
export default router
