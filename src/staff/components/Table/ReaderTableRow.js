import React from 'react';

const ReaderTableRow = ({ reader, onEdit, onDelete }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {reader.first_name} {reader.last_name}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{reader.pesel}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{reader.address}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{reader.postal_code} {reader.city}</td>
            <td className="px-6 py-4">
                <a href={`mailto:${reader.email}`} className="text-blue-600 hover:text-blue-800 underline">
                    {reader.email}
                </a>
            </td>
            <td className="px-6 py-4">
                <a href={`tel:+48${reader.phone_number}`} className="text-blue-600 hover:text-blue-800 underline">
                    +48 {reader.phone_number}
                </a>
            </td>
            <td className="px-6 py-4 flex items-center space-x-2">
                <button
                    className="px-2 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                    onClick={() => onEdit(reader)}>
                    Edytuj
                </button>
                <button
                    className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                    onClick={() => onDelete(reader)}>
                    X
                </button>
            </td>
        </tr>
    );
};

export default ReaderTableRow;