import React, { useState } from 'react';
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

const DeleteEmployeeModal = ({ isOpen, onClose, employeeToDelete, onConfirmDelete }) => {
    if (!isOpen) return null;

    const handleDeleteConfirm = () => {
        onConfirmDelete(employeeToDelete);
    };
    
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex justify-center pt-10">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border border-gray-300 rounded-lg">
                        <button onClick={onClose} className="absolute top-3 right-2.5 px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">
                            X
                        </button>
                        <div className="p-4 text-center">
                            <HiOutlineQuestionMarkCircle className="text-5xl mx-auto dark:text-white" /> 
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Czy na pewno chcesz usunąć tego pracownika?</h3>
                            <button onClick={handleDeleteConfirm} className="text-white bg-red-600 hover:bg-red-800 rounded-lg text-sm px-5 py-2.5 mr-2">
                                Tak, jestem pewien
                            </button>
                            <button onClick={onClose} className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900">
                                Nie, anuluj
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteEmployeeModal;