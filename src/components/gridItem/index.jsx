import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { Context } from '../context/userContext';
import { getItem } from '../../services/localStorageFunction/localStorageFunction';
import { CartContext } from '../context/cartContext';
import api from '../../services/api/api'
import priceFormat from '../../services/productPriceFormat/formatPrice';
import BtnLoading from '../btnLoading';
import validateToken from '../../services/validate/validateToken';

export default function GridItem({ img, title, price, sold, product }) {
    const { cart, setCart } = useContext(CartContext);
    const { newProductNotify, setNewProductNotify } = useContext(CartContext)
    const { logged } = useContext(Context);
    const [showBtnLoading, setShowBtnLoading] = useState(false)
    const navigate = useNavigate()

    function addProductToCart(product) {
        if (logged) {
            setShowBtnLoading(true)

            api.post("/cart/add-product",
                { product },
                { headers: { 'x-access-token': getItem("token") } })

                .then((res) => {
                    if (res.status === 201) {
                        setCart([...cart, product]);
                        setNewProductNotify(newProductNotify + 1);
                    }
                }).catch((error) => {
                    console.log(error.response.data);
                    validateToken(error.response.data.error, logged);

                    if (error.response.data.error === 'This product is already in the cart') {
                        toast.warning("Esse produto já está no carrinho", { autoClose: 2000 })
                    }
                }).finally(() => {
                    setShowBtnLoading(false)
                })
        } else {
            toast.error("Faça login", { autoClose: 2000, pauseOnHover: false });

            setTimeout(() => {
                navigate("/login")
            }, 3000)
        }
    }

    function ProductBtn() {
        const productInCart = logged ? cart.find((item) => item.id === product.id) : false;

        if (showBtnLoading) {
            return (<BtnLoading />)
        }

        if (productInCart) {
            return (<Link id="cart_link" to="/cart">CARRINHO</Link>)
        } else {
            return (<button id="btn_buy" onClick={() => addProductToCart(product)}><HiOutlineShoppingCart /><span>COMPRAR</span></button>)
        }
    }

    return (
        <div className="grid-item">
            <div className="product-img">
                <img src={img} alt="product" />
            </div>

            <div className="product-title">
                <p>{title}</p>
            </div>

            <div className="product-price">
                <h3>R$ {priceFormat(price)}</h3>
                <span>À vista no pix</span>
                <div className="decoration-line"></div>
            </div>

            <div className="solled-products">
                <p>Vendidos <span>({sold})</span></p>
            </div>

            <ProductBtn />
        </div >
    )
}
