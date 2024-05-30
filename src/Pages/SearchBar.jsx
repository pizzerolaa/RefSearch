import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/SearchBar.css';
import Plus from "../Components/Assets/plus.svg"
import Lupa from "../Components/Assets/lupa.svg"

//on-LOAD

const SearchBar = () => {

  const [inputFields, setInputFields] = useState([""]);
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
      const concatenatedString = inputFields.join(",");
      console.log(concatenatedString);
      const response = await axios.post('http://localhost:8800/chat/prompts', { keywords: concatenatedString });
      console.log(response);
      navigate('/prompts');
    } catch (error) {
      console.error('Error fetching prompts: ', error);
    }
  };

  return (
    <div className="searchBar">
      <div className='RefSearch-main'>
        <div className='rf-first'>
          <h2>¿Sobre qué quieres investigar?</h2>
          
          {inputFields.map((field, index) => (
            <div key={index} className='rf-first-search'>
              <input
                type="text"
                placeholder="Tema en mente"
                value={field}
                onChange={(event) => handleInputChange(index, event)}
              />
              {index === inputFields.length - 1 && inputFields.length < 5 && (
                <img src={Plus} alt="Agregar" onClick={handleAddField} style={{ cursor: 'pointer' }} />
              )}
            </div>
          ))}

          <h4>Ingresa tus palabras clave separadas por comas</h4>
          <div className="rf-first-enter">
              <button onClick={handleButtonClick}>
                <img src={Lupa} alt="" />
              </button>
          </div>
        </div>

        <div className='rf-second'>
            <button>Descubre</button>
            <div className='rf-second-buttons'>
              <Link style={{textDecoration:'none'}} to='/prompts'>
                <button>Datos intersantes sobre ciencia</button>
                <button>Busca información nueva</button>
                <button>Informate sobre las nuevas tecnologías</button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;


// const [keyWords, setKeyWords] = useState('');
  // const navigate = useNavigate();

  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8800/chat/prompts', { keywords: keyWords.split(',') });
  //   } catch (error) {
  //     console.error('Error fetching prompts: ', error);
  //   }
  // }

  // const handleSearch_2 = async () => {
  //   try {
  //     navigate('/prompts');
  //   }
  //   catch (error) {
  //     console.error('Error fetching prompts: ', error);
  //   }
  // };

  // {/* <div className='rf-first-search'>
  //   <input
  //     type="text"
  //     value={keyWords}
  //     placeholder="Tema en mente"
  //     onChange={(e) => setKeyWords(e.target.value)}
  //   />
  //   <img onClick={handleSearch} src={Plus} alt="" />
  // </div> */}