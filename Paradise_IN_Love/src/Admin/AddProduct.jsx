
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FiX, FiHome, FiShoppingBag, FiPlus, FiUsers, FiLogOut,
//   FiLayers, FiMenu
// } from "react-icons/fi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddProduct = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const location = useLocation();
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const isActiveLink = (path) => location.pathname === path ? "bg-pink-600 text-white" : "hover:bg-gray-700";

//   const [formData, setFormData] = useState({
//     name: "",
//     description: [""],
//     unit: "",
//     stock: "",
//     price: "",
//     mrp: "",
//     discount: "",
//     image: [""],
//     category: "",
//     subCategory: "",
//     more_details: {
//       color: [],
//       size: []
//     }
//   });

//   const [dropcat, setDropcat] = useState([]);
//   const [subcatdrop, setSubcatdrop] = useState([]);
//   const [customCategory, setCustomCategory] = useState(false);
//   const [customSubCategory, setCustomSubCategory] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newDetail, setNewDetail] = useState({ color: "", size: "" });

//   useEffect(() => {
//     fetch("http://localhost:8080/api/category/get-category", {
//       method: "GET",
//       credentials: "include",
//     })
//       .then(res => res.json())
//       .then(data => data.success && setDropcat(data.data))
//       .catch(err => {
//         console.error("Category fetch error:", err);
//         toast.error("\u274C Error fetching categories");
//       });
//   }, []);

//   const handleCategoryChange = async (e) => {
//     const selectedCategoryId = e.target.value;
//     setFormData(prev => ({ ...prev, category: selectedCategoryId, subCategory: "" }));

//     try {
//       const res = await fetch("http://localhost:8080/api/subcategory/get-subcategory-by-Id", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ categoryId: selectedCategoryId }),
//       });
//       const data = await res.json();
//       if (data.success) setSubcatdrop(data.data);
//       else setSubcatdrop([]);
//     } catch (err) {
//       console.error("Subcategory fetch error:", err);
//       toast.error("\u274C Failed to fetch subcategories");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDescriptionChange = (index, value) => {
//     const descriptions = [...formData.description];
//     descriptions[index] = value;
//     setFormData(prev => ({ ...prev, description: descriptions }));
//   };

//   const addDescriptionField = () => {
//     setFormData(prev => ({ ...prev, description: [...prev.description, ""] }));
//   };

//   const removeDescriptionField = (index) => {
//     const descriptions = [...formData.description];
//     descriptions.splice(index, 1);
//     setFormData(prev => ({ ...prev, description: descriptions }));
//   };

//   const handleImageChange = (index, value) => {
//     const images = [...formData.image];
//     images[index] = value;
//     setFormData(prev => ({ ...prev, image: images }));
//   };

//   const addImageField = () => {
//     setFormData(prev => ({ ...prev, image: [...prev.image, ""] }));
//   };

//   const removeImageField = (index) => {
//     const images = [...formData.image];
//     images.splice(index, 1);
//     setFormData(prev => ({ ...prev, image: images }));
//   };

//   const addMoreDetail = () => {
//     const { color, size } = newDetail;
//     if (color && !formData.more_details.color.includes(color)) {
//       setFormData(prev => ({
//         ...prev,
//         more_details: {
//           ...prev.more_details,
//           color: [...prev.more_details.color, color],
//           size: [...new Set([...prev.more_details.size, ...size.split(",").map(s => s.trim())])]
//         }
//       }));
//       setNewDetail({ color: "", size: "" });
//     } else {
//       toast.warning("\u26A0\uFE0F Please enter a unique color and at least one size");
//     }
//   };

//   const addCustomCategory = async () => {
//     try {
//       if (!newCategoryName.trim()) {
//         toast.warn("\u26A0\uFE0F Please enter a category name");
//         return;
//       }

