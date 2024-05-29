import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/SearchBar.css';
import Plus from "../Components/Assets/plus.svg"
import Lupa from "../Components/Assets/lupa.svg"

//on-LOAD

const SearchBar = () => {
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const [keyWords, setKeyWords] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8800/chat/prompts', { keywords: keyWords.split(',') });
    } catch (error) {
      console.error('Error fetching prompts: ', error);
    }
  }

  const handleSearch_2 = async () => {
    try {
      navigate('/prompts');
    }
    catch (error) {
      console.error('Error fetching prompts: ', error);
    }
  };

  return (
    <div className="searchBar">
      {/* <header className='header-main'>
        <div className='header-user'>
          <button><FaUser /></button>
        </div>
        <div className='header-lang'>
          <button>
            <IoEarthOutline />
            <span>Idioma</span>
          </button>
        </div>
      </header> */}

      <div className='RefSearch-main'>
        <div className='rf-first'>
          <h2>¿Sobre qué quieres investigar?</h2>
          <div className='rf-first-search'>
            <input
              type="text"
              value={keyWords}
              placeholder="Tema en mente"
              onChange={(e) => setKeyWords(e.target.value)}
            />
            <img onClick={handleSearch} src={Plus} alt="" />
            {/* <button onClick={() => handleTopicSelect('Tema en mente')}>+</button> */}
          </div>

          <h4>Ingresa tus palabras clave separadas por comas</h4>
          <div className="rf-first-enter">
              <button onClick={handleSearch_2}>
                <img src={Lupa} alt="" />
              </button>
          </div>
        </div>

        <div className='rf-second'>
            <button>Descubre</button>
            <div className='rf-second-buttons'>
              <Link style={{textDecoration:'none'}} to='/prompts'>
                <button onClick={() => handleTopicSelect('Videojuegos en la salud')}>Videojuegos en la salud</button>
                <button onClick={() => handleTopicSelect('Michael Jackson y Reina Isabel')}>Michael Jackson y Reina Isabel</button>
                <button onClick={() => handleTopicSelect('Botanica forense (Policia)')}>Botanica forense (Policia)</button>
              </Link>
            </div>
            {/* {selectedTopic && <div>Selected Topic: {selectedTopic}</div>} */}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
