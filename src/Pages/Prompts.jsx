import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Prompts.css';
import Redo from "../Components/Assets/redo.svg";

const Prompts = () => {
    return (
        <div className='prompts'>
            <h1>
                ¿Qué idea te agrada más?
            </h1>
            <Link style={{textDecoration:'none'}} to='/results'>
            <div className="prompts-row1">
                <button>
                    Historia del arte digital
                </button>
                <button>
                    Realidad aumentada en el arte
                </button>
            </div>
            <div className="prompts-row2">
                <button>
                    Inteligencia artificial y arte
                </button>
                <button>
                    Arte generativo
                </button>
            </div>
            <button>
                Arte y realidad virtual
            </button>
            </Link>
            <div className="prompts-redo">
                <button>
                    <img src={Redo} alt="" />
                </button>
            </div>
        </div>
    );
}


export default Prompts;