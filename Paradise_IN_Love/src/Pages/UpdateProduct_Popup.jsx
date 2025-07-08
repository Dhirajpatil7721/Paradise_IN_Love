// import React, { useEffect, useState } from 'react';
// import { FiX, FiPlus, FiTrash2, FiChevronDown, FiUpload } from 'react-icons/fi';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function UpdateProduct_Popup() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const product = location.state?.product;

//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         unit: "",
//         stock: "",
//         price: "",
//         discount: "",
//         mrp: "",
//         image: [""],
//         category: "",
//         subCategory: "",
//         more_details: {
//             color: [],
//             size: []
//         }
//     });

//     const [categoryList, setCategoryList] = useState([]);
//     const [subCategoryList, setSubCategoryList] = useState([]);
//     const [newColor, setNewColor] = useState("");
//     const [newSize, setNewSize] = useState("");
//     const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//     const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);

//     useEffect(() => {
//         fetch("http://localhost:8080/api/category/get-category", {
//             method: "GET",
//             credentials: "include",
//         })
//             .then(res => res.json())
//             .then(data => data.success && setCategoryList(data.data))
//             .catch(err => {
//                 console.error("Category fetch error:", err);
//                 toast.error("❌ Error fetching categories");
//             });

//         if (product) {
//             setFormData({
//                 name: product.name || "",
//                 description: product.description || "",
//                 unit: product.unit || "",
//                 stock: product.stock || "",
//                 price: product.price || "",
//                 discount: product.discount || "",
//                 mrp: product.mrp || "",
//                 image: Array.isArray(product.image) ? [...product.image] : [product.image || ""],
//                 category: product.category?.[0]?._id || "",
//                 subCategory: product.subCategory?.[0]?._id || "",
//                 more_details: {
//                     color: Array.isArray(product.more_details?.color) ? [...product.more_details.color] : [],
//                     size: Array.isArray(product.more_details?.size) ? [...product.more_details.size] : []
//                 }
//             });

//             // Fetch subcategories if category is already set
//             if (product.category?.[0]?._id) {
//                 fetchSubCategories(product.category[0]._id);
//             }
//         }
//     }, [product]);

//     const fetchSubCategories = async (categoryId) => {
//         try {
//             const res = await fetch("http://localhost:8080/api/subcategory/get-subcategory-by-Id", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 credentials: "include",
//                 body: JSON.stringify({ categoryId: categoryId }),
//             });
//             const data = await res.json();
//             if (data.success) setSubCategoryList(data.data);
//             else setSubCategoryList([]);
//         } catch (err) {
//             console.error("Subcategory fetch error:", err);
//             toast.error("❌ Failed to fetch subcategories");
//         }
//     };

//     const handleCategoryChange = async (e) => {
//         const selectedCategoryId = e.target.value;
//         setFormData(prev => ({
//             ...prev,
//             category: selectedCategoryId,
//             subCategory: "",
//         }));

//         if (selectedCategoryId) {
//             await fetchSubCategories(selectedCategoryId);
//         } else {
//             setSubCategoryList([]);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleImageChange = (index, value) => {
//         const newImages = [...formData.image];
//         newImages[index] = value;
//         setFormData(prev => ({ ...prev, image: newImages }));
//     };

//     const addImageField = () => {
//         setFormData(prev => ({ ...prev, image: [...prev.image, ""] }));
//     };

//     const removeImageField = (index) => {
//         const newImages = formData.image.filter((_, i) => i !== index);
//         setFormData(prev => ({ ...prev, image: newImages }));
//     };

//     const addColor = () => {
//         if (newColor.trim()) {
//             setFormData(prev => ({
//                 ...prev,
//                 more_details: {
//                     ...prev.more_details,
//                     color: [...prev.more_details.color, newColor.trim()]
//                 }
//             }));
//             setNewColor("");
//         }
//     };

//     const removeColor = (index) => {
//         const colors = formData.more_details.color.filter((_, i) => i !== index);
//         setFormData(prev => ({
//             ...prev,
//             more_details: { ...prev.more_details, color: colors }
//         }));
//     };

//     const addSize = () => {
//         if (newSize.trim()) {
//             setFormData(prev => ({
//                 ...prev,
//                 more_details: {
//                     ...prev.more_details,
//                     size: [...prev.more_details.size, newSize.trim()]
//                 }
//             }));
//             setNewSize("");
//         }
//     };

