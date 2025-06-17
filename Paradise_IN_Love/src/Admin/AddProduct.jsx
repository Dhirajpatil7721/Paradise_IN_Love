// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FiX, FiHome, FiShoppingBag, FiPlus, FiUsers, FiLogOut,
// } from "react-icons/fi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddProduct = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const location = useLocation();
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const isActiveLink = (path) => location.pathname === path
//     ? "bg-pink-600 text-white"
//     : "hover:bg-gray-700";

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
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
//         toast.error("❌ Error fetching categories");
//       });
//   }, []);

//   const handleCategoryChange = async (e) => {
//     const selectedCategoryId = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       category: selectedCategoryId,
//       subCategory: "",
//     }));

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
//       toast.error("❌ Failed to fetch subcategories");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (index, value) => {
//     const images = [...formData.image];
//     images[index] = value;
//     setFormData(prev => ({ ...prev, image: images }));
//   };

//   const addImageField = () => {
//     setFormData(prev => ({ ...prev, image: [...prev.image, ""] }));
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
//       toast.warning("⚠️ Please enter a unique color and at least one size");
//     }
//   };

//   const addCustomCategory = async () => {
//     try {
//       if (!newCategoryName.trim()) {
//         toast.warn("⚠️ Please enter a category name");
//         return;
//       }

//       const res = await fetch("http://localhost:8080/api/category/add-category", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           name: newCategoryName,
//           image: "https://via.placeholder.com/150"
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         const newCat = data.data;
//         setDropcat(prev => [...prev, newCat]);
//         setFormData(prev => ({
//           ...prev,
//           category: newCat._id,
//           subCategory: ""
//         }));
//         setCustomCategory(false);
//         setNewCategoryName("");
//         toast.success("✅ Category added successfully");
//       } else {
//         toast.error("❌ Could not add category: " + data.message);
//       }
//     } catch (err) {
//       console.error("Add category error:", err);
//       toast.error("❌ Could not add category");
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
//         toast.success("✅ Subcategory added successfully");
//       }
//     } catch (err) {
//       console.error("Add subcategory error:", err);
//       toast.error("❌ Could not add subcategory");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:8080/api/product/create",
//         formData,
//         { withCredentials: true }
//       );
//       toast.success("✅ Product created!");
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       toast.error("❌ Submit failed");
//     }
//   };


//   return (
//     <div className="flex mt-20 bg-gradient-to-br from-gray-100 via-pink-100 to-white min-h-screen">
//       {/* Sidebar */}
//       <div className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} fixed md:relative inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform flex flex-col z-30`}>
//         <div className="p-4 flex items-center justify-between border-b border-pink-500">
//           <div className="flex items-center">
//             <div className="bg-white p-1 rounded-lg mr-3">
//               <div className="bg-pink-500 w-8 h-8 rounded flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">P</span>
//               </div>
//             </div>
//             <h1 className="text-xl font-bold">Paradise in Love</h1>
//           </div>
//           <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-700 md:hidden"><FiX size={20} /></button>
//         </div>
//         <nav className="mt-6 flex flex-col px-2 flex-grow">
//           {[{ to: "/dashboard", icon: FiHome, label: "Dashboard" },
//           { to: "/orders", icon: FiShoppingBag, label: "Orders" },
//           { to: "/add-product", icon: FiPlus, label: "Add Product" },
//           { to: "/customers", icon: FiUsers, label: "Customers" },
//           { to: "/logout", icon: FiLogOut, label: "Logout" },
//           ].map(({ to, icon: Icon, label }) => (
//             <Link key={to} to={to} className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 ${isActiveLink(to)}`}>
//               <Icon className="mr-3" size={20} />
//               <span>{label}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Main Form */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-4 text-pink-700">Add New Product</h1>
//         <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded-lg">
//           <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
//           <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
//           <input type="text" name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} className="w-full border p-2 rounded" />
//           <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full border p-2 rounded" />
//           <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" />
//           <input type="number" name="mrp" placeholder="MRP" value={formData.mrp} onChange={handleChange} className="w-full border p-2 rounded" />
//           <input type="number" name="discount" placeholder="Discount (%)" value={formData.discount} onChange={handleChange} className="w-full border p-2 rounded" />

//           {/* Image URLs */}
//           <div>
//             <label className="block font-medium">Image URLs</label>
//             {formData.image.map((img, idx) => (
//               <input key={idx} type="text" placeholder={`Image ${idx + 1}`} value={img} onChange={e => handleImageChange(idx, e.target.value)} className="w-full border p-2 rounded mb-2" />
//             ))}
//             <button type="button" onClick={addImageField} className="text-sm text-blue-600">+ Add Image</button>
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block font-medium mb-1">Category</label>
//             {customCategory ? (
//               <>
//                 <input type="text" placeholder="Custom Category" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full border p-2 rounded" />
//                 <button type="button" onClick={addCustomCategory} className="text-sm text-green-600 mt-1">✔ Add</button>
//               </>
//             ) : (
//               <select name="category" value={formData.category} onChange={handleCategoryChange} className="w-full border p-2 rounded">
//                 <option value="">-- Select Category --</option>
//                 {dropcat.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
//               </select>
//             )}
//             <button type="button" onClick={() => setCustomCategory(!customCategory)} className="text-sm text-blue-600 mt-1">
//               {customCategory ? "Use dropdown instead" : "+ Add custom category"}
//             </button>
//           </div>

