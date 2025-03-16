import { createContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({children}) => {
    const [color, setColor] = useState("white");

    return (
        <ColorContext.Provider value={{color, setColor}}>
            {children}
        </ColorContext.Provider>
    )
};

export default ColorContext;