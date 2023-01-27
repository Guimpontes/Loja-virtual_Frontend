import { createContext, useState } from 'react';
import { getItem } from '../../services/localStorageFunction/localStorageFunction';
export const Context = createContext();

export default function ContextProvider({ children }) {
    const [logged, setLogged] = useState(getItem("logged") || false);
    const [loggedUser, setLoggedUser] = useState(getItem("user") || {});


    return (
        <Context.Provider value={{
            logged, setLogged,
            loggedUser, setLoggedUser, 
        }}>
            {children}
        </Context.Provider>
    )
}