//     const removeSize = (index) => {
//         const sizes = formData.more_details.size.filter((_, i) => i !== index);
//         setFormData(prev => ({
//             ...prev,
//             more_details: { ...prev.more_details, size: sizes }
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const id = product?._id;
//         if (!id) return toast.error("Missing product ID");

//         try {
//             const response = await fetch("http://localhost:8080/api/product/update-product-details", {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 credentials: "include",
//                 body: JSON.stringify({ _id: id, ...formData })
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.message || "Update failed");
//             }

//             toast.success("Product updated successfully!");
//             navigate(-1);
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//                 <div className="p-6">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold text-gray-800">Update Product</h2>
//                         <button 
//                             onClick={() => navigate(-1)} 
//                             className="text-gray-500 hover:text-gray-700"
//                         >
//                             <FiX size={24} />
//                         </button>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
//                                 <input
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     placeholder="Enter product name"
//                                     required
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                                 <textarea
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     placeholder="Enter description"
//                                     rows={3}
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
//                                 <input
//                                     name="unit"
//                                     value={formData.unit}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     placeholder="e.g., kg, piece, etc."
//                                     required
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
//                                 <input
//                                     name="stock"
//                                     type="number"
//                                     value={formData.stock}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     placeholder="Enter stock quantity"
//                                     required
//                                     min="0"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//                                 <input
//                                     name="price"
//                                     type="number"
//                                     value={formData.price}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     placeholder="Enter price"
//                                     required
//                                     min="0"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
//                                 <input
//                                     name="discount"
//                                     type="number"
//                                     value={formData.discount}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     placeholder="Enter discount percentage"
//                                     min="0"
//                                     max="100"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">MRP</label>
//                                 <input
//                                     name="mrp"
//                                     type="number"
//                                     value={formData.mrp}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     placeholder="Enter MRP"
//                                     required
//                                     min="0"
//                                 />
//                             </div>
//                         </div>

//                         {/* Category and Subcategory */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                                 <select
//                                     name="category"
//                                     value={formData.category}
//                                     onChange={handleCategoryChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     required
//                                 >
//                                     <option value="">-- Select Category --</option>
//                                     {categoryList.map(c => (
//                                         <option key={c._id} value={c._id}>{c.name}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
//                                 <select
//                                     name="subCategory"
//                                     value={formData.subCategory}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     disabled={!formData.category}
//                                     required={!!formData.category}
//                                 >
//                                     <option value="">-- Select Subcategory --</option>
//                                     {subCategoryList.map(s => (
//                                         <option key={s._id} value={s._id}>{s.name}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Image URLs */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
//                             {formData.image.map((img, index) => (
//                                 <div key={index} className="flex items-center gap-2 mb-2">
//                                     <input
//                                         value={img}
//                                         onChange={(e) => handleImageChange(index, e.target.value)}
//                                         className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                         placeholder="Enter image URL"
//                                         type="url"
//                                     />
//                                     {formData.image.length > 1 && (
//                                         <button
//                                             type="button"
//                                             onClick={() => removeImageField(index)}
//                                             className="p-3 text-red-500 hover:text-red-700"
//                                         >
//                                             <FiTrash2 size={18} />
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                             <button
//                                 type="button"
//                                 onClick={addImageField}
//                                 className="mt-2 flex items-center gap-2 text-pink-600 hover:text-pink-800"
//                             >
//                                 <FiPlus size={18} />
//                                 Add another image URL
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
//                                 <div className="flex items-center gap-2 mb-2">
//                                     <input
//                                         value={newColor}
//                                         onChange={(e) => setNewColor(e.target.value)}
//                                         className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                         placeholder="Add color"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={addColor}
//                                         className="px-4 py-3 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200"
//                                     >
//                                         Add
//                                     </button>
//                                 </div>
//                                 <div className="flex flex-wrap gap-2">
//                                     {formData.more_details.color.map((c, i) => (
//                                         <div key={i} className="flex items-center bg-pink-100 rounded-full px-3 py-1">
//                                             <span className="mr-2">{c}</span>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => removeColor(i)}
//                                                 className="text-pink-700 hover:text-pink-900"
//                                             >
//                                                 <FiX size={16} />
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
//                                 <div className="flex items-center gap-2 mb-2">
//                                     <input
//                                         value={newSize}
//                                         onChange={(e) => setNewSize(e.target.value)}
//                                         className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                         placeholder="Add size"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={addSize}
//                                         className="px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
//                                     >
//                                         Add
//                                     </button>
//                                 </div>
//                                 <div className="flex flex-wrap gap-2">
//                                     {formData.more_details.size.map((s, i) => (
//                                         <div key={i} className="flex items-center bg-purple-100 rounded-full px-3 py-1">
//                                             <span className="mr-2">{s}</span>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => removeSize(i)}
//                                                 className="text-purple-700 hover:text-purple-900"
//                                             >
//                                                 <FiX size={16} />
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="pt-4">
//                             <button
//                                 type="submit"
//                                 className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-md"
//                             >
//                                 Update Product
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UpdateProduct_Popup;



