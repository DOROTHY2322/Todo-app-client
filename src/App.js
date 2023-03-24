import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> 
        
        <div className="container">
          <div className="content">
            <Routes>
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
