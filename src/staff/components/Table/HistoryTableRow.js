import React from 'react';

const HistoryTableRow = ({ history, onDetailsClick }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{history.book_title_with_authors}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{history.borrower_info}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{history.loan_date}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{history.return_date || '---'}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{history.status}</td>
            <td className="px-6 py-4 font-medium flex items-center space-x-2">
                <button
                    className="px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => onDetailsClick(history)}>
                    Szczegóły
                </button>
            </td>
        </tr>
    );
};

export default HistoryTableRow;
