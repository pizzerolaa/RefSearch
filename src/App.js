// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from './Pages/SearchBar';
import Login from './Pages/Login';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<SearchBar />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
