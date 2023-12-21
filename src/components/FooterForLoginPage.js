import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-300 py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center sm:justify-between">
                    <div className="flex justify-center sm:justify-start items-center">
                        <span className="mr-1">&copy; {year} by</span>
                        <a className="text-gray-800 hover:text-gray-600 underline" href="/">Library Managment Service</a>
                    </div>
                    <div className="flex justify-center sm:justify-end mt-4 sm:mt-0">
                        <ul className="list-none mb-0 flex">
                            <li>
                                <a className="text-gray-800 hover:text-gray-600 underline" href="/login">
                                    Logowanie
                                </a>
                            </li>
                            <li className="ml-4">
                                <a className="text-gray-800 hover:text-gray-600 underline" href="/forgot-password">
                                    Zapomniałem/am hasła
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;