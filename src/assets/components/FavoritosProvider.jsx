import { useState } from "react";
import { ContextFavoritos } from "./ContextFavoritos";

export const FavoritosProvider = ({children}) => {const [favoritos, setFavoritos] = useState([]);
    return (
        <ContextFavoritos.Provider value={{favoritos, setFavoritos}}>
        {children}
        </ContextFavoritos.Provider>
    );
};
