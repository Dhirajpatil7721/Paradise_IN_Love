// Rename from Topbar to Header
import React from 'react';

const Header = () => {
  return (
    <div className="h-16 bg-white shadow px-6 flex items-center justify-between ml-64">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Admin</span>
        <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/150" alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
