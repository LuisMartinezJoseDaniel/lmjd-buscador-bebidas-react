import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [bebidaId, setBebidaId] = useState( null );
  const [receta, setReceta] = useState( {} );
  const [cargando, setCargando] = useState( false );

  const consultarBebida = async ({ nombre, categoria }) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
      const {
        data: { drinks },
      } = await axios(url);
      setBebidas(drinks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClick = () => {

    setModal( !modal );


  };

  const handleBebidaIdClick = (id) => {
    setBebidaId(id);
  };

  useEffect(() => {
    const obtenerRecetaBebida = async () => {
      if (!bebidaId) return;

      try {
        setCargando( true );
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const {
          data: { drinks },
        } = await axios(url);
        setReceta(drinks[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando( false );
      }
      
    };
    obtenerRecetaBebida();
  }, [bebidaId]);

  return (
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        handleModalClick,
        modal,
        handleBebidaIdClick,
        receta,
        cargando,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;
