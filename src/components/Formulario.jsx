import { useState } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
import useCategorias from "../hooks/useCategorias";

const Formulario = () => {
  const { categorias } = useCategorias();
  const { consultarBebida } = useBebidas();
  
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });
  const [alerta, setAlerta] = useState('')

  const handleBusquedaChange = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = ( e ) => {
    e.preventDefault();
    if ( Object.values( busqueda ).includes( '' ) ) {
      setAlerta( 'Todos los campos son obligatorios' );
      setTimeout(() => {
        setAlerta('')
      }, 3000 );
      return;
    }
    consultarBebida( busqueda );
  };

  return (
    <Form onSubmit={handleSubmit}>
      {alerta && <Alert variant="danger" className="text-center">{ alerta }</Alert>}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre bebida</Form.Label>
            <Form.Control
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej: Tequila, Vodka etc."
              onChange={handleBusquedaChange}
              value={busqueda.nombre}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="categoria">Categoria de la Bebida</Form.Label>
            <Form.Select
              id="categoria"
              name="categoria"
              onChange={handleBusquedaChange}
              value={busqueda.categoria}
            >
              <option>--Selecciona la categoria--</option>
              {categorias.map(({ strCategory }) => (
                <option key={strCategory} value={strCategory}>
                  {strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col md={3}>
          <Button variant="danger" className="text-uppercase w-100" type="submit">
            Buscar Bebidas
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;
