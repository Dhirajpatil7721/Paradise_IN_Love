import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderSkeleton from '../Loaders/OrderSkeleton';
import emptyOrders from '../assets/Orders.gif';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_RENDER;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/order/order-list`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setOrders(res.data.data);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const CancelOrder = async (orderId) => {
    try {
      const res = await fetch(`${API_URL}/order/cancel-order`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Order cancelled successfully');
        setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
      } else {
        toast.error(data.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Cancel Order Error:', error);
      toast.error('Something went wrong while cancelling');
    }
  };
  console.log(orders);

  return (
    <div className="p-4 mt-20 max-w-7xl mx-auto">
      {/* <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Your Order History</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Here's a summary of all your recent purchases and order details
        </p>
      </div> */}
      <div class="text-center mb-10 px-4">
        <div class="relative inline-block">
          <h1 class="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2 animate-pulse">
            Your Order History
          </h1>
          <div class="absolute -bottom-1 left-0 right-0 mx-auto h-0.5 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-transparent w-1/2"></div>
        </div>

        <div class="max-w-md mx-auto">
          <p class="text-gray-600 mt-5 text-sm sm:text-base leading-snug">
            Here's a summary of all your recent purchases and order details.
          </p>

        </div>

        <div class="mt-6 flex justify-center">
          <div class="h-px w-16 bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <OrderSkeleton />
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-3xl mx-auto">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b bg-gray-50 flex flex-wrap justify-between items-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Order #{index + 1}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium mt-2 sm:mt-0 ${order.status === 'Delivered'
                  ? 'bg-green-100 text-green-800'
                  : order.status === 'Cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {order.status || 'Processing'}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Image */}
                <div className="w-full sm:w-24 md:w-28 flex-shrink-0">
                  <img
                    src={order.product_details?.image?.[0] || 'https://placehold.co/150'}
                    alt="Product"
                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150'; }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-gray-900">
                        {order.product_details?.name || 'Product Name'}
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                        <span><strong>Qty:</strong> {order.quantity}</span>
                        <span><strong>Size:</strong> {order.product_details?.size || 'N/A'}</span>
                        <span><strong>Colour:</strong> {order.product_details?.color || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="text-right mt-4 sm:mt-0">
                      <p className="text-base font-semibold text-blue-600">₹{order.subTotalAmt}</p>
                      <p className="text-sm text-gray-500">Includes shipping</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    {order.status !== 'shipped' && order.status !== 'delivered' && (
                      <button
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition"
                        onClick={() => CancelOrder(order.orderId)}
                      >
                        Cancel Order
                      </button>
                    )}

                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-5 py-3 bg-gray-50 border-t text-right">
                <p className="text-sm text-gray-600">
                  Total: <span className="font-semibold text-gray-900">₹{order.totalAmount || order.subTotalAmt}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center max-w-2xl mx-auto">
          <img src={emptyOrders} alt="No Orders" className="w-40 h-40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">You haven't placed any orders. When you do, they'll appear here.</p>
          <Link to="/shopnow">
            <button className="px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserOrders;




