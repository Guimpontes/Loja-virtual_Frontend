import React, { useContext, useState } from 'react';
import { getItem, setItem } from '../../services/localStorageFunction/localStorageFunction';
import { Context } from '../../components/context/userContext'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import ButtonLogout from '../../components/buttonLogout';
import ShowHidePassword from '../../components/showHidePassword'
import api from '../../services/api/api';
import validate from '../../services/validate/validate';
import FormNewPassword from '../../components/formNewPassword';
import validateToken from '../../services/validate/validateToken';
import FormDeleteAccount from '../../components/formDeleteAccount';
import { IoIosArrowUp } from 'react-icons/io'


export default function MyAccount() {
  const { logged } = useContext(Context);
  const { loggedUser, setLoggedUser } = useContext(Context);
  const inititalState = { name: loggedUser.name, email: loggedUser.email, current_password: "" };
  const [userForm, setUserForm] = useState(inititalState);
  const [showPassword, setShowPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);

  function onShowForm(e) {
    e.preventDefault()
    setShowForm(!showForm)
  }



  function updateUserForm(e) {
    const { name, value } = e.target
    setUserForm({ ...userForm, [name]: value })
  }

  function onShowPassword() {
    setShowPassword(!showPassword);
  }

  function updateUserData(e) {
    e.preventDefault()

    api.post("/update-user-data", userForm,
      { headers: { 'x-access-token': getItem("token") } }
    )
      .then((res) => {
        userForm.current_password = ""
        toast.success("Dados atualizados com sucesso", { autoClose: 2000 })
        setLoggedUser(res.data.user);
        setItem("user", res.data.user)
      })
      .catch((error) => {
        console.log(error.response.data);
        validate(error.response.data.error);
        validateToken(error.response.data.error, logged)
      })
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="my-account-container">
          <form className={showForm ? "my-account-form show" : "my-account-form"} onSubmit={updateUserData}>
            <button className={showForm ? "btn-show-form show" : "btn-show-form"} onClick={onShowForm}><IoIosArrowUp /></button>
            <h2 className={showForm ? "form-title" : "form-title show"}>Minha conta</h2>

            <div className="field-name my-account-fields">
              <input
                type="text"
                name="name"
                placeholder="Nome"
                onChange={(e) => updateUserForm(e)} value={userForm.name}
              />
            </div>

            <div className="field-email  my-account-fields">
              <input
                type="text"
                name="email"
                placeholder="E-mail"
                onChange={(e) => updateUserForm(e)}
                value={userForm.email}
              />
            </div>

            <div className="field-current-password  my-account-fields">
              <input
                type={showPassword ? "text" : "password"}
                name="current_password" placeholder="Senha atual"
                onChange={(e) => updateUserForm(e)} value={userForm.current_password}
              />
              <button id="show_password-my-account" className="show-password" onClick={onShowPassword} type="button"><ShowHidePassword showPassword={showPassword} /></button>
            </div>

            <button type="submit" id="btn_edit">EDITAR</button>
          </form>

          <FormNewPassword />
          <FormDeleteAccount />
        </div>

        <ButtonLogout id="btn_logout_my_account" />
      </div>
    </>
  )
}
