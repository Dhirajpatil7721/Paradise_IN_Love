import React, { useEffect, useState } from 'react';
import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import emptywish from '../assets/wishlist.gif';
  
const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState('');

  // Fetch Wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/wishlist/get", {
          withCredentials: true,
        });

        if (res.data.success) {
          setWishlist(res.data.wishlist);
        } else {
          setError(res.data.message || 'Failed to fetch wishlist');
          toast.error(res.data.message || "Failed to fetch wishlist");
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError('Something went wrong');
        toast.error("Error fetching wishlist");
      }
    };

    fetchWishlist();
  }, []);

  // Remove from Wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.delete("http://localhost:8080/api/wishlist/remove", {
        data: { productId },
        withCredentials: true,
      });

      if (res.data.success) {
        setWishlist(prev => prev.filter(item => item._id !== productId));
        toast.success("Item removed from wishlist");
      } else {
        toast.error(res.data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast.error("Something went wrong while removing item");
    }
  };

  // Add to Cart
  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/cart/create",
        { productId },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success("Product added to cart!");
      } else {
        toast.error(res.data.message || "Add to cart failed");
      }
    } catch (err) {
      console.error("Error adding to cart:", err.message);
      toast.error("Something went wrong while adding to cart");
    }
  };

  // Clear All Wishlist
  const clearWishlist = async () => {
    try {
      const res = await axios.delete("http://localhost:8080/api/wishlist/clear", {
        withCredentials: true,
      });

      if (res.data.success) {
        setWishlist([]); // clear wishlist on frontend
        toast.success("Wishlist cleared!");
      } else {
        toast.error(res.data.message || "Failed to clear wishlist");
      }
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      toast.error("Something went wrong while clearing wishlist");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <ToastContainer  autoClose={50}/>
      <div className="mt-10 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text">
            Your Wishlist
          </h2>
          <p className="text-gray-600 mt-2">Items you've saved to buy later</p>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-4"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {wishlist.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-lg">
              <img
                src={emptywish}
                alt="Empty Wishlist"
                className="mx-auto w-full max-w-xs h-auto object-contain"
              />
              {/* <Link>
                <button>Add wishlist</button>
              </Link> */}

              <h3 className="text-xl font-semibold text-gray-700 mt-6">No items in wishlist</h3>
              <p className="text-gray-500">Browse and add your favorites!</p>
               <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/shopnow')}
                    className="bg-gradient-to-r mt-5 from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    Browse Products
                  </motion.button>
            
            </div>

          ) : (
            wishlist.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row items-center gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-pink-600 font-semibold text-lg">₹{item.price.toFixed(2)}</span>
                    <div className="flex gap-4">
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <FiTrash2 size={18} />
                      </button>
                      <button
                        onClick={() => addToCart(item._id)}
                        className="text-gray-500 hover:text-green-600 transition"
                      >
                        <FiShoppingCart size={18} />
                      </button>
                      <button
                        onClick={() => navigate('/buynow', { state: { product: item } })}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Wishlist;

// import React, { useEffect, useState } from 'react';
// import { FiHeart, FiTrash2, FiShoppingCart, FiArrowRight } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link, useNavigate } from 'react-router-dom';
// import emptywish from '../assets/wishlist.gif';

// const Wishlist = () => {
//   const navigate = useNavigate();
//   const [wishlist, setWishlist] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch Wishlist
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         setIsLoading(true);
//         const res = await axios.get("http://localhost:8080/api/wishlist/get", {
//           withCredentials: true,
//         });

//         if (res.data.success) {
//           setWishlist(res.data.wishlist);
//         } else {
//           setError(res.data.message || 'Failed to fetch wishlist');
//           toast.error(res.data.message || "Failed to fetch wishlist");
//         }
//       } catch (err) {
//         console.error("Error fetching wishlist:", err);
//         setError('Something went wrong');
//         toast.error("Error fetching wishlist");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   // Remove from Wishlist
//   const removeFromWishlist = async (productId) => {
//     try {
//       const res = await axios.delete("http://localhost:8080/api/wishlist/remove", {
//         data: { productId },
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         setWishlist(prev => prev.filter(item => item._id !== productId));
//         toast.success("Item removed from wishlist");
//       } else {
//         toast.error(res.data.message || "Failed to remove item");
//       }
//     } catch (error) {
//       console.error("Error removing item from wishlist:", error);
//       toast.error("Something went wrong while removing item");
//     }
//   };

//   // Add to Cart
//   const addToCart = async (productId) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/cart/create",
//         { productId },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("Product added to cart!");
//       } else {
//         toast.error(res.data.message || "Add to cart failed");
//       }
//     } catch (err) {
//       console.error("Error adding to cart:", err.message);
//       toast.error("Something went wrong while adding to cart");
//     }
//   };

//   // Clear All Wishlist
//   const clearWishlist = async () => {
//     try {
//       const res = await axios.delete("http://localhost:8080/api/wishlist/clear", {
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         setWishlist([]);
//         toast.success("Wishlist cleared!");
//       } else {
//         toast.error(res.data.message || "Failed to clear wishlist");
//       }
//     } catch (error) {
//       console.error("Error clearing wishlist:", error);
//       toast.error("Something went wrong while clearing wishlist");
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8"
//     >
//       <ToastContainer 
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-center mb-8 sm:mb-12"
//         >
//           <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
//             Your Wishlist
//           </h2>
//           <p className="text-gray-600 mt-2 text-sm sm:text-base">
//             {wishlist.length > 0 
//               ? `You have ${wishlist.length} saved item${wishlist.length !== 1 ? 's' : ''}`
//               : 'Your saved items will appear here'}
//           </p>
//         </motion.div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
//           </div>
//         ) : (
//           <AnimatePresence mode="wait">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ type: "spring", stiffness: 100 }}
//               className="bg-white rounded-2xl shadow-sm overflow-hidden"
//             >
//               {wishlist.length === 0 ? (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-center p-8 sm:p-12"
//                 >
//                   <div className="flex justify-center">
//                     <img 
//                       src={emptywish} 
//                       alt="Empty wishlist" 
//                       className="w-48 sm:w-64 h-auto"
//                     />
//                   </div>
//                   <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mt-6">
//                     Your wishlist is empty
//                   </h3>
//                   <p className="text-gray-500 text-sm sm:text-base mt-2 mb-6">
//                     Start adding items you love!
//                   </p>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => navigate('/shopnow')}
//                     className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all"
//                   >
//                     Browse Products
//                   </motion.button>
//                 </motion.div>
//               ) : (
//                 <>
//                   <div className="p-4 sm:p-6 flex justify-between items-center border-b border-gray-100">
//                     <h3 className="text-lg font-medium text-gray-700">
//                       {wishlist.length} Items
//                     </h3>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={clearWishlist}
//                       className="text-sm text-red-500 hover:text-red-600 px-3 py-1 border border-red-200 rounded-full hover:bg-red-50 transition-colors"
//                     >
//                       Clear All
//                     </motion.button>
//                   </div>
                  
//                   <div className="divide-y divide-gray-100">
//                     {wishlist.map((item) => (
//                       <motion.div
//                         key={item._id}
//                         layout
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.95 }}
//                         transition={{ type: "spring", stiffness: 150 }}
//                         className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
//                       >
//                         <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
//                           <div 
//                             className="flex-shrink-0 w-full sm:w-32 h-32 cursor-pointer"
//                             onClick={() => navigate(`/product/${item._id}`)}
//                           >
//                             <img
//                               src={item.image}
//                               alt={item.name}
//                               className="w-full h-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                               loading="lazy"
//                             />
//                           </div>

