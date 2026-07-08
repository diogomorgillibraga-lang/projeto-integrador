import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get('/', (req, res) => {
    // Aponta para o arquivo cadastro.html dentro de views
    res.sendFile(path.join(__dirname, '../views/cadastro.html')); 
});

export default router;