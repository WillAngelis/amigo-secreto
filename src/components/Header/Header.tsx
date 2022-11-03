import './styles.css';

export const Header = () => {
  return (
    <header className="header">
      <div
        className="imagem-logo"
        role="img"
        aria-label="Logo do Sorteador"
      ></div>
      <img
        className="participante"
        src="/imgs/participante.png"
        alt="Participante com um presente na mão"
      />
    </header>
  );
};
