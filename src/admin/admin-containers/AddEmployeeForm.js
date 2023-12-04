import React, { useState, useCallback, useMemo } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import {
    validateFirstName,
    validateLastName,
    validatePesel,
    validatePhoneNumber,
    validateEmail,
    validatePassword
} from '../../utils/validation';

function AddEmployeeForm() {
    const today = new Date().toISOString().split('T')[0];

    const [formErrors, setFormErrors] = useState({});
    const [passwordShown, setPasswordShown] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [passwordPopoverVisible, setPasswordPopoverVisible] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const fieldValidators = useMemo(() => ({
        firstName: validateFirstName,
        lastName: validateLastName,
        pesel: validatePesel,
        phoneNumber: validatePhoneNumber,
        email: validateEmail
    }), []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        pesel: '',
        phoneNumber: '',
        email: ''
    });

    const handlePasswordInputFocus = useCallback(() => {
        setPasswordPopoverVisible(passwordErrors.length > 0);
    }, [passwordErrors]);

    const handlePasswordInputBlur = useCallback(() => {
        setPasswordPopoverVisible(false);
    }, []);

    const togglePasswordVisibility = useCallback(() => {
        setPasswordShown((prev) => !prev);
        const timer = setTimeout(() => setPasswordShown(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'phoneNumber') {
            newValue = formatPhoneNumber(value);
        }

        setFormData({ ...formData, [name]: newValue });

        if (formSubmitted) {
            const message = fieldValidators[name](newValue) ? '' : fieldValidationMessage(name);
            setFormErrors({ ...formErrors, [name]: message });
        }
    }, [formData, formSubmitted, fieldValidators, formErrors]);

    const handlePasswordChange = useCallback((e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordErrors(validatePassword(newPassword));
    }, []);

    const handleConfirmPasswordChange = useCallback((e) => {
        setConfirmPassword(e.target.value);
    }, []);

    const fieldValidationMessage = (fieldName) => {
        switch (fieldName) {
            case 'firstName': return 'Imię jest za krótkie lub zawiera niedozwolone znaki.';
            case 'lastName': return 'Nazwisko jest za krótkie lub zawiera niedozwolone znaki.';
            case 'pesel': return 'Numer PESEL powinien składać się z 11 cyfr.';
            case 'phoneNumber': return 'Format numeru telefonu jest nieprawidłowy.';
            case 'email': return 'Nieprawidłowy adres e-mail.';
            default: return '';
        }
    };

    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D+/g, '').substring(0, 9);
        const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
        return `${match[1]}${match[2] ? ' ' + match[2] : ''}${match[3] ? ' ' + match[3] : ''}`.trim();
    };

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setFormSubmitted(true);

        const errors = {};
        Object.keys(formData).forEach(fieldName => {
            const fieldValue = formData[fieldName];
            const message = fieldValidators[fieldName](fieldValue) ? '' : fieldValidationMessage(fieldName);
            errors[fieldName] = message;
        });

        // Sprawdzanie, czy hasła są identyczne
        if (password !== confirmPassword) {
            errors['confirmPassword'] = 'Hasła nie są identyczne';
        }

        const newPasswordErrors = validatePassword(password);
        setPasswordErrors(newPasswordErrors);
        setPasswordErrors(validatePassword(password));
        setFormErrors(errors);

        if (Object.values(errors).some(error => error)) {
            return;
        }
    }, [formData, password, confirmPassword, fieldValidators]);

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Dodaj pracownika</h1>
            <div className='mb-4'>
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center">
                            <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <a href="/employee-list" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Pracownicy</a>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">
                                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Dodaj pracownika</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <hr className="border-t border-gray-300" />
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                <p className="font-medium">Tu będzie jakaś intrukcja.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque, justo ac mollis consequat, mi mauris ullamcorper diam, laoreet imperdiet dui velit non odio. Phasellus volutpat euismod elementum. Morbi sit amet rutrum mi, non consectetur ante. Integer vulputate quam nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hendrerit lobortis sem, at condimentum neque elementum eget. Sed commodo ante et elit consectetur lacinia.
                </p>
            </div>
            <fieldset className="border border-gray-300 p-3 mb-6">
                <legend className="text-lg font-semibold text-gray-900 dark:text-white px-2">Dane pracownika:</legend>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imię pracownika:</label>
                        <input
                            type="text"
                            name="firstName"
                            id="first_name"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formErrors.firstName ? 'border-red-500' : ''}`}
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="np. Jan"
                            required
                        />
                        {formErrors.firstName && <p className="text-red-600">{formErrors.firstName}</p>}
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nazwisko pracownika:</label>
                        <input
                            type="text"
                            name="lastName"
                            id="last_name"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formErrors.lastName ? 'border-red-500' : ''}`}
                            placeholder="np. Kowalski"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.lastName && <p className="text-red-600">{formErrors.lastName}</p>}
                    </div>
                    <div>
                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numer Pesel:</label>
                        <input
                            type="text"
                            name="pesel"
                            id="pesel"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formErrors.pesel ? 'border-red-500' : ''}`}
                            placeholder="np. 99999999999"
                            value={formData.pesel}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.pesel && <p className="text-red-600">{formErrors.pesel}</p>}
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-900 dark:text-white">Numer telefonu:</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                +48
                            </span>
                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phone"
                                className={`bg-gray-50 border text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="np. 533 833 446"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {formErrors.phoneNumber && <p className="text-red-600 text-sm mt-2">{formErrors.phoneNumber}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adres e-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formErrors.email ? 'border-red-500' : ''}`}
                            placeholder="name@flowbite.com"
                            required
                        />
                        {formErrors.email && <p className="text-red-600 text-sm mt-2">{formErrors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="employment_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data zatrudnienia:</label>
                        <input
                            type="date"
                            id="employment_date"
                            defaultValue={today}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            min={today}
                            required
                        />
                    </div>
                </div>
            </fieldset>
            <fieldset className="border border-gray-300 p-3 mb-6">
                <legend className="text-lg font-semibold text-gray-900 dark:text-white px-2">Dane logowania pracownika:</legend>
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
            </fieldset>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    );
}

export default AddEmployeeForm;
