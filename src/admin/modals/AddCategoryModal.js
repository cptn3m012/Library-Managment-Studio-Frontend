import React, { useState } from 'react';
import axios from 'axios';
import ConnectionUrl from '../../utils/ConnectionUrl';
import { errorNotify, successNotify } from '../../utils/Notifications';

function AddCategoryModal({ isOpen, onClose, onCategoryAdd }) {
    const [newCategory, setNewCategory] = useState('');

    const overlayStyle = `absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`;

    const handleInputChange = (e) => {
        setNewCategory(e.target.value);
    };

    const handleAddCategory = async () => {
        if (newCategory.trim() === '') {
            alert('Nazwa kategorii nie może być pusta.');
            return;
        }

        try {
            await axios.post(`${ConnectionUrl.connectionUrlString}api/categories`, { name: newCategory });

            successNotify('Dodano nową kategorię')
            onCategoryAdd(newCategory);
        } catch (error) {
            errorNotify('Nie udało się dodać kategorii.');
        }
        setNewCategory('');
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center items-start ${isOpen ? "pt-10" : "hidden"} overflow-x-hidden overflow-y-auto`}
        >
        <div className={overlayStyle} aria-hidden="true" onClick={onClose}></div>
            <div className="relative w-full max-w-md">
                <form className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Dodaj kategorię
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
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={handleInputChange}
                            placeholder="Nowa kategoria"
                            className="border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                            Anuluj
                        </button>
                        <button
                            type="button"
                            onClick={handleAddCategory}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Dodaj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCategoryModal;

