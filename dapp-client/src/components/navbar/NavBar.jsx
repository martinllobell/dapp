import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import SupportIcon from "../../assets/icons/support.svg"
import EnglishIcon from "../../assets/icons/en.svg"
import NotificationIcon from "../../assets/icons/notification.svg"
import SpanishIcon from "../../assets/icons/es.svg"
import Logo from "../../assets/icons/loge.svg"
import WalletConnet from '../userAccess/walletConnet';



const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'es' ? 'en' : 'es'));
  };

  return (
    <nav className={`flex justify-between items-center p-6 transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <img src={Logo} alt="Logo" className={`h-10 w-auto transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`} />
      <div className="flex items-center gap-4">
        <WalletConnet />
        <label className="relative inline-flex cursor-pointer items-center">
          <input onChange={toggleDarkMode} id="switch-2" type="checkbox" className="peer sr-only" />
          <label htmlFor="switch-2" className="hidden"></label>
          <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-300 peer-checked:after:translate-x-full peer-focus:ring-blue-300"></div>
        </label>
        <button onClick={toggleLanguage} className="text-slate-900 px-3 py-3 rounded-lg  bg-indigo-500 hover:bg-indigo-300 hover:bg-transparent">
          <img src={language === 'es' ? SpanishIcon : EnglishIcon} alt="Cambio de Idioma" />
        </button>
        <Link to="/notifications" className="text-slate-900 px-3 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-300">
          <img src={NotificationIcon} alt="Notificaciones" />
        </Link>
        <div style={{ position: 'fixed', bottom: "5rem", right: "0rem", width: "3rem", height: "3rem", }} className="text-slate-900 px-3 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-100">
          <img src={SupportIcon} alt="Soporte al Cliente" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
