import React from 'react';
import "./Navbar.css";
import user from "../Assets/user.svg";
import idioma from "../Assets/globe.svg";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-functions">
                <div class="navbar-login">
                    <img src={user} alt="login" />   
                </div>
                <div className="navbar-idioma">
                    <button>
                        <img src={idioma} alt="" />
                        <p>Idioma</p>
                    </button>
                </div>
            </div>
            <div className="navbar-logo">
                <p>RefSearch</p>
            </div>
        </div>
    );
};

export default Navbar;
