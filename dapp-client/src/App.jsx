import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import './index.scss';
import Navbar from './components/navbar/NavBar';
import NotFound from './pages/notFound/NotFound';
import Footer from './components/footer/footer.jsx';
import FilterHome from './pages/homeFilter/FilterHome.jsx';
import LeagueEvents from './components/leagueEvents/LeagueEvents.jsx';
import LeadPanel from './components/betpanel/leadPanel';
import Profile from './pages/profile/Profile.jsx';
import { useContracts } from "./hooks/useContracts";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false;
  });

  const { setStartMatchTimestamp } = useContracts();

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Supongamos que el ID de la apuesta es `matchData.id` y queremos establecer la fecha del partido para dentro de una hora:
    const oneHourLater = Math.floor(Date.now() / 1000) + 3600; // Tiempo actual en segundos + 1 hora
    setStartMatchTimestamp("betId", oneHourLater); // Asegúrate de pasar el betId correcto

  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Renderizar el Footer solo si la ruta no es /sports
  const renderFooter = () => {
    return location.pathname !== '/sports' && <Footer darkMode={darkMode} />;
  };


  return (
    <>
      <div className="transition duration-200 absolute top-0 bottom-0 z-[-2] min-h-screen w-full bg-blue-700 dark:bg-gray-950 bg-[radial-gradient(ellipse_80%_80%at_50%-20%,rgba(252,185,255,0.5),rgba(255,255,255,0.9))] dark:bg-[radial-gradient(ellipse_100%_100%at_50%-20%,rgba(26,26,39,0.5),rgba(54,20,61,0.9))]">
      </div>

      <Router>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <LeadPanel />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} setStartMatchTimestamp={setStartMatchTimestamp} />} />
          <Route path="/profile" element={<Profile darkMode={darkMode} />} />
          <Route path="/sports" element={<FilterHome darkMode={darkMode} setStartMatchTimestamp={setStartMatchTimestamp} />} />
          <Route path="/sports/league/:leagueId" element={<LeagueEvents />} />
          <Route path="*" element={<NotFound darkMode={darkMode} />} />
        </Routes>
        {renderFooter()}
      </Router>
    </>
  );
};

export default App;
