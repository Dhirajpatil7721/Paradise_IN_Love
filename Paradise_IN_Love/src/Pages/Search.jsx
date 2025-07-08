// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import SearchProduct from "../Pages/SearchProduct";
// import searchnotfound from "../assets/Search.gif";

// export default function Search() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     if (!query.trim()) {
//       toast.warn("Please enter a search term");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:8080/api/product/search-product", {
//         search: query, // ✅ match backend 'search' key
//       });

//       setResults(res.data.data || []);
//     } catch (err) {
//       toast.error("Search failed");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="mt-28 px-4 md:px-20 py-4">
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search product name or description..."
//           className="border px-4 py-2 rounded-l w-64 md:w-96 focus:outline-none"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button
//           className="bg-pink-500 text-white px-4 py-2 rounded-r hover:bg-pink-600"
//           onClick={handleSearch}
//         >
//           Search
//         </button>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {results.length > 0 ? (
//           results.map((product) => (
//             <SearchProduct key={product._id} product={product} />
//           ))
//         ) : (
//           <div className="w-100% ">
//             <img className=" h-60  ml-80" src={searchnotfound} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SearchProduct from "../Pages/SearchProduct";
import searchnotfound from "../assets/Search.gif";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // const handleSearch = async () => {
  //   if (!query.trim()) {
  //     toast.warn("Please enter a search term");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post("http://localhost:8080/api/product/search-product", {
  //       search: query,
  //     });

  //     setResults(res.data.data || []);
  //   } catch (err) {
  //     toast.error("Search failed");
  //     console.error(err);
  //   }
  // };
  

  // 🔑 Trigger search on Enter key
  
  const handleSearch = async () => {
  if (!query.trim()) {
    toast.warn("Please enter a search term");
    return;
  }

  try {
    const res = await axios.post("http://localhost:8080/api/product/search-product", {
      search: query,
    });

    console.log("Search result:", res.data);
    setResults(res.data.data || []);
  } catch (err) {
    toast.error("Search failed");
    console.error(err);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mt-28 px-4 md:px-20 py-4">
      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search product name or description..."
          className="border px-4 py-2 rounded-l w-64 md:w-96 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // 👈 added this
        />
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-r hover:bg-pink-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.length > 0 ? (
          results.map((product) => (
            <SearchProduct key={product._id} product={product} />
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full mt-10">
            <img
              className="h-60 w-auto max-w-full"
              src={searchnotfound}
              alt="No results found"
            />
          </div>
        )}
      </div>
    </div>
  );
}
