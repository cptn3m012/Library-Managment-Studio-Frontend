import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectionUrl from '../../utils/ConnectionUrl';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import Breadcrumb from '../../components/Breadcrumb';
import HistoryTable from '../components/Table/HistoryTable';
import Pagination from '../../components/Paginantion';
import SearchBar from '../../components/SearchBar';
import LoanDetailsModal from '../modals/LoanDetailsModal';
import { errorNotify } from "../../utils/Notifications";

function LoanHistoryListContainer() {
    const [loanHistories, setLoanHistories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);

    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue.toLowerCase());
        setCurrentPage(1);
    };

    const filteredHistories = loanHistories.filter(history => {
        const searchFields = [
            history.book_title_with_authors,
            history.borrower_info,
            history.loan_date,
            history.return_date || '',
            history.status
        ].map(field => field.toLowerCase());

        return searchFields.some(field => field.includes(searchTerm));
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHistories.slice(indexOfFirstItem, indexOfLastItem);
    const totalFilteredPages = Math.ceil(filteredHistories.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalFilteredPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(loanHistories.length / itemsPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const openModal = async (history) => {
        // Pobranie szczegółowych informacji o wypożyczeniu
        await fetchLoanDetails(history.id); // Używamy ID historii wypożyczenia
        setIsModalOpen(true);
    };
    
    const fetchLoanDetails = async (loanId) => {
        try {
            const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/loans/details/${loanId}`);
            console.log(response.data); // Logowanie odpowiedzi
            setSelectedLoan(response.data);
        } catch (error) {
            if (error.response) {
                // Wyświetlenie konkretnego komunikatu błędu zwróconego przez backend
                console.error('Error fetching loan details:', error.response.data.error);
                errorNotify(`Błąd podczas pobierania szczegółów wypożyczenia: ${error.response.data.error}`);
            } else if (error.request) {
                // Błąd związany z żądaniem, ale bez odpowiedzi od serwera
                console.error('Error fetching loan details:', error.request);
                errorNotify('Błąd podczas pobierania szczegółów wypożyczenia: Brak odpowiedzi od serwera');
            } else {
                // Inny błąd
                console.error('Error fetching loan details:', error.message);
                errorNotify(`Błąd podczas pobierania szczegółów wypożyczenia: ${error.message}`);
            }
        }
    };

    const fetchLoanHistories = async () => {
        try {
            const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/loan-history`);
            if (response.data) {
                setLoanHistories(response.data);
            } else {
                console.log('No data received');
            }
        } catch (error) {
            errorNotify('Wystąpił błąd podczas pobierania historii wypożyczeń');
        }
    };

    const breadcrumbLinks = isAdmin ? [
        { label: 'Home', path: '/admin' },
        { label: 'Raport wypożyczeń', path: '/admin/borrowing-history' },
    ] : isStaff ? [
        { label: 'Home', path: '/staff' },
        { label: 'Historia wypożyczeń', path: '/staff/borrowing-history' },
    ] : [
        { label: 'Home', path: '/' },
        { label: 'Historia wypożyczeń', path: '/' }, 
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            setIsAdmin(decoded.sub.role_id === 1);
            setIsStaff(decoded.sub.role_id === 2);
        }
        fetchLoanHistories();
    }, []);

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Historia wypożyczeń</h1>
            <Breadcrumb links={breadcrumbLinks} />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 px-4 border border-gray-300">
                    <SearchBar onSearch={handleSearch} placeholder={'Wyszukaj historię'} />
                </div>
                <HistoryTable
                    loanHistories={currentItems}
                    onDetailsClick={openModal}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalFilteredPages}
                    onPageChange={handlePageChange}
                />
                {isModalOpen && (
                    <LoanDetailsModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        loanDetails={selectedLoan}
                    />
                )}
            </div>
        </div>
    );
}

export default LoanHistoryListContainer;
