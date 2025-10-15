import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const navLinks = (
        <>
            <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-200">หน้าหลัก</Link>
            <Link to="/#movies" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-200">ภาพยนตร์</Link>
            <Link to="/#series" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-200">ซีรี่ส์</Link>
            <Link to="/#favorite" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-200">รายการที่ถูกใจ</Link>
            <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-200">Login</Link>
        </>
    );

    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="w-full flex items-center justify-between md:justify-start md:space-x-8 px-4">
                <Link to="/" className="text-blue-600 text-2xl font-bold">
                    LongDo
                </Link>

                <div className="hidden md:flex space-x-6 flex-grow justify-end">
                    <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">หน้าหลัก</Link>
                    <Link to="/#movies" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">ภาพยนตร์</Link>
                    <Link to="/#series" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">ซีรี่ส์</Link>
                    <Link to="/#favorite" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">รายการที่ถูกใจ</Link>
                    <Link to="/login" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">Login</Link>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="bg-gray-300 text-gray-800 focus:outline-none p-2 rounded-md hover:bg-gray-100">
                        {open ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"  className='text-gray-500' />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div className={`md:hidden right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-64 overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
                <div className="flex flex-col p-0 space-y-1">
                    {navLinks}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;