import React from 'react';

const LoanTableRow = ({ loan, onReturn }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{loan.book_title_with_authors}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{loan.borrower_name} ({loan.borrower_pesel})</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{loan.loan_date}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{loan.return_date || '---'}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{loan.status}</td>
            <td className="px-6 py-4 font-medium flex items-center space-x-2">
                <button
                    className="px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => onReturn(loan)}>
                    Zwrot
                </button>
            </td>
        </tr>
    );
};

export default LoanTableRow;
