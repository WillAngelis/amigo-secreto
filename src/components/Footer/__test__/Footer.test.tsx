import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../../../state/hook/useListaDeParticipantes';
import { Footer } from '../Footer';

jest.mock('../../../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao,
  };
});

jest.mock('../../../state/hook/useSorteador.ts', () => {
  return {
    useSorteador: () => mockSorteio,
  };
});

describe('quando não existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });

  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const btn = screen.getByRole('button');

    expect(btn).toBeDisabled();
  });
});

describe('quando existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([
      'Will',
      'Angelis',
      'William',
    ]);
  });

  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const btn = screen.getByRole('button');

    expect(btn).not.toBeDisabled();
  });

  test('navegando para outra página', () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(mockNavegacao).toHaveBeenCalledTimes(1);
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
    expect(mockSorteio).toHaveBeenCalledTimes(1);
  });
});
