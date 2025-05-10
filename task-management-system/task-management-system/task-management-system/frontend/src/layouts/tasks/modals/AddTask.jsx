import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';

const AddTask = ({ isOpen, onClose, editTask, projects, refreshTasks }) => {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [availableModules, setAvailableModules] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [allUser, setallUser] = useState([]);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || '');
      setProjectId(editTask.project?._id || '');
      setAssigneeId(editTask.assignee?._id || '');
      setModuleTitle(editTask.modules?.[0]?.title || '');
    } else {
      setTitle('');
      setProjectId('');
      setAssigneeId('');
      setModuleTitle('');
    }
  }, [editTask, isOpen]);

  useEffect(() => {
    if (projectId) {
      const selectedProject = projects.find((proj) => proj._id === projectId);
    
      if (selectedProject) {
        setAvailableModules(selectedProject.modules || []);
        const selectedAssignee = allUser.filter((assignee) => assignee._id === selectedProject.user);
        if (selectedAssignee) {
          setAssignees(selectedAssignee);
        } else {
          setAssignees([]);
        }
      } else {
        setAvailableModules([]);
        setAssignees([]);
      }
      
    } else {
      setAvailableModules([]);
      setAssignees([]);
    }

    
  }, [projectId, projects]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        setallUser(response.data); // Assuming the API returns an array of employees
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSave = async () => {
    const taskData = {
      title,
      project: projectId,
      assignee: assigneeId,
      modules: [{ title: moduleTitle }],
    };

    try {
      if (editTask) {
        await axios.put(`/api/tasks/${editTask._id}`, taskData);
      } else {
        await axios.post('/api/tasks', taskData);
      }
      onClose();
      refreshTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editTask ? 'Edit Task' : 'Add New Task'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Input
          placeholder="Task Title"
          mb={4}
          value={title}
          onFocus={(e) => e.target.placeholder = "Please fill the required field"}
          onBlur={(e) => e.target.placeholder = "Task Title"}
          onChange={(e) => setTitle(e.target.value)}
/>

<Select
  placeholder="Select Project"
  mb={4}
  value={projectId}
  onFocus={(e) => e.target.placeholder = "Please fill the required field"}
  onBlur={(e) => e.target.placeholder = "Select Project"}
  onChange={(e) => setProjectId(e.target.value)}
>
  {projects.map((proj) => (
    <option key={proj._id} value={proj._id}>
      {proj.title}
    </option>
  ))}
</Select>


<Select
  placeholder="Select Module"
  mb={4}
  value={moduleTitle}
  onFocus={(e) => e.target.placeholder = "Please fill the required field"}
  onBlur={(e) => e.target.placeholder = "Select Module"}
  onChange={(e) => setModuleTitle(e.target.value)}
  isDisabled={!availableModules.length}
>
  {availableModules.map((mod, idx) => (
    <option key={idx} value={mod.title}>
      {mod.title}
    </option>
  ))}
</Select>


<Select
  placeholder="Select Assignee"
  mb={4}
  value={assigneeId}
  onFocus={(e) => e.target.placeholder = "Please fill the required field"}
  onBlur={(e) => e.target.placeholder = "Select Assignee"}
  onChange={(e) => setAssigneeId(e.target.value)}
>
  {assignees.map((emp) => (
    <option key={emp._id} value={emp._id}>
      {emp.firstName && emp.lastName
        ? `${emp.firstName} ${emp.lastName}`
        : emp.name}
    </option>
  ))}
</Select>

        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTask;