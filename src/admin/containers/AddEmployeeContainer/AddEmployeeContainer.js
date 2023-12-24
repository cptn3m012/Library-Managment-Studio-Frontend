import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import LoginDataForm from './LoginDataForm';
import Breadcrumb from '../../../components/Breadcrumb';
import ConnectionUrl from '../../../utils/ConnectionUrl';
import { validatePassword } from '../../../utils/validation';
import usePasswordValidation from '../../hooks/usePasswordValidation';
import useFormValidation from '../../hooks/useFormValidation';
import useFormatters from '../../hooks/useFormatters';
import { successNotify, errorNotify } from '../../../utils/Notifications'

function AddEmployeeContainer() {
    const today = new Date().toISOString().split('T')[0];
    const { formatPhoneNumber } = useFormatters();

    const {
        password,
        confirmPassword,
        passwordErrors,
        passwordShown,
        passwordPopoverVisible,
        handlePasswordChange,
        handleConfirmPasswordChange,
        togglePasswordVisibility,
        handlePasswordInputFocus,
        handlePasswordInputBlur,
        arePasswordsMatching
    } = usePasswordValidation();

    const initialFormData = useMemo(() => ({
        first_name: '',
        last_name: '',
        pesel: '',
        phone_number: '',
        email: '',
        hired_date: today
    }), [today]);

    const { formData, formErrors, handleInputChange, setFormData, setFormErrors } = useFormValidation(initialFormData);

    const handleCustomInputChange = useCallback((e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'phone_number') {
            newValue = formatPhoneNumber(value);
        }
        handleInputChange({ ...e, target: { ...e.target, name, value: newValue } });
    }, [handleInputChange, formatPhoneNumber]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const passwordMatchError = !arePasswordsMatching() ? 'Hasła nie są identyczne' : '';
        const updatedErrors = {
            ...formErrors,
            confirmPassword: passwordMatchError
        };

        setFormErrors(updatedErrors);

        // Sprawdź, czy są jakieś błędy w formularzu
        if (Object.values(updatedErrors).some(error => error)) {
            errorNotify('Masz błędy w formularzu i należy je poprawić');
            return;
        }

        // Przygotowanie danych do wysłania
        const employeeData = {
            ...formData,
            password
        };

        // Asynchroniczne wysyłanie danych
        axios.post(`${ConnectionUrl.connectionUrlString}add-employee`, employeeData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            successNotify('Pracownik dodany pomyślnie');
            setFormData(initialFormData);
        }).catch(error => {
            // Obsługa błędu
            errorNotify('Błąd podczad dodawania pracownika');
        });
    }, [formData, password, formErrors, arePasswordsMatching, setFormData, setFormErrors, initialFormData]);

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Dodaj pracownika</h1>
            <Breadcrumb
                links={[
                    { label: 'Home', path: '/admin' },
                    { label: 'Lista pracowników', path: '/admin/employee-list' },
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
            <fieldset className="border border-gray-300 p-3 mb-6">
                <legend className="text-lg font-semibold text-gray-900 dark:text-white px-2">Dane pracownika:</legend>
                <EmployeeForm formData={formData} handleInputChange={handleCustomInputChange} formErrors={formErrors} />
            </fieldset>
            <fieldset className="border border-gray-300 p-3 mb-6">
                <legend className="text-lg font-semibold text-gray-900 dark:text-white px-2">Hasło pracownika:</legend>
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
            </fieldset>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Dodaj pracownika
                </button>
            </div>
        </form>
    );
}

export default AddEmployeeContainer;
