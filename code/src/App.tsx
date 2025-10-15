import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css';
import Poster from './components/Poster';
import Login from './Login';

const Lists = [
  {
    id: 1,
    imageUrl: '/public/poster/A_Star_is_Born.png',
  },
  {
    id: 2,
    imageUrl: '/public/poster/Big_Hero_6_(film)_poster.jpg',
  },
   {
    id: 3,
    imageUrl: '/public/poster/Big_Hero_6_(film)_poster.jpg',
  },
   {
    id: 4,
    imageUrl: '/public/poster/Big_Hero_6_(film)_poster.jpg',
  },
   {
    id: 5,
    imageUrl: '/public/poster/Big_Hero_6_(film)_poster.jpg',
  },
   {
    id: 6,
    imageUrl: '/public/poster/Big_Hero_6_(film)_poster.jpg',
  },
   {
    id: 7,
    imageUrl: '/public/poster/Big_Hero_6_(film)_poster.jpg',
  },
   {
    id: 8,
    imageUrl: '/poster/Big_Hero_6_(film)_poster.jpg',
  },
   {
    id: 9,
    imageUrl: '/public/poster/A_Star_is_Born.png',
  },

]

const HomePage: React.FC = () => (
    <main className="flex-grow p-8">
        <div className="shadow rounded-lg p-8 mb-8">
            <h1 className="text-3xl font-bold mb-4 text-black">เนื้อหาหลักของหน้าเว็บ</h1>
            <p className='text-black'>
                นี่คือส่วนเนื้อหาของหน้าเว็บที่อยู่ใต้ Navigation Bar ลองปรับขนาดหน้าจอเพื่อดูการทำงานของ Responsive Navbar
            </p>
        </div>
        <div className='bg-gray-200'>
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