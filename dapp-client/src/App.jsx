import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import './index.scss';
import Navbar from './components/navbar/NavBar';
import Web3 from 'web3';


// Usa web3 para interactuar con la red Polygon ZK Environmen


const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
