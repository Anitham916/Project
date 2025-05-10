import React, { useState,useEffect } from 'react';
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
  Box,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';


const AddProject = ({ isOpen, onClose,ProjectData }) => {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [modules, setModules] = useState([]);
  const [client, setClientName] = useState('');
  const [domain, setDomain] = useState('');
  const [employeesData, setEmployeesData] = useState([]);
  const [user, setUser] = useState('');


  const handleAddModule = () => {
    setModules([...modules, { title: '', description: '' }]);
  };

  const getEmployees = async () => {
      try {
        const response = await axios.get('api/employees')
        setEmployeesData(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
    }

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index][field] = value;
    setModules(updatedModules);
  };

  useEffect(() => {
    getEmployees();
   if(ProjectData){
      setTitle(ProjectData.title);
      setProjectId(ProjectData._id);
      setModules(ProjectData.modules);
      setClientName(ProjectData.client);
      setDomain(ProjectData.domain);
      setUser(ProjectData.user);
   }
   else{
        setTitle('');
        setProjectId('');
        setModules([]);
        setClientName('');
        setDomain('');
        setUser('');
   }    

  }, [ProjectData, isOpen]);

  const handleSave = async () => {
    const newProject = {
      title,
      modules,
      client,
      domain,
      user,
    };

    console.log('Saving project:', newProject);
   
    if(projectId){
        await axios.put(`/api/project/${projectId}`, newProject);
    }
    else
    {
        await axios.post(`/api/project`, newProject);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Project Title"
            mb={4}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Button onClick={handleAddModule} mb={4}>
            + Add Module
          </Button>

          {modules.map((module, index) => (
            <Box key={index} mb={4} borderWidth={1} borderRadius="md" p={2}>
              <Text fontWeight="bold" mb={2}>Module {index + 1}</Text>
              <Input
                placeholder="Module Title"
                value={module.title}
                onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                mb={2}
              />
              <Input
                placeholder="Module Description"
                value={module.description}
                onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
              />
            </Box>
          ))}

          <Select placeholder="Select Client Name" mb={4} value={client} onChange={(e) => setClientName(e.target.value)}>
            <option value="Client A">Client A</option>
            <option value="Client B">Client B</option>
            <option value="Client C">Client C</option>
          </Select>

          <Select placeholder="Select Domain" mb={4} value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Data Science">Data Science</option>
          </Select>
          <Select placeholder="Select User" mb={4} value={user} onChange={(e) => setUser(e.target.value)}>
          {employeesData.map((employee, index) => (
            
            <option key={employee._id} value={employee._id}>{employee.firstName}
            </option>))}
          </Select>
          
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProject;