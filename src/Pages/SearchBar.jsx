import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/SearchBar.css';
import Plus from "../Components/Assets/plus.svg";
import Lupa from "../Components/Assets/lupa.svg";
import useTranslation from './useTranslation';

const TranslateComponent = () => {
  const [inputFields, setInputFields] = useState([""]);
  const [targetLang, setTargetLang] = useState('en');
  const [language, setLanguage] = useState('ES'); // Lenguaje por defecto, español en este caso
  const navigate = useNavigate();

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
  
  const translatedText = useTranslation(textToTranslate, language);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleAddField = () => {
    if (inputFields.length < 5) {
      setInputFields([...inputFields, ""]);
    }
    console.log(inputFields);
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
    }
    catch (error) {
      console.error('Error fetching prompts: ', error);
    }
  };

  const handleChangeLanguage = (lang) => {
    setTargetLang(lang);
  };

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
            <Link style={{textDecoration:'none'}} to='/prompts'>
              <button>{translatedText.idea1}</button>
              <button>{translatedText.idea2}</button>
              <button>{translatedText.idea3}</button>
            </Link>
          </div>

          <div className='rf-third-buttons'>
            <Link style={{textDecoration:'none'}}>
              <button onClick={handleLanguageChange} value={"EN"}>English</button>
              <button onClick={handleLanguageChange} value={"ES"}>Español</button>
              {/* Agrega más botones para otros idiomas si es necesario */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
  

export default TranslateComponent;
