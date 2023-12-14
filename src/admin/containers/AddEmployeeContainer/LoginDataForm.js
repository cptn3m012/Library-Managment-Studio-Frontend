import React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const LoginDataForm = ({ passwordShown, password, confirmPassword, handlePasswordChange, handleConfirmPasswordChange, togglePasswordVisibility, passwordErrors, formErrors, validatePassword, handlePasswordInputFocus, handlePasswordInputBlur, passwordPopoverVisible }) => {
    return (
        <>
            <div className="relative mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white">Hasło:</label>
                <input
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={handlePasswordInputFocus}
                    onBlur={handlePasswordInputBlur}
                    className="block w-full pr-10 focus:outline-none sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••"
                    required
                />

                {passwordPopoverVisible && (
                    <div data-popover id="popover-password" role="tooltip" className="absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                        <div className="p-3 space-y-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">Wymagania hasła:</h3>
                            <ul>
                                {validatePassword(password).map((error, index) => (
                                    <li key={index} className="flex items-center">
                                        <svg className="w-3.5 h-3.5 me-2 text-red-400 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.293 9.293 8 11l1.707-1.707a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L8 12l-4 4a1 1 0 0 1-1.414-1.414L6.293 9.293 4.586 7.586a1 1 0 0 1 0-1.414L6.293 4.293 8 6l1.707-1.707a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L8 10l-4 4a1 1 0 0 1-1.414-1.414L6.293 7.293 4.586 5.586a1 1 0 0 1 0-1.414z" />
                                        </svg>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div data-popper-arrow></div>
                    </div>
                )}
                {/* Wyświetlenie błędów hasła */}
                {passwordErrors.length > 0 && (
                    <div className="text-red-600 text-sm mt-2">
                        {passwordErrors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>
            <div className="mb-6 relative">
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Potwierdź hasło:</label>
                <div className="mt-1 relative rounded-md">
                    <input
                        type={passwordShown ? "text" : "password"}
                        id="confirm_password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="text-gray-500 focus:outline-none focus:text-gray-700"
                        >
                            {passwordShown ? (
                                <HiEyeOff className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <HiEye className="h-5 w-5" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
                {formErrors.confirmPassword && <p className="text-red-600 text-sm mt-2">{formErrors.confirmPassword}</p>}
            </div>
        </>
    );
};

export default LoginDataForm;