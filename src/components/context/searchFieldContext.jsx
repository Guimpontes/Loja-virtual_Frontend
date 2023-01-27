import React, { useState } from 'react';
import { createContext } from 'use-context-selector'

export const SearchFieldContext = createContext()

export default function SearchFieldProvider({ children }) {
    const [showInputSearch, setShowInputSearch] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false)

    return (
        <SearchFieldContext.Provider value={{
            showInputSearch, setShowInputSearch,
            searchLoading, setSearchLoading
        }}>
            {children}
        </SearchFieldContext.Provider>
    )
}
