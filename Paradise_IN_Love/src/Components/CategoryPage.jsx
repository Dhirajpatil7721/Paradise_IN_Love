// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaRegHeart, FaStar, FaShoppingCart, FaBolt, FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";

// function CategoryPage() {
//   const { categorySlug } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const categoryId = location.state?.categoryId;
//   const categoryName = location.state?.categoryName;

//   const [subCategories, setSubCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 12,
//     totalCount: 0,
//     totalPages: 1
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!categoryId) return;

//       try {
//         setLoading(true);
//         setError(null);

//         // 1. Fetch Subcategories
//         const subCatResponse = await fetch(
//           'http://localhost:8080/api/subcategory/get-subcategory-by-Id',
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include',
//             body: JSON.stringify({ categoryId })
//           }
//         );

//         if (!subCatResponse.ok) {
//           throw new Error(`Failed to fetch subcategories: ${subCatResponse.status}`);
//         }

//         const subCatData = await subCatResponse.json();

//         if (!subCatData?.success || !Array.isArray(subCatData.data)) {
//           throw new Error('Invalid subcategories data format');
//         }

//         setSubCategories(subCatData.data);

//         // 2. Fetch Products using subcategory IDs
//         await fetchProducts(subCatData.data, pagination.page);

//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//         toast.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [categoryId]);

//   const fetchProducts = async (subCategoriesData, page) => {
//     try {
//       const subCategoryIds = subCategoriesData.map(subCat => subCat._id);

//       const productResponse = await fetch(
//         'http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory',
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify({
//             categoryId: categoryId,
//             subCategoryId: subCategoryIds,
//             page: page,
//             limit: pagination.limit,
//           })
//         }
//       );

//       if (!productResponse.ok) {
//         const errorData = await productResponse.json();
//         throw new Error(errorData.message || `Failed to fetch products: ${productResponse.status}`);
//       }

//       const productData = await productResponse.json();

//       if (productData.success) {
//         setProducts(productData.data || []);
//         setPagination(prev => ({
//           ...prev,
//           page: page,
//           totalCount: productData.totalCount,
//           totalPages: Math.ceil(productData.totalCount / pagination.limit)
//         }));
//       } else {
//         throw new Error('Failed to load products');
//       }
//     } catch (err) {
//       console.error('Product fetch error:', err);
//       setError(err.message);
//       toast.error(err.message);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > pagination.totalPages) return;
//     fetchProducts(subCategories, newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const addToCart = async (productId) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/cart/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({
//           productId: productId,
//           quantity: 1,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to add to cart');
//       await response.json();
//       toast.success('Product added to cart successfully!');
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Failed to add product to cart.');
//     }
//   };

//   const addwish = async (productId) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/wishlist/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ productId }),
//       });

//       const result = await response.json();
//       if (response.ok && result.success) toast.success("Added to wishlist!");
//       else toast.error(result.message || "Failed to add to wishlist");
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//       toast.error("Error adding to wishlist");
//     }
//   };

//   const getProductDetails = async (productId) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/product/get-product-details', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ productId }),
//       });

//       const result = await response.json();
//       if (response.ok && result.success) {
//         navigate('/buynow', { state: { product: result.data } });
//       } else {
//         toast.error(result.message || 'Failed to fetch product details');
//       }
//     } catch (error) {
//       toast.error('Error fetching product details');
//     }
//   };

//   const handleWhatsapp = () => window.open("https://wa.me/9730020567?text=Hi, I have an inquiry.", "_blank")

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 pt-24 text-center text-red-500">
//         <p>Error loading data: {error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 pt-24 max-w-7xl mx-auto">
//       <ToastContainer  autoClose={50}/>
//       {/* <h2 className="text-2xl text-center font-semibold capitalize mb-6">
//         {categoryName || categorySlug.replace(/-/g, " ")}
//       </h2> */}
//       <motion.h2
//         className="relative text-3xl md:text-4xl text-center font-bold capitalize mb-10 group"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <span className="relative inline-block">
//           <span className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></span>
//           <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
//             {categoryName || categorySlug.replace(/-/g, " ")}
//           </span>
//         </span>
//         <motion.span
//           className="absolute bottom-0 left-1/2 h-1 w-16 bg-gradient-to-r from-pink-500 to-purple-600 transform -translate-x-1/2"
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//         />
//       </motion.h2>
//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-5"> */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.length === 0 ? (
//           <p className="col-span-full text-center text-gray-500">No products found.</p>
//         ) : (
//           products.map((product) => (
//             <motion.div
//               key={product._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative"
//             >
//               <motion.button
//                 whileTap={{ scale: 0.8 }}
//                 onClick={() => addwish(product._id)}
//                 className="absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-md bg-white text-gray-400"
//               >
//                 <FaRegHeart size={16} />
//               </motion.button>

//               {product.discount && (
//                 <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
//                   {product.discount}% OFF
//                 </div>
//               )}

//               <div
//                 className="relative w-full h-52 overflow-hidden cursor-pointer"
//                 onClick={() => getProductDetails(product._id)}
//               >
//                 <motion.img
//                   src={product.image || 'https://via.placeholder.com/200x200.png?text=No+Image'}
//                   alt={product.name}
//                   className="w-full h-full object-cover"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </div>

//               <div className="p-3 space-y-1">
//                 <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
//                 <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>

//                 <div className="flex items-center">
//                   <div className="flex text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar
//                         key={i}
//                         size={12}
//                         className={i < (product.rating || 4) ? 'fill-current' : 'text-gray-300'}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-[10px] text-gray-500 ml-1">({product.reviewsCount || 0})</span>
//                 </div>

//                 <div className="pt-1">
//                   <span className="text-sm font-bold text-pink-600">Rs. {product.price}</span>
//                   {product.mrp && (
//                     <span className="text-xs text-gray-500 line-through ml-1">Rs. {product.mrp}</span>
//                   )}
//                 </div>

//                 <div className="flex justify-between gap-2 pt-2">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => addToCart(product._id)}
//                     className="flex-1 flex items-center justify-center gap-1 bg-gray-400 hover:bg-gray-700 text-white px-2 py-1.5 rounded-md text-xs"
//                   >
//                     <FaShoppingCart size={12} />
//                     <span>Cart</span>
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => getProductDetails(product._id)}
//                     className="flex-1 flex items-center justify-center gap-1 bg-pink-500 hover:bg-pink-700 text-white px-2 py-1.5 rounded-md text-xs"
//                   >
//                     <FaBolt size={12} />
//                     <span>Buy</span>
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleWhatsapp}
//                     className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-md"
//                   >
//                     <FaWhatsapp size={12} />
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {pagination.totalPages > 1 && (
//         <div className="flex justify-center items-center mt-8 mb-12">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => handlePageChange(pagination.page - 1)}
//             disabled={pagination.page === 1}
//             className={`p-2 rounded-full ${pagination.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
//           >
//             <FaChevronLeft size={18} />
//           </motion.button>

//           <div className="flex mx-4">
//             {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//               // Show pages around current page
//               let pageNum;
//               if (pagination.totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (pagination.page <= 3) {
//                 pageNum = i + 1;
//               } else if (pagination.page >= pagination.totalPages - 2) {
//                 pageNum = pagination.totalPages - 4 + i;
//               } else {
//                 pageNum = pagination.page - 2 + i;
//               }

//               return (
//                 <motion.button
//                   key={pageNum}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => handlePageChange(pageNum)}
//                   className={`mx-1 w-10 h-10 rounded-full flex items-center justify-center ${pagination.page === pageNum ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   {pageNum}
//                 </motion.button>
//               );
//             })}

//             {pagination.totalPages > 5 && pagination.page < pagination.totalPages - 2 && (
//               <>
//                 <span className="mx-1 flex items-end">...</span>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => handlePageChange(pagination.totalPages)}
//                   className={`mx-1 w-10 h-10 rounded-full flex items-center justify-center ${pagination.page === pagination.totalPages ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   {pagination.totalPages}
//                 </motion.button>
//               </>
//             )}
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => handlePageChange(pagination.page + 1)}
//             disabled={pagination.page === pagination.totalPages}
//             className={`p-2 rounded-full ${pagination.page === pagination.totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
//           >
//             <FaChevronRight size={18} />
//           </motion.button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CategoryPage;




//Responsive cards 
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegHeart, FaStar, FaShoppingCart, FaBolt, FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

function CategoryPage() {
  const { categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = location.state?.categoryId;
  const categoryName = location.state?.categoryName;

  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalCount: 0,
    totalPages: 1
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!categoryId) return;

      try {
        setLoading(true);
        setError(null);

        // 1. Fetch Subcategories
        const subCatResponse = await fetch(
          'http://localhost:8080/api/subcategory/get-subcategory-by-Id',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ categoryId })
          }
        );

        if (!subCatResponse.ok) {
          throw new Error(`Failed to fetch subcategories: ${subCatResponse.status}`);
        }

        const subCatData = await subCatResponse.json();

        if (!subCatData?.success || !Array.isArray(subCatData.data)) {
          throw new Error('Invalid subcategories data format');
        }

        setSubCategories(subCatData.data);

        // 2. Fetch Products using subcategory IDs
        await fetchProducts(subCatData.data, pagination.page);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const fetchProducts = async (subCategoriesData, page) => {
    try {
      const subCategoryIds = subCategoriesData.map(subCat => subCat._id);

      const productResponse = await fetch(
        'http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            categoryId: categoryId,
            subCategoryId: subCategoryIds,
            page: page,
            limit: pagination.limit,
          })
        }
      );

      if (!productResponse.ok) {
        const errorData = await productResponse.json();
        throw new Error(errorData.message || `Failed to fetch products: ${productResponse.status}`);
      }

      const productData = await productResponse.json();

      if (productData.success) {
        setProducts(productData.data || []);
        setPagination(prev => ({
          ...prev,
          page: page,
          totalCount: productData.totalCount,
          totalPages: Math.ceil(productData.totalCount / pagination.limit)
        }));
      } else {
        throw new Error('Failed to load products');
      }
    } catch (err) {
      console.error('Product fetch error:', err);
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    fetchProducts(subCategories, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const handleWhatsapp = () => window.open("https://wa.me/9730020567?text=Hi, I have an inquiry.", "_blank")

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 pt-24 text-center text-red-500">
        <p>Error loading data: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 pt-24 max-w-7xl mx-auto">
      <ToastContainer autoClose={50} />
      
      {/* Category Title */}
      <motion.h2
        className="relative text-2xl sm:text-3xl md:text-4xl text-center font-bold capitalize mb-8 sm:mb-10 group"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="relative inline-block">
          <span className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></span>
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            {categoryName || categorySlug.replace(/-/g, " ")}
          </span>
        </span>
        <motion.span
          className="absolute bottom-0 left-1/2 h-1 w-16 bg-gradient-to-r from-pink-500 to-purple-600 transform -translate-x-1/2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.h2>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-10">No products found.</p>
        ) : (
          products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative"
            >
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => addwish(product._id)}
                className="absolute top-2 right-2 z-10 p-1 rounded-full shadow-sm bg-white text-gray-400 hover:text-red-500"
              >
                <FaRegHeart size={14} className="sm:text-base" />
              </motion.button>

              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10">
                  {product.discount}% OFF
                </div>
              )}

              <div
                className="relative w-full h-40 sm:h-48 md:h-52 overflow-hidden cursor-pointer"
                onClick={() => getProductDetails(product._id)}
              >
                <motion.img
                  src={product.image || 'https://via.placeholder.com/200x200.png?text=No+Image'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-2 sm:p-3 space-y-1">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2">{product.description}</p>

                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={10}
                        className={i < (product.rating || 4) ? 'fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] sm:text-[10px] text-gray-500 ml-1">({product.reviewsCount || 0})</span>
                </div>

                <div className="pt-1">
                  <span className="text-xs sm:text-sm font-bold text-pink-600">Rs. {product.price}</span>
                  {product.mrp && (
                    <span className="text-[10px] sm:text-xs text-gray-500 line-through ml-1">Rs. {product.mrp}</span>
                  )}
                </div>

                <div className="flex justify-between gap-1 sm:gap-2 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-400 hover:bg-gray-700 text-white px-1 py-1 sm:px-2 sm:py-1.5 rounded-md text-[10px] sm:text-xs"
                  >
                    <FaShoppingCart size={10} className="sm:text-xs" />
                    <span>Cart</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => getProductDetails(product._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-pink-500 hover:bg-pink-700 text-white px-1 py-1 sm:px-2 sm:py-1.5 rounded-md text-[10px] sm:text-xs"
                  >
                    <FaBolt size={10} className="sm:text-xs" />
                    <span>Buy</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsapp}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white p-1 sm:p-1.5 rounded-md"
                  >
                    <FaWhatsapp size={10} className="sm:text-xs" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 sm:mt-8 mb-8 sm:mb-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className={`p-1 sm:p-2 rounded-full ${pagination.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FaChevronLeft size={16} className="sm:text-lg" />
          </motion.button>

          <div className="flex mx-2 sm:mx-4">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }

              return (
                <motion.button
                  key={pageNum}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(pageNum)}
                  className={`mx-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm ${pagination.page === pageNum ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {pageNum}
                </motion.button>
              );
            })}

            {pagination.totalPages > 5 && pagination.page < pagination.totalPages - 2 && (
              <>
                <span className="mx-1 flex items-end text-gray-500">...</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(pagination.totalPages)}
                  className={`mx-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm ${pagination.page === pagination.totalPages ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {pagination.totalPages}
                </motion.button>
              </>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className={`p-1 sm:p-2 rounded-full ${pagination.page === pagination.totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FaChevronRight size={16} className="sm:text-lg" />
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;