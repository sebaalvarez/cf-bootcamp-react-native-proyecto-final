export const validarDisponibilidad = (
  horaApertura: string,
  horaCierre: string
) => {
  const ahora = new Date();
  const [hA, mA] = horaApertura.split(":").map(Number);
  const [hC, mC] = horaCierre.split(":").map(Number);

  const apertura = new Date();
  apertura.setHours(hA, mA, 0);

  const cierre = new Date();
  cierre.setHours(hC, mC, 0);

  return ahora >= apertura && ahora <= cierre;
};
