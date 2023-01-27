import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import api from '../../services/api/api'
import validate from '../../services/validate/validate';
import ShowHidePassword from '../../components/showHidePassword';

export default function SignUpPage() {
    const initialValues = { name: "", email: "", password: "", repeat_password: "" };
    const [user, setUser] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);

    function onShowPassword() {
        setShowPassword(!showPassword);
    }

    function updateUser(e) {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    function signUpUser(e) {
        e.preventDefault();

        api.post("/registration", user)
            .then((res) => {

                if (res.data.msg) {
                    toast.success("Usuário cadastrado com sucesso", { autoClose: 2000 });
                    setUser({})
                } else {
                    toast.error("Esse usuário já existe", { autoClose: 2000 })
                }

            }).catch((error) => {
                validate(error.response.data.error)
            })
    }

    return (
        <>
            <ToastContainer />
            <div className="container">
                <form className="sign-form" onSubmit={signUpUser}>
                    <h2 className="sign-form-title">CADASTRAR</h2>

                    <div className="form-fields">
                        <div className="input-name fields">
                            <label htmlFor="input_name">Nome</label>
                            <input type="text" name="name" id="input_name" onChange={(e) => { updateUser(e) }} value={user.name ? user.name : ""} />
                        </div>

                        <div className="input-email fields">
                            <label htmlFor="input_email">E-mail</label>
                            <input type="text" name="email" id="input_email" onChange={(e) => { updateUser(e) }} value={user.email ? user.email : ""} />
                        </div>

                        <div className="input-password fields">
                            <label htmlFor="input_password">Senha</label>
                            <input type={showPassword ? "text" : "password"} name="password" id="input_password" onChange={(e) => { updateUser(e) }} value={user.password ? user.password : ""} />
                            <button onClick={onShowPassword} type="button" id="show_password-sign"><ShowHidePassword showPassword={showPassword} /></button>
                        </div>

                        <div className="input-confirm-password fields">
                            <label htmlFor="input_confirm_password">Confirmar senha</label>
                            <input type={showPassword ? "text" : "password"} name="repeat_password" id="input_confirm_password" onChange={(e) => { updateUser(e) }} value={user.repeat_password ? user.repeat_password : ""} disabled={user.password || user.repeat_password ? false : true} />
                        </div>
                    </div>

                    <button type="submit" id="btn_send">CADASTRAR</button>
                </form>

                <h3 className="login-form-link">Já tem uma conta? <Link to="/login">Entrar</Link></h3>
            </div>
        </>
    )
}
