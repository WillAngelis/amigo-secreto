import { Card } from '../../components/Card/Card';
import { Footer } from '../../components/Footer/Footer';
import { Form } from '../../components/Form/Form';
import { ListaDeParticipantes } from '../../components/ListaDeParticipantes/ListaDeParticipantes';

export const ConfigsPage = () => {
  return (
    <Card>
      <section>
        <h2>Vamos começar!</h2>
        <Form />
        <ListaDeParticipantes />
        <Footer />
      </section>
    </Card>
  );
};
