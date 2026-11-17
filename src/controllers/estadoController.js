import { estadoService } from "../services/estadoService.js";

export async function listEstados(req, res, next) {
  try {
    const estados = await estadoService.list();
    res.status(200).json({ data: estados, count: estados.length });
  } catch (error) {
    next(error);
  }
}

export async function getEstado(req, res, next) {
  try {
    const estado = await estadoService.getById(req.params.id);
    res.status(200).json({ data: estado });
  } catch (error) {
    next(error);
  }
}

export async function createEstado(req, res, next) {
  try {
    const estado = await estadoService.create(req.body);
    res.location(`/api/estados/${estado.id}`).status(201).json({ data: estado });
  } catch (error) {
    next(error);
  }
}

export async function updateEstado(req, res, next) {
  try {
    const estado = await estadoService.update(req.params.id, req.body);
    res.status(200).json({ data: estado });
  } catch (error) {
    next(error);
  }
}

export async function deleteEstado(req, res, next) {
  try {
    await estadoService.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}