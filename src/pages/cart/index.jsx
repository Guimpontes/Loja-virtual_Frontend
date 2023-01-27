import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { CartContext } from '../../components/context/cartContext';
import { ProductContext } from '../../components/context/productContext';
import { getItem, setItem } from '../../services/localStorageFunction/localStorageFunction';
import { Context } from '../../components/context/userContext';
import ProductItem from '../../components/cartProductItem';
import priceFormat from '../../services/productPriceFormat/formatPrice';
import Loading from '../../components/loadScreen';
import api from '../../services/api/api';
import validateToken from '../../services/validate/validateToken';
import { ToastContainer } from 'react-toastify';

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const { setNewProductNotify } = useContext(CartContext)
  const { productSubtotal } = useContext(ProductContext);
  const { logged } = useContext(Context)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNewProductNotify(0);
    setItem("newProductNotify", 0)

    api.get("/cart/product-list",
      { headers: { 'x-access-token': getItem("token") } })
      .then((res) => {
        setCart(res.data.msg)
      }).catch((error) => {
        console.log(error.response.data);
        validateToken(error.response.data.error, logged)
      }).finally(

        setTimeout(() => {
          setLoading(false)
        }, 1000)
      )
  }, [])

  function CartEmpty() {
    if (cart.length < 1) {
      return (
        <li className="cart-empty">
          <h2>Seu carrinho está vazio</h2>
          <HiOutlineEmojiSad />
        </li>)
    }
  }

  if (loading) {
    return (<Loading />)
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="cart-page">
          <div className="total-products">
            <h2>Total de produto(s)</h2>
            <span>{cart.length}</span>
          </div>

          <ul className="cart-products">
            {cart.map((product) => {
              return (<ProductItem key={product.id} id={product.id} title={product.title} price={product.price} thumbnail={product.thumbnail} quantity={product.quantity}
                subtotal={product.subtotal} />)
            })}

            <CartEmpty />
          </ul>

          <div className="order-summary">
            <h2>Resumo</h2>

            <div className="subtotal">
              <h3>Total a pagar</h3>
              <h4>R$ {priceFormat(productSubtotal)}</h4>
            </div>

            <div className="summary-links">
              <Link id="link_checkout">FINALIZAR</Link>
              <Link to="/" id="link_keep_buying">CONTINUAR COMPRANDO</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
