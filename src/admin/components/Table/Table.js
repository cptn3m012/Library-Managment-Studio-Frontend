import React from 'react';
import TableRow from './TableRow';

const Table = ({ employees, onEdit, onDelete }) => {
    return (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 min-w-[160px]">
                            Imię i nazwisko
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[140px]">
                            Numer PESEL
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[140px]">
                            Data zatrudnienia
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[160px]">
                            Adres e-mail
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[160px]">
                            Numer telefonu
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[160px]">
                            Akcje
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <TableRow 
                            key={emp.id} 
                            employee={emp} 
                            onEdit={onEdit} 
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
    );
};

export default Table;