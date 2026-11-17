import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const dataUrl = new URL("../../data/estados.json", import.meta.url);
const dataPath = fileURLToPath(dataUrl);

export async function readEstados() {
  const raw = await readFile(dataPath, "utf8");
  return JSON.parse(raw);
}

export async function writeEstados(estados) {
  const json = JSON.stringify(estados, null, 2) + "\n";
  await writeFile(dataPath, json, "utf8");
}