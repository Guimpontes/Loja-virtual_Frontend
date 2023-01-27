import React, { useContext, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { SearchFieldContext } from '../context/searchFieldContext';
import { ProductContext } from '../context/productContext';
import { toast } from "react-toastify"
import apiProducts from '../../services/api/apiProducts';

export default function SearchField() {
    const showInputSearch = useContextSelector(SearchFieldContext, inputSearch => inputSearch.showInputSearch);
    const setShowInputSearch = useContextSelector(SearchFieldContext, inputSearch => inputSearch.setShowInputSearch);
    const setSearchLoading = useContextSelector(SearchFieldContext, inputSearch => inputSearch.setSearchLoading)
    const [textSearch, setTextSearch] = useState("");
    const { setProductList } = useContext(ProductContext);
    const { emptyList, setEmptyList } = useContext(ProductContext)
    const location = useLocation().pathname;

    function searchProduct(e) {
        e.preventDefault();

        if (textSearch === "") {
            return toast.error("Preencha o campo de pesquisa", { autoClose: 2000 })
        }

        setSearchLoading(true);
        setTextSearch("")
        setShowInputSearch(false);

        apiProducts("search", {
            params: {
                limit: "50",
                offset: "0",
                q: textSearch
            }
        })
            .then((res) => {
                setProductList(res.data.results);

                if (res.data.results.length < 1) {
                    setEmptyList(true)
                } else {
                    setEmptyList(false)
                }
            }).finally(

                setTimeout(() => {
                    setSearchLoading(false)
                }, 1000)
            )
    }

    if (location === "/") {
        return (
            <form>
                <div className={showInputSearch ? "search-field show" : "search-field"}>
                    <input type="text" id="input_search" onChange={({ target: { value } }) => setTextSearch(value)} value={textSearch} />
                    <button onClick={searchProduct} type="submit" id="btn_search"><BiSearchAlt2 /></button>
                </div>
            </form>
        )
    }

}
