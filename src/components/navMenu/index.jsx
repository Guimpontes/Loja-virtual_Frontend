import React, { useContext } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { FiHome, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Context } from '../context/userContext';
import { NavMenuContext } from '../context/navMenuContext';
import ButtonLogout from '../buttonLogout';

export default function NavMenu() {
  const [showNavMenu, setShowNavMenu] = useContext(NavMenuContext);
  const { logged } = useContext(Context);
  const { loggedUser } = useContext(Context);

  function handleFirstName() {
    if (loggedUser.name) {
      return loggedUser.name.split(" ")[0]
    }
  }

  function handleClick(e) {
    const element = e.target.localName;
    const className = e.target.className;
    const parentNode = e.target.parentNode.localName;

    if (parentNode === "nav" || parentNode === "a" || parentNode === "svg" || parentNode === "button") {
      setShowNavMenu(false)
    }

    if (element === "button" || element === "a" || className === "transparent-black-screen show") {
      setShowNavMenu(false);
    }
  }

  return (
    <>
      <div onClick={(e) => handleClick(e)} className={showNavMenu ? "nav-menu show" : "nav-menu"}>
        <h2 className="nav-menu-title">Olá, {loggedUser.name ? handleFirstName() : "Faça Login"} </h2>

        <nav className="menu">
          <Link to="/my-account"><BiUserCircle /> Minha conta</Link>
          <Link to="/"><FiHome /> Home</Link>
        </nav>

        <div className="log-sign">
          {logged ? <ButtonLogout id="btn_logout" /> : <Link to="/login" className="link-sign"><FiLogIn /> ENTRAR</Link>}
          {!logged ? <Link to="/sign-up">Cadastrar</Link> : ""}
        </div>

      </div>

      <div onClick={(e) => handleClick(e)} className={showNavMenu ? "transparent-black-screen show" : "transparant-black-screen"}></div>
    </>
  )
}
