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



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Buynow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const productDetails = location.state?.product || JSON.parse(sessionStorage.getItem("buy-now-product"));
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    if (location.state?.product) {
      sessionStorage.setItem("buy-now-product", JSON.stringify(location.state.product));
    }
  }, [location.state]);

  if (!productDetails) {
    return <div className="mt-20 text-center text-red-500">Product details not found.</div>;
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) setQuantity(value);
  };

  const handleCheckout = () => {
    const checkoutData = {
      product: productDetails,
      quantity,
      size: selectedSize
    };
    navigate("/placeorder", { state: checkoutData });
  };

  let sizeList = [];
  const rawSize = productDetails?.more_details?.size;
  if (Array.isArray(rawSize)) {
    sizeList = rawSize;
  } else if (typeof rawSize === 'string') {
    sizeList = rawSize.trim().split(/\s+/);
  }

  return (
    <div className="mt-20 max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <img
          src={productDetails.imageUrl || 'https://via.placeholder.com/300x300.png?text=No+Image'}
          alt={productDetails.name}
          className="w-56 h-64 object-cover rounded-lg border"
        />
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">{productDetails.name}</h2>
          <p className="text-gray-600">{productDetails.description}</p>
          <div className="text-xl font-bold text-pink-600">₹{productDetails.price}</div>
          <div className="text-l line-through text-gray-500">₹{productDetails.mrp}</div>

          {sizeList.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mt-3">Size</h4>
              <div className="flex gap-2 mt-2">
                {sizeList.map((size) => {
                  const upperSize = size.toUpperCase();
                  return (
                    <button
                      key={upperSize}
                      onClick={() => setSelectedSize(upperSize)}
                      className={`px-3 py-1 border rounded ${selectedSize === upperSize
                        ? 'bg-pink-100 border-pink-500 text-pink-700'
                        : 'border-gray-300 text-gray-700'
                        }`}
                    >
                      {upperSize}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border border-gray-300"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-12 text-center border-y border-gray-300"
              />
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="px-3 py-1 border border-gray-300"
              >
                +
              </button>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded"
            >
              Buy Now – ₹{(productDetails.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buynow;
