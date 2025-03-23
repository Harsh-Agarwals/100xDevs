import { createContext, useState } from 'react';

const AlertContext = createContext();

const AlertState = ({ children }) => {
    const [message, setMessage] = useState("Welcome to iNotebook");
    const [color, setColor] = useState("text-blue-700");
    const [style, setStyle] = useState("bg-sky-300");
    const [alertNow, setAlert] = useState(true);

    return (
        <AlertContext.Provider value={{ style, message, color, alertNow, setStyle, setMessage, setColor, setAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export { AlertContext }; // ✅ Correct way to export the context
export default AlertState; // ✅ Exporting the provider
