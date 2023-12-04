import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Layout from './admin/admin-components/Layout';
import AddEmployeeForm from './admin/admin-containers/AddEmployeeForm';
import EmployeeList from './admin/admin-containers/EmployeeListForm';

function App() {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/add-employee" element={<AddEmployeeForm />} />
                <Route path="/employee-list" element={<EmployeeList />} />
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
      </Router>
    );
}

export default App;
