// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from './Pages/SearchBar';
import Navbar from './Components/Navbar/Navbar';
import Login from './Pages/Login';
import Prompts from './Pages/Prompts';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<SearchBar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/prompts" element={<Prompts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
