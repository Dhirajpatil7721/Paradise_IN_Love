// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Buynow = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const productDetails = location.state?.product || JSON.parse(sessionStorage.getItem("buy-now-product"));
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('M');

//   const addressId = "68395fb46bb2922ad37e6ff3"; 

//   useEffect(() => {
//     if (location.state?.product) {
//       sessionStorage.setItem("buy-now-product", JSON.stringify(location.state.product));
//     }
//   }, [location.state]);

//   if (!productDetails) {
//     return <div className="mt-20 text-center text-red-500">Product details not found.</div>;
//   }

//   const handleQuantityChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (value >= 1 && value <= 10) setQuantity(value);
//   };

//   const handleCheckout = async () => {
//     const price = productDetails.price || 0;
//     const discount = productDetails.discount || 0;
//     const subTotalAmt = price * quantity;
//     const totalAmt = subTotalAmt - discount;

//     const payload = {
//       list_items: [
//         {
//           productId: {
//             _id: productDetails._id,
//             name: productDetails.name,
//             image: productDetails.imageUrl || '',
//             price: price,
//             discount: discount
//           },
//           size: selectedSize.toLowerCase(),
//           quantity: quantity
//         }
//       ],
//       totalAmt,
//       subTotalAmt,
//       addressId
//     };

//     try {
//       const response = await fetch("http://localhost:8080/api/order/cash-on-delivery", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload),
//         credentials: "include"
//       });

//       if (response.ok) {
//         alert("Order placed successfully!");
//         sessionStorage.removeItem("buy-now-product");
//         navigate("/userorders");
//       } else {
//         const error = await response.json();
//         alert("Failed: " + (error.message || "Something went wrong"));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error placing order");
//     }
//   };

//   // Parse size safely
//   let sizeList = [];
//   const rawSize = productDetails?.more_details?.size;
//   if (Array.isArray(rawSize)) {
//     sizeList = rawSize;
//   } else if (typeof rawSize === 'string') {
//     sizeList = rawSize.trim().split(/\s+/);
//   }

//   return (
//     <div className="mt-20 max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-6">
//       <div className="flex flex-col md:flex-row items-start gap-6">
//         <img
//           src={productDetails.imageUrl || 'https://via.placeholder.com/300x300.png?text=No+Image'}
//           alt={productDetails.name}
//           className="w-56 h-64 object-cover rounded-lg border"
//         />
//         <div className="flex-1 space-y-3">
//           <h2 className="text-2xl font-semibold text-gray-800">{productDetails.name}</h2>
//           <p className="text-gray-600">{productDetails.description}</p>
//           <div className="text-l line-through text-gray-500">₹{productDetails.price}</div>
//           <div className="text-xl font-bold text-pink-600">₹{productDetails.mrp}</div>

//           {/* Size Selection */}
//           {sizeList.length > 0 && (
//             <div>
//               <h4 className="font-medium text-gray-700 mt-3">Size</h4>
//               <div className="flex gap-2 mt-2">
//                 {sizeList.map((size) => {
//                   const upperSize = size.toUpperCase();
//                   return (
//                     <button
//                       key={upperSize}
//                       onClick={() => setSelectedSize(upperSize)}
//                       className={`px-3 py-1 border rounded ${selectedSize === upperSize
//                         ? 'bg-pink-100 border-pink-500 text-pink-700'
//                         : 'border-gray-300 text-gray-700'
//                         }`}
//                     >
//                       {upperSize}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Quantity + Checkout */}
//           <div className="flex items-center justify-between mt-4">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                 className="px-3 py-1 border border-gray-300"
//               >
//                 −
//               </button>
//               <input
//                 type="number"
//                 value={quantity}
//                 onChange={handleQuantityChange}
//                 className="w-12 text-center border-y border-gray-300"
//               />
//               <button
//                 onClick={() => setQuantity((q) => Math.min(10, q + 1))}
//                 className="px-3 py-1 border border-gray-300"
//               >
//                 +
//               </button>
//             </div>

//             <button
//               onClick={handleCheckout}
//               className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded"
//             >
//               Buy Now – ₹{(productDetails.price * quantity).toFixed(2)}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Buynow;



// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Buynow = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const productDetails = location.state?.product || JSON.parse(sessionStorage.getItem("buy-now-product"));
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('M');

//   useEffect(() => {
//     if (location.state?.product) {
//       sessionStorage.setItem("buy-now-product", JSON.stringify(location.state.product));
//     }
//   }, [location.state]);

//   if (!productDetails) {
//     return <div className="mt-20 text-center text-red-500">Product details not found.</div>;
//   }

