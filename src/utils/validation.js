// Walidacja imienia pracownika
export const validateFirstName = (first_name) => {
    const regex = /^[A-Za-ząćęłńóśźż]{2,}(\s[A-Za-ząćęłńóśźż]{2,})*$/;
    return regex.test(first_name);
};

// Walidacja nazwiska pracownika 
export const validateLastName = (last_name) => {
    const regex = /^[A-Za-ząćęłńóśźż]{2,}(\s[A-Za-ząćęłńóśźż]{2,})*$/;
    return regex.test(last_name);
};

// Walidacja numeru PESEL (dokładnie 11 cyfr)
export const validatePesel = (pesel) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(pesel);
};

// Walidacja numeru telefonu (format ###-###-###)
export const validatePhoneNumber = (phone_number) => {
    const regex = /^(\d{3}\s){2}\d{3}$/; 
    return regex.test(phone_number);
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

    if (!/[#$&.!]/.test(password)) {
        errors.push('Musisz zawierać jeden z symboli (#$&.!)');
    }
    
    return errors;
};

// Walidacja daty zatrudnienia (format YYYY-MM-DD)
export const validateHiredDate = (hiredDate) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(hiredDate);
};

// Walidacja loginu admina
export const validateUsernameAdmin = (username) => {
    const errors = [];
    if (username.length < 1) errors.push("Nazwa użytkownika jest za krótka.");
    if (username.length > 50) errors.push("Nazwa użytkownika jest za długa.");
    return errors;
};

//Walidacja dla maila 
export const validateUsernameEmployee = (username) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) errors.push("Nieprawidłowy format adresu email.");
    return errors;
};

// Walidacja adresu zamieszkania
export const validateAddress = (address) => {
    const regex = /^[A-Za-z0-9ąćęłńóśźż\s,.-/\\]+$/;
    return regex.test(address);
};

// Walidacja połączonego kodu pocztowego i miasta
export const validatePostalCodeAndCity = (postalCodeAndCity) => {
    const regex = /^\d{2}-\d{3}\s[A-Za-ząćęłńóśźż\s]+$/;
    return regex.test(postalCodeAndCity);
};

//Walidacja tytułu książki
export const validateTitle = (title) => {
    return title.length > 2; 
};

//Walidacja numeru ISBN książki
export const validateISBN = (isbn) => {
    const regex = /^[0-9-]{10,13}$/; 
    return regex.test(isbn);
};

// Walidacja roku wydania (musi być rokiem w przeszłości)
export const validatePublicationYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year > 0 && year <= currentYear;
};

// Walidacja wydawnictwa (prosta walidacja długości nazwy)
export const validatePublisher = (publisher) => {
    return publisher.length > 2;
};

// Walidacja autora (prosta walidacja długości nazwy)
export const validateAuthor = (author) => {
    return author.length > 2 ? '' : 'Nazwa autora jest nieprawidłowa.';
};

// Funkcja do walidacji nazwy kategorii
export const validateCategoryName = (name) => {
    // Przykładowe kryteria: nazwa musi mieć co najmniej 3 znaki i nie może zawierać cyfr
    const regex = /^[A-Za-ząćęłńóśźż\s]{3,}$/;
    return regex.test(name);
};