//       const res = await fetch("http://localhost:8080/api/category/add-category", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ name: newCategoryName, image: "https://via.placeholder.com/150" }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         const newCat = data.data;
//         setDropcat(prev => [...prev, newCat]);
//         setFormData(prev => ({ ...prev, category: newCat._id, subCategory: "" }));
//         setCustomCategory(false);
//         setNewCategoryName("");
//         toast.success("\u2705 Category added successfully");
//       } else {
//         toast.error("\u274C Could not add category: " + data.message);
//       }
//     } catch (err) {
//       console.error("Add category error:", err);
//       toast.error("\u274C Could not add category");
//     }
//   };

//   const addCustomSubCategory = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/subcategory/create-subcategory",
//         { name: formData.subCategory, category: formData.category },
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         const newSub = res.data.data;
//         setSubcatdrop(prev => [...prev, newSub]);
//         setFormData(prev => ({ ...prev, subCategory: newSub._id }));
//         setCustomSubCategory(false);
//         toast.success("\u2705 Subcategory added successfully");
//       }
//     } catch (err) {
//       console.error("Add subcategory error:", err);
//       toast.error("\u274C Could not add subcategory");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const submissionData = {
//       ...formData,
//       description: formData.description.filter(desc => desc.trim() !== ""),
//       image: formData.image.map(url => convertDriveLink(url))
//     };

//     try {
//       await axios.post("http://localhost:8080/api/product/create", submissionData, { withCredentials: true });
//       toast.success("\u2705 Product created!");

//       setFormData({
//         name: "",
//         description: [""],
//         unit: "",
//         stock: "",
//         price: "",
//         mrp: "",
//         discount: "",
//         image: [""],
//         category: "",
//         subCategory: "",
//         more_details: { color: [], size: [] }
//       });
//       setSubcatdrop([]);
//       setNewDetail({ color: "", size: "" });
//       setCustomCategory(false);
//       setCustomSubCategory(false);
//       setNewCategoryName("");
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       toast.error("\u274C Submit failed");
//     }
//   };

//   useEffect(() => {
//     const mrp = parseFloat(formData.mrp) || 0;
//     const discount = parseFloat(formData.discount) || 0;
//     const price = mrp - (mrp * discount) / 100;
//     setFormData((prev) => ({ ...prev, price: price.toFixed(2) }));
//   }, [formData.mrp, formData.discount]);

//   const convertDriveLink = (url) => {
//     if (!url) return "";
//     try {
//       let fileId = "";
//       if (url.includes("/file/d/")) {
//         const parts = url.split("/file/d/");
//         if (parts[1]) {
//           fileId = parts[1].split("/")[0];
//         }
//       } else if (url.includes("open?id=")) {
//         fileId = url.split("open?id=")[1].split("&")[0];
//       }
//       if (fileId) {
//         return `https://drive.google.com/uc?export=view&id=${fileId}`;
//       }
//     } catch (error) {
//       console.error("Invalid Google Drive URL", error);
//     }
//     return url;
//   };

//   // Close sidebar when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const sidebar = document.querySelector('.sidebar');
//       const hamburger = document.querySelector('.hamburger');
      
//       if (isSidebarOpen && 
//           sidebar && 
//           !sidebar.contains(event.target) && 
//           hamburger &&
//           !hamburger.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isSidebarOpen]);

//   return (
//     <div className="flex bg-gradient-to-br from-gray-100 via-pink-100 to-white min-h-screen">
//       {/* Mobile Hamburger Button */}
//       <button 
//         onClick={toggleSidebar}
//         className="hamburger md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-pink-600 text-white shadow-lg"
//       >
//         {/* <FiMenu size={24} /> */}
//           ☰ Menu
//       </button>

