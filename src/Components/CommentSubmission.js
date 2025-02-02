import React, { useState } from "react";

function CommentSubmission({ taskId, userId }) {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Please enter a comment.");
      return;
    }

    fetch(`https://task-manager3-cl1c.onrender.com/tasks/${taskId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, comment }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message || "Comment added successfully!");
        setComment("");
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Failed to add comment.");
        setMessage("");
      });
  };

  return (
    <div className="comment-box">
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CommentSubmission;
