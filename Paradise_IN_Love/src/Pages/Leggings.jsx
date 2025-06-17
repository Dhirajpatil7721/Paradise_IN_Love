import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegHeart, FaStar, FaShoppingCart, FaBolt, FaWhatsapp } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Leggings = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchProductsByCategory = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           categoryId: ['683ec921da32e0d2140a5ab3'],
  //           subCategoryId: ['68402c3bfef586f973129625'],
  //           page: 1,
  //           limit: 12,
  //         }),
  //       });
  //       const data = await response.json();
  //       setProducts(data.data || []);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //       toast.error('Failed to load products');
  //     }
  //   };

  //   fetchProductsByCategory();
  // }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            categoryId: ['683ec921da32e0d2140a5ab3'],
            subCategoryId: ['68402c3bfef586f973129625'],
            page: 1,
            limit: 12,
          }),
        });
        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        toast.error('Failed to fetch products.');
      }
    };
    fetchProductsByCategory();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:8080/api/cart/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
        }),
      });

      if (!response.ok) throw new Error('Failed to add to cart');
      await response.json();
      toast.success('Product added to cart successfully!');
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add product to cart.');
    }
  };

  const addwish = async (productId) => {
    try {
      const response = await fetch('http://localhost:8080/api/wishlist/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      });

      const result = await response.json();
      if (response.ok && result.success) toast.success("Added to wishlist!");
      else toast.error(result.message || "Failed to add to wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Error adding to wishlist");
    }
  };

  const getProductDetails = async (productId) => {
    try {
      const response = await fetch('http://localhost:8080/api/product/get-product-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        navigate('/buynow', { state: { product: result.data } });
      } else {
        toast.error(result.message || 'Failed to fetch product details');
      }
    } catch (error) {
      toast.error('Error fetching product details');
    }
  };

  const handleWhatsapp = () => toast.info('Opening WhatsApp');

  return (
    <div className="mt-20">
      <ToastContainer />
<h1 className="text-3xl font-bold text-center text-purple-600 mb-2">Leggings Collection</h1>

{/* Description */}
<p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
  Discover our latest collection of stylish and comfortable Leggings, perfect for every occasion.
  From casual daily wear to trendy workout styles, find the pair that fits your lifestyle.
</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-5">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        ) : (
          products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative"
            >
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => addwish(product._id)}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-md bg-white text-gray-400"
              >
                <FaRegHeart size={16} />
              </motion.button>

              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  {product.discount}% OFF
                </div>
              )}

              <div
                className="relative w-full h-52 overflow-hidden cursor-pointer"
                onClick={() => getProductDetails(product._id)}
              >
                <motion.img
                  src={product.imageUrl || 'https://via.placeholder.com/200x200.png?text=No+Image'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-3 space-y-1">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>

                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={12}
                        className={i < (product.rating || 4) ? 'fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 ml-1">({product.reviewsCount || 0})</span>
                </div>

                {/* <div className="pt-1">
                  <span className="text-xs text-gray-500 line-through ml-1 ">Rs. {product.price}</span>
                  {product.mrp && (
                    <span className="text-sm font-bold text-pink-600">Rs. {product.mrp}</span>
                  )}
                </div> */}
                <div className="pt-1">
                  <span className="text-sm font-bold text-pink-600">Rs. {product.price}</span>
                  {product.mrp && (
                    <span className="text-xs text-gray-500 line-through ml-1 ">Rs. {product.mrp}</span>
                  )}
                </div>
                <div className="flex justify-between gap-2 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-400 hover:bg-gray-700 text-white px-2 py-1.5 rounded-md text-xs"
                  >
                    <FaShoppingCart size={12} />
                    <span>Cart</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => getProductDetails(product._id)}
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
          ))
        )}
      </div>
    </div>
  );
};

export default Leggings;
