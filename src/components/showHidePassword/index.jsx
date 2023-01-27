import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function ShowHidePassword({ showPassword }) {
    function PasswordIcon() {
        if (showPassword) {
            return (<AiOutlineEye />)
        } else {
            return (<AiOutlineEyeInvisible />)
        }
    }

    return (
        <PasswordIcon />
    )
}
