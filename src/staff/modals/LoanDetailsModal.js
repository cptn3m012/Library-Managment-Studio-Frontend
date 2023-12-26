import React from 'react';

const LoanDetailsModal = ({ isOpen, onClose, loanDetails }) => {
    if (!loanDetails) return null;

    const { book, borrower } = loanDetails;

    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center pt-10 items-start ${isOpen ? "" : "hidden"} overflow-x-hidden overflow-y-auto`}
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Szczegóły Wypożyczenia
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
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
                            <span className="sr-only">Zamknij modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <fieldset className="border border-gray-300 p-3 mb-6">
                            <legend className="text-lg font-semibold text-gray-900 dark:text-white px-2">Dane książki:</legend>
                                <p><b>Tytuł: </b>{book.title}</p>
                                <p><b>Autor: </b>{book.authors}</p>
                                <p><b>Numer ISBN: </b>{book.isbn}</p>
                                <p><b>Wydawnictwo: </b>{book.publisher}</p>
                                <p><b>Rok wydania: </b>{book.publication_year}</p>
                                <p><b>Kategoria: </b>{book.category}</p>  
                            </fieldset>
                        </div>
                        <div>
                            <fieldset className="border border-gray-300 p-3 mb-6">
                            <legend className="text-lg font-semibold text-gray-900 dark:text-white px-2">Dane czytelnika:</legend>
                                <p><b>Imię i nazwisko: </b>{borrower.name}</p>
                                <p><b>PESEL: </b>{borrower.pesel}</p>
                                <p><b>Adres: </b> {borrower.address}</p>
                                <p><b>Kod pocztowy i miasto: </b>{borrower.postal_code} {borrower.city}</p>
                                <p><b>Adres e-mail: </b>{borrower.email}</p>
                                <p><b>Numer telefonu: </b>{borrower.phone}</p>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanDetailsModal;