//       {/* Sidebar */}
//       <div className={`sidebar ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out flex flex-col z-30`}>
//         <div className="p-4 flex items-center justify-between border-b border-pink-500">
//           <div className="flex items-center">
//             <div className="bg-white p-1 rounded-lg mr-3">
//               <div className="bg-pink-500 w-8 h-8 rounded flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">P</span>
//               </div>
//             </div>
//             <h1 className="text-xl font-bold">Paradise in Love</h1>
//           </div>
//           <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-700 md:hidden">
//             <FiX size={20} />
//           </button>
//         </div>
//         <nav className="mt-6 flex flex-col px-2 flex-grow">
//           {[{ to: "/dashboard", icon: FiHome, label: "Product Inventory" },
//           { to: "/orders", icon: FiShoppingBag, label: "Orders" },
//           { to: "/add-product", icon: FiPlus, label: "Add Product" },
//           { to: "/category-management", icon: FiLayers, label: "Categories" },
//           { to: "/customers", icon: FiUsers, label: "Customers" },
//           { to: "/logout", icon: FiLogOut, label: "Logout" },
//           ].map(({ to, icon: Icon, label }) => (
//             <Link 
//               key={to} 
//               to={to} 
//               className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 ${isActiveLink(to)}`}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <Icon className="mr-3" size={20} />
//               <span>{label}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Main Form */}
//       <div className="flex-1 p-4 md:p-6 mt-12 md:mt-0">
//         <h1 className="text-2xl font-bold mb-4 text-pink-700">Add New Product</h1>
//         <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded-lg">
//           {/* ... (rest of your form content remains exactly the same) ... */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Product Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Product Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Unit</label>
//               <input
//                 type="text"
//                 name="unit"
//                 placeholder="e.g., kg, piece, etc."
//                 value={formData.unit}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 required
//               />
//             </div>
//           </div>

//           {/* Multiple Descriptions */}
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">Descriptions</label>
//             {formData.description.map((desc, idx) => (
//               <div key={idx} className="flex items-start mb-3">
//                 <textarea
//                   placeholder={`Description ${idx + 1}`}
//                   value={desc}
//                   onChange={(e) => handleDescriptionChange(idx, e.target.value)}
//                   className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                   rows={3}
//                 />
//                 {formData.description.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeDescriptionField(idx)}
//                     className="ml-2 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
//                   >
//                     <FiX size={16} />
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addDescriptionField}
//               className="flex items-center gap-1 text-pink-600 hover:text-pink-800 mt-1 px-2 py-1 rounded hover:bg-pink-50"
//             >
//               <FiPlus size={16} />
//               <span>Add another description</span>
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Stock</label>
//               <input
//                 type="number"
//                 name="stock"
//                 placeholder="Stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 min="0"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">MRP (₹)</label>
//               <input
//                 type="number"
//                 name="mrp"
//                 placeholder="MRP"
//                 value={formData.mrp}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 min="0"
//                 step="0.01"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Discount (%)</label>
//               <input
//                 type="number"
//                 name="discount"
//                 placeholder="Discount"
//                 value={formData.discount}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 min="0"
//                 max="100"
//                 step="0.01"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Price (₹)</label>
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={formData.price}
//                 readOnly
//                 className="w-full border border-gray-300 p-2 rounded bg-gray-100"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block font-medium text-gray-700 mb-1">Image URLs</label>
//             {formData.image.map((img, idx) => (
//               <div key={idx} className="mb-3">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     placeholder={`Image URL ${idx + 1}`}
//                     value={img}
//                     onChange={(e) => handleImageChange(idx, e.target.value)}
//                     className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                   />
//                   {formData.image.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeImageField(idx)}
//                       className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
//                     >
//                       <FiX size={16} />
//                     </button>
//                   )}
//                 </div>
//                 {img && (
//                   <div className="mt-2">
//                     <img
//                       src={convertDriveLink(img)}
//                       alt={`Preview ${idx + 1}`}
//                       className="h-20 w-20 object-cover rounded border border-gray-200"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "https://via.placeholder.com/80?text=Invalid+URL";
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addImageField}
//               className="flex items-center gap-1 text-pink-600 hover:text-pink-800 mt-1 px-2 py-1 rounded hover:bg-pink-50"
//             >
//               <FiPlus size={16} />
//               <span>Add another image URL</span>
//             </button>
//           </div>

