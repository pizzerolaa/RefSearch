import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/Login.css';
import User from "../Components/Assets/user-blue.svg";

const Login = () => {

  return (
    
        <div className="login">
            <div className="login-tab">
                <div className='header-user'>
                    <img src={User} alt="" />    
                <h1>Iniciar Sesión</h1>
                </div>
            
                <div className="login-container">
                        <input className="inputs" id='login-email' type="text" placeholder="correo@type.com" />
                        <input className="inputs" id='login-password' type="password" placeholder="Contraseña" />
                        <Link style={{textDecoration:'none'}} to='/'>
                            <button className="inputs" id='login-signin' type="submit">Ingresar</button>
                            <button className="inputs" id='login-signup' type="submit">Registrar</button>
                        </Link>
                </div>

                <div className='footer-lang'>

                    {/* <button id='login-idioma'>
                        <IoEarthOutline />
                        <span>Idioma</span>
                    </button> */}

                </div>
            </div>
        </div>
    

    
  );
};

export default Login;
