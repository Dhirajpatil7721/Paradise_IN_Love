import React, { useEffect, useState } from 'react';
import { FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
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

        const formattedCartItems = cartData.map(item => ({
          id: item._id,
          name: item.productId.name,
          image: item.productId.image,
          price: item.productId.price,
          description: item.productId.description,
          quantity: item.quantity || 1,
        }));

        setCartItems(formattedCartItems.reverse());
      } catch (error) {
        console.error('Error fetching cart data:', error.message);
        toast.error("Failed to fetch cart data");
      }
    };

    fetchCartData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/api/cart/delete-cart-item', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!response.ok) throw new Error('Failed to delete cart item');

      setCartItems(prev => prev.filter(item => item.id !== id));
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error('Delete error:', error.message);
      toast.error("Error deleting item");
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      const response = await fetch('http://localhost:8080/api/cart/update-qty', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          _id: id,
          qty: quantity.toString()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCartItems(prev =>
          prev.map(item => (item.id === id ? { ...item, quantity } : item))
        );
      } else {
        toast.error(data.message || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error("Quantity update failed");
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="mt-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            Your Shopping Cart
          </motion.h2>
          <p className="text-gray-600 mt-2">Review your selected items</p>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {cartItems.length === 0 ? (
              <div className="text-center p-8 text-gray-500">Your cart is empty.</div>
            ) : (
              cartItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-4 p-6 border-b border-gray-100 last:border-0 bg-white rounded-xl shadow"
                >
                  <div className="flex-shrink-0 w-full max-w-xs sm:max-w-sm h-auto">
                    <img
                      src={Array.isArray(item.image) ? item.image[0] : item.image}
                      alt={item.name}
                      className="w-full h-auto object-cover rounded-xl shadow-sm"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-500 hover:text-pink-600"
                        >
                          <FiChevronDown />
                        </button>
                        <span className="px-3 text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-500 hover:text-pink-600"
                        >
                          <FiChevronUp />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                        <p className="text-lg font-bold text-pink-600">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {/* Summary */}
            <motion.div layout className="p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Total</h3>
                <p className="text-2xl font-bold text-pink-600">₹{total}</p>
              </div>

              {/* <div className="flex justify-center">
                <Link
                  to="/placeorder"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium shadow-md transition-all"
                >
                  Place Order
                </Link>
              </div> */}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Cart;
