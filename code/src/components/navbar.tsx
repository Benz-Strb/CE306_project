import React, { useState } from 'react';

const Navbar: React.FC<{ currentPage: string; onNavigate: (page: string) => void }> = ({ currentPage, onNavigate }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const handleLinkClick = (page: string) => {
    setOpen(false);
    onNavigate(page);
  };

  const NavLink: React.FC<{ page: string; children: React.ReactNode; mobile?: boolean }> = ({ page, children, mobile }) => (
    <button
      onClick={() => handleLinkClick(page)}
      className={mobile 
        ? "block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-200"
        : "text-gray-800 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer "
      }
    >
      {children}
    </button>
  );

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
      <div className="w-full flex items-center justify-between md:justify-start md:space-x-8 px-4">
        <button onClick={() => handleLinkClick('home')} className="flex items-center bg-transparent border-none cursor-pointer">
          <div className="h-12 w-32 rounded-lg flex items-center justify-center">
            <span><img src="../logo/1.png"/></span>
          </div>
        </button>

        <div className="hidden md:flex space-x-6 flex-grow justify-end">
          <NavLink page="home">หน้าหลัก</NavLink>
          <NavLink page="home">ภาพยนตร์</NavLink>
          <NavLink page="home">ซีรี่ส์</NavLink>
          <NavLink page="home">รายการที่ถูกใจ</NavLink>
          <NavLink page="login">Login</NavLink>
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-gray-600 hover:text-gray-800 focus:outline-none p-2 rounded-md bg-transparent border-none"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`absolute right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-64 overflow-hidden transition-all duration-300 ease-in-out origin-top-right ${open ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
        <div className="flex flex-col py-1">
          <NavLink page="home" mobile>หน้าหลัก</NavLink>
          <NavLink page="home" mobile>ภาพยนตร์</NavLink>
          <NavLink page="home" mobile>ซีรี่ส์</NavLink>
          <NavLink page="home" mobile>รายการที่ถูกใจ</NavLink>
          <NavLink page="login" mobile>Login</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;