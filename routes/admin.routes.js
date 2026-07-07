import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Removemos o 'autenticar' daqui para o HTML carregar normalmente
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin.html')); 
});

export default router;