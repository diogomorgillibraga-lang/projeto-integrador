import { Router } from 'express'
import { login, cadastrar, autenticar } from '../controllers/auth.controller.js' // 👈 CORRIGIDO: Adicionado o autenticar aqui

const router = Router()

router.post('/login', login)
router.post('/register', cadastrar)

// Rota rápida para o frontend do Admin verificar o token
router.get('/verificar-admin', autenticar, (req, res) => {
    // CORREÇÃO: Aceita true booleano, string 'true' ou o número 1
    if (req.usuario.adm === true || req.usuario.adm === 1 || req.usuario.adm === 'true') {
        return res.status(200).json({ valido: true });
    }
    return res.status(403).json({ valido: false, erro: "Não é administrador" });
});

export default router
