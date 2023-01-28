import React, { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/userContext';
import { CartContext } from '../context/cartContext';
import { ProductContext } from '../context/productContext'

export default function ButtonLogout({ id }) {
    const { setLogged } = useContext(Context);
    const { setLoggedUser } = useContext(Context);
    const { setCart } = useContext(CartContext);
    const { setProductSubtotal } = useContext(ProductContext);
    const { setNewProductNotify } = useContext(CartContext)
    const navigate = useNavigate()

    function logoutUser() {
        setLogged(false);
        setLoggedUser({});
        setCart([]);
        setProductSubtotal(0);
        setNewProductNotify(0)

        localStorage.clear()
        navigate("/login", { replace: true })
    }

    return (
        <button type="button" onClick={logoutUser} id={id}><FiLogOut />SAIR</button>
    )
}
