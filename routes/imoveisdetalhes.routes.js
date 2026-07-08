import express from "express";
const router = express.Router();

// Importamos tanto a lista quanto a busca por ID do seu controller existente
import { listarImoveis, buscarImovelPorId } from "../controllers/imoveis.controller.js";

// Rota para a página inicial carregar todos os cards
router.get("/api/imoveis", listarImoveis);

// Rota para carregar o imóvel específico
router.get("/api/imoveis/:id", buscarImovelPorId);

export default router;