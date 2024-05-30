import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import SupportIcon from "../../assets/icons/support.svg";
import SupportIconDark from "../../assets/icons/supportDark.svg";
import EnglishIcon from "../../assets/icons/en.svg";
import NotificationIcon from "../../assets/icons/notification.svg";
import NotificationIconDark from "../../assets/icons/notificationDark.svg";
import SpanishIcon from "../../assets/icons/es.svg";
import logo from "../../assets/logo.svg";
import WalletConnet from "../userAccess/walletConnet";
import moon from "../../assets/icons/moon.svg";
import sun from "../../assets/icons/sun.svg";

// Definimos los elementos de navegación
const NAV_ITEMS = (darkMode, language, toggleLanguage, toggleDarkMode) => [
  {
    type: "component",
    component: <WalletConnet darkMode={darkMode} />,
  },
  {
    type: "button",
    action: toggleLanguage,
    icon: language === "es" ? SpanishIcon : EnglishIcon,
    alt: "Cambio de Idioma",
  },
  {
    type: "link",
    to: "/notifications",
    icon: darkMode ? NotificationIconDark : NotificationIcon,
    alt: "Notificaciones",
  },
  {
    type: "button",
    action: toggleDarkMode,
    icon: darkMode ? moon : sun,
    alt: "Toggle Dark Mode",
  },
];

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [language, setLanguage] = useState("es");
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "es" ? "en" : "es"));
  };

  return (
    <nav className={`fixed w-full z-50 ${darkMode ? "dark" : ""}`}>
      <div className="p-4 justify-between md:items-center md:flex mx-auto">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link
            to="/"
            className="flex items-center hover:transform hover:scale-110 transition duration-200"
          >
            <img
              src={logo}
              alt="Logo"
              className={`${darkMode ? "text-white" : "text-black"}`}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                filter: darkMode ? "none" : "invert(1)",
              }}
            />
          </Link>

          {/* Botón de hamburguesa */}
          <div className="md:hidden">
            <button
              className={`p-2 rounded-lg focus:outline-none ${
                darkMode
                  ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-gray-700"
                  : "backdrop-blur-xl bg-black/10 drop-shadow-xl text-black hover:bg-gray-200"
              }`}
              onClick={() => setNavbarOpen(!navbarOpen)}
              style={{
                filter: darkMode ? "none" : "invert(1)",
                fontSize: "1.5rem", // Reducir el tamaño del botón hamburguesa
              }}
            >
              {navbarOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />} {/* Reducir el icono */}
            </button>
          </div>
        </div>

        {/* Botones de la barra de navegación */}
        <div className="flex-1 flex justify-end items-center space-x-4 hidden md:flex">
          {NAV_ITEMS(darkMode, language, toggleLanguage, toggleDarkMode).map(
            (item, index) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className={`m-2 p-2 rounded-lg transition duration-200 ease-in-out ${
                      darkMode
                        ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-gray-700"
                        : "backdrop-blur-xl bg-black/10 drop-shadow-xl text-black hover:bg-gray-200"
                    }`}
                  >
                    <img src={item.icon} alt={item.alt} className="w-5" />
                  </Link>
                );
              } else if (item.type === "button") {
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className={`m-2 p-2 rounded-lg transition duration-200 ease-in-out ${
                      darkMode
                        ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-gray-700"
                        : "backdrop-blur-xl bg-black/10 drop-shadow-xl text-black hover:bg-gray-200"
                    }`}
                  >
                    <img src={item.icon} alt={item.alt} />
                  </button>
                );
              } else if (item.type === "component") {
                return <div key={index}>{item.component}</div>;
              }
              return null;
            }
          )}
        </div>
      </div>

      {/* Menu desplegable */}
      <div
        className={`${
          navbarOpen ? "block" : "hidden"
        } md:hidden backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 p-4 fixed w-full z-40`} // Fondo transparente con blur
      >
        <div className="flex flex-col items-end space-y-4"> {/* Alineación a la derecha */}
          {NAV_ITEMS(darkMode, language, toggleLanguage, toggleDarkMode).map(
            (item, index) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className="m-2 p-2 rounded-lg transition duration-200 ease-in-out text-black dark:text-white"
                  >
                    <img src={item.icon} alt={item.alt} className="w-5" />
                  </Link>
                );
              } else if (item.type === "button") {
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className="m-2 p-2 rounded-lg transition duration-200 ease-in-out text-black dark:text-white"
                  >
                    <img src={item.icon} alt={item.alt} />
                  </button>
                );
              } else if (item.type === "component") {
                return <div key={index}>{item.component}</div>;
              }
              return null;
            }
          )}
        </div>
      </div>

      {/* Botón de soporte al cliente */}
      <div
        className={`flex items-center justify-center m-2 p-2 rounded-lg transition duration-200 ease-in-out ${
          darkMode
            ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-gray-700"
            : "backdrop-blur-xl bg-black/10 drop-shadow-xl text-black hover:bg-gray-200"
        } cursor-pointer fixed bottom-4 right-4`}
        style={{
          width: "3rem",
          height: "3rem",
        }}
      >
        <img
          src={darkMode ? SupportIconDark : SupportIcon}
          alt="Soporte al Cliente"
        />
      </div>
    </nav>
  );
};

export default Navbar;
