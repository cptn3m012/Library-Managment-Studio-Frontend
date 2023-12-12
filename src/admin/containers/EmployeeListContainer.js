import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectionUrl from '../../utils/ConnectionUrl';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import SearchBar from '../components/SearchBar/SearchBar';
import Table from '../components/Table/Table';
import Pagination from '../components/Pagination/Paginantion';
import EditUserModal from '../modals/EditEmployeeModal';
import DeleteEmployeeModal from '../modals/DeleteEmployeeModal';

function EmployeeListContainer() {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(employees.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(employees.length / itemsPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const handleEditClick = (employee) => {
        setEditingEmployee(employee); 
        setIsEditModalOpen(true); 
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingEmployee(null);
    };


    const handleDelete = (employee) => {
        setEmployeeToDelete(employee);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
    };

    const handleSearch = (searchTerm) => {
        // Logika wyszukiwania...
    };

    // Funkcje obsługujące edycję i usuwanie pracowników
    const handleEdit = (employee) => {
        // Logika edycji...
    };

    const handleInputChange = (event) => {
        // Logika zmiany danych pracownika
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Logika zapisu zmienionych danych pracownika
    };

    const [passwordData, setPasswordData] = useState({
        passwordShown: false,
        password: '',
        confirmPassword: ''
      });
      const [passwordErrors, setPasswordErrors] = useState([]);


    // const handleDeleteConfirm = async () => {
    //     if (!employeeToDelete) return;

    //     try {
    //         await axios.delete(`${ConnectionUrl.connectionUrlString}api/employees/${employeeToDelete.id}`);
    //         setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
    //         setIsDeleteModalOpen(false);
    //     } catch (error) {
    //         console.error('Error deleting employee: ', error);
    //         // Handle the error here
    //     }
    // };

    // const handleSave = async (updatedEmployee) => {
    //     try {
    //         // Zakładając, że masz endpoint API do aktualizacji danych pracownika
    //         await axios.put(`${ConnectionUrl.connectionUrlString}api/employees/${updatedEmployee.id}`, updatedEmployee);
    //         // Aktualizacja stanu pracowników
    //         setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    //         setIsEditModalOpen(false); // Zamknięcie modalu po zapisaniu
    //     } catch (error) {
    //         console.error('Error updating employee: ', error);
    //         // Możesz tutaj dodać obsługę błędów, np. wyświetlić komunikat o błędzie
    //     }
    // };


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/employees`);
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Lista pracowników</h1>
            <Breadcrumb />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
                <SearchBar onSearch={handleSearch} />
                <Table
                    employees={currentItems}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(employees.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
                {isEditModalOpen && (
                    <EditUserModal
                        isOpen={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        employeeData={editingEmployee}
                        handleInputChange={handleInputChange}
                        handleFormSubmit={handleFormSubmit}
                        passwordData={passwordData}
                        
                        passwordErrors={passwordErrors}
                    confirmPassword={passwordData.confirmPassword}
                    
                    />
                )}
                {isDeleteModalOpen && (
                    <DeleteEmployeeModal
                        isOpen={isDeleteModalOpen}
                        onClose={closeDeleteModal}
                    // Możesz przekazać tutaj więcej propsów, np. funkcję do potwierdzenia usunięcia
                    />
                )}
            </div>
        </div>
    );
}

export default EmployeeListContainer;