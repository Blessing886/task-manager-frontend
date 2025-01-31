import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Pages/Main";
//import '//index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Main />
      </div>
    </Router>
  );
}

export default App;
