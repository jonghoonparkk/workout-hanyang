import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import WorkoutTracker from './components/WorkoutTracker';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/workouts" element={<WorkoutTracker />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
