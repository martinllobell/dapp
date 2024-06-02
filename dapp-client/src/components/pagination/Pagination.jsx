// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-center font-bold space-x-2 mb-5">
            <button
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-secundary dark:text-secundary'}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    className={`px-3 py-1 rounded ${currentPage === number ? 'bg-secundary dark:bg-secundary text-white' : 'text-secundary dark:text-secundary'}`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}
            <button
                className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-secundary dark:text-secundary'}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;
