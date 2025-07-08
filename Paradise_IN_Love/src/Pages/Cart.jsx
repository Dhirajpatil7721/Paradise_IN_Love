


// import React, { useEffect, useState } from 'react'; 
// import { FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/cart/get', {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Cache-Control': 'no-cache',
//             Pragma: 'no-cache',
//           },
//         });

//         if (!response.ok) throw new Error('Failed to fetch cart data');

//         const json = await response.json();
//         const cartData = json.data || [];

//        const formattedCartItems = cartData
//   .filter(item => item.productId) // skip items with null productId
//   .map(item => ({
//     id: item._id,
//     name: item.productId.name,
//     image: item.productId.image,
//     price: item.productId.price,
//     description: item.productId.description,
//     quantity: item.quantity || 1,
//     fullProduct: item.productId,
//   }));


//         setCartItems(formattedCartItems.reverse());
//       } catch (error) {
//         console.error('Error fetching cart data:', error.message);
//         toast.error("Failed to fetch cart data");
//       }
//     };

//     fetchCartData();
//   }, []);
//   console.log(cartItems);
  

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/cart/delete-cart-item', {
//         method: 'DELETE',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ _id: id }),
//       });

//       if (!response.ok) throw new Error('Failed to delete cart item');

//       setCartItems(prev => prev.filter(item => item.id !== id));
//       toast.success("Item deleted successfully");
//     } catch (error) {
//       console.error('Delete error:', error.message);
//       toast.error("Error deleting item");
//     }
//   };

//   const updateQuantity = async (id, quantity) => {
//     if (quantity < 1) return;

