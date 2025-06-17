import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaBolt, FaWhatsapp, FaStar, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image1);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    if (isHovered) {
      timeout = setTimeout(() => setCurrentImage(product.image2), 500);
    } else {
      setCurrentImage(product.image1);
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [isHovered, product.image1, product.image2]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    alert(`Added ${product.name} to cart`);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate('/buynow');
  };

  const handleWhatsapp = (e) => {
    e.stopPropagation();
    const phoneNumber = '8010540275';
    const message = encodeURIComponent(`Hello, I'm interested in ${product.name} (${product.price})`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const ratingValue = parseFloat(product.rating.split(' ')[0]);
  const ratingCount = product.rating.split(' ')[2];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={handleWishlist}
        className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-md ${
          isWishlisted ? 'bg-pink-300 text-red-500' : 'bg-white text-gray-400'
        }`}
      >
        {isWishlisted ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
      </motion.button>

      {/* Discount Badge */}
      {product.price.includes('% OFF') && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
          {product.price.match(/\d+% OFF/)[0]}
        </div>
      )}

      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden cursor-pointer" onClick={handleBuyNow}>
        <motion.img
          key={currentImage}
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Details */}
      <div className="p-3 space-y-1">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>

        <div className="flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={12} className={i < Math.floor(ratingValue) ? 'fill-current' : 'text-gray-300'} />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 ml-1">({ratingCount})</span>
        </div>

        <div className="pt-1">
          <span className="text-sm font-bold text-pink-600">{product.price.split(' (')[0]}</span>
          {product.price.includes('(') && (
            <span className="text-xs text-gray-500 line-through ml-1">
              {product.price.match(/Rs\. \d+/g)[1]}
            </span>
          )}
        </div>

        <div className="flex justify-between gap-2 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1 bg-gray-400 hover:bg-gray-700 text-white px-2 py-1.5 rounded-md text-xs"
          >
            <FaShoppingCart size={12} />
            <span>Cart</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-1 bg-pink-500 hover:bg-pink-700 text-white px-2 py-1.5 rounded-md text-xs"
          >
            <FaBolt size={12} />
            <span>Buy</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsapp}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-md"
          >
            <FaWhatsapp size={12} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
