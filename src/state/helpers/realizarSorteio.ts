import shuffle from 'just-shuffle';

export function realizarSorteio(participantes: string[]) {
  const totalParticipantes = participantes.length;
  const randomizeArray = shuffle(participantes);
  const resultado = new Map<string, string>();
  for (let index = 0; index < participantes.length; index++) {
    const indiceDoAmigo = index === totalParticipantes - 1 ? 0 : index + 1;
    resultado.set(randomizeArray[index], randomizeArray[indiceDoAmigo]);
  }
  return resultado;
}
