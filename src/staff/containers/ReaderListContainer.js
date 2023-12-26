import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import ConnectionUrl from '../../utils/ConnectionUrl';
import Breadcrumb from '../../components/Breadcrumb';
import ReaderTable from '../components/Table/ReaderTable';
import Pagination from '../../components/Paginantion';
import SearchBar from '../../components/SearchBar';
import EditReaderModal from '../modals/EditReaderModal';
import DeleteReaderModal from '../modals/DeleteReaderModal';
import { successNotify, errorNotify } from "../../utils/Notifications";

function ReaderListContainer() {
    const navigate = useNavigate();
    const [readers, setReaders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingReader, setEditingReader] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [readerToDelete, setReaderToDelete] = useState(null);

    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm.toLowerCase());
        setCurrentPage(1); // Resetuje numer strony przy wyszukiwaniu
    };

    const filteredReaders = readers.filter(reader => {
        const searchFields = [
            `${reader.first_name} ${reader.last_name}`,
            reader.pesel,
            reader.address,
            reader.city,
            reader.email,
            reader.phone_number
        ].join(' ').toLowerCase();

        return searchFields.includes(searchTerm);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredReaders.slice(indexOfFirstItem, indexOfLastItem);
    const totalFilteredPages = Math.ceil(filteredReaders.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(readers.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(readers.length / itemsPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const handleEditClick = (reader) => {
        const editReaderData = {
            ...reader,
            postalCodeAndCity: `${reader.postal_code} ${reader.city}`
        };
        setEditingReader(editReaderData);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingReader(null);
    };

    const handleDelete = (reader) => {
        setReaderToDelete(reader);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setReaderToDelete(null);
    };

    const handleEditSubmit = async (updatedReaderData) => {
        // Rozdziel aktualizowane dane na `postalCode` i `city`
        const [postal_code, city] = updatedReaderData.postalCodeAndCity.split(' ');
        const submitData = {
            ...updatedReaderData,
            postal_code: postal_code,
            city: city
        };
        try {
            await axios.put(`${ConnectionUrl.connectionUrlString}api/readers/${editingReader.id}`, submitData);
            // Zaktualizuj stan lokalny po pomyślnej aktualizacji
            setReaders(readers.map(reader => {
                if (reader.id === editingReader.id) {
                    return { ...reader, ...submitData, postal_code, city };
                }
                return reader;
            }));
            setIsEditModalOpen(false);
            successNotify('Dane czytelnika zaktualizowane');
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : 'Błąd podczas aktualizacji danych czytelnika';

            errorNotify(errorMessage);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`${ConnectionUrl.connectionUrlString}api/readers/${readerToDelete.id}`);
            const updatedReaders = readers.filter(reader => reader.id !== readerToDelete.id);
            setReaders(updatedReaders);
            setIsDeleteModalOpen(false);
            successNotify('Czytelnik usunięty');
        } catch (error) {
            // Sprawdzenie, czy odpowiedź od serwera zawiera konkretny komunikat błędu
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : 'Błąd podczas usuwania czytelnika';
            errorNotify(errorMessage);
        }
    };

    const fetchReaders = async () => {
        try {
            const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/readers`);
            setReaders(response.data);
        } catch (error) {
            console.error('Error fetching readers: ', error);
            errorNotify('Wystąpił błąd podczas pobierania listy czytelników');
        }
    };

    // Dostosowanie ścieżek breadcrumb w zależności od roli
    const breadcrumbLinks = isAdmin ? [
        { label: 'Home', path: '/admin' },
        { label: 'Lista czytelników', path: '/admin/readers-list' },
    ] : isStaff ? [
        { label: 'Home', path: '/staff' },
        { label: 'Lista czytelników', path: '/staff/readers-list' },
    ] : [
        { label: 'Home', path: '/' },
        { label: 'Lista czytelników', path: '/' }, // Domyślna ścieżka dla innych użytkowników
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            setIsAdmin(decoded.sub.role_id === 1);
            setIsStaff(decoded.sub.role_id === 2);
        }
        fetchReaders();
    }, []);

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Lista czytelników</h1>
            <Breadcrumb links={breadcrumbLinks} />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 px-4 border border-gray-300">
                    <SearchBar onSearch={handleSearch} placeholder={'Wyszukaj czytelnika'} />
                    {isStaff && !isAdmin && (
                        <button
                            onClick={() => navigate('/staff/add-reader')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mt-4 rounded"
                        >
                            Dodaj czytelnika
                        </button>
                    )}
                </div>
                <ReaderTable
                    readers={currentItems}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalFilteredPages}
                    onPageChange={handlePageChange}
                />
                {isEditModalOpen && (
                    <EditReaderModal
                        isOpen={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        readerData={editingReader}
                        handleFormSubmit={handleEditSubmit}
                    />
                )}
                {isDeleteModalOpen && (
                    <DeleteReaderModal
                        isOpen={isDeleteModalOpen}
                        onClose={closeDeleteModal}
                        readerToDelete={readerToDelete}
                        onConfirmDelete={handleDeleteConfirm}
                    />
                )}
            </div>
        </div>
    );
}

export default ReaderListContainer;
