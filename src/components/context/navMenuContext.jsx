import React, { createContext, useState } from 'react';

export const NavMenuContext = createContext()

export default function NavMenuProvider({ children }) {
    const [showNavMenu, setShowNavMenu] = useState(false);

    return (
        <NavMenuContext.Provider value={[showNavMenu, setShowNavMenu]}>
            {children}
        </NavMenuContext.Provider>
    )
}
