import React, {useState} from 'react'
import "./sidenav.css"
import { MdDashboard } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaProjectDiagram } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import { IoIosTime } from "react-icons/io";
import { MdInsertInvitation } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import profile from '../../assets/sidenav/profile.jpg';
import { Link, useLocation } from "react-router-dom";
import {Switch, Case,Default} from 'react-if';


function Sidenav() {
  const location = useLocation();
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('userData'))?.role);

  return (
     <div className='sidenav-main-container'>
      <div className='sidenav-profile-container'>
        <img className='sidenav-profile-img' src={profile} alt="Profile" />
        <p className='sidenav-profile-name'>𝙕𝙊𝙇𝘼𝘽𝙕 𝙏𝙚𝙘𝙝</p>
        <p className='sidenav-profile-email'>hrzolabz@gmail.com</p>
      </div>
      <Switch>
      <Case condition={role==='admin'}>
      <div className='sidenav-list-main-container' >
        <Link to="/admin/dashboard"><div className={`sidenav-list ${location.pathname === "/admin/dashboard" ? "default-hover" : ""}`}><span><MdDashboard className='sidenav-icon' /></span><p className='sidenav-list-text'>Dashboard</p></div></Link>
        <Link to="/admin/employees"><div className={`sidenav-list ${location.pathname === "/admin/employees" ? "default-hover" : ""}`}><span><FaPeopleGroup className='sidenav-icon' /></span><p className='sidenav-list-text'>Employees</p></div></Link>
        <Link to="/admin/projects"><div className={`sidenav-list ${location.pathname === "/admin/projects" ? "default-hover" : ""}`}><span><FaProjectDiagram className='sidenav-icon' /></span><p className='sidenav-list-text'>Projects</p></div></Link>
        <Link to="/admin/tasks"><div className={`sidenav-list ${location.pathname === "/admin/tasks" ? "default-hover" : ""}`}><span><FaTasks className='sidenav-icon' /></span><p className='sidenav-list-text'>Tasks</p></div></Link>
         
        <Link to="/admin/profile"><div className={`sidenav-list ${location.pathname === "/admin/profile" ? "default-hover" : ""}`}><span><FaUser className='sidenav-icon' /></span><p className='sidenav-list-text'>Profile</p></div></Link>
         



        <Link to="/"><div className={`sidenav-list ${location.pathname === "/logout" ? "default-hover" : ""}`}><span><LuLogOut className='sidenav-icon' /></span><p className='sidenav-list-text'>Logout</p></div></Link>
      </div>
      </Case>
      <Default>
        <div className='sidenav-list-main-container' >
        <Link to="/employee/dashboard"><div className={`sidenav-list ${location.pathname === "/employee/dashboard" ? "default-hover" : ""}`}><span><MdDashboard className='sidenav-icon' /></span><p className='sidenav-list-text'>Dashboard</p></div></Link>
        <Link to="/employee/tasks"><div className={`sidenav-list ${location.pathname === "/employee/tasks" ? "default-hover" : ""}`}><span><FaTasks className='sidenav-icon' /></span><p className='sidenav-list-text'>Tasks</p></div></Link>
         
        <Link to="/employee/profile"><div className={`sidenav-list ${location.pathname === "/employee/profile" ? "default-hover" : ""}`}><span><FaUser className='sidenav-icon' /></span><p className='sidenav-list-text'>Profile</p></div></Link>
         
        <Link to="/"><div className={`sidenav-list ${location.pathname === "/" ? "default-hover" : ""}`}><span><LuLogOut className='sidenav-icon' /></span><p className='sidenav-list-text'>Logout</p></div></Link>
      </div>
      </Default>
      </Switch>
    </div>
  )
}

export default Sidenav