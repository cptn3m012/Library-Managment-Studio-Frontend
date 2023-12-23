import React from 'react';

const TableRow = ({ employee, onEdit, onDelete }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {employee.first_name} {employee.last_name}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {employee.pesel}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {employee.hired_date}
            </td>
            <td className="px-6 py-4 font-normal text-gray-500 whitespace-nowrap dark:text-white">
                <a href={`mailto:${employee.email}`} className="text-blue-600 hover:text-blue-800 underline">
                    {employee.email}
                </a>
            </td>
            <td className="px-6 py-4">
                <a href={`tel:+48${employee.phone_number}`} className="text-blue-600 hover:text-blue-800 underline">
                    +48 {employee.phone_number}
                </a>
            </td>
            <td className="px-6 py-4 flex items-center space-x-2">
                <button 
                    className="px-2 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
                    onClick={() => onEdit(employee)}>
                    Edytuj
                </button>
                <button 
                    className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50" 
                    onClick={() => onDelete(employee)}>
                    X
                </button>
            </td>
        </tr>
    );
};

export default TableRow;