//Working Code _________________________________________________________________________________________
// import React, { useEffect, useState } from 'react';
// import { FiX, FiPlus, FiTrash2, FiChevronDown, FiUpload, FiPercent } from 'react-icons/fi';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { motion } from 'framer-motion';

// function UpdateProduct_Popup() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const product = location.state?.product;

//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         unit: "",
//         stock: "",
//         price: "",
//         discount: "",
//         mrp: "",
//         image: [""],
//         category: "",
//         subCategory: "",
//         more_details: {
//             color: [],
//             size: []
//         }
//     });

//     const [categoryList, setCategoryList] = useState([]);
//     const [subCategoryList, setSubCategoryList] = useState([]);
//     const [newColor, setNewColor] = useState("");
//     const [newSize, setNewSize] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         fetchCategories();

//         if (product) {
//             initializeFormData();
//         }
//     }, [product]);

//     const fetchCategories = async () => {
//         try {
//             const res = await fetch("http://localhost:8080/api/category/get-category", {
//                 method: "GET",
//                 credentials: "include",
//             });
//             const data = await res.json();
//             if (data.success) setCategoryList(data.data);
//         } catch (err) {
//             console.error("Category fetch error:", err);
//             toast.error("❌ Error fetching categories");
//         }
//     };

//     const initializeFormData = () => {
//         setFormData({
//             name: product.name || "",
//             description: product.description || "",
//             unit: product.unit || "",
//             stock: product.stock || "",
//             price: product.price || "",
//             discount: product.discount || "",
//             mrp: product.mrp || "",
//             image: Array.isArray(product.image) ? [...product.image] : [product.image || ""],
//             category: product.category?.[0]?._id || "",
//             subCategory: product.subCategory?.[0]?._id || "",
//             more_details: {
//                 color: Array.isArray(product.more_details?.color) ? [...product.more_details.color] : [],
//                 size: Array.isArray(product.more_details?.size) ? [...product.more_details.size] : []
//             }
//         });

//         if (product.category?.[0]?._id) {
//             fetchSubCategories(product.category[0]._id);
//         }
//     };

//     const fetchSubCategories = async (categoryId) => {
//         try {
//             const res = await fetch("http://localhost:8080/api/subcategory/get-subcategory-by-Id", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 credentials: "include",
//                 body: JSON.stringify({ categoryId }),
//             });
//             const data = await res.json();
//             if (data.success) setSubCategoryList(data.data);
//         } catch (err) {
//             console.error("Subcategory fetch error:", err);
//             toast.error("❌ Failed to fetch subcategories");
//         }
//     };

//     const handleCategoryChange = async (e) => {
//         const selectedCategoryId = e.target.value;
//         setFormData(prev => ({
//             ...prev,
//             category: selectedCategoryId,
//             subCategory: "",
//         }));

//         if (selectedCategoryId) {
//             await fetchSubCategories(selectedCategoryId);
//         }
//     };

//     const calculatePrice = (mrp, discount) => {
//         if (!mrp || !discount) return "";
//         const mrpValue = parseFloat(mrp);
//         const discountValue = parseFloat(discount);
//         return (mrpValue - (mrpValue * discountValue / 100)).toFixed(2);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name === "mrp" || name === "discount") {
//             const mrp = name === "mrp" ? value : formData.mrp;
//             const discount = name === "discount" ? value : formData.discount;
//             const price = calculatePrice(mrp, discount);

//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value,
//                 price: price || prev.price
//             }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleImageChange = (index, value) => {
//         const newImages = [...formData.image];
//         newImages[index] = value;
//         setFormData(prev => ({ ...prev, image: newImages }));
//     };

