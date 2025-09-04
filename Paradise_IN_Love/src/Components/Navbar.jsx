
// import { useState, useRef, useEffect } from "react";
// import {
//   FaSearch,
//   FaUser,
//   FaHeart,
//   FaShoppingCart,
//   FaTimes,
//   FaHome,
//   FaBars,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Navbar() {
//   const [activeLink, setActiveLink] = useState("Home");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Fetch categories
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/category/get-category', {
//       withCredentials: true,
//     })
//       .then((res) => {
//         const minimalCategories = res.data.data.map(cat => ({
//           _id: cat._id,
//           name: cat.name,
//           slug: cat.name.toLowerCase().replace(/\s+/g, '-')
//         }));
//         setCategories(minimalCategories);
//       })
//       .catch((err) => {
//         console.error('Error fetching categories:', err);
//       });
//   }, []);

//   // const handleCategoryClick = (category) => {
//   //   setActiveLink(category.name);
//   //   navigate(`/${category.slug}`, {
//   //     state: {
//   //       categoryId: category._id,
//   //       categoryName: category.name,
//   //       fullCategory: category,
//   //       event: "user-click"
//   //     }
//   //   });
//   // };
//   const handleCategoryClick = (category) => {
//     console.log("🖱️ Clicked Category ID:", category._id); // ✅ Log here
//     setActiveLink(category.name);
//     navigate(`/${category.slug}`, {
//       state: {
//         categoryId: category._id,
//         categoryName: category.name,
//         fullCategory: category,
//         event: "user-click"
//       }
//     });
//   };

//   return (
//     <nav className="mt-5 ml-4 mr-4 md:ml-28 md:mr-2 bg-white/10 backdrop-blur-md border border-white/10 w-[95%] md:w-5/6 px-4 md:px-6 py-3 fixed top-0 z-50 text-black dark:text-white font-bold rounded-lg">
//       <div className="flex items-center justify-between max-w-7xl mx-auto">
//         <motion.div whileHover={{ scale: 1.05 }} className="w-24 md:w-32 h-auto">
//           <img
//             src="src/assets/logo.jpeg"
//             alt="Paradise in Love Logo"
//             className="w-full h-auto object-contain"
//           />
//         </motion.div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex space-x-4 relative">
//           {categories.slice(-7).map((cat) => (  // Changed from slice(0, 6) to slice(-6)
//             <motion.div
//               key={cat._id}
//               className="relative"
//               whileHover={{ scale: 1.05 }}
//             >
//               <button
//                 onClick={() => handleCategoryClick(cat)}

//                 // className={`relative px-1 py-2 text-gray-900 hover:text-pink-600 transition-colors ${activeLink === cat.name ? "text-pink-600 font-medium" : ""
//                 //   }`}

//                 className={`relative px-1 py-2 no-underline  border-none bg-none font-semibold font-[Poppins] text-greay transition-colors before:content-[''] before:ml-auto before:block before:h-[2px] before:w-0 before:bg-[#f44336] before:transition-all before:duration-500 after:content-[''] after:block after:h-[2px] after:w-0 after:bg-[#f44336] after:transition-all after:duration-500 hover:before:w-full hover:after:w-full ${activeLink === cat.name ? "text-[#f44336] font-medium" : "hover:text-[#f44336]"
//                   }`}


//               >
//                 {cat.name}
//                 {activeLink === cat.name && (
//                   <motion.span
//                     layoutId="navUnderline"
//                     className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-600 rounded-full"
//                     transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
//                   />
//                 )}
//               </button>
//             </motion.div>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center space-x-4">
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={() => navigate('/search')}
//             className="text-gray-900 hover:text-pink-600"
//           >
//             <FaSearch className="text-lg" />
//           </motion.button>

//           <button
//             className="text-black dark:text-white text-xl"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Desktop Right Icons */}
//         <div className="hidden md:flex items-center space-x-4">
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={() => navigate('/search')}
//             className="text-gray-900 hover:text-pink-600"
//           >
//             <FaSearch className="text-lg" />
//           </motion.button>

//           <motion.div whileHover={{ y: -2 }}>
//             <Link to="/" className="text-gray-900 hover:text-pink-600">
//               <FaHome className="text-xl" />
//             </Link>
//           </motion.div>
//           <motion.div whileHover={{ y: -2 }}>
//             <Link to="/wishlist" className="text-gray-900 hover:text-red-600">
//               <FaHeart className="text-xl" />
//             </Link>
//           </motion.div>
//           <motion.div whileHover={{ y: -2 }}>
//             <Link to="/cart" className="text-gray-900 hover:text-pink-600">
//               <FaShoppingCart className="text-xl" />
//             </Link>
//           </motion.div>

