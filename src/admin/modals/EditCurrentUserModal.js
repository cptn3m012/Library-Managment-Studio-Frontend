import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { HiEye, HiEyeOff, HiX } from 'react-icons/hi';
import ConnectionUrl from '../../utils/ConnectionUrl';
import { successNotify, errorNotify } from '../../utils/Notifications';
import { validatePassword } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { validateUsernameAdmin, validateUsernameEmployee } from '../../utils/validation';
import { jwtDecode as jwt_decode } from 'jwt-decode';

function EditCurrentUserModal({ isOpen, onClose, currentUsername, updateUsername }) {
    const [formData, setFormData] = useState({ username: '', oldPassword: '', newPassword: '', confirmPassword: '' });
    const [passwordShown, setPasswordShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [usernameErrors, setUsernameErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const navigate = useNavigate();

    const overlayStyle = `absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`;

    const logout = () => {
        localStorage.removeItem('token');
        successNotify('Poprawnie wylogowano.a');
        navigate('/login');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${ConnectionUrl.connectionUrlString}api/user-details`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFormData(prevFormData => ({ ...prevFormData, username: response.data.username }));
            } catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
            }
        };

        if (isOpen) {
            setFormData(prevFormData => ({ ...prevFormData, username: currentUsername })); fetchUserData();
        }
    }, [isOpen, currentUsername]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Pobranie roli z tokenu
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const role_id = decoded.sub ? decoded.sub.role_id : null;

        if (name === 'username') {
            if (role_id === 1) {
                setUsernameErrors(validateUsernameAdmin(value));
            } else if (role_id === 2) {
                setUsernameErrors(validateUsernameEmployee(value));
            } else {
                setUsernameErrors([]); 
            }
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = useCallback(() => {
        setPasswordShown((prev) => !prev);
        const timer = setTimeout(() => setPasswordShown(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        const newErrors = validatePassword(newPassword);
        setPasswordErrors(newErrors);
        setFormData({ ...formData, newPassword });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

         // Sprawdzenie, czy występują błędy walidacji
        if (usernameErrors.length > 0 || passwordErrors.length > 0) {
            errorNotify('Formularz zawiera błędy. Popraw je przed zapisaniem.');
            setIsLoading(false);
            return;
        }

        // Walidacja danych formularza (uproszczona)
        if (!formData.username) {
            errorNotify('Należy potwierdzić nowe hasło');
            setIsLoading(false);
            return;
        }

        // Walidacja hasła i jego potwierdzenia, jeśli zmiana hasła jest wymagana
        if (formData.oldPassword || formData.newPassword || formData.confirmPassword) {
            if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
                errorNotify('Wszystkie pola hasła muszą być wypełnione');
                setIsLoading(false);
                return;
            }

            if (formData.newPassword !== formData.confirmPassword) {
                errorNotify('Hasła nie pasują do siebie');
                setIsLoading(false);
                return;
            }
        }
        const token = localStorage.getItem('token');

        // Logika aktualizacji danych użytkownika
        try {
            let updatedUserDetails = {};
            let passwordChanged = false;

            // Sprawdzenie, czy nazwa użytkownika została zmieniona
            if (formData.username !== currentUsername) {
                const response = await axios.put(
                    `${ConnectionUrl.connectionUrlString}api/update-username`,
                    { newUsername: formData.username },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                updatedUserDetails.username = formData.username;
                // Zaktualizowanie tokena w localStorage
                const newToken = response.data.newToken;
                if (newToken) {
                    localStorage.setItem('token', newToken);
                }
            }

            // Sprawdź, czy hasło zostało zmienione
            if (formData.oldPassword && formData.newPassword) {
                await axios.post(
                    `${ConnectionUrl.connectionUrlString}api/change-password`,
                    {
                        oldPassword: formData.oldPassword,
                        newPassword: formData.newPassword
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                passwordChanged = true;
            }

            if (passwordChanged) {
                successNotify('Hasło zostało zmienione.');
                logout();
            } else {
                successNotify('Dane użytkownika zaktualizowane.');
                updateUsername(updatedUserDetails);
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data) {
                errorNotify(error.response.data.message);
            } else {
                errorNotify("Wystąpił błąd podczas przetwarzania żądania.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div
            id="editCurrentUserModal"
            tabIndex="-1"
            aria-hidden="true"
            className={`fixed inset-0 z-50 flex justify-center pt-10 items-start ${isOpen ? "" : "hidden"} overflow-x-hidden overflow-y-auto`}
        >
            <div className={overlayStyle} aria-hidden="true" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl max-h-full">
                <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edycja danych użytkownika
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <HiX />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space y-6">
                        <div className="form-group mb-4">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nazwa użytkownika</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                            {usernameErrors.map((error, index) => (
                                <div key={index} style={{ color: "red" }}>
                                    {error}
                                </div>
                            ))}
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stare hasło</label>
                            <input
                                type={passwordShown ? "text" : "password"}
                                id="oldPassword"
                                name="oldPassword"
                                value={formData.oldPassword}
                                placeholder="••••••••"
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nowe hasło</label>
                            <input
                                type={passwordShown ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                placeholder="••••••••"
                                onChange={handlePasswordChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                            <div>
                                {passwordErrors.map((error, index) => (
                                    <div key={index} style={{ color: "red" }}>
                                        {error}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6 relative">
                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Potwierdź hasło:</label>
                            <div className="mt-1 relative rounded-md">
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    id="confirm_password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center px-2 bg-gray-300 dark:bg-gray-900 "
                                    >
                                        {passwordShown ? (
                                            <HiEyeOff className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <HiEye className="h-5 w-5" aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
                        </button>
                        <button
                            onClick={onClose}
                            className="text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-black dark:focus:ring-gray-700 dark:text-gray-300"
                        >
                            Zamknij
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCurrentUserModal;

