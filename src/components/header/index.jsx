import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { FaTimes } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavMenuContext } from '../context/navMenuContext';
import { SearchFieldContext } from '../context/searchFieldContext';
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '../context/cartContext'

export default function Header() {
  const showInputSearch = useContextSelector(SearchFieldContext, inputSeach => inputSeach.showInputSearch);
  const setShowInputSearch = useContextSelector(SearchFieldContext, inputSeach => inputSeach.setShowInputSearch);

  const [showNavMenu, setShowNavMenu] = useContext(NavMenuContext);
  const { newProductNotify } = useContext(CartContext);
  const location = useLocation().pathname;

  function onShowNavMenu() {
    setShowNavMenu(!showNavMenu);
  }

  function SerchIcon() {
    if (showInputSearch) {
      return (<FaTimes />)
    } else {
      return (<BiSearchAlt2 />)
    }
  }

  function MenuIcon() {
    if (showNavMenu) {
      return (<FaTimes />)
    } else {
      return (<GiHamburgerMenu />)
    }
  }

  function onShowInputSearch() {
    setShowInputSearch(!showInputSearch);
  }

  return (
    <>
      <header className={location === "/sign-up" ? "" : "scroll"}>
        <h1 className="brand"><Link to="/">STORE</Link></h1>

        <div className="header-btns">

          {location === "/" ? <button onClick={onShowInputSearch} type="button" id="btn_show_search_field"><SerchIcon /></button> : ""}

          <div className="cart">
            <Link to="/cart"><HiOutlineShoppingCart /></Link>
            <span className={newProductNotify > 0 ? "new_product_notify show" : "new_product_notify"}>{newProductNotify > 50 ? "+50" : newProductNotify}</span>
          </div>

          <div className="btn-menu">
            <button onClick={onShowNavMenu} type="button" id="btn_menu"><MenuIcon /></button>
          </div>
        </div>
      </header>
    </>
  )
}
