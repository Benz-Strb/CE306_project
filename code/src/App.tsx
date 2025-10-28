import React, { useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} />}
      {currentPage === 'register' && <RegisterPage onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;