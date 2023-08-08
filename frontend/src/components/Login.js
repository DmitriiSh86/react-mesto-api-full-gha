import React from "react";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import {authorization} from './AuthApi'
import api from '../utils/Api'

function Login({handleLogin, handleTooltipClick, setIsOk, setCurrentUser}){
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

    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        authorization(formValue.email, formValue.password)
        .then((data) => {
            api.getUserInfo().then((user) => {setCurrentUser(user.data)}).catch((err) => console.log(err));
            handleLogin(true);
            navigate('/');
        })
        .catch((error) => {
            setIsOk(false);
            handleTooltipClick();
            console.log(error.message)
        })
    }

    return (
        <div className="register__container">
            <h2 className="register__title">Вход</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <input onChange={handleChange} id='email' name='email' type='email' placeholder="Email" className="register__input" value={formValue.email}></input>
                <input onChange={handleChange} id='password' name='password' type='password' placeholder="Пароль" className="register__input" value={formValue.password}></input>
                <button type="submit" className="register__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;