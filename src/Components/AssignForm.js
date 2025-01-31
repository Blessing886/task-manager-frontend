import { useState, useEffect } from "react";

function AssignForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [department, setDepartment] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [assignedUserIds, setAssignedUserIds] = useState([]); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data); // Initially, show all users
      })
      .catch((err) => console.error("Error fetching users:", err));

    fetch("/departments") // Fetch departments
      .then((response) => response.json())
      .then(setDepartments)
      .catch((err) => console.error("Error fetching departments:", err));

    fetch("/tasks/assignments")
      .then((response) => response.json())
      .then((assignments) => {
        setAssignedUserIds(assignments.map((assignment) => assignment.user_id));
      })
      .catch((err) => console.error("Error fetching assignments:", err));
  }, []);

  // Filter users based on selected department
  useEffect(() => {
    if (department) {
      setFilteredUsers(users.filter((user) => user.department_id === Number(department)));
    } else {
      setFilteredUsers(users);
    }
  }, [department, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        status,
        priority,
        created_by_user_id: createdBy,
        due_date: dueDate,
        assigned_users: assignedUsers,
        department: Number(department), // Ensure department is sent as a number
      }),
    })
      .then((response) => response.json().then((data) => ({ status: response.status, data })))
      .then(({ status, data }) => {
        if (status >= 400) {
          throw new Error(data.error || "Failed to create task");
        }
        setMessage(data.message);
        setTitle("");
        setDescription("");
        setStatus("");
        setPriority("");
        setCreatedBy("");
        setDueDate("");
        setAssignedUsers([]);
        setDepartment("");

        if (onTaskCreated) onTaskCreated();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create & Assign Task</h3>

      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </label>

      <label>
        Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label>
        Created By:
        <select value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} required>
          <option value="">Select user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Due Date:
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>

      <label>
        Department: 
        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
          <option value="">Select department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Assign Users:
        <select
          multiple
          value={assignedUsers}
          onChange={(e) =>
            setAssignedUsers([...e.target.selectedOptions].map((option) => option.value))
          }
          required
        >
          {filteredUsers.length === 0 && department && <option disabled>No users available</option>}
          {filteredUsers.map((user) => (
            <option
              key={user.id}
              value={user.id}
              disabled={assignedUserIds.includes(user.id)} // Disable assigned users
            >
              {user.name} {assignedUserIds.includes(user.id) ? "(Assigned)" : ""}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Create Task</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </form>
  );
}

export default AssignForm;
