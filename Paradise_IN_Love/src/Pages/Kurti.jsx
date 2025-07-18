// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   FaRegHeart, FaHeart, FaStar, FaShoppingCart, FaBolt, FaWhatsapp
// } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const Kurti = () => {
//   const [products, setProducts] = useState([]);
//   const [wishlistIds, setWishlistIds] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProductsByCategory = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             categoryId: ['683eb42bf4e1cfcb9b170319'],
//             subCategoryId: ['683ec9ddda32e0d2140a5ab7'],
//             page: 1,
//             limit: 12,
//           }),
//         });
//         const data = await response.json();
//         setProducts(data.data || []);
//       } catch (error) {
//         toast.error('Failed to fetch products.');
//       }
//     };
//     fetchProductsByCategory();
//   }, []);

//   const addToCart = async (productId) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/cart/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ productId, quantity: 1 }),
//       });
//       const result = await response.json();
//       response.ok && result.success
//         ? toast.success('Added to cart successfully!')
//         : toast.error(result.message || 'Failed to add to cart');
//     } catch (error) {
//       toast.error('Error adding to cart');
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
//       if (response.ok && result.success) {
//         toast.success('Added to wishlist!');
//         setWishlistIds((prev) => [...prev, productId]);
//       } else {
//         toast.error(result.message || 'Failed to add to wishlist');
//       }
//     } catch (error) {
//       toast.error('Error adding to wishlist');
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

//   return (
//     <div className="mt-20">
//       <h1 className="text-center text-2xl font-bold mb-6">Kurti</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-5">
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
//               className="w-full max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 relative"
//             >
//               <motion.button
//                 whileTap={{ scale: 0.8 }}
//                 onClick={() => addwish(product._id)}
//                 className="absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-md bg-white"
//               >
//                 {wishlistIds.includes(product._id)
//                   ? <FaHeart size={18} className="text-red-500" />
//                   : <FaRegHeart size={18} className="text-gray-400" />}
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
//                   src={product.imageUrl || 'https://via.placeholder.com/200x200.png?text=No+Image'}
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
//                       <FaStar key={i} size={12} className={i < (product.rating || 4) ? 'fill-current' : 'text-gray-300'} />
//                     ))}
//                   </div>
//                   <span className="text-[10px] text-gray-500 ml-1">({product.reviewsCount || 0})</span>
//                 </div>

//                 {/* <div className="pt-1">
//                   <span className="text-xs text-gray-500 line-through ml-1 ">Rs. {product.price}</span>
//                   {product.mrp && (
//                     <span className="text-sm font-bold text-pink-600">Rs. {product.mrp}</span>
//                   )}
//                 </div> */}
//                 <div className="pt-1">
//                   <span className="text-sm font-bold text-pink-600">Rs. {product.price}</span>
//                   {product.mrp && (
//                     <span className="text-xs text-gray-500 line-through ml-1 ">Rs. {product.mrp}</span>
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
//                     <span>Buy Now</span>
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => toast.info('Opening WhatsApp')}
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
//       <ToastContainer />
//     </div>
//   );
// };

// export default Kurti;



import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaRegHeart, FaHeart, FaStar, FaShoppingCart, FaBolt, FaWhatsapp
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Kurti = () => {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchProductsByCategory = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          categoryId: '683eb42bf4e1cfcb9b170319',  
          subCategoryId: ['683ec9ddda32e0d2140a5ab7','683eca34da32e0d2140a5ab9'], 
          page: 1,
          limit: 10
        })
      });

      const result = await response.json();
      console.log('Fetched Product:', result);
      setProducts(result.data || []);
    } catch (error) {
      console.error('Error fetching Product:', error);
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
    <div className="mt-20">

    <h1 className="text-3xl font-bold text-center text-pink-600 mb-2">Kurti Collection</h1>
      <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto px-4">
        Discover our latest collection of stylish and comfortable Kurtis — perfect for every occasion!
        From everyday wear to festive looks, find a Kurti that expresses your personality and keeps you comfortable all day long.
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
                      <FaStar key={i} size={12} className={i < (product.rating || 4) ? 'fill-current' : 'text-gray-300'} />
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default Kurti;
