import { readEstados, writeEstados } from "../data/fileStore.js";

async function all() {
  return readEstados();
}

async function save(estados) {
  await writeEstados(estados);
}

export const estadoRepository = { all, save };