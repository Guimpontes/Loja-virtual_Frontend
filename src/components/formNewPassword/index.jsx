import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../context/userContext';
import { getItem } from '../../services/localStorageFunction/localStorageFunction';
import api from '../../services/api/api';
import validate from '../../services/validate/validate';
import validateToken from '../../services/validate/validateToken';
import ShowHidePassword from '../showHidePassword';

export default function FormNewPassword() {
    const initialState = { current_password: "", new_password: "", confirm_new_password: "" };
    const [passwordForm, setPasswordForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false)
    const { logged } = useContext(Context)

    function updatePasswordForm(e) {
        const { name, value } = e.target
        setPasswordForm({ ...passwordForm, [name]: value })
    }

    function onShowPassword() {
        setShowPassword(!showPassword);
    }

    function onShowNewPassword() {
        setShowNewPassword(!showNewPassword)
    }

    function changePassword(e) {
        e.preventDefault()

        api.post("/update-user-data/change-password", passwordForm,
            { headers: { 'x-access-token': getItem("token") } })
            .then((res) => {
                setPasswordForm(initialState)
                toast.success("Senha alterada com sucesso", { autoClose: 2000 })
            }).catch((error) => {
                console.log(error.response.data)
                validate(error.response.data.error)
                validateToken(error.response.data.error, logged)
            })
    }

    return (
        <form className="new-password-form" onSubmit={changePassword}>
            <h2 className="form-title">Senha</h2>

            <div className="field-current-password  my-account-fields">
                <input type={showPassword ? "text" : "password"} name="current_password" placeholder="Senha atual" onChange={(e) => updatePasswordForm(e)} value={passwordForm.current_password} />
                <button id="show_password_form_password" className="show-password" onClick={onShowPassword} type="button"><ShowHidePassword showPassword={showPassword} /></button>
            </div>

            <div className="field-new-password  my-account-fields">
                <input type={showNewPassword ? "text" : "password"} name="new_password" placeholder="Nova senha" onChange={(e) => updatePasswordForm(e)} value={passwordForm.new_password} />
                <button id="show_new_password_form_password" className="show-password" onClick={onShowNewPassword} type="button"><ShowHidePassword showPassword={showNewPassword} /></button>
            </div>

            <div className="field-confirm-new-password my-account-fields">
                <input type={showNewPassword ? "text" : "password"} name="confirm_new_password" placeholder="Confirmar nova senha"
                    onChange={(e) => updatePasswordForm(e)} value={passwordForm.confirm_new_password} disabled={passwordForm.new_password === "" && passwordForm.confirm_new_password === "" ? true : false} />
            </div>

            <button type="submit" id="btn_edit_password_form">EDITAR</button>
        </form>

    )
}
