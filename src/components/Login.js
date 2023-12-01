import React, { useState } from "react";
import Axios from "axios"; // Importuj Axios
import background from "../images/background.png"; 

const Login = () => {
  const [loginOrEmail, setLoginOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginOrEmailChange = (e) => {
    setLoginOrEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await Axios.post("http://localhost:5000/users/login", {  
        username: loginOrEmail,
        password: password,
      });
  
      if (response.status === 200) {
        // Tutaj możesz obsłużyć poprawne logowanie
        console.log("Zalogowano pomyślnie");
      }
    } catch (error) {
      // Tutaj możesz obsłużyć błąd logowania
      console.error("Błąd logowania:", error.response.data.message);
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