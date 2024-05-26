import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import './styles/Login.css';

const Login = () => {

  return (
    
        <div className="login">
            <div className="login-tab">
                <div className='header-user'>
                <button><FaUser /></button>
                <h1>Iniciar Sesión</h1>
                </div>
            
                <div className="login-container">
                    <form>
                    <input className="inputs" id='login-email' type="text" placeholder="correo@type.com" />
                    <input className="inputs" id='login-password' type="password" placeholder="Contraseña" />
                    <button className="inputs" id='login-signin' type="submit">Ingresar</button>
                    <button className="inputs" id='login-signup' type="submit">Registrar</button>
                    </form>
                </div>

                <div className='footer-lang'>

                    <button id='login-idioma'>
                        <IoEarthOutline />
                        <span>Idioma</span>
                    </button>

                </div>
            </div>
        </div>
    

    
  );
};

export default Login;
