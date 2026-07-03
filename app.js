import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import authRoutes from './routes/auth.routes.js';
import genericRoutes from './routes/generic.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import usuariosRoutes from "./routes/usuarios.routes.js";
import imoveisRoutes from "./routes/imoveis.routes.js";

const app = express(); // <-- primeiro cria o app


const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(cors());
app.use("/api/imoveis", imoveisRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});

app.use('/api/imoveis', imoveisRoutes);
app.use('/auth', authRoutes);

// Rotas específicas primeiro
app.use('/api', dashboardRoutes);

// Rotas genéricas por último
app.use('/', genericRoutes);

export default app;