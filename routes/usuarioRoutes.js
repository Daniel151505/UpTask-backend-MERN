import express from "express";
const router = express.Router();

import { autenticar, registrar } from "../controllers/usuarioController.js";

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post('/login', autenticar)

export default router;
