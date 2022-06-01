import axios from "axios";
import { useState, useEffect, createContext } from "react";

const CategoriasContext = createContext();

const CategoriasProvider = ({ children }) => {
  
  const [categorias, setCategorias] = useState([]);

  const obtenerCategorias = async () => {
    try {
      // c=list -> listar categorias
      const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
      const {
        data: { drinks },
      } = await axios(url);
      setCategorias(drinks);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <CategoriasContext.Provider value={{ categorias }}>
      {children}
    </CategoriasContext.Provider>
  );
};

export { CategoriasProvider };

export default CategoriasContext;
