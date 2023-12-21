import React, { useState } from 'react';
import axios from 'axios';
import BackgroundImage from '../images/background.png';
import ConnectionUrl from '../utils/ConnectionUrl';
import Footer from './FooterForLoginPage';
import { successNotify, errorNotify } from '../utils/Notifications';

const ForgotPassword = () => {
    const [loginOrEmail, setLoginOrEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${ConnectionUrl.connectionUrlString}reset-password`, { email: loginOrEmail });
            if (response.status === 200) {
                successNotify('Instrukcje dotyczące resetowania hasła zostały wysłane na email.');
            } 
        } catch (error) {
            let errorMessage = 'Wystąpił błąd przy resetowaniu hasła.';
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            }
            errorNotify(errorMessage);
        }
        setIsSubmitting(false);
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-cover"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                    <h1 className="text-xl font-semibold text-center mb-4">
                        Zapomniałem/am hasła
                    </h1>
                    <hr class="mb-4" />
                    <p class=" my-4 leading-normal text-gray-700">
                        W celu zresetowania i ustawieniu nowego hasła do Twojego konta wpisz swój adres email w
                        poniższym formularzu. Na skojarzony z kontem adres email przyjdzie wiadomość weryfikująca.
                    </p>
                    <hr class="mb-4" />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="loginOrEmail"
                                className="block text-sm font-bold mb-2"
                            >
                                Adres e-mail:
                            </label>
                            <input
                                type="text"
                                id="loginOrEmail"
                                className="w-full px-3 py-2 border rounded shadow"
                                value={loginOrEmail}
                                onChange={(e) => setLoginOrEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                            disabled={isSubmitting}
                        >
                            Resetuj hasło
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
