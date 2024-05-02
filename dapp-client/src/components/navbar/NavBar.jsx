import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleDarkMode, darkMode }) => { // Utiliza destructuración de props
  return (
    <nav className={`bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl ${darkMode ? 'dark' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight ml-3">D-App</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-slate-900 dark:text-white font-medium">Iniciar Sesión</Link>
            <Link to="/wallet" className="text-slate-900 dark:text-white font-medium">Conectar Wallet</Link>
            <button onClick={toggleDarkMode} className="text-slate-900 dark:text-white font-medium px-3 py-1 rounded bg-indigo-500 hover:bg-indigo-600">
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
