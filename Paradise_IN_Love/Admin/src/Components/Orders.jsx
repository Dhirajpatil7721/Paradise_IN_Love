import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiHome, FiShoppingBag, FiPlus, FiUsers, FiSettings, FiMenu, FiX, FiSearch, FiCalendar, FiFilter, FiDollarSign, FiUser, FiShoppingCart, FiLogOut } from 'react-icons/fi';

const Orders = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isActiveLink = (path) => {
    return location.pathname === path ? 'bg-gray-700 text-white shadow-md' : 'hover:bg-gray-700 text-white';
  };

  useEffect(() => {
    const mockOrders = [
      // ... (your existing mock orders data)
      {
        id: '1001',
        customer: { name: 'Alice Johnson', email: 'alice@example.com' },
        status: 'Pending',
        orderDate: '2025-05-28',
        paymentStatus: 'Paid',
        items: [{ name: 'Red Dress', price: 89.99, quantity: 1 }, { name: 'Designer Hat', price: 45.50, quantity: 1 }],
        total: 135.49,
        shippingAddress: '123 Main St, New York, NY 10001'
      },
      // ... (rest of your mock data)
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    let result = [...orders];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order =>
        order.id.toLowerCase().includes(term) ||
        order.customer.name.toLowerCase().includes(term) ||
        order.customer.email.toLowerCase().includes(term) ||
        order.items.some(item => item.name.toLowerCase().includes(term))
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(order => order.status === statusFilter);
    }

    if (dateFilter !== 'All') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      result = result.filter(order => {
        const orderDate = new Date(order.orderDate);
        orderDate.setHours(0, 0, 0, 0);
        
        if (dateFilter === 'Today') {
          return orderDate.toDateString() === today.toDateString();
        } else if (dateFilter === 'Last7Days') {
          return orderDate >= sevenDaysAgo && orderDate <= today;
        }
        return true;
      });
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, dateFilter, orders]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-pink-100 text-pink-800 border border-pink-300';
      case 'Processing': return 'bg-purple-100 text-purple-800 border border-purple-300';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'Delivered': return 'bg-green-100 text-green-800 border border-green-300';
      case 'Cancelled': return 'bg-red-100 text-red-800 border border-red-300';
      default: return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const getPaymentColor = (status) => {
    return status === 'Paid' 
      ? 'bg-green-100 text-green-800 border border-green-300' 
      : status === 'Refunded'
        ? 'bg-gray-100 text-gray-800 border border-gray-300'
        : 'bg-yellow-100 text-yellow-800 border border-yellow-300';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

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
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden p-4 flex items-center justify-between bg-white shadow-sm sticky top-0 z-10">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-200 transition-all"
          >
            <FiMenu size={24} className="text-gray-700" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Orders</h2>
          <div className="w-8"></div> {/* Spacer for balance */}
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-rose-800">Order Management</h2>
              <p className="text-gray-600">Track and manage customer orders</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* ... (your stat cards remain the same) ... */}
          </div>
          
          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Status Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white text-sm"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiChevronDown />
                </div>
              </div>
              
              {/* Date Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" />
                </div>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white text-sm"
                >
                  <option value="All">All Dates</option>
                  <option value="Today">Today</option>
                  <option value="Last7Days">Last 7 Days</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiChevronDown />
                </div>
              </div>
              
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center text-sm">
                <FiPlus className="mr-2" />
                Export Data
              </button>
            </div>
          </div>
          
          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="mx-auto bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FiShoppingBag className="text-rose-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find orders.
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  {/* Order summary */}
                  <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-3 md:mb-0">
                      <div className="flex items-center flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-rose-800 mr-2">Order #{order.id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} mb-1 sm:mb-0`}>
                          {order.status}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(order.paymentStatus)} mb-1 sm:mb-0`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">{order.customer.name}</span> • {order.customer.email}
                      </p>
                    </div>
                    
                    <div className="w-full md:w-auto flex justify-between items-center space-x-4">
                      <div className="text-left md:text-right">
                        <p className="text-lg font-bold">₹{order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{formatDate(order.orderDate)}</p>
                      </div>
                      <button 
                        onClick={() => toggleOrderDetails(order.id)}
                        className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                      >
                        {expandedOrder === order.id ? (
                          <FiChevronUp className="text-gray-600" size={20} />
                        ) : (
                          <FiChevronDown className="text-gray-600" size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded order details */}
                  {expandedOrder === order.id && (
                    <div className="bg-rose-50 p-4 sm:p-5">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3 flex items-center text-base">
                            <FiUser className="mr-2 text-rose-600" /> Customer Information
                          </h4>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="font-medium">{order.customer.name}</p>
                            <p className="text-gray-600 text-sm">{order.customer.email}</p>
                            <p className="mt-3 font-medium text-sm">Shipping Address</p>
                            <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3 flex items-center text-base">
                            <FiShoppingCart className="mr-2 text-rose-600" /> Order Details
                          </h4>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="mb-4">
                              <p className="font-medium">Items</p>
                              <ul className="mt-2 text-sm">
                                {order.items.map((item, idx) => (
                                  <li key={idx} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                              <span>Total</span>
                              <span>₹{order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                          Print Invoice
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg text-white hover:from-rose-700 hover:to-pink-700 transition-all text-sm">
                          Update Status
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;