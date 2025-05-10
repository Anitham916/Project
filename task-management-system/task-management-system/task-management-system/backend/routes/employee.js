const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');

// Create Employee
router.post('/employee', async (req, res) => {
  try {
    const {
      employee_id,
      firstName,
      lastName,
      email,
      phone,
      residentialAddress,
      cnic,
      role,
      dateOfBirth,
      startDate,
      status,
      gender,
    } = req.body;

    const existingEmployeeByEmail = await Employee.findOne({ email });
    if (existingEmployeeByEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const existingEmployeeByCnic = await Employee.findOne({ cnic });
    if (existingEmployeeByCnic) {
      return res.status(400).json({ message: 'CNIC already exists' });
    }

    const newEmployee = new Employee({
      employee_id,
      firstName,
      lastName,
      email,
      phone,
      residentialAddress,
      cnic,
      role,
      dateOfBirth,
      startDate,
      status,
      gender,
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Get All Employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Update Employee
router.put('/employee/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Delete Employee
router.delete('/employee/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Get Employee Stats by Status
router.get('/employees-stats', async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });
    const inactiveEmployees = await Employee.countDocuments({ status: 'Inactive' });
    const terminatedEmployees = await Employee.countDocuments({ status: 'Terminated' });

    const employeesStats = {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      terminatedEmployees,
    };

    res.status(200).json(employeesStats);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});
// Example route
router.get('/employees', (req, res) => {
  res.send('Employee routes are working!');
});

module.exports = router;
