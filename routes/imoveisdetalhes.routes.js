import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { listarImoveis, buscarImovelPorId } from "../controllers/imoveis.controller.js";

const router = express.Router();

// Configuração para descobrir os caminhos de pastas no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ====== 1. ROTA DA PÁGINA (VISUAL) ======
// Esta rota vai interceptar o clique do botão e entregar o HTML correto!
router.get("/imoveis", (req, res) => {
  // Certifique-se de que o seu arquivo imovel-detalhes.html está dentro da pasta views
  res.sendFile(path.join(__dirname, "../views/imovel-detalhes.html"));
});


// ====== 2. ROTAS DA API (DADOS) ======
// Rota para a página inicial carregar todos os cards
router.get("/api/imoveis", listarImoveis);

// Rota para carregar os dados do imóvel específico do banco Neon
router.get("/api/imoveis/:id", buscarImovelPorId);

export default router;  