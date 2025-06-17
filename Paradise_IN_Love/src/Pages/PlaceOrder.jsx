// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   FiCreditCard,
//   FiDollarSign,
//   FiTruck,
//   FiUser,
//   FiMapPin
// } from 'react-icons/fi';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const PlaceOrder = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const orderData = location.state;

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [savedAddresses, setSavedAddresses] = useState([]);

//   useEffect(() => {
//     if (orderData) {
//       console.log("Order Data received:", orderData);
//     }
//   }, [orderData]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/api/address/get', { withCredentials: true })
//       .then((res) => {
//         const formattedAddresses = res.data.data.map((addr) => ({
//           id: addr._id,
//           fullAddress: `${addr.address_line}, ${addr.city}, ${addr.state}, ${addr.pincode}`
//         }));
//         setSavedAddresses(formattedAddresses);
//       })
//       .catch((err) => {
//         toast.error('Failed to fetch addresses.');
//         console.error('Error fetching addresses:', err);
//       });
//   }, []);

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     if (!selectedAddress) {
//       toast.error('Please select a shipping address.');
//       return;
//     }

//     const product = orderData.product;

//     const payload = {
//       list_items: [
//         {
//           productId: {
//             _id: product._id,
//             name: product.name,
//             image: product.imageUrl || '',
//             price: product.price,
//             discount: product.discount || 0
//           },
//           size: orderData.size,
//           quantity: orderData.quantity
//         }
//       ],
//       subTotalAmt: product.price * orderData.quantity,
//       totalAmt:
//         product.price * orderData.quantity -
//         (product.discount || 0 / 100) * (product.price * orderData.quantity),
//       addressId: selectedAddress.id
//     };

//     try {
//       setIsSubmitting(true);
//       const res = await axios.post(
//         'http://localhost:8080/api/order/cash-on-delivery',
//         payload,
//         { withCredentials: true }
//       );
//       toast.success('Order placed successfully!');
//       console.log('Order placed:', res.data);
//       navigate('/userorders');
//     } catch (error) {
//       toast.error('Failed to place order. Try again later.');
//       console.error('Order error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const product = orderData?.product || {};
//   const subtotal = product.mrp * orderData.quantity;
//   const discountAmt = (product.discount || 0 / 100) * subtotal;
//   const totalAmt = subtotal - discountAmt;




//   // const product = orderData?.product || {};
//   // const subtotal = product.mrp * orderData.quantity;
//   // const discountAmt = (product.discount || 0 / 100) * subtotal;
//   // const totalAmt = subtotal - discountAmt;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="mt-10 max-w-4xl mx-auto">
//         <motion.div
//           initial={{ y: -20 }}
//           animate={{ y: 0 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
//             Complete Your Order
//           </h2>
//           <p className="text-gray-600">Choose your address and place your romantic getaway</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-2xl shadow-xl overflow-hidden"
//         >
//           <form onSubmit={handlePlaceOrder} className="space-y-6 p-8">
//             {/* Shipping Address */}
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                 <FiMapPin className="text-pink-600" />
//                 Choose Shipping Address
//               </h3>
//               <div className="space-y-3">
//                 {savedAddresses.map((address) => (
//                   <label
//                     key={address.id}
//                     className={`block p-4 border-2 rounded-xl cursor-pointer ${selectedAddress?.id === address.id
//                       ? 'border-pink-500 bg-pink-50'
//                       : 'border-gray-200'
//                       }`}
//                   >
//                     <input
//                       type="radio"
//                       name="selectedAddress"
//                       className="hidden"
//                       value={address.id}
//                       onChange={() => setSelectedAddress(address)}
//                     />
//                     {address.fullAddress}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                 <FiCreditCard className="text-pink-600" />
//                 Payment Method
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <button type="button" className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-pink-400 transition-all">
//                   <FiDollarSign className="text-2xl text-gray-600 mb-2" />
//                   <span>Cash on Delivery</span>
//                 </button>
//                 <button type="button" disabled className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl opacity-50 cursor-not-allowed">
//                   <div className="text-2xl mb-2">UPI</div>
//                   <span>PhonePe/Google Pay</span>
//                 </button>
//                 <button type="button" disabled className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl opacity-50 cursor-not-allowed">
//                   <FiCreditCard className="text-2xl text-gray-600 mb-2" />
//                   <span>Credit/Debit Card</span>
//                 </button>
//               </div>
//             </div>

//             {/* Order Summary */}
//             {/* <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                 <FiTruck className="text-pink-600" />
//                 Order Summary
//               </h3>
//               <div className="bg-gray-50 rounded-xl p-4">
//                 <div className="flex justify-between py-2 border-b border-gray-200">
//                   <span>Price</span>
//                   <span className="font-medium">₹{subtotal}</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-200">
//                   <span>Discount</span>
//                   <span className="font-medium text-green-600">-₹{discountAmt}</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-200">
//                   <span>Shipping</span>
//                   <span className="font-medium">FREE</span>
//                 </div>
//                 <div className="flex justify-between py-2">
//                   <span className="font-semibold">Total</span>
//                   <span className="font-bold text-lg text-pink-600">₹{totalAmt}</span>
//                 </div>
//               </div>
//             </div> */}
//             {/* Order Summary */}
//             {/* Order Summary */}
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                 <FiTruck className="text-pink-600" />
//                 Order Summary
//               </h3>
//               <div className="bg-gray-50 rounded-xl p-4 space-y-2">
//                 <div className="flex justify-between border-b py-2">
//                   <span>MRP (per item)</span>
//                   <span className="text-l font-medium ">₹{product.price}</span>
//                 </div>
//                 <div className="flex justify-between border-b py-2">
//                   <span>Selling Price (per item)</span>
//                   <span className="font-medium text-gray-700">₹{product.mrp}</span>
//                 </div>
//                 <div className="flex justify-between border-b py-2">
//                   <span>Discount</span>
//                   <span className="text-green-600 font-medium">
//                     {/* ₹{product.mrp < product.price
//           ? (product.price - product.mrp).toFixed(2)
//           : 0} */}
//                     {product.discount}%
//                   </span>
//                 </div>
//                 <div className="flex justify-between border-b py-2">
//                   <span>Shipping</span>
//                   <span className="text-green-700 font-medium">FREE</span>
//                 </div>
//                 <div className="flex justify-between border-b py-2">
//                   <span>You Save (on {orderData.quantity} item{orderData.quantity > 1 ? 's' : ''})</span>
//                   <span className="text-green-600 font-medium">
//                     ₹{product.mrp < product.price
//                       ? ((product.price - product.mrp) * orderData.quantity).toFixed(2)
//                       : 0}
//                   </span>
//                 </div>
//                 <div className="flex justify-between py-2">
//                   <span className="font-semibold">Total Amount</span>
//                   <span className="font-bold text-lg text-pink-600">
//                     ₹{product.price * orderData.quantity}
//                   </span>
//                 </div>
//               </div>
//             </div>


//             {/* Place Order Button */}
//             <motion.button
//               type="submit"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               disabled={isSubmitting}
//               className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all ${isSubmitting
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
//                 }`}
//             >
//               {isSubmitting ? 'Processing...' : 'Place Order'}
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default PlaceOrder;




import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FiCreditCard,
  FiDollarSign,
  FiTruck,
  FiUser,
  FiMapPin
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    if (orderData) {
      console.log("Order Data received:", orderData);
    }
  }, [orderData]);
  console.log("Order Data received:", orderData.quantity);
  
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/address/get', { withCredentials: true })
      .then((res) => {
        const formattedAddresses = res.data.data.map((addr) => ({
          id: addr._id,
          fullAddress: `${addr.address_line}, ${addr.city}, ${addr.state}, ${addr.pincode}`
        }));
        setSavedAddresses(formattedAddresses);
      })
      .catch((err) => {
        toast.error('Failed to fetch addresses.');
        console.error('Error fetching addresses:', err);
      });
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      toast.error('Please select a shipping address.');
      return;
    }

    const product = orderData.product;

    const payload = {
      list_items: [
        {
          productId: {
            _id: product._id,
            name: product.name,
            image: product.imageUrl || '',
            price: product.price,
            discount: product.discount || 0
          },
          size: orderData.size,
          quantity: orderData.quantity
        }
      ],
      subTotalAmt: product.price * orderData.quantity,
      totalAmt:
        product.price * orderData.quantity -
        (product.discount || 0 / 100) * (product.price * orderData.quantity),
      addressId: selectedAddress.id
    };

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        'http://localhost:8080/api/order/cash-on-delivery',
        payload,
        { withCredentials: true }
      );
      toast.success('Order placed successfully!');
      console.log('Order placed:', res.data);
      navigate('/userorders');
    } catch (error) {
      toast.error('Failed to place order. Try again later.');
      console.error('Order error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const product = orderData?.product || {};
  // const subtotal = product.mrp * orderData.quantity;
  // const discountAmt = (product.discount || 0 / 100) * subtotal;
  // const totalAmt = subtotal - discountAmt;




  const product = orderData?.product || {};
  const subtotal = product.mrp * orderData.quantity;
  const discountAmt = (product.discount || 0 / 100) * subtotal;
  const totalAmt = subtotal - discountAmt;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="mt-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Complete Your Order
          </h2>
          <p className="text-gray-600">Choose your address and place your romantic getaway</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <form onSubmit={handlePlaceOrder} className="space-y-6 p-8">
            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FiMapPin className="text-pink-600" />
                Choose Shipping Address
              </h3>
              <div className="space-y-3">
                {savedAddresses.map((address) => (
                  <label
                    key={address.id}
                    className={`block p-4 border-2 rounded-xl cursor-pointer ${selectedAddress?.id === address.id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200'
                      }`}
                  >
                    <input
                      type="radio"
                      name="selectedAddress"
                      className="hidden"
                      value={address.id}
                      onChange={() => setSelectedAddress(address)}
                    />
                    {address.fullAddress}
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FiCreditCard className="text-pink-600" />
                Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button type="button" className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-pink-400 transition-all">
                  <FiDollarSign className="text-2xl text-gray-600 mb-2" />
                  <span>Cash on Delivery</span>
                </button>
                <button type="button" disabled className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl opacity-50 cursor-not-allowed">
                  <div className="text-2xl mb-2">UPI</div>
                  <span>PhonePe/Google Pay</span>
                </button>
                <button type="button" disabled className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl opacity-50 cursor-not-allowed">
                  <FiCreditCard className="text-2xl text-gray-600 mb-2" />
                  <span>Credit/Debit Card</span>
                </button>
              </div>
            </div>

            {/* Order Summary */}
            {/* <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FiTruck className="text-pink-600" />
                Order Summary
              </h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span>Price</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span>Discount</span>
                  <span className="font-medium text-green-600">-₹{discountAmt}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span>Shipping</span>
                  <span className="font-medium">FREE</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-pink-600">₹{totalAmt}</span>
                </div>
              </div>
            </div> */}
            {/* Order Summary */}
            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FiTruck className="text-pink-600" />
                Order Summary
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between border-b py-2">
                  <span>MRP (per item)</span>
                  <span className="text-l font-medium ">₹{product.price}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span>Selling Price (per item)</span>
                  <span className="font-medium text-gray-700">₹{product.mrp}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span>Discount</span>
                  <span className="text-green-600 font-medium">
                    {/* ₹{product.mrp < product.price
          ? (product.price - product.mrp).toFixed(2)
          : 0} */}
                    {product.discount}%
                  </span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span>Shipping</span>
                  <span className="text-green-700 font-medium">FREE</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span>You Save (on {orderData.quantity} item{orderData.quantity > 1 ? 's' : ''})</span>
                  <span className="text-green-600 font-medium">
                    ₹{product.mrp < product.price
                      ? ((product.price - product.mrp) * orderData.quantity).toFixed(2)
                      : 0}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-bold text-lg text-pink-600">
                    ₹{product.price * orderData.quantity}
                  </span>
                </div>
              </div>
            </div>


            {/* Place Order Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
                }`}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlaceOrder;
