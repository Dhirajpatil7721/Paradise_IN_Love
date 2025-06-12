import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/order/order-list', {
          withCredentials: true, // needed if using cookie-based auth
        });
        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl text-center font-bold mb-6">Your Orders</h1>

      <div className="flex overflow-x-auto pb-4 gap-4">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 border">
              <div className="flex mt-3">
                <img
                  src={order.product_details?.image?.[0] || 'https://via.placeholder.com/50'}
                  alt="Product"
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-3">
                  <h3 className="font-medium">{order.product_details?.name}</h3>
                  <div className="text-gray-500 text-sm space-y-1">
                    <p>Qty: 1</p> {/* You can update this if quantity is stored */}
                    <p>Size: {order.product_details?.size || 'N/A'}</p>
                    <p className="text-blue-600 font-medium">₹{order.subTotalAmt}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default UserOrders;
