import { AppError } from "../errors/AppError.js";
import { categoriasPermitidas, createEstadoId } from "../domain/estadoRules.js";
import { estadoRepository } from "../repositories/estadoRepository.js";

async function list() {
  return estadoRepository.all();
}

async function getById(id) {
  const estados = await estadoRepository.all();
  const estado = estados.find((item) => item.id === id);

  if (!estado) {
    throw new AppError(404, "ESTADO_NOT_FOUND", "Estado no encontrado");
  }

  return estado;
}

async function create(input) {
  const { nombre, descripcion, categoria } = input ?? {};

  if (!nombre || !descripcion || !categoria || !categoriasPermitidas.includes(categoria)) {
    throw new AppError(400, "INVALID_INPUT", "Datos de entrada incompletos o categoría inválida");
  }

  const estados = await estadoRepository.all();
  const nuevoEstado = {
    id: createEstadoId(estados),
    nombre,
    descripcion,
    categoria,
    activo: true
  };

  estados.push(nuevoEstado);
  await estadoRepository.save(estados);

  return nuevoEstado;
}

async function update(id, patch = {}) {
  patch = patch ?? {};
  const estados = await estadoRepository.all();
  const index = estados.findIndex((item) => item.id === id);

  if (index < 0) {
    throw new AppError(404, "ESTADO_NOT_FOUND", "Estado no encontrado");
  }

  if (patch.categoria !== undefined && !categoriasPermitidas.includes(patch.categoria)) {
    throw new AppError(400, "INVALID_CATEGORY", "Categoría inválida");
  }

  if (patch.activo !== undefined && typeof patch.activo !== "boolean") {
    throw new AppError(400, "INVALID_STATUS_FLAG", "El campo activo debe ser booleano");
  }

  const allowed = ["nombre", "descripcion", "categoria", "activo"];
  const changes = Object.fromEntries(
    Object.entries(patch).filter(([key]) => allowed.includes(key))
  );

  if (Object.keys(changes).length === 0) {
    throw new AppError(400, "EMPTY_PATCH", "No hay campos permitidos para actualizar");
  }

  estados[index] = { ...estados[index], ...changes };
  await estadoRepository.save(estados);

  return estados[index];
}

async function remove(id) {
  const estados = await estadoRepository.all();
  const index = estados.findIndex((item) => item.id === id);

  if (index < 0) {
    throw new AppError(404, "ESTADO_NOT_FOUND", "Estado no encontrado");
  }

  estados.splice(index, 1);
  await estadoRepository.save(estados);
}

export const estadoService = { list, getById, create, update, remove };