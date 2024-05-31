import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/SearchBar.css';
import Plus from "../Components/Assets/plus.svg";
import Lupa from "../Components/Assets/lupa.svg";

const SearchBar = () => {
  const [inputFields, setInputFields] = useState([""]);
  const [targetLang, setTargetLang] = useState('en');
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:8800/translate', {
        text: JSON.stringify(inputFields),
        targetLang: targetLang,
      });

      const translatedFields = JSON.parse(response.data.translations[0].text);
      setInputFields(translatedFields);

      navigate('/prompts');
    } catch (error) {
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
          <h2>{targetLang === 'en' ? 'What do you want to research about?' : '¿Sobre qué quieres investigar?'}</h2>
          
          {inputFields.map((field, index) => (
            <div key={index} className='rf-first-search'>
              <input
                type="text"
                placeholder={targetLang === 'en' ? 'Topic in mind' : 'Tema en mente'}
                value={field}
                onChange={(event) => handleInputChange(index, event)}
              />
              {index === inputFields.length - 1 && inputFields.length < 5 && (
                <img src={Plus} alt="Agregar" onClick={handleAddField} style={{ cursor: 'pointer' }} />
              )}
            </div>
          ))}

          <h4>{targetLang === 'en' ? 'Enter your keywords separated by commas' : 'Ingresa tus palabras clave separadas por comas'}</h4>
          <div className="rf-first-enter">
              <button onClick={handleButtonClick}>
                <img src={Lupa} alt="" />
              </button>
          </div>
          <div>
              <button onClick={() => handleChangeLanguage('en')}>English</button>
              <button onClick={() => handleChangeLanguage('es')}>Español</button>
              {/* Agrega más botones para otros idiomas si es necesario */}
            </div>
        </div>

        <div className='rf-second'>
            <button>{targetLang === 'en' ? 'Discover' : 'Descubre'}</button>
            <div className='rf-second-buttons'>
              <Link style={{textDecoration:'none'}} to='/prompts'>
                <button>{targetLang === 'en' ? 'Interesting data about science' : 'Datos interesantes sobre ciencia'}</button>
                <button>{targetLang === 'en' ? 'Search for new information' : 'Busca información nueva'}</button>
                <button>{targetLang === 'en' ? 'Learn about new technologies' : 'Infórmate sobre las nuevas tecnologías'}</button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
