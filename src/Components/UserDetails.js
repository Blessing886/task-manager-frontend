import React, { useState, useEffect } from 'react';

function UserDetails({ user }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`https://task-manager3-cl1c.onrender.com/${user.id}/tasks`)
      .then((response) => response.json())
      .then(setTasks)
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, [user.id]);

  return (
    <>
      <h4>{user.name}</h4>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Department: {user.department ? user.department.name : 'None'}</p>

      <h5>Tasks:</h5>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>Due Date: {task.due_date}</p>

              <h6>Comments:</h6>
              {task.comments?.length > 0 ? (
                <ul>
                  {task.comments.map((comment) => (
                    <li key={comment.id}>
                      <p>{comment.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments for this task.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks assigned to this user.</p>
      )}
    </>
  );
}

export default UserDetails;
