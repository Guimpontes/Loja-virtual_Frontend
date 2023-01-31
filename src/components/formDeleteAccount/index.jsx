import React, { useState } from "react";
import { getItem } from "../../services/localStorageFunction/localStorageFunction";
import { IoIosArrowUp } from "react-icons/io";
import ShowHidePassword from "../showHidePassword";
import api from "../../services/api/api";
import validate from "../../services/validate/validate";

export default function FormDeleteAccount() {
  const initialState = { password: "", email: "" };
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const [showForm, setShowForm] = useState(false);

  function onShowForm(e) {
    e.preventDefault();
    setShowForm(!showForm);
  }

  function onShowPassword() {
    setShowPassword(!showPassword);
  }

  function updateForm(e) {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  }

  function deleteAccount(e) {
    e.preventDefault();

    api
      .post("/delete-user", form, {
        headers: { "x-access-token": getItem("token") },
      })
      .then((res) => {
        localStorage.clear();
        window.location.replace("/login");
      })
      .catch((error) => {
        console.log(error.response.data);
        validate(error.response.data.error);
      });
  }

  return (
    <form className={showForm ? "form-delete-account show" : "form-delete-account"} onSubmit={deleteAccount}>
      <button className={showForm ? "btn-show-form show" : "btn-show-form"} onClick={onShowForm}> <IoIosArrowUp /></button>

      <h2 className={showForm ? "form-title" : "form-title show"}> Excluir conta </h2>

      <div className="field-password my-account-fields">
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          onChange={(e) => updateForm(e)}
          value={form.email}
        />
      </div>

      <div className="field-password my-account-fields">
        <input type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Digite a senha"
          onChange={(e) => updateForm(e)}
          value={form.password}
        />
        <button type="button" id="btn_show_password" className="show-password" onClick={onShowPassword} ><ShowHidePassword showPassword={showPassword} /></button>
      </div>

      <button id="btn_delete_account">DELETAR</button>
    </form>
  );
}
