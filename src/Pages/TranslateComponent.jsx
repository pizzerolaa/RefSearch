import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from "./SearchBar"

const TranslateComponent = () => {
  const [translatedText, setTranslatedText] = useState({});
  const [language, setLanguage] = useState('ES'); // Lenguaje por defecto, español en este caso

  const textToTranslate = {
    title: 'Welcome to our website',
    content: 'This is a sample content that we want to translate dynamically.',
    buttonText: 'Click here'
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
          content: translations[1],
          buttonText: translations[2]
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

  return (
    <div>
      <select onChange={handleLanguageChange} value={language}>
        <option value="ES">Español</option>
        <option value="EN">English</option>
        {/* Agrega más opciones de idioma según sea necesario */}
      </select>
      <h1>{translatedText.title}</h1>
      <p>{translatedText.content}</p>
      <button>{translatedText.buttonText}</button>
    </div>
  );
};

export default TranslateComponent;
