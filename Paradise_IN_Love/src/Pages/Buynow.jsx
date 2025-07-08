// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { StarIcon } from '@heroicons/react/24/solid';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Buynow = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const productDetails = location.state?.product || JSON.parse(sessionStorage.getItem("buy-now-product"));
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(productDetails?.more_details?.size?.[0] || '');
//   const [selectedColor, setSelectedColor] = useState(productDetails?.more_details?.color?.[0] || '');
//   const [reviews, setReviews] = useState([]);
//   const [mainImage, setMainImage] = useState(productDetails?.image?.[0]);
//   const [newReview, setNewReview] = useState({
//     userName: '',
//     rating: 0,
//     comment: '',
//     isAnonymous: false
//   });
//   const [hoverRating, setHoverRating] = useState(0);

//   useEffect(() => {
//     if (location.state?.product) {
//       sessionStorage.setItem("buy-now-product", JSON.stringify(location.state.product));
//     }
//   }, [location.state]);

//   useEffect(() => {
//     const productId = productDetails?._id || productDetails?.id;
//     if (productId) {
//       fetch("http://localhost:8080/api/review/product-details", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ productId }),
//       })
//         .then((res) => res.json())
//         .then((data) => setReviews(data?.data || []))
//         .catch((err) => console.error("Failed to fetch reviews:", err));
//     }
//   }, [productDetails]);


//   const handleQuantityChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (value >= 1 && value <= 10) setQuantity(value);
//   };
// const firstImage = Array.isArray(productDetails.image) && productDetails.image.length > 0
//     ? productDetails.image[0]
//     : '';
//   const handleCheckout = () => {
//     if (!selectedSize) {
//       toast.error("Please select a size");
//       return;
//     }

//     const checkoutData = {
//       product: productDetails,
//       quantity,
//       image:firstImage,
//       size: selectedSize,
//       color: selectedColor
//     };
//     navigate("/placeorder", { state: checkoutData });
//   };

//   // ... (keep all other existing functions the same)

//   let sizeList = [];
//   const rawSize = productDetails?.more_details?.size;
//   if (Array.isArray(rawSize)) {
//     sizeList = rawSize;
//   } else if (typeof rawSize === 'string') {
//     sizeList = rawSize.trim().split(/\s+/);
//   }

//   let colorList = [];
//   const rawColor = productDetails?.more_details?.color;
//   if (Array.isArray(rawColor)) {
//     colorList = rawColor;
//   } else if (typeof rawColor === 'string') {
//     colorList = rawColor.trim().split(/\s+/);
//   }


//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     if (!newReview.rating || !newReview.comment) return toast.error("Please add a rating and comment");

//     const userName = newReview.isAnonymous ? 'Anonymous' : newReview.userName || 'Anonymous';
//     const productId = productDetails._id || productDetails.id;
//     const userId = productDetails.userId || productDetails.user_Id;

//     const reviewData = {
//       productId,
//       userId,
//       userName,
//       rating: newReview.rating,
//       comment: newReview.comment,
//     };

//     try {
//       const response = await fetch("http://localhost:8080/api/review/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(reviewData),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         toast.success("Review submitted successfully");
//         setReviews([{
//           ...reviewData,
//           _id: result.data?._id || Date.now().toString(),
//           createdAt: new Date().toISOString()
//         }, ...reviews]);
//         setNewReview({ userName: '', rating: 0, comment: '', isAnonymous: false });
//       } else {
//         toast.error(result.message || "Failed to submit review");
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   const handleReviewChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewReview(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };
//   return (
//     <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <ToastContainer autoClose={50} />
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//           <div className="flex flex-col md:flex-row">
//             {/* Image Section */}
//             <div className="md:w-1/3 p-4 sm:p-6 flex justify-center items-center bg-gray-100">
//               <div className="relative w-full h-64 sm:h-80 md:h-96">
//                 <img
//                   src={mainImage || 'https://via.placeholder.com/500'}
//                   alt={productDetails.name}
//                   className="w-full h-full object-contain rounded-lg"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/500';
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="md:w-2/3 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{productDetails.name}</h1>

