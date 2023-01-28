import React, { useState, useEffect, useContext } from 'react';
import { getItem } from '../../services/localStorageFunction/localStorageFunction';
import { SearchFieldContext } from '../context/searchFieldContext';
import { useContextSelector } from 'use-context-selector';
import { CartContext } from '../context/cartContext';
import { ProductContext } from '../context/productContext';
import { Context } from '../context/userContext';
import { ToastContainer } from 'react-toastify';
import api from '../../services/api/api';
import apiProduct from '../../services/api/apiProducts';
import GridItem from '../gridItem';
import Loading from '../loadScreen';
import validateToken from '../../services/validate/validateToken';

export default function GridList() {
    const searchLoading = useContextSelector(SearchFieldContext, inputSearch => inputSearch.searchLoading);
    const [loading, setLoading] = useState(true);
    const { productList, setProductList } = useContext(ProductContext);
    const { setCart } = useContext(CartContext);
    const { emptyList, setEmptyList } = useContext(ProductContext);
    const { logged } = useContext(Context);

    useEffect(() => {
        setLoading(true);

        apiProduct.get("search", {
            params: {
                limit: "50",
                offset: "0",
                category: "MLB1144"
            }
        })
            .then((res) => {
                setProductList(res.data.results);

                if (res.data.results.length < 1) {
                    setEmptyList(true)
                } else {
                    setEmptyList(false)
                }

                api.get("/cart/product-list",
                    { headers: { 'x-access-token': getItem("token") } })
                    .then((res) => {
                        setCart(res.data.msg);
                    }).catch((error) => {
                        console.log(error.response.data);
                        validateToken(error.response.data.error, logged)
                    });
            }).finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }

            )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading || searchLoading) {
        return (<Loading />)
    }

    if (emptyList) {
        return (
            <h2>Nenhum produto encontrado</h2>
        )
    }

    return (
        <>
            <ToastContainer />
            <div className="grid">
                {productList.map((products) => {
                    return (<GridItem key={products.id} product={products}
                        img={products.thumbnail} title={products.title} price={products.price} sold={products.available_quantity} />)
                })
                }
            </div>
        </>
    )
}
