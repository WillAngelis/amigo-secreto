import { FormEvent, useRef, useState } from 'react';
import { useAddParticipante } from '../../state/hook/useAddParticipante';
import { useMensagemErro } from '../../state/hook/useMensagemErro';

import './styles.css';

export const Form = () => {
  const [nome, setNome] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const adicionarNaLista = useAddParticipante();
  const msgErro = useMensagemErro();

  const addParticipante = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    adicionarNaLista(nome);
    setNome('');
    inputRef.current?.focus();
  };
  return (
    <form onSubmit={addParticipante}>
      <div className="group-input-btn">
        <input
          ref={inputRef}
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          type="text"
          placeholder="Insira os nomes dos participantes"
        />
        <button type="submit" disabled={!nome}>
          Adicionar
        </button>
      </div>
      {Boolean(msgErro) && (
        <p className="alert error" role="alert">
          {msgErro}
        </p>
      )}
    </form>
  );
};