//                           <div className="flex-grow flex flex-col justify-between">
//                             <div>
//                               <h3 
//                                 className="text-lg font-semibold text-gray-800 line-clamp-2 cursor-pointer hover:text-pink-600 transition-colors"
//                                 onClick={() => navigate(`/product/${item._id}`)}
//                               >
//                                 {item.name}
//                               </h3>
//                               <p className="text-gray-500 text-sm mt-1 line-clamp-2">
//                                 {item.description}
//                               </p>
//                             </div>

//                             <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                               <div className="flex items-center gap-4">
//                                 <span className="text-lg font-bold text-pink-600">
//                                   ₹{item.price.toFixed(2)}
//                                 </span>
                                
//                                 <div className="flex gap-2">
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       removeFromWishlist(item._id);
//                                     }}
//                                     className="p-2 text-gray-400 hover:text-red-500 transition-colors"
//                                     aria-label="Remove from wishlist"
//                                   >
//                                     <FiTrash2 size={18} />
//                                   </button>
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       addToCart(item._id);
//                                     }}
//                                     className="p-2 text-gray-500 hover:text-green-600 transition-colors"
//                                     aria-label="Add to cart"
//                                   >
//                                     <FiShoppingCart size={18} />
//                                   </button>
//                                 </div>
//                               </div>

//                               <motion.button
//                                 whileHover={{ scale: 1.03 }}
//                                 whileTap={{ scale: 0.97 }}
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   navigate('/buynow', { state: { product: item } });
//                                 }}
//                                 className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
//                               >
//                                 Buy Now <FiArrowRight size={16} />
//                               </motion.button>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default Wishlist;