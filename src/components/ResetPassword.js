import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { successNotify, errorNotify } from '../utils/Notifications';
import ConnectionUrl from '../utils/ConnectionUrl';
import background from "../images/background.png";
import Footer from "./FooterForLoginPage";
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { validatePassword } from '../utils/validation';

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [confirmPasswordTimerId, setConfirmPasswordTimerId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    // Sprawdzanie, czy hasło spełnia wymagania
    const checkPasswordValidity = () => {
        const errors = validatePassword(password);
        setPasswordErrors(errors);
        return errors.length === 0;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // Walidacja hasła i ustawienie błędów
        setPasswordErrors(validatePassword(newPassword));
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordShown(true);
        clearTimeout(confirmPasswordTimerId);

        const newTimerId = setTimeout(() => {
            setConfirmPasswordShown(false);
        }, 1000);

        setConfirmPasswordTimerId(newTimerId);
    };

    useEffect(() => {
        return () => {
            clearTimeout(confirmPasswordTimerId);
        };
    }, [confirmPasswordTimerId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            errorNotify('Hasła nie są takie same.');
            return;
        }

        if (!checkPasswordValidity()) {
            errorNotify('Hasło nie spełnia wymagań.');
            return;
        }

        setIsSubmitting(true);
        try {
            const url = `${ConnectionUrl.connectionUrlString}reset/${token}`;
            const response = await axios.post(url, { password });
            if (response.data.message) {
                successNotify(response.data.message);
                navigate('/login');
            } else {
                throw new Error(response.data.error || 'Wystąpił błąd.');
            }
        } catch (error) {
            errorNotify(error.response?.data?.error || 'Wystąpił błąd przy resetowaniu hasła.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-cover"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h1 className="text-xl font-semibold text-gray-800 text-center mb-4">
                            Resetowanie Hasła
                        </h1>
                        <hr className="mb-4" />
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Nowe Hasło:
                            </label>
                            <input
                                type={confirmPasswordShown ? "text" : "password"}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            {/* Wyświetlenie błędów hasła */}
                            {passwordErrors.length > 0 && (
                                <div className="text-red-600 text-sm mt-2">
                                    {passwordErrors.map((error, index) => (
                                        <p key={index}>{error}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mb-8 relative">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                Potwierdź Hasło:
                            </label>
                            <div className="relative">
                                <input
                                    type={confirmPasswordShown ? "text" : "password"}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center px-2 bg-gray-300"
                                >
                                    {confirmPasswordShown ? (
                                        <HiEyeOff className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                    ) : (
                                        <HiEye className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="mb-2 text-center">
                            <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded-full">
                                Zresetuj Hasło
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResetPasswordForm;
