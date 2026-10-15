import React from "react";
import { useState } from "react";
import { ContextAutor } from "./ContextAutor";

export const AutorProvider = ({children}) => {const [autor, setAutor] = useState("Cheto");
    return (
        <ContextAutor.Provider value={{autor, setAutor}}>
        {children}
        </ContextAutor.Provider>
    );
};
