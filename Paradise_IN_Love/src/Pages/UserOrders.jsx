// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function UserOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get('http://localhost:8080/api/order/order-list', {
//           withCredentials: true, // needed if using cookie-based auth
//         });
//         if (res.data.success) {
//           setOrders(res.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-4 mt-20">
//       <h1 className="text-2xl text-center font-bold mb-6">Your Orders</h1>

//       <div className="flex overflow-x-auto pb-4 gap-4">
//         {orders.length > 0 ? (
//           orders.map((order, index) => (
//             <div key={index} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 border">
//               <div className="flex mt-3">
//                 <img
//                   src={order.product_details?.image?.[0] || 'https://via.placeholder.com/50'}
//                   alt="Product"
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div className="ml-3">
//                   <h3 className="font-medium">{order.product_details?.name}</h3>
//                   <div className="text-gray-500 text-sm space-y-1">
//                     <p>Qty: 1</p> {/* You can update this if quantity is stored */}
//                     <p>Size: {order.product_details?.size || 'N/A'}</p>
//                     <p className="text-blue-600 font-medium">₹{order.subTotalAmt}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center w-full">No orders found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserOrders;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function UserOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get('http://localhost:8080/api/order/order-list', {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           console.log("Fetched Orders:", res.data.data); // 👈 Log to verify structure
//           setOrders(res.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-4 mt-20">
//       <h1 className="text-2xl text-center font-bold mb-6">Your Orders</h1>

//       <div className="flex overflow-x-auto pb-4 gap-4">
//         {orders.length > 0 ? (
//           orders.map((order, index) => (
//             <div key={index} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 border">
//               <div className="flex mt-3">
//                 <img
//                   src={order.product_details?.image?.[0] || 'https://via.placeholder.com/50'}
//                   alt="Product"
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div className="ml-3">
//                   <h3 className="font-medium">{order.product_details?.name}</h3>
//                   <div className="text-gray-500 text-sm space-y-1">
//                     <p>Qty: {order.quantity}</p>
//                     <p>Size: {order.product_details?.size || 'N/A'}</p>
//                     <p className="text-blue-600 font-medium">₹{order.subTotalAmt}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center w-full">No orders found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserOrders;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //Fetch Orders 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8080/api/order/order-list', {
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
  console.log(orders);

const CancelOrder = async (orderId) => {
  const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
  if (!confirmCancel) return;

  try {
    const res = await axios.delete(`http://localhost:8080/api/order/cancel-order/${orderId}`, {
      withCredentials: true,
    });

    if (res.data.success) {
      toast.success("Order cancelled successfully");
      setOrders(prev => prev.filter(order => order.orderId !== orderId));
    } else {
      toast.error(res.data.message || "Cancel failed");
    }
  } catch (err) {
    console.error("Cancel Order Error:", err);
    toast.error("Something went wrong");
  }
};

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 mt-20 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Your Order History</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Here's a summary of all your recent purchases and order details
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-3xl mx-auto">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-5 border-b border-gray-100 bg-gray-50">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order #{index + 1}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on {order.orderDate ? formatDate(order.orderDate) : 'N/A'}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {order.status || 'Processing'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {/* <img
                      src={order.product_details?.image?.[0] || 'https://via.placeholder.com/150'}
                      alt="Product"
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                    /> */}
                    <img
                      src={order.product_details?.image?.[0] || 'https://placehold.co/150'}
                      alt="Product"
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150'; }}
                    />

                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{order.product_details?.name || 'Product Name'}</h4>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Qty:</span> {order.quantity}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Size:</span> {order.product_details?.size || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Color:</span> {order.color || 'N/A'}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 text-right">
                        <p className="text-lg font-bold text-blue-600">₹{order.subTotalAmt}</p>
                        <p className="text-sm text-gray-500 mt-1">Includes shipping</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {/* <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                        Track Order
                      </button> */}
                      <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors" onClick={() => CancelOrder(orders.orderId)}>
                        Cancel Order
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-right">
                <p className="text-sm text-gray-600">
                  Total: <span className="font-semibold text-gray-900">₹{order.totalAmount || order.subTotalAmt}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center max-w-2xl mx-auto">
          <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className="mt-5 text-xl font-medium text-gray-900">No orders yet</h3>
          <p className="mt-2 text-gray-500">
            You haven't placed any orders. When you do, they'll appear here.
          </p>
          <div className="mt-6">
            <Link to='/shopnow'>

              <button className="px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrders;