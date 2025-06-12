import React, { useState } from "react";
import {
  FiPlus,
  FiTrash,
  FiToggleLeft,
  FiToggleRight,
  FiSearch,
  FiUser,
  FiMenu,
  FiX,
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Customers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const location = useLocation();

  const isActiveLink = (path) =>
    location.pathname === path
      ? "bg-gray-700 text-white shadow-md"
      : "hover:bg-gray-700 text-white";

  const [customers, setCustomers] = useState([
    { id: 1, name: "Jane Doe", email: "jane@example.com", active: true, joinDate: "2025-01-15", orders: 5 },
    { id: 2, name: "John Smith", email: "john@example.com", active: false, joinDate: "2024-11-22", orders: 2 },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", active: true, joinDate: "2025-03-10", orders: 8 },
  ]);

  const [newCustomer, setNewCustomer] = useState({ name: "", email: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) return;
    const newEntry = {
      id: Date.now(),
      name: newCustomer.name,
      email: newCustomer.email,
      active: true,
      joinDate: new Date().toISOString().split("T")[0],
      orders: 0,
    };
    setCustomers([...customers, newEntry]);
    setNewCustomer({ name: "", email: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col md:flex-row">
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
            <span className="font-medium">Logout</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-700 mb-4">Customer Management</h2>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full sm:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-pink-50">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-pink-800">Customer</th>
                  <th className="py-3 px-4 text-left font-semibold text-pink-800">Email</th>
                  <th className="py-3 px-4 text-left font-semibold text-pink-800">Join Date</th>
                  <th className="py-3 px-4 text-left font-semibold text-pink-800">Orders</th>
                  <th className="py-3 px-4 text-left font-semibold text-pink-800">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-pink-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-pink-50 transition-colors">
                    <td className="py-4 px-4 flex items-center">
                      <div className="bg-pink-100 rounded-full p-2 mr-3">
                        <FiUser className="text-pink-600" />
                      </div>
                      <span className="font-medium whitespace-nowrap">{customer.name}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 whitespace-nowrap">{customer.email}</td>
                    <td className="py-4 px-4 text-gray-600 whitespace-nowrap">{customer.joinDate}</td>
                    <td className="py-4 px-4">
                      <span className="bg-pink-100 text-pink-800 py-1 px-3 rounded-full text-sm">
                        {customer.orders} orders
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleStatus(customer.id)}
                        className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          customer.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {customer.active ? <FiToggleRight /> : <FiToggleLeft />}
                        <span className="ml-2">{customer.active ? "Active" : "Inactive"}</span>
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customers;
