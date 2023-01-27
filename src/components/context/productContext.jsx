import React, { useState, createContext } from 'react';

export const ProductContext = createContext()

export default function ProductProvider({ children }) {
    const [productList, setProductList] = useState([]);
    const [productSubtotal, setProductSubtotal] = useState(0);
    const [emptyList, setEmptyList] = useState(false)

    return (
        <ProductContext.Provider value={{
            productList, setProductList,
            productSubtotal, setProductSubtotal,
            emptyList, setEmptyList
        }}>

            {children}
        </ProductContext.Provider>
    )
}
