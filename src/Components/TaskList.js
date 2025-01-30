import React, { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
      fetch(`/tasks`)
        .then((response) => response.json())
        .then(setTasks)
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }, []);

    const handleTaskClick = (taskId) => {
      fetch(`/tasks/${taskId}`)
        .then((response) => response.json())
        .then(setSelectedTask)
        .catch((error) => console.error('Error fetching task details:', error));
    };

    return (
      <div>
        <h2>Tasks</h2>
      <ul>
        {tasks.map(({ id, title }) => (
          <li key={id}>
            <button onClick={() => handleTaskClick(id)} >
              {title}
            </button>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <div >
          <h3>{selectedTask.title}</h3>
          <p><strong>Description:</strong> {selectedTask.description}</p>
          <p><strong>Status:</strong> {selectedTask.status}</p>
          <p><strong>Priority:</strong> {selectedTask.priority}</p>
          <p><strong>Due Date:</strong> {selectedTask.due_date}</p>

          <h4>Assigned Users</h4>
          {selectedTask.assigned_users.length ? (
            <ul>
              {selectedTask.assigned_users.map(({ id, name }) => <li key={id}>{name}</li>)}
            </ul>
          ) : <p>No users assigned.</p>}

          <h4>Comments</h4>
          {selectedTask.comments.length ? (
            <ul>
              {selectedTask.comments.map(({ id, comment, user_id }) => (
                <li key={id}>
                  <p>{comment}</p>
                </li>
              ))}
            </ul>
          ) : <p>No comments.</p>}
        </div>
      )}
      </div>
    )
    
}
export default TaskList;