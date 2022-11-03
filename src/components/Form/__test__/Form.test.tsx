import { act, fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { Form } from '../Form';

// Jest

describe('Testando comportamento do formulário', () => {
  // test() recebe dois parametros, o primeiro uma descrição do que vai ser testado e o segundo uma função de callback que é onde está o teste

  test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
    // render recebe como parametro o componente que será renderizado para ser usado no teste
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
    // encontrando o input no DOM
    // usando o getByPlaceholderText para encontrar o input na tela. O screen é a tela.
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );
    // encontrando o botão pela role dele que nesse caso é button
    const btn = screen.getByRole('button');
    // verificando se o input está no DOM
    expect(input).toBeInTheDocument();
    // verificando se o botão está desabilitado
    expect(btn).toBeDisabled();
  });

  // Padrão de como escrever testes

  //test('um nome que que descreve o que vamos testar', () => {
  // arrumamos o cenário (por exemplo, renderizar um componente, buscamos componentes)
  // agimos (realizamos clicks, definimos valores)
  // afirmamos o que queremos (onde realizamos as expectativas)
  //});

  // Esse padrão de organização do teste é conhecido como AAA (Arrange, Act and Assert em inglês).

  test('adicionar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );
    const btn = screen.getByRole('button');

    // inserir valor no input
    fireEvent.change(input, {
      target: {
        value: 'WillAngelis',
      },
    });

    // clicar no btn de submit
    fireEvent.click(btn);

    expect(input).toHaveFocus();
    // garantir que o form seja limpo e o foco volte para o input
    expect(input).toHaveValue('');
  });

  test('nomes duplicados não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );
    const btn = screen.getByRole('button');

    fireEvent.change(input, {
      target: {
        value: 'WillAngelis',
      },
    });

    fireEvent.click(btn);

    fireEvent.change(input, {
      target: {
        value: 'WillAngelis',
      },
    });

    fireEvent.click(btn);

    const msgError = screen.getByRole('alert');

    expect(msgError.textContent).toBe('Nomes duplicados não são permitidos!');
  });

  test('mensagem de alerta deve sumir depois de alguns segundos', () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );
    const btn = screen.getByRole('button');

    fireEvent.change(input, {
      target: {
        value: 'WillAngelis',
      },
    });

    fireEvent.click(btn);

    fireEvent.change(input, {
      target: {
        value: 'WillAngelis',
      },
    });

    fireEvent.click(btn);

    let msgError = screen.queryByRole('alert');
    expect(msgError).toBeInTheDocument();

    // espera N segundos
    act(() => {
      /* fire events that update state */
      jest.runAllTimers();
    });

    // getByRole caso não encontra o teste falha, queryByRole caso não encontre o teste continua

    msgError = screen.queryByRole('alert');
    expect(msgError).toBeNull();
  });
});
