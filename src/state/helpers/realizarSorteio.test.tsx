import { realizarSorteio } from './realizarSorteio';

describe('dado o sorteio de um amigo secreto', () => {
  test('cada participante nao sorteie o proprio nome', () => {
    const participantes = ['Will', 'Angelis', 'William', 'Beatriz', 'Bia'];

    const sorteio = realizarSorteio(participantes);
    participantes.forEach((participante) => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    });
  });
});
