import React, { useState } from 'react';
import './styles/Login.css';
import User from "../Components/Assets/user-blue.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8800/login', login);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    }
    // useEffect(() => {
    //     const fetchLogin = async () => {
    //         try {
    //             const res = await axios.get('http://localhost:8800/login');
    //             console.log(res);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     fetchLogin();
    // })

  return (
    
        <div className="login">
            <div className="login-tab">
                <div className='header-user'>
                    <img src={User} alt="" />    
                <h1>Iniciar Sesión</h1>
                </div>
                
                <div className="login-container">
                        <input className="inputs" id='login-email' type="text" placeholder="correo@type.com" name='username' onChange={handleChange}/>
                        <input className="inputs" id='login-password' type="password" placeholder="Contraseña" name='password' onChange={handleChange}/> 
                        <button className="inputs" id='login-signin' type="submit" onClick={handleSubmit}>Ingresar</button>
                        <button className="inputs" id='login-signup' type="submit" onClick={handleSubmit}>Registrar</button>
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
