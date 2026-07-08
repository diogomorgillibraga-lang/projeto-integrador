import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderizarPaginaInicial = (req, res) => {
    // Sobe um nível para sair de 'controllers' e entra na pasta 'views'
    res.sendFile(path.join(__dirname, '../views/Pagina_inicial.html'));
};