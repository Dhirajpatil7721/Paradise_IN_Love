// import React from "react";
// import { Link } from "react-router-dom";

// export default function SearchProduct({ product }) {
//   return (
//     <div className="border rounded-lg shadow p-3">
//       <img
//         src={product.image[0]}
//         alt={product.name}
//         className="h-40 w-full object-cover rounded"
//       />
//       <h3 className="text-sm font-semibold mt-2">{product.name}</h3>
//       <p className="text-gray-500 text-sm">
//         {product.description?.substring(0, 50)}...
//       </p>
//       <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
//       <Link
//         to={`/buynow/${product._id}`}
//         className="text-sm mt-2 inline-block text-pink-500 hover:underline"
//       >
//         View Details
//       </Link>
//     </div>
//   );
// }


// import React from "react";
// import { Link } from "react-router-dom";

// export default function SearchProduct({ product }) {
//   return (
//     <div className="border rounded-lg shadow p-3">
//       <img
//         src={product.image?.[0] || "https://via.placeholder.com/150"}
//         alt={product.name}
//         className="h-40 w-full object-cover rounded"
//       />
//       <h3 className="text-sm font-semibold mt-2">{product.name}</h3>

//       <p className="text-gray-500 text-sm">
//         {Array.isArray(product.description)
//           ? product.description[0]?.substring(0, 50)
//           : product.description?.substring(0, 50)}...
//       </p>

//       <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>

//       <Link
//         to={`/buynow`}
//         className="text-sm mt-2 inline-block text-pink-500 hover:underline"
//       >
//         View Details
//       </Link>
//     </div>
//   );
// }




import React from "react";
import { Link } from "react-router-dom";

export default function SearchProduct({ product }) {
  return (
    <div className="border rounded-lg shadow p-3">
    
      <img
        src={product.image?.[0] || "https://via.placeholder.com/150"}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="text-sm font-semibold mt-2">{product.name}</h3>

      <p className="text-gray-500 text-sm">
        {Array.isArray(product.description)
          ? product.description[0]?.substring(0, 50)
          : product.description?.substring(0, 50)}...
      </p>

      <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>

      <Link
        to="/buynow"
        state={{ product }} // ✅ send product via state
        className="text-sm mt-2 inline-block text-pink-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}
