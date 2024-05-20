import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import './index.scss';
import Navbar from './components/navbar/NavBar';
import NotFound from './pages/notFound/NotFound';
import Footer from './components/footer/footer.jsx';
import FilterHome from './pages/homeFilter/FilterHome.jsx';
import LeagueEvents from './components/leagueEvents/LeagueEvents.jsx';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <>
      <div className="transition duration-200 absolute top-0 bottom-0 z-[-2] min-h-screen w-full bg-blue-700 dark:bg-gray-950 bg-[radial-gradient(ellipse_80%_80%at_50%-20%,rgba(252,185,255,0.5),rgba(255,255,255,0.9))] dark:bg-[radial-gradient(ellipse_100%_100%at_50%-20%,rgba(26,26,39,0.5),rgba(54,20,61,0.9))]">
      </div>
      
      <Router>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/home" element={<Home darkMode={darkMode} />} />
          <Route path="/sports" element={<FilterHome darkMode={darkMode} />} />
          <Route path="/sports/league/:leagueId" element={<LeagueEvents />} />
          <Route path="*" element={<NotFound darkMode={darkMode} />} />
        </Routes>
        <Footer darkMode={darkMode} />
      </Router>
    </>
  );
};

export default App;
