import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchBar from './Pages/SearchBar';
import Navbar from './Components/Navbar/Navbar';
import Login from './Pages/Login';
import Prompts from './Pages/Prompts';
import Results from './Pages/Results';
import Source from './Pages/Source';
import References from './Pages/References';
import Chat from './Pages/Chat';
import TranslateComponent from './Pages/TranslateComponent'; // Importa el nuevo componente
import React, {useState, useRef} from 'react';

function App() {
  const [sharedVariable, setSharedVariable] = useState('ES');
  const searchBarRef = useRef(null);

  const handleNavbarButtonClick = () => {
    console.log("Navbar button clicked");
    console.log(searchBarRef.current);
    
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar onNavbarButtonClick={handleNavbarButtonClick} sharedVariable={sharedVariable} setSharedVariable={setSharedVariable}/>
        <Routes>
          <Route path="/" element={<SearchBar ref={searchBarRef} sharedVariable={sharedVariable}/>}  />
          <Route path="/login" element={<Login />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/results" element={<Results />} />
          <Route path="/source" element={<Source />} />
          <Route path="/references" element={<References />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/translate-component" element={<TranslateComponent sharedVariable={sharedVariable}/>} /> {/* Nueva ruta */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
