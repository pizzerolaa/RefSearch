import React, { useState } from 'react';
import axios from 'axios';
import './styles/Translate.css'; // Importa el archivo CSS

const Translate = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:8800/translate', {
        text: text,
        targetLang: 'ES', // Cambia esto al idioma de destino deseado
      });
      setTranslatedText(response.data.translations[0].text);
    } catch (error) {
      console.error('Error al traducir:', error);
    }
  };

  return (
    <div className="translate-container">
      <h1>Traductor</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Introduce el texto a traducir"
        className="translate-input"
      />
      <button onClick={handleTranslate} className="translate-button">Traducir</button>
      {translatedText && (
        <div className="translate-result">
          <h2>Traducción:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Translate;
