import React, { useState, useEffect } from 'react';
import AddCategoryModal from '../modals/AddCategoryModal';

function AddBookContainer() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        description: '',
        image: null,
        // inne pola specyficzne dla książki, jeśli są potrzebne
    });
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Pobierz kategorie z bazy danych lub użyj zastępczych danych
        setCategories([
            { id: 1, name: 'Literatura' },
            { id: 2, name: 'Nauka' },
            { id: 3, name: 'Kryminał, sensacja i thriller' },
            { id: 4, name: 'Fantasy i science fiction' },
            { id: 5, name: 'Romans' },
            { id: 6, name: 'Horror' },
            { id: 7, name: 'Książki dla dzieci i młodzieży' },
            { id: 8, name: 'Literatura faktu' },
            { id: 9, name: 'Poradniki' },
            { id: 10, name: 'Sztuka i muzyka' },
            { id: 11, name: 'Podróże' },
            { id: 12, name: 'Nauki społeczne' },
            { id: 13, name: 'Fantastyka historyczna' },
            { id: 14, name: 'Komiksy i grafika' },
            { id: 15, name: 'Książki kucharskie' },
            { id: 16, name: 'Literatura klasyczna' },
            // więcej kategorii...
        ]);
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });

        // Tworzenie podglądu obrazu
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Możesz tu dodać logikę przesyłania danych
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Dodaj książkę</h1>
            <div className='mb-4'>
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center">
                            <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <a href="/employee-list" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Książki</a>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">
                                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Dodaj książkę</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                {/* Przykładowe pola formularza */}
                <div>
                    <label htmlFor="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tytuł książki:</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                    <label htmlFor="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Autor:</label>
                    <input type="text" name="author" id="author" value={formData.author} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="col-span-2">
                    <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                    <input
                        type="file"
                        id="file_input"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        onChange={handleImageChange}
                        aria-describedby="file_input_help"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    {/* Podgląd obrazu */}
                    {previewImage && (
                        <img src={previewImage} alt="Podgląd obrazu" className="mt-4 w-full max-h-60 object-cover" />
                    )}
                </div>
                <div>
                    <label htmlFor="isbn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numer ISBN:</label>
                    <input type="text" name="isbn" id="isbn" value={formData.isbn} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
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
                </div>

                <AddCategoryModal
                    isOpen={isAddCategoryModalOpen}
                    onClose={() => setAddCategoryModalOpen(false)}
                    onCategoryAdd={handleCategoryAdd}
                />
                <div className="col-span-2">
                    <label htmlFor="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opis książki:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows="4"
                        placeholder="Opis książki"
                        required
                    ></textarea>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    {/* Pozostałe pola formularza */}

                    <div>
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ilość:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Reszta formularza */}
                </div>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    );
}

export default AddBookContainer;
