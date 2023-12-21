import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode as jwt_decode } from 'jwt-decode';
import Axios from "axios";
import background from "../images/background.png";
import ConnectionUrl from "../utils/ConnectionUrl";
import { successNotify, errorNotify } from "../utils/Notifications";
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Footer from "./FooterForLoginPage";

const Login = () => {
  const [loginOrEmail, setLoginOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const navigate = useNavigate();

  const handleLoginOrEmailChange = (e) => {
    setLoginOrEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(true);
    clearTimeout(timerId); 

    const newTimerId = setTimeout(() => {
      setPasswordShown(false);
    }, 1000);

    setTimerId(newTimerId); 
  };

  useEffect(() => {
    localStorage.removeItem('token');
    return () => clearTimeout(timerId);
  }, [timerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${ConnectionUrl.connectionUrlString}users/login`, {
        username: loginOrEmail,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        const decoded = jwt_decode(response.data.access_token);
        const isAdmin = decoded.sub.role_id === 1;
        if (isAdmin) {
          successNotify('Pomyślnie zalogowano');
          navigate("/admin");
        } else {
          successNotify('Pomyślnie zalogowano');
          navigate("/staff");
        }
      }
    } catch (error) {
      let errorMessage = "Wystąpił błąd w logowaniu";
      // Sprawdzanie, czy istnieje odpowiedź z serwera i czy zawiera komunikat
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      errorNotify(errorMessage);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Zawartość strony (np. formularz logowania) */}
      <div className="flex-grow flex items-center justify-center">
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
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Hasło:
              </label>
              <div className="relative">
                <input
                  type={passwordShown ? "text" : "password"}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  name="password"
                  style={{ paddingRight: '2.5rem' }} // Dodaj padding z prawej strony, aby tekst nie nachodził na ikonę
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-2 bg-gray-300"
                  aria-label="Toggle password visibility"
                >
                  {passwordShown ? (
                    <HiEyeOff className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  ) : (
                    <HiEye className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-6 text-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded-full">
                Zaloguj <i className="bi bi-arrow-right ml-2"></i>
              </button>
            </div>
            <hr className="mb-6" />
            <div className="text-center">
              <Link to="/forgot-password" className="text-gray-700">
                Zapomniałem/am hasła
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;