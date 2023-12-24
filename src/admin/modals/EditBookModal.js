import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectionUrl from '../../utils/ConnectionUrl';
import useFormValidation from '../hooks/useFormValidation';
import { errorNotify } from '../../utils/Notifications';
import { validateAuthor } from '../../utils/validation';

function EditBookModal({ isOpen, onClose, bookData, handleFormSubmit }) {
    const initialFormData = {
        // początkowe wartości dla pól formularza, dostosowane do struktury bookData
        title: bookData.title || '',
        authors: bookData.authors || [''],
        isbn: bookData.isbn || '',
        category: bookData.category || '',
        publication_year: bookData.publication_year || '',
        publisher: bookData.publisher || ''
    };

    const [categories, setCategories] = useState([]);
    const { formData, formErrors, handleInputChange, setFormData, setFormErrors } = useFormValidation(initialFormData);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/categories`);
                setCategories(response.data);

                // Zakładając, że bookData.category jest nazwą kategorii
                const currentCategory = response.data.find(cat => cat.name === bookData.category);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    category: currentCategory ? currentCategory.id.toString() : ''
                }));
            } catch (error) {
                console.error('Błąd podczas pobierania kategorii:', error);
            }
        };

        if (isOpen) {
            fetchCategories();

            setFormData({
                title: bookData.title,
                authors: bookData.authors.map(author => `${author.firstName} ${author.lastName}`),
                isbn: bookData.isbn,
                category: '',
                publication_year: bookData.publication_year,
                publisher: bookData.publisher
            });
        }
    }, [isOpen, bookData, setFormData]);

    const handleAuthorChange = (index, value) => {
        const updatedAuthors = formData.authors.map((author, i) => {
            if (i === index) return value;
            return author;
        });
        setFormData({ ...formData, authors: updatedAuthors });
        setFormErrors({ ...formErrors, [`author-${index}`]: validateAuthor(value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Sprawdzenie, czy istnieją jakiekolwiek błędy w formularzu
        const hasErrors = Object.values(formErrors).some(error => error);
    
        if (hasErrors) {
            // Wyświetlenie powiadomienia o błędach
            errorNotify('Formularz zawiera błędy. Proszę je poprawić.');
            return;
        }
    
        // Przygotowanie danych do przesłania
        const preparedData = {
            ...formData,
            authors: formData.authors.map(author => {
                const [firstName, lastName] = author.split(' ');
                return { firstName, lastName };
            })
        };
    
        // Wywołanie funkcji obsługi przesyłania formularza
        handleFormSubmit(preparedData);
        onClose();
    };

    return (
        <div
            id="editBookModal"
            tabIndex="-1"
            aria-hidden="true"
            className={`fixed inset-0 z-50 flex justify-center pt-10 items-start ${isOpen ? "" : "hidden"} overflow-x-hidden overflow-y-auto`}
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl max-h-full">
                <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edycja książki
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
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Tytuł książki */}
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tytuł książki:</label>
                                <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                {formErrors.title && <p className="text-red-500">{formErrors.title}</p>}
                            </div>

                            {/* Numer ISBN */}
                            <div>
                                <label htmlFor="isbn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numer ISBN:</label>
                                <input type="text" name="isbn" id="isbn" value={formData.isbn} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                {formErrors.isbn && <p className="text-red-500">{formErrors.isbn}</p>}
                            </div>

                            {/* Rok wydania */}
                            <div>
                                <label htmlFor="publication_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rok wydania:</label>
                                <input type="number" id="publication_year" name="publication_year" min="1900" max={new Date().getFullYear()} value={formData.publication_year} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="2023" required />
                                {formErrors.publication_year && <p className="text-red-500">{formErrors.publication_year}</p>}
                            </div>

                            {/* Wydawnictwo */}
                            <div>
                                <label htmlFor="publisher" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wydawnictwo:</label>
                                <input type="text" name="publisher" id="publisher" value={formData.publisher} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                {formErrors.publisher && <p className="text-red-500">{formErrors.publisher}</p>}
                            </div>
                        </div>
                        {/* Autorzy */}
                        {formData.authors.map((author, index) => (
                            <div key={index} className="flex flex-col mb-4">
                                <label htmlFor={`author-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Autor:</label>
                                <input type="text" name={`author-${index}`} id={`author-${index}`} value={author} onChange={(e) => handleAuthorChange(index, e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                {formErrors[`author-${index}`] && <p className="text-red-500">{formErrors[`author-${index}`]}</p>}
                            </div>
                        ))}
                        {/* Kategoria książki */}
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategoria książki:</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                required
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id.toString()}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Zapisz zmiany
                        </button>
                        <button
                            onClick={onClose} 
                            className="text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-black dark:focus:ring-gray-700"
                        >
                            Zamknij
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBookModal;
