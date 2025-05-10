 // frontend/src/layouts/AddEmployee.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import AddEditEmployeeModal from './AddEditEmployeeModal';

const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState('add'); // 'add' or 'edit'

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/api/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddClick = () => {
    setSelectedEmployee(null);
    setAction('add');
    setIsModalOpen(true);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setAction('edit');
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/api/employee/${id}`);
      fetchEmployees(); // Refresh after delete
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  return (
    <Box p={4}>
      <Box bg="teal.600" color="white" p={4} borderRadius="md" display="flex" justifyContent="space-between" alignItems="center">
        <Box fontWeight="bold" fontSize="xl">Employees</Box>
        <Button onClick={handleAddClick} colorScheme="teal" variant="solid">Add Employee</Button>
      </Box>

      <Table mt={4} variant="simple">
        <Thead>
          <Tr>
            <Th>NAME</Th>
            <Th>EMAIL</Th>
            <Th>ROLE</Th>
            <Th>STATUS</Th>
            <Th>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((emp, idx) => (
            <Tr key={emp._id} bg={idx % 2 === 0 ? "teal.100" : "white"}>
              <Td>{`${emp.firstName} ${emp.lastName}`}</Td>
              <Td>{emp.email}</Td>
              <Td>{emp.role}</Td>
              <Td>{emp.status}</Td>
              <Td>
                <IconButton icon={<EditIcon />} colorScheme="blue" mr={2} onClick={() => handleEditClick(emp)} />
                <IconButton icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDeleteClick(emp._id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {isModalOpen && (
        <AddEditEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fetchEmployees={fetchEmployees}
          employee={selectedEmployee}
          action={action}
        />
      )}
    </Box>
  );
};

export default AddEmployee;