//     const addImageField = () => {
//         setFormData(prev => ({ ...prev, image: [...prev.image, ""] }));
//     };

//     const removeImageField = (index) => {
//         const newImages = formData.image.filter((_, i) => i !== index);
//         setFormData(prev => ({ ...prev, image: newImages }));
//     };

//     const addColor = () => {
//         if (newColor.trim()) {
//             setFormData(prev => ({
//                 ...prev,
//                 more_details: {
//                     ...prev.more_details,
//                     color: [...prev.more_details.color, newColor.trim()]
//                 }
//             }));
//             setNewColor("");
//         }
//     };

//     const removeColor = (index) => {
//         const colors = formData.more_details.color.filter((_, i) => i !== index);
//         setFormData(prev => ({
//             ...prev,
//             more_details: { ...prev.more_details, color: colors }
//         }));
//     };

//     const addSize = () => {
//         if (newSize.trim()) {
//             setFormData(prev => ({
//                 ...prev,
//                 more_details: {
//                     ...prev.more_details,
//                     size: [...prev.more_details.size, newSize.trim()]
//                 }
//             }));
//             setNewSize("");
//         }
//     };

//     const removeSize = (index) => {
//         const sizes = formData.more_details.size.filter((_, i) => i !== index);
//         setFormData(prev => ({
//             ...prev,
//             more_details: { ...prev.more_details, size: sizes }
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const id = product?._id;
//         if (!id) return toast.error("Missing product ID");

//         setIsLoading(true);
//         try {
//             const response = await fetch("http://localhost:8080/api/product/update-product-details", {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 credentials: "include",
//                 body: JSON.stringify({ _id: id, ...formData })
//             });

//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message || "Update failed");

//             toast.success("🎉 Product updated successfully!");
//             navigate(-1);
//         } catch (error) {
//             toast.error(`❌ ${error.message}`);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//         >
//             <motion.div
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: 20, opacity: 0 }}
//                 className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//             >
//                 <div className="p-6">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold text-gray-800">Update Product</h2>
//                         <button 
//                             onClick={() => navigate(-1)} 
//                             className="text-gray-500 hover:text-gray-700 transition-colors"
//                         >
//                             <FiX size={24} />
//                         </button>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Product Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
//                                 <input
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                     placeholder="Enter product name"
//                                     required
//                                 />
//                             </div>

//                             {/* Description */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                                 <textarea
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                     placeholder="Enter description"
//                                     rows={3}
//                                 />
//                             </div>

//                             {/* Unit */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
//                                 <input
//                                     name="unit"
//                                     value={formData.unit}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                     placeholder="e.g., kg, piece, etc."
//                                     required
//                                 />
//                             </div>

//                             {/* Stock */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
//                                 <input
//                                     name="stock"
//                                     type="number"
//                                     value={formData.stock}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                     placeholder="Enter stock quantity"
//                                     required
//                                     min="0"
//                                 />
//                             </div>

//                             {/* MRP */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">MRP</label>
//                                 <div className="relative">
//                                     <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
//                                     <input
//                                         name="mrp"
//                                         type="number"
//                                         value={formData.mrp}
//                                         onChange={handleChange}
//                                         className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                         placeholder="Enter MRP"
//                                         required
//                                         min="0"
//                                         step="0.01"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Discount */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
//                                 <div className="relative">
//                                     <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                                         <FiPercent size={16} />
//                                     </span>
//                                     <input
//                                         name="discount"
//                                         type="number"
//                                         value={formData.discount}
//                                         onChange={handleChange}
//                                         className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                         placeholder="Enter discount"
//                                         min="0"
//                                         max="100"
//                                         step="0.01"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Price (auto-calculated) */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
//                                 <div className="relative">
//                                     <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
//                                     <input
//                                         name="price"
//                                         type="number"
//                                         value={formData.price}
//                                         readOnly
//                                         className="w-full pl-8 p-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
//                                     />
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">
//                                     Calculated automatically from MRP and Discount
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Category and Subcategory */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Category */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                                 <select
//                                     name="category"
//                                     value={formData.category}
//                                     onChange={handleCategoryChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                     required
//                                 >
//                                     <option value="">-- Select Category --</option>
//                                     {categoryList.map(c => (
//                                         <option key={c._id} value={c._id}>{c.name}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* Subcategory */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
//                                 <select
//                                     name="subCategory"
//                                     value={formData.subCategory}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                     disabled={!formData.category}
//                                     required={!!formData.category}
//                                 >
//                                     <option value="">-- Select Subcategory --</option>
//                                     {subCategoryList.map(s => (
//                                         <option key={s._id} value={s._id}>{s.name}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Image URLs */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
//                             <div className="space-y-3">
//                                 {formData.image.map((img, index) => (
//                                     <div key={index} className="flex items-center gap-3">
//                                         <input
//                                             value={img}
//                                             onChange={(e) => handleImageChange(index, e.target.value)}
//                                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                             placeholder="Enter image URL"
//                                             type="url"
//                                         />
//                                         {formData.image.length > 1 && (
//                                             <motion.button
//                                                 type="button"
//                                                 onClick={() => removeImageField(index)}
//                                                 whileHover={{ scale: 1.1 }}
//                                                 whileTap={{ scale: 0.9 }}
//                                                 className="p-3 text-red-500 hover:text-red-700 transition-colors"
//                                             >
//                                                 <FiTrash2 size={18} />
//                                             </motion.button>
//                                         )}
//                                     </div>
//                                 ))}
//                                 <motion.button
//                                     type="button"
//                                     onClick={addImageField}
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                     className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
//                                 >
//                                     <FiPlus size={18} />
//                                     Add another image URL
//                                 </motion.button>
//                             </div>
//                         </div>

//                         {/* Colors and Sizes */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Colors */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
//                                 <div className="flex items-center gap-3 mb-3">
//                                     <input
//                                         value={newColor}
//                                         onChange={(e) => setNewColor(e.target.value)}
//                                         className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                         placeholder="Add color"
//                                     />
//                                     <motion.button
//                                         type="button"
//                                         onClick={addColor}
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                         className="px-4 py-3 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
//                                     >
//                                         Add
//                                     </motion.button>
//                                 </div>
//                                 <div className="flex flex-wrap gap-2">
//                                     {formData.more_details.color.map((c, i) => (
//                                         <motion.div 
//                                             key={i}
//                                             initial={{ opacity: 0, scale: 0.9 }}
//                                             animate={{ opacity: 1, scale: 1 }}
//                                             className="flex items-center bg-pink-100 rounded-full px-3 py-1"
//                                         >
//                                             <span className="mr-2">{c}</span>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => removeColor(i)}
//                                                 className="text-pink-700 hover:text-pink-900 transition-colors"
//                                             >
//                                                 <FiX size={16} />
//                                             </button>
//                                         </motion.div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Sizes */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
//                                 <div className="flex items-center gap-3 mb-3">
//                                     <input
//                                         value={newSize}
//                                         onChange={(e) => setNewSize(e.target.value)}
//                                         className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                                         placeholder="Add size"
//                                     />
//                                     <motion.button
//                                         type="button"
//                                         onClick={addSize}
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                         className="px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
//                                     >
//                                         Add
//                                     </motion.button>
//                                 </div>
//                                 <div className="flex flex-wrap gap-2">
//                                     {formData.more_details.size.map((s, i) => (
//                                         <motion.div 
//                                             key={i}
//                                             initial={{ opacity: 0, scale: 0.9 }}
//                                             animate={{ opacity: 1, scale: 1 }}
//                                             className="flex items-center bg-purple-100 rounded-full px-3 py-1"
//                                         >
//                                             <span className="mr-2">{s}</span>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => removeSize(i)}
//                                                 className="text-purple-700 hover:text-purple-900 transition-colors"
//                                             >
//                                                 <FiX size={16} />
//                                             </button>
//                                         </motion.div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="pt-4">
//                             <motion.button
//                                 type="submit"
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 disabled={isLoading}
//                                 className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-md ${
//                                     isLoading ? 'opacity-70 cursor-not-allowed' : ''
//                                 }`}
//                             >
//                                 {isLoading ? 'Updating...' : 'Update Product'}
//                             </motion.button>
//                         </div>
//                     </form>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// }

// export default UpdateProduct_Popup;




