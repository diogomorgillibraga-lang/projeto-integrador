import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Configuração essencial para rotas com ES Modules (import/export)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importação das rotas de páginas (Frontend)
import paginaInicialRoutes from './routes/Pagina_inicial.routes.js';
import loginRoutes from './routes/login.routes.js';
import cadastrarRoutes from './routes/cadastrar.routes.js';
import adminRoutes from './routes/admin.routes.js';

// Importação das rotas de API (Backend)
import imoveisApiRoutes from './routes/imoveis.routes.js';
import usuariosApiRoutes from './routes/usuarios.routes.js';
import authApiRoutes from './routes/auth.routes.js';
import genericApiRoutes from './routes/generic.routes.js';
import dashboardApiRoutes from './routes/dashboard.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Middlewares obrigatórios
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura o Express para servir CSS, Imagens e scripts da pasta 'views'
app.use(express.static(path.join(__dirname, 'views')));

// ==========================================
// VÍNCULO DAS ROTAS DE PÁGINAS (HTML)
// ==========================================
app.use('/', paginaInicialRoutes);
app.use('/Pagina_inicial', paginaInicialRoutes); 
app.use('/login', loginRoutes);
app.use('/cadastrar', cadastrarRoutes);
app.use('/admin', adminRoutes);

// ==========================================
// VÍNCULO DAS ROTAS DE API (JSON / BANCO)
// ==========================================
app.use('/api/imoveis', imoveisApiRoutes);
app.use('/api/usuarios', usuariosApiRoutes);
app.use('/api/auth', authApiRoutes);
app.use('/api/dashboard', dashboardApiRoutes);
app.use('/api', genericApiRoutes); 

// Fallback para rotas não encontradas (404)
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Exporta o aplicativo pronto (O app.listen fica EXCLUSIVAMENTE no server.js)
export default app;

//import express from 'express';
//import cors from 'cors';
//import path from 'node:path';
//import { fileURLToPath } from 'node:url';
//
//import authRoutes from './routes/auth.routes.js';
//import genericRoutes from './routes/generic.routes.js';
//import dashboardRoutes from './routes/dashboard.routes.js';
//import usuariosRoutes from "./routes/usuarios.routes.js";
//import imoveisRoutes from "./routes/imoveis.routes.js";
//
//const app = express(); // <-- primeiro cria o app
//
//
//const __dirname = path.dirname(fileURLToPath(import.meta.url));
//app.use(express.json());
//app.use(cors());
//app.use("/api/imoveis", imoveisRoutes);
//app.use("/api/usuarios", usuariosRoutes);
//
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//
//app.use(express.static(path.join(__dirname, 'views')));
//
//app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
//});
//
//app.use('/api/imoveis', imoveisRoutes);
//app.use('/auth', authRoutes);
//
//// Rotas específicas primeiro
//app.use('/api', dashboardRoutes);
//
//// Rotas genéricas por último
//app.use('/', genericRoutes);
//
//export default app;