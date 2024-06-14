import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import "./Navbar.css";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import Dropdown from '../Dropdown/Dropdown';
import user from "../Assets/user.svg";
import userBlue from "../Assets/user-blue.svg";
import idioma from "../Assets/globe.svg";
import mexico from "../Assets/bandera.png";
import usa from "../Assets/usa.png";

const Navbar = ({ onNavbarButtonClick, sharedVariable, setSharedVariable}) => {
    const [isES, setLangBt] = useState("ES");
    const [isLogin, setLogin] = useState(false);
    const userName = localStorage.getItem('username');
    const [toggled, setToggled] = useState(false);
    
    const searchBarRef = useRef(null);

    useEffect(() => {
        const isLogged = localStorage.getItem('isLogged');
        setLogin(isLogged);
    }, []);


    // Función para manejar el cambio de estado al hacer clic
    const handleClick = () => {
        localStorage.setItem('LANG', localStorage.getItem('LANG') === "ES" ? "EN" : "ES");
        window.location.reload();
        setToggled(!toggled)
    };

    const logout = () => {
        localStorage.setItem('isLogged', false);
        localStorage.setItem('username', '');
        window.location.reload();
    };

    const handleBarClick = () => {
        if (onNavbarButtonClick){
            onNavbarButtonClick();
        }
    }

    function userLogged() {
        if (isLogin === 'true') {
            return (
            <div className="navbar-loggedIn">
                    <Menu>
                        <MenuButton className="menuButton"> 
                            <img src={userBlue} id='navbar-account' alt="loggedI`   n" />
                            <p>{userName}</p>
                        </MenuButton>

                        <div className="menu" style={{listStyleType: 'none'}}>
                            <MenuItems anchor="bottom">
                                <li className="dropdown-item" style={{listStyleType: 'none'}}>
                                    <MenuItem>
                                    <a className="menu-item" href="/References">
                                        Referencias
                                    </a>
                                    </MenuItem>
                                </li>

                                <li className="dropdown-item" style={{listStyleType: 'none'}}>
                                    <MenuItem>
                                    <a className="menu-item" onClick={logout}>
                                        Cerrar sesión
                                    </a>
                                    </MenuItem>
                                </li>
                            </MenuItems>
                        </div>
                    </Menu>
            </div>
            );
            } else {
                return (
                <div className="navbar-login">
                    <Link style={{textDecoration:'none'}} to='/login'>
                        <img src={user} id='navbar-account' alt="login" />
                    </Link>
                </div>
            )
        };
    };

        return (
            <div className="navbar">
                <div className="navbar-functions">
                    {userLogged()}
                    <div className="navbar-idioma" onClick={handleClick}>
                        {<button id='navbar-idioma'>
                            
                            {localStorage.getItem('LANG') === "ES" ? <img src={usa} alt="" /> : <img src={mexico} alt="" />}
                            {localStorage.getItem('LANG') === "ES" ? "EN" : "ES"}
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
