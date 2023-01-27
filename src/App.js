import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/app.css'
import 'react-toastify/dist/ReactToastify.css'

// COMPONENTS
import Header from './components/header';
import SearchField from './components/searchField';
import NavMenu from './components/navMenu';
import Footer from './components/footer'
import PrivateRoute from './components/privateRoute';

// PROVIDERS
import ContextProvider from './components/context/userContext';
import SearchFieldProvider from './components/context/searchFieldContext';
import NavMenuProvider from './components/context/navMenuContext';
import CartProvider from './components/context/cartContext';
import ProductProvider from './components/context/productContext';


// PAGES
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/singUpPage';
import Home from './pages/home';
import MyAccount from './pages/myAccount';
import ShoppingCart from './pages/cart';
import NotFound from './pages/notFound';

function App() {
  return (
    <>
      <ContextProvider>
        <SearchFieldProvider>
          <NavMenuProvider>
            <CartProvider>
              <ProductProvider>
                <Router>

                  <Header />
                  <NavMenu />
                  <SearchField />

                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="sign-up" element={<SignUpPage />} />
                    <Route path="/my-account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
                    <Route path="/cart" element={<ShoppingCart />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>

                  <Footer />
                </Router>
              </ProductProvider>
            </CartProvider>
          </NavMenuProvider>
        </SearchFieldProvider>
      </ContextProvider>
    </>
  )
}

export default App;
