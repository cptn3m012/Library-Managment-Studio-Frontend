import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import Login from './components/Login';
import Layout from './components/Layout';
import AddEmployeeContainer from './admin/containers/AddEmployeeContainer/AddEmployeeContainer';
import EmployeeListContainer from './admin/containers/EmployeeListContainer';
import AddBookContainer from './admin/containers/AddBookContainer';
import AddReaderContainer from './staff/containers/AddReaderContainer/AddReaderContainer';
import ReaderListContainer from './staff/containers/ReaderListContainer';
import StaffDashboard from './staff/components/Dashboard'
import Unauthorized from './components/Unauthorized';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './admin/containers/DashboardContainer';
import { successNotify, errorNotify } from './utils/Notifications';
import BooksListContainer from './admin/containers/BooksListContainer';
import LoanListContainer from './staff/containers/LoanListContainer';
import ForgotPassword from './components/ForgotPassword';
import ResetPasswordForm from './components/ResetPassword';
import LoanHistoryListContainer from './staff/containers/LoanHistoryListContainer';

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAdmin = token && jwt_decode(token).sub.role_id === 1;

  useEffect(() => {
    if (!token) {
      errorNotify('Brak tokena!');
      navigate('/login');
    } else if (!isAdmin) {
      navigate('/unauthorized');
    }

    let timeout;

    const logout = () => {
      localStorage.removeItem('token');
      successNotify('Wylogowano się z systemu');
      navigate('/login');
    };

    const handleActivity = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 600000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      clearTimeout(timeout);
    };
  }, [navigate, token, isAdmin]);

  return token && isAdmin ? <Layout role="admin">{children}</Layout> : null;
};

const StaffRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isStaff = token && jwt_decode(token).sub.role_id === 2;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else if (!isStaff) {
      navigate('/unauthorized');
    }

    let timeout;

    const logout = () => {
      localStorage.removeItem('token');
      successNotify('Wylogowano się z systemu');
      navigate('/login');
    };

    const handleActivity = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 600000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      clearTimeout(timeout);
    };
  }, [navigate, token, isStaff]);

  return token && isStaff ? <Layout role="staff">{children}</Layout> : null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPasswordForm />} />
        <Route path="/admin" element={<AdminRoute><Layout role="admin" /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-employee" element={<AddEmployeeContainer />} />
          <Route path="employee-list" element={<EmployeeListContainer />} />
          <Route path="add-book" element={<AddBookContainer />} />
          <Route path="books-list" element={<BooksListContainer />} />
        </Route>
        <Route path="/staff" element={<StaffRoute><Layout role="staff" /></StaffRoute>}>
          <Route index element={<StaffDashboard />} />
          <Route path="add-reader" element={<AddReaderContainer />} />
          <Route path="readers-list" element={<ReaderListContainer />} />
          <Route path="books-list" element={<BooksListContainer />} />
          <Route path="return-book" element={<LoanListContainer />} />
          <Route path="borrowing-history" element={<LoanHistoryListContainer />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
