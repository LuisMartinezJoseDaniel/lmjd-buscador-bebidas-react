import { Col, Card, Button } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

const Bebida = ({ bebida }) => {
  const { idDrink: id, strDrink: nombreBebida, strDrinkThumb: imagen } = bebida;
  //Manejar el state del modal en BebidasPovider
  const { handleModalClick, handleBebidaIdClick } = useBebidas();

  return (
    <Col md={6} lg={3}>
      <Card className="mb-4 rounded-3 shadow">
        <Card.Img
          variant="top"
          src={imagen}
          alt={`Imagen de ${nombreBebida}`}
        />
        <Card.Body>
          <Card.Title>{nombreBebida}</Card.Title>
        </Card.Body>
        <Card.Footer className="bg-white">
          <Button
            className="w-100 text-uppercase mt-2"
            variant="warning"
            onClick={() => {
              handleModalClick();
              handleBebidaIdClick(id);
            }}
          >
            Ver receta
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Bebida;
