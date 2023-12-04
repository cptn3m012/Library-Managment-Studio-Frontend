// Walidacja imienia pracownika (dopuszcza tylko litery i spacje, minimalna długość 2 znaki)
export const validateFirstName = (firstName) => {
    const regex = /^[A-Za-z]{2,}(\s[A-Za-z]{2,})*$/;
    return regex.test(firstName);
};

// Walidacja nazwiska pracownika (podobnie jak imię)
export const validateLastName = (lastName) => {
    const regex = /^[A-Za-z]{2,}(\s[A-Za-z]{2,})*$/;
    return regex.test(lastName);
};

// Walidacja numeru PESEL (dokładnie 11 cyfr)
export const validatePesel = (pesel) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(pesel);
};

// Walidacja numeru telefonu (format ###-###-###)
export const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(\d{3}\s){2}\d{3}$/; 
    return regex.test(phoneNumber);
};

// Walidacja adresu e-mail
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Walidacja hasła
export const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
        errors.push('Musisz mieć co najmniej 6 znaków');
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        errors.push('Musisz zawierać wielkie i małe litery');
    }

    if (!/[#$&]/.test(password)) {
        errors.push('Musisz zawierać jeden z symboli (#$&)');
    }
    
    return errors;
};