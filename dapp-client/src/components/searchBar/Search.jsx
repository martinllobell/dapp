import React from "react";

export default function Search() {
    return (
        <div className="flex items-center p-2 dark:bg-gray-700 bg-indigo-500 rounded-lg hover:bg-indigo-900 w-full mb-4">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input 
                type="text" 
                placeholder="Buscar" 
                className="bg-transparent outline-none border-none placeholder-gray-400 text-white w-full"
            />
        </div>
    );
}
