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
    const [references, setReferences] = useState([]);

    const fetchReferences = async () => {
        try {
            const username = localStorage.getItem('username');
            const response = await axios.post('http://localhost:8800/get-references-by-username', { username });
            setReferences(response.data);
        } catch (error) {
            console.error('Error fetching references:', error);
        }
    };

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
    fetchReferences();
  }, [language]);

  const handleClick = () => {
    window.history.back();
  };

  const parsList = (rawReference) => {
    const parsedReference = JSON.parser(rawReference);
    return parsedReference;
  }

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
                {references.map((ref, index) => {
                    const { title, authors, link, summary, year } = ref;
                    return (
                        <div className="references-tab" key={index}>
                            <div className="references-content">
                                {link ? (
                                    <Link to={{ pathname: link }} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <h4>{title}</h4>
                                    </Link>
                                ) : (
                                    <h4>{title}</h4>
                                )}
                                <div className="references-info">
                                    <p><strong>Authors:</strong> {authors.join(', ')}</p>
                                    <p><strong>Summary:</strong> {summary}</p>
                                    <p><strong>Year:</strong> {year}</p>
                                </div>
                            </div>
                            <div className="references-ref">
                                <button>
                                    <img src={FullRef} alt="Full Reference" />
                                </button>
                            </div>
                        </div>
                    );
                })}
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