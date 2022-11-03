import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../../../state/hook/useListaDeParticipantes';
import { useResultadoSorteio } from '../../../state/hook/useResultadoSorteio';
import { Sorteio } from '../Sorteio';

jest.mock('../../../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});
jest.mock('../../../state/hook/useResultadoSorteio.ts', () => {
  return {
    useResultadoSorteio: jest.fn(),
  };
});

describe('na pagina de sorteio', () => {
  const participantes = [
    'Will',
    'Angelis',
    'William',
    'Bia',
    'Rosana',
    'Sampaio',
  ];
  const resultado = new Map([
    ['Will', 'William'],
    ['Bia', 'Angelis'],
    ['Rosana', 'Sampaio'],
  ]);

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
  });

  test('todos os participantes podem exibir o seu amigo secreto', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const opcoes = screen.queryAllByRole('option');
    expect(opcoes).toHaveLength(participantes.length + 1);
  });

  test('o amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );
    const select = screen.getByPlaceholderText('Selecione o seu nome');
    fireEvent.change(select, {
      target: {
        value: participantes[0],
      },
    });
    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    const amigoSecreto = screen.getByRole('alert');
    expect(amigoSecreto).toBeInTheDocument();
  });
});
