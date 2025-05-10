import React, { useState, useEffect } from 'react';
import Sidenav from '../../components/sidenav/Sidenav';
import Navbar from '../../components/navbar/Navbar';
import './profile.css';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

function Profile() {
  // Load from localStorage or default data
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem('employees');
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            dob: '1998-04-17',
            mobile: '9876543210',
            address: '123 Main St, Chennai',
            avatar: 'https://bit.ly/broken-link',
            tasks: ['Complete project report', 'Update meeting notes'],
          },
        ];
  });

  // Save to localStorage on every update
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const [selected, setSelected] = useState(employees[0]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    dob: '',
    mobile: '',
    address: '',
    avatar: '',
    tasks: '',
  });

  const [editEmployee, setEditEmployee] = useState(null);

  const handleImageUpload = (e, updateState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateState(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEmployee = () => {
    const newEmp = {
      ...newEmployee,
      id: employees.length + 1,
      tasks: newEmployee.tasks.split(',').map(task => task.trim()),
    };
    const updatedList = [...employees, newEmp];
    setEmployees(updatedList);
    setSelected(newEmp);
    setNewEmployee({
      name: '',
      email: '',
      dob: '',
      mobile: '',
      address: '',
      avatar: '',
      tasks: '',
    });
    setShowAddForm(false);
  };

  const handleEditProfile = () => {
    setEditEmployee({
      ...selected,
      tasks: selected.tasks.join(', '),
    });
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    const updated = {
      ...editEmployee,
      tasks: editEmployee.tasks.split(',').map(t => t.trim()),
    };
    const updatedList = employees.map(emp =>
      emp.id === updated.id ? updated : emp
    );
    setEmployees(updatedList);
    setSelected(updated);
    setEditEmployee(null);
    setShowEditForm(false);
  };

  return (
    <div className="app-main-container">
      <div className="app-main-left-container">
        <Sidenav />
      </div>

      <div className="app-main-right-container">
        <Navbar />

        <Box className="profile-dashboard">
          <div className="employee-list">
            <h3>Employee List</h3>
            <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? '✖ Close' : '＋ Add'}
            </button>

            {employees.map(emp => (
              <button
                key={emp.id}
                className={`employee-btn ${selected?.id === emp.id ? 'selected' : ''}`}
                onClick={() => setSelected(emp)}
              >
                {emp.name}
              </button>
            ))}

            {showAddForm && (
              <div className="add-form">
                <Input placeholder="Name" value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} mb={2} />
                <Input placeholder="Email" value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} mb={2} />
                <Input placeholder="DOB" type="date" value={newEmployee.dob}
                  onChange={(e) => setNewEmployee({ ...newEmployee, dob: e.target.value })} mb={2} />
                <Input placeholder="Mobile" value={newEmployee.mobile}
                  onChange={(e) => setNewEmployee({ ...newEmployee, mobile: e.target.value })} mb={2} />
                <Textarea placeholder="Address" value={newEmployee.address}
                  onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })} mb={2} />
                <Textarea placeholder="Tasks (comma-separated)" value={newEmployee.tasks}
                  onChange={(e) => setNewEmployee({ ...newEmployee, tasks: e.target.value })} mb={2} />
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewEmployee)} mb={2} />
                <Button onClick={handleAddEmployee} colorScheme="teal" size="sm" mt={2}>Save</Button>
              </div>
            )}
          </div>

          <div className="employee-details">
            {showEditForm ? (
              <>
                <h2>Edit Profile</h2>
                <Input placeholder="Name" value={editEmployee.name}
                  onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })} mb={2} />
                <Input placeholder="Email" value={editEmployee.email}
                  onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })} mb={2} />
                <Input placeholder="DOB" type="date" value={editEmployee.dob}
                  onChange={(e) => setEditEmployee({ ...editEmployee, dob: e.target.value })} mb={2} />
                <Input placeholder="Mobile" value={editEmployee.mobile}
                  onChange={(e) => setEditEmployee({ ...editEmployee, mobile: e.target.value })} mb={2} />
                <Textarea placeholder="Address" value={editEmployee.address}
                  onChange={(e) => setEditEmployee({ ...editEmployee, address: e.target.value })} mb={2} />
                <Textarea placeholder="Tasks (comma-separated)" value={editEmployee.tasks}
                  onChange={(e) => setEditEmployee({ ...editEmployee, tasks: e.target.value })} mb={2} />
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setEditEmployee)} mb={2} />
                <Button colorScheme="green" size="sm" mr={2} onClick={handleSaveEdit}>Save Changes</Button>
                <Button colorScheme="gray" size="sm" onClick={() => setShowEditForm(false)}>Cancel</Button>
              </>
            ) : (
              <>
                {selected?.avatar && <img src={selected.avatar} alt="Profile" className="profile-photo" />}
                <h2>{selected?.name}</h2>
                <p><strong>Email:</strong> {selected?.email}</p>
                <p><strong>Mobile:</strong> {selected?.mobile}</p>
                <p><strong>Date of Birth:</strong> {selected?.dob}</p>
                <p><strong>Address:</strong> {selected?.address}</p>

                <div className="task-status">
                  <h4>Task Status</h4>
                  <ul>
                    {selected?.tasks?.map((task, index) => (
                      <li key={index}>
                        <CheckCircleIcon color="green.500" mr={2} />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="edit-btn" onClick={handleEditProfile}>Edit Profile</Button>
              </>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Profile;
