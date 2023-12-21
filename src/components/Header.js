import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMenu, HiUser } from "react-icons/hi";
import DarkModeToggle from './DarkModeToggle';
import { successNotify } from '../utils/Notifications';
import Axios from 'axios';
import ConnectionUrl from '../utils/ConnectionUrl'
import EditCurrentUserModal from '../admin/modals/EditCurrentUserModal';

function Header({ toggleSidebar }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isButtonFocused, setIsButtonFocused] = useState(false);
    const [isEditCurrentUserModalOpen, setIsEditCurrentUserModalOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({ username: '', role: '' });
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const dashboardPath = userDetails.role === 'Admin' ? '/admin' : '/staff';

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);

        if (!isDropdownOpen) {
            setIsButtonFocused(true);
        } else {
            setIsButtonFocused(false);
        }
    }

    const handleEditCurrentUserClick = () => {
        setIsEditCurrentUserModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditCurrentUserModalOpen(false);
    };

    const updateUserDetails = (newDetails) => {
        setUserDetails(prevDetails => ({ ...prevDetails, ...newDetails }));
    };

    const logout = () => {
        localStorage.removeItem('token');
        successNotify('Poprawnie wylogowano!');
        navigate('/login');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await Axios.get(`${ConnectionUrl.connectionUrlString}api/user-details`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserDetails(response.data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setIsButtonFocused(false); 
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className='h-16 px-4 flex justify-between items-center relative bg-white text-gray-900 border-b-2 border-gray-300 dark:bg-gray-800 dark:text-white'>
            <div className='flex items-center'>
                <HiOutlineMenu className="text-3xl cursor-pointer" onClick={toggleSidebar} />
            </div>
            <div className='flex items-center mr-5'>
                <DarkModeToggle />
                <div ref={dropdownRef} className='flex items-center relative'>
                    <button
                        className='flex items-center text-sm font-medium rounded-full focus:outline-none text-gray-900 dark:text-white'
                        type="button"
                        onClick={toggleDropdown}
                        style={{
                            outline: isButtonFocused ? '2px solid lightgray' : 'none',
                        }}
                    >
                        <span className="sr-only">Open user menu</span>
                        <HiUser className="w-8 h-8 me-2" />
                        {userDetails.role === 'Admin' ? userDetails.username : `${userDetails.first_name} ${userDetails.last_name}`}
                        <svg className="w-2.5 h-2.5 ms-3" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    {/* Dropdown menu */}
                    <div
                        id="dropdownAvatarName"
                        className={`absolute z-10 ${isDropdownOpen ? 'block' : 'hidden'} rounded-lg shadow w-44 top-full right-0 mt-2 min-w-max bg-white text-gray-700 dark:text-white dark:bg-gray-700`} // Adjust this line, set `right-0` and `mt-2` for proper alignment
                    >
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div className="font-medium">{userDetails.role}</div>
                            <div className="truncate"> {userDetails.role === 'Admin' ? 'librarymanagment2023@gmail.com' : userDetails.username}</div>
                        </div>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAvatarNameButton">
                            <li>
                                <a href={dashboardPath} className='block px-4 py-2 text-gray-700  dark:text-gray-200 dark:hover:bg-gray-600'>Dashboard</a>
                            </li>
                            <li>
                                <button onClick={handleEditCurrentUserClick} className='block px-4 py-2 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'>Edytuj dane</button>
                            </li>
                        </ul>
                        <div className="py-2">
                            <button
                                onClick={logout}
                                className='w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'
                            >
                                Wyloguj się
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isEditCurrentUserModalOpen && (
                <EditCurrentUserModal
                    isOpen={isEditCurrentUserModalOpen}
                    onClose={handleCloseEditModal}
                    currentUsername={userDetails.username}
                    updateUsername={updateUserDetails}
                />
            )}
        </div>
    );
}

export default Header;
