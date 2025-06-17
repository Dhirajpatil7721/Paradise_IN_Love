import React from 'react';
import { motion } from 'framer-motion';
import { FaRegHeart, FaStar, FaShoppingCart, FaBolt, FaWhatsapp } from 'react-icons/fa';

const Causal = () => {
  return (
    <div class="mt-10">
      <div class="mt-10">
        <div className='mt-20'>
          <h1 className='text-center'>Casual</h1>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative"
            >
              {/* Wishlist */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => alert('Added to Wishlist')}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-md bg-white text-gray-400"
              >
                <FaRegHeart size={16} />
              </motion.button>

              {/* Discount Badge */}
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                20% OFF
              </div>

              {/* Image */}
              <div
                className="relative w-full h-52 overflow-hidden cursor-pointer"
                onClick={() => alert('Buy Now')}
              >
                <motion.img
                  src="https://via.placeholder.com/200x200.png?text=Product+Image"
                  alt="Static Product"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Details */}
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  Sample Product Name
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  This is a sample product description to show static content.
                </p>

                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={12}
                        className={i < 4 ? 'fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 ml-1">(132)</span>
                </div>

                <div className="pt-1">
                  <span className="text-sm font-bold text-pink-600">Rs. 800</span>
                  <span className="text-xs text-gray-500 line-through ml-1">
                    Rs. 1000
                  </span>
                </div>

                <div className="flex justify-between gap-2 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert('Added to Cart')}
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-400 hover:bg-gray-700 text-white px-2 py-1.5 rounded-md text-xs"
                  >
                    <FaShoppingCart size={12} />
                    <span>Cart</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert('Buying...')}
                    className="flex-1 flex items-center justify-center gap-1 bg-pink-500 hover:bg-pink-700 text-white px-2 py-1.5 rounded-md text-xs"
                  >
                    <FaBolt size={12} />
                    <span>Buy</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert('Opening WhatsApp')}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-md"
                  >
                    <FaWhatsapp size={12} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Causal;
