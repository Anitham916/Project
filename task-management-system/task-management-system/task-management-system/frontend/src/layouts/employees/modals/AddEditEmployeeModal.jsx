import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  FormLabel,
  Select,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';

const AddEditEmployeeModal = ({ isOpen, onClose, onEmployeeAdded, employeeData }) => {
  const isEditMode = !!employeeData;

  const [formData, setFormData] = useState({
    employee_id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    residentialAddress: '',
    cnic: '',
    role: '',
    dateOfBirth: '',
    startDate: '',
    gender: '',
    status: ''
  });

  const toast = useToast();

  // Fill form on edit
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        ...employeeData,
        dateOfBirth: employeeData.dateOfBirth?.substring(0, 10) || '',
        startDate: employeeData.startDate?.substring(0, 10) || ''
      });
    } else {
      setFormData({
        employee_id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        residentialAddress: '',
        cnic: '',
        role: '',
        dateOfBirth: '',
        startDate: '',
        gender: '',
        status: ''
      });
    }
  }, [employeeData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.put(`/api/employee/${employeeData._id}`, formData);
        toast({ title: 'Employee updated successfully', status: 'success', duration: 3000, isClosable: true });
      } else {
        await axios.post('/api/employee', formData);
        toast({ title: 'Employee added successfully', status: 'success', duration: 3000, isClosable: true });
      }
      onEmployeeAdded(); // Refresh list
      onClose();         // Close modal
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Something went wrong!',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? 'Edit Employee' : 'Add Employee'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
          <div>
            <FormLabel>Employee ID</FormLabel>
            <Input name="employee_id" value={formData.employee_id} onChange={handleChange} />
          </div>
          <div>
            <FormLabel>First Name</FormLabel>
            <Input name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div>
            <FormLabel>Last Name</FormLabel>
            <Input name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <FormLabel>Phone</FormLabel>
            <Input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <FormLabel>CNIC</FormLabel>
            <Input name="cnic" value={formData.cnic} onChange={handleChange} />
          </div>
          <div>
            <FormLabel>Role</FormLabel>
            <Input name="role" value={formData.role} onChange={handleChange} />
          </div>
          <div>
            <FormLabel>Residential Address</FormLabel>
            <Input name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} />
          </div>
          <div>
            <FormLabel>Date of Birth</FormLabel>
            <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          </div>
          <div>
            <FormLabel>Start Date</FormLabel>
            <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          </div>
          <div>
            <FormLabel>Gender</FormLabel>
            <Select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </div>
          <div>
            <FormLabel>Status</FormLabel>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="In Active">In Active</option>
              <option value="Terminated">Terminated</option>
            </Select>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {isEditMode ? 'Update' : 'Add'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditEmployeeModal;
