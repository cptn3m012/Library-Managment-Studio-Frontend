import React from 'react';
import BookRow from './BookRow';

const BookTable = ({ books, onEdit, onDelete, onLoan, isAdmin, isStaff }) => {
    return (
        <table className="w-full max-w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 min-w-[80px]">
                        Tytuł
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[80px]">
                        ISBN
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[80px]">
                        Wydawnictwo
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[80px]">
                        Rok wydania
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[120px]">
                        Autor
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[80px]">
                        Kategoria
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[80px]">
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
                        onLoan={onLoan}
                        onDelete={onDelete}
                        isAdmin={isAdmin}
                        isStaff={isStaff}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default BookTable;