import React, { useState } from 'react';
import useTranslation from './useTranslation';

const TranslateComponent = ({sharedVariable}) => {
  const [language, setLanguage] = useState(sharedVariable);
  
  const textToTranslate = {
    title: 'Welcome to our website',
    content: 'This is a sample content that we want to translate dynamically.',
    buttonText: 'Click here'
  };

  const translatedText = useTranslation(textToTranslate, language);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <select onChange={handleLanguageChange}>
        <option value="ES">Español</option>
        <option value="EN">English</option>
      </select>
      <h1>{translatedText.title}</h1>
      <p>{translatedText.content}</p>
      <button>{translatedText.buttonText}</button>
    </div>
  );
};

export default TranslateComponent;