//     try {
//       const response = await fetch('http://localhost:8080/api/cart/update-qty', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({
//           _id: id,
//           qty: quantity.toString()
//         })
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setCartItems(prev =>
//           prev.map(item => (item.id === id ? { ...item, quantity } : item))
//         );
//       } else {
//         toast.error(data.message || 'Failed to update quantity');
//       }
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//       toast.error("Quantity update failed");
//     }
//   };

//   const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

//   const handlePlaceOrder = async () => {
//     try {
//       const addressId = "default-address-id"; // Replace with dynamic addressId if needed
//       const totalAmt = parseFloat(total);
//       const subTotalAmt = totalAmt;

//       const list_items = cartItems.map(item => ({
//         productId: {
//           _id: item.fullProduct._id
//         },
//         quantity: item.quantity,
//         size: "M" // Replace with dynamic size if available
//       }));

//       const res = await fetch("http://localhost:8080/api/order/place", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           list_items,
//           totalAmt,
//           subTotalAmt,
//           addressId,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         toast.success("Order placed successfully!");
//         setCartItems([]);
//       } else {
//         toast.error(data.message || "Failed to place order");
//       }
//     } catch (err) {
//       console.error("Order Error:", err);
//       toast.error("Order placement failed");
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
//     >
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="mt-10 max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <motion.h2
//             initial={{ y: -20 }}
//             animate={{ y: 0 }}
//             className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
//           >
//             Your Shopping Cart
//           </motion.h2>
//           <p className="text-gray-600 mt-2">Review your selected items</p>
//         </div>

//         <AnimatePresence>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden"
//           >
//             {cartItems.length === 0 ? (
//               <div className="text-center p-8 text-gray-500">Your cart is empty.</div>
//             ) : (
//               cartItems.map(item => (
//                 <motion.div
//                   key={item.id}
//                   layout
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="flex flex-col sm:flex-row gap-4 p-6 border-b border-gray-100 last:border-0 bg-white rounded-xl shadow"
//                 >
//                   <div className="flex-shrink-0 w-full max-w-xs sm:max-w-sm h-auto">
//                     <img
//                       src={Array.isArray(item.image) ? item.image[0] : item.image}
//                       alt={item.name}
//                       className="w-full h-auto object-cover rounded-xl shadow-sm"
//                     />
//                   </div>

//                   <div className="flex-grow flex flex-col justify-between">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
//                         <p className="text-gray-500 text-sm mt-1">{item.description}</p>
//                       </div>
//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         className="text-gray-400 hover:text-red-500 transition-colors"
//                       >
//                         <FiTrash2 size={20} />
//                       </button>
//                     </div>

//                     <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
//                       <div className="flex items-center border border-gray-200 rounded-full">
//                         <button
//                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                           className="px-3 py-1 text-gray-500 hover:text-pink-600"
//                         >
//                           <FiChevronDown />
//                         </button>
//                         <span className="px-3 text-gray-700">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           className="px-3 py-1 text-gray-500 hover:text-pink-600"
//                         >
//                           <FiChevronUp />
//                         </button>
//                       </div>

//                       <div className="text-right">
//                         <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
//                         <p className="text-lg font-bold text-pink-600">
//                           ₹{(item.price * item.quantity).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             )}

//             {/* Summary */}
//             <motion.div layout className="p-6 bg-gray-50">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-gray-800">Total</h3>
//                 <p className="text-2xl font-bold text-pink-600">₹{total}</p>
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   onClick={handlePlaceOrder}
//                   className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium shadow-md transition-all"
//                 >
//                   Place Order (COD)
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// };

// export default Cart;


//Simple_______________
// import React, { useEffect, useState } from 'react';

// import { FiTrash2, FiChevronDown, FiChevronUp, FiShoppingCart, FiHeart } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import emptycart from '../assets/Cart.gif';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('http://localhost:8080/api/cart/get', {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Cache-Control': 'no-cache',
//             Pragma: 'no-cache',
//           },
//         });

//         if (!response.ok) throw new Error('Failed to fetch cart data');

//         const json = await response.json();
//         const cartData = json.data || [];

//         // const formattedCartItems = cartData.map(item => ({
//         //   id: item._id,
//         //   name: item.productId.name,
//         //   image: item.productId.image,
//         //   price: item.productId.price,
//         //   description: item.productId.description,
//         //   quantity: item.quantity || 1,
//         //   fullProduct: item.productId,
//         // })); 
// const formattedCartItems = cartData
//   .filter(item => item.productId) // skip items with null productId
//   .map(item => ({
//     id: item._id,
//     name: item.productId.name,
//     image: item.productId.image,
//     price: item.productId.price,
//     description: item.productId.description,
//     quantity: item.quantity || 1,
//     fullProduct: item.productId,
//   }));

//         setCartItems(formattedCartItems.reverse());
//       } catch (error) {
//         toast.error("Failed to fetch cart data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCartData();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/cart/delete-cart-item', {
//         method: 'DELETE',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ _id: id }),
//       });

//       if (!response.ok) throw new Error('Failed to delete cart item');

//       setCartItems(prev => prev.filter(item => item.id !== id));
//       toast.success("Item removed from cart");
//     } catch {
//       toast.error("Error removing item");
//     }
//   };

//   const updateQuantity = async (id, quantity) => {
//     if (quantity < 1) return;

//     try {
//       const response = await fetch('http://localhost:8080/api/cart/update-qty', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ _id: id, qty: quantity.toString() }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setCartItems(prev =>
//           prev.map(item => (item.id === id ? { ...item, quantity } : item))
//         );
//       } else {
//         toast.error(data.message || 'Failed to update quantity');
//       }
//     } catch {
//       toast.error("Quantity update failed");
//     }
//   };

//   const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8"
//     >
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="max-w-6xl mx-auto mt-20">
//         <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-10">
//           <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
//             Your Shopping Cart
//           </h1>
//           <p className="text-gray-600 mt-2 text-sm sm:text-base">
//             {cartItems.length > 0 ? `You have ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart` : 'Your fashion journey awaits'}
//           </p>
//         </motion.div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
//           </div>
//         ) : (
//           <AnimatePresence mode="wait">
//             <motion.div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               {cartItems.length === 0 ? (
//                 <div className="text-center p-8 sm:p-12">
//                   <img src={emptycart} className="mx-auto max-w-xs" alt="Empty Cart" />
//                   <h3 className="text-lg font-medium text-gray-700 mt-4">Your cart is empty</h3>
//                   <p className="text-gray-500 mt-2 mb-6">Start adding some amazing fashion items!</p>
//                   <button
//                     onClick={() => navigate('/shopnow')}
//                     className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium transition"
//                   >
//                     Browse Products
//                   </button>
//                 </div>
//               ) : (
//                 <div className="divide-y divide-gray-100">
//                   {cartItems.map((item, index) => (
//                     <motion.div
//                       key={item.id}
//                       className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 hover:bg-gray-50"
//                     >
//                       <div className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 sm:h-40">
//                         <img
//                           src={Array.isArray(item.image) ? item.image[0] : item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                       </div>
//                       <div className="flex-grow flex flex-col justify-between">
//                         <div className="flex justify-between">
//                           <div>
//                             <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                             <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
//                           </div>
//                           <div className="flex items-start gap-2">
//                             {/* <FiHeart className="text-gray-400 hover:text-pink-500 cursor-pointer" /> */}
//                             <FiTrash2
//                               onClick={() => handleDelete(item.id)}
//                               className="text-gray-400 hover:text-red-500 cursor-pointer"
//                             />
//                           </div>
//                         </div>
//                         <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
//                           <div className="flex items-center gap-3">
//                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
//                               <FiChevronDown />
//                             </button>
//                             <span className="text-gray-800 font-medium">{item.quantity}</span>
//                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
//                               <FiChevronUp />
//                             </button>
//                           </div>
//                           <p className="text-pink-600 font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
//                           <button
//                             onClick={() => navigate('/buynow', { state: { product: item } })}
//                             className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-md"
//                           >
//                             Buy Now
//                           </button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}

//               {cartItems.length > 0 && (
//                 <div className="p-6 border-t border-gray-100">
//                   <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800">Subtotal</h3>
//                       <p className="text-2xl font-bold text-pink-600">₹{total}</p>
//                     </div>
//                     <div className="flex gap-4">
//                       <button
//                         onClick={() => navigate('/shopnow')}
//                         className="border border-pink-500 text-pink-600 hover:bg-pink-50 px-6 py-2 rounded-md"
//                       >
//                         Continue Shopping
//                       </button>
//                       {/* <button className="bg-pink-600 text-white px-6 py-2 rounded-md">Checkout</button> */}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default Cart;



//Responsive All
import React, { useEffect, useState } from 'react';
import { FiTrash2, FiChevronDown, FiChevronUp, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import emptycart from '../assets/Cart.gif';  

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/cart/get', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch cart data');

        const json = await response.json();
        const cartData = json.data || [];

        const formattedCartItems = cartData
          .filter(item => item.productId)
          .map(item => ({
            id: item._id,
            name: item.productId.name,
            image: item.productId.image,
            price: item.productId.price,
            description: item.productId.description,
            quantity: item.quantity || 1,
            fullProduct: item.productId,
          }));

        setCartItems(formattedCartItems.reverse());
      } catch (error) {
        toast.error("Failed to fetch cart data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/api/cart/delete-cart-item', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id }),
      });

      if (!response.ok) throw new Error('Failed to delete cart item');

      setCartItems(prev => prev.filter(item => item.id !== id));
      toast.success("Item removed from cart");
    } catch {
      toast.error("Error removing item");
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      const response = await fetch('http://localhost:8080/api/cart/update-qty', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ _id: id, qty: quantity.toString() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCartItems(prev =>
          prev.map(item => (item.id === id ? { ...item, quantity } : item))
        );
      } else {
        toast.error(data.message || 'Failed to update quantity');
      }
    } catch {
      toast.error("Quantity update failed");
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-4 sm:py-8 px-2 sm:px-4 lg:px-8"
    >
      <ToastContainer position="top-right" autoClose={50} />

      <div className="max-w-6xl mx-auto mt-16 sm:mt-20">
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="text-center mb-6 sm:mb-10"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            {cartItems.length > 0 ? `You have ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart` : 'Your fashion journey awaits'}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-48 sm:h-64">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl overflow-hidden">
              {cartItems.length === 0 ? (
                <div className="text-center p-6 sm:p-8 md:p-12">
                  <img 
                    src={emptycart} 
                    className="mx-auto w-48 sm:w-64 md:max-w-xs" 
                    alt="Empty Cart" 
                  />
                  <h3 className="text-base sm:text-lg font-medium text-gray-700 mt-3 sm:mt-4">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2 mb-4 sm:mb-6">
                    Start adding some amazing fashion items!
                  </p>
                  <button
                    onClick={() => navigate('/shopnow')}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 hover:bg-gray-50"
                    >
                      <div className="flex-shrink-0 w-full sm:w-28 md:w-32 lg:w-40 h-24 sm:h-28 md:h-32 lg:h-40">
                        <img
                          src={Array.isArray(item.image) ? item.image[0] : item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div className="pr-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <FiTrash2
                              onClick={() => handleDelete(item.id)}
                              className="text-gray-400 hover:text-red-500 cursor-pointer text-sm sm:text-base"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col xs:flex-row justify-between items-center mt-2 sm:mt-3 gap-2 sm:gap-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1"
                            >
                              <FiChevronDown className="text-sm sm:text-base" />
                            </button>
                            <span className="text-gray-800 font-medium text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1"
                            >
                              <FiChevronUp className="text-sm sm:text-base" />
                            </button>
                          </div>
                          <p className="text-pink-600 font-bold text-sm sm:text-base md:text-lg">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => navigate('/buynow', { state: { product: item } })}
                            className="bg-pink-500 hover:bg-pink-600 text-white px-2 py-1 sm:px-4 sm:py-1 rounded-md text-xs sm:text-sm"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {cartItems.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                    <div className="text-center sm:text-left">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                        Subtotal
                      </h3>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600">
                        ₹{total}
                      </p>
                    </div>
                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-4 w-full xs:w-auto">
                      <button
                        onClick={() => navigate('/shopnow')}
                        className="border border-pink-500 text-pink-600 hover:bg-pink-50 px-4 py-1 sm:px-6 sm:py-2 rounded-md text-xs sm:text-sm"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;