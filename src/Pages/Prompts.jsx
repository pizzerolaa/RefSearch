import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/Prompts.css';
import Redo from "../Components/Assets/redo.svg";

const Prompts = () => {
    const [storedPrompts_1, setStoredPrompts_1] = useState([]);

    useEffect(() => {
        const fetchStoredPrompts = async () => {
            try {
              const response = await axios.get('http://localhost:8800/prompts');
              setStoredPrompts_1(response.data.prompts);
            } catch (error) {
              console.error('Error fetching stored prompts:', error);
            }
          };
      
          fetchStoredPrompts();
    }, []);

    return (
        <div className='prompts'>
            <h1>
                ¿Qué idea te agrada más?
            </h1>
            <Link style={{textDecoration:'none'}} to='/results'>
            <div className="prompts-row1">
                {storedPrompts_1.slice(0, 3).map((prompt, index) => (
                <button key={index}>{prompt}</button>
                ))}
            </div>
            <div className="prompts-row2">
                {storedPrompts_1.slice(3, 5).map((prompt, index) => (
                <button key={index}>{prompt}</button>
                ))}
            </div>
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