//                 <ul className="list-disc pl-5 text-gray-600 mb-4 text-sm sm:text-base">
//                   {Array.isArray(productDetails.description)
//                     ? productDetails.description.map((desc, index) => (
//                       <li key={index}>{desc}</li>
//                     ))
//                     : <li>{productDetails.description}</li>}
//                 </ul>

//                 <div className="flex items-center flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-2">
//                   <span className="text-xl sm:text-2xl font-bold text-pink-600">₹{productDetails.price}</span>
//                   <span className="text-base sm:text-lg line-through text-gray-500">₹{productDetails.mrp}</span>
//                   <span className="text-xs sm:text-sm font-medium bg-pink-100 text-pink-800 px-2 py-1 rounded">
//                     {Math.round((1 - productDetails.price / productDetails.mrp) * 100)}% OFF
//                   </span>
//                 </div>

//                 {/* Image Thumbnails */}
//                 {Array.isArray(productDetails.image) && productDetails.image.length > 1 && (
//                   <div className="mt-3 mb-4 flex flex-wrap gap-2">
//                     {productDetails.image.map((img, idx) => (
//                       <img
//                         key={idx}
//                         src={img}
//                         alt={`Thumbnail ${idx}`}
//                         onClick={() => setMainImage(img)}
//                         className={`w-16 h-16 object-cover rounded cursor-pointer border ${mainImage === img ? 'border-pink-600' : 'border-transparent'}`}
//                       />
//                     ))}
//                   </div>
//                 )}

//                 {/* Size Selection */}
//                 {sizeList.length > 0 && (
//                   <div className="mb-4">
//                     <h3 className="text-base sm:text-lg font-medium mb-2">Select Size</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {sizeList.map(size => {
//                         const upperSize = size.toUpperCase();
//                         return (
//                           <button
//                             key={upperSize}
//                             onClick={() => setSelectedSize(upperSize)}
//                             className={`px-3 sm:px-4 py-1 sm:py-2 border-2 rounded-md font-medium text-sm sm:text-base ${selectedSize === upperSize ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-700 hover:border-pink-300'}`}
//                           >
//                             {upperSize}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Color Selection */}
//                 {colorList.length > 0 && (
//                   <div className="mb-4">
//                     <h3 className="text-base sm:text-lg font-medium mb-2">Select Color</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {colorList.map((color, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => setSelectedColor(color)}
//                           className={`px-3 sm:px-4 py-1 sm:py-2 border-2 rounded-md font-medium text-sm sm:text-base ${selectedColor === color ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-700 hover:border-pink-300'}`}
//                         >
//                           {color}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
//                 <div className="flex items-center">
//                   <span className="text-base sm:text-lg font-medium mr-2 sm:mr-4">Quantity:</span>
//                   <div className="flex border rounded-md overflow-hidden">
//                     <button
//                       onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                       className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
//                     >−</button>
//                     <input
//                       type="number"
//                       value={quantity}
//                       onChange={handleQuantityChange}
//                       min="1"
//                       max="10"
//                       className="w-10 sm:w-12 text-center border-x focus:outline-none"
//                     />
//                     <button
//                       onClick={() => setQuantity(q => Math.min(10, q + 1))}
//                       className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
//                     >+</button>
//                   </div>


//                   <span className='ml-12'>
//                     {productDetails.stock <= 10 && (
//                       <h1 className={`font-semibold ${productDetails.stock === 0 ? "text-red-600" : "text-yellow-600"}`}>
//                         {productDetails.stock === 0
//                           ? "Out of Stock"
//                           : productDetails.stock <= 5
//                             ? `Only ${productDetails.stock} left`
//                             : `${productDetails.stock} in stock`}
//                       </h1>
//                     )}
//                   </span>


//                 </div>

