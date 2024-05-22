import React from 'react';
import "./Navbar.css";
import user from "../Assets/user.svg";
import idioma from "../Assets/globe.svg";

const Navbar = () => {
  return (
    <div className="navbar">
        <div class="navbar-login">
            <button className='login-button'>
                <img src={user} alt="login" />
            </button>
        </div>
        <div className="navbar-idioma">
            <button>
                <img src={idioma} alt="" />
                <p>Idioma</p>
            </button>
        </div>
    </div>
  );
};

export default Navbar;
