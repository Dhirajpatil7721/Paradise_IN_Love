import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { FiMenu, FiX, FiShoppingBag, FiPlus, FiUsers, FiSettings, FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-pink-600 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">{isSidebarOpen ? 'Paradise in Love' : 'PiL'}</h1>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-pink-500">
            {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
        <nav className="mt-6 space-y-2">
          <Link to="/dashboard" className="flex items-center px-4 py-2 hover:bg-pink-700">
            <FiHome className="mr-3" />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link to="/orders" className="flex items-center px-4 py-2 hover:bg-pink-700">
            <FiShoppingBag className="mr-3" />
            {isSidebarOpen && <span>Orders</span>}
          </Link>
          <Link to="/add-product" className="flex items-center px-4 py-2 hover:bg-pink-700">
            <FiPlus className="mr-3" />
            {isSidebarOpen && <span>Add Product</span>}
          </Link>
          <Link to="/customers" className="flex items-center px-4 py-2 hover:bg-pink-700">
            <FiUsers className="mr-3" />
            {isSidebarOpen && <span>Customers</span>}
          </Link>
          <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-pink-700">
            <FiSettings className="mr-3" />
            {isSidebarOpen && <span>Settings</span>}
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
