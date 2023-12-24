import { useState, useCallback } from 'react';
import {
    validateFirstName,
    validateLastName,
    validatePesel,
    validatePhoneNumber,
    validateEmail,
    validateHiredDate,
    validateAddress,
    validatePostalCodeAndCity,
    validateTitle,
    validateISBN,
    validatePublicationYear,
    validatePublisher,
    validateAuthor
} from '../../utils/validation';

const useFormValidation = (initialFormData) => {
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState({});

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'first_name':
                return validateFirstName(value) ? '' : 'Imię jest za krótkie lub zawiera niedozwolone znaki.';
            case 'last_name':
                return validateLastName(value) ? '' : 'Nazwisko jest za krótkie lub zawiera niedozwolone znaki.';
            case 'pesel':
                return validatePesel(value) ? '' : 'Numer PESEL powinien składać się z 11 cyfr.';
            case 'phone_number':
                return validatePhoneNumber(value) ? '' : 'Format numeru telefonu jest nieprawidłowy.';
            case 'email':
                return validateEmail(value) ? '' : 'Nieprawidłowy adres e-mail.';
            case 'hired_date':
                return validateHiredDate(value) ? '' : 'Nieprawidłowa data zatrudnienia.';
            case 'address':
                return validateAddress(value) ? '' : 'Nieprawidłowy adres.';
            case 'postalCodeAndCity':
                return validatePostalCodeAndCity(value) ? '' : 'Nieprawidłowy format kodu pocztowego i miasta.';
            case 'title':
                return validateTitle(value) ? '' : 'Nieprawidłowy tytuł.';
            case 'isbn':
                return validateISBN(value) ? '' : 'Nieprawidłowy numer ISBN.';
            case 'publication_year':
                return validatePublicationYear(value) ? '' : 'Nieprawidłowy rok wydania. Musi być rokiem w przeszłości.';
            case 'publisher':
                return validatePublisher(value) ? '' : 'Nazwa wydawnictwa nie może być pusta.';
            case 'author':
                return validateAuthor(value) ? '' : 'Nazwa autora jest nieprawidłowa.';
            default:
                return '';
        }
    };

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: validateField(name, value) });
    }, [formData, formErrors]);

    return { formData, formErrors, handleInputChange, setFormData, setFormErrors };
};

export default useFormValidation;