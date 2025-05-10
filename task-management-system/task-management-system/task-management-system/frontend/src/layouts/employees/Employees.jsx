import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidenav from '../../components/sidenav/Sidenav'
import "./employees.css"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { IoMdAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import totaltasks from '../../assets/tasks/totaltasks.png';
import totalprogress from '../../assets/tasks/totalprogress.png';
import totalpending from '../../assets/tasks/totalpending.png';
import totalcomplete from '../../assets/tasks/totalcomplete.png';
import { FcStatistics } from "react-icons/fc";
import AddEditEmployeeModal from './modals/AddEditEmployeeModal';
import axios from 'axios'

function Employees() {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeesData, setEmployeesData] = useState([]);
  const [employeesStats, setEmployeesStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inActiveEmployees: 0,
    terminatedEmployees: 0,
  });

  const openAddEmployeeModal = () => {
    setSelectedEmployee(null);
    setIsAddEmployeeModalOpen(true);
  };

  const openEditEmployeeModal = (employee) => {
    setSelectedEmployee(employee);
    setIsAddEmployeeModalOpen(true);
  };

  const closeAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
    setSelectedEmployee(null);
  };

  const getEmployees = async () => {
    try {
      const response = await axios.get('api/employees')
      setEmployeesData(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getEmployeesStats = async () => {
    try {
      const response = await axios.get('api/employees-stats')
      setEmployeesStats(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`/api/employee/${employeeId}`);
        getEmployees();
        getEmployeesStats();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  }

  useEffect(() => {
    getEmployees()
    getEmployeesStats()
  }, [])

  return (
    <>
      <AddEditEmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={closeAddEmployeeModal}
        onEmployeeAdded={() => {
          getEmployees();
          getEmployeesStats();
        }}
        employeeData={selectedEmployee}
      />

      <div className='app-main-container'>
        <div className='app-main-left-container'><Sidenav /></div>
        <div className='app-main-right-container'>
          <Navbar />
          <div className='task-status-card-container'>
            <div className='add-task-inner-div'>
              <FcStatistics className='task-stats' />
              <p className='todo-text'>Employees Statistics</p>
            </div>
            <div className='stat-first-row'>
              <div className='stats-container container-bg1'>
                <img className='stats-icon' src={totaltasks} alt="totaltasks" />
                <div>
                  <p className='stats-num'>{employeesStats.totalEmployees}</p>
                  <p className='stats-text'>Total Employees</p>
                </div>
              </div>
              <div className='stats-container container-bg4'>
                <img className='stats-icon' src={totalcomplete} alt="totalcomplete" />
                <div>
                  <p className='stats-num'>{employeesStats.activeEmployees}</p>
                  <p className='stats-text'>Active Employees</p>
                </div>
              </div>
            </div>
            <div className='stat-second-row'>
              <div className='stats-container container-bg2'>
                <img className='stats-icon' src={totalpending} alt="totalpending" />
                <div>
                  <p className='stats-num'>{employeesStats.inActiveEmployees}</p>
                  <p className='stats-text'>In Active Employees</p>
                </div>
              </div>
              <div className='stats-container container-bg3'>
                <img className='stats-icon' src={totalprogress} alt="totalprogress" />
                <div>
                  <p className='stats-num'>{employeesStats.terminatedEmployees}</p>
                  <p className='stats-text'>Terminated Employees</p>
                </div>
              </div>
            </div>
          </div>
          <div className='table-main-header'>
            <p className='table-header-text'>Employees</p>
            <button className='table-btn' onClick={openAddEmployeeModal}><IoMdAdd />Add Employee</button>
          </div>
          <TableContainer className='table-main-container'>
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Employee ID</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
                  <Th>CNIC</Th>
                  <Th>Role</Th>
                  <Th>Gender</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employeesData && employeesData.map((employee) => (
                  <Tr key={employee._id}>
                    <Td>{employee.employee_id}</Td>
                    <Td>{employee.firstName}</Td>
                    <Td>{employee.lastName}</Td>
                    <Td>{employee.email}</Td>
                    <Td>{employee.cnic}</Td>
                    <Td>{employee.role}</Td>
                    <Td>{employee.gender}</Td>
                    <Td>{employee.status}</Td>
                    <Td>
                      <button onClick={() => openEditEmployeeModal(employee)}><FaEdit /></button>
                      <button onClick={() => handleDeleteEmployee(employee._id)}><FaTrash /></button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}

export default Employees
