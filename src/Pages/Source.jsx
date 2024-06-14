import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";
import "./styles/Source.css";
import Globe from "../Components/Assets/globe-beish.svg";
import Ref from "../Components/Assets/bookmark.svg";
import Pdf from "../Components/Assets/download.svg";
import Back from "../Components/Assets/arrowBack.svg";

const Source = () => {

    const [article, setArticle] = useState(null);

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
                        <span>Atrás</span>
                    </button>
                </div>
                <div className="source-idioma-1">
                    {/* <button>
                        <img src={Globe} alt="" />
                        <span>Idioma</span>
                    </button> */}
                </div>
            </div>
            <div className="source-tab">
                <h1>{article.title}</h1>
                <h2>Autores: {article.authors.join(', ') || 'Unknown Author'}</h2>
                <h2>Año: {article.year || 'Not available'}</h2>
                <div className="source-info">
                    <p>{article.summary || 'Not summary available. This might be a recent paper or preprint.'}</p>
                </div>
                <h3><strong>REFERENCIA:</strong></h3>
                <h3> {article.title}. ({article.year || 's.f.'}). {article.authors.join(', ') || 'Unknown Author'}. {article.link}</h3>

                <div className="source-tab-buttons">
                    <button onClick={handleViewMoreClick}>
                        <span>Ver más</span>
                    </button>
                    <button>
                        <CopyToClipboard text={handleReferenceClick()}>
                            <span onClick={() => toast('Copiado al portapapeles', {position: "top-center"})} style={{textAlign: "center"}}>Referencia</span>
                        </CopyToClipboard>
                        <Toaster />
                    </button>
                </div>
            </div>
            <div className="source-idioma">
                <div className="source-idioma-1">
                    {/* <button>
                        <img src={Ref} alt="" />
                    </button> */}
                </div>
                <div className="source-idioma-2">
                    {/* <button>
                        <span>PDF</span>
                        <img src={Pdf} alt="" />            
                    </button> */}
                </div>    
            </div>
        </div>
    );
};

export default Source;