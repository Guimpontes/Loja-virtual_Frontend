import React, { useState, useEffect, createContext } from 'react';
import { getItem, setItem } from '../../services/localStorageFunction/localStorageFunction';

export const CartContext = createContext()

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [newProductNotify, setNewProductNotify] = useState(getItem("newProductNotify") || 0)

    useEffect(() => {
        if (newProductNotify) {
            setItem("newProductNotify", newProductNotify)
        }
    }, [newProductNotify])

    return (
        <CartContext.Provider value={{
            cart, setCart,
            newProductNotify, setNewProductNotify
        }}>
            {children}
        </CartContext.Provider >
    )
}
