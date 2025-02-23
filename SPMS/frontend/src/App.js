import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { Course } from './Pages/Course';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Course" element={<Course />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
