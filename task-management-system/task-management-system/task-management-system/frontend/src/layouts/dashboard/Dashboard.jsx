import React, { useState, useEffect } from 'react';
import Sidenav from '../../components/sidenav/Sidenav';
import Navbar from '../../components/navbar/Navbar';
import welcome from '../../assets/dashboard/welcome.png';
import axios from 'axios';
import { motion } from 'framer-motion'; // ✅ Import framer-motion
import './dashboard.css';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [fullName, setFullName] = useState('');
  const [activities, setActivities] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const getDashboard = async () => {
      const response = await axios.get('api/dashboard');
      setDashboardData(response.data);
    };

    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    setFullName(`${firstName} ${lastName}`);

    getDashboard();

    // Dummy static data
    setActivities([
      { id: 1, text: 'John created a new project.' },
      { id: 2, text: 'Anitha completed "Prepare Report" task.' },
      { id: 3, text: 'Priya updated her profile.' }
    ]);

    setDeadlines([
      { id: 1, task: 'Submit Budget Report', dueDate: '2025-04-25' },
      { id: 2, task: 'Finalize Website Design', dueDate: '2025-04-26' }
    ]);

    setQuote('Success is the sum of small efforts, repeated day in and day out.');
  }, []);

  return (
    <>
      <div className="app-main-container">
        <div className="app-main-left-container">
          <Sidenav />
        </div>
        <div className="app-main-right-container">
          <Navbar />

          {/* ---- Welcome Box ---- */}
          <div className="welcome-main-box">
            <div className="welcome-main-container">
              <div className="welcome-left-container">
                <p className="mng-text">Welcome To</p>
                <p className="mng-text">Task Management Area</p>
                <p className="mng-para">
                  Managing tasks effectively at work is all about being organized, efficient, and proactive. 
                  It entails setting clear goals, identifying and prioritizing tasks, creating a schedule, 
                  and monitoring progress.
                </p>
              </div>
              <div className="welcome-right-container">
                <img className="welcome-img" src={welcome} alt="welcome" />
              </div>
            </div>
          </div>

          {/* ---- New Features Below Welcome Box with Animation ---- */}
          <motion.div 
            className="dashboard-features-wrapper"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* Recent Activities */}
            <motion.div 
              className="dashboard-card"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="dashboard-card-title">Recent Activities</h2>
              <ul className="dashboard-list">
                {activities.map(activity => (
                  <li key={activity.id} className="dashboard-list-item">
                    {activity.text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div 
              className="dashboard-card"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="dashboard-card-title">Upcoming Deadlines</h2>
              <ul className="dashboard-list">
                {deadlines.map(deadline => (
                  <li key={deadline.id} className="dashboard-list-item">
                    {deadline.task} - <span className="deadline-date">{deadline.dueDate}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Motivational Quote */}
            <motion.div 
              className="dashboard-card quote-card"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="dashboard-card-title">Motivational Quote</h2>
              <p className="quote-text">"{quote}"</p>
            </motion.div>

          </motion.div>

          {/* ---- Dashboard Stats ---- */}
          <div className="dashboard-cards-container">
            <div className="dashboard-card">
              <h3>Total Projects</h3>
              <p>{dashboardData.totalProjects || 120}</p>
            </div>
            <div className="dashboard-card">
              <h3>Completed Tasks</h3>
              <p>{dashboardData.completedTasks || 80}</p>
            </div>
            <div className="dashboard-card">
              <h3>Pending Tasks</h3>
              <p>{dashboardData.pendingTasks || 40}</p>
            </div>
            <div className="dashboard-card">
              <h3>Active Employees</h3>
              <p>{dashboardData.activeEmployees || 50}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
