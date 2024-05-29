import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/SearchBar.css';
import Plus from "../Components/Assets/plus.svg"
import Lupa from "../Components/Assets/lupa.svg"

const SearchBar = () => {
  
  const [inputFields, setInputFields] = useState([""]);

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

  const handleButtonClick = () => {
    const concatenatedString = inputFields.join(" ");
    console.log(concatenatedString);
  };

  return (
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

          <h4>Ingresa tus palabras clave separadas por espacios</h4>
          <div className="rf-first-enter">
            {/* <Link style={{textDecoration:'none'}} to='/prompts'> */}
              <button onClick={handleButtonClick}>
                <img src={Lupa} alt="" />
              </button>
            {/* </Link> */}
          </div>
        </div>

        <div className='rf-second'>
            <button>Descubre</button>
            <div className='rf-second-buttons'>
              <Link style={{textDecoration:'none'}} to='/prompts'>
                {/* <button onClick={() => handleTopicSelect('Videojuegos en la salud')}>Videojuegos en la salud</button>
                <button onClick={() => handleTopicSelect('Michael Jackson y Reina Isabel')}>Michael Jackson y Reina Isabel</button>
                <button onClick={() => handleTopicSelect('Botanica forense (Policia)')}>Botanica forense (Policia)</button> */}
                <button>Videojuegos en la salud</button>
                <button>Michael Jackson y Reina Isabel</button>
                <button>Botanica forense (Policia)</button>
              </Link>
            </div>
            {/* {selectedTopic && <div>Selected Topic: {selectedTopic}</div>} */}
        </div>
      </div>
    // </div>
  );
};

export default SearchBar;




//on-LOAD


// const [searchTerm, setSearchTerm] = useState('');
  // const [selectedTopic, setSelectedTopic] = useState('');

  // const handleInputChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const handleTopicSelect = (topic) => {
  //   setSelectedTopic(topic);
  // };

  // return (
  //   <div className="searchBar">
  //     {/* <header className='header-main'>
  //       <div className='header-user'>
  //         <button><FaUser /></button>
  //       </div>
  //       <div className='header-lang'>
  //         <button>
  //           <IoEarthOutline />
  //           <span>Idioma</span>
  //         </button>
  //       </div>
  //     </header> */}

  //     <div className='RefSearch-main'>
  //       <div className='rf-first'>
  //         <h2>¿Sobre qué quieres investigar?</h2>
  //         <div className='rf-first-search'>
  //           <input
  //             type="text"
  //             placeholder="Tema en mente"
  //             value={searchTerm}
  //             onChange={handleInputChange}
  //           />
  //           <img onClick={() => handleTopicSelect('Tema en mente')} src={Plus} alt="" />
  //           {/* <button onClick={() => handleTopicSelect('Tema en mente')}>+</button> */}
  //         </div>
