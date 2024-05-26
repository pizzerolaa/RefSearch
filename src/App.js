import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchBar from './Pages/SearchBar';
import Navbar from './Components/Navbar/Navbar';
import Login from './Pages/Login';
import Prompts from './Pages/Prompts';
import Results from './Pages/Results';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchBar />}  />
          <Route path="/login" element={<Login />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

