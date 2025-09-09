import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard'; // Optional if not used directly
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaWhatsapp,
} from 'react-icons/fa';
import empty from '../assets/ShopNow.png'

const ShopNow = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [productcatsub, setProductcatsub] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 9;
  const API_URL = import.meta.env.VITE_RENDER;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/category/get-category`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const result = await response.json();
        if (result?.data?.length > 0) {
          setCategories(result.data);
          const firstCategoryId = result.data[0]._id;
          setSelectedCategory(firstCategoryId);
          fetchSubcategories(firstCategoryId);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/subcategory/get-subcategory-by-Id`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ categoryId }),
      });
      const result = await response.json();
      setSubcategories(result.data || []);
      setSelectedSubcategory(null);
      setProductcatsub([]);
      setCurrentPage(1); // Reset to first page when category changes
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchProductcatsub = async (catId, subcatId) => {
    try {
      const response = await fetch(`${API_URL}/product/get-pruduct-by-category-and-subcategory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          categoryId: catId,
          subCategoryId: subcatId,
          page: currentPage,
          limit: itemsPerPage,
        }),
      });
      const result = await response.json();
      setProductcatsub(result.data || []);
      setTotalProducts(result.totalCount || 0);
      setTotalPages(Math.ceil(result.totalCount / itemsPerPage) || 1);
    } catch (error) {
      console.error('Error fetching Product:', error);
    }
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setSelectedSubcategory(null);
    setProductcatsub([]);
    setCurrentPage(1); // Reset to first page when category changes
    fetchSubcategories(catId);
  };

  const handleSubcategoryClick = (subcatId) => {
    setSelectedSubcategory(subcatId);
    setCurrentPage(1); // Reset to first page when subcategory changes
    fetchProductcatsub(selectedCategory, subcatId);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      fetchProductcatsub(selectedCategory, selectedSubcategory);
    }
  }, [currentPage, selectedCategory, selectedSubcategory]);

  const addwish = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/wishlist/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        toast.success('Added to wishlist!');
        setWishlistIds((prev) => [...prev, productId]);
      } else {
        toast.error(result.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      toast.error('Error adding to wishlist');
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/cart/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const result = await response.json();
      response.ok && result.success
        ? toast.success('Added to cart successfully!')
        : toast.error(result.message || 'Failed to add to cart');
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  const getProductDetails = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/get-product-details`, {
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

  return (
    <div className="min-h-screen mt-20 bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop Now - Paradise in Love</h1>
      <ToastContainer autoClose={50} />

      {/* Categories */}
      <div className="overflow-x-auto mb-6">
        <div className="flex space-x-4 min-w-max px-2 snap-x snap-mandatory scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold transition snap-center ${selectedCategory === cat._id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-indigo-100'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Subcategories */}
        <aside className="w-full md:w-1/4 p-6 bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-4">Subcategories</h2>
          <ul className="space-y-2">
            {subcategories.length === 0 ? (
              <li className="text-gray-500">No subcategories available</li>
            ) : (
              subcategories.map((subcat) => (
                <li key={subcat._id}>
                  <button
                    onClick={() => handleSubcategoryClick(subcat._id)}
                    className={`w-full text-left px-3 py-2 rounded-md ${selectedSubcategory === subcat._id
                      ? 'bg-indigo-500 text-white font-bold'
                      : 'hover:bg-indigo-100 text-gray-800'
                      }`}
                  >
                    {subcat.name}
                  </button>
                </li>
              ))
            )}
          </ul>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {productcatsub.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 flex flex-col items-center justify-center mt-10">
                <img
                  src={empty}
                  alt="No Products"
                  // className="w-90 h-80 opacity-90 mb-1 mr-24"
                  className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 opacity-90 mx-auto transition-all duration-300 hover:opacity-100"
                />
                <p>No products found. Please select a category and subcategory.</p>
              </div>

            ) : (
              productcatsub.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 relative"
                >
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => addwish(product._id)}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-md bg-white"
                  >
                    {wishlistIds.includes(product._id)
                      ? <FaHeart size={18} className="text-red-500" />
                      : <FaRegHeart size={18} className="text-gray-400" />}
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
                      src={product.image[0] || 'https://via.placeholder.com/200x200.png?text=No+Image'}
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

                    <div className="pt-1">
                      <span className="text-sm font-bold text-pink-600">Rs. {product.price}</span>
                      {product.mrp && (
                        <span className="text-xs text-gray-500 line-through ml-1 ">Rs. {product.mrp}</span>
                      )}
                    </div>

                    <div className="flex justify-between gap-1 sm:gap-2 pt-2">
                      {/* Cart Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(product._id)}
                        className="flex-1 flex items-center justify-center gap-1 bg-gray-400 hover:bg-gray-700 text-white px-1 py-1 sm:px-2 sm:py-1.5 rounded-md text-[10px] sm:text-xs"
                      >
                        <FaShoppingCart size={12} />
                        <span>Cart</span>
                      </motion.button>

                      {/* Buy Now Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => getProductDetails(product._id)}
                        className="flex-1 flex items-center justify-center gap-1 bg-pink-500 hover:bg-pink-700 text-white px-1 py-1 sm:px-2 sm:py-1.5 rounded-md text-[10px] sm:text-xs"
                      >
                        <FaBolt size={12} />
                        <span>Buy</span>
                      </motion.button>

                      {/* WhatsApp Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open("https://wa.me/919595455123", "_blank")}
                        className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white p-1 sm:p-1.5 rounded-md"
                      >
                        <FaWhatsapp size={14} />
                      </motion.button>
                    </div>


                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination */}
          {productcatsub.length > 0 && totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md ${currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ShopNow;
