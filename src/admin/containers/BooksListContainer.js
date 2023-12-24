import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import ConnectionUrl from '../../utils/ConnectionUrl';
import Breadcrumb from '../../components/Breadcrumb';
import SearchBar from '../../components/SearchBar';
import BookTable from '../components/Table/BookTable';
import Pagination from '../../components/Paginantion';
import EditBookModal from '../modals/EditBookModal';
import DeleteBookModal from '../modals/DeleteBookModal';
import LoanBookModal from '../../staff/modals/LoanBookModal';
import { successNotify, errorNotify } from '../../utils/Notifications';

function BooksListContainer() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
    const [selectedBookForLoan, setSelectedBookForLoan] = useState(null);

    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue.toLowerCase());
    };

    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(searchTerm)
            || book.isbn.toLowerCase().includes(searchTerm)
            || book.publisher.toLowerCase().includes(searchTerm)
            || book.publication_year.toString().toLowerCase().includes(searchTerm)
            || book.authors.some(author => `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchTerm))
            || book.category.toLowerCase().includes(searchTerm)
            || book.status.toLowerCase().includes(searchTerm);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
    const totalFilteredPages = Math.ceil(filteredBooks.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(books.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(books.length / itemsPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const handleDeleteClick = (book) => {
        setBookToDelete(book);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setBookToDelete(null);
    };

    const handleEditClick = (book) => {
        setEditingBook(book);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleLoanClick = (book) => {
        const bookId = book.id.split('-')[0]; // Rozdzielanie ID od indexu
        setSelectedBookForLoan({ ...book, id: bookId });
        setIsLoanModalOpen(true);
    };
    
    const handleCloseLoanModal = () => {
        setIsLoanModalOpen(false);
    };

    const breadcrumbLinks = isAdmin ? [
        { label: 'Home', path: '/admin' },
        { label: 'Lista książek', path: '/admin/books-list' },
    ] : isStaff ? [
        { label: 'Home', path: '/staff' },
        { label: 'Lista książek', path: '/staff/books-list' },
    ] : [
        { label: 'Home', path: '/' },
        { label: 'Lista książek', path: '/' }, // Domyślna ścieżka, jeśli użytkownik nie jest ani adminem ani pracownikiem
    ];


    const handleFormSubmit = async (updatedBookData) => {
        try {
            const bookId = editingBook.id.split('-')[0];
            const response = await axios.put(`${ConnectionUrl.connectionUrlString}api/books/${bookId}`, updatedBookData);

            setBooks(prevBooks => {
                return prevBooks.map(book => {
                    if (book.id === editingBook.id) {
                        // Zakładając, że response.data zawiera zaktualizowane dane książki
                        return { ...book, ...response.data };
                    }
                    return book;
                });
            });

            setIsEditModalOpen(false);
            successNotify('Pomyślnie zaktualizowano dane książki');
        } catch (error) {
            console.error('Error updating book: ', error);

            // Sprawdzenie, czy odpowiedź od serwera zawiera konkretne informacje o błędzie
            if (error.response && error.response.data) {
                // Wyświetlenie szczegółowego komunikatu o błędzie zwróconego przez backend
                errorNotify(error.response.data.error || 'Wystąpił błąd podczas aktualizacji danych książki');
            } else {
                // Wyświetlenie ogólnego komunikatu o błędzie
                errorNotify('Wystąpił błąd podczas aktualizacji danych książki');
            }
        }
    };

    const handleDeleteConfirm = async (book) => {
        try {
            await axios.delete(`${ConnectionUrl.connectionUrlString}/api/books/${book.id.split('-')[0]}`);

            const updatedBooks = books.map(b => {
                if (b.id === book.id) {
                    return { ...b, quantity: b.quantity - 1 };
                }
                return b;
            }).filter(b => b.quantity > 0);

            setBooks(updatedBooks);

            // Sprawdzenie, czy po usunięciu książki na stronie nie ma już żadnych pozycji
            if (updatedBooks.length <= (currentPage - 1) * itemsPerPage) {
                setCurrentPage(Math.max(1, currentPage - 1));
            }

            successNotify('Książka została usunięta');
        } catch (error) {
            console.error('Error deleting book: ', error);
            if (error.response && error.response.data) {
                // Wyświetlenie szczegółowego komunikatu o błędzie zwróconego przez backend
                errorNotify(error.response.data.error || 'Wystąpił błąd podczas usuwania książki');
            } else {
                // Wyświetlenie ogólnego komunikatu o błędzie
                errorNotify('Wystąpił błąd podczas usuwania książki');
            }
        } finally {
            closeDeleteModal();
        }
    };

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/books`);
            const booksWithQuantity = response.data.flatMap(book =>
                Array.from({ length: book.quantity }, (_, index) => ({
                    ...book,
                    id: `${book.id}-${index + 1}`
                }))
            );
            setBooks(booksWithQuantity);
        } catch (error) {
            console.error('Error fetching books: ', error);
            errorNotify('Wystąpił błąd podczas pobierania listy książek');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            setIsAdmin(decoded.sub.role_id === 1);
            setIsStaff(decoded.sub.role_id === 2);
        }
        fetchBooks();

        // Oblicz nową ilość stron po filtracji
        const totalFiltered = filteredBooks.length;
        const totalFilteredPages = Math.ceil(totalFiltered / itemsPerPage);

        // Aktualizuj currentPage tylko, jeśli jest poza zakresem nowej ilości stron
        if (currentPage > totalFilteredPages) {
            setCurrentPage(totalFilteredPages || 1); // Ustaw na 1, jeśli nie ma żadnych stron
        }
    }, [books, searchTerm, currentPage, filteredBooks.length]);

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Lista książek</h1>
            <Breadcrumb links={breadcrumbLinks} />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 px-4 border border-gray-300">
                    <SearchBar onSearch={handleSearch} placeholder={'Wyszukaj książkę'} />
                    {isAdmin && (
                        <button
                            onClick={() => navigate('/admin/add-book')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mt-4 rounded"
                        >
                            Dodaj książkę
                        </button>
                    )}
                    {isStaff && !isAdmin && (
                        <button
                            onClick={() => navigate('/staff/return-book')} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mt-4 rounded"
                        >
                            Lista wypożyczeń
                        </button>
                    )}
                </div>
                <BookTable
                    books={currentItems}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                    onLoan={handleLoanClick}
                    isAdmin={isAdmin}
                    isStaff={isStaff}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalFilteredPages}
                    onPageChange={handlePageChange}
                />
                {isEditModalOpen && isAdmin && (
                    <EditBookModal
                        isOpen={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        bookData={editingBook}
                        handleFormSubmit={handleFormSubmit}
                    />
                )}
                {isDeleteModalOpen && isAdmin && (
                    <DeleteBookModal
                        isOpen={isDeleteModalOpen}
                        onClose={closeDeleteModal}
                        bookToDelete={bookToDelete}
                        onConfirmDelete={handleDeleteConfirm}
                    />
                )}
                {isStaff && !isAdmin && isLoanModalOpen && (
                    <LoanBookModal
                        isOpen={isLoanModalOpen}
                        onClose={handleCloseLoanModal}
                        selectedBook={selectedBookForLoan}
                        fetchBooks={fetchBooks}
                    />
                )}
            </div>
        </div>
    );
}

export default BooksListContainer;
