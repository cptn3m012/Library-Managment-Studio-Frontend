import React from 'react';

const BookRow = ({ book, onEdit, onDelete, onLoan, isAdmin, isStaff }) => {
    const authorsList = book.authors.map(author =>
        `${author.firstName} ${author.lastName}`
    ).join(', ');

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {book.title}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {book.isbn}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {book.publisher}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {book.publication_year}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {authorsList}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {book.category}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {book.status}
            </td>
            <td className="px-6 py-4 text-left whitespace-nowrap">
                {isAdmin && (
                    <>
                        <button
                            className="px-2 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring"
                            onClick={() => onEdit(book)}>
                            Edytuj
                        </button>
                        <button
                            className="ml-2 px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring"
                            onClick={() => onDelete(book)}>
                            Usuń
                        </button>
                    </>
                )}
                {isStaff && !isAdmin && (
                    <button
                        className="px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring"
                        onClick={() => onLoan(book)}>
                        Wypożycz
                    </button>
                )}
            </td>
        </tr>
    );
};

export default BookRow;