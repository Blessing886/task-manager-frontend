import React, { useEffect, useState } from "react";
import CommentSubmission from "./CommentSubmission";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
      fetch(`https://task-manager3-cl1c.onrender.com/tasks`)
        .then((response) => response.json())
        .then(setTasks)
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }, []);

    const handleTaskClick = (taskId) => {
      fetch(`https://task-manager3-cl1c.onrender.com/tasks/${taskId}`)
        .then((response) => response.json())
        .then((task) => {
          setSelectedTask(task);
          if (task.assigned_users.length > 0) {
            setUserId(task.assigned_users[0].id);
          }
        })
        .catch((error) => console.error('Error fetching task details:', error));
    };

    return (
      <div className="tasklist-container">
        <h2 className="tasklist-heading">Tasks</h2>
      <ul className="tasklist">
        {tasks.map(({ id, title }) => (
          <li key={id} className="task-item">
            <button className="task-button" onClick={() => handleTaskClick(id)} >
              {title}
            </button>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <div className="task-detail" >
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
          {userId && <CommentSubmission taskId={selectedTask.id} userId={userId} />}
        </div>
      )}
      </div>
    )
    
}
export default TaskList;