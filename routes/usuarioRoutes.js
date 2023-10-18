import express from "express";
const router = express.Router();

import {
  autenticar,
  registrar,
  confirmar,
  olvidePassword,
} from "../controllers/usuarioController.js";

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar);
router.post("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);

export default router;
