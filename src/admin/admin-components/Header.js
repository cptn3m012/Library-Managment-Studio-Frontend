    import React, { useState, useEffect, useRef } from 'react';
    import { HiOutlineMenu, HiUser, HiMoon, HiSun } from "react-icons/hi";

    function Header({ toggleSidebar }) {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [isButtonFocused, setIsButtonFocused] = useState(false);
        const [isDarkMode, setIsDarkMode] = useState(false);
        const dropdownRef = useRef(null);

        const toggleDropdown = () => {
            setIsDropdownOpen(!isDropdownOpen);

            if (!isDropdownOpen) {
                setIsButtonFocused(true);
            } else {
                setIsButtonFocused(false);
            }
        }

        const toggleDarkMode = () => {
            setIsDarkMode(!isDarkMode);
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
            <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} h-16 px-4 flex justify-between items-center relative`}>
                <div className='flex items-center'>
                    <HiOutlineMenu className="text-3xl cursor-pointer" onClick={toggleSidebar} />
                </div>
                <div className='flex items-center'>
                    <button onClick={toggleDarkMode} className="mr-4">
                        {isDarkMode ? <HiSun className="text-xl" /> : <HiMoon className="text-xl" />}
                    </button>
                    <div ref={dropdownRef} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center relative`}>
                    <button 
                       className={`flex items-center text-sm font-medium rounded-full focus:outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`} 
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
                        className={`absolute z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white rounded-lg shadow w-44`} style={{ top: '100%', left: '0' }}>
                        {/* Reszta Twojego kodu HTML */}
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div className="font-medium ">Pro User</div>
                            <div className="truncate">name@flowbite.com</div>
                        </div>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAvatarNameButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                            </li>
                        </ul>
                        <div className="py-2">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

    export default Header;
