import React, { useContext } from 'react';
import { Context } from '../context/userContext';
import { BiError } from 'react-icons/bi';

export default function PrivateRoute({ children }) {
    const { logged } = useContext(Context);

    if (logged) {
        return (children)
    }

    return (
        <div className="container">
            <div className="private-route-page">
                <h2>Faça login para acessar essa página.</h2>
                <BiError />
            </div>
        </div>
    )
}
