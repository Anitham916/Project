import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidenav from '../../components/sidenav/Sidenav';
import './tasks.css';
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
import axios from 'axios';

import totalprojects from '../../assets/tasks/totaltasks.png';
import totalcomplete from '../../assets/tasks/totalcomplete.png';
import totalprogress from '../../assets/tasks/totalprogress.png';
import totalpending from '../../assets/tasks/totalpending.png';

import AddTaskModal from './modals/AddTask';

function Tasks() {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [taskStats, setTaskStats] = useState({
    totalTask: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  });
  const [editTask, setEditTask] = useState(null);

  const openAddTaskModal = () => setIsAddTaskModalOpen(true);
  const closeAddTaskModal = () => setIsAddTaskModalOpen(false);

  // Fetch tasks and related data
  const getTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      console.log(res.data);
      setTasksData(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const getTaskStats = async () => {
    try {
      const res = await axios.get('/api/task-stats');
      setTaskStats(res.data);
    } catch (err) {
      console.error('Error fetching task stats:', err);
    }
  };

  const getProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const getAssignees = async () => {
    try {
      const res = await axios.get('/api/employees');
      setAssignees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  // Handle edit action
  const handleEdit = (task) => {
    setEditTask(task);
    openAddTaskModal();
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/task/${id}`);
        getTasks();
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  useEffect(() => {
    getTasks();
    getTaskStats();
    getProjects();
    getAssignees();
  }, []);

  return (
    <>
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={closeAddTaskModal}
        projects={projects}
        assignees={assignees}
        editTask={editTask}
        refreshTasks={getTasks}
      />

      <div className="app-main-container">
        <div className="app-main-left-container">
          <Sidenav />
        </div>

        <div className="app-main-right-container">
          <Navbar />

          <div className="task-status-card-container">
            <div className="add-task-inner-div">
              <FcStatistics className="task-stats" />
              <p className="todo-text">Tasks Statistics</p>
            </div>

            <div className="stat-first-row">
              <div className="stats-container container-bg1">
                <img className="stats-icon" src={totalprojects} alt="Total Tasks" />
                <div>
                  <p className="stats-num">{taskStats.totalTask}</p>
                  <p className="stats-text">Total Tasks</p>
                </div>
              </div>
              <div className="stats-container container-bg4">
                <img className="stats-icon" src={totalcomplete} alt="Completed" />
                <div>
                  <p className="stats-num">{taskStats.completed}</p>
                  <p className="stats-text">Completed</p>
                </div>
              </div>
            </div>

            <div className="stat-second-row">
              <div className="stats-container container-bg2">
                <img className="stats-icon" src={totalprogress} alt="In Progress" />
                <div>
                  <p className="stats-num">{taskStats.inProgress}</p>
                  <p className="stats-text">In Progress</p>
                </div>
              </div>
              <div className="stats-container container-bg3">
                <img className="stats-icon" src={totalpending} alt="Pending" />
                <div>
                  <p className="stats-num">{taskStats.pending}</p>
                  <p className="stats-text">Pending</p>
                </div>
              </div>
            </div>
          </div>

          <div className="table-main-header">
            <p className="table-header-text">Tasks</p>
            <button className="table-btn" onClick={() => { setEditTask(null); openAddTaskModal(); }}>
              <IoMdAdd /> Add Task
            </button>
          </div>

          <TableContainer className="table-main-container">
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Task Title</Th>
                  <Th>Project</Th>
                  <Th>Assignee</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tasksData.map((task) => (
                  <Tr key={task._id}>
                    <Td>{task.title}</Td>
                    <Td>{task.project?.title}</Td>
                    <Td>{task.assignee?.firstName} {task.assignee?.lastName}</Td>
                    <Td>
                      <Button size="sm" colorScheme="blue" onClick={() => handleEdit(task)}>Edit</Button>{' '}
                      <Button size="sm" colorScheme="red" onClick={() => handleDelete(task._id)}>Delete</Button>
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

export default Tasks;