//                 <div className="flex flex-col items-end">
//                   <span className="text-base sm:text-lg font-medium mb-1">
//                     Total: ₹{(productDetails.price * quantity).toFixed(2)}
//                   </span>
//                   <button
//                     onClick={handleCheckout}
//                     className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md shadow transition-colors"
//                   >
//                     Buying Price : ₹{(productDetails.price * quantity).toFixed(2)}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Customer Reviews</h2>

//           {/* Review Form */}
//           <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
//             <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Write a Review</h3>
//             <form onSubmit={handleReviewSubmit}>
//               {!newReview.isAnonymous && (
//                 <div className="mb-3 sm:mb-4">
//                   <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Your Name</label>
//                   <input
//                     type="text"
//                     name="userName"
//                     value={newReview.userName}
//                     onChange={handleReviewChange}
//                     className="w-full px-3 py-2 border rounded-md text-sm sm:text-base"
//                     placeholder="Enter your name"
//                   />
//                 </div>
//               )}
//               <div className="mb-3 sm:mb-4">
//                 <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Your Rating</label>
//                 <div className="flex">
//                   {[1, 2, 3, 4, 5].map(star => (
//                     <button
//                       key={star}
//                       type="button"
//                       onClick={() => setNewReview({ ...newReview, rating: star })}
//                       onMouseEnter={() => setHoverRating(star)}
//                       onMouseLeave={() => setHoverRating(0)}
//                       className="focus:outline-none"
//                     >
//                       <StarIcon className={`h-6 w-6 sm:h-8 sm:w-8 ${star <= (hoverRating || newReview.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="mb-3 sm:mb-4">
//                 <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Review</label>
//                 <textarea
//                   name="comment"
//                   value={newReview.comment}
//                   onChange={handleReviewChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border rounded-md text-sm sm:text-base"
//                   placeholder="Share your thoughts..."
//                   required
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="px-4 sm:px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors text-sm sm:text-base"
//               >
//                 Submit Review
//               </button>
//             </form>
//           </div>

//           {/* Reviews List */}
//           <div className="space-y-4 sm:space-y-6">
//             {reviews.length === 0 ? (
//               <p className="text-gray-500 text-sm sm:text-base">No reviews yet. Be the first to review!</p>
//             ) : (
//               reviews.map((review) => (
//                 <div key={review._id} className="border-b pb-4 sm:pb-6 last:border-0 last:pb-0">
//                   <div className="flex items-center mb-1 sm:mb-2">
//                     <div className="flex mr-2">
//                       {[1, 2, 3, 4, 5].map(star => (
//                         <StarIcon key={star} className={`h-4 w-4 sm:h-5 sm:w-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
//                       ))}
//                     </div>
//                     <span className="font-medium text-gray-900 text-sm sm:text-base">{review.userName || "Anonymous"}</span>
//                     <span className="mx-2 text-gray-500">•</span>
//                     <span className="text-xs sm:text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
//                   </div>
//                   <p className="text-gray-700 text-sm sm:text-base">{review.comment}</p>
//                 </div>
//               ))
//             )}
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
import 'react-toastify/dist/ReactToastify.css';

