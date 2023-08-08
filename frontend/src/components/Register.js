import React, { useState } from "react";
import {Link} from 'react-router-dom'
import {register} from './AuthApi'

function Register({handleTooltipClick, setIsOk}){
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        register(formValue.email, formValue.password)
        .then((data) => {
            setIsOk(true);
            handleTooltipClick();
        })
        .catch((error) => {
            setIsOk(false);
            handleTooltipClick();
        })
    }

    return (
        <div className="register__container">
            <h2 className="register__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <input onChange={handleChange} id='email' name='email' type='email' placeholder="Email" className="register__input" value={formValue.email}></input>
                <input onChange={handleChange} id='password' name='password' type='password' placeholder="Пароль" className="register__input" value={formValue.password}></input>
                <button type="submit" className="register__button">Зарегистрироваться</button>
            </form>
            <Link to='/sign-in' className="register__link">Уже зарегистрированы? Войти</Link>
        </div>
    )
}

export default Register;