import express from "express";
// Adicione "deletarImovel" na importação abaixo:
import { listarImoveis, criarImovel, deletarImovel } from "../controllers/imoveis.controller.js";

const router = express.Router();

router.get("/", listarImoveis);
router.post("/", criarImovel);
router.delete("/:id", deletarImovel); // Adicione esta linha para escutar o DELETE com o ID

export default router;