import React, { useState } from 'react';

function AddCategoryModal({ isOpen, onClose, onCategoryAdd }) {
    const [newCategory, setNewCategory] = useState('');

    const handleInputChange = (e) => {
        setNewCategory(e.target.value);
    };

    const handleAddCategory = () => {
        if (newCategory.trim() === '') {
            alert('Nazwa kategorii nie może być pusta.');
            return;
        }

        onCategoryAdd(newCategory);
        setNewCategory('');
        onClose();
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-10 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="modal">
                <div className="modal-content">
                    <h2 className="text-xl font-medium mb-4">Dodaj kategorię</h2>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={handleInputChange}
                        placeholder="Nowa kategoria"
                        className="border rounded-lg p-2 w-full"
                    />
                    <div className="mt-4 flex justify-end">
                        <button onClick={onClose} className="mr-2">Anuluj</button>
                        <button onClick={handleAddCategory} className="bg-blue-500 text-white rounded-lg p-2">Dodaj</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCategoryModal;
