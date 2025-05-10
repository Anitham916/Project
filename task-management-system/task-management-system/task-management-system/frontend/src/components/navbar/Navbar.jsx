import * as React from 'react';
import "./navbar.css";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

function Navbar() {
    // 🗓️ Get today's date dynamically
    const today = new Date();
    const options = { weekday: 'long' };
    const dayName = today.toLocaleDateString('en-GB', options); // e.g., Tuesday

    const dateStr = today.toLocaleDateString('en-GB'); // e.g., 06/04/2025

    return (
        <div className='nav-main-container'>
            <div><p className='nav-main-text'>  <span>𝑻𝑨𝑺𝑲 𝑴𝑨𝑵𝑨𝑮𝑬𝑴𝑬𝑵𝑻 𝑺𝒀𝑺𝑻𝑬𝑴</span></p></div>  

            {/*<div className='nav-search-container'>
                <input placeholder='Search your task here...' />
                <div className='task-read'>
                    <IoIosSearch className='read-icon' />
                </div>
            </div>*/}

            <div className='nav-notification-container'>
                <div className='task-read'>
                    <IoIosNotifications className='read-icon' />
                </div>
                <div>
                    <p className='nav-day-text'>{dayName}</p>
                    <p className='nav-date-text'>{dateStr}</p>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
