import React from 'react';
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation" className="flex justify-center my-4">
            <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                    <a 
                        href="#!"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage - 1);
                        }}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        disabled={currentPage === 1}
                    >
                        <span className="sr-only">Previous</span>
                        <HiChevronLeft className="h-5 w-5" />
                    </a>
                </li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a 
                            href="#!"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(number);
                            }}
                            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === number ? 'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
                        >
                            {number}
                        </a>
                    </li>
                ))}
                <li>
                    <a 
                        href="#!"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage + 1);
                        }}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Next</span>
                        <HiChevronRight className="h-5 w-5" />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;