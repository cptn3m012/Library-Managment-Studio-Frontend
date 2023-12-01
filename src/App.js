import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
//import Footer from './components/Footer';
//import AdminDashboard from './admin/Dashboard';
import Layout from './admin/admin-components/Layout';
import StaffDashboard from './staff/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Layout />} />
              <Route path="/staff" element={<StaffDashboard />} />
              {/* Tu można dodać inne ścieżki w razie potrzeby */}
            </Routes>
      </Router>
    );
}

export default App;