//   const handleQuantityChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (value >= 1 && value <= 10) setQuantity(value);
//   };

//   const handleCheckout = () => {
//     const checkoutData = {
//       product: productDetails,
//       quantity:quantity,
//       size: selectedSize
//     };
//     navigate("/placeorder", { state: checkoutData });
//   };

//   let sizeList = [];
//   const rawSize = productDetails?.more_details?.size;
//   if (Array.isArray(rawSize)) {
//     sizeList = rawSize;
//   } else if (typeof rawSize === 'string') {
//     sizeList = rawSize.trim().split(/\s+/);
//   }

//   return (
//     <div className="mt-20 max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-6">
//       <div className="flex flex-col md:flex-row items-start gap-6">
//         <img
//           src={productDetails.imageUrl || 'https://via.placeholder.com/300x300.png?text=No+Image'}
//           alt={productDetails.name}
//           className="w-56 h-64 object-cover rounded-lg border"
//         />
//         <div className="flex-1 space-y-3">
//           <h2 className="text-2xl font-semibold text-gray-800">{productDetails.name}</h2>
//           <p className="text-gray-600">{productDetails.description}</p>
//           <div className="text-xl font-bold text-pink-600">₹{productDetails.price}</div>
//           <div className="text-l line-through text-gray-500">₹{productDetails.mrp}</div>

//           {sizeList.length > 0 && (
//             <div>
//               <h4 className="font-medium text-gray-700 mt-3">Size</h4>
//               <div className="flex gap-2 mt-2">
//                 {sizeList.map((size) => {
//                   const upperSize = size.toUpperCase();
//                   return (
//                     <button
//                       key={upperSize}
//                       onClick={() => setSelectedSize(upperSize)}
//                       className={`px-3 py-1 border rounded ${selectedSize === upperSize
//                         ? 'bg-pink-100 border-pink-500 text-pink-700'
//                         : 'border-gray-300 text-gray-700'
//                         }`}
//                     >
//                       {upperSize}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           <div className="flex items-center justify-between mt-4">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                 className="px-3 py-1 border border-gray-300"
//               >
//                 −
//               </button>
//               <input
//                 type="number"
//                 value={quantity}
//                 onChange={handleQuantityChange}
//                 className="w-12 text-center border-y border-gray-300"
//               />
//               <button
//                 onClick={() => setQuantity((q) => Math.min(10, q + 1))}
//                 className="px-3 py-1 border border-gray-300"
//               >
//                 +
//               </button>
//             </div>

//             <button
//               onClick={handleCheckout}
//               className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded"
//             >
//               Buy Now – ₹{(productDetails.price * quantity).toFixed(2)}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Buynow;



//Latest One

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Buynow = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const productDetails = location.state?.product || JSON.parse(sessionStorage.getItem("buy-now-product"));
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('M');

//   useEffect(() => {
//     if (location.state?.product) {
//       sessionStorage.setItem("buy-now-product", JSON.stringify(location.state.product));
//     }
//   }, [location.state]);

//   if (!productDetails) {
//     return (
//       <div className="min-h-screen  flex items-center justify-center bg-gray-50 ">
//         <div className="text-center  p-6 bg-white rounded-lg shadow-md max-w-md mx-4">
//           <h2 className="text-2xl font-bold text-red-500 mb-2">Product Not Found</h2>
//           <p className="text-gray-600 mb-4">The product details you're looking for are not available.</p>
//           <button 
//             onClick={() => navigate(-1)} 
//             className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleQuantityChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (value >= 1 && value <= 10) setQuantity(value);
//   };

//   const handleCheckout = () => {
//     const checkoutData = {
//       product: productDetails,
//       quantity: quantity,
//       size: selectedSize
//     };
//     navigate("/placeorder", { state: checkoutData });
//   };

//   let sizeList = [];
//   const rawSize = productDetails?.more_details?.size;
//   if (Array.isArray(rawSize)) {
//     sizeList = rawSize;
//   } else if (typeof rawSize === 'string') {
//     sizeList = rawSize.trim().split(/\s+/);
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden mt-20">
//           <div className="flex flex-col md:flex-row ">
//             {/* Product Image */}
//             <div className="md:w-1/3 lg:w-2/5 p-6 flex justify-center bg-gray-100">
//               <img
//                 src={productDetails.imageUrl || 'https://via.placeholder.com/500x500.png?text=No+Image'}
//                 alt={productDetails.name}
//                 className="w-full h-auto max-h-96 object-contain rounded-lg"
//               />
//             </div>

