import React, { useState } from 'react';
import '../components/Login.css';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Tutaj możesz wysłać dane do backendu i zalogować użytkownika
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div className="login-container">
            <h2>Zaloguj się do systemu zarządzania biblioteką</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nazwa użytkownika:</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hasło:</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Zaloguj się</button>
            </form>
        </div>
    );
}

export default Login;