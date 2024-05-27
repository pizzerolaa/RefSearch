import React from "react";
import { Link } from "react-router-dom";
import "./styles/References.css";
import Globe from "../Components/Assets/globe-beish.svg";
import FullRef from "../Components/Assets/bookmark-full.svg";
import Back from "../Components/Assets/arrowBack.svg";
import Copy from "../Components/Assets/copy.svg";

const References = () => {
    return (
        <div className="references">
            <div className="references-idioma">
                <div className="references-idioma-1">
                    <Link style={{textDecoration:'none'}} to='/results'>
                        <button>
                            <img src={Back} alt="" />
                            <span>Atrás</span>
                        </button>
                    </Link>
                </div>
                <div className="references-idioma-2">
                    <button>
                        <img src={Globe} alt="" />
                        <span>Idioma</span>
                    </button>
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
                    <span>Copiar</span>
                    <img src={Copy} alt="" />            
                </button>
            </div>
        </div>
    );
};

export default References;