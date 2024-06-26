import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConnectionUrl from '../../utils/ConnectionUrl';
import Breadcrumb from '../../components/Breadcrumb';
import SearchBar from '../../components/SearchBar';
import Table from '../components/Table/Table';
import Pagination from '../../components/Paginantion';
import EditUserModal from '../modals/EditEmployeeModal';
import DeleteEmployeeModal from '../modals/DeleteEmployeeModal';
import { successNotify, errorNotify } from "../../utils/Notifications";

function EmployeeListContainer() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const filteredEmployees = employees.filter(employee => {
        const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
        const pesel = employee.pesel ? employee.pesel.toString().toLowerCase() : '';
        const email = employee.email ? employee.email.toLowerCase() : '';
        const phone = employee.phone_number ? employee.phone_number.toString().toLowerCase() : '';
    
        return fullName.includes(searchTerm) || pesel.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
    const totalFilteredPages = Math.ceil(filteredEmployees.length / itemsPerPage);

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
        setSearchTerm(searchTerm.toLowerCase());
    };

    const handleButtonClick = () => {
        navigate('/admin/add-employee');
    };

    const handleFormSubmit = async (updatedEmployeeData) => {
        try {
            const response = await axios.put(`${ConnectionUrl.connectionUrlString}api/employees/${editingEmployee.id}`, updatedEmployeeData);
            const updatedEmployees = employees.map(emp => emp.id === editingEmployee.id ? { ...emp, ...updatedEmployeeData } : emp);
            setEmployees(updatedEmployees);
            setIsEditModalOpen(false);
            console.log(response);
            successNotify('Pomyślnie edytowano dane użytkownika');
        } catch (error) {
            // Sprawdzenie, czy błąd pochodzi z odpowiedzi serwera
            if (error.response && error.response.data && error.response.data.error) {
                errorNotify(error.response.data.error);
            } else {
                errorNotify('Wystąpił błąd podczas aktualizacji danych pracownika');
            }
        }
    };

    const handleDeleteConfirm = async (employee) => {
        try {
            await axios.delete(`${ConnectionUrl.connectionUrlString}api/employees/${employee.id}`);
            const updatedEmployees = employees.filter(emp => emp.id !== employee.id);
            setEmployees(updatedEmployees);

            // Check if the current page has any items left after deletion
            const updatedFilteredEmployees = updatedEmployees.filter(emp => {
                const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
                return fullName.includes(searchTerm);
            });

            if (updatedFilteredEmployees.length <= (currentPage - 1) * itemsPerPage && currentPage > 1) {
                setCurrentPage(currentPage - 1); // Navigate to the previous page
            }

            setIsDeleteModalOpen(false);
            successNotify('Pomyślnie usunięto pracownika');
        } catch (error) {
            console.error('Error deleting employee: ', error);
        }
    };

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
            <Breadcrumb
                links={[
                    { label: 'Home', path: '/admin' },
                    { label: 'Lista pracowników', path: '/admin/employee-list' }
                ]}
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 px-4 border border-gray-300">
                    <SearchBar onSearch={handleSearch} placeholder={'Wyszukaj pracownika'}/>
                    <button
                        onClick={handleButtonClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mt-4 rounded"
                    >
                        Dodaj pracownika
                    </button>
                </div>
                <Table
                    employees={currentItems}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalFilteredPages}
                    onPageChange={handlePageChange}
                />
                {isEditModalOpen && (
                    <EditUserModal
                        isOpen={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        employeeData={editingEmployee}
                        handleFormSubmit={handleFormSubmit}
                    />
                )}
                {isDeleteModalOpen && (
                    <DeleteEmployeeModal
                        isOpen={isDeleteModalOpen}
                        onClose={closeDeleteModal}
                        employeeToDelete={employeeToDelete}
                        onConfirmDelete={handleDeleteConfirm}
                    />
                )}
            </div>
        </div>
    );
}

export default EmployeeListContainer;