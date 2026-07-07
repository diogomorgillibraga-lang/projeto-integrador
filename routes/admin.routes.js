import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// IMPORTANTE: Importar o middleware de autenticação
import { autenticar } from '../controllers/auth.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Adicionamos o middleware 'autenticar' antes de entregar o HTML
router.get('/', autenticar, (req, res) => {
    // Opcional: Validar se além de logado, ele é de fato administrador
    if (req.usuario.adm !== 1 && req.usuario.adm !== true) {
        return res.status(403).send('Acesso negado: Você não é um administrador.');
    }
    
    // Se passou na validação, entrega a página exclusiva
    res.sendFile(path.join(__dirname, '../views/admin.html')); 
});

export default router;