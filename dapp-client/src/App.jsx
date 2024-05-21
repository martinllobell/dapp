import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import './index.scss';
import Navbar from './components/navbar/NavBar';
import NotFound from './pages/notFound/NotFound';
import Footer from './components/footer/footer.jsx';
import Profile from './pages/profile/Profile.jsx';


const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/home" element={<Home darkMode={darkMode} />} />
        <Route path="/profile" element={<Profile darkMode={darkMode} />} />
        <Route path="*" element={<NotFound darkMode={darkMode} />} />
      </Routes>
      <Footer darkMode={darkMode} />
    </Router>
  );
};

export default App;
