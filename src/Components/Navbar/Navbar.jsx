import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import "./Navbar.css";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import Dropdown from '../Dropdown/Dropdown';
import user from "../Assets/user.svg";
import userBlue from "../Assets/user-blue.svg";
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
        localStorage.setItem('LANG', localStorage.getItem('LANG') === "ES" ? "EN" : "ES");
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
                <button className='navbar-loggedIn'>
                    <Menu>
                        <MenuButton>My account</MenuButton>
                        <MenuItems anchor="bottom">
                            <MenuItem>
                            <a className="menu-item" href="/settings">
                                Settings
                            </a>
                            </MenuItem>
                            <MenuItem>
                            <a className="" href="/support">
                                Support
                            </a>
                            </MenuItem>
                            <MenuItem>
                            <a className="block data-[focus]:bg-blue-100" href="/license">
                                License
                            </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                    <img src={userBlue} id='navbar-account' alt="loggedIn" />
                    <p>{userName}</p>
                </button>
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
                            <img src={idioma} alt="" />
                            <p>{localStorage.getItem('LANG') === "ES" ? 'English' : 'Español'}</p>
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
