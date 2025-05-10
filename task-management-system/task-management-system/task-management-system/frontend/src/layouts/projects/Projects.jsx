import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidenav from '../../components/sidenav/Sidenav';
import './projects.css';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { FcStatistics } from 'react-icons/fc';

import totalprojects from '../../assets/tasks/totaltasks.png';
import totalcomplete from '../../assets/tasks/totalcomplete.png';
import totalprogress from '../../assets/tasks/totalprogress.png';
import totalpending from '../../assets/tasks/totalpending.png';

import AddProjectModal from './modals/AddProject';
import axios from 'axios';

function Projects() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [projectStats, setProjectStats] = useState({
    totalProject: 0
  });

  const [editProject, setEditProject] = useState(null);

  const openAddProjectModal = () => setIsAddProjectModalOpen(true);
  const closeAddProjectModal = () => setIsAddProjectModalOpen(false);

  const handleEdit = (project) => {
    setEditProject({ ...project });
    openAddProjectModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/api/project/${id}`);
        getProjects(); // Refresh list
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  

  const getProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjectsData(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const getProjectStats = async () => {
    try {
      const res = await axios.get('/api/project-stats');
      setProjectStats(res.data);
    } catch (err) {
      console.error('Error fetching project stats:', err);
    }
  };

  useEffect(() => {
    getProjects();
    getProjectStats();
  }, []);

  return (
    <>
      <AddProjectModal isOpen={isAddProjectModalOpen} onClose={closeAddProjectModal} ProjectData={editProject} />
      

      <div className='app-main-container'>
        <div className='app-main-left-container'><Sidenav /></div>
        <div className='app-main-right-container'>
          <Navbar />
          <div className='task-status-card-container'>
            <div className='add-task-inner-div'>
              <FcStatistics className='task-stats' />
              <p className='todo-text'>Projects Statistics</p>
            </div>
            <div className='stat-first-row'>
              <div className='stats-container container-bg1'>
                <img className='stats-icon' src={totalprojects} alt="Total Projects" />
                <div>
                  <p className='stats-num'>{projectStats.totalProject}</p>
                  <p className='stats-text'>Total Projects</p>
                </div>
              </div>
              <div className='stats-container container-bg4'>
                <img className='stats-icon' src={totalcomplete} alt="Completed Projects" />
                <div>
                  <p className='stats-num'>{projectStats.completed}</p>
                  <p className='stats-text'>Completed</p>
                </div>
              </div>
            </div>
            <div className='stat-second-row'>
              <div className='stats-container container-bg2'>
                <img className='stats-icon' src={totalprogress} alt="In Progress" />
                <div>
                  <p className='stats-num'>{projectStats.inProgress}</p>
                  <p className='stats-text'>In Progress</p>
                </div>
              </div>
              <div className='stats-container container-bg3'>
                <img className='stats-icon' src={totalpending} alt="Pending" />
                <div>
                  <p className='stats-num'>{projectStats.pending}</p>
                  <p className='stats-text'>Pending</p>
                </div>
              </div>
            </div>
          </div>

          <div className='table-main-header'>
            <p className='table-header-text'>Projects</p>
            <button className='table-btn' onClick={openAddProjectModal}><IoMdAdd /> Add Project</button>
          </div>
          <TableContainer className='table-main-container'>
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>TITLE</Th>
                  <Th>CLIENT</Th>
                  <Th>DOMAIN</Th>
                  <Th>MODULE</Th>
                  <Th>ACTIONS</Th>
              
                </Tr>
              </Thead>
              <Tbody>
                {projectsData.map((project) => (
                  <Tr key={project._id}>
                    <Td>{project.title}</Td>
                    <Td>{project.client}</Td>
                    <Td>{project.domain}</Td>
                    <Td>
                      {project.modules && project.modules.map((mod, idx) => (
                        <div key={idx}>
                          <strong>{mod.title}</strong>: {mod.description}
                        </div>
                      ))}
                    </Td>
                    <Td>
                      <Button size='sm' colorScheme='blue' onClick={() => handleEdit(project)}>Edit</Button>{' '}
                      <Button size='sm' colorScheme='red' onClick={() => handleDelete(project._id)}>Delete</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Projects;
