import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiX, FiHome, FiShoppingBag, FiPlus, FiUsers, FiLogOut, FiLayers, FiTrash2, FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const isActiveLink = (path) => location.pathname === path ? "bg-pink-600 text-white" : "hover:bg-gray-700";
  const API_URL = import.meta.env.VITE_RENDER;
  // Fetch all categories (GET)
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}category/get-category`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load categories");
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories by category ID (POST to correct endpoint)
  const fetchSubCategories = async (categoryId) => {
    try {
      const res = await fetch(`${API_URL}/subcategory/get-subcategory-by-Id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ categoryId }),
      });
      const data = await res.json();
      if (data.success) {
        setSubCategories(data.data);
        setSelectedSubCategoryId(""); // Reset selected subcategory when category changes
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load subcategories");
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategorySelect = (e) => {
    const categoryId = e.target.value;
    if (categoryId) {
      const category = categories.find(cat => cat._id === categoryId);
      setSelectedCategoryId(categoryId);
      setSelectedCategoryName(category?.name || "");
      fetchSubCategories(categoryId);
    } else {
      setSelectedCategoryId("");
      setSelectedCategoryName("");
      setSubCategories([]);
      setSelectedSubCategoryId("");
    }
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (e) => {
    setSelectedSubCategoryId(e.target.value);
  };

  // Delete Category (DELETE)
  const deleteCategory = async () => {
    if (!selectedCategoryId) return;
    if (!window.confirm(`Are you sure you want to delete the category "${selectedCategoryName}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/category/delete-category`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id: selectedCategoryId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
        setSelectedCategoryId("");
        setSelectedCategoryName("");
        setSubCategories([]);
        setSelectedSubCategoryId("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting category");
      console.error("Error deleting category:", error);
    }
  };

  // Delete SubCategory (DELETE)
  const deleteSubCategory = async () => {
    if (!selectedSubCategoryId) return;
    const subCategory = subCategories.find(sub => sub._id === selectedSubCategoryId);
    if (!subCategory) return;

    if (!window.confirm(`Are you sure you want to delete the subcategory "${subCategory.name}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/subcategory/delete-subcategory`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          _id: selectedSubCategoryId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Subcategory deleted successfully");
        fetchSubCategories(selectedCategoryId);
        setSelectedSubCategoryId("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting subcategory");
      console.error("Error deleting subcategory:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">


      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} fixed md:relative inset-y-0 left-0 w-64 bg-gray-800/90 text-white transition-transform duration-300 ease-in-out flex flex-col z-30`}>
        {/* Sidebar Header */}


        {/* Sidebar Navigation */}
        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} fixed md:relative inset-y-0 left-0 w-64 bg-gray-800/90 text-white transition-transform duration-300 ease-in-out flex flex-col z-30`}>
          {/* Sidebar content remains the same */}
          {/* Sidebar */}
          <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} fixed md:relative inset-y-0 left-0 w-64 bg-gray-800/90 text-white transition-transform duration-300 ease-in-out flex flex-col z-30`}>
            <div className="p-4 flex items-center justify-between border-b border-pink-500">
              <div className="flex items-center">
                <div className="bg-white p-1 rounded-lg mr-3">
                  <div className="bg-pink-500 w-8 h-8 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-xl">P</span>
                  </div>
                </div>
                <h1 className="text-xl font-bold tracking-wide">Paradies in Love</h1>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-700 transition-all md:hidden"
              >
                <FiX size={20} />
              </button>
            </div>

            <nav className="mt-6 flex flex-col px-2 flex-grow">
              <Link
                to="/dashboard"
                className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/dashboard')}`}
              >
                <FiHome className="mr-3" size={20} />
                <span className="font-medium">Product Inventory</span>
              </Link>
              <Link
                to="/orders"
                className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/orders')}`}
              >
                <FiShoppingBag className="mr-3" size={20} />
                <span className="font-medium">Orders</span>
              </Link>
              <Link
                to="/add-product"
                className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/add-product')}`}
              >
                <FiPlus className="mr-3" size={20} />
                <span className="font-medium">Add Product</span>
              </Link>
              <Link
                to="/category-management"
                className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/category-management')}`}
              >
                <FiLayers className="mr-3" size={20} />
                <span className="font-medium">Category Management</span>
              </Link>
              <Link
                to="/customers"
                className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/customers')}`}
              >
                <FiUsers className="mr-3" size={20} />
                <span className="font-medium">Customers</span>
              </Link>

              <Link
                to="/logout"
                className={`px-4 py-3 cursor-pointer flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/logout')}`}
              >
                <FiLogOut className="mr-3" size={20} />
                <span className="font-medium">Logout</span>
              </Link>
            </nav>
          </div>
          {/* ... */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Mobile Header */}
        <div className=" mb-6 md:hidden">
          <button onClick={toggleSidebar} className="p-2 rounded-lg bg-gray-200">
            {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg> */}
            ☰ Menu
          </button>
          <h2 className="text-2xl font-bold">Category Management</h2>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Desktop Title (hidden on mobile) */}
        <h2 className="hidden md:block text-2xl font-bold mb-6">Category Management</h2>

        {/* Category Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
              <div className="relative">
                <select
                  value={selectedCategoryId}
                  onChange={handleCategorySelect}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none pr-8"
                >
                  <option value="">-- Select a Category --</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {selectedCategoryId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Subcategory</label>
                <div className="relative">
                  <select
                    value={selectedSubCategoryId}
                    onChange={handleSubCategorySelect}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none pr-8"
                    disabled={subCategories.length === 0}
                  >
                    <option value="">-- Select a Subcategory --</option>
                    {subCategories.map(sub => (
                      <option key={sub._id} value={sub._id}>{sub.name}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {selectedCategoryId && (
              <button
                onClick={deleteCategory}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={subCategories.length > 0}
                title={subCategories.length > 0 ? "Delete all subcategories first" : ""}
              >
                Delete Category
              </button>
            )}

            {selectedSubCategoryId && (
              <button
                onClick={deleteSubCategory}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete Subcategory
              </button>
            )}
          </div>
        </div>

        {/* Current Selection Info */}
        {selectedCategoryId && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Current Selection</h3>
            <p className="mb-2"><span className="font-medium">Category:</span> {selectedCategoryName}</p>
            {selectedSubCategoryId && (
              <p>
                <span className="font-medium">Subcategory:</span> {
                  subCategories.find(sub => sub._id === selectedSubCategoryId)?.name || ""
                }
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;