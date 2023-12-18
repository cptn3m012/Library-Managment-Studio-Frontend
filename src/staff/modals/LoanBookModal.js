import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectionUrl from '../../utils/ConnectionUrl';
import Select from 'react-select';

function LoanBookModal({ isOpen, onClose, selectedBook }) {
    const [loanData, setLoanData] = useState({
        selectedBooks: '',
        borrower: '',
        loanDate: '',
        returnDate: ''
    });
    const [borrowers, setBorrowers] = useState([]);
    const [availableBooks, setAvailableBooks] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('color-theme') === 'dark');

    useEffect(() => {
        if (isOpen && selectedBook) {
            // Pobierz listę dostępnych książek i czytelników
            const fetchAvailableBooks = async () => {
                // Twoja logika pobierania dostępnych książek
            };
            const fetchBorrowers = async () => {
                try {
                    const response = await axios.get(`${ConnectionUrl.connectionUrlString}/api/borrowers`);
                    setBorrowers(response.data);
                } catch (error) {
                    console.error('Error fetching borrowers: ', error);
                }
            };

            fetchAvailableBooks();
            fetchBorrowers();

            // Ustaw domyślne daty
            const today = new Date().toISOString().split('T')[0];
            const nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + 1);

            setLoanData(prevData => ({
                ...prevData,
                loanDate: today,
                returnDate: nextMonth.toISOString().split('T')[0]
            }));

            setLoanData(prevData => ({
                ...prevData,
                selectedBooks: selectedBook ? [selectedBook] : [],
            }));

            const handleStorageChange = () => {
                setIsDarkMode(localStorage.getItem('color-theme') === 'dark');
            };
            window.addEventListener('storage', handleStorageChange);

            // Oczyszczenie event listenera
            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }
    }, [isOpen, selectedBook]);

    const handleBookSelection = (book) => {
        setLoanData(prevData => ({
            ...prevData,
            selectedBooks: [...prevData.selectedBooks, book]
        }));
    };

    const handleBorrowerChange = selectedOption => {
        setLoanData({ ...loanData, borrower: selectedOption.value });
    };

    const borrowerOptions = borrowers.map(borrower => ({
        value: borrower.id,
        label: `${borrower.first_name} ${borrower.last_name}`
    }));

    const customStyles = {
        control: (styles, { isFocused, isDisabled }) => ({
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isDarkMode
            ? 'rgb(55, 65, 81)' // Zmienione na kolor odpowiadający dark:bg-gray-700
            : 'rgb(255, 255, 255)', // Jasne tło dla trybu jasnego
          color: isDarkMode ? 'white' : 'rgb(55, 65, 81)',
          borderColor: isFocused
            ? isDarkMode
              ? 'rgb(59, 130, 246)'
              : 'rgb(209, 213, 219)'
            : isDarkMode
              ? 'rgb(75, 85, 99)' // Zmienione na kolor odpowiadający dark:border-gray-600
              : styles.borderColor,
          '&:hover': {
            borderColor: isFocused
              ? isDarkMode
                ? 'rgb(59, 130, 246)'
                : 'rgb(209, 213, 219)'
              : isDarkMode
                ? 'rgb(75, 85, 99)' // Zmienione na kolor odpowiadający dark:border-gray-600
                : styles.borderColor,
          }
        }),
        input: (styles) => ({
          ...styles,
          color: isDarkMode ? 'white' : 'rgb(55, 65, 81)',
        }),
        placeholder: (styles) => ({
          ...styles,
          color: isDarkMode ? 'white' : 'rgb(55, 65, 81)',
        }),
        singleValue: (styles) => ({
          ...styles,
          color: isDarkMode ? 'white' : 'rgb(55, 65, 81)',
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'white', // Zmienione na kolor odpowiadający dark:bg-gray-700
        }),
        menuList: (provided) => ({
          ...provided,
          // Dodaj tutaj inne style, jeśli to konieczne
        }),
        option: (provided, { isFocused, isSelected }) => ({
          ...provided,
          backgroundColor: isDarkMode
            ? isSelected
              ? 'rgba(59, 130, 246, 0.5)' // Niebieskie dla wybranej opcji w trybie ciemnym
              : isFocused
                ? 'rgba(59, 130, 246, 0.25)' // Niebieskie dla opcji pod kursorem w trybie ciemnym
                : 'rgb(55, 65, 81)' // Zmienione na kolor odpowiadający dark:bg-gray-700
            : isSelected
              ? 'rgba(59, 130, 246, 0.5)'
              : isFocused
                ? 'rgba(209, 213, 219, 0.5)'
                : 'white',
          color: isDarkMode ? 'white' : 'rgb(31, 41, 55)', // Biały tekst dla opcji w trybie ciemnym
          ':active': {
            ...provided[':active'],
            backgroundColor: isSelected
              ? 'rgb(55, 65, 81)' // Zmienione na kolor odpowiadający dark:bg-gray-700
              : isFocused
                ? 'rgba(59, 130, 246, 0.5)'
                : undefined,
          },
        }),
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika obsługi wysyłania formularza
        onClose();
    };

    return (
        <div
            id="loanBookModal"
            className={`fixed inset-0 z-50 flex justify-center pt-10 items-start ${isOpen ? "" : "hidden"} overflow-x-hidden overflow-y-auto`}
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" onClick={onClose}></div>
            <div className="relative w-full max-w-3xl max-h-full">
                <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Wypożyczenie książki
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            {/* Ikona zamknięcia */}
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        {/* Wybrane książki */}
                        <div>
                            <label htmlFor="book-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tytuł książki:
                            </label>
                            <input
                                type="text"
                                id="book-title"
                                value={selectedBook.title}
                                className="bg-gray-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                                readOnly
                            />
                        </div>

                        {/* Wybór czytelnika */}
                        <div>
                            <label htmlFor="borrower" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Czytelnik:</label>
                            <Select
                                id="borrower"
                                onChange={handleBorrowerChange}
                                options={borrowerOptions}
                                styles={customStyles}
                                placeholder="Wybierz czytelnika"
                                isSearchable={true}
                                classNamePrefix="react-select"
                            />
                        </div>

                        {/* Daty wypożyczenia i zwrotu */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="loanDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data wypożyczenia:</label>
                                <input
                                    type="date"
                                    id="loanDate"
                                    name="loanDate"
                                    value={loanData.loanDate}
                                    onChange={e => setLoanData({ ...loanData, loanDate: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="returnDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data zwrotu:</label>
                                <input
                                    type="date"
                                    id="returnDate"
                                    name="returnDate"
                                    value={loanData.returnDate}
                                    onChange={e => setLoanData({ ...loanData, returnDate: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                        {/* Przycisk wypożyczenia */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Wypożycz
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoanBookModal;
