import React from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const FOOTER_ITEMS = (darkMode) => [
  {
    text: "About us",
    href: "/aboutus",
    darkModeClass: "text-gray-500 transition hover:text-gray-100/75",
    lightModeClass: "text-gray-900 transition hover:text-cyan-500",
    internal: true, // Indicamos que es una ruta interna
  },
  {
    text: "Contact Us",
    href: "#",
    darkModeClass: "text-gray-500 transition hover:text-gray-100/75",
    lightModeClass: "text-gray-900 transition hover:text-cyan-500",
    internal: false, // Indicamos que es una ruta externa
  },
  {
    text: "Cookies",
    href: "#",
    darkModeClass: "text-gray-500 transition hover:text-gray-100/75",
    lightModeClass: "text-gray-900 transition hover:text-cyan-500",
    internal: false, // Indicamos que es una ruta externa
  },
  {
    text: "Help",
    href: "#",
    darkModeClass: "text-gray-500 transition hover:text-gray-100/75",
    lightModeClass: "text-gray-900 transition hover:text-cyan-500",
    internal: false, // Indicamos que es una ruta externa
  },
];

export default function Footer({ darkMode }) {
  const footerItems = FOOTER_ITEMS(darkMode);

  return (
    <footer className="flex mt-5 justify-center flex-col items-center px-10">
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
      <p className="mx-auto text-center leading-relaxed">
        <span className="font-bold text-primary">D</span>'
        <span className="font-bold text-yellow-400">Best </span>
        betting site in the P2P market
      </p>
      <div className="relative mx-auto max-w-screen-xl sm:px-6 lg:px-2 lg:pt-8">
        <div className="lg:flex lg:items-end lg:justify-between">
          <ul className="flex flex-wrap justify-center gap-8 md:gap-10 lg:mt-0 lg:gap-16">
            {footerItems.map((item, index) => (
              <li key={index}>
                {item.internal ? (
                  <Link
                    className={`text-gray-400 font font-semibold ${
                      darkMode
                        ? "transition hover:text-yellow-500"
                        : "transition hover:text-primary"
                    }`}
                    to={item.href}
                  >
                    {item.text}
                  </Link>
                ) : (
                  <a
                    className={`text-gray-400 font font-semibold ${
                      darkMode
                        ? "transition hover:text-yellow-500"
                        : "transition hover:text-primary"
                    }`}
                    href={item.href}
                  >
                    {item.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 mb-5 flex justify-center items-center text-center text-sm text-gray-500">
          <p className="mr-2">© 2024 DBetting </p>|{" "}
          <p className="ml-2">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
