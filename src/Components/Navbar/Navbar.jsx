import { Link } from 'react-router-dom';
import React from 'react';
import "./Navbar.css";
import user from "../Assets/user.svg";
import idioma from "../Assets/globe.svg";


const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-functions">

                <div className="navbar-login">
                    <Link style={{textDecoration:'none'}} to='/login'>
                        <img src={user} id='navbar-account' alt="login" />
                    </Link>
                </div>

                <div className="navbar-idioma">
                    {<button id='navbar-idioma'>
                        <img src={idioma} alt="" />
                        <p>Idioma</p>
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
