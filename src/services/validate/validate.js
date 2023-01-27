import { toast } from 'react-toastify';


export default function validate(error) {

    // Name validate
    if (error === '"name" is not allowed to be empty') {
        toast.error("Preencha o campo nome", { autoClose: 2000 })
    } else if (error === '"name" length must be at least 3 characters long') {
        toast.error("Mínimo 3 caracteres no campo nome", { autoClose: 2000 })
    } else if (error === '"name" length must be less than or equal to 30 characters long') {
        toast.error("Máximo 30 caracteres no campo nome", { autoClose: 2000 })
    }

    // Email validate
    if (error === '"email" is not allowed to be empty') {
        toast.error("Preencha o campo email", { autoClose: 2000 })
    } else if (error === '"email" length must be at least 3 characters long') {
        toast.error("Mínimo 3 caracteres no campo email", { autoClose: 2000 })
    } else if (error === '"email" must be a valid email') {
        toast.error("Preencha com um email válido", { autoClose: 2000 })
    } else if (error === '"email" length must be less than or equal to 50 characters long') {
        toast.error("Máximo 50 caracteres no campo email", { autoClose: 2000 })
    } else if (error === 'Email already registered') {
        toast.error("Email já cadastrado", { autoClose: 2000 })
    }

    // Password validate
    if (error === '"password" is not allowed to be empty' || error === '"password" is required' || error === '"current_password" is not allowed to be empty') {
        toast.error("Preencha o campo senha", { autoClose: 2000 })
    } else if (error === '"new_password" is not allowed to be empty') {
        toast.error("Preencha o campo Nova senha", { autoClose: 2000 })
    } else if (error === '"password" length must be at least 6 characters long' || error === '"current_password" length must be at least 6 characters long') {
        toast.error("Mínimo 6 caracteres no campo senha", { autoClose: 2000 })
    } else if (error === '"repeat_password" must be [ref:password]' || error === '"confirm_new_password" must be [ref:new_password]') {
        toast.error("As senhas não coincidem", { autoClose: 2000 })
    } else if (error === 'Current password incorrect') {
        toast.error("Senha atual incorreta", { autoClose: 2000 })
    } else if (error === 'New password cannot be the same as current password') {
        toast.error("A nova senha não pode ser igual a senha atual", { autoClose: 2000 })
    }

    // Eamil or passwor incorret
    if (error === 'Email or password incorrect') {
        toast.error("Email ou senha incorreta", { autoClose: 2000 })
    }

    // Change name or password 
    if (error === 'No data has been changed') {
        toast.error("Nenhum dado foi alterado", { autoClose: 2000 })
    }

    // Delete account
    if (error === 'invalid Data') {
        toast.error("Dados inválidos", { autoClose: 2000 })
    }
}