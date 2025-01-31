import React, { useEffect, useState } from "react";

function CommentSect({ taskId, assignedUsers }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null)
  
  // fetch task comments
  useEffect(() => {
    fetch(`/tasks/${task.id}/comments`)
      .then((res) => res.json())
      .then(setComments)
      .catch((err) => console.error("Error fetching comments:", err))
  }, [taskId]);

  const isUserAssigned = assignedUsers.includes(userName);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isUserAssigned) {
      setError("You are not assigned to this task!");
      return;
    }

    fetch(`/tasks/${taskId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, text: commentText}),
    })
      .then((res) => res.json())
      .then((newComment) => setComments([...comments, newComment]))
      .catch((err) => console.error("Error posting comment:", err));
    setCommentText("");
  };

  
}