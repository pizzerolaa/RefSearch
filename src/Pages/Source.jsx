import React from "react";
import "./styles/Source.css";
import Globe from "../Components/Assets/globe-beish.svg";
import Ref from "../Components/Assets/bookmark.svg";
import Pdf from "../Components/Assets/download.svg";

const Source = () => {
    return (
        <div className="source">
            <div className="source-idioma">
                <div className="source-idioma-1">
                    <button>
                        <img src={Ref} alt="" />
                    </button>
                </div>
                <div className="source-idioma-1">
                    <button>
                        <img src={Globe} alt="" />
                        <span>Idioma</span>
                    </button>
                </div>
            </div>
            <div className="source-tab">
                <h1>Título del Artículo</h1>
                <h2>Autor o Fuente</h2>
                <div className="source-info">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia distinctio repudiandae numquam eius enim, rerum sequi temporibus debitis dolor repellat saepe rem, minus sint. Quam, dignissimos? Doloremque, facilis rem?</p>
                </div>
                <div className="source-tab-buttons">
                    <button>
                        <span>Ver más</span>
                    </button>
                    <button>
                        <span>Chat</span>
                    </button>
                </div>
            </div>
            <div className="source-pdf">
                <button>
                    <span>PDF</span>
                    <img src={Pdf} alt="" />            
                </button>
            </div>
        </div>
    );
};

export default Source;