//             {/* Product Details */}
//             <div className="md:w-2/3 lg:w-3/5 p-6 md:p-8">
//               <div className="flex flex-col h-full">
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//                     {productDetails.name}
//                   </h1>
//                   <p className="text-gray-600 mb-4">{productDetails.description}</p>

//                   <div className="flex items-center space-x-4 mb-6">
//                     <span className="text-2xl font-bold text-pink-600">
//                       ₹{productDetails.price}
//                     </span>
//                     <span className="text-lg line-through text-gray-500">
//                       ₹{productDetails.mrp}
//                     </span>
//                     <span className="text-sm font-medium bg-pink-100 text-pink-800 px-2 py-1 rounded">
//                       {Math.round((1 - productDetails.price / productDetails.mrp) * 100)}% OFF
//                     </span>
//                   </div>
//                 </div>

//                 {/* Size Selection */}
//                 {sizeList.length > 0 && (
//                   <div className="mb-6">
//                     <h3 className="text-lg font-medium text-gray-900 mb-3">Select Size</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {sizeList.map((size) => {
//                         const upperSize = size.toUpperCase();
//                         return (
//                           <button
//                             key={upperSize}
//                             onClick={() => setSelectedSize(upperSize)}
//                             className={`px-4 py-2 border-2 rounded-md font-medium transition-all ${
//                               selectedSize === upperSize
//                                 ? 'border-pink-500 bg-pink-50 text-pink-700'
//                                 : 'border-gray-200 text-gray-700 hover:border-pink-300'
//                             }`}
//                           >
//                             {upperSize}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Quantity and Checkout */}
//                 <div className="mt-auto">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                     <div className="flex items-center">
//                       <span className="text-lg font-medium text-gray-900 mr-4">Quantity:</span>
//                       <div className="flex border border-gray-300 rounded-md overflow-hidden">
//                         <button
//                           onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                           className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
//                         >
//                           −
//                         </button>
//                         <input
//                           type="number"
//                           value={quantity}
//                           onChange={handleQuantityChange}
//                           min="1"
//                           max="10"
//                           className="w-12 text-center border-x border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-500"
//                         />
//                         <button
//                           onClick={() => setQuantity((q) => Math.min(10, q + 1))}
//                           className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex flex-col items-end">
//                       <span className="text-lg font-medium text-gray-900 mb-1">
//                         Total: ₹{(productDetails.price * quantity).toFixed(2)}
//                       </span>
//                       <button
//                         onClick={handleCheckout}
//                         className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-md font-medium shadow-md hover:shadow-lg transition-all"
//                       >
//                         Proceed to Checkout
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Buynow;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { toast, ToastContainer } from 'react-toastify';

const Buynow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const productDetails = location.state?.product || JSON.parse(sessionStorage.getItem("buy-now-product"));
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  // const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });
  const [hoverRating, setHoverRating] = useState(0);

  


  // Fetch reviews by product ID
 const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const productId = productDetails._id || productDetails.id;
    console.log("🟡 Product ID to fetch reviews:", productId);

    if (productId) {
      fetch("http://localhost:8080/api/review/product-details", {
        method: "POST",
        credentials: "include", // ✅ Send cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }), // ✅ Send productId in body
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          console.log("✅ Reviews fetched from backend:", data);
          const fetchedReviews = data?.data || [];
          setReviews(fetchedReviews);
        })
        .catch((err) => {
          console.error("❌ Failed to fetch reviews:", err);
        });
    }
  }, [productDetails]);

  useEffect(() => {
    if (reviews.length > 0) {
      console.log("✅ All Reviews in UI:", reviews);
    } else {
      console.log("ℹ️ No reviews found or not yet loaded.");
    }
  }, [reviews]);

