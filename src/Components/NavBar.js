import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <h1>Task-a</h1>
      <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/search-details">Search Details</Link></li>
      <li><Link to="/task-list">Task List</Link></li>
      <li><Link to="/assign-task">Assign Task</Link></li>
      </ul>
    </nav>
  )

}

export default NavBar;