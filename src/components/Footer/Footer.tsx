import { useNavigate } from 'react-router-dom';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import { useSorteador } from '../../state/hook/useSorteador';

import './styles.css';

export const Footer = () => {
  const participantes = useListaDeParticipantes();

  const navigate = useNavigate();
  const sortear = useSorteador();

  const iniciar = () => {
    sortear();
    navigate('/sorteio');
  };

  return (
    <footer className="footer-configs">
      <button
        className="btn"
        disabled={participantes.length < 3}
        onClick={iniciar}
      >
        Iniciar brincadeira
      </button>
      <img src="/imgs/sacolas.png" alt="Sacolas de compras" />
    </footer>
  );
};
