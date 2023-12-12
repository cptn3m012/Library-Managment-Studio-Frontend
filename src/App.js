import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import Login from './components/Login';
import Layout from './admin/components/Layout';
import AddEmployeeContainer from './admin/containers/AddEmployeeContainer/AddEmployeeContainer';
import EmployeeListContainer from './admin/containers/EmployeeListContainer';
import AddBookContainer from './admin/containers/AddBookContainer';
import StaffDashboard from './staff/Dashboard';
import Unauthorized from './components/Unauthorized'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("Brak tokena");
      return <Navigate to="/login" />;
    }

    const decoded = jwt_decode(token);
    const isAdmin = decoded.sub.role_id === 1;

    return isAdmin ? children : <Navigate to="/unauthorized" />;
};

  const StaffRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" />;
    }

    const decoded = jwt_decode(token);
    const isStaff =  decoded.sub.role_id === "staff";

    return isStaff ? children : <Navigate to="/unauthorized" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminRoute><Layout /></AdminRoute>}>
          <Route path="add-employee" element={<AddEmployeeContainer />} />
          <Route path="employee-list" element={<EmployeeListContainer />} />
          <Route path="add-book" element={<AddBookContainer />} />
        </Route>
        <Route path="/staff" element={<StaffRoute><StaffDashboard /></StaffRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} /> {/* Dodana nowa ścieżka */}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
