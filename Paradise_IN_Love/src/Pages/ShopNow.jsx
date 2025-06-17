// import React, { useEffect, useState } from 'react';
// import ProductCard from '../Components/ProductCard'; // Ensure this accepts a 'product' prop

// const ShopNow = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [productcatsub, setProductcatsub] = useState([]);

//   // Fetch all categories on component mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/category/get-category', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//         });
//         const result = await response.json();
//         if (result?.data?.length > 0) {
//           setCategories(result.data);
//           const firstCategoryId = result.data[0]._id;
//           setSelectedCategory(firstCategoryId);
//           fetchSubcategories(firstCategoryId);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Fetch subcategories by categoryId
//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/subcategory/get-subcategory-by-Id', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ categoryId }),
//       });
//       const result = await response.json();
//       setSubcategories(result.data || []);
//       setSelectedSubcategory(null);
//       setProductcatsub([]); // Clear products when switching category
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//     }
//   };

//   // Fetch products by category & subcategory
//   const fetchProductcatsub = async (catId, subcatId) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({
//           categoryId: catId,
//           subCategoryId: subcatId,
//           page: 1,
//           limit: 10
//         })
//       });
//       const result = await response.json();
//       setProductcatsub(result.data || []);
//     } catch (error) {
//       console.error('Error fetching Product:', error);
//     }
//   };

//   // Handle category click
//   const handleCategoryClick = (catId) => {
//     setSelectedCategory(catId);
//     setSelectedSubcategory(null);
//     setProductcatsub([]);
//     fetchSubcategories(catId);
//   };

//   // Handle subcategory click
//   const handleSubcategoryClick = (subcatId) => {
//     setSelectedSubcategory(subcatId);
//     fetchProductcatsub(selectedCategory, subcatId);
//   };

//   return (
//     <div className="min-h-screen mt-20 bg-gray-50 p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Shop Now - Paradise in Love</h1>

//       {/* Categories Horizontal List */}
//       <div className="overflow-x-auto mb-6">
//         <div className="flex space-x-4 min-w-max px-2 snap-x snap-mandatory scrollbar-hide">
//           {categories.map((cat) => (
//             <button
//               key={cat._id}
//               onClick={() => handleCategoryClick(cat._id)}
//               className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold transition snap-center ${
//                 selectedCategory === cat._id
//                   ? 'bg-indigo-600 text-white shadow-lg'
//                   : 'bg-white text-gray-700 hover:bg-indigo-100'
//               }`}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
//         {/* Subcategory Sidebar */}
//         <aside className="w-full md:w-1/4 p-6 bg-white shadow-md">
//           <h2 className="text-lg font-semibold mb-4">Subcategories</h2>
//           <ul className="space-y-2">
//             {subcategories.length === 0 ? (
//               <li className="text-gray-500">No subcategories available</li>
//             ) : (
//               subcategories.map((subcat) => (
//                 <li key={subcat._id} className="mb-2">
//                   <button
//                     onClick={() => handleSubcategoryClick(subcat._id)}
//                     className={`w-full text-left px-3 py-2 rounded-md ${
//                       selectedSubcategory === subcat._id
//                         ? 'bg-indigo-500 text-white font-bold'
//                         : 'hover:bg-indigo-100 text-gray-800'
//                     }`}
//                   >
//                     {subcat.name}
//                   </button>
//                 </li>
//               ))
//             )}
//           </ul>
//         </aside>

//         {/* Product Grid */}
//         <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {productcatsub.length === 0 ? (
//             <p className="col-span-full text-center text-gray-500">No products found.</p>
//           ) : (
//             productcatsub.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 product={{
//                   id: product._id,
//                   name: product.name,
//                   category: product.category[0], // or fetch full category name separately
//                   subcategory: product.subCategory[0],
//                   price: `Rs. ${product.price} (Rs. ${product.mrp}) - ${product.discount}% OFF`,
//                   image1: product.image[0],
//                   image2: product.image[1] || product.image[0],
//                   description: product.description,
//                   rating: '4.5 out of 5 stars', 
//                   }}
//               />
//             ))
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ShopNow;

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

const ShopNow = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [productcatsub, setProductcatsub] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/category/get-category', {
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
      const response = await fetch('http://localhost:8080/api/subcategory/get-subcategory-by-Id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ categoryId }),
      });
      const result = await response.json();
      setSubcategories(result.data || []);
      setSelectedSubcategory(null);
      setProductcatsub([]);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchProductcatsub = async (catId, subcatId) => {
    try {
      const response = await fetch('http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          categoryId: catId,
          subCategoryId: subcatId,
          page: 1,
          limit: 10,
        }),
      });
      const result = await response.json();
      setProductcatsub(result.data || []);
    } catch (error) {
      console.error('Error fetching Product:', error);
    }
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setSelectedSubcategory(null);
    setProductcatsub([]);
    fetchSubcategories(catId);
  };

  const handleSubcategoryClick = (subcatId) => {
    setSelectedSubcategory(subcatId);
    fetchProductcatsub(selectedCategory, subcatId);
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
      const response = await fetch('http://localhost:8080/api/cart/create', {
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

  return (
    <div className="min-h-screen mt-20 bg-gray-50 p-4 md:p-8">
    
      <h1 className="text-3xl font-bold text-center mb-8">Shop Now - Paradise in Love</h1>
<ToastContainer/>
      {/* Categories */}
      <div className="overflow-x-auto mb-6">
        <div className="flex space-x-4 min-w-max px-2 snap-x snap-mandatory scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold transition snap-center ${
                selectedCategory === cat._id
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
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedSubcategory === subcat._id
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
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {productcatsub.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
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
                      <span>Buy Now</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toast.info('Opening WhatsApp')}
                      className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-md"
                    >
                      <FaWhatsapp size={12} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default ShopNow;
