import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiLogOut, FiX, FiMenu, FiHome, FiShoppingBag, FiPlus, FiUsers, FiSettings, FiLayers } from "react-icons/fi";
import { toast } from "react-toastify";


const Logout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar open state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Simple active link checker
  const isActiveLink = (path) => (location.pathname === path ? 'bg-gray-700 text-white shadow-md'
    : 'hover:bg-gray-700 text-white');

  const logoutclick = async () => {
    try {
      await fetch("http://localhost:8080/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("adminToken");
      toast.success("Logged out successfully");
      setTimeout(() => {

        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout");
    }
  };

useEffect(() => {
  logoutclick();
}, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} fixed md:relative inset-y-0 left-0 w-64 bg-gray-800/90 text-white transition-transform duration-300 ease-in-out flex flex-col z-30`}>
        <div className="p-4 flex items-center justify-between border-b border-pink-500">
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-lg mr-3">
              <div className="bg-pink-500 w-8 h-8 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
            </div>
            <h1 className="text-xl font-bold tracking-wide">Paradies in Love</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 transition-all md:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col px-2 flex-grow">
          <Link
            to="/dashboard"
            className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/dashboard')}`}
          >
            <FiHome className="mr-3" size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            to="/orders"
            className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/orders')}`}
          >
            <FiShoppingBag className="mr-3" size={20} />
            <span className="font-medium">Orders</span>
          </Link>
          <Link
            to="/add-product"
            className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/add-product')}`}
          >
            <FiPlus className="mr-3" size={20} />
            <span className="font-medium">Add Product</span>
          </Link>
          <Link
            to="/category-management"
            className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/category-management')}`}
          >
            <FiLayers className="mr-3" size={20} />
            <span className="font-medium">Category Management</span>
          </Link>
          <Link
            to="/customers"
            className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/customers')}`}
          >
            <FiUsers className="mr-3" size={20} />
            <span className="font-medium">Customers</span>
          </Link>
          <Link
            to="/logout"
            className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/logout')}`}
          >
            <FiLogOut className="mr-3" size={20} />
            <span onClick={logoutclick} className="font-medium">Logout</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow items-center justify-center p-10 w-full max-w-4xl mx-auto">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-full mx-4 transform transition-all duration-500 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div
                className="absolute inset-0 bg-pink-500 rounded-full opacity-20 animate-ping"
                style={{ animationDuration: "2s" }}
              ></div>
              <div className="relative w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
                <FiLogOut className="text-4xl text-pink-600" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-pink-800 mb-2">
              Successfully Logged Out
            </h2>

            <p className="text-gray-600 mb-6">
              You've been securely logged out of your admin account.
            </p>

            <div className="flex justify-center">
              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-progress"
                  style={{
                    animation: "progressBar 2.5s linear forwards",
                    width: "0%",
                  }}
                ></div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4 flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-pink-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Redirecting to login page...
            </p>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>🌺 Paradise in Love Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes progressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        .animate-progress {
          animation: progressBar 2.5s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default Logout;
