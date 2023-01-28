import { toast } from 'react-toastify';

export default function validateToken(error, logged) {
    if ((logged && error === 'Token invalid') || (logged && error === 'Access Denied')) {
        toast.error("Token inválido. Você será deslogado", { autoClose: 3000, pauseOnHover: false });

        setTimeout(() => {
            localStorage.clear();
            window.location.replace("/login");
        }, 4000)
    }
}