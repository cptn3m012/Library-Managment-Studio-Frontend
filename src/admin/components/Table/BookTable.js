import React from 'react';
import BookRow from './BookRow';

const BookTable = ({ books, onEdit, onDelete }) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 min-w-[160px]">
                        Tytuł
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[140px]">
                        ISBN
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[100px]">
                        Wydawnictwo
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[60px]">
                        Rok wydania
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[140px]">
                        Autor
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[140px]">
                        Kategoria
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[100px]">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Akcje
                    </th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <BookRow
                        key={book.id}
                        book={book}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default BookTable;