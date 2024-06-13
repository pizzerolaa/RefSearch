import React, { useState, useEffect } from 'react';
import './styles/Login.css';
import User from "../Components/Assets/user-blue.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [translatedText, setTranslatedText] = useState({});
    const [language, setLanguage] = useState(localStorage.getItem('LANG'));
    
    const textToTranslate = {
        titulo: 'Login',
        mail: 'mail',
        domain: 'domain',
        extension: 'extension',
        password: 'Password',
        login: 'Log in',
        signup: 'Sign up'
      };

    const translateText = async (textsToTranslate = textToTranslate) => {
        try {
          const response = await axios.post('http://localhost:8800/translate', {
            text: Object.values(textsToTranslate).join('\n'),
            targetLang: language,
          });
          const translations = response.data.translations[0].text.split('\n');
          const translatedObject = Object.keys(textsToTranslate).reduce((acc, key, index) => {
            acc[key] = translations[index];
            return acc;
          }, {});
          setTranslatedText(translatedObject);
        } catch (error) {
          console.error('Error al traducir:', error);
        }
      };
      
      useEffect(() => {
        translateText();
      }, [language]);
      
    let userRef = '';

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
            const res = await axios.post('http://localhost:8800/register', login);
            userRef = login.username;
            localStorage.setItem('isLogged', true);
            localStorage.setItem('username', userRef);
            navigate('/');  
            window.reload();
        } catch (err) {
            console.error(err);
            localStorage.setItem('isLogged', false);
            alert("El correo ya esta registrado");
            window.location.reload();
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8800/login', login);
            userRef = login.username;
            localStorage.setItem('isLogged', true);
            localStorage.setItem('username', userRef);
            navigate('/');
            window.location.reload();
        } catch (err) {
            console.error(err);
            /* localStorage.setItem('isLogged', false); */
            window.location.reload();
            alert("Intento de login");
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
                <h1>{translatedText.titulo}</h1>
                </div>
                
                <div className="login-container">
                        <input className="inputs" id='login-email' type="text" placeholder={translatedText.mail+"@"+translatedText.domain+"."+translatedText.extension} name='username' onChange={handleChange}/>
                        <input className="inputs" id='login-password' type="password" placeholder={translatedText.password} name='password' onChange={handleChange}/> 
                        <button className="inputs" id='login-signin' type="submit" onClick={handleLogin}>{translatedText.login}</button>
                        <button className="inputs" id='login-signup' type="submit" onClick={handleSubmit}>{translatedText.signup}</button>
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