//Review Sumbmitte
const handleReviewSubmit = async (e) => {
  e.preventDefault();

  if (!newReview.rating || !newReview.comment) {
    return toast.error("Please add a rating and comment");
  }
 const productId = productDetails._id || productDetails.id;
 const userId = productDetails.userId || productDetails.user_Id;
  const reviewData = {
    productId,
    userId,
    rating: newReview.rating,
    comment: newReview.comment,
  };

  try {
    const response = await fetch("http://localhost:8080/api/review/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // sends cookies
      body: JSON.stringify(reviewData),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Review submitted successfully");
      setNewReview({ rating: 0, comment: "" });
    } else {
      toast.error(result.message || "Failed to submit review");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong");
  }
};







  if (!productDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-4">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product details you're looking for are not available.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) setQuantity(value);
  };

  const handleCheckout = () => {
    const checkoutData = {
      product: productDetails,
      quantity: quantity,
      size: selectedSize
    };
    navigate("/placeorder", { state: checkoutData });
  };

  // const handleReviewSubmit = (e) => {
  //   e.preventDefault();
  //   if (newReview.rating === 0) {
  //     alert('Please select a rating');
  //     return;
  //   }

  //   const reviewToAdd = {
  //     id: reviews.length + 1,
  //     userName: newReview.userName || 'Anonymous',
  //     rating: newReview.rating,
  //     comment: newReview.comment,
  //     date: new Date().toISOString().split('T')[0]
  //   };

  //   setReviews([reviewToAdd, ...reviews]);
  //   setNewReview({
  //     rating: 0,
  //     comment: '',
  //     userName: 'Anonymous'
  //   });
  // };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  let sizeList = [];
  const rawSize = productDetails?.more_details?.size;
  if (Array.isArray(rawSize)) {
    sizeList = rawSize;
  } else if (typeof rawSize === 'string') {
    sizeList = rawSize.trim().split(/\s+/);
  }

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;



  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <ToastContainer/>
      <div className="max-w-6xl mx-auto mt-2">
        {/* Product Details Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/3 lg:w-2/5 p-6 flex justify-center bg-gray-100">
              <img
                src={productDetails.imageUrl || 'https://via.placeholder.com/500x500.png?text=No+Image'}
                alt={productDetails.name}
                className="w-full h-auto max-h-96 object-contain rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-2/3 lg:w-3/5 p-6 md:p-8">
              <div className="flex flex-col h-full">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {productDetails.name}
                  </h1>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-5 w-5 ${star <= averageRating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">
                        ({reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{productDetails.description}</p>

                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-2xl font-bold text-pink-600">
                      ₹{productDetails.price}
                    </span>
                    <span className="text-lg line-through text-gray-500">
                      ₹{productDetails.mrp}
                    </span>
                    <span className="text-sm font-medium bg-pink-100 text-pink-800 px-2 py-1 rounded">
                      {Math.round((1 - productDetails.price / productDetails.mrp) * 100)}% OFF
                    </span>
                  </div>
                </div>

                {/* Size Selection */}
                {sizeList.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Select Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {sizeList.map((size) => {
                        const upperSize = size.toUpperCase();
                        return (
                          <button
                            key={upperSize}
                            onClick={() => setSelectedSize(upperSize)}
                            className={`px-4 py-2 border-2 rounded-md font-medium transition-all ${selectedSize === upperSize
                              ? 'border-pink-500 bg-pink-50 text-pink-700'
                              : 'border-gray-200 text-gray-700 hover:border-pink-300'
                              }`}
                          >
                            {upperSize}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity and Checkout */}
                <div className="mt-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-gray-900 mr-4">Quantity:</span>
                      <div className="flex border border-gray-300 rounded-md overflow-hidden">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={handleQuantityChange}
                          min="1"
                          max="10"
                          className="w-12 text-center border-x border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        />
                        <button
                          onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-lg font-medium text-gray-900 mb-1">
                        Total: ₹{(productDetails.price * quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={handleCheckout}
                        className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-md font-medium shadow-md hover:shadow-lg transition-all"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          {/* Review Form */}
          {/* <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <StarIcon
                        className={`h-8 w-8 ${star <= (hoverRating || newReview.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 mb-2">Review</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                  placeholder="Share your thoughts about this product..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div> */}
<div className="mb-8 p-6 bg-gray-50 rounded-lg">
  <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
  <form onSubmit={handleReviewSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Your Rating</label>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setNewReview({ ...newReview, rating: star })}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
          >
            <StarIcon
              className={`h-8 w-8 ${star <= (hoverRating || newReview.rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
                }`}
            />
          </button>
        ))}
      </div>
    </div>

    <div className="mb-4">
      <label htmlFor="comment" className="block text-gray-700 mb-2">Review</label>
      <textarea
        id="comment"
        name="comment"
        value={newReview.comment}
        onChange={handleReviewChange}
        rows="4"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
        placeholder="Share your thoughts about this product..."
        required
      ></textarea>
    </div>

    <button
      type="submit"
      className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
    >
      Submit Review
    </button>
  </form>
</div>

          {/* Reviews List */}
          <div className="space-y-6">
  {reviews.length === 0 ? (
    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
  ) : (
    reviews.map((review) => (
      <div
        key={review._id}
        className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
      >
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-5 w-5 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="font-medium text-gray-900">
            {review.user?.name || "Anonymous"}
          </span>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-700">{review.comment}</p>
      </div>
    ))
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default Buynow;