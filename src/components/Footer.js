import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConnectionUrl from '../utils/ConnectionUrl';

const Footer = () => {
    const [userDetails, setUserDetails] = useState(null);
    const token = localStorage.getItem('token');;

    useEffect(() => {
        if (token) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/user-details`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserDetails(response.data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };
            fetchUserDetails();
        }
    }, [token]);

    return (
        <footer className="p-4 bg-white text-secondary border-t border-gray-200 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center flex-col md:flex-row">
                    <div className="md:ml-40 text-center md:text-left mb-4 md:mb-0 text-gray-500 dark:text-white">
                        &copy; {new Date().getFullYear()} by
                        {userDetails && userDetails.role === 'Admin' ? (
                            <a href="/admin" className="text-black hover:text-gray-600 dark:text-white underline"> Library Management Service</a>
                        ) : (
                            <a href="/staff" className="text-black hover:text-gray-600 dark:text-white underline"> Library Management Service</a>
                        )}
                    </div>
                    {userDetails && (
                        <div className="md:mr-72 flex flex-col md:flex-row md:items-center md:justify-start gap-4 w-full md:w-auto">
                            <div className="hidden md:block border-r border-gray-300 h-12"></div>
                            <div>
                                {userDetails.role === 'Admin' ? (
                                    <>
                                        <p className="my-0 text-gray-500 dark:text-white">
                                            Zalogowano na konto: <span className="text-black dark:text-white">{userDetails.username}</span>
                                        </p>
                                        <p className="my-0  text-gray-500 dark:text-white">
                                            Przydział praw: <span className="text-black dark:text-white">{userDetails.role}</span>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="my-0 text-gray-500 dark:text-white">
                                            Zalogowano na konto: <span className="text-black dark:text-white">{userDetails.first_name} {userDetails.last_name}</span>
                                        </p>
                                        <p className="my-0 text-gray-500 dark:text-white">
                                            Przydział praw: <span className="text-black dark:text-white">{userDetails.role}</span>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
