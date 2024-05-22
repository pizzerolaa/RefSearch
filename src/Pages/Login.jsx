import React, { useState } from 'react';
// import { FaUser } from "react-icons/fa";
// import { IoEarthOutline } from "react-icons/io5";
import './styles/Login.css';

const Login = () => {

  return (
    <div className="login">
        <div className="login-container">
            <h1>Login</h1>
            <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
