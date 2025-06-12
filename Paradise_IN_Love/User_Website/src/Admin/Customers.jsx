import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FiX, FiHome, FiShoppingBag, FiPlus, FiUsers, FiLogOut } from 'react-icons/fi';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isActiveLink = (to) => location.pathname === to ? 'bg-pink-600 text-white' : 'hover:bg-gray-700';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(
          'http://localhost:8000/api/user/getall',
          { id: 'admin-user-id' },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setUsers(response.data.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="flex mt-20 bg-gradient-to-br from-gray-100 via-pink-100 to-white min-h-screen">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} fixed md:relative inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform flex flex-col z-30`}>
        <div className="p-4 flex items-center justify-between border-b border-pink-500">
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-lg mr-3">
              <div className="bg-pink-500 w-8 h-8 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
            </div>
            <h1 className="text-xl font-bold">Paradise in Love</h1>
          </div>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-700 md:hidden">
            <FiX size={20} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col px-2 flex-grow">
          {[
            { to: "/dashboard", icon: FiHome, label: "Dashboard" },
            { to: "/orders", icon: FiShoppingBag, label: "Orders" },
            { to: "/add-product", icon: FiPlus, label: "Add Product" },
            { to: "/customers", icon: FiUsers, label: "Customers" },
            { to: "/logout", icon: FiLogOut, label: "Logout" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 ${isActiveLink(to)}`}
            >
              <Icon className="mr-3" size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">All Users Data</h1>
        <div className="overflow-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Mobile</th>
                <th className="py-2 px-4 border-b">Refresh Token</th>
                <th className="py-2 px-4 border-b">Last Login Date</th>
                <th className="py-2 px-4 border-b">Address Details</th>
                <th className="py-2 px-4 border-b">Shopping Cart</th>
                <th className="py-2 px-4 border-b">Order History</th>
                <th className="py-2 px-4 border-b">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-pink-50">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.mobile || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{user.refresh_token || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{user.last_login_date ? new Date(user.last_login_date).toLocaleString() : 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    {user.address_details?.length ? (
                      <ul className="list-disc pl-4">
                        {user.address_details.map((addr, idx) => (
                          <li key={idx}>{addr}</li>
                        ))}
                      </ul>
                    ) : 'No Address'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user.shopping_cart?.length ? (
                      <ul className="list-disc pl-4">
                        {user.shopping_cart.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : 'No Cart Items'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user.orderHistory?.length ? (
                      <ul className="list-disc pl-4">
                        {user.orderHistory.map((order, idx) => (
                          <li key={idx}>{order}</li>
                        ))}
                      </ul>
                    ) : 'No Orders'}
                  </td>
                  <td className="py-2 px-4 border-b">{user.role || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
