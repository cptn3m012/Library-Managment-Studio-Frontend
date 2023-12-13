import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMenu, HiUser } from "react-icons/hi";
import DarkModeToggle from './DarkModeToggle';
import { successNotify } from '../../utils/Notifications';

function Header({ toggleSidebar }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isButtonFocused, setIsButtonFocused] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);

        if (!isDropdownOpen) {
            setIsButtonFocused(true);
        } else {
            setIsButtonFocused(false);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        successNotify('Poprawnie wylogowano!');
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setIsButtonFocused(false); // Wyłącz focus, gdy kliknięto poza dropdown
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
                        Bonnie Green
                        <svg className="w-2.5 h-2.5 ms-3" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    {/* Dropdown menu */}
                    <div
                        id="dropdownAvatarName"
                        className={`absolute z-10 ${isDropdownOpen ? 'block' : 'hidden'} rounded-lg shadow w-44 top-full left-0 bg-white text-gray-700 dark:text-white dark:bg-gray-700`}
                        style={{ top: '100%', left: '0' }}
                    >
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div className="font-medium">Admin</div>
                            <div className="truncate">mail@gmail.com</div>
                        </div>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAvatarNameButton">
                            <li>
                                <a href="/login" className='block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'>Dashboard</a>
                            </li>
                            <li>
                                <a href="/settings" className='block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'>Ustawienia</a>
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
        </div>
    );
}

export default Header;
