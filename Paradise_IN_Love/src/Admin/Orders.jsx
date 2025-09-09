import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiHome, FiShoppingBag, FiPlus, FiUsers, FiSettings, FiMenu, FiX, FiSearch, FiCalendar, FiFilter, FiDollarSign, FiUser, FiShoppingCart, FiLogOut, FiMapPin, FiPackage, FiCreditCard, FiLayers } from 'react-icons/fi';
import axios from 'axios';

const Orders = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [updateMessage, setUpdateMessage] = useState({});
  const API_URL = import.meta.env.VITE_RENDER;
  // Function to extract file ID from Google Drive URL
  const extractFileId = (url) => {
    if (!url) return '';
    const match = url.match(/[&?]id=([^&]+)/) || url.match(/\/file\/d\/([^\/]+)/);
    return match ? match[1] : url;
  };

  // Function to get proper image URL
  const getImageUrl = (url) => {
    if (!url) return '';
    const fileId = extractFileId(url);
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  };

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/order/all-order-list`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setAllOrders(res.data.data);
          setFilteredOrders(res.data.data);
          setError(null);
        } else {
          setError('Failed to fetch orders');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Something went wrong while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  // Filter orders based on status
  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredOrders(allOrders);
    } else {
      setFilteredOrders(allOrders.filter(order => order.status === statusFilter));
    }
  }, [statusFilter, allOrders]);

  // Updating the Status
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId);
      const response = await axios.put(
        `${API_URL}/order/status-order`,
        { orderId, status: newStatus },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setAllOrders(prevOrders =>
          prevOrders.map(order =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
        setUpdateMessage(prev => ({
          ...prev,
          [orderId]: "Status updated successfully!"
        }));
      }
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      setUpdateMessage(prev => ({
        ...prev,
        [orderId]: "Failed to update status"
      }));
    } finally {
      setUpdatingStatus(null);
      setTimeout(() => {
        setUpdateMessage(prev => {
          const newMessages = { ...prev };
          delete newMessages[orderId];
          return newMessages;
        });
      }, 3000);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const isActiveLink = (path) => location.pathname === path ? 'bg-gray-700 text-white shadow-md' : 'hover:bg-gray-700 text-white';

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Enhanced color mapping with better visual representation
  const colorMap = {
    red: 'bg-red-600 text-red-800 border-red-300',
    blue: 'bg-blue-600 text-blue-800 border-blue-300',
    green: 'bg-green-800 text-green-800 border-green-300',
    black: 'bg-black text-white border-gray-700',
    white: 'bg-white text-gray-800 border-gray-300',
    yellow: 'bg-yellow-800 text-yellow-800 border-yellow-300',
    purple: 'bg-purple-800 text-purple-800 border-purple-300',
    pink: 'bg-pink-800 text-pink-800 border-pink-300',
    gray: 'bg-gray-800 text-gray-800 border-gray-300',
    orange: 'bg-orange-800 text-orange-800 border-orange-300',
    brown: 'bg-amber-800 text-amber-800 border-amber-300',
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-pink-100 text-pink-800 border border-pink-300';
      case 'confirmed': return 'bg-purple-100 text-purple-800 border border-purple-300';
      case 'shipped': return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'delivered': return 'bg-green-100 text-green-800 border border-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border border-red-300';
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
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to display color with visual indicator
  const renderColorIndicator = (colorName) => {
    const colorClass = colorMap[colorName] || 'bg-gray-200';
    const textColor = colorName === 'White' || colorName === 'Cream' || colorName === 'Yellow'
      ? 'text-gray-800'
      : 'text-white';

    return (
      <div className="flex items-center">
        <span
          className={`w-4 h-4 rounded-full mr-2 ${colorClass} ${colorName === 'White' ? 'border border-gray-300' : ''}`}
          title={colorName}
        ></span>
        <span className="text-sm">{colorName}</span>
      </div>
    );
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
            <h1 className="text-xl font-bold tracking-wide">Paradise in Love</h1>
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
            <span className="font-medium">Product Inventory</span>
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
          <div className="w-8"></div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-rose-800">Order Management</h2>
              <p className="text-gray-600">Track and manage customer orders</p>
            </div>

            {/* Status Filter Dropdown */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border rounded-lg text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                >
                  <option value="All">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiChevronDown className="text-gray-500" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FiShoppingBag className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Orders</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {error}
                </p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="mx-auto bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FiShoppingBag className="text-rose-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {statusFilter === 'All'
                    ? 'There are no orders in the system.'
                    : `There are no ${statusFilter} orders. Try a different filter.`}
                </p>
              </div>
            ) : (
              [...filteredOrders].reverse().map((order, index) => (
                <div key={order._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md">
                  {/* Order summary */}
                  <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-3 md:mb-0">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                        <h3 className="text-base sm:text-lg font-bold text-rose-800">{order.product_details.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.product_details.size)}`}>
                          {order.product_details.size}
                        </span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(order.quantity)}`}>
                          {order.quantity}
                        </div>
                        <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                          {renderColorIndicator(order.product_details.color)}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">{order.userId.name}</span> • {order.userId.email}
                      </p>
                    </div>

                    <div className="w-full md:w-auto flex justify-between items-center space-x-4">
                      <div className="text-left md:text-right">
                        <p className="text-lg font-bold">₹{order.subTotalAmt.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                      </div>
                      <button
                        onClick={() => toggleOrderDetails(order._id)}
                        className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                      >
                        {expandedOrder === order._id ? (
                          <FiChevronUp className="text-gray-600" size={20} />
                        ) : (
                          <FiChevronDown className="text-gray-600" size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded order details */}
                  {expandedOrder === order._id && (
                    <div className="bg-rose-50 p-4 sm:p-5">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Customer Information */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-bold text-gray-800 mb-3 flex items-center text-base border-b pb-2">
                            <FiUser className="mr-2 text-rose-600" /> Customer Information
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Name</p>
                              <p className="font-medium">{order.userId.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p className="text-gray-600 text-sm">{order.userId.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone</p>
                              <p className="text-gray-600 text-sm">{order.userId.mobile || 'Not provided'}</p>
                            </div>
                          </div>
                        </div>

                        {/* Shipping Information */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-bold text-gray-800 mb-3 flex items-center text-base border-b pb-2">
                            <FiMapPin className="mr-2 text-rose-600" /> Shipping Details
                          </h4>
                          {order.delivery_address ? (
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Address</p>
                                <p className="text-gray-600 text-sm">{order.delivery_address.address_line}</p>
                              </div>
                              <div className="flex space-x-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">City</p>
                                  <p className="text-gray-600 text-sm">{order.delivery_address.city}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">State</p>
                                  <p className="text-gray-600 text-sm">{order.delivery_address.state}</p>
                                </div>
                              </div>
                              <div className="flex space-x-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Pincode</p>
                                  <p className="text-gray-600 text-sm">{order.delivery_address.pincode}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Country</p>
                                  <p className="text-gray-600 text-sm">{order.delivery_address.country}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">No shipping address provided</p>
                          )}
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-bold text-gray-800 mb-3 flex items-center text-base border-b pb-2">
                            <FiCreditCard className="mr-2 text-rose-600" /> Payment Details
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Payment Method</p>
                              <p className="font-medium">{order.payment_status}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Order Total</p>
                              <p className="font-bold text-lg">₹{order.totalAmt.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Order Date</p>
                              <p className="text-gray-600 text-sm">{formatDate(order.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center text-base border-b pb-2">
                          <FiPackage className="mr-2 text-rose-600" /> Product Details
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colour</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                                      {order.product_details.image && order.product_details.image.length > 0 ? (
                                        <img
                                          className="h-full w-full object-cover"
                                          src={getImageUrl(order.product_details.image[0])}
                                          alt={order.product_details.name}
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://via.placeholder.com/80";
                                          }}
                                        />
                                      ) : (
                                        <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                                          <FiPackage className="text-gray-500" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{order.product_details.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {order.product_details.size}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div className="flex items-center">
                                    {renderColorIndicator(order.product_details.color)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  ₹{order.productId.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {order.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  ₹{(order.productId.price * order.quantity).toFixed(2)}
                                </td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="5" className="px-6 py-3 text-right text-sm font-medium text-gray-500">Subtotal</td>
                                <td className="px-6 py-3 text-right text-sm font-bold">₹{order.subTotalAmt.toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td colSpan="5" className="px-6 py-3 text-right text-sm font-medium text-gray-500">Total</td>
                                <td className="px-6 py-3 text-right text-lg font-bold text-rose-600">₹{order.subTotalAmt.toFixed(2)}</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>

                      {/* Status Update Dropdown */}
                      <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                        <div className="relative">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.orderId, e.target.value)}
                            disabled={updatingStatus === order._id}
                            className="px-4 py-2 border rounded-lg text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <FiChevronDown className="text-gray-500" size={16} />
                          </div>
                        </div>

                        {updateMessage[order._id] && (
                          <div className={`text-sm ${updateMessage[order._id].includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                            {updateMessage[order._id]}
                          </div>
                        )}

                        {updatingStatus === order._id && (
                          <div className="text-sm text-gray-500">Updating...</div>
                        )}
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