const Buynow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const productDetails = location.state?.product || JSON.parse(sessionStorage.getItem("buy-now-product"));
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(productDetails?.more_details?.size?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(productDetails?.more_details?.color?.[0] || '');
  const [reviews, setReviews] = useState([]);
  const [mainImage, setMainImage] = useState(productDetails?.image?.[0]);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 0,
    comment: '',
    isAnonymous: false
  });
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (location.state?.product) {
      sessionStorage.setItem("buy-now-product", JSON.stringify(location.state.product));
    }
  }, [location.state]);

  useEffect(() => {
    const productId = productDetails?._id || productDetails?.id;
    if (productId) {
      fetch("http://localhost:8080/api/review/product-details", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((data) => setReviews(data?.data || []))
        .catch((err) => console.error("Failed to fetch reviews:", err));
    }
  }, [productDetails]);


  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) setQuantity(value);
  };
  const firstImage = Array.isArray(productDetails.image) && productDetails.image.length > 0
    ? productDetails.image[0]
    : '';
  const handleCheckout = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const checkoutData = {
      product: productDetails,
      quantity,
      image: firstImage,
      size: selectedSize,
      color: selectedColor
    };
    navigate("/placeorder", { state: checkoutData });
  };

  // ... (keep all other existing functions the same)

  let sizeList = [];
  const rawSize = productDetails?.more_details?.size;
  if (Array.isArray(rawSize)) {
    sizeList = rawSize;
  } else if (typeof rawSize === 'string') {
    sizeList = rawSize.trim().split(/\s+/);
  }

  let colorList = [];
  const rawColor = productDetails?.more_details?.color;
  if (Array.isArray(rawColor)) {
    colorList = rawColor;
  } else if (typeof rawColor === 'string') {
    colorList = rawColor.trim().split(/\s+/);
  }


  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.comment) return toast.error("Please add a rating and comment");

    const userName = newReview.isAnonymous ? 'Anonymous' : newReview.userName || 'Anonymous';
    const productId = productDetails._id || productDetails.id;
    const userId = productDetails.userId || productDetails.user_Id;

    const reviewData = {
      productId,
      userId,
      userName,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    try {
      const response = await fetch("http://localhost:8080/api/review/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Review submitted successfully");
        setReviews([{
          ...reviewData,
          _id: result.data?._id || Date.now().toString(),
          createdAt: new Date().toISOString()
        }, ...reviews]);
        setNewReview({ userName: '', rating: 0, comment: '', isAnonymous: false });
      } else {
        toast.error(result.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleReviewChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewReview(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  // Helper function to extract YouTube ID
  function getYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // Add this state to your component
  const [showVideo, setShowVideo] = useState(false);



  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer autoClose={50} />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/3 p-4 sm:p-6 flex justify-center items-center bg-gray-100 rounded-lg">
              {mainImage && (mainImage.includes('youtube.com') || mainImage.includes('youtu.be')) ? (
                <div className="relative w-full aspect-video overflow-hidden rounded-lg group">
                  {/* YouTube Thumbnail with Play Button */}
                  <div className="relative w-full h-full cursor-pointer" onClick={() => setShowVideo(true)}>
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeId(mainImage)}/maxresdefault.jpg`}
                      alt="YouTube thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://img.youtube.com/vi/${getYouTubeId(mainImage)}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Video Player (shown when clicked) */}
                  {showVideo && (
                    <div className="absolute inset-0 z-10">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(mainImage)}?autoplay=1`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Product Video"
                      />
                      <button
                        onClick={() => setShowVideo(false)}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Regular Image Display
                <div className="relative w-full h-64 sm:h-80 md:h-96">
                  <img
                    src={mainImage || 'https://via.placeholder.com/500'}
                    alt={productDetails.name}
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="md:w-2/3 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{productDetails.name}</h1>

                <ul className="list-disc pl-5 text-gray-600 mb-4 text-sm sm:text-base">
                  {Array.isArray(productDetails.description)
                    ? productDetails.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))
                    : <li>{productDetails.description}</li>}
                </ul>

                <div className="flex items-center flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-2">
                  <span className="text-xl sm:text-2xl font-bold text-pink-600">₹{productDetails.price}</span>
                  <span className="text-base sm:text-lg line-through text-gray-500">₹{productDetails.mrp}</span>
                  <span className="text-xs sm:text-sm font-medium bg-pink-100 text-pink-800 px-2 py-1 rounded">
                    {Math.round((1 - productDetails.price / productDetails.mrp) * 100)}% OFF
                  </span>
                </div>

                {/* Image Thumbnails */}
                {/* {Array.isArray(productDetails.image) && productDetails.image.length > 1 && (
                  <div className="mt-3 mb-4 flex flex-wrap gap-2">
                    {productDetails.image.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Thumbnail ${idx}`}
                        onClick={() => setMainImage(img)}
                        className={`w-16 h-16 object-cover rounded cursor-pointer border ${mainImage === img ? 'border-pink-600' : 'border-transparent'}`}
                      />
                    ))}
                  </div>
                )} */}
                {Array.isArray(productDetails.image) && productDetails.image.length > 1 && (
                  <div className="mt-3 mb-4 flex flex-wrap gap-2">
                    {productDetails.image.map((img, idx) => {
                      // Check if this is a YouTube URL
                      const isYouTube = img.includes('youtube.com') || img.includes('youtu.be');
                      const videoId = isYouTube ? getYouTubeId(img) : null;

                      return (
                        <div
                          key={idx}
                          onClick={() => setMainImage(img)}
                          className={`relative w-16 h-16 rounded cursor-pointer overflow-hidden ${mainImage === img ? 'ring-2 ring-pink-600' : 'border border-gray-200'}`}
                        >
                          {isYouTube ? (
                            // YouTube Thumbnail with Play Icon
                            <>
                              <img
                                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                                alt={`YouTube thumbnail ${idx}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition">
                                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </>
                          ) : (
                            // Regular Image Thumbnail
                            <img
                              src={img}
                              alt={`Thumbnail ${idx}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/80';
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* Size Selection */}
                {sizeList.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-medium mb-2">Select Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {sizeList.map(size => {
                        const upperSize = size.toUpperCase();
                        return (
                          <button
                            key={upperSize}
                            onClick={() => setSelectedSize(upperSize)}
                            className={`px-3 sm:px-4 py-1 sm:py-2 border-2 rounded-md font-medium text-sm sm:text-base ${selectedSize === upperSize ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-700 hover:border-pink-300'}`}
                          >
                            {upperSize}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {colorList.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-medium mb-2">Select Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {colorList.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 sm:px-4 py-1 sm:py-2 border-2 rounded-md font-medium text-sm sm:text-base ${selectedColor === color ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-700 hover:border-pink-300'}`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                <div className="flex items-center">
                  <span className="text-base sm:text-lg font-medium mr-2 sm:mr-4">Quantity:</span>
                  <div className="flex border rounded-md overflow-hidden">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >−</button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max="10"
                      className="w-10 sm:w-12 text-center border-x focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(q => Math.min(10, q + 1))}
                      className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >+</button>
                  </div>


                  <span className='ml-12'>
                    {productDetails.stock <= 10 && (
                      <h1 className={`font-semibold ${productDetails.stock === 0 ? "text-red-600" : "text-yellow-600"}`}>
                        {productDetails.stock === 0
                          ? "Out of Stock"
                          : productDetails.stock <= 5
                            ? `Only ${productDetails.stock} left`
                            : `${productDetails.stock} in stock`}
                      </h1>
                    )}
                  </span>


                </div>

                <div className="flex flex-col items-end">
                  <span className="text-base sm:text-lg font-medium mb-1">
                    Total: ₹{(productDetails.price * quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={handleCheckout}
                    className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md shadow transition-colors"
                  >
                    Buying Price : ₹{(productDetails.price * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Customer Reviews</h2>

          {/* Review Form */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              {!newReview.isAnonymous && (
                <div className="mb-3 sm:mb-4">
                  <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Your Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={newReview.userName}
                    onChange={handleReviewChange}
                    className="w-full px-3 py-2 border rounded-md text-sm sm:text-base"
                    placeholder="Enter your name"
                  />
                </div>
              )}
              <div className="mb-3 sm:mb-4">
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Your Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <StarIcon className={`h-6 w-6 sm:h-8 sm:w-8 ${star <= (hoverRating || newReview.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3 sm:mb-4">
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Review</label>
                <textarea
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md text-sm sm:text-base"
                  placeholder="Share your thoughts..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 sm:px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors text-sm sm:text-base"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-4 sm:space-y-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm sm:text-base">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="border-b pb-4 sm:pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center mb-1 sm:mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <StarIcon key={star} className={`h-4 w-4 sm:h-5 sm:w-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900 text-sm sm:text-base">{review.userName || "Anonymous"}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-xs sm:text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{review.comment}</p>
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

