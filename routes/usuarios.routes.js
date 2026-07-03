import express from "express";

import { listarUsuarios, deletarUsuario } from "../controllers/usuarios.controller.js";

const router = express.Router();

// Rota que responderá em http://localhost:3200/api/usuarios
router.get("/", listarUsuarios);
router.delete("/:id", deletarUsuario);
export default router;
