import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Pages/Main";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Task Management System</h1>
        <Main />
      </div>
    </Router>
  );
}

export default App;