import React, { useEffect, useState } from 'react';
import { FiX, FiPlus, FiTrash2, FiChevronDown, FiUpload, FiPercent } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function UpdateProduct_Popup() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    const [formData, setFormData] = useState({
        name: "",
        description: [""], // Changed to array
        unit: "",
        stock: "",
        price: "",
        discount: "",
        mrp: "",
        image: [""],
        category: "",
        subCategory: "",
        more_details: {
            color: [],
            size: []
        }
    });

    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [newColor, setNewColor] = useState("");
    const [newSize, setNewSize] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
        
        if (product) {
            initializeFormData();
        }
    }, [product]);

    const fetchCategories = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/category/get-category", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (data.success) setCategoryList(data.data);
        } catch (err) {
            console.error("Category fetch error:", err);
            toast.error("❌ Error fetching categories");
        }
    };

    const initializeFormData = () => {
        // Convert description to array if it's a string
        const initialDescriptions = product.description 
            ? Array.isArray(product.description) 
                ? [...product.description] 
                : [product.description]
            : [""];

        setFormData({
            name: product.name || "",
            description: initialDescriptions,
            unit: product.unit || "",
            stock: product.stock || "",
            price: product.price || "",
            discount: product.discount || "",
            mrp: product.mrp || "",
            image: Array.isArray(product.image) ? [...product.image] : [product.image || ""],
            category: product.category?.[0]?._id || "",
            subCategory: product.subCategory?.[0]?._id || "",
            more_details: {
                color: Array.isArray(product.more_details?.color) ? [...product.more_details.color] : [],
                size: Array.isArray(product.more_details?.size) ? [...product.more_details.size] : []
            }
        });

        if (product.category?.[0]?._id) {
            fetchSubCategories(product.category[0]._id);
        }
    };

    const fetchSubCategories = async (categoryId) => {
        try {
            const res = await fetch("http://localhost:8080/api/subcategory/get-subcategory-by-Id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ categoryId }),
            });
            const data = await res.json();
            if (data.success) setSubCategoryList(data.data);
        } catch (err) {
            console.error("Subcategory fetch error:", err);
            toast.error("❌ Failed to fetch subcategories");
        }
    };

    const handleCategoryChange = async (e) => {
        const selectedCategoryId = e.target.value;
        setFormData(prev => ({
            ...prev,
            category: selectedCategoryId,
            subCategory: "",
        }));

        if (selectedCategoryId) {
            await fetchSubCategories(selectedCategoryId);
        }
    };

    const calculatePrice = (mrp, discount) => {
        if (!mrp || !discount) return "";
        const mrpValue = parseFloat(mrp);
        const discountValue = parseFloat(discount);
        return (mrpValue - (mrpValue * discountValue / 100)).toFixed(2);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "mrp" || name === "discount") {
            const mrp = name === "mrp" ? value : formData.mrp;
            const discount = name === "discount" ? value : formData.discount;
            const price = calculatePrice(mrp, discount);
            
            setFormData(prev => ({
                ...prev,
                [name]: value,
                price: price || prev.price
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // New function to handle description changes
    const handleDescriptionChange = (index, value) => {
        const newDescriptions = [...formData.description];
        newDescriptions[index] = value;
        setFormData(prev => ({ ...prev, description: newDescriptions }));
    };

    // New function to add a description field
    const addDescriptionField = () => {
        setFormData(prev => ({ ...prev, description: [...prev.description, ""] }));
    };

    // New function to remove a description field
    const removeDescriptionField = (index) => {
        const newDescriptions = formData.description.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, description: newDescriptions }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.image];
        newImages[index] = value;
        setFormData(prev => ({ ...prev, image: newImages }));
    };

    const addImageField = () => {
        setFormData(prev => ({ ...prev, image: [...prev.image, ""] }));
    };

    const removeImageField = (index) => {
        const newImages = formData.image.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, image: newImages }));
    };

    const addColor = () => {
        if (newColor.trim()) {
            setFormData(prev => ({
                ...prev,
                more_details: {
                    ...prev.more_details,
                    color: [...prev.more_details.color, newColor.trim()]
                }
            }));
            setNewColor("");
        }
    };

    const removeColor = (index) => {
        const colors = formData.more_details.color.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            more_details: { ...prev.more_details, color: colors }
        }));
    };

    const addSize = () => {
        if (newSize.trim()) {
            setFormData(prev => ({
                ...prev,
                more_details: {
                    ...prev.more_details,
                    size: [...prev.more_details.size, newSize.trim()]
                }
            }));
            setNewSize("");
        }
    };

    const removeSize = (index) => {
        const sizes = formData.more_details.size.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            more_details: { ...prev.more_details, size: sizes }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = product?._id;
        if (!id) return toast.error("Missing product ID");

        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8080/api/product/update-product-details", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ 
                    _id: id, 
                    ...formData,
                    // Keep descriptions as array when sending to backend
                    description: formData.description.filter(desc => desc.trim() !== "")
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Update failed");

            toast.success("🎉 Product updated successfully!");
            navigate(-1);
        } catch (error) {
            toast.error(`❌ ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Update Product</h2>
                        <button 
                            onClick={() => navigate(-1)} 
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            {/* Unit */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                                <input
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    placeholder="e.g., kg, piece, etc."
                                    required
                                />
                            </div>
                        </div>

                        {/* Multiple Descriptions */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Descriptions</label>
                            <div className="space-y-3">
                                {formData.description.map((desc, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <textarea
                                            value={desc}
                                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                            placeholder={`Description ${index + 1}`}
                                            rows={3}
                                        />
                                        {formData.description.length > 1 && (
                                            <motion.button
                                                type="button"
                                                onClick={() => removeDescriptionField(index)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-3 text-red-500 hover:text-red-700 transition-colors mt-1"
                                            >
                                                <FiTrash2 size={18} />
                                            </motion.button>
                                        )}
                                    </div>
                                ))}
                                <motion.button
                                    type="button"
                                    onClick={addDescriptionField}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
                                >
                                    <FiPlus size={18} />
                                    Add another description
                                </motion.button>
                            </div>
                        </div>

                        {/* Rest of the form remains the same */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                <input
                                    name="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    placeholder="Enter stock quantity"
                                    required
                                    min="0"
                                />
                            </div>

                            {/* MRP */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">MRP</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        name="mrp"
                                        type="number"
                                        value={formData.mrp}
                                        onChange={handleChange}
                                        className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                        placeholder="Enter MRP"
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* Discount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <FiPercent size={16} />
                                    </span>
                                    <input
                                        name="discount"
                                        type="number"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                        placeholder="Enter discount"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* Price (auto-calculated) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        readOnly
                                        className="w-full pl-8 p-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Calculated automatically from MRP and Discount
                                </p>
                            </div>
                        </div>

                        {/* Category and Subcategory */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleCategoryChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    required
                                >
                                    <option value="">-- Select Category --</option>
                                    {categoryList.map(c => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Subcategory */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                                <select
                                    name="subCategory"
                                    value={formData.subCategory}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    disabled={!formData.category}
                                    required={!!formData.category}
                                >
                                    <option value="">-- Select Subcategory --</option>
                                    {subCategoryList.map(s => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Image URLs */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
                            <div className="space-y-3">
                                {formData.image.map((img, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            value={img}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                            placeholder="Enter image URL"
                                            type="url"
                                        />
                                        {formData.image.length > 1 && (
                                            <motion.button
                                                type="button"
                                                onClick={() => removeImageField(index)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-3 text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <FiTrash2 size={18} />
                                            </motion.button>
                                        )}
                                    </div>
                                ))}
                                <motion.button
                                    type="button"
                                    onClick={addImageField}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
                                >
                                    <FiPlus size={18} />
                                    Add another image URL
                                </motion.button>
                            </div>
                        </div>

                        {/* Colors and Sizes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Colors */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
                                <div className="flex items-center gap-3 mb-3">
                                    <input
                                        value={newColor}
                                        onChange={(e) => setNewColor(e.target.value)}
                                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                        placeholder="Add color"
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={addColor}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-3 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
                                    >
                                        Add
                                    </motion.button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.more_details.color.map((c, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center bg-pink-100 rounded-full px-3 py-1"
                                        >
                                            <span className="mr-2">{c}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeColor(i)}
                                                className="text-pink-700 hover:text-pink-900 transition-colors"
                                            >
                                                <FiX size={16} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
                                <div className="flex items-center gap-3 mb-3">
                                    <input
                                        value={newSize}
                                        onChange={(e) => setNewSize(e.target.value)}
                                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                        placeholder="Add size"
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={addSize}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                                    >
                                        Add
                                    </motion.button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.more_details.size.map((s, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center bg-purple-100 rounded-full px-3 py-1"
                                        >
                                            <span className="mr-2">{s}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeSize(i)}
                                                className="text-purple-700 hover:text-purple-900 transition-colors"
                                            >
                                                <FiX size={16} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading}
                                className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-md ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                {isLoading ? 'Updating...' : 'Update Product'}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default UpdateProduct_Popup;


