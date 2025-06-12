import React, { useEffect, useState } from 'react';
import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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
      <ToastContainer />
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
              <FiHeart className="mx-auto text-5xl text-pink-400 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700">No items in wishlist</h3>
              <p className="text-gray-500">Browse and add your favorites!</p>
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
