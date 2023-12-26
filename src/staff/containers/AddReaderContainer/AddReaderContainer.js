import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import ReaderForm from './ReaderForm';
import Breadcrumb from '../../../components/Breadcrumb';
import ConnectionUrl from '../../../utils/ConnectionUrl';
import useFormValidation from '../../../admin/hooks/useFormValidation';
import useFormatters from '../../../admin/hooks/useFormatters';
import { successNotify, errorNotify } from '../../../utils/Notifications';

function AddReaderContainer() {
    const { formatPhoneNumber } = useFormatters();

    const initialFormData = useMemo(() => ({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        postalCodeAndCity: '',
        pesel: ''
    }), []);

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

        if (Object.values(formErrors).some(error => error)) {
            setFormErrors(formErrors);
            return;
        }

        // Przygotowanie danych do wysłania
        const readerData = { ...formData };

        // Asynchroniczne wysyłanie danych
        axios.post(`${ConnectionUrl.connectionUrlString}add-reader`, readerData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            successNotify('Czytelnik dodany pomyślnie');
            setFormData(initialFormData);
        }).catch(error => {
            const errorMessage = error.response?.data?.error || 'Wystąpił błąd podczas dodawania czytelnika';
            errorNotify(errorMessage);
        });
    }, [formData, formErrors, setFormErrors, initialFormData, setFormData]);

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
            <h1 className="text-2xl font-normal text-gray-900 mb-2 dark:text-white">Dodaj czytelnika</h1>
            <Breadcrumb
                links={[
                    { label: 'Home', path: '/staff' },
                    { label: 'Lista czytelników', path: '/staff/readers-list' },
                    { label: 'Dodaj czytelnika', path: '/staff/add-reader' }
                ]}
            />
            <hr className="border-t border-gray-300" />
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                <p className="font-medium">Jak dodać czytelnika?</p>
                <p>
                    Podczas tworzenia czytelnika na stronie, wprowadź jego dane osobowe, takie jak imię, nazwisko, PESEL, numer telefonu i adres e-mail, a także adres zamieszkania.
                </p>
            </div>
            <fieldset className="border border-gray-300 p-3 mb-6">
                <legend className="text-lg font-semibold text-gray-900 dark:text-white px-2">Dane czytelnika:</legend>
                <ReaderForm formData={formData} handleInputChange={handleCustomInputChange} formErrors={formErrors} />
            </fieldset>
            <div className="flex justify-end">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Dodaj
                </button>
            </div>
        </form>
    );
}

export default AddReaderContainer;