//           {/* Subcategory */}
//           <div>
//             <label className="block font-medium mb-1">SubCategory</label>
//             {customSubCategory ? (
//               <>
//                 <input type="text" name="subCategory" placeholder="Custom SubCategory" value={formData.subCategory} onChange={handleChange} className="w-full border p-2 rounded" />
//                 <button type="button" onClick={addCustomSubCategory} className="text-sm text-green-600 mt-1">✔ Add</button>
//               </>
//             ) : (
//               <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="w-full border p-2 rounded">
//                 <option value="">-- Select SubCategory --</option>
//                 {subcatdrop.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
//               </select>
//             )}
//             <button type="button" onClick={() => setCustomSubCategory(!customSubCategory)} className="text-sm text-blue-600 mt-1">
//               {customSubCategory ? "Use dropdown instead" : "+ Add custom subcategory"}
//             </button>
//           </div>

//           {/* More Details */}
//            {/* More Details */}
//           <div>
//             <label className="block font-medium">More Details</label>
//             <div className="flex gap-2 mb-2">
//               <input type="text" placeholder="Color (e.g. red)" value={newDetail.color} onChange={(e) => setNewDetail({ ...newDetail, color: e.target.value })} className="flex-1 border p-2 rounded" />
//               <input type="text" placeholder="Size (comma-separated)" value={newDetail.size} onChange={(e) => setNewDetail({ ...newDetail, size: e.target.value })} className="flex-1 border p-2 rounded" />
//             </div>
//             <button type="button" onClick={addMoreDetail} className="text-sm text-blue-600">+ Add Detail</button>
//             <div className="mt-2 text-sm text-gray-700">
//               <strong>Colors:</strong> {formData.more_details.color.join(", ")}<br />
//               <strong>Sizes:</strong> {formData.more_details.size.join(", ")}
//             </div>
//           </div>

//           <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded">Submit Product</button>
//         </form>
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
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
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const isActiveLink = (path) => location.pathname === path
    ? "bg-pink-600 text-white"
    : "hover:bg-gray-700";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
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

  useEffect(() => {
    fetch("http://localhost:8080/api/category/get-category", {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => data.success && setDropcat(data.data))
      .catch(err => {
        console.error("Category fetch error:", err);
        toast.error("❌ Error fetching categories");
      });
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: selectedCategoryId,
      subCategory: "",
    }));

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
      toast.error("❌ Failed to fetch subcategories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const images = [...formData.image];
    images[index] = value;
    setFormData(prev => ({ ...prev, image: images }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, image: [...prev.image, ""] }));
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
      toast.warning("⚠️ Please enter a unique color and at least one size");
    }
  };

  const addCustomCategory = async () => {
    try {
      if (!newCategoryName.trim()) {
        toast.warn("⚠️ Please enter a category name");
        return;
      }

      const res = await fetch("http://localhost:8080/api/category/add-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: newCategoryName,
          image: "https://via.placeholder.com/150"
        }),
      });

      const data = await res.json();
      if (data.success) {
        const newCat = data.data;
        setDropcat(prev => [...prev, newCat]);
        setFormData(prev => ({
          ...prev,
          category: newCat._id,
          subCategory: ""
        }));
        setCustomCategory(false);
        setNewCategoryName("");
        toast.success("✅ Category added successfully");
      } else {
        toast.error("❌ Could not add category: " + data.message);
      }
    } catch (err) {
      console.error("Add category error:", err);
      toast.error("❌ Could not add category");
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
        toast.success("✅ Subcategory added successfully");
      }
    } catch (err) {
      console.error("Add subcategory error:", err);
      toast.error("❌ Could not add subcategory");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/api/product/create",
        formData,
        { withCredentials: true }
      );
      toast.success("✅ Product created!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("❌ Submit failed");
    }
  };

