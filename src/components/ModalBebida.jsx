import { useState } from "react";
import { Modal, Image } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
import Spinner from "./Spinner";

const ModalBebida = () => {
  const { modal, handleModalClick, receta, cargando } = useBebidas();
  const {
    idDrink:idReceta,
    strDrinkThumb: imagenReceta,
    strDrink: tituloReceta,
    strInstructions: instruccionesReceta,
  } = receta;

  const getIngredientes = () => {

    let ingredientes = [];
    for (let index = 1; index <= 15; index++) {

      const ingrediente = receta[`strIngredient${index}`];
      const cantidad = receta[`strMeasure${index}`];

      // Nota. Método push en React:
      // Para añadir elementos a un arreglo, se usa el método push, siempre y cuando, no se este utilizando un useState, si se utiliza un state es mejor utilizar setState(), ya que, el método push modifica el arreglo original, y eso no debe hacerse en React.

      if (ingrediente && cantidad) {
        ingredientes.push(
          <li key={idReceta+index}>
            {ingrediente} - {cantidad}
          </li>
        );

      }
    }
    return( ingredientes );

  };


  return (
    <Modal show={modal} onHide={handleModalClick}>
      {cargando ? (
        <Spinner />
      ) : (
        <>
          <Image src={imagenReceta} alt={`Imagen receta ${tituloReceta}`} />
          <Modal.Header>
            <Modal.Title>{tituloReceta}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-3">
              <h2>Instrucciones</h2>
              {instruccionesReceta}
              <h2>Ingredientes y cantidades</h2>
              {getIngredientes()}
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default ModalBebida;
