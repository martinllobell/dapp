import { useState } from 'react';
import { Link } from 'react-router-dom';
import SupportIcon from "../../assets/icons/support.svg";
import SupportIconDark from "../../assets/icons/supportDark.svg";
import EnglishIcon from "../../assets/icons/en.svg";
import NotificationIcon from "../../assets/icons/notification.svg";
import NotificationIconDark from "../../assets/icons/notificationDark.svg";
import SpanishIcon from "../../assets/icons/es.svg";
import logo from "../../assets/logo.svg";
import WalletConnet from '../userAccess/walletConnet';
import moon from "../../assets/icons/moon.svg";
import sun from "../../assets/icons/sun.svg";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'es' ? 'en' : 'es'));
  };

  return (
    <nav className={`fixed w-full z-40 h-[5rem] flex justify-between items-center p-6 transition-colors duration-500 ${darkMode ? 'dark' : ''}`} style={{ backdropFilter: "blur(10px)" }}>
      <Link to="/" >
        <img src={logo} alt="Logo" className={`duration-200 transition-transform transform scale-95 hover:scale-105 rounded-full ${darkMode ? 'text-white' : 'text-black'}`} />
      </Link>
      <div className="flex items-center gap-4">
        <WalletConnet darkMode={darkMode} />
        <button onClick={toggleLanguage} className={`${darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-white/20" : "backdrop-blur-xl bg-black/10 drop-shadow-xl text-black hover:bg-black/20"} shadow-sm shadow-black/10 px-2 py-2 rounded-lg transition ease-in-out hover:scale-105 duration-150`}>
          <img src={language === 'es' ? SpanishIcon : EnglishIcon} alt="Cambio de Idioma" />
        </button>
        <Link to="/notifications" className={`${darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-white/20" : "backdrop-blur-xl bg-black/10 drop-shadow-xl text-black hover:bg-black/20"} shadow-sm shadow-black/10 px-2 py-2 rounded-lg transition ease-in-out hover:scale-105 duration-150`}>
          <img src={darkMode ? NotificationIconDark : NotificationIcon} alt="Notificaciones" className='w-5' />
        </Link>
        <button onClick={toggleDarkMode} className={`${darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-white/20" : "backdrop-blur-xl bg-black/10 drop-shadow-xl text-black hover:bg-black/20"} shadow-sm shadow-black/10 px-2 py-2 rounded-lg transition ease-in-out hover:scale-105 duration-150`}>
          <img src={darkMode ? moon : sun} alt='Toggle Dark Mode' />
        </button>
        <div style={{ position: 'absolute', bottom: "-50rem", right: "1rem", width: "3rem", height: "3rem" }} className={`${darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-white/20" : "backdrop-blur-xl bg-black/10 drop-shadow-xl text-black hover:bg-black/20"} shadow-sm shadow-black/10 px-3 py-3 rounded-lg transition ease-in-out hover:scale-105 duration-150 cursor-pointer`}>
          <img src={darkMode ? SupportIconDark : SupportIcon} alt="Soporte al Cliente" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
