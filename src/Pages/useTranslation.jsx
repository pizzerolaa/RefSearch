import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useTranslation = (textToTranslate, language) => {
  const [translatedText, setTranslatedText] = useState({});

  useEffect(() => {
    const translateText = async () => {
      try {
        const response = await axios.post('http://localhost:8800/translate', {
          text: Object.values(textToTranslate).join('\n'),
          targetLang: language,
        });
        const translations = response.data.translations[0].text.split('\n');
        const keys = Object.keys(textToTranslate);
        const translatedObject = keys.reduce((acc, key, index) => {
          acc[key] = translations[index];
          return acc;
        }, {});
        setTranslatedText(translatedObject);
      } catch (error) {
        console.error('Error al traducir:', error);
      }
    };

    if (Object.keys(textToTranslate).length > 0) {
      translateText();
    }
  }, [textToTranslate, language]);

  return translatedText;
};

export default useTranslation;