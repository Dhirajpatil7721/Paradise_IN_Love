import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingBag, FiPlus, FiUsers, FiSettings, FiHome, FiSearch, FiFilter, FiChevronDown, FiEye, FiEdit2, FiChevronRight, FiChevronLeft, FiDollarSign, FiLogOut } from 'react-icons/fi';


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Changed to false for mobile-first hidden
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [categories] = useState(['All', 'Saree', 'Dress Material', 'Casual suits', 'Gown','Kurti','Leggings']);
  const [statuses] = useState(['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const location = useLocation();

  useEffect(() => {
    // Mock orders data
    const mockOrders = [
      {
        id: 1001,
        customerName: 'Priya Sharma',
        productName: 'Silk Saree',
        category: 'Saree',
        price: 2499,
        quantity: 1,
        date: '2023-05-15',
        status: 'Delivered',
        image: 'https://via.placeholder.com/150/FF69B4/FFFFFF?text=Saree' // Placeholder image
      },
      {
        id: 1002,
        customerName: 'Ananya Patel',
        productName: 'Cotton Kurti',
        category: 'Kurti',
        price: 899,
        quantity: 2,
        date: '2023-05-18',
        status: 'Shipped',
        image: 'https://via.placeholder.com/150/9370DB/FFFFFF?text=Kurti' // Placeholder image
      },
      {
        id: 1003,
        customerName: 'Sneha Singh',
        productName: 'Georgette Gown',
        category: 'Gown',
        price: 3500,
        quantity: 1,
        date: '2023-05-20',
        status: 'Pending',
        image: 'https://via.placeholder.com/150/ADD8E6/FFFFFF?text=Gown' // Placeholder image
      },
      {
        id: 1004,
        customerName: 'Deepika Rao',
        productName: 'Casual Suit Set',
        category: 'Casual suits',
        price: 1500,
        quantity: 1,
        date: '2023-05-22',
        status: 'Processing',
        image: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=Suit' // Placeholder image
      },
      {
        id: 1005,
        customerName: 'Kavita Devi',
        productName: 'Lycra Leggings',
        category: 'Leggings',
        price: 450,
        quantity: 3,
        date: '2023-05-25',
        status: 'Delivered',
        image: 'https://via.placeholder.com/150/C0C0C0/FFFFFF?text=Leggings' // Placeholder image
      },
      {
        id: 1006,
        customerName: 'Pooja Reddy',
        productName: 'Embroidered Saree',
        category: 'Saree',
        price: 3200,
        quantity: 1,
        date: '2023-05-28',
        status: 'Shipped',
        image: 'https://via.placeholder.com/150/F08080/FFFFFF?text=Saree' // Placeholder image
      },
      {
        id: 1007,
        customerName: 'Ritika Jain',
        productName: 'Anarkali Dress',
        category: 'Dress Material',
        price: 2800,
        quantity: 1,
        date: '2023-06-01',
        status: 'Pending',
        image: 'https://via.placeholder.com/150/AFEEEE/FFFFFF?text=Dress' // Placeholder image
      },
      {
        id: 1008,
        customerName: 'Shweta Sharma',
        productName: 'Rayon Kurti',
        category: 'Kurti',
        price: 750,
        quantity: 2,
        date: '2023-06-03',
        status: 'Cancelled',
        image: 'https://via.placeholder.com/150/DA70D6/FFFFFF?text=Kurti' // Placeholder image
      },
      {
        id: 1009,
        customerName: 'Nisha Gupta',
        productName: 'Party Wear Gown',
        category: 'Gown',
        price: 4500,
        quantity: 1,
        date: '2023-06-05',
        status: 'Processing',
        image: 'https://via.placeholder.com/150/FAFAD2/FFFFFF?text=Gown' // Placeholder image
      },
      {
        id: 1010,
        customerName: 'Meera Singh',
        productName: 'Palazzo Suit',
        category: 'Casual suits',
        price: 1800,
        quantity: 1,
        date: '2023-06-07',
        status: 'Delivered',
        image: 'https://via.placeholder.com/150/B0E0E6/FFFFFF?text=Suit' // Placeholder image
      },
      {
        id: 1011,
        customerName: 'Radha Kumari',
        productName: 'Net Saree',
        category: 'Saree',
        price: 2900,
        quantity: 1,
        date: '2023-06-09',
        status: 'Shipped',
        image: 'https://via.placeholder.com/150/FFC0CB/FFFFFF?text=Saree' // Placeholder image
      },
      {
        id: 1012,
        customerName: 'Gayatri Iyer',
        productName: 'Churidar Material',
        category: 'Dress Material',
        price: 1200,
        quantity: 1,
        date: '2023-06-10',
        status: 'Pending',
        image: 'https://via.placeholder.com/150/DDA0DD/FFFFFF?text=Dress' // Placeholder image
      }
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    let result = [...orders];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(order => order.category === selectedCategory);
    }
    
    // Apply status filter
    if (selectedStatus !== 'All') {
      result = result.filter(order => order.status === selectedStatus);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.customerName.toLowerCase().includes(query) || 
        order.productName.toLowerCase().includes(query) ||
        order.id.toString().includes(query)
      );
    }
    
    // Apply date range filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Include end date
      
      result = result.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= start && orderDate <= end;
      });
    }
    
    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, selectedStatus, searchQuery, orders, startDate, endDate]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
    setShowFilter(false);
  };

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const isActiveLink = (path) => {
    return location.pathname === path
      ? 'bg-gray-700 text-white shadow-md' : 'hover:bg-gray-700 text-white'
  };

  // Stats for summary cards
  const orderStats = {
    totalOrders: orders.length,
    pending: orders.filter(order => order.status === 'Pending').length,
    processing: orders.filter(order => order.status === 'Processing').length,
    revenue: orders.reduce((sum, order) => sum + (order.price * order.quantity), 0)
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
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
        {/* Mobile Header with Menu Button */}
        <div className="md:hidden p-4 flex items-center justify-between bg-white shadow-sm">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-200 transition-all"
          >
            <FiMenu size={24} className="text-gray-700" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Orders</h2>
          <div></div> {/* Placeholder for alignment */}
        </div>

        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard Overview</h2>
              <p className="text-gray-600 mt-1">Quick insights into your store's performance</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
              </div>
              
              <div className="relative w-full sm:w-auto">
                {/* Filter Toggle Button */}
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="w-full flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FiFilter size={18} className="mr-2" />
                  <span>Filter</span>
                </button>

                {/* Order Filter Dropdown */}
                {showFilter && (
                  <div className="absolute right-0 mt-2 w-full sm:w-80 bg-white border border-gray-200 shadow-xl rounded-lg z-50 p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Order Filters</h3>
                      <button 
                        onClick={resetFilters}
                        className="text-pink-600 hover:text-pink-800 text-sm flex items-center"
                      >
                        Reset
                      </button>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-4">
                      <label className="block mb-1 font-medium">Category</label>
                      <div className="relative">
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <FiChevronDown />
                        </div>
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div className="mb-4">
                      <label className="block mb-1 font-medium">Status</label>
                      <div className="relative">
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <FiChevronDown />
                        </div>
                      </div>
                    </div>

                    {/* Date Range Filter */}
                    <div className="mb-4">
                      <label className="block mb-1 font-medium">Date Range</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setShowFilter(false)}
                      className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded w-full"
                    >
                      Apply Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> {/* Added md:grid-cols-2 for tablet view */}
            {/* Total Orders Card */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-100 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold mt-1">{orderStats.totalOrders}</p>
                </div>
                <div className="bg-blue-200 p-3 rounded-lg">
                  <FiShoppingBag className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 w-full bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
            
            {/* Pending Orders Card */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 rounded-xl border border-yellow-100 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold mt-1">{orderStats.pending}</p>
                </div>
                <div className="bg-yellow-200 p-3 rounded-lg">
                  <FiShoppingBag className="text-yellow-600" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 w-full bg-yellow-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full" 
                    style={{ width: `${(orderStats.pending / orderStats.totalOrders) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Processing Orders Card */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl border border-green-100 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Processing</p>
                  <p className="text-2xl font-bold mt-1">{orderStats.processing}</p>
                </div>
                <div className="bg-green-200 p-3 rounded-lg">
                  <FiShoppingBag className="text-green-600" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 w-full bg-green-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${(orderStats.processing / orderStats.totalOrders) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Revenue Card */}
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-5 rounded-xl border border-pink-100 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">₹{orderStats.revenue.toFixed(2)}</p>
                </div>
                <div className="bg-pink-200 p-3 rounded-lg">
                  <FiDollarSign className="text-pink-600" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">All time revenue</p>
              </div>
            </div>
          </div>
          
          {/* Orders Table */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Recent Orders</h3>
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-md object-cover border border-gray-200" 
                                src={order.image} 
                                alt={order.productName} 
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.parentNode.innerHTML = '<div class="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center text-gray-400">Image</div>';
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{order.productName}</div>
                              <div className="text-sm text-gray-500">{order.category} • Qty: {order.quantity}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">₹{order.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{order.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-500 hover:text-blue-700 mr-4">
                            <FiEye size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <FiEdit2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-3">
                            <FiShoppingBag className="text-gray-400" size={24} />
                          </div>
                          <h4 className="text-lg font-medium text-gray-900">No orders found</h4>
                          <p className="text-gray-500 mt-1">Try adjusting your filters or search terms</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {filteredOrders.length > ordersPerPage && (
              <div className="px-4 py-3 bg-white border-t border-gray-200 sm:px-6 flex items-center justify-between">
                {/* Mobile Pagination */}
                <div className="flex-1 flex justify-between sm:hidden">
                  <button 
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => paginate(currentPage < Math.ceil(filteredOrders.length / ordersPerPage) ? currentPage + 1 : currentPage)}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
                  >
                    Next
                  </button>
                </div>
                {/* Desktop Pagination */}
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of{' '}
                      <span className="font-medium">{filteredOrders.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button 
                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                          currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                        disabled={currentPage === 1}
                      >
                        <FiChevronLeft size={18} />
                      </button>
                      
                      {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => {
                        if (
                          i === 0 || 
                          i === Math.ceil(filteredOrders.length / ordersPerPage) - 1 ||
                          (i >= currentPage - 2 && i <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={i + 1}
                              onClick={() => paginate(i + 1)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === i + 1
                                  ? 'z-10 bg-pink-600 border-pink-600 text-white'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {i + 1}
                            </button>
                          );
                        }
                        
                        if (i === currentPage - 3 || i === currentPage + 2) {
                          return (
                            <span key={i + 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                              ...
                            </span>
                          );
                        }
                        
                        return null;
                      })}
                      
                      <button 
                        onClick={() => paginate(currentPage < Math.ceil(filteredOrders.length / ordersPerPage) ? currentPage + 1 : currentPage)}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                          currentPage === Math.ceil(filteredOrders.length / ordersPerPage) ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                        disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
                      >
                        <FiChevronRight size={18} />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;