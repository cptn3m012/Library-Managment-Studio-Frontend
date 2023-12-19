import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectionUrl from '../../utils/ConnectionUrl';
import Select from 'react-select';
import { successNotify, errorNotify } from '../../utils/Notifications';

function LoanBookModal({ isOpen, onClose, selectedBook, fetchBooks }) {
    const [loanData, setLoanData] = useState({
        selectedBooks: '',
        borrower: '',
        loanDate: '',
        returnDate: ''
    });
    const [borrowers, setBorrowers] = useState([]);
    const [availableBooks, setAvailableBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([selectedBook]);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('color-theme') === 'dark');

    useEffect(() => {
        if (isOpen && selectedBook) {
            // Pobierz listę dostępnych książek i czytelników
            const fetchAvailableBooks = async () => {
                try {
                    const response = await axios.get(`${ConnectionUrl.connectionUrlString}/api/books`);
                    setAvailableBooks(response.data);
                } catch (error) {
                    console.error('Error fetching available books: ', error);
                    errorNotify('Wystąpił błąd podczas pobierania listy dostępnych książek');
                }
            };

            const fetchBorrowers = async () => {
                try {
                    const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/borrowers`);
                    const sortedBorrowers = response.data.sort((a, b) => {
                        // Sortowanie po imieniu, nazwisku i peslu
                        return a.first_name.localeCompare(b.first_name) ||
                            a.last_name.localeCompare(b.last_name) ||
                            a.pesel.localeCompare(b.pesel);
                    });
                    setBorrowers(sortedBorrowers);
                } catch (error) {
                    console.error('Error fetching borrowers: ', error);
                    errorNotify('Wystąpił błąd podczas pobierania listy czytelników');
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

    const addNewBookField = () => {
        setSelectedBooks([...selectedBooks, { title: "", id: null }]);
    };

    const handleBookSelection = (index, selectedOption) => {
        const updatedBooks = selectedBooks.map((book, i) => {
            if (i === index) return { ...book, title: selectedOption.label, id: selectedOption.value };
            return book;
        });
        setSelectedBooks(updatedBooks);
    };

    const borrowerOptions = borrowers.map(borrower => ({
        value: borrower.id,
        label: `${borrower.first_name} ${borrower.last_name}, ${borrower.pesel}`
    }));

    const bookOptions = availableBooks.map(book => ({
        value: book.id,
        label: `${book.title} - ${book.authors.map(author => author.firstName + ' ' + author.lastName).join(', ')}`
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

    const handleCloseLoanModal = () => {
        onClose(); // Załóżmy, że onClose jest funkcją przekazaną jako prop
    };
    
    const handleLoanSubmit = async (e) => {
        e.preventDefault();

        const bookIds = selectedBooks.map(book => book.id).filter(id => id != null);

        // Dodanie ID książki z pierwszego diva, jeśli nie została jeszcze dodana
        const firstBookId = selectedBook.id;
        if (!bookIds.includes(firstBookId)) {
            bookIds.unshift(firstBookId);
        }

         // Sprawdzenie, czy zostały wybrane jakieś książki
        if (bookIds.length === 0) {
            errorNotify('Proszę wybrać przynajmniej jedną książkę do wypożyczenia');
            return;
        }

          // Sprawdzenie, czy została wybrana osoba do wypożyczenia
        if (!loanData.borrower) {
            errorNotify('Proszę wybrać osobę do wypożyczenia książki');
            return;
        }

        // Przygotuj dane do wysłania
        const loanDetails = {
            book_ids: bookIds,
            borrower_id: loanData.borrower,
            loan_date: loanData.loanDate,
            return_date: loanData.returnDate
        };

        try {
            const response = await axios.post(`${ConnectionUrl.connectionUrlString}/api/loans`, loanDetails);
            // Obsłuż odpowiedź, np. zaktualizuj stan
            successNotify('Książki zostały wypożyczone pomyślnie');
            // Możesz tutaj odświeżyć listę książek, aby odzwierciedlić zmianę ich ilości
            fetchBooks();
            handleCloseLoanModal();
        } catch (error) {
            console.error('Error loaning the book: ', error);
            errorNotify(`Wystąpił błąd podczas wypożyczania książki: ${error.response.data.error}`);
            console.log(loanDetails);
        } finally {
            // Zamknij modal niezależnie od wyniku
            handleCloseLoanModal();
        }
    };


    return (
        <div
            id="loanBookModal"
            className={`fixed inset-0 z-50 flex justify-center pt-10 items-start ${isOpen ? "" : "hidden"} overflow-x-hidden overflow-y-auto`}
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" onClick={onClose}></div>
            <div className="relative w-full max-w-3xl max-h-full">
                <form onSubmit={handleLoanSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
                            {/* Przycisk do Dodawania Kolejnej Książki */}
                            <div>
                                <button
                                    type="button"
                                    onClick={addNewBookField}
                                    className="add-book-button dark:text-white"
                                >
                                    Dodaj kolejną książkę
                                </button>
                            </div>
                        </div>

                        {/* Renderowanie Select dla Kolejnych Książek */}
                        {selectedBooks.map((book, index) => (
                            index > 0 && (
                                <div key={index}>
                                    <label htmlFor={`book-select-${index}`}>Tytuł książki:</label>
                                    <Select
                                        id={`book-select-${index}`}
                                        onChange={selectedOption => handleBookSelection(index, selectedOption)}
                                        options={bookOptions}
                                        placeholder="Wybierz kolejną książkę do wypożyczenia"
                                        styles={customStyles}
                                        classNamePrefix="react-select"
                                    />
                                </div>
                            )
                        ))}

                        {/* Wybór czytelnika */}
                        <div>
                            <label htmlFor="borrower" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Czytelnik:</label>
                            <Select
                                id="borrower"
                                onChange={(selectedOption) => setLoanData({ ...loanData, borrower: selectedOption.value })}
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
