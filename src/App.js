// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from './Pages/SearchBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<SearchBar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
