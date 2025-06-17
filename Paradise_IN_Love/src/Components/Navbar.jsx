// import { useState } from "react";
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
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeLink, setActiveLink] = useState("Home");
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [open, setOpen] = useState(false);
//   const navLinks = [
//     {
//       name: "Kurti",
//       path: "/kurti",
      
//     },
//     {
//       name: "Anarkali Suit",
//       path: "/anarkali",
     
//     },
//     {
//       name: "Gown",
//       path: "/gown",
     
//     },
//     {
//       name: "Dress Material",
//       path: "/dress-material",
     
//     },
//     {
//       name: "Saree",
//       path: "/saree",
     
//     },
//     {
//       name: "Leggings",
//       path: "/leggings",
//     },
//   ];

//   const filteredLinks = navLinks.filter((link) =>
//     link.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

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

//         {/* Mobile menu button */}
//         <div className="md:hidden">
//           <button
//             className="text-black dark:text-white text-xl"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex space-x-4 relative">
//           {navLinks.map((link) => (
//             <motion.div
//               key={link.name}
//               className="relative"
//               onMouseEnter={() => setOpenDropdown(link.name)}
//               onMouseLeave={() => setOpenDropdown(null)}
//             >
//               <Link
//                 to={link.path}
//                 className={`relative px-1 py-2 text-gray-900 hover:text-pink-600 transition-colors ${
//                   activeLink === link.name ? "text-pink-600 font-medium" : ""
//                 }`}
//                 onClick={() => setActiveLink(link.name)}
//               >
//                 {link.name}
//                 {activeLink === link.name && (
//                   <motion.span
//                     layoutId="navUnderline"
//                     className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-600 rounded-full"
//                     transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
//                   />
//                 )}
//               </Link>

//               {/* Dropdown */}
//               {link.subLinks && openDropdown === link.name && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute top-full left-0 mt-2 w-44 bg-white border rounded shadow-lg z-40"
//                 >
//                   {link.subLinks.map((sub) => (
//                     <Link
//                       key={sub.name}
//                       to={sub.path}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100"
//                       onClick={() => {
//                         setActiveLink(link.name);
//                         setOpenDropdown(null);
//                       }}
//                     >
//                       {sub.name}
//                     </Link>
//                   ))}
//                 </motion.div>
//               )}
//             </motion.div>
//           ))}
//         </div>

