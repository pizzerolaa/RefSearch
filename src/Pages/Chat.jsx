import React from "react";
import { Link } from "react-router-dom";
import "./styles/Chat.css";
import Globe from "../Components/Assets/globe-beish.svg";
import FullRef from "../Components/Assets/bookmark-full.svg";
import Back from "../Components/Assets/arrowBack.svg";
import Send from "../Components/Assets/send.svg";

const Chat = () => {
    return (
        <div className="chat">
            <div className="chat-idioma">
                <div className="chat-idioma-1">
                    <Link style={{textDecoration:'none'}} to='/source'>
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
                <h1>Título del Artículo</h1>
                <div className="chat-chat">
                    <div className="chat-bubble">
                        <div className="chat-ai">
                            <div className="chat-text-1">
                                <p>¿Qué quieres conocer acerca de la fuente?</p>
                            </div>
                        </div>
                        <div className="chat-user">
                            <div className="chat-text-2">
                                <p>¿De qué trata el artículo?</p>
                            </div>
                        </div>
                        <div className="chat-ai">
                            <div className="chat-text-1">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ratione sint, velit et in eius ex quibusdam voluptatem neque alias doloremque, officia vitae laboriosam quo aperiam quas consectetur possimus cumque?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde nemo quia inventore quaerat esse. Accusantium soluta non accusamus reprehenderit, repellat necessitatibus reiciendis consectetur officia hic obcaecati molestiae pariatur corrupti? Nisi!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="chat-entry">
                        <input type="text" placeholder="Escribe un mensaje..." />
                        <button>
                            <span>Enviar</span>
                            <img src={Send} alt="" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="chat-copy">
                <button>
                    <img src={FullRef} alt="" />            
                </button>
            </div>
        </div>
    );
};

export default Chat;