import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Prompts.css';
import Redo from "../Components/Assets/redo.svg";

const Prompts = () => {
    const [storedPrompts_1, setStoredPrompts_1] = useState([]);
    const navigate = useNavigate(); 

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

    const handlePromptSelection = async (prompt) => {
        try {
            console.log('Selected prompt:', prompt);
            localStorage.setItem('selectedPrompt', prompt);
            const response = await axios.get('http://localhost:8800/scholarlyy', {
                params: {q: prompt}
            });
            console.log('Response received:', response.data);
            localStorage.setItem('scholarlyResults', JSON.stringify(response.data));
            console.log('Datos guardados en localStorage');
            navigate('/results');
        } catch (error) {
            console.error('Error fetching scholarly articles:', error);
        }
    }

    return (
        <div className='prompts'>
            <h1>
                ¿Qué idea te agrada más?
            </h1>
            <div className="prompts-row1">
                {storedPrompts_1.slice(0, 3).map((prompt, index) => (
                <button onClick={() => handlePromptSelection(prompt)} key={index}>{prompt}</button>
                ))}
            </div>
            <div className="prompts-row2">
                {storedPrompts_1.slice(3, 5).map((prompt, index) => (
                <button onClick={() => handlePromptSelection(prompt)} key={index}>{prompt}</button>
                ))}
            </div>
            <div className="prompts-redo">
                <button>
                    <img src={Redo} alt="" />
                </button>
            </div>
        </div>
    );
}


export default Prompts;