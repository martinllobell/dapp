import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import SupportIcon from "../../assets/icons/support.svg"
import SupportIconDark from "../../assets/icons/supportDark.svg"
import EnglishIcon from "../../assets/icons/en.svg"
import NotificationIcon from "../../assets/icons/notification.svg"
import NotificationIconDark from "../../assets/icons/notificationDark.svg"
import SpanishIcon from "../../assets/icons/es.svg"
import Logo from "../../assets/LogoBetting.ico"
import logo from "../../assets/logo.svg"
import WalletConnet from '../userAccess/walletConnet';
import moon from "../../assets/icons/moon.svg"
import sun from "../../assets/icons/sun.svg"



const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'es' ? 'en' : 'es'));
  };

  return (
    <nav className={`flex justify-between items-center p-6 transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <Link to="/" > <img src={logo} alt="Logo" className={`duration-200 bg-black/10 transition-transform transform scale-95 hover:bg-black/30 hover:scale-105 rounded-full transition-colors ${darkMode ? 'text-white' : 'text-black'}`} /> </Link>
      <div className="flex items-center gap-4">
        
        <WalletConnet darkMode={darkMode} />
        <button onClick={toggleLanguage} className={`${!darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white" : "hover:bg-indigo-300 backdrop-blur-xl bg-indigo-100 drop-shadow-xl "}` + " shadow-sm shadow-black/10 text-slate-900 px-2 py-2 rounded-lg hover:bg-indigo-300 transition ease-in-out hover:scale-105 duration-150 hover:text-black"}>
          <img src={language === 'es' ? SpanishIcon : EnglishIcon} alt="Cambio de Idioma" className='' />
        </button>
        <Link to="/notifications" className={`${!darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white" : "hover:bg-indigo-300 backdrop-blur-xl bg-indigo-100 drop-shadow-xl "}` + " shadow-sm shadow-black/10 text-slate-900 px-2 py-2 rounded-lg hover:bg-indigo-300 transition ease-in-out hover:scale-105 duration-150 hover:text-black"}>

          {
            !darkMode ? <img src={NotificationIcon} alt="Notificaciones" className='w-5' /> : <img src={NotificationIconDark} alt="Notificaciones" className='w-5' />
          }
        </Link>
        <button onClick={toggleDarkMode} className={`${!darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white" : "hover:bg-indigo-300 backdrop-blur-xl bg-indigo-100 drop-shadow-xl "}` + " shadow-sm shadow-black/10 text-slate-900 px-2 py-2 rounded-lg hover:bg-indigo-300 transition ease-in-out hover:scale-105 duration-150 hover:text-black"}>
          {
            !darkMode ? <img src={sun} alt='Toggle Dark Mode' /> : <img src={moon} alt='Toggle Dark Mode' />
          }
        </button>

        <div style={{ position: 'fixed', bottom: "5rem", right: "1rem", width: "3rem", height: "3rem", }} className={`${!darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white" : "hover:bg-indigo-300 backdrop-blur-xl bg-indigo-100 drop-shadow-xl "}` + " shadow-sm shadow-black/10 text-slate-900 px-3 py-3 rounded-lg hover:bg-indigo-300 transition ease-in-out hover:scale-105 duration-150 hover:text-black"}>

          {
            !darkMode ? <img src={SupportIcon} alt="Soporte al Cliente" /> : <img src={SupportIconDark} alt="Soporte al Cliente" />
          }
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
