import { useState, useEffect, Fragment} from 'react';
import Web3 from 'web3';
import { Link } from 'react-router-dom';
import SunIcon from "../../assets/icons/sun.svg"
import MoonIcon from "../../assets/icons/moon.svg"
import SupportIcon from "../../assets/icons/support.svg"
import EnglishIcon from "../../assets/icons/en.svg"
import NotificationIcon from "../../assets/icons/notification.svg"
import SpanishIcon from "../../assets/icons/es.svg"
import Logo from "../../assets/icons/loge.svg"
import { Disclosure, Menu, Transition } from '@headlessui/react'


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

  const addMoney = () => {
    
  };


  const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

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
          <button onClick={connectWallet} className="text-slate-900  font-medium px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 ease-in-out">
            Conectar Wallet
          </button>
        )}
        <label className="relative inline-flex cursor-pointer items-center">
          <input onChange={toggleDarkMode} id="switch-2" type="checkbox" className="peer sr-only" />
          <label htmlFor="switch-2" className="hidden"></label>
          <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-300 peer-checked:after:translate-x-full peer-focus:ring-blue-300"></div>
        </label>
        <button onClick={toggleLanguage} className="text-slate-900 px-3 py-3 rounded-lg  bg-indigo-500 hover:bg-indigo-300 hover:bg-transparent">
          <img src={language === 'es' ? SpanishIcon : EnglishIcon} alt="Cambio de Idioma"  />
        </button>
        <Link to="/notifications" className="text-slate-900 px-3 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-300">
          <img src={NotificationIcon} alt="Notificaciones"  />
        </Link>
        <div style={{ position: 'fixed', bottom: "5rem", right: "0rem", width: "3rem", height: "3rem",}} className="text-slate-900 px-3 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-100">
          <img src={SupportIcon} alt="Soporte al Cliente" />
        </div>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Disconnect
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            
                            <button onClick={addMoney} className="text-slate-900 px-3 py-3 rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/50">
                              Add founds
                            </button>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
        {/* <button onClick={toggleDarkMode} className="text-slate-900 dark:text-white font-medium px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 ease-in-out">
          {darkMode ? <img src={MoonIcon} alt="Modo Oscuro" className="text-white" /> : <img src={SunIcon} alt="Modo Claro" className="text-black" />}
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