//           {/* Category */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Category</label>
//               {customCategory ? (
//                 <div className="space-y-2">
//                   <input
//                     type="text"
//                     placeholder="New Category Name"
//                     value={newCategoryName}
//                     onChange={(e) => setNewCategoryName(e.target.value)}
//                     className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       type="button"
//                       onClick={addCustomCategory}
//                       className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                     >
//                       Add Category
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setCustomCategory(false)}
//                       className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleCategoryChange}
//                     className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                     required
//                   >
//                     <option value="">-- Select Category --</option>
//                     {dropcat.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
//                   </select>
//                   <button
//                     type="button"
//                     onClick={() => setCustomCategory(true)}
//                     className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     New
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Subcategory */}
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Subcategory</label>
//               {customSubCategory ? (
//                 <div className="space-y-2">
//                   <input
//                     type="text"
//                     name="subCategory"
//                     placeholder="New Subcategory Name"
//                     value={formData.subCategory}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       type="button"
//                       onClick={addCustomSubCategory}
//                       className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                     >
//                       Add Subcategory
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setCustomSubCategory(false)}
//                       className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <select
//                     name="subCategory"
//                     value={formData.subCategory}
//                     onChange={handleChange}
//                     className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                     disabled={!formData.category}
//                     required={!!formData.category}
//                   >
//                     <option value="">-- Select Subcategory --</option>
//                     {subcatdrop.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
//                   </select>
//                   <button
//                     type="button"
//                     onClick={() => setCustomSubCategory(true)}
//                     className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     disabled={!formData.category}
//                   >
//                     New
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* More Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Color & Sizes</label>
//               <div className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Color (e.g. red)"
//                   value={newDetail.color}
//                   onChange={(e) => setNewDetail({ ...newDetail, color: e.target.value })}
//                   className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Sizes (comma separated)"
//                   value={newDetail.size}
//                   onChange={(e) => setNewDetail({ ...newDetail, size: e.target.value })}
//                   className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 />
//               </div>
//               <button
//                 type="button"
//                 onClick={addMoreDetail}
//                 className="px-3 py-1 bg-pink-600 text-white rounded hover:bg-pink-700"
//               >
//                 Add Details
//               </button>
//             </div>

//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Current Details</label>
//               <div className="bg-gray-50 p-3 rounded">
//                 <div className="mb-2">
//                   <span className="font-medium">Colors:</span>
//                   {formData.more_details.color.length > 0 ? (
//                     <div className="flex flex-wrap gap-2 mt-1">
//                       {formData.more_details.color.map((color, idx) => (
//                         <span key={idx} className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm">
//                           {color}
//                         </span>
//                       ))}
//                     </div>
//                   ) : (
//                     <span className="text-gray-500 ml-2">No colors added</span>
//                   )}
//                 </div>
//                 <div>
//                   <span className="font-medium">Sizes:</span>
//                   {formData.more_details.size.length > 0 ? (
//                     <div className="flex flex-wrap gap-2 mt-1">
//                       {formData.more_details.size.map((size, idx) => (
//                         <span key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
//                           {size}
//                         </span>
//                       ))}
//                     </div>
//                   ) : (
//                     <span className="text-gray-500 ml-2">No sizes added</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="pt-4">
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-md"
//             >
//               Submit Product
//             </button>
//           </div>
//         </form>
//         <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
//       </div>
//     </div>
//   );
// };

