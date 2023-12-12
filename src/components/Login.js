import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from 'jwt-decode';
import Axios from "axios";
import background from "../images/background.png"; 
import ConnectionUrl from "../utils/ConnectionUrl";
import { successNotify, errorNotify } from "../utils/Notifications";

const Login = () => {
  const [loginOrEmail, setLoginOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginOrEmailChange = (e) => {
    setLoginOrEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${ConnectionUrl.connectionUrlString}users/login`, {  
        username: loginOrEmail,
        password: password,
      });
  
      if (response.status === 200) {
        console.log("Zalogowano pomyślnie");
        localStorage.setItem('token', response.data.access_token);
        const decoded = jwt_decode(response.data.access_token);
        successNotify('Pomyślnie zalogowano');
        const isAdmin = decoded.sub.role_id === 1; // Zmienione z 'admin' na 1
        if (isAdmin) {
            navigate("/admin"); // Przekierowanie na dashboard admina
        } else {
            // Przekierowanie na dashboard pracownika lub inne miejsce
            navigate("/staff"); // Zakładając, że masz ścieżkę '/staff' dla pracowników
        }
      }
    } catch (error) {
      console.error("Błąd logowania:", error.response?.data?.message || "Wystąpił błąd");
      // Możesz tutaj ustawić stan błędu, aby wyświetlić wiadomość na interfejsie użytkownika
    }
  };

  return (
    <div
      className="min-h-screen bg-cover flex items-center justify-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Logowanie do systemu
          </h1>
          <hr className="mb-4" />
          <div className="mb-4">
            <label
              htmlFor="loginOrEmail"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Login/adres email:
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="loginOrEmail"
              value={loginOrEmail}
              onChange={handleLoginOrEmailChange}
              name="loginOrEmail"
            />
            {/* Tutaj możesz dodać wyświetlanie błędu */}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Hasło:
            </label>
            <div className="relative">
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                name="password"
              />
              <button type="button" className="absolute right-0 top-0 mt-2 mr-2">
                <i className="bi bi-eye-fill"></i>
              </button>
            </div>
            {/* Tutaj możesz dodać wyświetlanie błędu */}
          </div>
          <div className="mb-6 text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded-full">
              Zaloguj <i className="bi bi-arrow-right ml-2"></i>
            </button>
          </div>
          <hr className="mb-6" />
          <div className="text-center">
            <a className="text-gray-700" href="/forgot-password-request">
              Zapomniałem/am hasła
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;