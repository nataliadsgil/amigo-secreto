import { realizarSorteio } from "./realizarSorteio";

describe('realizarSorteio()', () => {
  test('participante não deve sortear o próprio nome', () => {
    const participantes = [
      'Maria',
      'João',
      'José',
      'Claudio',
      'Ana',
      'Cleide'
    ];

    const sorteio = realizarSorteio(participantes);

    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    });
  });
});