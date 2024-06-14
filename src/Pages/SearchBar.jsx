import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/SearchBar.css';
import Plus from "../Components/Assets/plus.svg";
import Lupa from "../Components/Assets/lupa.svg";

const SearchBar = ({ sharedVariable }) => {

  const [inputFields, setInputFields] = useState([""]);
  const navigate = useNavigate();
  const [translatedText, setTranslatedText] = useState({});
  const [language] = useState(localStorage.getItem('LANG')); // Lenguaje por defecto, español en este caso
  const [randomPrompts, setRandomPrompts] = useState([]);

  useEffect(() => {
    const createReferencesTable = async () => {
      try {
        const response = await axios.post('http://localhost:8800/create-references-table');
        console.log('Response:', response.data);
        if (response.data.message) {
          console.log('Table creation message:', response.data.message);
        }
      } catch (error) {
        console.error('Error creating References table:', error);
      }
    };
    createReferencesTable();
  }, []);

  const textToTranslate = {
    title: '¿Sobre qué quieres investigar?',
    placeholder: 'Tema en mente',
    add: 'Agregar',
    addKeyIdea: 'Añade tu tema',
    disc: 'Descubre',
    idea1: 'Datos interesantes sobre ciencia',
    idea2: 'Busca información nueva',
    idea3: 'Infórmate sobre las nuevas tecnologías',
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

  const handleAddField = () => {
    if (inputFields.length < 5) {
      setInputFields([...inputFields, ""]);
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setInputFields(values);
  };

  const handleButtonClick = async () => {
    try {
      const concatenatedString = inputFields.join(",");
      console.log(concatenatedString);
      const response = await axios.post('http://localhost:8800/chat/prompts', { keywords: concatenatedString });
      console.log(response);
      navigate('/prompts');
    } catch (error) {
      console.error('Error fetching prompts: ', error);
    }
  };

  const handlePromptClick = async (prompt) => {
    try {
      console.log('Selected prompt:', prompt);
      localStorage.setItem('selectedPrompt', prompt);
      window.alert('Buscando artículos académicos...');
      const response = await axios.get('http://localhost:8800/scholarlyy', {
        params: { q: prompt }
      });
      console.log('Response received:', response.data);
      localStorage.setItem('scholarlyResults', JSON.stringify(response.data));
      console.log('Datos guardados en localStorage');
      navigate('/results');
    } catch (error) {
      console.error('Error fetching scholarly articles:', error);
    }
  };

  const fetchRandomPrompts = async () => {
    try {
      const response = await axios.get('http://localhost:8800/random-prompts');
      setRandomPrompts(response.data.prompts);
    } catch (error) {
      console.error('Error fetching random prompts:', error);
    }
  };

  useEffect(() => {
    fetchRandomPrompts();
  }, []);

  return (
    <div className="searchBar">
      <div className='RefSearch-main'>
        <div className='rf-first'>
          <h2>{translatedText.title}</h2>
          {inputFields.map((field, index) => (
            <div key={index} className='rf-first-search'>
              <input
                type="text"
                placeholder={translatedText.placeholder}
                value={field}
                onChange={(event) => handleInputChange(index, event)}
              />
              {index === inputFields.length - 1 && inputFields.length < 5 && (
                <img src={Plus} alt={translatedText.add} onClick={handleAddField} style={{ cursor: 'pointer' }} />
              )}
            </div>
          ))}
          <h4>{translatedText.addKeyIdea}</h4>
          <div className="rf-first-enter">
            <button onClick={handleButtonClick}>
              <img src={Lupa} alt="" />
            </button>
          </div>
        </div>

        <div className='rf-second'>
          <button>{translatedText.disc}</button>
          <div className='rf-second-buttons'>
            <button onClick={() => handlePromptClick('Principios fundamentales de la física cuántica')}>
              Principios fundamentales de la física cuántica
            </button>
            <button onClick={() => handlePromptClick('Metodologías modernas de enseñanza en educación primaria')}>
              Metodologías modernas de enseñanza en educación primaria
            </button>
            <button onClick={() => handlePromptClick('Impacto del cambio climático en la biodiversidad global')}>
              Impacto del cambio climático en la biodiversidad global
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
