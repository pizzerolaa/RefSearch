import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/SearchBar.css';
import Plus from "../Components/Assets/plus.svg";
import Lupa from "../Components/Assets/lupa.svg";

const TranslateComponent = () => {
  const [inputFields, setInputFields] = useState([""]);
  const [translatedText, setTranslatedText] = useState({});
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

  useEffect(() => {
    const translateText = async () => {
      try {
        const response = await axios.post('http://localhost:8800/translate', {
          text: Object.values(textToTranslate).join('\n'),
          targetLang: language,
        });
        const translations = response.data.translations[0].text.split('\n');
        setTranslatedText({
          title: translations[0],
          placeholder: translations[1],
          add: translations[2],
          addKeyIdea: translations[3],
          disc: translations[4],
          idea1: translations[5],
          idea2: translations[6],
          idea3: translations[7],
        });
      } catch (error) {
        console.error('Error al traducir:', error);
      }
    };

    translateText();
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  

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

  const handleButtonClick =  () => {
    navigate('/prompts');
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
