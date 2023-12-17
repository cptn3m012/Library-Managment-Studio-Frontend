import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import Login from './components/Login';
import Layout from './components/Layout';
import AddEmployeeContainer from './admin/containers/AddEmployeeContainer/AddEmployeeContainer';
import EmployeeListContainer from './admin/containers/EmployeeListContainer';
import AddBookContainer from './admin/containers/AddBookContainer';
import AddReaderContainer from './staff/containers/AddReaderContainer/AddReaderContainer';
import ReaderListContainer from './staff/containers/ReaderListContainer';
import StaffDashboard from './staff/Dashboard';
import Unauthorized from './components/Unauthorized'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './admin/containers/DashboardContainer';
import { errorNotify } from './utils/Notifications';
import BooksListContainer from './admin/containers/BooksListContainer';

function App() {
  const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      errorNotify('Brak tokena!');
      return <Navigate to="/login" />;
    }

    const decoded = jwt_decode(token);
    const isAdmin = decoded.sub.role_id === 1;

    return isAdmin ? <Layout role="admin">{children}</Layout> : <Navigate to="/unauthorized" />;
};

  const StaffRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" />;
    }

    const decoded = jwt_decode(token);
    const isStaff =  decoded.sub.role_id === 2;

    return isStaff ? <Layout role="staff">{children}</Layout> : <Navigate to="/unauthorized" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
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
          {/* Tu możesz dodać więcej ścieżek dostępnych tylko dla personelu */}
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} /> {/* Dodana nowa ścieżka */}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
