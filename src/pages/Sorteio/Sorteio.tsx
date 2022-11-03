import { useState } from 'react';
import { Card } from '../../components/Card/Card';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import { useResultadoSorteio } from '../../state/hook/useResultadoSorteio';

import './styles.css';
export const Sorteio = () => {
  const participantes = useListaDeParticipantes();
  const [participanteDaVez, setParticipanteDaVez] = useState('');
  const [amigoSecreto, setAmigoSecreto] = useState('');
  const resultado = useResultadoSorteio();
  const sortear = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!);
    }
  };

  return (
    <Card>
      <section className="sorteio">
        <form onSubmit={sortear}>
          <select
            required
            name="participanteDaVez"
            id="participanteDaVez"
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={(e) => setParticipanteDaVez(e.target.value)}
          >
            <option>Selecione seu nome</option>
            {participantes.map((participante) => (
              <option key={participante}>{participante}</option>
            ))}
          </select>
          <button className="btn-sortear">Sortear</button>
        </form>
        {Boolean(amigoSecreto) && (
          <p className="resultado" role="alert">
            {amigoSecreto}
          </p>
        )}
        <footer className="sorteio">
          <img
            src="/imgs/aviao.png"
            className="aviao"
            alt="Um desenho de um avião de papel"
          />
        </footer>
      </section>
    </Card>
  );
};
