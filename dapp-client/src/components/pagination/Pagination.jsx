// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const getVisiblePageNumbers = () => {
        const maxVisiblePages = 7;
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);
        let startPage = Math.max(1, currentPage - halfVisiblePages);
        let endPage = Math.min(totalPages, currentPage + halfVisiblePages);

        if (currentPage <= halfVisiblePages) {
            endPage = Math.min(totalPages, maxVisiblePages);
        } else if (currentPage + halfVisiblePages >= totalPages) {
            startPage = Math.max(1, totalPages - maxVisiblePages + 1);
        }

        const visiblePages = [];
        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        return visiblePages;
    };

    return (
        <div className="flex items-center justify-center font-bold space-x-2 mb-5 max-w-md mx-auto">
            <button
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-secundary dark:text-secundary'}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            {getVisiblePageNumbers().map(number => (
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
