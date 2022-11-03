import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';

export const ListaDeParticipantes = () => {
  const participantes: string[] = useListaDeParticipantes();

  return (
    <ul>
      {participantes.map((participante) => (
        <li key={participante}>{participante}</li>
      ))}
    </ul>
  );
};
