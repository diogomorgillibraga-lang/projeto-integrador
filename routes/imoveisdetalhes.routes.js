import express from "express";
const router = express.Router();

// Importa a função específica do seu controller de imóveis
import { buscarImovelPorId } from "../controllers/imoveis.controller.js";

// Cria a rota que vai receber o ID dinâmico
router.get("/api/imoveis/:id", buscarImovelPorId);

export default router;