export const categoriasPermitidas = ["inicial", "progreso", "final", "cancelado"];

export function createEstadoId(estados) {
  const max = estados.reduce((acc, estado) => {
    const numericPart = Number(estado.id.split("-")[1]) || 0;
    return Math.max(acc, numericPart);
  }, 0);

  return `EST-${String(max + 1).padStart(3, "0")}`;
}