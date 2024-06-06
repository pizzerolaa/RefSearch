import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import user from "../Assets/user.svg";
import idioma from "../Assets/globe.svg";

const Navbar = () => {
    const [isES, setLangBt] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const isLogged = localStorage.getItem('isLogged');
        setLogin(isLogged);
    }, []);


    // Función para manejar el cambio de estado al hacer clic
    const handleClick = () => {
        setLangBt(prevState => !prevState);
    };

    function userLogged() {
        if (isLogin === 'true') {
            return (
            <button id='navbar-login'>
                <img src={user} id='navbar-account' alt="loggedIn" />
                <p>{username}</p>
            </button>
            );
            } else {
                return (
            <img src={user} id='navbar-account' alt="login" />
            )
        };
    };

        return (
            <div className="navbar">
                <div className="navbar-functions">
                    <div className="navbar-login">
                        <Link style={{textDecoration:'none'}} to='/login'>
                            {userLogged()}
                        </Link>
                    </div>
                    <div className="navbar-idioma" onClick={handleClick}>
                        {<button id='navbar-idioma'>
                            <img src={idioma} alt="" />
                            <p>{isES ? 'English' : 'Español'}</p>
                        </button>}
                    </div>
                </div>
                <link rel="stylesheet" href="" />
                <div className="navbar-logo">
                    <Link style={{textDecoration:'none'}} to='/'>
                        <p>RefSearch</p>
                    </Link>
                </div>
            </div>
        );
};
export default Navbar;
