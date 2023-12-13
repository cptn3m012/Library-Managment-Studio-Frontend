//ten popover poprawić albo wyjebać
import React, { useState, useCallback, useMemo } from 'react';
import EmployeeForm from './EmployeeForm';
import LoginDataForm from './LoginDataForm';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import {
    validateFirstName,
    validateLastName,
    validatePesel,
    validatePhoneNumber,
    validateEmail,
    validatePassword,
    validateHiredDate
} from '../../../utils/validation';
import ConnectionUrl from '../../../utils/ConnectionUrl';

function AddEmployeeContainer() {
    const today = new Date().toISOString().split('T')[0];

    const [formErrors, setFormErrors] = useState({});
    const [passwordShown, setPasswordShown] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [passwordPopoverVisible, setPasswordPopoverVisible] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const fieldValidators = useMemo(() => ({
        first_name: validateFirstName,
        last_name: validateLastName,
        pesel: validatePesel,
        phone_number: validatePhoneNumber,
        email: validateEmail,
        hired_date: validateHiredDate
    }), []);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        pesel: '',
        phone_number: '',
        email: '',
        hired_date: today
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

        if (name === 'phone_number') {
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
            case 'phone_number': return 'Format numeru telefonu jest nieprawidłowy.';
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

        // Definiowanie asynchronicznej funkcji
        const submitForm = async () => {
            const employeeData = {
                ...formData,
                password,
                hired_date: formData.hired_date || today
            };

            console.log("Wysyłanie danych pracownika:", employeeData);

            try {
                const response = await axios.post(`${ConnectionUrl.connectionUrlString}add-employee`, employeeData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } catch (error) {
                //console.error('Błąd podczas dodawania pracownika:', error);
                console.error('Błąd podczas dodawania pracownika:', error.response ? error.response.data : error);
            }
        };

        // Wywołanie funkcji
        submitForm();
    }, [formData, password, confirmPassword, fieldValidators]);

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Dodaj pracownika</h1>
            <Breadcrumb
                links={[
                    { label: 'Home', path: '/' },
                    { label: 'Pracownicy', path: '/admin/employee-list' },
                    { label: 'Dodaj pracownika', path: '/admin/add-employee' }
                ]}
            />
            <hr className="border-t border-gray-300" />
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                <p className="font-medium">Jak dodać pracownika?</p>
                <p>
                    Podczas tworzenia pracownika na stronie, wprowadź jego dane osobowe, takie jak imię, nazwisko, PESEL, numer telefonu i adres e-mail, a także datę zatrudnienia. Następnie, stwórz bezpieczne hasło, które pracownik będzie używać do logowania, przy użyciu swojego adresu e-mail jako loginu.
                </p>
            </div>
            <EmployeeForm formData={formData} handleInputChange={handleInputChange} formErrors={formErrors} />
            <LoginDataForm
                passwordShown={passwordShown}
                password={password}
                confirmPassword={confirmPassword}
                handlePasswordChange={handlePasswordChange}
                handleConfirmPasswordChange={handleConfirmPasswordChange}
                togglePasswordVisibility={togglePasswordVisibility}
                passwordErrors={passwordErrors}
                formErrors={formErrors}
                validatePassword={validatePassword}
                handlePasswordInputFocus={handlePasswordInputFocus}
                handlePasswordInputBlur={handlePasswordInputBlur}
                passwordPopoverVisible={passwordPopoverVisible}
            />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    );
}

export default AddEmployeeContainer;
