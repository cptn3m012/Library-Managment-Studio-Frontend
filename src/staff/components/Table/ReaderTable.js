import React from 'react';
import ReaderTableRow from './ReaderTableRow';

const ReaderTable = ({ readers, onEdit, onDelete }) => {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Imię i nazwisko</th>
                    <th scope="col" className="px-6 py-3">PESEL</th>
                    <th scope="col" className="px-6 py-3">Adres</th>
                    <th scope="col" className="px-6 py-3">Kod pocztowy i miasto</th>
                    <th scope="col" className="px-6 py-3">Adres e-mail</th>
                    <th scope="col" className="px-6 py-3">Numer telefonu</th>
                    <th scope="col" className="px-6 py-3">Akcje</th>
                </tr>
            </thead>
            <tbody>
                {readers.map(reader => (
                    <ReaderTableRow
                        key={reader.id}
                        reader={reader}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ReaderTable;