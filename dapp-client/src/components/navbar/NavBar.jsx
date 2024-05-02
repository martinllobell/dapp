import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SunIcon from "../../assets/SunIcon.svg"
import MoonIcon from "../../assets/MoonIcon.svg"
import SupportIcon from "../../assets/SupportIcon.svg"
import EnglishIcon from "../../assets/EnglishIcon.svg"
import NotificationIcon from "../../assets/NotificationIcon.svg"
import SpanishIcon from "../../assets/SpanishIcon.svg"
import Logo from "../../assets/logeIcon.svg"

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'es' ? 'en' : 'es'));
  };

  return (
    <nav className={`flex justify-between items-center p-6 transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <img src={Logo} alt="Logo" className={`h-10 w-auto transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`} />
      <div className="flex items-center gap-4">
        <button onClick={toggleLanguage} className="text-slate-900 dark:text-white font-medium px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 ease-in-out">
          <img src={language === 'es' ? SpanishIcon : EnglishIcon} alt="Cambio de Idioma" className={`transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`} />
        </button>
        <Link to="/customer-support" className="text-slate-900 dark:text-white font-medium transition-all duration-500 ease-in-out">
          <img src={SupportIcon} alt="Soporte al Cliente" className={`transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`} />
        </Link>
        <Link to="/notifications" className="text-slate-900 dark:text-white font-medium transition-all duration-500 ease-in-out">
          <img src={NotificationIcon} alt="Notificaciones" className={`transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`} />
        </Link>
        <button onClick={toggleDarkMode} className="text-slate-900 dark:text-white font-medium px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 ease-in-out">
          {darkMode ? <img src={MoonIcon} alt="Modo Oscuro" className="text-white" /> : <img src={SunIcon} alt="Modo Claro" className="text-black" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;