//         {/* Right Icons */}
//         <div className="flex items-center space-x-3 md:space-x-4">
//           {/* Search */}
//           <div className="relative">
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               onClick={() => {
//                 setShowSearch(!showSearch);
//                 setSearchTerm("");
//               }}
//               className="text-gray-900 mt-2 hover:text-pink-600 focus:outline-none"
//             >
//               {showSearch ? (
//                 <FaTimes className="text-lg mt-[2px]" />
//               ) : (
//                 <FaSearch className="text-lg mt-[2px]" />
//               )}
//             </motion.button>

//             <AnimatePresence>
//               {showSearch && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ type: "spring", damping: 20 }}
//                   className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-72 p-3 z-50"
//                 >
//                   <input
//                     type="text"
//                     placeholder="Search categories..."
//                     className="border border-gray-300 rounded-full px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     autoFocus
//                   />
//                   {searchTerm && (
//                     <div className="mt-2">
//                       {filteredLinks.length > 0 ? (
//                         filteredLinks.map((link) => (
//                           <Link
//                             key={link.name}
//                             to={link.path}
//                             className="block px-4 py-2 rounded hover:bg-pink-100 text-sm text-gray-700"
//                             onClick={() => {
//                               setActiveLink(link.name);
//                               setShowSearch(false);
//                             }}
//                           >
//                             {link.name}
//                           </Link>
//                         ))
//                       ) : (
//                         <p className="text-sm text-gray-500 px-4 py-2">
//                           No matches found
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Icons */}
//           <div className="flex items-center space-x-3 md:space-x-5">
//             <motion.div whileHover={{ y: -2 }}>
//               <Link to="/" className="text-gray-900 hover:text-pink-600">
//                 <FaHome className="text-xl md:text-2xl" />
//               </Link>
//             </motion.div>
//             <motion.div whileHover={{ y: -2 }}>
//               <Link to="/wishlist" className="text-gray-900 hover:text-pink-600">
//                 <FaHeart className="text-lg md:text-xl" />
//               </Link>
//             </motion.div>
//             <motion.div whileHover={{ y: -2 }}>
//               <Link to="/cart" className="text-gray-900 hover:text-pink-600">
//                 <FaShoppingCart className="text-lg md:text-xl" />
//               </Link>
//             </motion.div>
//             {/* <motion.div whileHover={{ y: -2 }}>
//               <Link to="/account" className="text-gray-600 hover:text-pink-600">
//                 <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
//                   <FaUser className="text-sm" />
//                 </div>
//               </Link>
//             </motion.div> */}


// <div className="relative">
//       <motion.div
//         whileHover={{ y: -2 }}
//         onClick={() => setOpen(!open)}
//         className="cursor-pointer"
//       >
//         <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
//           <FaUser className="text-sm" />
//         </div>
//       </motion.div>

//       {open && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0 }}
//           className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md z-50"
//         >
//           <Link
//             to="/account"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             onClick={() => setOpen(false)}
//           >
//             Account
//           </Link>
//           <Link
//             to="/userorders"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             onClick={() => setOpen(false)}
//           >
//             Orders
//           </Link>
//         </motion.div>
//       )}
//     </div>
  


//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {menuOpen && (
//         <div className="md:hidden mt-4 bg-white rounded-lg shadow-md px-4 py-3 space-y-2 z-40">
//           {navLinks.map((link) => (
//             <div key={link.name} className="space-y-1">
//               <Link
//                 to={link.path}
//                 onClick={() => {
//                   setActiveLink(link.name);
//                   setMenuOpen(false);
//                 }}
//                 className="block text-gray-800 font-medium"
//               >
//                 {link.name}
//               </Link>
//               {link.subLinks && (
//                 <div className="pl-4 space-y-1">
//                   {link.subLinks.map((sub) => (
//                     <Link
//                       key={sub.name}
//                       to={sub.path}
//                       onClick={() => setMenuOpen(false)}
//                       className="block text-sm text-gray-600"
//                     >
//                       {sub.name}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// }

import { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaTimes,
  FaHome,
  FaBars,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLink, setActiveLink] = useState("Home");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate=useNavigate();
  const navLinks = [
    { name: "Kurti", path: "/kurti" },
    { name: "Anarkali Suit", path: "/anarkali" },
    { name: "Gown", path: "/gown" },
    { name: "Dress Material", path: "/dress-material" },
    { name: "Saree", path: "/saree" },
    { name: "Leggings", path: "/leggings" },
    // { name: "Search", path: "/search" },
  ];

  const filteredLinks = navLinks.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <nav className="mt-5 ml-4 mr-4 md:ml-28 md:mr-2 bg-white/10 backdrop-blur-md border border-white/10 w-[95%] md:w-5/6 px-4 md:px-6 py-3 fixed top-0 z-50 text-black dark:text-white font-bold rounded-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="w-24 md:w-32 h-auto">
          <img
            src="src/assets/logo.jpeg"
            alt="Paradise in Love Logo"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-black dark:text-white text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-4 relative">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              className="relative"
              onMouseEnter={() => setOpenDropdown(link.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.path}
                className={`relative px-1 py-2 text-gray-900 hover:text-pink-600 transition-colors ${
                  activeLink === link.name ? "text-pink-600 font-medium" : ""
                }`}
                onClick={() => setActiveLink(link.name)}
              >
                {link.name}
                {activeLink === link.name && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-600 rounded-full"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Search */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              // onClick={() => {
              //   setShowSearch(!showSearch);
              //   setSearchTerm("");
              // }}
               onClick={() => {
                navigate('/search');
              }}
              className="text-gray-900 mt-2 hover:text-pink-600 focus:outline-none"
            >
              {showSearch ? (
                <FaTimes className="text-lg mt-[2px]" />
              ) : (
                <FaSearch className="text-lg mt-[2px]" />
              )}
            </motion.button>

            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-72 p-3 z-50"
                >
                  <input
                    type="text"
                    placeholder="Search categories..."
                    className="border border-gray-300 rounded-full px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  {searchTerm && (
                    <div className="mt-2">
                      {filteredLinks.length > 0 ? (
                        filteredLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.path}
                            className="block px-4 py-2 rounded hover:bg-pink-100 text-sm text-gray-700"
                            onClick={() => {
                              setActiveLink(link.name);
                              setShowSearch(false);
                            }}
                          >
                            {link.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 px-4 py-2">
                          No matches found
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Icons: Home, Wishlist, Cart, User */}
          <div className="flex items-center space-x-3 md:space-x-5">
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/" className="text-gray-900 hover:text-pink-600">
                <FaHome className="text-xl md:text-2xl" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/wishlist" className="text-gray-900 hover:text-pink-600">
                <FaHeart className="text-lg md:text-xl" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/cart" className="text-gray-900 hover:text-pink-600">
                <FaShoppingCart className="text-lg md:text-xl" />
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
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-md px-4 py-3 space-y-2 z-40">
          {navLinks.map((link) => (
            <div key={link.name} className="space-y-1">
              <Link
                to={link.path}
                onClick={() => {
                  setActiveLink(link.name);
                  setMenuOpen(false);
                }}
                className="block text-gray-800 font-medium"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
