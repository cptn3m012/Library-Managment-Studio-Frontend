import React from 'react';
import LoanTableRow from './LoanTableRow';

const LoanTable = ({ loans, onReturn }) => {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Wypożyczona książka</th>
                    <th scope="col" className="px-6 py-3">Czytelnik</th>
                    <th scope="col" className="px-6 py-3">Data wypożyczenia</th>
                    <th scope="col" className="px-6 py-3">Data zwrotu</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Akcje</th>
                </tr>
            </thead>
            <tbody>
                {loans.map(loan => (
                    <LoanTableRow
                        key={loan.id}
                        loan={loan}
                        onReturn={onReturn}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default LoanTable;
