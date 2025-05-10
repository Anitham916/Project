import React from 'react';
 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './layouts/auth/Register.jsx';
import Login from './layouts/auth/Login.jsx';
import Dashboard from './layouts/dashboard/Dashboard.jsx';
import Employees from './layouts/employees/Employees.jsx';
import Projects from './layouts/projects/Projects.jsx';
import Tasks from './layouts/tasks/Tasks.jsx';
import Profile from './layouts/Profile/Profile.jsx';


 

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/employees' element={<Employees />} />
          <Route path='/admin/projects' element={<Projects />} />
          <Route path='/admin/tasks' element={<Tasks />} />
          <Route path='/admin/Profile' element={<Profile />} />

          <Route path='/employee/dashboard' element={<Dashboard />} />
          <Route path='/employee/tasks' element={<Tasks />} />
          <Route path='/employee/Profile' element={<Profile />} />

         
          
        </Routes>
      </Router>
    </>
  )
}

export default App;