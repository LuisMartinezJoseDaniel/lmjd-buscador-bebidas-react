import { Col, Card, Button } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
import { BsFillHeartFill } from "react-icons/bs";

const Bebida = ({ bebida }) => {
  const { idDrink: id, strDrink: nombreBebida, strDrinkThumb: imagen } = bebida;
  //Manejar el state del modal en BebidasPovider
  const { handleModalClick, handleBebidaIdClick } = useBebidas();

  return (
    <Col md={6} lg={3}>
      <Card className="mb-4 rounded-3 shadow ImgOverlay bg-dark bg-gradient text-white">
        <Card.Img
          variant="top"
          src={imagen}
          alt={`Imagen de ${nombreBebida}`}
        />
        <Card.ImgOverlay
          className="gradient pointer"
          onClick={() => {
            handleModalClick();
            handleBebidaIdClick(id);
          }}
        >
          <Card.Body className="d-flex justify-content-between align-items-center">
            <Card.Title className="">{nombreBebida}</Card.Title>
            <p className="mt-1 text-hover">
              <BsFillHeartFill/>
            </p>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
};

export default Bebida;
