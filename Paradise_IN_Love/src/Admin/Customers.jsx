import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiHome,
  FiShoppingBag,
  FiPlus,
  FiUsers,
  FiLogOut,
  FiX,
  FiLayers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Customers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path
      ? "bg-pink-500 text-white"
      : "text-gray-300 hover:bg-gray-700";
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/user/getallusers`,
        {},
        { withCredentials: true }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch users: Unauthorized");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-100 via-pink-100 to-white">
      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 w-64 bg-gray-800 text-white transform transition-transform duration-200 ease-in-out z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-pink-500">
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-lg mr-3">
              <div className="bg-pink-500 w-8 h-8 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
            </div>
            <h1 className="text-xl font-bold">Paradise in Love</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 md:hidden"
          >
            <FiX size={20} />
          </button>
        </div>
        <nav className="mt-6 flex flex-col px-2">
          {[
            { to: "/dashboard", icon: FiHome, label: "Product Inventory" },
            { to: "/orders", icon: FiShoppingBag, label: "Orders" },
            { to: "/add-product", icon: FiPlus, label: "Add Product" },
            { to: "/category-management", icon: FiLayers, label: "Categories" },
            { to: "/customers", icon: FiUsers, label: "Customers" },
            { to: "/logout", icon: FiLogOut, label: "Logout" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 ${isActiveLink(
                to
              )}`}
            >
              <Icon className="mr-3" size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8  md:mt-0">
        <button
          className="md:hidden mb-4 bg-pink-500 text-white px-4 py-2 rounded"
          onClick={toggleSidebar}
        >
          ☰ Menu
        </button>
        <h2 className="text-3xl font-bold mb-6 text-gray-700">All Users</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="inline-flex items-center px-4 py-2 mb-4 bg-pink-100 text-pink-800 rounded-lg shadow-md border border-pink-300">
          <span className="font-semibold text-lg mr-2">👥 Total Users:</span>
          <span className="text-xl font-bold">{users.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
            <thead className="bg-pink-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Mobile</th>
                <th className="py-3 px-4 text-left">Orders</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{indexOfFirstUser + idx + 1}</td>
                  <td className="py-2 px-4">{user.name || "N/A"}</td>
                  <td className="py-2 px-4">{user.email || "N/A"}</td>
                  <td className="py-2 px-4">{user.mobile || "N/A"}</td>
                  <td className="py-2 px-4">
                    {user.orderHistory ? user.orderHistory.length : "0"}
                  </td>
                  <td className="py-2 px-4">
                    {user.address_details?.length > 0 ? (
                      user.address_details.map((addr, i) => (
                        <div key={i}>
                          {addr.address_line1}, {addr.city}
                        </div>
                      ))
                    ) : (
                      "No Address"
                    )}
                  </td>
                  <td className="py-2 px-4">{user.status || "Active"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l-md border border-pink-300 ${currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-pink-600 hover:bg-pink-50"
                }`}
            >
              <FiChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 border-t border-b border-pink-300 ${currentPage === number
                    ? "bg-pink-500 text-white"
                    : "bg-white text-pink-600 hover:bg-pink-50"
                    }`}
                >
                  {number}
                </button>
              )
            )}
            <button
              onClick={() =>
                paginate(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r-md border border-pink-300 ${currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-pink-600 hover:bg-pink-50"
                }`}
            >
              <FiChevronRight size={18} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Customers;