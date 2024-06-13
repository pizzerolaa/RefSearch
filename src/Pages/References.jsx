import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/References.css";
import FullRef from "../Components/Assets/bookmark-full.svg";
import Back from "../Components/Assets/arrowBack.svg";
import Copy from "../Components/Assets/copy.svg";
import axios from 'axios';

const References = () => {
    const [translatedText, setTranslatedText] = useState({});
    const [language] = useState(localStorage.getItem('LANG')); // Lenguaje por defecto, español en este caso

    const textToTranslate = {
    back: "Atrás",
    copy: "Copiar"
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

  const handleClick = () => {
    window.history.back();
  };

    return (
        <div className="references">
            <div className="references-idioma">
                <div className="references-idioma-1">
                    {/* <Link style={{textDecoration:'none'}} > */}
                        <button onClick={handleClick}>
                            <img src={Back} alt="" />
                            <span>{translatedText.back}</span>
                        </button>
                    {/* </Link> */}
                </div>
            </div>
            <div className="references-display">
                <div className="references-tab">
                    <div className="references-content">
                        <Link style={{textDecoration:'none'}} to='/source'>
                            <h4>Título del artículo</h4>
                        </Link>
                        <div className="references-info">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                        </div>
                    </div>
                    <div className="references-ref">
                        <button>
                            <img src={FullRef} alt="" />
                        </button>
                    </div>
                </div>
                <div className="references-tab">
                    <div className="references-content">
                        <Link style={{textDecoration:'none'}} to='/source'>
                            <h4>Título del artículo</h4>
                        </Link>
                        <div className="references-info">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                        </div>
                    </div>
                    <div className="references-ref">
                        <button>
                            <img src={FullRef} alt="" />
                        </button>
                    </div>
                </div>
                <div className="references-tab">
                    <div className="references-content">
                        <Link style={{textDecoration:'none'}} to='/source'>
                            <h4>Título del artículo</h4>
                        </Link>
                        <div className="references-info">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                        </div>
                    </div>
                    <div className="references-ref">
                        <button>
                            <img src={FullRef} alt="" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="references-copy">
                <button>
                    <span>{translatedText.copy}</span>
                    <img src={Copy} alt="" />            
                </button>
            </div>
        </div>
    );
};

export default References;