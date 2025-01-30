import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <h1>Task Manager</h1>
      <ul>
      <li><Link to="/task-list">Task List</Link></li>
      </ul>
    </nav>
  )

}

export default NavBar;