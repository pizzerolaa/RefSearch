import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";
import "./styles/Source.css";
import Globe from "../Components/Assets/globe-beish.svg";
import Ref from "../Components/Assets/bookmark.svg";
import Pdf from "../Components/Assets/download.svg";
import Back from "../Components/Assets/arrowBack.svg";
import axios from 'axios';

const Source = () => {
    const [translatedText, setTranslatedText] = useState({});
    const [language] = useState(localStorage.getItem('LANG'));
    const [article, setArticle] = useState(null);

    const textToTranslate = {
        back: 'Atrás',
        authors: 'Autores',
        unknown: 'Autor desconocido',
        year: 'Año',
        nd: 'Sin fecha',
        summary: 'No se encontró un resumen, podría ser un artículo nuevo o una preimpresión',
        reference: 'Referencia',
        seem: 'Ver más',
        copy: "Copiado al portapapéles"
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

    useEffect(() => {
        const selectedArticle = localStorage.getItem('selectedArticle');
        if (selectedArticle) {
            const parsedArticle = JSON.parse(selectedArticle);
            setArticle(parsedArticle);
        }
    }, []);

    if (!article) {
        return <div>Loading...</div>;
    }

    const handleViewMoreClick = () => {
        if (article.link) {
            const cleanedLink = article.link.replace(/['"]+/g, '');
            window.open(cleanedLink, '_blank');
        }
    };

    const handleReferenceClick = () => {
        return `${article.title}. (${article.year || 's.f.'}). ${article.authors.join(', ') || 'Unknown Author'}. ${article.link}`;
    };


    const handleClick = () => {
        window.history.back();
    };


    return (
        <div className="source">
            <div className="source-idioma">
                <div className="source-idioma-1">
                    <button onClick={handleClick}>
                        <img src={Back} alt="" />
                        <span>{translatedText.back}</span>
                    </button>
                </div>
            </div>
            <div className="source-tab">
                <h1>{article.title}</h1>
                <h2>{translatedText.authors}: {article.authors.join(', ') || translatedText.unknown}</h2>
                <h2>{translatedText.year}: {article.year || translatedText.nd}</h2>
                <div className="source-info">
                    <p>{article.summary || translatedText.summary}</p>
                </div>
                <h3><strong>{translatedText.reference}</strong></h3>
                <h3> {article.title}. ({article.year || translatedText.nd}). {article.authors.join(', ') || translatedText.unknown}. {article.link}</h3>

                <div className="source-tab-buttons">
                    <button onClick={handleViewMoreClick}>
                        <span>{translatedText.seem}</span>
                    </button>
                    <button>
                        <CopyToClipboard text={handleReferenceClick()}>
                            <span onClick={() => toast(translatedText.copy, {position: "top-center"})} style={{textAlign: "center"}}>{translatedText.reference}</span>
                        </CopyToClipboard>
                        <Toaster />
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default Source;