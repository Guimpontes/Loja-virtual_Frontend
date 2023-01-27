import React, { useState, useEffect, useContext } from 'react';
import { FaMinus } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { IoMdTrash } from 'react-icons/io';
import { getItem } from '../../services/localStorageFunction/localStorageFunction';
import { Context } from '../context/userContext';
import { CartContext } from '../context/cartContext';
import { ProductContext } from '../context/productContext';
import api from '../../services/api/api';
import priceFormat from '../../services/productPriceFormat/formatPrice';
import Loading from '../loadScreen/index'
import validateToken from '../../services/validate/validateToken';

export default function ProductItem({ id, title, price, thumbnail, quantity }) {
    const [productQuantity, setProductQuantity] = useState(quantity || 1);
    const [quantityCustom, setQuantityCustom] = useState(1);
    const [loading, setLoading] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const { setProductSubtotal } = useContext(ProductContext);
    const { logged } = useContext(Context)

    useEffect(() => {
        calcSubtotal(cart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setQuantityCustom(productQuantity)
    }, [productQuantity])

    function updateCart(produtct) {
        setLoading(true)

        api.put("/cart/update-list",
            { cart: produtct },
            { headers: { 'x-access-token': getItem("token") } })
            .then((res) => {
                setCart(res.data.msg)
            })
            .catch((error) => {
                console.log(error.response.data);
                validateToken(error.response.data.error, logged)
            }).finally(
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            )
    }

    function incrementQuantity() {
        const productFinded = cart.find((item) => item.id === id);
        productFinded.quantity += 1;
        productFinded.subtotal = calcTotalByProduct(productFinded);
        setProductQuantity(productFinded.quantity);
        updateCart(cart);
        calcSubtotal(cart)
    }

    function decrementQuantity() {
        const productFinded = cart.find((item) => item.id === id);

        if (productFinded.quantity > 1) {
            productFinded.quantity -= 1;
            productFinded.subtotal = calcTotalByProduct(productFinded);
            setProductQuantity(productFinded.quantity);
            updateCart(cart);
            calcSubtotal(cart);
        }
    }

    function customQuantity() {
        const productFinded = cart.find((item) => item.id === id);
        productFinded.quantity = Math.max(quantityCustom, 1);
        productFinded.subtotal = calcTotalByProduct(productFinded);
        setQuantityCustom(productFinded.quantity);
        updateCart(cart)
        calcSubtotal(cart);
    }


    function deleteProduct(id) {
        const newCart = cart.filter((item) => item.id !== id);
        updateCart(newCart);
        calcSubtotal(newCart);
    }

    function calcTotalByProduct(product) {
        return (product.quantity * product.price).toFixed(2)
    }

    function calcSubtotal(list) {
        if (list.length < 1) {
            return setProductSubtotal(0)
        }

        const subtotalArray = list.map((item) => {
            if (!item.subtotal) {
                item.subtotal = 0
            }
            return Number(item.subtotal)
        })

        const subtotal = subtotalArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)
        setProductSubtotal(Number(subtotal.toFixed(2)))
    }

    if (loading) {
        return (<Loading />)
    }

    return (
        <li className="product">
            <div className="trash">
                <button onClick={() => deleteProduct(id)} id="remove_product"><IoMdTrash /></button>
            </div>

            <div className="product-info-container">
                <div className="product-resume">
                    <img src={thumbnail} alt="cart-product" />
                    <p>{title}</p>
                </div>

                <div className="product-quantity-and-price">
                    <div className="product-quantity">
                        <h3>Quantidade</h3>
                        <div className="quantity">
                            <button onClick={() => { decrementQuantity() }}><FaMinus /></button>
                            <input
                                type="number"
                                onChange={({ target: { value } }) => setQuantityCustom(value)}
                                onBlur={() => { customQuantity() }}
                                value={quantityCustom}
                            />
                            <button onClick={() => { incrementQuantity() }}><FiPlus strokeWidth={4} /></button>
                        </div>
                    </div>

                    <div className="cart-product-price">
                        <h3>R$ {priceFormat(price)}</h3>
                        <span>À vista no pix</span>
                    </div>
                </div>
            </div>

            <div className="dividing-line"></div>
        </li>
    )
}