// export default AddProduct;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import {
  FiX, FiHome, FiShoppingBag, FiPlus, FiUsers, FiLogOut,
  FiLayers, FiMenu
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const isActiveLink = (path) => location.pathname === path ? "bg-pink-600 text-white" : "hover:bg-gray-700";

  const [formData, setFormData] = useState({
    name: "",
    description: [""],
    unit: "",
    stock: "",
    price: "",
    mrp: "",
    discount: "",
    image: [""],
    category: "",
    subCategory: "",
    more_details: {
      color: [],
      size: []
    }
  });

  const [dropcat, setDropcat] = useState([]);
  const [subcatdrop, setSubcatdrop] = useState([]);
  const [customCategory, setCustomCategory] = useState(false);
  const [customSubCategory, setCustomSubCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newDetail, setNewDetail] = useState({ color: "", size: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/category/get-category", {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => data.success && setDropcat(data.data))
      .catch(err => {
        console.error("Category fetch error:", err);
        toast.error("\u274C Error fetching categories");
      });
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setFormData(prev => ({ ...prev, category: selectedCategoryId, subCategory: "" }));

    try {
      const res = await fetch("http://localhost:8080/api/subcategory/get-subcategory-by-Id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ categoryId: selectedCategoryId }),
      });
      const data = await res.json();
      if (data.success) setSubcatdrop(data.data);
      else setSubcatdrop([]);
    } catch (err) {
      console.error("Subcategory fetch error:", err);
      toast.error("\u274C Failed to fetch subcategories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (index, value) => {
    const descriptions = [...formData.description];
    descriptions[index] = value;
    setFormData(prev => ({ ...prev, description: descriptions }));
  };

  const addDescriptionField = () => {
    setFormData(prev => ({ ...prev, description: [...prev.description, ""] }));
  };

  const removeDescriptionField = (index) => {
    const descriptions = [...formData.description];
    descriptions.splice(index, 1);
    setFormData(prev => ({ ...prev, description: descriptions }));
  };

  const handleImageChange = (index, value) => {
    const images = [...formData.image];
    images[index] = value;
    setFormData(prev => ({ ...prev, image: images }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, image: [...prev.image, ""] }));
  };

  const removeImageField = (index) => {
    const images = [...formData.image];
    images.splice(index, 1);
    setFormData(prev => ({ ...prev, image: images }));
  };

  const addMoreDetail = () => {
    const { color, size } = newDetail;
    if (color && !formData.more_details.color.includes(color)) {
      setFormData(prev => ({
        ...prev,
        more_details: {
          ...prev.more_details,
          color: [...prev.more_details.color, color],
          size: [...new Set([...prev.more_details.size, ...size.split(",").map(s => s.trim())])]
        }
      }));
      setNewDetail({ color: "", size: "" });
    } else {
      toast.warning("\u26A0\uFE0F Please enter a unique color and at least one size");
    }
  };

  const addCustomCategory = async () => {
    try {
      if (!newCategoryName.trim()) {
        toast.warn("\u26A0\uFE0F Please enter a category name");
        return;
      }

      const res = await fetch("http://localhost:8080/api/category/add-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: newCategoryName, image: "https://via.placeholder.com/150" }),
      });

      const data = await res.json();
      if (data.success) {
        const newCat = data.data;
        setDropcat(prev => [...prev, newCat]);
        setFormData(prev => ({ ...prev, category: newCat._id, subCategory: "" }));
        setCustomCategory(false);
        setNewCategoryName("");
        toast.success("\u2705 Category added successfully");
      } else {
        toast.error("\u274C Could not add category: " + data.message);
      }
    } catch (err) {
      console.error("Add category error:", err);
      toast.error("\u274C Could not add category");
    }
  };

  const addCustomSubCategory = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/subcategory/create-subcategory",
        { name: formData.subCategory, category: formData.category },
        { withCredentials: true }
      );
      if (res.data.success) {
        const newSub = res.data.data;
        setSubcatdrop(prev => [...prev, newSub]);
        setFormData(prev => ({ ...prev, subCategory: newSub._id }));
        setCustomSubCategory(false);
        toast.success("\u2705 Subcategory added successfully");
      }
    } catch (err) {
      console.error("Add subcategory error:", err);
      toast.error("\u274C Could not add subcategory");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const submissionData = {
      ...formData,
      description: formData.description.filter(desc => desc.trim() !== ""),
      image: formData.image.map(url => convertDriveLink(url))
    };

    try {
      await axios.post("http://localhost:8080/api/product/create", submissionData, { withCredentials: true });
      toast.success("\u2705 Product created!");

      setFormData({
        name: "",
        description: [""],
        unit: "",
        stock: "",
        price: "",
        mrp: "",
        discount: "",
        image: [""],
        category: "",
        subCategory: "",
        more_details: { color: [], size: [] }
      });
      setSubcatdrop([]);
      setNewDetail({ color: "", size: "" });
      setCustomCategory(false);
      setCustomSubCategory(false);
      setNewCategoryName("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("\u274C Submit failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const mrp = parseFloat(formData.mrp) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const price = mrp - (mrp * discount) / 100;
    setFormData((prev) => ({ ...prev, price: price.toFixed(2) }));
  }, [formData.mrp, formData.discount]);

  const convertDriveLink = (url) => {
    if (!url) return "";
    try {
      let fileId = "";
      if (url.includes("/file/d/")) {
        const parts = url.split("/file/d/");
        if (parts[1]) {
          fileId = parts[1].split("/")[0];
        }
      } else if (url.includes("open?id=")) {
        fileId = url.split("open?id=")[1].split("&")[0];
      }
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    } catch (error) {
      console.error("Invalid Google Drive URL", error);
    }
    return url;
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      const hamburger = document.querySelector('.hamburger');
      
      if (isSidebarOpen && 
          sidebar && 
          !sidebar.contains(event.target) && 
          hamburger &&
          !hamburger.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="flex bg-gradient-to-br from-gray-100 via-pink-100 to-white min-h-screen">
      {/* Mobile Hamburger Button */}
      <button 
        onClick={toggleSidebar}
        className="hamburger md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-pink-600 text-white shadow-lg"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out flex flex-col z-30`}>
        <div className="p-4 flex items-center justify-between border-b border-pink-500">
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-lg mr-3">
              <div className="bg-pink-500 w-8 h-8 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
            </div>
            <h1 className="text-xl font-bold">Paradise in Love</h1>
          </div>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-700 md:hidden">
            <FiX size={20} />
          </button>
        </div>
        <nav className="mt-6 flex flex-col px-2 flex-grow overflow-y-auto">
          {[
            { to: "/dashboard", icon: FiHome, label: "Product Inventory" },
            { to: "/orders", icon: FiShoppingBag, label: "Orders" },
            { to: "/add-product", icon: FiPlus, label: "Add Product" },
            { to: "/category-management", icon: FiLayers, label: "Categories" },
            { to: "/customers", icon: FiUsers, label: "Customers" },
            { to: "/logout", icon: FiLogOut, label: "Logout" },
          ].map(({ to, icon: Icon, label }) => (
            <Link 
              key={to} 
              to={to} 
              className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 ${isActiveLink(to)} transition-colors duration-200`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Icon className="mr-3" size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 mt-12 md:mt-0 overflow-x-hidden">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill in the details below to add a new product to your inventory</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
          {/* Basic Info Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                  placeholder="Enter product name"
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                  placeholder="e.g., kg, piece, etc."
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descriptions</label>
              {formData.description.map((desc, idx) => (
                <div key={idx} className="flex items-start mb-3">
                  <textarea
                    value={desc}
                    onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows={3}
                    placeholder={`Description ${idx + 1}`}
                  />
                  {formData.description.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDescriptionField(idx)}
                      className="ml-2 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                    >
                      <FiX size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addDescriptionField}
                className="flex items-center gap-1 text-pink-600 hover:text-pink-800 mt-1 px-2 py-1 rounded hover:bg-pink-50 text-sm"
              >
                <FiPlus size={16} />
                <span>Add another description</span>
              </button>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Pricing & Stock</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  min="0"
                  required
                  placeholder="Available quantity"
                />
              </div>

              {/* MRP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MRP (₹)<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  min="0"
                  step="0.01"
                  required
                  placeholder="Maximum retail price"
                />
              </div>

              {/* Discount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="Discount percentage"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  placeholder="Calculated automatically"
                />
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Media</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs</label>
              {formData.image.map((img, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={img}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder={`Image URL ${idx + 1}`}
                    />
                    {formData.image.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(idx)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                      >
                        <FiX size={16} />
                      </button>
                    )}
                  </div>
                  {img && (
                    <div className="mt-2 flex items-center">
                      <img
                        src={convertDriveLink(img)}
                        alt={`Preview ${idx + 1}`}
                        className="h-16 w-16 object-cover rounded border border-gray-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/80?text=Invalid+URL";
                        }}
                      />
                      <span className="ml-2 text-xs text-gray-500 truncate max-w-xs">{img}</span>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="flex items-center gap-1 text-pink-600 hover:text-pink-800 mt-1 px-2 py-1 rounded hover:bg-pink-50 text-sm"
              >
                <FiPlus size={16} />
                <span>Add another image</span>
              </button>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category<span className="text-red-500">*</span>
                </label>
                {customCategory ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="New category name"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={addCustomCategory}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      >
                        Add Category
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomCategory(false)}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    >
                      <option value="">-- Select Category --</option>
                      {dropcat.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setCustomCategory(true)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm whitespace-nowrap"
                    >
                      + New
                    </button>
                  </div>
                )}
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                {customSubCategory ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="New subcategory name"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={addCustomSubCategory}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      >
                        Add Subcategory
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomSubCategory(false)}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <select
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      disabled={!formData.category}
                    >
                      <option value="">-- Select Subcategory --</option>
                      {subcatdrop.map(s => (
                        <option key={s._id} value={s._id}>{s.name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setCustomSubCategory(true)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm whitespace-nowrap"
                      disabled={!formData.category}
                    >
                      + New
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Variants Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Add Variant */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Color & Sizes</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newDetail.color}
                    onChange={(e) => setNewDetail({ ...newDetail, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Color (e.g., Red)"
                  />
                  <input
                    type="text"
                    value={newDetail.size}
                    onChange={(e) => setNewDetail({ ...newDetail, size: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Sizes (comma separated, e.g., S,M,L)"
                  />
                  <button
                    type="button"
                    onClick={addMoreDetail}
                    className="w-full px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 text-sm"
                  >
                    Add Variant
                  </button>
                </div>
              </div>

              {/* Current Variants */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Variants</label>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <div className="mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Colors:</span>
                      {formData.more_details.color.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {formData.more_details.color.length} colors
                        </span>
                      )}
                    </div>
                    {formData.more_details.color.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.more_details.color.map((color, idx) => (
                          <div key={idx} className="relative">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                              {color}
                            </span>
                            <button
                              onClick={() => removeColor(color)}
                              className="absolute -top-1 -right-1 p-0.5 bg-red-500 rounded-full text-white hover:bg-red-600"
                              style={{ width: '16px', height: '16px' }}
                            >
                              <FiX size={10} className="m-auto" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm mt-1">No colors added yet</p>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Sizes:</span>
                      {formData.more_details.size.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {formData.more_details.size.length} sizes
                        </span>
                      )}
                    </div>
                    {formData.more_details.size.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.more_details.size.map((size, idx) => (
                          <div key={idx} className="relative">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {size}
                            </span>
                            <button
                              onClick={() => removeSize(size)}
                              className="absolute -top-1 -right-1 p-0.5 bg-red-500 rounded-full text-white hover:bg-red-600"
                              style={{ width: '16px', height: '16px' }}
                            >
                              <FiX size={10} className="m-auto" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm mt-1">No sizes added yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-md font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-sm text-sm sm:text-base flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Submit Product'
              )}
            </button>
          </div>
        </form>

        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="text-sm"
        />
      </div>
    </div>
  );
};

export default AddProduct;