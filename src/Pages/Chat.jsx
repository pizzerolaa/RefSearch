import React from "react";
import { Link } from "react-router-dom";
import "./styles/Chat.css";
import Globe from "../Components/Assets/globe-beish.svg";
import FullRef from "../Components/Assets/bookmark-full.svg";
import Back from "../Components/Assets/arrowBack.svg";
import Copy from "../Components/Assets/copy.svg";

const Chat = () => {
    return (
        <div className="chat">
            <div className="chat-idioma">
                <div className="chat-idioma-1">
                    <Link style={{textDecoration:'none'}} to='/results'>
                        <button>
                            <img src={Back} alt="" />
                            <span>Atrás</span>
                        </button>
                    </Link>
                </div>
                <div className="chat-idioma-2">
                    <button>
                        <img src={Globe} alt="" />
                        <span>Idioma</span>
                    </button>
                </div>
            </div>
            <div className="chat-display">
                
            </div>
            <div className="chat-copy">
                <button>
                    <span>Copiar</span>
                    <img src={Copy} alt="" />            
                </button>
            </div>
        </div>
    );
};

export default Chat;