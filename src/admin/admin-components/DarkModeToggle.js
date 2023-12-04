import React, { useState, useEffect } from 'react';
import { HiMoon, HiSun } from "react-icons/hi";

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('color-theme') === 'dark' || 
               (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button onClick={toggleDarkMode} className="mr-4">
            {darkMode ? <HiSun className="text-xl" /> : <HiMoon className="text-xl" />}
        </button>
    );
};

export default DarkModeToggle;
