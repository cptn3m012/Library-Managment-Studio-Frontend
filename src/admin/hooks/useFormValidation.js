import { useState, useCallback } from 'react';
import {
    validateFirstName,
    validateLastName,
    validatePesel,
    validatePhoneNumber,
    validateEmail,
    validateHiredDate,
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
            default:
                return '';
        }
    };

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: validateField(name, value) });
    }, [formData, formErrors]);

    return { formData, formErrors, handleInputChange, setFormErrors };
};

export default useFormValidation;