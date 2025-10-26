import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css';
import Poster from './components/Poster';
import Login from './components/LoginPage';
import Lists from './components/lists';


const HomePage: React.FC = () => (
    <main className="flex-grow p-8">
        <div className='shadow rounded-lg p-8 mb-8'>
          <div className="bg-gray-300 rounded-xl shadow-lg p-6 container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">รายการสินค้าของเรา</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {Lists.map(list => (
                <Poster
                  key={list.id}
                  imageUrl={list.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
    </main>
  );


const App: React.FC = () => {
    return (
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        );
    };

export default App;