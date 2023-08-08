import React from "react";
import logo from '../images/logo.svg';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {logOut} from './AuthApi'

function Header({email}) {
    const location = useLocation();
    const navigate = useNavigate();
    
    function signOut() {
        logOut()
        .then((data) => {
            navigate('/sign-in');
        })
        .catch((error) => {
            console.log(error.message)
        })
    }
    return(
        <header className="header">
            <img src ={logo} alt="Логотип" className="header__logo"/>
            {location.pathname === "/" && 
            <div className="header__container">
                <p className="header__email">{email}</p>
                <Link className="header__links header__links-exit" to='/sign-in' onClick={signOut}>Выйти</Link>
            </div>
            }
            {location.pathname === "/sign-up" && <Link className="header__links" to='/sign-in'>Войти</Link>}
            {location.pathname === "/sign-in" && <Link className="header__links" to='/sign-up'>Регистрация</Link>}
        </header>
    )
}

export default Header;