import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConnectionUrl from '../../utils/ConnectionUrl';
import Breadcrumb from '../../components/Breadcrumb';
import LoanTable from '../components/Table/LoanTable';
import Pagination from '../../components/Paginantion';
import SearchBar from '../../components/SearchBar';
import ReturnLoanModal from '../modals/ReturnLoanModal ';
import { successNotify, errorNotify } from "../../utils/Notifications";

function LoanListContainer() {
    const navigate = useNavigate();
    const [loans, setLoans] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [loanToReturn, setLoanToReturn] = useState(null);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm.toLowerCase());
        setCurrentPage(1);
    };

    const filteredLoans = loans.filter(loan => {
        const loanInfo = (loan.book_title_with_authors + ' ' + loan.borrower_name + ' ' + loan.borrower_pesel + ' ' + loan.loan_date).toLowerCase();
        return loanInfo.includes(searchTerm);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredLoans.slice(indexOfFirstItem, indexOfLastItem);
    const totalFilteredPages = Math.ceil(filteredLoans.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(loans.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(loans.length / itemsPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const handleReturnClick = (loan) => {
        setLoanToReturn(loan);
        setIsReturnModalOpen(true);
    };

    const closeReturnModal = () => {
        setIsReturnModalOpen(false);
        setLoanToReturn(null);
    };

    const handleReturnConfirm = async () => {
        try {
            const response = await axios.post(`${ConnectionUrl.connectionUrlString}api/loans/return/${loanToReturn.id}`);
            await fetchLoans();           
            closeReturnModal();
            successNotify('Książka zwrócona pomyślnie');
        } catch (error) {
            if (error.response) {
                // Odpowiedź serwera jest dostępna
                console.error('Error data:', error.response.data);
                // Możesz również wyświetlić bardziej szczegółowy komunikat błędu na interfejsie użytkownika
                errorNotify(`Błąd podczas zwracania książki: ${error.response.data.error}`);
            } else {
                // Błąd po stronie klienta lub inny problem
                console.error('Error returning loan: ', error);
                errorNotify('Błąd podczas zwracania książki');
            }
        }
    };

    const fetchLoans = async () => {
        try {
            const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/loans`);
            if (response.data) {
                setLoans(response.data);  // Upewnij się, że ta linia istnieje
            } else {
                console.log('No data received');
            }
        } catch (error) {
            console.error('Error fetching loans: ', error);
            errorNotify('Wystąpił błąd podczas pobierania listy wypożyczeń');
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Lista czytelników</h1>
            <Breadcrumb
                links={[
                    { label: 'Home', path: '/' },
                    { label: 'Lista czytelników', path: '/staff/readers-list' }
                ]}
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 px-4 border border-gray-300">
                    <SearchBar onSearch={handleSearch} placeholder={'Wyszukaj czytelnika'} />
                    <button
                        onClick={() => navigate('/staff/add-reader')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mt-4 rounded"
                    >
                        Dodaj czytelnika
                    </button>
                </div>
                <LoanTable
                    loans={currentItems}
                    onReturn={handleReturnClick}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalFilteredPages}
                    onPageChange={handlePageChange}
                />
                {isReturnModalOpen && (
                    <ReturnLoanModal
                        isOpen={isReturnModalOpen}
                        onClose={closeReturnModal}
                        loanData={loanToReturn}
                        onConfirmReturn={handleReturnConfirm}
                    />
                )}
            </div>
        </div>
    );
}

export default LoanListContainer;
