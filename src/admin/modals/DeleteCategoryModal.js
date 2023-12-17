import React, { useState } from 'react';
import axios from 'axios';
import ConnectionUrl from '../../utils/ConnectionUrl';
import { errorNotify, successNotify } from '../../utils/Notifications';

function DeleteCategoryModal({ isOpen, onClose, categoryId, onCategoryDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const overlayStyle = `absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`;

    const handleDeleteCategory = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`${ConnectionUrl.connectionUrlString}api/categories/${categoryId}`);
            successNotify('Kategoria została usunięta');
            onCategoryDelete(); // Wywołanie po udanym usunięciu
            onClose(); // Zamknięcie modala
        } catch (error) {
            errorNotify('Błąd podczas usuwania kategorii');
            console.error('Error deleting category:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center items-start ${isOpen ? "pt-10" : "hidden"} overflow-x-hidden overflow-y-auto`}
        >
            <div className={overlayStyle} aria-hidden="true" onClick={onClose}></div>
            <div className="relative w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Usuń kategorię
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
                        <p>Czy na pewno chcesz usunąć tę kategorię? Ta akcja jest nieodwracalna.</p>
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
                            onClick={handleDeleteCategory}
                            disabled={isDeleting}
                            className={`text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isDeleting ? 'Usuwanie...' : 'Usuń'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteCategoryModal;