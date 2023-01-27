/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../components/context/userContext';
import { setItem } from '../../services/localStorageFunction/localStorageFunction';
import { ToastContainer } from 'react-toastify';
import api from '../../services/api/api';
import validate from '../../services/validate/validate';
import ShowHidePassword from '../../components/showHidePassword';

export default function LoginPage() {
  const initialstate = { email: "", password: "" };
  const [user, setUser] = useState(initialstate);
  const [showPassword, setShowPassword] = useState(false);
  const { logged, setLogged } = useContext(Context);
  const { loggedUser, setLoggedUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (logged && loggedUser) {
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onShowPassword() {
    setShowPassword(!showPassword);
  }

  function updateUser(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  function loginUser(e) {
    e.preventDefault()

    api.post("/login", user)
      .then((res) => {

        if (res.data.msg) {
          setLogged(true)
          setLoggedUser(res.data.user);

          setItem("logged", true);
          setItem("token", res.data.token);
          setItem("user", res.data.user);
          navigate("/", { replace: true })
        }

      }).catch((error) => {
        validate(error.response.data.error)
      })
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <form className="login-form" onSubmit={loginUser}>
          <h2 className="login-form-title">ENTRAR</h2>

          <div className="form-fields">
            <div className="input-email fields">
              <label htmlFor="input_email"><HiOutlineMail /> E-mail</label>
              <input type="email" name="email" id="input_email" onChange={(e) => { updateUser(e) }} value={user.email ? user.email : ""} />
            </div>

            <div className="input-password fields">
              <label htmlFor="input_password"><RiLockPasswordFill />Senha</label>
              <input type={showPassword ? "text" : "password"} name="password" id="input_password" onChange={(e) => { updateUser(e) }} value={user.password ? user.password : ""} />
              <button onClick={onShowPassword} type="button" id="show_password-login"><ShowHidePassword showPassword={showPassword} /></button>
            </div>
            
            <a className="forgot-password-link" href="#">Esqueceu a senha?</a>

            <div className="field-remember">
              <input type="checkbox" id="checkbox_input_remember"></input>
              <label htmlFor="checkbox_input_remember">Lembrar</label>
            </div>

          </div>
          <button type="submit" id="btn_send">ENTRAR</button>
        </form>

        <h3 className="sign-form-link">Não tem uma conta? <Link to="/sign-up">Cadastrar</Link></h3>
      </div>
    </>
  )
}
