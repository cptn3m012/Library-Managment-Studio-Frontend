import React, { useState, useEffect } from 'react';
import AddCategoryModal from '../modals/AddCategoryModal';
import Breadcrumb from '../../components/Breadcrumb';
import { HiOutlinePlusCircle } from "react-icons/hi";
import axios from 'axios';
import ConnectionUrl from '../../utils/ConnectionUrl';
import DeleteCategoryModal from '../modals/DeleteCategoryModal';
import { successNotify, errorNotify } from '../../utils/Notifications';

function AddBookContainer() {
    const [formData, setFormData] = useState({
        title: '',
        authors: [''],
        isbn: '',
        category: '',
        publication_year: '',
        publisher: ''
    });
    const [categories, setCategories] = useState([]);
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania kategorii:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryAdd = (newCategory) => {
        // Dodaj nową kategorię do listy
        const newCategoryId = categories.length + 1;
        const newCategoryObject = {
            id: newCategoryId,
            name: newCategory,
        };
        setCategories([...categories, newCategoryObject]);
        setFormData({ ...formData, category: newCategoryId });
        setAddCategoryModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleAuthorChange = (index, value) => {
        const updatedAuthors = formData.authors.map((author, i) => {
            if (i === index) return value;
            return author;
        });
        setFormData({ ...formData, authors: updatedAuthors });
    };

    const addAuthorField = () => {
        setFormData({ ...formData, authors: [...formData.authors, ''] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Przetwarzanie autorów
        const authors = formData.authors.map(author => {
            const [firstName, lastName] = author.split(' '); // Zakładamy, że imię i nazwisko są oddzielone spacją
            return { firstName, lastName };
        });

        // Przygotowanie danych do wysłania
        const bookData = {
            title: formData.title,
            isbn: formData.isbn,
            category: formData.category,
            publication_year: formData.publication_year,
            publisher: formData.publisher,
            quantity: quantity,
            authors: authors
        };

        try {
            const response = await axios.post(`${ConnectionUrl.connectionUrlString}api/books`, bookData);
            console.log('Książka dodana:', response.data);
            successNotify('Książka została dodana');
        } catch (error) {
            console.error('Błąd podczas dodawania książki:', error);
            if (error.response && error.response.data) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify("Wystąpił błąd podczas przetwarzania żądania.");
            }
        }
    };

    const openDeleteCategoryModal = () => {
        if (!formData.category) {
            console.error("No category selected to delete");
            return;
        }
        setIsDeleteCategoryModalOpen(true);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Dodaj książkę</h1>
            <Breadcrumb
                links={[
                    { label: 'Home', path: '/' },
                    { label: 'Lista książek', path: '/admin/books-list' },
                    { label: 'Dodaj książkę', path: '/admin/add-book' }
                ]}
            />
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tytuł książki:</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                    <label htmlFor="isbn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numer ISBN:</label>
                    <input type="text" name="isbn" id="isbn" value={formData.isbn} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                    <label htmlFor="publication_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Rok wydania:
                    </label>
                    <input
                        type="number"
                        id="publication_year"
                        name="publication_year"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={formData.publication_year}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="2023"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="publisher" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Wydawnictwo:
                    </label>
                    <input
                        type="text"
                        name="publisher"
                        id="publisher"
                        value={formData.publisher}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                </div>
                {formData.authors.map((author, index) => (
                    <div key={index} className="flex flex-col mb-4">
                        <label htmlFor={`author-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {index === 0 ? "Autor" : `Autor ${index + 1}`}:
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name={`author-${index}`}
                                id={`author-${index}`}
                                value={author}
                                onChange={(e) => handleAuthorChange(index, e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                            />
                            {index === formData.authors.length - 1 && (
                                <button
                                    type="button"
                                    onClick={addAuthorField}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none focus:text-gray-700"
                                >
                                    <HiOutlinePlusCircle />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategoria książki:</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={(e) => {
                            if (e.target.value === "addCategory") {
                                setAddCategoryModalOpen(true);
                            } else {
                                handleInputChange(e);
                            }
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Wybierz kategorię</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                        <option value="addCategory">Dodaj kategorię...</option>
                    </select>
                    <span
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                        onClick={openDeleteCategoryModal}
                    >
                        Usuń Kategorię
                    </span>
                </div>
                <AddCategoryModal
                    isOpen={isAddCategoryModalOpen}
                    onClose={() => {
                        setAddCategoryModalOpen(false);
                        fetchCategories();  // Dodaj wywołanie funkcji fetchCategories po zamknięciu modala
                    }}
                    onCategoryAdd={handleCategoryAdd}
                />
                {isDeleteCategoryModalOpen && (
                    <DeleteCategoryModal
                        isOpen={isDeleteCategoryModalOpen}
                        onClose={() => setIsDeleteCategoryModalOpen(false)}
                        categoryId={formData.category}
                        onCategoryDelete={() => {
                            // Usuwanie kategorii z lokalnego stanu
                            setCategories(prevCategories => prevCategories.filter(cat => cat.id.toString() !== formData.category));
                            // Resetowanie wybranej kategorii w formularzu
                            setFormData({ ...formData, category: '' });
                            setIsDeleteCategoryModalOpen(false);
                        }}
                    />
                )}
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ilość:</label>
                        <div className="flex items-center h-10">
                            <button
                                type="button"
                                className="text-gray-500 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 h-full w-10 rounded-l cursor-pointer"
                                onClick={() => setQuantity(qty => Math.max(qty - 1, 1))}
                            >
                                <span className="m-auto text-2xl font-thin">−</span>
                            </button>
                            <input
                                type="text"
                                className="outline-none focus:outline-none text-center w-14 bg-gray-50 dark:bg-gray-500 dark:text-white font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                name="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                pattern="[0-9]*"
                            />
                            <button
                                type="button"
                                className="text-gray-500 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 h-full w-10 rounded-r cursor-pointer"
                                onClick={() => setQuantity(qty => qty + 1)}
                            >
                                <span className="m-auto text-2xl font-thin">+</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    );
}

export default AddBookContainer;
