import express from "express";
import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  searchCollaborator,
  agregarColaborador,
  eliminarColaborador,
} from "../controllers/proyectoController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);

router
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

router.post("/collaborators", checkAuth, searchCollaborator)
router.post("/collaborators/:id", checkAuth, agregarColaborador);
router.delete("/deleted-collaborator/:id", checkAuth, eliminarColaborador);

export default router;
