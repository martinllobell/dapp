import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
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
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const address = sessionStorage.getItem('walletAddress');
    if (address) {
      const provider = new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/your-infura-project-id'); // Reemplaza 'your-infura-project-id' con tu propio ID de Infura para la red de Polygon
      const connectedWeb3 = new Web3(provider);
      connectedWeb3.eth.defaultAccount = address;
      setWeb3(connectedWeb3);
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'es' ? 'en' : 'es'));
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const connectedWeb3 = new Web3(window.ethereum);
        const address = window.ethereum.selectedAddress;
        sessionStorage.setItem('walletAddress', address);
        connectedWeb3.eth.defaultAccount = address;
        setWeb3(connectedWeb3);
      } catch (error) {
        console.error('Error al conectar la wallet:', error);
      }
    } else {
      console.error('MetaMask no está instalado');
    }
  };

  const disconnectWallet = () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
            setWeb3(null);
            sessionStorage.removeItem('walletAddress');
          });
        } else {
          setWeb3(null);
          sessionStorage.removeItem('walletAddress');
        }
      });
    }
  };

  return (
    <nav className={`flex justify-between items-center p-6 transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <img src={Logo} alt="Logo" className={`h-10 w-auto transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`} />
      <div className="flex items-center gap-4">

        {web3 ? (
          <div className="flex items-center gap-2 w-8">
            <img src='https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png' alt="" />
          </div>
        ) : (
          <button onClick={connectWallet} className="text-slate-900 dark:text-white font-medium px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 ease-in-out">
            Conectar Wallet
          </button>
        )}
        <label className="relative inline-flex cursor-pointer items-center">
          <input onChange={toggleDarkMode} id="switch-2" type="checkbox" className="peer sr-only" />
          <label htmlFor="switch-2" className="hidden"></label>
          <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-300 peer-checked:after:translate-x-full peer-focus:ring-blue-300"></div>
        </label>
        <button onClick={toggleLanguage} className="text-slate-900 dark:text-white font-medium px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 ease-in-out">
          <img src={language === 'es' ? SpanishIcon : EnglishIcon} alt="Cambio de Idioma" className={`transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`} />
        </button>
        <Link to="/notifications" className="text-slate-900 dark:text-white font-medium transition-all duration-500 ease-in-out">
          <img src={NotificationIcon} alt="Notificaciones" className={`transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`} />
        </Link>
        <div style={{ position: 'fixed', bottom: "5rem", right: "0rem", width: "3rem", height: "3rem", background: "blue" }} className="text-slate-900 dark:text-white font-medium transition-all duration-500 ease-in-out">
          <img src={SupportIcon} alt="Soporte al Cliente" className={`transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`} />
        </div>

        {/* <button onClick={toggleDarkMode} className="text-slate-900 dark:text-white font-medium px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 ease-in-out">
          {darkMode ? <img src={MoonIcon} alt="Modo Oscuro" className="text-white" /> : <img src={SunIcon} alt="Modo Claro" className="text-black" />}
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
