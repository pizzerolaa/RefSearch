import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import "./Navbar.css";
import user from "../Assets/user.svg";
import idioma from "../Assets/globe.svg";

const Navbar = ({ onNavbarButtonClick, sharedVariable, setSharedVariable}) => {
    const [isES, setLangBt] = useState("ES");
    const [isLogin, setLogin] = useState(false);
    const userName = localStorage.getItem('username');
    
    const searchBarRef = useRef(null);

    useEffect(() => {
        const isLogged = localStorage.getItem('isLogged');
        setLogin(isLogged);
    }, []);


    // Función para manejar el cambio de estado al hacer clic
    const handleClick = () => {
        setLangBt(isES === "ES" ? "EN" : "ES");
        alert(isES);
        
    };

    const handleBarClick = () => {
        if (onNavbarButtonClick){
            onNavbarButtonClick();
        }
    }

    function userLogged() {
        if (isLogin === 'true') {
            return (
            <button className='navbar-loggedIn'>
                <img src={user} id='navbar-account' alt="loggedIn" />
                <p>{userName}</p>
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
                            <p>{isES === "ES" ? 'Español' : 'English'}</p>
                        </button>}
                    </div>

                    {/* <button onClick={handleBarClick}>Navbar Button</button> */}
                    

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
