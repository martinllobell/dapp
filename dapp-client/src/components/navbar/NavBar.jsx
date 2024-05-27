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
    <nav
      className={`fixed w-full z-50 bg-transparent ${darkMode ? "dark" : ""}`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
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
              darkMode ? "text-white" : "text-black"
            }`}
            onClick={() => setNavbarOpen(!navbarOpen)}
            style={{
              filter: darkMode ? "none" : "invert(1)",
            }}
          >
            {navbarOpen ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
          </button>
        </div>

        {/* Botones de la barra de navegación */}
        <div
          className={`md:flex items-center ${navbarOpen ? "block" : "hidden"}`}
        >
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
      <div
        className={`md:flex items-center justify-center m-2 p-2 rounded-lg transition duration-200 ease-in-out ${
          darkMode
            ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-gray-700"
            : "backdrop-blur-xl bg-black/10 drop-shadow-xl text-black hover:bg-gray-200"
        } cursor-pointer md:relative md:bottom-auto md:right-auto`}
        style={{
          position: navbarOpen ? "relative" : "absolute",
          bottom: navbarOpen ? "auto" : "-50rem",
          right: navbarOpen ? "auto" : "1px",
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
