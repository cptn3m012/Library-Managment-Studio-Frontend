import React from 'react';

function ReaderForm({ formData, handleInputChange, formErrors }) {
    return (
        <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* Imię czytelnika */}
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imię:</label>
                <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${formErrors.first_name ? 'border-red-500' : ''}`}
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="np. Jan"
                    required
                />
                {formErrors.first_name && <p className="text-red-600">{formErrors.first_name}</p>}
            </div>

            {/* Nazwisko czytelnika */}
            <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nazwisko:</label>
                <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${formErrors.last_name ? 'border-red-500' : ''}`}
                    placeholder="np. Kowalski"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.last_name && <p className="text-red-600">{formErrors.last_name}</p>}
            </div>

            {/* Adres email czytelnika */}
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adres e-mail:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formErrors.email ? 'border-red-500' : ''}`}
                    placeholder="name@example.com"
                    required
                />
                {formErrors.email && <p className="text-red-600 text-sm mt-2">{formErrors.email}</p>}
            </div>

            {/* Numer telefonu czytelnika */}
            <div className="mb-6">
                <label htmlFor="phone" className="text-sm font-medium text-gray-900 dark:text-white">Numer telefonu:</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        +48
                    </span>
                    <input
                        type="tel"
                        name="phone_number"
                        id="phone"
                        className={`bg-gray-50 border text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${formErrors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="np. 500-600-700"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {formErrors.phone_number && <p className="text-red-600 text-sm mt-2">{formErrors.phone_number}</p>}
            </div>

            {/* Adres zamieszkania czytelnika */}
            <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adres zamieszkania:</label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${formErrors.address ? 'border-red-500' : ''}`}
                    placeholder="np. ul. Kwiatowa 10"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.address && <p className="text-red-600 text-sm mt-2">{formErrors.address}</p>}
            </div>

            {/* Kod pocztowy i miejscowość czytelnika */}
            <div>
                <label htmlFor="postalCodeAndCity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kod pocztowy i miejscowość:</label>
                <input
                    type="text"
                    name="postalCodeAndCity"
                    id="postalCodeAndCity"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${formErrors.city ? 'border-red-500' : ''}`}
                    placeholder="np. 00-001 Warszawa"
                    value={formData.postalCodeAndCity}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.postalCodeAndCity && <p className="text-red-600 text-sm mt-2">{formErrors.postalCodeAndCity}</p>}
            </div>

            {/* Numer PESEL czytelnika */}
            <div>
                <label htmlFor="pesel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numer Pesel:</label>
                <input
                    type="text"
                    name="pesel"
                    id="pesel"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${formErrors.pesel ? 'border-red-500' : ''}`}
                    placeholder="np. 99999999999"
                    value={formData.pesel}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.pesel && <p className="text-red-600">{formErrors.pesel}</p>}
            </div>
        </div>
    );
}

export default ReaderForm;