//           {/* User Dropdown */}
//           <div className="relative">
//             <motion.div
//               whileHover={{ y: -2 }}
//               onClick={() => setOpen(!open)}
//               className="cursor-pointer"
//             >
//               <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
//                 <FaUser className="text-sm" />
//               </div>
//             </motion.div>

//             {open && (
//               <motion.div
//                 ref={dropdownRef}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md z-50"
//               >
//                 <Link
//                   to="/account"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   onClick={() => setOpen(false)}
//                 >
//                   Account
//                 </Link>
//                 <Link
//                   to="/userorders"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   onClick={() => setOpen(false)}
//                 >
//                   Orders
//                 </Link>
//                 <Link
//                   to="/signin"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   onClick={() => setOpen(false)}
//                 >
//                   Sign In
//                 </Link>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden mt-4 bg-white rounded-lg shadow-md px-4 py-3 space-y-4 z-40 overflow-hidden"
//           >
//             {/* Main Navigation Links */}
//             <div className="space-y-3">
//               {categories.slice(0, 6).map((cat) => (
//                 <div key={cat._id} className="space-y-1">
//                   <button
//                     onClick={() => {
//                       handleCategoryClick(cat);
//                       setMenuOpen(false);
//                     }}
//                     className="flex items-center text-gray-800 font-medium py-2 w-full text-left"
//                   >
//                     {cat.name}
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Mobile Icons Row */}
//             <div className="flex justify-around border-t border-gray-200 pt-3">
//               <Link
//                 to="/"
//                 className="text-gray-900 hover:text-pink-600 flex flex-col items-center"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <FaHome className="text-xl" />
//                 <span className="text-xs mt-1">Home</span>
//               </Link>
//               <Link
//                 to="/wishlist"
//                 className="text-gray-900 hover:text-pink-600 flex flex-col items-center"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <FaHeart className="text-xl" />
//                 <span className="text-xs mt-1">Wishlist</span>
//               </Link>
//               <Link
//                 to="/cart"
//                 className="text-gray-900 hover:text-pink-600 flex flex-col items-center"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <FaShoppingCart className="text-xl" />
//                 <span className="text-xs mt-1">Cart</span>
//               </Link>
//               <Link
//                 to="/account"
//                 className="text-gray-900 hover:text-pink-600 flex flex-col items-center"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
//                   <FaUser className="text-sm" />
//                 </div>
//                 <span className="text-xs mt-1">Account</span>
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }




import { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaTimes,
  FaHome,
  FaBars,
  FaSignInAlt,
  FaBox,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {paradieselogo} from '../assets/logo.jpeg'

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch categories
  useEffect(() => {
    axios.get('http://localhost:8080/api/category/get-category', {
      withCredentials: true,
    })
      .then((res) => {
        const minimalCategories = res.data.data.map(cat => ({
          _id: cat._id,
          name: cat.name,
          slug: cat.name.toLowerCase().replace(/\s+/g, '-')
        }));
        setCategories(minimalCategories);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  // const handleCategoryClick = (category) => {
  //   setActiveLink(category.name);
  //   navigate(`/${category.slug}`, {
  //     state: {
  //       categoryId: category._id,
  //       categoryName: category.name,
  //       fullCategory: category,
  //       event: "user-click"
  //     }
  //   });
  // };
  const handleCategoryClick = (category) => {
    console.log("🖱️ Clicked Category ID:", category._id); // ✅ Log here
    setActiveLink(category.name);
    navigate(`/${category.slug}`, {
      state: {
        categoryId: category._id,
        categoryName: category.name,
        fullCategory: category,
        event: "user-click"
      }
    });
  };

  return (
    <nav className="mt-5 ml-4 mr-4 md:ml-28 md:mr-2 bg-white/10 backdrop-blur-md border border-white/10 w-[95%] md:w-5/6 px-4 md:px-6 py-3 fixed top-0 z-50 text-black dark:text-white font-bold rounded-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <motion.div whileHover={{ scale: 1.05 }} className="w-24 md:w-32 h-auto">
          <img
            src={paradieselogo}
            alt="Paradise in Love Logo"
            className="w-full h-auto object-contain"
            onClick={()=>navigate('/')}
          />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 relative">
          {categories.slice(-7).map((cat) => (  // Changed from slice(0, 6) to slice(-6)
            <motion.div
              key={cat._id}
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <button
                onClick={() => handleCategoryClick(cat)}

                // className={`relative px-1 py-2 text-gray-900 hover:text-pink-600 transition-colors ${activeLink === cat.name ? "text-pink-600 font-medium" : ""
                //   }`}

                className={`relative px-1 py-2 no-underline  border-none bg-none font-semibold font-[Poppins] text-greay transition-colors before:content-[''] before:ml-auto before:block before:h-[2px] before:w-0 before:bg-[#f44336] before:transition-all before:duration-500 after:content-[''] after:block after:h-[2px] after:w-0 after:bg-[#f44336] after:transition-all after:duration-500 hover:before:w-full hover:after:w-full ${activeLink === cat.name ? "text-[#f44336] font-medium" : "hover:text-[#f44336]"
                  }`}


              >
                {cat.name}
                {activeLink === cat.name && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-600 rounded-full"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/search')}
            className="text-gray-900 hover:text-pink-600"
          >
            <FaSearch className="text-lg" />
          </motion.button>

          <button
            className="text-black dark:text-white text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Right Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/search')}
            className="text-gray-900 hover:text-pink-600"
          >
            <FaSearch className="text-lg" />
          </motion.button>

          <motion.div whileHover={{ y: -2 }}>
            <Link to="/" className="text-gray-900 hover:text-pink-600">
              <FaHome className="text-xl" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <Link to="/wishlist" className="text-gray-900 hover:text-red-600">
              <FaHeart className="text-xl" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <Link to="/cart" className="text-gray-900 hover:text-pink-600">
              <FaShoppingCart className="text-xl" />
            </Link>
          </motion.div>

          {/* User Dropdown */}
          <div className="relative">
            <motion.div
              whileHover={{ y: -2 }}
              onClick={() => setOpen(!open)}
              className="cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
                <FaUser className="text-sm" />
              </div>
            </motion.div>

            {open && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md z-50"
              >
                <Link
                  to="/account"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Account
                </Link>
                <Link
                  to="/userorders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/signin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-white rounded-lg shadow-md px-4 py-3 space-y-4 z-40 overflow-hidden"
          >
            {/* Main Navigation Links */}
            <div className="space-y-3">
              {categories.slice(0, 6).map((cat) => (
                <div key={cat._id} className="space-y-1">
                  <button
                    onClick={() => {
                      handleCategoryClick(cat);
                      setMenuOpen(false);
                    }}
                    className="flex items-center text-gray-800 font-medium py-2 w-full text-left"
                  >
                    {cat.name}
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Icons Row */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 border-t border-gray-200 pt-3 px-2">
              <Link
                to="/"
                className="text-gray-900 hover:text-pink-600 flex flex-col items-center p-1"
                onClick={() => setMenuOpen(false)}
              >
                <FaHome className="text-xl" />
                <span className="text-xs mt-1">Home</span>
              </Link>
              <Link
                to="/wishlist"
                className="text-gray-900 hover:text-pink-600 flex flex-col items-center p-1"
                onClick={() => setMenuOpen(false)}
              >
                <FaHeart className="text-xl" />
                <span className="text-xs mt-1">Wishlist</span>
              </Link>
              <Link
                to="/cart"
                className="text-gray-900 hover:text-pink-600 flex flex-col items-center p-1"
                onClick={() => setMenuOpen(false)}
              >
                <FaShoppingCart className="text-xl" />
                <span className="text-xs mt-1">Cart</span>
              </Link>
              <Link
                to="/userorders"
                className="text-gray-900 hover:text-pink-600 flex flex-col items-center p-1"
                onClick={() => setMenuOpen(false)}
              >
                <FaBox className="text-xl" />
                <span className="text-xs mt-1">Orders</span>
              </Link>
              <Link
                to="/signin"
                className="text-gray-900 hover:text-pink-600 flex flex-col items-center p-1 sm:col-span-1"
                onClick={() => setMenuOpen(false)}
              >
                <FaSignInAlt className="text-xl" />
                <span className="text-xs mt-1">Sign In</span>
              </Link>
              <Link
                to="/account"
                className="text-gray-900 hover:text-pink-600 flex flex-col items-center p-1 sm:col-span-1"
                onClick={() => setMenuOpen(false)}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
                  <FaUser className="text-sm" />
                </div>
                <span className="text-xs mt-1">Account</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}