// Discount Logic
  useEffect(() => {
  const price = parseFloat(formData.price) || 0;
  const discount = parseFloat(formData.discount) || 0;

  const mrp = price - (price * discount) / 100;

  setFormData(prev => ({
    ...prev,
    mrp: mrp.toFixed(2)
  }));
}, [formData.price, formData.discount]);

  return (
    <div className="flex  bg-gradient-to-br from-gray-100 via-pink-100 to-white min-h-screen">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} fixed md:relative inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform flex flex-col z-30`}>
        <div className="p-4 flex items-center justify-between border-b border-pink-500">
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-lg mr-3">
              <div className="bg-pink-500 w-8 h-8 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
            </div>
            <h1 className="text-xl font-bold">Paradise in Love</h1>
          </div>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-700 md:hidden"><FiX size={20} /></button>
        </div>
        <nav className="mt-6 flex flex-col px-2 flex-grow">
          {[{ to: "/dashboard", icon: FiHome, label: "Dashboard" },
          { to: "/orders", icon: FiShoppingBag, label: "Orders" },
          { to: "/add-product", icon: FiPlus, label: "Add Product" },
          { to: "/customers", icon: FiUsers, label: "Customers" },
          { to: "/logout", icon: FiLogOut, label: "Logout" },
          ].map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 ${isActiveLink(to)}`}>
              <Icon className="mr-3" size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Form */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-pink-700">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded-lg">
          <label className="block font-medium">Prouct Name</label>
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />

          <label className="block font-medium">Description</label>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />

          <label className="block font-medium">Unit</label>
          <input type="text" name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} className="w-full border p-2 rounded" />
          {/* <label className="block font-medium">Stock</label>
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full border p-2 rounded" />
          <label className="block font-medium">Price</label>
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" />
          <label className="block font-medium">MRP</label>
          <input type="number" name="mrp" placeholder="MRP" value={formData.mrp} onChange={handleChange} className="w-full border p-2 rounded" />
          <label className="block font-medium">Discount %</label>
          <input type="number" name="discount" placeholder="Discount (%)" value={formData.discount} onChange={handleChange} className="w-full border p-2 rounded" /> */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Stock</label>
              <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-medium">Price</label>
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-medium">Discount (%)</label>
              <input type="number" name="discount" placeholder="Discount" value={formData.discount} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
          </div>
          <div>
            <label className="block font-medium">MRP</label>
            <input type="number" name="mrp" placeholder="MRP" value={formData.mrp} readOnly className="w-full border p-2 rounded bg-gray-100" />
          </div>
          {/* Image URLs */}
          <div>
            <label className="block font-medium">Image URLs</label>
            {formData.image.map((img, idx) => (
              <input key={idx} type="text" placeholder={`Image ${idx + 1}`} value={img} onChange={e => handleImageChange(idx, e.target.value)} className="w-full border p-2 rounded mb-2" />
            ))}
            <button type="button" onClick={addImageField} className="text-sm text-blue-600">+ Add Image</button>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            {customCategory ? (
              <>
                <input type="text" placeholder="Custom Category" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full border p-2 rounded" />
                <button type="button" onClick={addCustomCategory} className="text-sm text-green-600 mt-1">✔ Add</button>
              </>
            ) : (
              <select name="category" value={formData.category} onChange={handleCategoryChange} className="w-full border p-2 rounded">
                <option value="">-- Select Category --</option>
                {dropcat.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            )}
            <button type="button" onClick={() => setCustomCategory(!customCategory)} className="text-sm text-blue-600 mt-1">
              {customCategory ? "Use dropdown instead" : "+ Add custom category"}
            </button>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block font-medium mb-1">SubCategory</label>
            {customSubCategory ? (
              <>
                <input type="text" name="subCategory" placeholder="Custom SubCategory" value={formData.subCategory} onChange={handleChange} className="w-full border p-2 rounded" />
                <button type="button" onClick={addCustomSubCategory} className="text-sm text-green-600 mt-1">✔ Add</button>
              </>
            ) : (
              <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="">-- Select SubCategory --</option>
                {subcatdrop.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            )}
            <button type="button" onClick={() => setCustomSubCategory(!customSubCategory)} className="text-sm text-blue-600 mt-1">
              {customSubCategory ? "Use dropdown instead" : "+ Add custom subcategory"}
            </button>
          </div>

          {/* More Details */}
          {/* More Details */}
          <div>
            <label className="block font-medium">More Details</label>
            <div className="flex gap-2 mb-2">
              <input type="text" placeholder="Color (e.g. red)" value={newDetail.color} onChange={(e) => setNewDetail({ ...newDetail, color: e.target.value })} className="flex-1 border p-2 rounded" />
              <input type="text" placeholder="Size (comma-separated)" value={newDetail.size} onChange={(e) => setNewDetail({ ...newDetail, size: e.target.value })} className="flex-1 border p-2 rounded" />
            </div>
            <button type="button" onClick={addMoreDetail} className="text-sm text-blue-600">+ Add Detail</button>
            <div className="mt-2 text-sm text-gray-700">
              <strong>Colors:</strong> {formData.more_details.color.join(", ")}<br />
              <strong>Sizes:</strong> {formData.more_details.size.join(", ")}
            </div>
          </div>

          <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded">Submit Product</button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default AddProduct;



