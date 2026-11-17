import { Router } from "express";
import {
  createEstado,
  deleteEstado,
  getEstado,
  listEstados,
  updateEstado
} from "../controllers/estadoController.js";

export const estadoRouter = Router();

estadoRouter.get("/", listEstados);
estadoRouter.get("/:id", getEstado);
estadoRouter.post("/", createEstado);
estadoRouter.patch("/:id", updateEstado);
estadoRouter.delete("/:id", deleteEstado);