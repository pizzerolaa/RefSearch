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
          <Route path="/source" element={<Source />} />
          <Route path="/references" element={<References />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

